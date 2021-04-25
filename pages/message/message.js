const app = getApp();
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		myReceiveGoodsNum: 0, // 我收到的点赞量
		myReceiveCommentsNum: 0, // 我收到的评论数量
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.watch();
	},

	// 监听数据函数
	watch: function () {
		// 设置点赞数量
		this.setData({ myReceiveGoodsNum: app.globalData.num.myReceiveGoodsNum });
		// 评论数量
		this.setData({ myReceiveCommentsNum: app.globalData.num.myReceiveCommentsNum });
		setInterval(() => {
			this.setData({ myReceiveGoodsNum: app.globalData.num.myReceiveGoodsNum });
			// 设置点赞数量
			this.setData({ myReceiveCommentsNum: app.globalData.num.myReceiveCommentsNum });
		}, 5000);
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
