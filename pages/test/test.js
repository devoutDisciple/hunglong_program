// pages/home/home.js
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		show: false,
	},

	getUserInfo: function () {
		wx.navigateTo({
			url: '../login/login',
		});
	},

	hello: function () {
		const { animationClass } = this.data;
		const flag = animationClass === 'circle_small' || !animationClass;
		this.setData({
			animationClass: flag ? 'circle_big' : 'circle_small',
			animationMask: flag ? 'mask_big' : 'mask_small',
		});
	},

	btnClick: function () {
		wx.showToast({
			title: '选择失败',
			icon: 'error',
		});
	},

	showPopup: function () {
		console.log(111);
		this.setData({
			show: true,
		});
	},

	onClose: function () {
		console.log(2222);
		this.setData({
			show: false,
		});
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log(options);
		wx.showTabBarRedDot({
			index: 1,
		});
		wx.setTabBarBadge({
			index: 1,
			text: '10',
		});
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
