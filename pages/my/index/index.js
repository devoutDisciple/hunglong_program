import config from '../../../config/config';
import { get } from '../../../utils/request';
import loading from '../../../utils/loading';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		headerHight: 60,
		hasGetUserInfo: false,
		userDetail: {
			photo: `${config.photoUrl}/photo.png`,
		}, // 用户基本信息
		userData: {
			attentionNum: 0,
			fansNum: 0,
			goodsNum: 0,
			publishNum: 0,
		},
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad() {
		// 获取统计数据
		this.getUserData();
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		const user_id = wx.getStorageSync('user_id');
		// 如果还没登录;
		if (!user_id) {
			return wx.navigateTo({
				url: '/pages/login/wxLogin/wxLogin',
			});
		}
		if (!this.data.hasGetUserInfo) {
			this.setData({ hasGetUserInfo: true });
			this.getUserMsg();
		}
	},

	/**
	 * 获取屏幕相关信息
	 */
	onReady() {
		const self = this;
		// 菜单按钮的布局信息
		const menuDetail = wx.getMenuButtonBoundingClientRect();
		// 获取设备信息
		wx.getSystemInfo({
			success: function (res) {
				const { height: btnHeight, top: btnTop } = menuDetail;
				const { statusBarHeight } = res;
				const headerHight = (btnTop - statusBarHeight) * 2 + statusBarHeight + btnHeight;
				self.setData({ headerHight });
			},
		});
	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {
		wx.stopPullDownRefresh();
		this.getUserMsg();
		this.getUserData();
	},

	// 获取用户基本信息
	getUserMsg: function () {
		loading.showLoading();
		const user_id = wx.getStorageSync('user_id');
		get({ url: '/user/getUserByUserId', data: { user_id: user_id } })
			.then((res) => {
				this.setData({ userDetail: res });
			})
			.finally(() => {
				loading.hideLoading();
			});
	},

	// 获取用户数据
	getUserData: function () {
		loading.showLoading();
		const user_id = wx.getStorageSync('user_id');
		get({ url: '/user/userData', data: { user_id } })
			.then((res) => {
				this.setData({ userData: res });
			})
			.finally(() => {
				loading.hideLoading();
			});
	},

	// 点击 发布 我的赞 粉丝 关注
	onTapChunk: function (e) {
		const { item } = e.currentTarget.dataset;
		const user_id = wx.getStorageSync('user_id');
		const urls = {
			publish: `/pages/my/myPublish/myPublish?user_id=${user_id}`,
			fans: `/pages/my/myFans/myFans?user_id=${user_id}`,
			goods: `/pages/my/myGoods/myGoods?user_id=${user_id}`,
			attention: `/pages/my/myAttention/myAttention?user_id=${user_id}`,
			viewMe: `/pages/my/viewMe/viewMe?user_id=${user_id}`, // 谁看过我
		};
		wx.navigateTo({
			url: urls[item],
		});
	},

	/**
	 * 点击条件按钮
	 */
	itemClick: function (e) {
		const { detail } = e;
		if (detail === 'account') {
			wx.navigateTo({
				url: '/pages/my/accountMsg/accountMsg',
			});
		}
		if (detail === 'password') {
			wx.navigateTo({
				url: '/pages/login/updatePass/updatePass',
			});
		}
		if (detail === 'msg') {
			wx.navigateTo({
				url: '/pages/my/feedbackMsg/feedbackMsg',
			});
		}
	},
});
