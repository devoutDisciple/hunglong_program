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
			// {
			// 	url: '/asserts/temp/2.jpg',
			// 	width: 600,
			// 	height: 500,
			// },
			// {
			// 	url: '/asserts/temp/3.jpg',
			// 	width: 600,
			// 	height: 500,
			// },
			// {
			// 	url: '/asserts/temp/88.png',
			// 	width: 600,
			// 	height: 700,
			// },
		],
		replyImgList: [
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
			{
				url: '/asserts/temp/99.png',
				width: 600,
				height: 400,
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
			{
				url: '/asserts/temp/99.png',
				width: 600,
				height: 400,
			},
		],
		focus: false,
		iptVisible: false, // 评论输入框
		iptFocus: false, // 评论输入框聚焦
		type: 'post', // post-帖子 blogs-博客
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
	searchReply: function () {
		wx.navigateTo({
			url: '/pages/reply/reply',
		});
	},

	// 打开评论输入框
	onShowIptDialog: function () {
		this.setData({ iptVisible: true });
		setTimeout(() => {
			this.setData({ iptFocus: true });
		}, 200);
	},

	// 评论输入框关闭
	onCloseIptDialog: function () {
		this.setData({ iptVisible: false, iptFocus: false });
	},
});
