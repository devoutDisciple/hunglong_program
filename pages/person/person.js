import { get } from '../../utils/request';
import util from '../../utils/util';
import loading from '../../utils/loading';
import { filterContentTypeByNum } from '../../utils/filter';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		navHeight: '40px',
		statusBarHeight: '20px',
		backIconHeight: '20px',
		backIconMarginTop: '10px',
		activeIdx: 0, // 当前选择的tab
		attentionNum: 0, // 关注量
		user_id: '', // 当前主页的用户id
		userDetail: {}, // 当前用户的数据
		current_user_id: '', // 当前登录账户
		dataList: [], // 数据
		tabList: [
			{
				key: 'posts',
				value: '文字',
			},
			{
				key: 'blog',
				value: '视频',
			},
			{
				key: 'vote',
				value: '相册',
			},
		],
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		const current_user_id = wx.getStorageSync('user_id');
		const { user_id } = options;
		this.setData({ user_id, current_user_id }, () => {
			// 获取设备信息
			this.getDeviceData();
			// 获取用户基本信息
			this.getUserDetail();
			// 获取关注数量
			this.getMyAttentionUsersNum();
			// 获取帖子博客等内容
			this.getPostsByUserId(0);
		});
	},

	// 点击返回
	onGoback: function () {
		wx.navigateBack({
			complete: () => {},
		});
	},

	// 获取设备信息
	getDeviceData: function () {
		// 获取设备信息
		util.getDeviceInfo().then((res) => {
			this.setData({
				navHeight: `${res.navHeight}px`,
				statusBarHeight: `${res.statusBarHeight}px`,
				backIconHeight: `${res.navHeight / 2}px`,
				backIconMarginTop: `${res.navHeight / 4}px`,
			});
		});
	},

	// 获取用户基本信息
	getUserDetail: function () {
		loading.showLoading();
		const { user_id } = this.data;
		get({ url: '/user/userDetailByUserId', data: { user_id } })
			.then((res) => {
				console.log(res, 123);
				this.setData({ userDetail: res });
			})
			.finally(() => loading.hideLoading());
	},
	// 获取关注数量
	getMyAttentionUsersNum: function () {
		loading.showLoading();
		const { user_id } = this.data;
		get({ url: '/attention/myAttentionUsersNum', data: { user_id } })
			.then((res) => {
				this.setData({ attentionNum: res.num });
			})
			.finally(() => loading.hideLoading());
	},

	// 切换tab的时候
	onChangeTab: function (e) {
		const { index } = e.detail;
		// this.setData({ activeIdx: index });
		this.getPostsByUserId(index);
	},

	// 获取帖子博客等相应内容
	getPostsByUserId: function (activeIdx) {
		loading.showLoading();
		const { user_id } = this.data;
		get({ url: '/content/contentsByTypeAndUserId', data: { user_id, activeIdx } })
			.then((res) => {
				if (Array.isArray) {
					res.forEach((item) => {
						item.type = filterContentTypeByNum(item.type);
					});
					this.setData({ dataList: res || [] });
				} else {
					this.setData({ dataList: [] });
				}
			})
			.finally(() => loading.hideLoading());
	},
});
