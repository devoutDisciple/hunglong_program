Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		myReceiveGoodsNum: 0, // 我收到的点赞量
		myReceiveCommentsNum: 0, // 我收到的评论数量
		msgData: [], // 消息
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getTotalNum();
		this.setStoreageMsg();
		// this.getStorageMsg();
	},

	// 模拟数据存储
	setStoreageMsg: function () {
		const data = [];
		for (let i = 1; i < 10; i++) {
			const obj = { user_id: i, user_name: `zhangzhen${i}`, user_photo: '/asserts/public/logo.png', msg: [] };
			for (let j = 0; j < 2000; j++) {
				obj.msg.push({
					from: Math.random() > 0.5 ? 1 : 2, // 1-我发的信息 2-他发的信息
					content: `这是信息${j}`,
					type: 1, // 1-文字 2-图片
					time: '2021-10-29 23:21:23',
				});
			}
			data.push(obj);
		}
		wx.setStorageSync('msg_data', JSON.stringify(data));
	},

	// 从缓存中读取信息
	getStorageMsg: function () {
		let msgData = wx.getStorageSync('msg_data');
		msgData = JSON.parse(msgData);
		console.log(msgData, 1111);
		this.setData({ msgData: msgData });
	},

	// 获取统计信息
	getTotalNum: function () {
		// 设置点赞数量
		this.setData({ myReceiveGoodsNum: getApp().globalData.myReceiveGoodsNum });
		// 评论数量
		this.setData({ myReceiveCommentsNum: getApp().globalData.myReceiveCommentsNum });
		setInterval(() => {
			this.setData({ myReceiveGoodsNum: getApp().globalData.myReceiveGoodsNum });
			// 设置点赞数量
			this.setData({ myReceiveCommentsNum: getApp().globalData.myReceiveCommentsNum });
		}, 3000);
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {},
});
