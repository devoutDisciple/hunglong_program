import { get } from '../../../utils/request';
import loading from '../../../utils/loading';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		viewRecords: [], // 浏览历史记录
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {
		this.getRecordHistoryDetail();
	},

	// 查询被浏览历史详情
	getRecordHistoryDetail: function () {
		loading.showLoading();
		const user_id = wx.getStorageSync('user_id');
		get({ url: '/viewRecord/recordsDetailByUserId', data: { user_id } })
			.then((res) => {
				this.setData({ viewRecords: res });
			})
			.finally(() => loading.hideLoading());
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
