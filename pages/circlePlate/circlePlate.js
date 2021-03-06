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
		schoolAddressList: [{ city: '全部' }],
		activeTagIdx: 0, // 当前点击的tag
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
			// 获取学校下的所有地区
			this.getSchoolAddressList();
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
	getCirclesByPlate: async function (city) {
		loading.showLoading();
		const user_id = wx.getStorageSync('user_id');
		const { plate_id } = this.data;
		const data = { plate_id, user_id };
		if (city) data.city = city;
		get({ url: '/circle/circlesByPlateId', data: data })
			.then((res) => {
				this.setData({ recommendCircles: res || [] });
			})
			.finally(() => loading.hideLoading());
	},

	// 获取学校的所有地区
	getSchoolAddressList: function () {
		loading.showLoading();
		get({ url: '/circle/circleAddressByCity' })
			.then((res) => this.setData({ schoolAddressList: [{ city: '全部' }, ...res] || [{ city: '全部' }] }))
			.finally(() => loading.hideLoading());
	},

	// 选择学校地区
	onSelectAddressTag: function (e) {
		loading.showLoading();
		const { schoolAddressList } = this.data;
		const { index } = e.currentTarget.dataset;
		const { city } = schoolAddressList[index];
		this.setData({ activeTagIdx: index }, () => {
			this.getCirclesByPlate(city);
		});
	},

	// 点击进入圈子详情
	onSearchCircleDetail: function (e) {
		const { circleid } = e.currentTarget.dataset;
		wx.navigateTo({
			url: `/pages/circleDetail/circleDetail?circleId=${circleid}`,
		});
	},
});
