// pages/my/my.js
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		headerHight: 60,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		console.log(options, 111);
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
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

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow(options) {
		console.log(options, 222);
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide() {
		console.log(3333);
	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {
		console.log(444);
	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh() {},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {},
});
