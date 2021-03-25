import config from '../../config/config';
import { get } from '../../utils/request';
import loading from '../../utils/loading';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		headerHight: 60,
		hasGetUserInfo: false,
		userDetail: {
			photo: `${config.baseUrl}/public/photo.png`,
		}, // 用户基本信息
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad() {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		const user_id = wx.getStorageSync('user_id');
		// 如果还没登录;
		if (!user_id) {
			return wx.navigateTo({
				url: '/pages/login/wxLogin/wxLogin',
			});
		}
		if (!this.data.hasGetUserInfo) {
			this.setData({ hasGetUserInfo: true });
			this.getUserMsg(user_id);
		}
		// const wx_openid = 'oa6Ki4kKojyBqHQJ7jD6520nq4vc';
		// this.getUserMsg(wx_openid);
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

	// 获取用户基本信息
	getUserMsg(user_id) {
		loading.showLoading();
		get({ url: '/user/getUserByUserId', data: { user_id: user_id } })
			.then((res) => {
				this.setData({ userDetail: res });
			})
			.finally(() => {
				loading.hideLoading();
			});
	},

	/**
	 * 点击条件按钮
	 */
	itemClick: function (e) {
		const { detail } = e;
		if (detail === 'account') {
			wx.navigateTo({
				url: '/pages/my/accountMsg/accountMsg',
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
