/* eslint-disable no-await-in-loop */
import loading from '../../../utils/loading';
import util from '../../../utils/util';
import { get, post, uploadFile } from '../../../utils/request';

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
			if (options.type === 'img') {
				wx.setNavigationBarTitle({
					title: '发布图片',
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
		const { imgUrls } = this.data;
		wx.chooseImage({
			count: 9,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success(res) {
				// tempFilePath可以作为img标签的src属性显示图片
				const { tempFilePaths } = res;
				self.setData({ imgUrls: [...imgUrls, ...tempFilePaths] });
				loading.hideLoading();
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
				const fileDetail = await uploadFile({ url: '/posts/uploadImg', data: imgUrls[len] });
				uploadImgUrls.push(fileDetail);
			}
		}
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
		let postType = 1;
		if (type === 'posts') postType = 1;
		if (type === 'blogs') postType = 2;
		if (type === 'img') postType = 6;
		post({
			url: '/posts/addPostsOrBlogs',
			data: {
				user_id,
				title,
				desc,
				imgUrls: uploadImgUrls,
				circle_ids: selectCirIds,
				circle_names: selectCirNames,
				topic_ids: topicIds,
				topic_names: topicNames,
				type: postType,
			},
		})
			.then((res) => {
				if (res === 'success') {
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
				}
			})
			.finally(() => loading.hideLoading());
	},
});
