/* eslint-disable no-await-in-loop */
import loading from '../../../utils/loading';
import { baseUrl } from '../../../config/config';
import { get, post } from '../../../utils/request';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		type: 'posts', // posts-帖子 blogs-博客
		title: '', // 标题
		desc: '', // 文字输入
		imgUrls: [], // 上传图片的url
		selectCircles: [], // 选择的圈子
		topicList: [], // 选择的圈子下的话题
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		if (options.type) {
			if (options.type === 'posts') {
				wx.setNavigationBarTitle({
					title: '发布帖子',
				});
			}
			if (options.type === 'blogs') {
				wx.setNavigationBarTitle({
					title: '发布博客',
				});
			}
		}
		this.setData({ type: options.type });
		// 获取学校圈子
		this.getPersonSchoolCircle();
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		this.onSearchTopic();
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

	// 选择圈子
	onGoSelectCircle: function () {
		wx.navigateTo({
			url: '/pages/publish/pickCircle/pickCircle',
		});
	},

	// 移除圈子
	onRemoveCircle: function (e) {
		const { circleid } = e.target.dataset;
		const { selectCircles } = this.data;
		let num = 0;
		selectCircles.forEach((item) => {
			if (item.selected) num++;
		});
		if (num === 1) {
			return wx.showToast({
				title: '请勿移除',
				icon: 'error',
			});
		}
		const newCircles = selectCircles.filter((item) => item.circle_id !== circleid);
		this.setData({ selectCircles: newCircles }, () => this.onSearchTopic());
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

	// 输入标题
	onChangeTitle: function (e) {
		const { detail } = e;
		this.setData({ title: detail });
	},

	// 输入内容
	onChangeDesc: function (e) {
		const { detail } = e;
		this.setData({ desc: detail });
	},

	// 选择图片
	chooseImg: function () {
		const self = this;
		wx.chooseImage({
			count: 9,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success(res) {
				// tempFilePath可以作为img标签的src属性显示图片
				const { tempFilePaths } = res;
				self.setData({ imgUrls: tempFilePaths });
			},
			fail: function () {
				wx.showToast({
					title: '请重新选择',
					icon: 'error',
				});
			},
		});
	},

	// 移除图片
	onRemoveImg: function (e) {
		const { idx } = e.target.dataset;
		const { imgUrls } = this.data;
		imgUrls.splice(idx, 1);
		this.setData({ imgUrls });
	},

	showErrorToast: function (title) {
		wx.showToast({
			title,
			icon: 'error',
		});
	},

	// 发布
	onSave: async function () {
		const { title, desc, imgUrls, selectCircles, topicList, type } = this.data;
		// 上传图片
		if (type === 'posts' && !title) return this.showErrorToast('请输入标题');
		if (selectCircles && selectCircles.length === 0) return this.showErrorToast('请选择圈子');
		const uploadImgUrls = [];
		if (imgUrls && imgUrls.length !== 0) {
			let len = imgUrls.length;
			loading.showLoading();
			while (len > 0) {
				len -= 1;
				const filename = await this.uploadImg(imgUrls[len]);
				uploadImgUrls.push(filename);
			}
		}
		// 选择的圈子id
		const selectCirIds = [];
		// 选择的话题id
		const topicIds = [];
		selectCircles.forEach((item) => selectCirIds.push(item.circle_id));
		topicList.forEach((circle) => {
			if (circle.topics && circle.topics.length !== 0) {
				circle.topics.forEach((item) => {
					if (item.selected) topicIds.push(item.topic_id);
				});
			}
		});
		const user_id = wx.getStorageSync('user_id');
		post({
			url: '/posts/addPostsOrBlogs',
			data: {
				user_id,
				title,
				desc,
				imgUrls: uploadImgUrls,
				selectCirIds,
				topicIds,
				type: type === 'post' ? 1 : 2,
			},
		})
			.then((res) => {
				if (res === 'success') {
					wx.showToast({
						title: '发布成功',
						icon: 'success',
					});
					setTimeout(() => {
						wx.navigateBack({
							complete: () => {},
						});
					}, 500);
				}
			})
			.finally(() => loading.hideLoading());
	},

	// 上传图片
	uploadImg: function (filePath) {
		return new Promise((resolve, reject) => {
			wx.uploadFile({
				filePath: filePath,
				name: 'file',
				url: `${baseUrl}/posts/uploadImg`,
				success: function (result) {
					const filename = JSON.parse(result.data).data;
					resolve(filename);
				},
				fail: function () {
					wx.showToast({
						title: '上传失败',
						icon: 'error',
					});
					reject('系统错误');
				},
			});
		});
	},
});
