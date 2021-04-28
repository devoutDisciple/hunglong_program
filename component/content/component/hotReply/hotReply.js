import { post } from '../../../../utils/request';
import login from '../../../../utils/login';

Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		replyDetail: {
			type: Object,
			value: {},
		},
		contentId: {
			type: String,
			value: '',
		},
		type: {
			type: String,
			value: '',
		},
	},

	/**
	 * 组件的初始数据
	 */
	data: {},

	/**
	 * 组件的方法列表
	 */
	methods: {
		// 点赞
		onTapGood: function () {
			const user_id = wx.getStorageSync('user_id');
			if (!login.isLogin()) return;
			const { replyDetail } = this.data;
			const flag = !replyDetail.hadGoods;
			replyDetail.goods += flag ? 1 : -1;
			replyDetail.hadGoods = flag;
			this.setData({ replyDetail });
			post({
				url: '/goods/addReplyGoods',
				data: {
					user_id,
					content_id: replyDetail.content_id,
					comment_id: replyDetail.id,
					goods_type: flag,
				},
			});
		},

		// 点击内容区
		onTapContent: function () {
			const { type, contentId } = this.data;
			wx.navigateTo({
				url: `/pages/detail/detail?content_id=${contentId}&type=${type}`,
			});
		},
	},
});
