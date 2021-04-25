import { get } from './utils/request';
import { formatTime } from './utils/util';

App({
	globalData: {
		userInfo: null,
		myReceiveGoodsNum: 0, // 我收到的点赞量
		num: {
			myReceiveGoodsNum: 0, // 我收到的点赞量
			myReceiveCommentsNum: 0, // 我收到的评论量
		},
	},
	data: {
		goodsTimer: null, // 刷新点赞的记录
		times: 2000, // 2秒
	},
	onLaunch: function () {
		// 在这里统计实时在线人数
		// 获取收到的点赞和评论的数量
		this.getGoodsNumByUserId();
	},

	// 获取收到的点赞和评论的数量
	getGoodsNumByUserId: function () {
		const user_id = wx.getStorageSync('user_id');
		const now = formatTime(new Date());
		let search_goods_time = wx.getStorageSync('search_goods_time');
		if (!user_id) return '';
		if (!search_goods_time) {
			wx.setStorageSync('search_goods_time', now);
			search_goods_time = now;
		}
		// let { goodsTimer, times } = this.data;
		get({ url: '/goods/goodsAndComNumByUser', data: { user_id, time: search_goods_time } }).then((res) => {
			this.globalData.num.myReceiveGoodsNum = res.goodsNum || 0;
			this.globalData.num.myReceiveCommentsNum = res.commentsNum || 0;
			let totalNum = Number(res.goodsNum) + Number(res.commentsNum);
			totalNum = totalNum > 99 ? '99+' : totalNum;
			wx.setTabBarBadge({
				index: 2,
				text: totalNum,
			});
		});
	},
});
