import login from '../../utils/login';
import { get } from '../../utils/request';
import { baseUrl } from '../../config/config';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		baseUrl,
		plateList: [
			{
				key: 'school',
				title: '学校',
				iconUrl: '/asserts/public/school.png',
			},
		],
		activeTab: 1, // 选中的tab
		activeNames: ['1'],
		topicClass: 'topic_origin',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {
		const wx_openid = wx.getStorageSync('wx_openid');
		login.getLogin().then((res) => {
			console.log(res, 111);
			this.getPlateMsg();
		});
	},

	// 获取板块信息
	getPlateMsg: function () {
		get({ url: '/plate/getAll' }).then((res) => {
			console.log(res, 2222);
			this.setData({ plateList: res });
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
