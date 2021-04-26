import emoji from '../../../config/emoji';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		focus: true, // input是否聚焦
		showEmoji: true, // 是否展示emoji
		emojis: emoji.emoji,
		msgTxt: '',
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

	// 键盘聚焦的事件
	onInputFocus: function (e) {
		console.log(e, 23423);
		this.setData({ focus: true });
	},

	// 键盘失焦事件
	onInputBlur: function () {
		this.setData({ focus: false });
	},

	// 展示emoji
	onShowEmoji: function () {
		this.setData({ showEmoji: !this.data.showEmoji });
	},

	// 点击emoji
	onClickEmoji: function (e) {
		const { msgTxt } = this.data;
		const { item } = e.currentTarget.dataset;
		this.setData({ msgTxt: `${msgTxt} ${item} ` });
	},

	// 输入框输入的时候
	onChangeValue: function (e) {
		console.log(e, 234);
		const { value } = e.detail;
		this.setData({ msgTxt: value });
	},
});
