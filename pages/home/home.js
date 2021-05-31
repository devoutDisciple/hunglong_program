import login from '../../utils/login';
import loading from '../../utils/loading';
import { get } from '../../utils/request';
import { filterContentTypeByNum } from '../../utils/filter';
import util from '../../utils/util';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		plateList: [], // 板块列表
		circleList: [], // 圈子列表
		topicList: [], // 话题列表
		activeTab: 1, // 选中的tab
		activeCircleId: 'recommend',
		activeTopicId: '', // 选中的话题
		userDetail: {}, // 用户基本信息
		dataList: [], // 数据列表
		topicClass: 'topic_origin',
		headerHight: 60,
		videoContext: {}, // 当前播放视频的上下文
		isLoading: false, // 上拉加载的时候
		current: 1, // 当前页码
		lowerThreshold: 400, // 距离底部多远的时候触发上拉事件
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {
		// 获取设备信息
		util.getDeviceInfo().then((res) => {
			this.setData({ headerHight: res.headerHight });
		});
		this.initData();
	},

	initData: function () {
		const user_id = wx.getStorageSync('user_id');
		if (!user_id) {
			login.getLogin().then(() => {
				this.getInitMsg();
			});
		} else {
			this.getInitMsg();
		}
		this.getRecomment();
	},

	/**
	 * 滑动到底部的时候
	 */
	onScrollBtm: function () {
		const { isLoading } = this.data;
		if (!isLoading) {
			this.setData({ isLoading: true }, async () => {
				await this.getRecomment();
				this.setData({ isLoading: false });
			});
		}
	},

	// 初始化需要获得的信息
	getInitMsg: async function () {
		const user_id = wx.getStorageSync('user_id');
		loading.showLoading();
		await this.getPlateMsg(); // 获取板块信息
		await this.getCircleList(user_id); // 获取圈子列表
		await this.getUserDetailByUserId(user_id); // 获取用户信息
		loading.hideLoading();
	},

	// 获取用户信息
	getUserDetailByUserId: async function (user_id) {
		const res = await get({ url: '/user/userDetailByUserId', data: { user_id } });
		this.setData({ userDetail: res || {} });
	},

	// 获取板块信息
	getPlateMsg: async function () {
		const res = await get({ url: '/plate/all' });
		this.setData({ plateList: res });
	},

	// 获取圈子列表
	getCircleList: async function (user_id) {
		const res = await get({ url: '/circle/allByUserId', data: { user_id } });
		this.setData({
			circleList: [{ id: 'attention', name: '关注' }, { id: 'recommend', name: '广场' }, ...res],
		});
	},

	// 获取话题
	getTopicByCircleId: async function (circle_id) {
		loading.showLoading();
		const res = await get({ url: '/topic/getByCircleId', data: { circle_id } });
		this.setData({ topicList: res || [] });
		loading.hideLoading();
	},

	// 获取推荐内容
	getRecomment: async function () {
		const { current, dataList, activeCircleId } = this.data;
		const user_id = wx.getStorageSync('user_id');
		const res = await get({ url: '/content/recomment', data: { user_id, current, activeCircleId } });
		res.forEach((item) => {
			item.type = filterContentTypeByNum(item.type);
		});
		const newList = [...dataList, ...res];
		this.setData({ dataList: newList, current: current + 1 });
	},

	// 改变圈子
	onChangeCircle: function (e) {
		const { index } = e.detail;
		const { circleList } = this.data;
		const { id } = circleList[index];
		console.log(`选择的tabid是: ${id}`);
		// 重置选择的话题id
		this.setData({ activeTopicId: '', topicList: [], activeCircleId: id, dataList: [], current: 1 }, () => {
			// 选择关注或者广场 attention-关注 recommend-广场
			if (id === 'attention') {
				// 将话题列表置空
			} else {
				// 根据圈子id获取话题
				this.getTopicByCircleId(id);
			}
			// 获取推荐内容
			this.getRecomment();
		});
	},

	// 改变话题
	onChangeTopic: function (e) {
		const { topic_id } = e.currentTarget.dataset;
		this.setData({ activeTopicId: topic_id });
	},

	// 点击发布
	onPublish: function (e) {
		const { itemid } = e.detail;
		// 如果没有登录，跳转到登录页面
		if (!login.isLogin()) return;
		// 如果没有选择学校，去完善个人信息
		const { userDetail } = this.data;
		const user_id = wx.getStorageSync('user_id');
		if (!userDetail.school) {
			return wx.navigateTo({
				url: `/pages/my/personMsg/personMsg?user_id=${user_id}`,
			});
		}
		const url = {
			posts: '/pages/publish/posts/posts?type=posts', // 帖子
			blogs: '/pages/publish/posts/posts?type=blogs', // 博客
			vote: '/pages/publish/vote/vote', // 投票pk
			image: '/pages/publish/posts/posts?type=img', // 图片
			video: '/pages/publish/video/video', // 视频
		};
		wx.navigateTo({
			url: url[itemid],
		});
	},

	/**
	 * 点击展开话题
	 */
	cntOpen: function () {
		const { topicClass } = this.data;
		this.setData({ topicClass: topicClass !== 'topic_open' ? 'topic_open' : 'topic_close' });
	},
});
