import login from '../../utils/login';
import { get } from '../../utils/request';
import { baseUrl } from '../../config/config';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		baseUrl,
		plateList: [], // 板块列表
		circleList: [], // 圈子列表
		topicList: [], // 话题列表
		activeTab: '', // 选中的tab
		activeTopicId: '', // 选中的话题
		topicClass: 'topic_origin',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {
		const wx_openid = wx.getStorageSync('wx_openid');
		if (!wx_openid) {
			login.getLogin().then(() => {
				this.getInitMsg();
			});
		} else {
			this.getInitMsg();
		}
	},

	// 初始化需要获得的信息
	getInitMsg: function () {
		const user_id = wx.getStorageSync('user_id');
		this.getPlateMsg();
		this.getCircleList(user_id);
	},

	// 获取板块信息
	getPlateMsg: function () {
		get({ url: '/plate/getAll' }).then((res) => {
			this.setData({ plateList: res });
		});
	},

	// 获取圈子列表
	getCircleList(user_id) {
		get({ url: '/circle/getAllByUserId', data: { user_id } }).then((res) => {
			this.setData({
				circleList: [{ id: 'attention', name: '关注' }, { id: 'recommend', name: '广场' }, ...res],
				activeTab: 3,
			});
		});
	},

	// 获取话题
	getTopicByCircleId(circle_id) {
		get({ url: '/topic/getAllByCircleId', data: { circle_id } }).then((res) => {
			this.setData({ topicList: res || [] });
		});
	},

	// 改变圈子
	onChangeCircle(e) {
		const { index } = e.detail;
		const { circleList } = this.data;
		const { id } = circleList[index];
		// 选择关注或者广场 attention-关注 recommend-广场
		if (id === 'attention' || id === 'recommend') {
			console.log(`选择的tabid是: ${id}`);
		} else {
			this.getTopicByCircleId(id);
		}
		// 重置选择的话题id
		this.setData({ activeTopicId: '' });
	},

	// 改变话题
	onChangeTopic(e) {
		const { topic_id } = e.currentTarget.dataset;
		this.setData({ activeTopicId: topic_id });
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
