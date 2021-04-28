import { get } from './utils/request';
import { formatTime } from './utils/util';

App({
	globalData: {
		userInfo: null,
		myReceiveGoodsNum: 0, // 我收到的点赞量
		myReceiveCommentsNum: 0, // 我收到的评论数
	},

	data: {
		goodsTimer: null, // 刷新点赞的记录
	},

	onLaunch: async function () {
		// if (config.env !== 'dev') {
		// 统计各种信息
		// setInterval(() => {
		this.getTotalMsg();
		this.getMyMessage();
		// }, 5000);
		// }
	},

	// 获取消息
	getMyMessage: function () {
		const user_id = wx.getStorageSync('user_id');
		if (!user_id) return;
		get({ url: '/message/msgsByUserId', data: { user_id } }).then((res) => {
			if (res && Array.isArray(res.data) && res.data.length !== 0) {
				const { data, total } = res;
				console.log(res, 111);
				let msgData = wx.getStorageSync('msg_data') || '[]';
				msgData = JSON.parse(msgData);
				data.forEach((item) => {
					const currentMsg = msgData.filter((msg) => item.user_id === msg.person_id)[0];
					if (currentMsg) {
						currentMsg.noread = Number(currentMsg.noread) + Number(total);
						currentMsg.msg.push({
							content: item.content,
							from: 2,
							time: item.create_time,
							type: 1,
						});
					} else {
						msgData.push({
							person_id: item.user_id,
							person_name: item.username,
							person_photo: item.user_photo,
							noread: total,
							msg: [
								{
									content: item.content,
									from: 2,
									time: item.create_time,
									type: 1,
								},
							],
						});
					}
				});
				wx.setStorageSync('msg_data', JSON.stringify(msgData));
			}
		});
	},

	// 各种统计信息
	getTotalMsg: async function () {
		// 获取收到的点赞
		const goodsNum = await this.getGoodsByUser();
		// 获取收到评论的数量
		const commnsNum = await this.getCommentsNumByUser();
		let totalNum = Number(goodsNum) + Number(commnsNum);
		totalNum = totalNum > 99 ? '99+' : totalNum;
		if (String(totalNum) !== '0') {
			wx.setTabBarBadge({
				index: 2,
				text: String(totalNum),
			});
		}
	},

	// 获取收到的点赞
	getGoodsByUser: async function () {
		const user_id = wx.getStorageSync('user_id');
		const now = formatTime(new Date());
		let search_goods_time = wx.getStorageSync('search_goods_time');
		if (!user_id) return '';
		if (!search_goods_time) {
			wx.setStorageSync('search_goods_time', now);
			search_goods_time = now;
		}
		const res = await get({ url: '/goods/goodsMyNumByUser', data: { user_id, time: search_goods_time } });
		let { goodsNum } = res;
		goodsNum = goodsNum > 99 ? '99+' : goodsNum;
		this.globalData.myReceiveGoodsNum = res.goodsNum || 0;
		return goodsNum || 0;
	},

	// 获取评论量
	getCommentsNumByUser: async function () {
		const user_id = wx.getStorageSync('user_id');
		const now = formatTime(new Date());
		let search_comment_time = wx.getStorageSync('search_comment_time');
		if (!user_id) return '';
		if (!search_comment_time) {
			wx.setStorageSync('search_comment_time', now);
			search_comment_time = now;
		}
		const res = await get({ url: '/goods/commentsNumByUser', data: { user_id, time: search_comment_time } });
		let { commentsNum } = res;
		commentsNum = commentsNum > 99 ? '99+' : commentsNum;
		this.globalData.myReceiveCommentsNum = res.commentsNum || 0;
		return commentsNum || 0;
	},
});
