import { get } from '../../../utils/request';
import loading from '../../../utils/loading';
import { filterContentTypeByNum } from '../../../utils/filter';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		dataList: [],
		isLoading: false, // 上拉加载的时候
		current: 1, // 当前页码
		lowerThreshold: 400, // 距离底部多远的时候触发上拉事件
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		const { user_id } = options;
		this.setData({ user_id }, () => {
			this.getContentsByUserId();
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

	// 获取用户发过的内容
	getContentsByUserId: function () {
		const { user_id } = this.data;
		loading.showLoading();
		if (!user_id) {
			wx.switchTab({
				url: '/pages/home/home',
			});
		}
		const { current, dataList } = this.data;
		get({ url: '/content/contentsByUserId', data: { user_id, current } })
			.then((res) => {
				res.forEach((item) => {
					item.type = filterContentTypeByNum(item.type);
				});
				const newList = [...dataList, ...res];
				this.setData({ dataList: newList, current: current + 1, isLoading: false });
			})
			.finally(() => loading.hideLoading());
	},

	/**
	 * 滑动到底部的时候
	 */
	onScrollBtm: function () {
		const { isLoading } = this.data;
		if (!isLoading) {
			this.setData({ isLoading: true }, async () => {
				this.getContentsByUserId();
			});
		}
	},
});
