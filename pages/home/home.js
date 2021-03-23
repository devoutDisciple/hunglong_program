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
		activeTab: 1, // 选中的tab
		circleList: [], // 圈子列表
		activeNames: ['1'],
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
			console.log(res, 1111);
			this.setData({
				circleList: [{ id: 'attention', name: '关注' }, { id: 'recommend', name: '广场' }, ...res],
			});
		});
	},

	/**
	 * 改变话题
	 */
	onChange(event) {
		this.setData({
			activeNames: event.detail,
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
