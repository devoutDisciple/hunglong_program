import login from '../../utils/login';
import loading from '../../utils/loading';
import { get } from '../../utils/request';
import { baseUrl } from '../../config/config';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		fixed: false, // 滚动的距离
		baseUrl,
		plateList: [], // 板块列表
		circleList: [], // 圈子列表
		topicList: [], // 话题列表
		activeTab: 1, // 选中的tab
		activeTopicId: '', // 选中的话题
		userDetail: {}, // 用户基本信息
		dataList: [], // 数据列表
		topicClass: 'topic_origin',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {
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

	// 滚动时
	onPageScroll: function (e) {
		const { fixed } = this.data;
		const { scrollTop } = e.detail;
		if (scrollTop > 159 && !fixed) {
			this.setData({ fixed: true });
		}
		if (scrollTop < 159 && fixed) {
			this.setData({ fixed: false });
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
		const res = await get({ url: '/user/getUserByUserId', data: { user_id } });
		this.setData({ userDetail: res || {} });
	},

	// 获取板块信息
	getPlateMsg: async function () {
		const res = await get({ url: '/plate/getAll' });
		this.setData({ plateList: res });
	},

	// 获取圈子列表
	getCircleList: async function (user_id) {
		const res = await get({ url: '/circle/getAllByUserId', data: { user_id } });
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
		const res = await get({ url: '/content/recomment' });
		console.log(res, 111);
		this.setData({ dataList: res || [] });
	},

	// 改变圈子
	onChangeCircle: function (e) {
		const { index } = e.detail;
		const { circleList } = this.data;
		const { id } = circleList[index];
		// 选择关注或者广场 attention-关注 recommend-广场
		if (id === 'attention' || id === 'recommend') {
			console.log(`选择的tabid是: ${id}`);
			this.setData({ topicList: [] });
		} else {
			this.getTopicByCircleId(id);
		}
		// 重置选择的话题id
		this.setData({ activeTopicId: '' });
	},

	// 改变话题
	onChangeTopic: function (e) {
		const { topic_id } = e.currentTarget.dataset;
		this.setData({ activeTopicId: topic_id });
	},

	// 点击发布
	onPublish: function (e) {
		const { itemid } = e.detail;
		const user_id = wx.getStorageSync('user_id');
		// 如果没有登录，跳转到登录页面
		if (!user_id) {
			return wx.navigateTo({
				url: '/pages/login/wxLogin/wxLogin',
			});
		}
		// 如果没有选择学校，去完善个人信息
		const { userDetail } = this.data;
		if (!userDetail.school) {
			return wx.navigateTo({
				url: '/pages/my/personMsg/personMsg',
			});
		}
		const url = {
			posts: '/pages/publish/posts/posts?type=posts', // 帖子
			blogs: '/pages/publish/posts/posts?type=blogs', // 博客
			vote: '/pages/publish/vote/vote', // 投票pk
			image: '/pages/publish/posts/posts?type=posts', // 图片
			vedio: '/pages/publish/posts/posts?type=blogs', // 视频
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

	// 点击帖子内容区
	onTapCon: function () {
		wx.navigateTo({
			url: '/pages/detail/posts/posts',
		});
	},

	// 给帖子点赞
	onTapGood: function () {
		console.log('点赞');
	},
});
