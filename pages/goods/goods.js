import { get } from '../../utils/request';
import loading from '../../utils/loading';
import login from '../../utils/login';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		userDetail: {},
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {
		this.getUserDetail();
	},

	// 获取用户基本信息
	getUserDetail: function () {
		if (!login.isLogin()) return;
		loading.showLoading();
		const user_id = wx.getStorageSync('user_id');
		get({ url: '/user/userDetailByUserId', data: { user_id } })
			.then((res) => {
				console.log(res, 234);
				this.setData({ userDetail: res || {} });
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
