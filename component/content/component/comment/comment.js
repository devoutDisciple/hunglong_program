import { post } from '../../../../utils/request';

Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		type: {
			type: String,
			value: '', // content-内容回复 reply-评论回复
		},
		contentId: {
			type: String,
			value: '',
		},
		imgList: {
			type: Array,
			value: [], // 评论区的图片
		},
		detail: {
			type: Object,
			value: {},
		},
	},

	/**
	 * 组件的初始数据
	 */
	data: {},

	lifetimes: {
		attached: function () {},
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		// 查看详情
		searchReply: function () {
			const { detail, contentId } = this.data;
			wx.navigateTo({
				url: `/pages/reply/reply?commentId=${detail.id}&contentId=${contentId}`,
			});
		},
		// 点赞
		onChangeGoods: function () {
			const user_id = wx.getStorageSync('user_id');
			const { detail } = this.data;
			const flag = !detail.hadGoods;
			detail.goods += flag ? 1 : -1;
			detail.hadGoods = flag;
			this.setData({ detail });
			post({
				url: '/goods/addReplyGoods',
				data: {
					user_id,
					content_id: detail.content_id,
					comment_id: detail.id,
					goods_type: flag,
				},
			});
		},
	},
});
