// pages/postsDetail/postsDetail.js
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		imgList: [
			// {
			// 	url: '/asserts/temp/1.jpg',
			// 	width: 600,
			// 	height: 500,
			// },
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
		searchReplyVisible: false, // 评论回复详情弹框
		focus: false,
		iptVisible: false, // 评论输入框
		iptFocus: false, // 评论输入框聚焦
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
		this.setData({ searchReplyVisible: true });
		setTimeout(() => {
			this.setData({ focus: true });
		}, 1000);
	},

	// 查询评论回复内容关闭
	onCloseSearchReply: function () {
		this.setData({ searchReplyVisible: false });
	},

	// 打开评论输入框
	onShowIptDialog: function () {
		this.setData({ iptVisible: true });
		setTimeout(() => {
			this.setData({ iptFocus: true });
		}, 1000);
	},

	// 评论输入框关闭
	onCloseIptDialog: function () {
		this.setData({ iptVisible: false, iptFocus: false });
	},
});
