import { get, post } from '../../utils/request';
import loading from '../../utils/loading';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		circles: [], // 全部的圈子
		showCircles: [], // 快捷方式
		myCircles: [], // 我关注的圈子
		status: 'new',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		this.onSearchMyCircle();
	},

	// 查找我关注的圈子
	onSearchMyCircle: function () {
		loading.showLoading();
		const user_id = wx.getStorageSync('user_id');
		get({ url: '/circle/allCirclesByUserId', data: { user_id } }).then((res) => {
			this.filterCircle(res);
			loading.hideLoading();
		});
	},

	// 筛选圈子
	filterCircle: function (circles) {
		const showCircles = [];
		const myCircles = [];
		if (Array.isArray(circles)) {
			circles.forEach((item) => {
				if (item.type === 1) {
					myCircles.push(item);
				} else {
					showCircles.push(item);
				}
			});
			this.setData({ circles, myCircles, showCircles });
		}
	},

	// 点击管理
	onClickManage: function () {
		this.setData({ status: this.data.status === 'new' ? 'edit' : 'new' });
	},

	// 点击添加圈子
	onAddCircle: function (e) {
		const { data } = e.detail;
		const { showCircles, circles } = this.data;
		if (showCircles.length === 6) {
			return wx.showToast({
				title: '可选六个圈子',
				icon: 'error',
			});
		}
		circles.forEach((item) => {
			if (item.id === data.id) item.type = 2;
		});
		this.filterCircle(circles);
	},

	// 点击移除圈子
	removeCircle: function (e) {
		const { data } = e.detail;
		const { showCircles, circles } = this.data;
		if (showCircles.length === 1) {
			return wx.showToast({
				title: '请勿移除',
				icon: 'error',
			});
		}
		circles.forEach((item) => {
			if (item.id === data.id && Number(item.self_school) !== 1) item.type = 1;
		});
		this.filterCircle(circles);
	},

	// 点击下一步
	onSave: function () {
		loading.showLoading();
		const user_id = wx.getStorageSync('user_id');
		const { circles } = this.data;
		post({ url: '/circle/saveMyShowCircle', data: { circles: circles, user_id } }).then(() => {
			wx.showToast({
				title: '保存成功',
				icon: 'success',
			});
			loading.hideLoading();
			setTimeout(() => {
				wx.switchTab({
					url: '/pages/home/home',
				});
			}, 500);
		});
	},
});
