import { get } from '../../utils/request';
import loading from '../../utils/loading';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		activeTab: 0, // 默认选择的下标
		hotList: [], // 选取十个热度最高的圈子
		myAttentions: [], // 我关注的圈子
		circleList: [1, 2, 3, 4, 5, 6],
		plates: [], // 板块信息
		recommendCircles: [], // 推荐圈子
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onShow: function () {
		// 获取所有板块
		this.getPlates();
		// 获取热度最高的十个圈子
		this.getMostHotCircle();
		// 获取用户关注的圈子
		this.getMyAttention();
	},

	// 获取热度最高的几个圈子
	getMostHotCircle: function () {
		get({ url: '/circle/mostHot' }).then((res) => {
			this.setData({ hotList: res || [] });
		});
	},

	// 获取我关注的圈子
	getMyAttention: async function () {
		const user_id = wx.getStorageSync('user_id');
		if (!user_id) return;
		get({ url: '/circle/myAttentionCircles', data: { user_id, num: 6 } }).then((res) => {
			this.setData({ myAttentions: res || [] });
		});
	},

	// 获取更多我关注的圈子
	onSearchMoreCircle: async function () {
		const user_id = wx.getStorageSync('user_id');
		if (!user_id) return;
		get({ url: '/circle/myAttentionCircles', data: { user_id } }).then((res) => {
			this.setData({ myAttentions: res || [] });
		});
	},

	// 获取板块相关内容
	getPlates: async function () {
		loading.showLoading();
		get({ url: '/plate/all' }).then((res) => {
			this.setData({ plates: res || [] });
			if (res && res[0]) {
				this.getCirclesByPlate(res[0].id);
			}
		});
	},

	// 获取模块下的所有圈子 circlesByPlateId
	getCirclesByPlate: async function (plate_id) {
		const user_id = wx.getStorageSync('user_id');
		get({ url: '/circle/circlesByPlateId', data: { plate_id, user_id } })
			.then((res) => {
				this.setData({ recommendCircles: res || [] });
			})
			.finally(() => loading.hideLoading());
	},

	// 切换模块tab
	onChangeTab: function (e) {
		const { index } = e.detail;
		const { plates } = this.data;
		if (plates[index] && plates[index].id) {
			loading.showLoading();
			this.getCirclesByPlate(plates[index].id);
		}
	},

	// 点击进入圈子详情
	onSearchCircleDetail: function (e) {
		const { circleid } = e.currentTarget.dataset;
		wx.navigateTo({
			url: `/pages/circleDetail/circleDetail?circleId=${circleid}`,
		});
	},
});
