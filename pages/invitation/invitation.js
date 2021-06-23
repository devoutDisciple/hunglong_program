import util from '../../utils/util';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		navHeight: '40px',
		lineHeight: '47px',
		statusBarHeight: '26px',
		backIconHeight: '26px',
		backIconMarginTop: '10px',
		userDetail: { integral: 100 },
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {
		// 获取设备信息
		this.getDeviceData();
	},

	// 获取设备信息
	getDeviceData: function () {
		// 获取设备信息
		util.getDeviceInfo().then((res) => {
			this.setData({
				headerHight: `${res.headerHight}px`,
				navHeight: `${res.navHeight}px`,
				statusBarHeight: `${res.statusBarHeight}px`,
				backIconHeight: `${res.navHeight / 2}px`,
				backIconMarginTop: `${res.navHeight / 4}px`,
			});
		});
	},

	// 点击去完成
	onTapBtn: function (e) {
		const { key } = e.currentTarget.dataset;
		const user_id = wx.getStorageSync('user_id');
		if (!user_id) return;
		if (key === 'content') {
			wx.navigateTo({
				url: '/pages/publish/posts/posts',
			});
		}
		if (key === 'photo') {
			wx.navigateTo({
				url: `/pages/person/person?user_id=${user_id}`,
			});
		}
		if (key === 'home') {
			wx.navigateTo({
				url: `/pages/my/personMsg/personMsg?user_id=${user_id}`,
			});
		}
		if (key === 'interact') {
			wx.navigateTo({
				url: `/pages/home/home`,
			});
		}
	},

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
	onShareAppMessage: function () {
		const user_id = wx.getStorageSync('user_id');
		return {
			path: `/pages/invitation/invitation?from=6&userid=${user_id}`,
		};
	},
});
