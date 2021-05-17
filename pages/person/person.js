import { get, post } from '../../utils/request';
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
		activeIdx: 2, // 当前选择的tab
		attentionNum: 0, // 关注量
		user_id: '', // 当前主页的用户id
		userDetail: {}, // 当前用户的数据
		current_user_id: '', // 当前登录账户
		txtObj: {
			threeDays: [], // 三天内的数据
			monthDays: [], // 一个月内的数据
			longago: [], // 一月以前的数据
		}, // 文字数据
		videoObj: {
			threeDays: [], // 三天内的数据
			monthDays: [], // 一个月内的数据
			longago: [], // 一月以前的数据
		}, // 视频数据

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
		const { user_id } = this.data;
		get({ url: '/user/userDetailByUserId', data: { user_id } }).then((res) => {
			this.setData({ userDetail: res }, () => {
				// 获取是否已经关注该用户
				this.getHadAttentionUser();
			});
		});
	},

	// 获取关注数量
	getMyAttentionUsersNum: function () {
		const { user_id } = this.data;
		get({ url: '/attention/myAttentionUsersNum', data: { user_id } }).then((res) => {
			this.setData({ attentionNum: res.num });
		});
	},

	// 获取是否已经关注该用户
	getHadAttentionUser: function () {
		const { user_id, current_user_id, userDetail } = this.data;
		get({ url: '/user/hadAttentionUser', data: { user_id, current_user_id } }).then((res) => {
			userDetail.hadAttention = res.hadAttention;
			this.setData({ userDetail });
		});
	},

	// 点击关注获取取消
	onAttentionUser: function () {
		const { userDetail } = this.data;
		const user_id = wx.getStorageSync('user_id');
		if (!user_id) {
			return wx.showToast({
				title: '请先登录',
				icon: 'error',
			});
		}
		userDetail.hadAttention = !userDetail.hadAttention;
		post({ url: '/attention/attentionUser', data: { user_id, other_id: userDetail.id } });
		this.setData({ userDetail });
	},

	// 切换tab的时候
	onChangeTab: function (e) {
		const { index } = e.detail;

		this.setData(
			{
				activeIdx: index,
				txtObj: {
					threeDays: [], // 三天内的数据
					monthDays: [], // 一个月内的数据
					longago: [], // 一月以前的数据
				},
				videoObj: {
					threeDays: [], // 三天内的数据
					monthDays: [], // 一个月内的数据
					longago: [], // 一月以前的数据
				},
			},
			() => {
				if (index === 2) {
					return;
				}
				this.getPostsByUserId(index);
			},
		);
	},

	// 获取帖子博客等相应内容
	getPostsByUserId: function (activeIdx) {
		loading.showLoading();
		const { user_id, txtObj } = this.data;
		get({ url: '/content/contentsByTypeAndUserId', data: { user_id, activeIdx } })
			.then((res) => {
				if (Array.isArray) {
					const {
						threeDays = [], // 三天内的数据
						monthDays = [], // 一个月内的数据
						longago = [], // 一月以前的数据
					} = res;
					threeDays.forEach((item) => {
						item.type = filterContentTypeByNum(item.type);
					});
					monthDays.forEach((item) => {
						item.type = filterContentTypeByNum(item.type);
					});
					longago.forEach((item) => {
						item.type = filterContentTypeByNum(item.type);
					});
					const result = {
						threeDays: txtObj.threeDays.concat(threeDays),
						monthDays: txtObj.monthDays.concat(monthDays),
						longago: txtObj.longago.concat(longago),
					};
					console.log(result, 123);
					if (activeIdx === 0) {
						this.setData({ txtObj: result || [] });
					} else if (activeIdx === 1) {
						this.setData({ videoObj: result || [] });
					}
				} else {
					this.setData({
						txtObj: {
							threeDays: [], // 三天内的数据
							monthDays: [], // 一个月内的数据
							longago: [], // 一月以前的数据
						},
					});
				}
			})
			.finally(() => loading.hideLoading());
	},
});
