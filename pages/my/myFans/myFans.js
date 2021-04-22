import { get } from '../../../utils/request';
import loading from '../../../utils/loading';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		attentionList: [],
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		const { user_id } = options;
		this.getAttentionMeByUserId(user_id);
	},

	// 获取关注的用户 myAttentionUsers
	getAttentionMeByUserId: function (user_id) {
		loading.showLoading();
		get({ url: '/user/attentionMeByUserId', data: { user_id } })
			.then((res) => {
				this.setData({ attentionList: res || [] });
			})
			.finally(() => {
				loading.hideLoading();
			});
	},
});
