// pages/publish/vote/vote.js
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		selectCircles: [], // 选择的圈子
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

	// 移除选择的圈子
	onRemoveCircle: function (e) {
		console.log(e, 234);
	},

	// 点击发布
	onSave: function () {
		const child = this.selectComponent('#vote');
		child.hello();
		console.log(child);
	},
});
