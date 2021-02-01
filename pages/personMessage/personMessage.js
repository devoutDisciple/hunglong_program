// pages/personMessage/personMessage.js
Page({
	/**
	 * 页面的初始数据
	 */
	data: {},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {},

	itemClick: function (e) {
		const type = e.detail;
		console.log(type, 555);
		if (type === 'sex') {
			wx.showActionSheet({
				alertText: '请选择',
				itemList: ['男', '女'],
				success(res) {
					console.log(res.tapIndex);
				},
				fail(res) {
					console.log(res.errMsg);
				},
			});
		}
	},
});
