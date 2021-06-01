import { get } from '../../utils/request';
import loading from '../../utils/loading';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		plate_id: '', // 模块id
		hotList: [], // 选取十个热度最高的圈子
		myAttentions: [], // 我关注的圈子
		recommendCircles: [], // 推荐圈子
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		const { plateid } = options;
		this.setData({ plate_id: plateid }, () => {
			// 获取模块信息
			this.getPlateDetail();
			// 获取热度最高的十个圈子
			this.getMostHotCircle();
			// 获取用户关注的圈子
			this.getMyAttention();
			// 获取当前模块下的所有圈子
			this.getCirclesByPlate();
		});
	},

	// 获取当前模块的信息
	getPlateDetail: function () {
		loading.showLoading();
		const { plate_id } = this.data;
		get({ url: '/plate/detailByPlateId', data: { plate_id } })
			.then((res) => {
				wx.setNavigationBarTitle({ title: res.name });
			})
			.finally(() => loading.hideLoading());
	},

	// 获取热度最高的几个圈子
	getMostHotCircle: function () {
		loading.showLoading();
		const { plate_id } = this.data;
		get({ url: '/circle/mostHot', data: { plate_id } })
			.then((res) => {
				this.setData({ hotList: res || [] });
			})
			.finally(() => loading.hideLoading());
	},

	// 获取我关注的圈子
	getMyAttention: async function () {
		loading.showLoading();
		const user_id = wx.getStorageSync('user_id');
		if (!user_id) return;
		const { plate_id } = this.data;
		get({ url: '/circle/circleDetailByPlateId', data: { user_id, plate_id } })
			.then((res) => {
				this.setData({ myAttentions: res || [] });
			})
			.finally(() => loading.hideLoading());
	},

	// 获取模块下的所有圈子 circlesByPlateId
	getCirclesByPlate: async function () {
		loading.showLoading();
		const user_id = wx.getStorageSync('user_id');
		const { plate_id } = this.data;
		get({ url: '/circle/circlesByPlateId', data: { plate_id, user_id } })
			.then((res) => {
				this.setData({ recommendCircles: res || [] });
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
