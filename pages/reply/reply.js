// pages/reply/reply.js
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		visible: false,
		focus: false,
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

	//   输入框聚焦
	openReply: function () {
		this.setData({ visible: true });
		setTimeout(() => {
			this.setData({ focus: true });
		}, 100);
	},

	onCloseIptDialog: function () {
		this.setData({ visible: false, focus: false });
	},
});
