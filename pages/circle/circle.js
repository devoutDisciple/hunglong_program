import { get } from '../../utils/request';
import loading from '../../utils/loading';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		activeTab: 0, // 默认选择的下标
		hotList: [], // 选取十个热度最高的圈子
		plate_id: '', // 模块id
		myAttentions: [], // 我关注的圈子
		circleList: [1, 2, 3, 4, 5, 6],
		schoolAddressList: [{ city: '全部' }],
		activeTagIdx: 0, // 当前点击的tag
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
		// 获取学校下的所有地区
		this.getSchoolAddressList();
	},

	// 获取热度最高的几个圈子
	getMostHotCircle: function () {
		loading.showLoading();
		get({ url: '/circle/mostHot' })
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
		get({ url: '/circle/myAttentionCircles', data: { user_id, num: 6 } })
			.then((res) => {
				this.setData({ myAttentions: res || [] });
			})
			.finally(() => loading.hideLoading());
	},

	// 获取更多我关注的圈子
	onSearchMoreCircle: async function () {
		loading.showLoading();
		const user_id = wx.getStorageSync('user_id');
		if (!user_id) return;
		get({ url: '/circle/myAttentionCircles', data: { user_id } })
			.then((res) => {
				this.setData({ myAttentions: res || [] });
			})
			.finally(() => loading.hideLoading());
	},

	// 获取板块相关内容
	getPlates: async function () {
		loading.showLoading();
		get({ url: '/plate/all' }).then((res) => {
			this.setData({ plates: res || [] });
			if (res && res[0]) {
				this.setData({ plate_id: res[0].id }, () => {
					this.getCirclesByPlate('all');
				});
			}
		});
	},

	// 获取模块下的所有圈子
	getCirclesByPlate: async function (city) {
		const { plate_id } = this.data;
		const user_id = wx.getStorageSync('user_id');
		get({ url: '/circle/circlesByPlateId', data: { plate_id, user_id, city } })
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

	// 切换模块tab
	onChangeTab: function (e) {
		const { index } = e.detail;
		const { plates } = this.data;
		if (index === 0) {
			this.getSchoolAddressList();
		}
		if (plates[index] && plates[index].id) {
			loading.showLoading();
			this.setData({ activeTab: index, plate_id: plates[index].id, activeTagIdx: 0 }, () => {
				this.getCirclesByPlate('all');
			});
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
