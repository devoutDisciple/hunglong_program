import { get } from '../../../utils/request';
import loading from '../../../utils/loading';
import login from '../../../utils/login';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		headerHight: 60,
		hasGetUserInfo: false,
		showSelfImg: false,
		userDetail: {
			photo: '',
		}, // 用户基本信息
		userData: {
			publish: 0,
			fans: 0,
			goods: 0,
			fellow: 0,
			integral: 0,
		},
		viewRecords: [], // 浏览历史记录
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad() {
		// 获取统计数据
		this.getUserData();
		// 获取用户浏览记录
		this.getUserViewRecord();
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		// 判断用户是否登录
		if (!login.isLogin()) return;
		this.getInitData();
	},

	// 获取初始数据
	getInitData: function () {
		// 获取用户基本信息
		this.getUserMsg();
		// 获取统计数据
		this.getUserData();
		// 获取用户浏览记录
		this.getUserViewRecord();
	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {
		wx.stopPullDownRefresh();
		this.getInitData();
	},

	/**
	 * 获取屏幕相关信息
	 */
	onReady() {
		const self = this;
		// 菜单按钮的布局信息
		const menuDetail = wx.getMenuButtonBoundingClientRect();
		// 获取设备信息
		wx.getSystemInfo({
			success: function (res) {
				const { height: btnHeight, top: btnTop } = menuDetail;
				const { statusBarHeight } = res;
				const headerHight = (btnTop - statusBarHeight) * 2 + statusBarHeight + btnHeight;
				self.setData({ headerHight });
			},
		});
	},

	// 获取用户浏览历史
	getUserViewRecord: function () {
		const user_id = wx.getStorageSync('user_id');
		if (!user_id) return;
		get({ url: '/viewRecord/recordsByUserId', data: { user_id } }).then((res) => {
			this.setData({ viewRecords: res });
		});
	},

	// 点击浏览记录某一条
	onSearchUserDetail: function (e) {
		const { userid } = e.currentTarget.dataset;
		wx.navigateTo({
			url: `/pages/person/person?user_id=${userid}`,
		});
	},

	// 点击用户头像
	onGoUserDetail: function () {
		const { userDetail } = this.data;
		// 判断用户是否登录
		if (!login.isLogin()) return;
		wx.navigateTo({
			url: `/pages/person/person?user_id=${userDetail.id}`,
		});
	},

	// 点击个人信息
	onGoUserMsg: function () {
		// 判断用户是否登录
		if (!login.isLogin()) return;
		const { userDetail } = this.data;
		wx.navigateTo({
			url: `/pages/my/personMsg/personMsg?user_id=${userDetail.id}&from=my`,
		});
	},

	// 获取用户基本信息
	getUserMsg: function () {
		loading.showLoading();
		const user_id = wx.getStorageSync('user_id');
		if (!user_id) return;
		get({ url: '/user/userDetailByUserId', data: { user_id: user_id } })
			.then((res) => {
				const flag = res.photo.includes('https://thirdwx.qlogo.cn');
				this.setData({ userDetail: res, showSelfImg: flag });
			})
			.finally(() => loading.hideLoading());
	},

	// 获取用户数据
	getUserData: function () {
		loading.showLoading();
		const user_id = wx.getStorageSync('user_id');
		if (!user_id) return;
		get({ url: '/user/userData', data: { user_id } })
			.then((res) => {
				this.setData({ userData: res });
			})
			.finally(() => loading.hideLoading());
	},

	// 点击 发布 我的赞 粉丝 关注
	onTapChunk: function (e) {
		const { item } = e.currentTarget.dataset;
		const user_id = wx.getStorageSync('user_id');
		const urls = {
			publish: `/pages/my/myPublish/myPublish?user_id=${user_id}`,
			fans: `/pages/my/myFans/myFans?user_id=${user_id}`,
			goods: `/pages/myGoodsRecord/myGoodsRecord`,
			attention: `/pages/my/myAttention/myAttention?user_id=${user_id}`,
			viewMe: '/pages/my/viewMe/viewMe', // 谁看过我
		};
		wx.navigateTo({
			url: urls[item],
		});
	},

	/**
	 * 点击条件按钮
	 */
	itemClick: function (e) {
		const { detail } = e;
		const user_id = wx.getStorageSync('user_id');
		if (detail === 'account') {
			wx.navigateTo({
				url: `/pages/my/personMsg/personMsg?user_id=${user_id}`,
			});
		}
		if (detail === 'invitation') {
			wx.navigateTo({
				url: `/pages/invitation/invitation`,
			});
		}
		if (detail === 'approve') {
			wx.navigateTo({
				url: `/pages/approve/approve`,
			});
		}
		if (detail === 'password') {
			wx.navigateTo({
				url: '/pages/login/updatePass/updatePass',
			});
		}
		if (detail === 'msg') {
			wx.navigateTo({
				url: '/pages/my/feedbackMsg/feedbackMsg',
			});
		}
	},
});
