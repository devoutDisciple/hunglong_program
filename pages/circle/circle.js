import { get } from '../../utils/request';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		circleList: [1, 2, 3, 4, 5, 6],
		plates: [], // 板块信息
		recommendCircles: [], // 推荐圈子
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {
		// 获取所有板块
		this.getPlates();
	},

	// 获取板块相关内容
	getPlates: function () {
		get({ url: '/plate/all' }).then((res) => {
			console.log(res, 111);
			this.setData({ plates: res || [] });
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
});
