import login from '../../../utils/login';

const app = getApp();

Page({
	/**
	 * 页面的初始数据
	 */
	data: {},

	// 获取用户基本信息
	getUserInfo: function (e) {
		if (e && e.detail && e.detail.errMsg === 'getUserInfo:ok') {
			const { userInfo } = e.detail;
			login.getLogin(userInfo).then((res) => {
				app.globalData.userInfo = res;
				wx.setStorageSync('wx_openid', res.wx_openid);
				wx.switchTab({
					url: '/pages/home/home',
				});
			});
		}
	},
});
