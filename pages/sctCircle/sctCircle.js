import { get, post } from '../../utils/request';
import loading from '../../utils/loading';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		myCirCles: [], // 我关注的圈子
		plates: [], // 所有的模块
		status: 'new',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		this.onSearchMyCircle();
		this.getAllCirclesByPlate();
	},

	// 查找我关注的圈子
	onSearchMyCircle: function () {
		loading.showLoading();
		const user_id = wx.getStorageSync('user_id');
		get({ url: '/circle/getCirclesByUserId', data: { user_id } }).then((res) => {
			console.log(res, 999);
			this.setData({ myCirCles: res });
			loading.hideLoading();
		});
	},

	// 查找所有模块和圈子
	getAllCirclesByPlate: function () {
		loading.showLoading();
		get({ url: '/circle/getAllCirclesByPlate' }).then((res) => {
			console.log(res, 888);
			this.setData({ plates: res });
			loading.hideLoading();
		});
	},

	// 点击管理
	onClickManage: function () {
		this.setData({ status: this.data.status === 'new' ? 'edit' : 'new' });
	},

	// 点击添加圈子
	onAddCircle: function (e) {
		const { data } = e.detail;
		const { myCirCles } = this.data;
		const hasCircle = myCirCles.filter((item) => item.id === data.id)[0];
		if (hasCircle) {
			return wx.showToast({
				title: '已关注该圈子',
				icon: 'error',
			});
		}
		myCirCles.push(data);
		this.setData({ myCirCles });
	},

	// 点击移除圈子
	removeCircle: function (e) {
		const { data } = e.detail;
		const { myCirCles } = this.data;
		const newCircles = myCirCles.filter((item) => item.id !== data.id);
		this.setData({ myCirCles: newCircles });
	},

	// 点击下一步
	onSave: function () {
		const user_id = wx.getStorageSync('user_id');
		const { myCirCles } = this.data;
		if (!myCirCles || myCirCles.length === 0) {
			return wx.showToast({
				title: '强选择圈子',
				icon: 'error',
			});
		}

		post({ url: '/circle/attentionCircles', data: { circles: myCirCles, user_id } }).then((res) => {
			console.log(res, 111);
		});
	},
});
