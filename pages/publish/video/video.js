/* eslint-disable no-await-in-loop */
import loading from '../../../utils/loading';
import util from '../../../utils/util';
import { get, uploadFile } from '../../../utils/request';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		desc: '', // 文字输入
		selectCircles: [], // 选择的圈子
		topicList: [], // 选择的圈子下的话题
		videoDetail: {}, // video的详情
		screenWidth: 414, // 屏幕宽度
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {
		// 获取学校圈子
		this.getPersonSchoolCircle();
	},

	onPause: function () {},

	onReady() {
		this.videoContext = wx.createVideoContext('myVideo');
	},

	videoErrorCallback(e) {
		console.log('视频错误信息:');
		console.log(e.detail.errMsg);
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		this.onSearchTopic();
		// 获取设备信息
		util.getDeviceInfo().then((res) => {
			this.setData({ screenWidth: res.screenWidth });
		});
	},

	// 获取个人的学校圈子
	getPersonSchoolCircle: function () {
		loading.showLoading();
		const user_id = wx.getStorageSync('user_id');
		const { selectCircles } = this.data;
		// 获取个人学校圈子
		get({ url: '/circle/getPersonSchoolCircle', data: { user_id } })
			.then((res) => {
				if (!res) return;
				res.selected = true;
				const newCircle = [...selectCircles, res];
				this.setData({ selectCircles: newCircle }, () => this.onSearchTopic());
			})
			.finally(() => loading.hideLoading());
	},

	// 移除圈子
	onRemoveCircle: function () {
		this.onSearchTopic();
	},

	// 查询话题
	onSearchTopic: function () {
		loading.showLoading();
		const { selectCircles } = this.data;
		const selectedIds = [];
		if (selectCircles && selectCircles.length !== 0) {
			selectCircles.forEach((item) => selectedIds.push(item.circle_id));
			get({ url: '/topic/getByCircleIds', data: { circleIds: selectedIds } })
				.then((res) => {
					this.setData({ topicList: res });
				})
				.finally(() => loading.hideLoading());
		}
	},

	// 选择话题
	onSelectTopic: function (e) {
		const { topicid } = e.target.dataset;
		const { topicList } = this.data;
		topicList.forEach((circle) => {
			const topics = circle.topics || [];
			if (topics && topics.length !== 0) {
				topics.forEach((topic) => {
					if (topic.topic_id === topicid) {
						topic.selected = !topic.selected;
					}
				});
			}
		});
		this.setData({ topicList });
	},

	// 输入内容
	onChangeDesc: function (e) {
		const { detail } = e;
		this.setData({ desc: detail });
	},

	// 选择视频
	chooseVideo: function () {
		const self = this;
		wx.chooseMedia({
			count: 1,
			mediaType: ['video'], // 文件类型
			sourceType: ['album', 'camera'], // 视频来源
			success(res) {
				// tempFilePath可以作为img标签的src属性显示图片
				// const { tempFilePaths } = res;
				loading.hideLoading();
				if (res && res.errMsg === 'chooseMedia:ok' && Array.isArray(res.tempFiles)) {
					const tempFile = res.tempFiles[0];
					// const { height, width } = tempFile;
					// const { screenWidth } = self.data;
					// const videoHeight = Number((height * screenWidth) / width).toFixed(0);
					self.setData({
						videoDetail: {
							url: tempFile.tempFilePath,
							height: tempFile.height,
							width: tempFile.width,
							duration: tempFile.duration,
							size: tempFile.size,
							photo: tempFile.thumbTempFilePath,
							// videoHeight,
						},
					});
				}
			},
			fail: function () {
				wx.showToast({
					title: '请重新选择',
					icon: 'error',
				});
			},
		});
	},

	// 移除视频
	onRemoveVideo: function () {
		this.setData({ videoDetail: {} });
	},

	showErrorToast: function (title) {
		wx.showToast({
			title,
			icon: 'error',
		});
	},

	// 发布
	onSave: async function () {
		const { desc, videoDetail, selectCircles, topicList } = this.data;
		loading.showLoading();
		if (selectCircles && selectCircles.length === 0) return this.showErrorToast('请选择圈子');
		if (!videoDetail.url) return this.showErrorToast('请上传视频');
		// 上传视频封面
		const coverImgName = await uploadFile({ url: '/videoCover/upload', data: videoDetail.photo });
		// 选择的圈子id
		const selectCirIds = [];
		const selectCirNames = [];
		// 选择的话题id
		const topicIds = [];
		const topicNames = [];

		selectCircles.forEach((item) => {
			selectCirIds.push(item.circle_id);
			selectCirNames.push(item.circle_name);
		});
		topicList.forEach((circle) => {
			if (circle.topics && circle.topics.length !== 0) {
				circle.topics.forEach((item) => {
					if (item.selected) {
						topicIds.push(item.topic_id);
						topicNames.push(item.topic_name);
					}
				});
			}
		});
		if (selectCirIds.length > 2) return this.showErrorToast('最多两个圈子');
		if (topicIds.length > 2) return this.showErrorToast('最多两个话题');
		const user_id = wx.getStorageSync('user_id');
		const formData = {
			photo: JSON.stringify(coverImgName),
			width: videoDetail.width,
			height: videoDetail.height,
			duration: videoDetail.duration,
			size: videoDetail.size,
			user_id,
			desc,
			circle_ids: JSON.stringify(selectCirIds),
			circle_names: JSON.stringify(selectCirNames),
			topic_ids: JSON.stringify(topicIds),
			topic_names: JSON.stringify(topicNames),
		};
		// 上传视频
		await uploadFile({
			url: '/video/upload',
			data: videoDetail.url,
			formData,
		});
		wx.showToast({
			title: '发布成功',
			icon: 'success',
		});
		util.reloadHomePage();
		setTimeout(() => {
			wx.navigateBack({
				complete: () => {},
			});
		}, 500);
		loading.hideLoading();
	},
});
