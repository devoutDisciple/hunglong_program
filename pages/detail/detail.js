import { get } from '../../utils/request';
import { filterContentTypeByNum } from '../../utils/filter';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		type: '',
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
		// this.setData({ type: filterContentTypeByNum(type) });
		this.getDetail({ content_id, type });
	},

	// 获取详情
	getDetail: function (data) {
		get({ url: '/content/contentDetail', data }).then((res) => {
			this.setData({ detail: res, type: filterContentTypeByNum(res.type) });
		});
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {},
});
