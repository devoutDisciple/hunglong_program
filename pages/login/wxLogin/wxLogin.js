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
			login.getLogin(userInfo).then(() => {
				wx.setStorageSync('is_login', 1);
				wx.switchTab({
					url: '/pages/home/home',
				});
			});
		}
	},
});
