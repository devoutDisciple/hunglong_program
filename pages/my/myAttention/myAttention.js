import { get } from '../../../utils/request';

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
		console.log(user_id);
		this.getMyAttentionUsers(user_id);
	},

	// 获取关注的用户 myAttentionUsers
	getMyAttentionUsers: function (user_id) {
		get({ url: '/attention/myAttentionUsers', data: { user_id } }).then((res) => {
			console.log(res, 12321);
			this.setData({ attentionList: res || [] });
		});
	},
});
