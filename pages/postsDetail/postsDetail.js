// pages/postsDetail/postsDetail.js
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		imgList: [
			{
				url: '/asserts/temp/1.jpg',
				width: 600,
				height: 500,
			},
			{
				url: '/asserts/temp/2.jpg',
				width: 600,
				height: 500,
			},
			{
				url: '/asserts/temp/3.jpg',
				width: 600,
				height: 500,
			},
			{
				url: '/asserts/temp/88.png',
				width: 600,
				height: 700,
			},
		],
		searchRebackVisible: false, // 评论回复详情弹框
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {},

	// 查询评论回复内容
	searchReback: function () {
		this.setData({ searchRebackVisible: true });
	},

	// 查询评论回复内容关闭
	onCloseSearchReback: function () {
		this.setData({ searchRebackVisible: false });
	},
});
