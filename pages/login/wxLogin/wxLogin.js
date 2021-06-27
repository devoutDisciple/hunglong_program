import login from '../../../utils/login';

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
				wx.setStorageSync('user_id', res.id);
				wx.setStorageSync('is_login', 1);
				wx.navigateTo({
					// url: `/pages/my/personMsg/personMsg?user_id=${res.id}`,
					url: `/pages/identity/identity?user_id=${res.id}`,
				});
			});
		}
	},
});
