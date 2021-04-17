import { get } from '../../utils/request';
import { battleUrl } from '../../config/config';
import loading from '../../utils/loading';
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
		this.getDetail({ content_id, type });
	},

	// 获取详情
	getDetail: function (data) {
		loading.showLoading();
		get({ url: '/content/contentDetail', data })
			.then((res) => {
				res.type = filterContentTypeByNum(res.type);
				if (res.type === 'battle') {
					if (res.battleDetail) {
						if (res.battleDetail.red_url && res.battleDetail.red_url.url) {
							res.battleDetail.red_url.url = `${battleUrl}/${res.battleDetail.red_url.url}`;
						}
						if (res.battleDetail.blue_url && res.battleDetail.blue_url.url) {
							res.battleDetail.blue_url.url = `${battleUrl}/${res.battleDetail.blue_url.url}`;
						}
					}
				}
				this.setData({ detail: res, type: res.type });
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
});
