import login from '../../utils/login';
import loading from '../../utils/loading';
import { get } from '../../utils/request';
import util from '../../utils/util';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		screenWidth: 414, // 屏幕宽度
		headerHight: 60, // 导航栏高度
		plateList: [], // 板块列表
		circleList: [], // 圈子列表
		topicList: [], // 话题列表
		activeTab: 1, // 选中的tab
		activeCircleId: 'recommend',
		activeTopicId: '', // 选中的话题
		userDetail: {}, // 用户基本信息
		dataList: [], // 数据列表
		topicClass: 'topic_origin',
		videoContext: {}, // 当前播放视频的上下文
		isLoading: false, // 上拉加载的时候
		current: 1, // 当前页码
		lowerThreshold: 400, // 距离底部多远的时候触发上拉事件
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {
		wx.showShareMenu({
			withShareTicket: true,
			menus: ['shareAppMessage'],
		});
		// 获取设备信息
		util.getDeviceInfo().then((res) => {
			this.setData({ headerHight: res.headerHight, screenWidth: res.screenWidth });
			this.initData();
		});
	},

	// 重新加载
	onReloadData: function () {
		const user_id = wx.getStorageSync('user_id');
		this.reGetCircleList(user_id); // 获取圈子列表
	},

	// 分享
	onShareAppMessage: function (res) {
		const user_id = wx.getStorageSync('user_id');
		if (!login.isLogin() || !user_id) return;
		// 页面转发
		if (res.from === 'menu') {
			return {
				path: `/pages/home/home?from=1&userid=${user_id}`,
			};
		}
		// 按钮转发
		if (res === 'button') {
			const { contentid, type } = res.target.dataset;
			return {
				path: `/pages/home/home?from=2&userid=${user_id}&content_id=${contentid}&type=${type}`,
			};
		}
	},

	// 初始化查询
	initData: function () {
		const user_id = wx.getStorageSync('user_id');
		if (!user_id) {
			login.getLogin().then(() => {
				this.getInitMsg();
			});
		} else {
			this.getInitMsg();
		}
	},

	// 初始化需要获得的信息
	getInitMsg: async function () {
		const user_id = wx.getStorageSync('user_id');
		await this.getPlateMsg(); // 获取板块信息
		await this.getCircleList(user_id); // 获取圈子列表
		await this.getUserDetailByUserId(user_id); // 获取用户信息
	},

	// 点击模块
	onTapPlate: function (e) {
		const { plateid, link } = e.currentTarget.dataset;
		if (link === 2) {
			return wx.showToast({
				icon: 'error',
				title: '敬请期待',
			});
		}
		wx.navigateTo({
			url: `/pages/circlePlate/circlePlate?plateid=${plateid}`,
		});
	},

	/**
	 * 滑动到底部的时候
	 */
	onScrollBtm: function () {
		const { isLoading } = this.data;
		if (!isLoading) {
			this.setData({ isLoading: true }, async () => {
				const { activeCircleId } = this.data;
				if (activeCircleId === 'attention') {
					await this.getAttentionContents(2);
				} else {
					// 获取圈子内容
					await this.getContentsByCircleId(2);
				}
			});
		}
	},

	// 获取用户信息
	getUserDetailByUserId: async function (user_id) {
		if (!user_id) return;
		const res = await get({ url: '/user/userDetailByUserId', data: { user_id } });
		this.setData({ userDetail: res || {} });
	},

	// 获取板块信息
	getPlateMsg: async function () {
		const res = await get({ url: '/plate/all' });
		this.setData({ plateList: res });
	},

	// 获取圈子列表
	reGetCircleList: async function (user_id) {
		const res = await get({ url: '/circle/allByUserId', data: { user_id } });
		this.setData(
			{
				circleList: [{ id: 'attention', name: '关注' }, { id: 'recommend', name: '广场' }, ...res],
			},
			() => {
				this.setData({ activeTab: 0, current: -1 }, () => {
					setTimeout(() => {
						this.setData({ activeTab: 1, current: 1 });
					}, 0);
				});
			},
		);
	},

	// 获取圈子列表
	getCircleList: async function (user_id) {
		const res = await get({ url: '/circle/allByUserId', data: { user_id } });
		this.setData(
			{
				circleList: [{ id: 'attention', name: '关注' }, { id: 'recommend', name: '广场' }, ...res],
			},
			() => this.setData({ activeTab: 1, current: 1 }),
		);
	},

	// 获取话题
	getTopicByCircleId: async function (circle_id) {
		const res = await get({ url: '/topic/getByCircleId', data: { circle_id } });
		this.setData({ topicList: res || [] });
	},

	// 获取圈子内容
	getContentsByCircleId: async function (flag) {
		// 1-需要loading 2-不需要
		if (flag === 1) loading.showLoading();
		const { current, dataList, activeCircleId, screenWidth } = this.data;
		if (current === -1) return;
		const user_id = wx.getStorageSync('user_id');
		const res = await get({ url: '/content/recomment', data: { user_id, current, activeCircleId } });
		util.handleContentList(res, screenWidth);
		const newList = [...dataList, ...res];
		this.setData({ dataList: newList, current: current + 1, loading: false }, () => {
			if (flag === 1) loading.hideLoading();
		});
	},

	// 改变圈子
	onChangeCircle: function (e) {
		const { index } = e.detail;
		const { circleList } = this.data;
		const { id } = circleList[index];
		// 重置选择的话题id
		this.setData(
			{ activeTab: index, activeTopicId: '', topicList: [], activeCircleId: id, dataList: [], current: 1 },
			() => {
				// 根据圈子id获取话题
				this.getTopicByCircleId(id);
				// 选择关注或者广场 attention-关注 recommend-广场
				if (id === 'attention') {
					this.getAttentionContents(1);
				} else {
					// 获取圈子内容
					this.getContentsByCircleId(1);
				}
			},
		);
	},

	// 获取关注的人发布的内容
	getAttentionContents: async function (flag) {
		// 1-需要loading 2-不需要
		if (flag === 1) loading.showLoading();
		const user_id = wx.getStorageSync('user_id');
		if (!login.isLogin() || !user_id) return;
		const { current, dataList, screenWidth } = this.data;
		const res = await get({ url: '/content/userAttentionContents', data: { user_id, current } });
		util.handleContentList(res, screenWidth);
		const newList = [...dataList, ...res];
		this.setData({ dataList: newList, current: current + 1, isLoading: false }, () => {
			if (flag === 1) loading.hideLoading();
		});
	},

	// 改变话题
	onChangeTopic: function (e) {
		const { topic_id } = e.currentTarget.dataset;
		this.setData({ activeTopicId: topic_id });
	},

	// 点击加号
	onTapAddCircle: function () {
		if (!login.isLogin()) return;
		wx.navigateTo({
			url: '/pages/selCircle/selCircle',
		});
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
