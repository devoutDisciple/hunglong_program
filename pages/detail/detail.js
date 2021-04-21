import { get } from '../../utils/request';
import loading from '../../utils/loading';
import { filterContentTypeByNum } from '../../utils/filter';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		content_id: '',
		detail: {
			userDetail: {},
		},
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		const { content_id, type } = options;
		if (!content_id || !type) {
			return wx.switchTab({
				url: '/pages/home/home',
			});
		}
		this.setData({ content_id, type }, () => {
			this.getDetail();
		});
	},

	// 获取详情
	getDetail: function () {
		loading.showLoading();
		const { content_id, type } = this.data;
		const user_id = wx.getStorageSync('user_id');
		get({ url: '/content/contentDetail', data: { content_id, type, user_id } })
			.then((res) => {
				res.type = filterContentTypeByNum(res.type);
				this.setData({ detail: res });
			})
			.finally(() => loading.hideLoading());
	},

	// 选择某一项
	onTapSelectItem: function (e) {
		const { detail } = this.data;
		const { data } = e.detail;
		detail.voteDetail = data;
		this.setData({ detail });
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
