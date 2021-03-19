import { post } from '../../../utils/request';

const app = getApp();

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		userInfo: {},
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {
		console.log(app, 888);
	},

	// 获取用户基本信息
	getUserInfo: function (e) {
		if (e && e.detail && e.detail.errMsg === 'getUserInfo:ok') {
			const { userInfo } = e.detail;
			// 微信登录
			wx.login({
				// 成功失败与否
				complete: (res) => {
					if (res && res.errMsg === 'login:ok') {
						const { code } = res;
						post({ url: '/login/loginByWxOpenid', data: { code, ...userInfo } }).then((data) => {
							console.log(app, 322);
							app.globalData.userInfo = data;
						});
					}
				},
			});
			this.setData({ userInfo: userInfo });
		}
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {},
});
