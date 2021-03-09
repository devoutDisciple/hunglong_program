// pages/phoneLogin/phoneLogin.js
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		success: false, // 验证成功
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {},

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
	onLogin: function () {
		this.setData({ success: !this.data.success });
	},
});
