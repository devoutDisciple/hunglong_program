import util from '../../utils/util';
import { get } from '../../utils/request';
import loading from '../../utils/loading';
import login from '../../utils/login';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		screenWidth: 414,
		content_id: '',
		type: 'posts',
		detail: {
			userDetail: {},
		},
	},

	onShareAppMessage: function (res) {
		const user_id = wx.getStorageSync('user_id');
		if (!login.isLogin() || !user_id) return;
		// 页面转发
		if (res.from === 'menu') {
			const { content_id, type } = this.data;
			return {
				path: `/pages/detail/detail?from=3&userid=${user_id}&content_id=${content_id}&type=${type}`,
			};
		}
		const { name } = res.target.dataset;
		// 帖子详情转发
		if (name === 'CONTENT_SHARE') {
			const { contentid, type } = res.target.dataset;
			return {
				path: `/pages/detail/detail?from=4&userid=${user_id}&content_id=${contentid}&type=${type}`,
			};
		}
		// 评论转发
		if (name === 'CONTENT_COMMENT') {
			const { contentid, type } = res.target.dataset;
			return {
				path: `/pages/detail/detail?from=5&userid=${user_id}&content_id=${contentid}&type=${type}`,
			};
		}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		wx.showShareMenu({
			withShareTicket: true,
			menus: ['shareAppMessage'],
		});
		const { content_id, type } = options;
		if (!content_id || !type) {
			return wx.switchTab({
				url: '/pages/home/home',
			});
		}
		// 获取设备信息
		util.getDeviceInfo().then((res) => {
			this.setData({ screenWidth: res.screenWidth, content_id, type }, () => {
				this.getDetail();
			});
		});
	},

	// 获取详情
	getDetail: function () {
		loading.showLoading();
		const { content_id, type, screenWidth } = this.data;
		const user_id = wx.getStorageSync('user_id');
		get({ url: '/content/contentDetail', data: { content_id, type, user_id } })
			.then((res) => {
				util.handleContentObj(res, screenWidth);
				this.setData({ detail: res });
			})
			.finally(() => loading.hideLoading());
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {
		wx.stopPullDownRefresh();
		this.getDetail();
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {},
});
