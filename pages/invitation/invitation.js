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
	onLoad: function (options) {
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
