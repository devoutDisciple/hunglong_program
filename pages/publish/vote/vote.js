// pages/publish/vote/vote.js
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		activeTab: 1, // 当前选择的tab
		selectCircles: [], // 选择的圈子
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
		this.voteDom = this.selectComponent('#vote');
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {},

	// 改变tab
	onChangeTab: function (e) {
		const { index } = e.detail;
		this.setData({ activeTab: index });
	},

	// 移除选择的圈子
	onRemoveCircle: function (e) {
		console.log(e, 234);
	},

	// 点击发布
	onSave: function () {
		console.log(this.voteDom);
	},
});
