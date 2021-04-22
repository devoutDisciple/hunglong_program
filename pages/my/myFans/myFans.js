import { get } from '../../../utils/request';
import { filterContentTypeByNum } from '../../../utils/filter';
import loading from '../../../utils/loading';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		dataList: [],
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		const { user_id } = options;
		this.getContentsByUserId(user_id);
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {},

	// 获取用户发过的内容
	getContentsByUserId: function (user_id) {
		loading.showLoading();
		if (!user_id) {
			wx.switchTab({
				url: '/pages/home/home',
			});
		}
		get({ url: '/content/contentsByUserId', data: { user_id, current: 1 } })
			.then((res) => {
				res.forEach((item) => {
					item.type = filterContentTypeByNum(item.type);
				});
				this.setData({ dataList: res });
			})
			.finally(() => loading.hideLoading());
	},
});
