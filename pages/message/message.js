import util from '../../utils/util';
import moment from '../../utils/moment';

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

		// this.setStoreageMsg();
		this.getStorageMsg();
	},

	// 模拟数据存储
	setStoreageMsg: function () {
		const data = [];
		for (let i = 1; i < 10; i++) {
			const obj = { person_id: i, user_name: `zhangzhen${i}`, user_photo: '/asserts/public/logo.png', msg: [] };
			for (let j = 0; j < 100; j++) {
				obj.msg.push({
					from: Math.random() > 0.5 ? 1 : 2, // 1-我发的信息 2-他发的信息
					content: `这是信息${j}`,
					type: 1, // 1-文字 2-图片
					time: moment()
						.subtract(i * j, 'hours')
						.format('YYYY-MM-DD HH:mm:ss'),
				});
			}
			data.push(obj);
		}
		wx.setStorageSync('msg_data', JSON.stringify(data));
	},

	// 从缓存中读取信息
	getStorageMsg: function () {
		let msgData = wx.getStorageSync('msg_data');
		if (msgData) {
			msgData = JSON.parse(msgData);
			console.log(msgData, 1111);
			if (Array.isArray(msgData)) {
				msgData.forEach((item) => {
					if (Array.isArray(item.msg)) {
						item.msg.forEach((msg) => {
							msg.showTime = util.getMsgShowTime(msg.time);
						});
						const lastMsg = item.msg[item.msg.length - 1];
						item.lastMsgTxt = lastMsg.content || '';
						item.lastMsgTime = util.getMsgShowTime(lastMsg.time);
					}
				});
			}
			this.setData({ msgData: msgData });
		}
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
