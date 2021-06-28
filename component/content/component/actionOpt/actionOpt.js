import { post } from '../../../../utils/request';
import login from '../../../../utils/login';

Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
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
		// 点击转发
		onTapShare: function () {
			if (!login.isLogin()) return;
			this.triggerEvent('OnTapShare');
		},
		// 点击消息
		onTapMsg: function () {
			const { detail } = this.data;
			const { type } = detail;
			// 进入详情页面
			wx.navigateTo({
				url: `/pages/detail/detail?content_id=${detail.id}&type=${type}`,
			});
		},
		// 点击赞
		onTapGood: function () {
			if (!login.isLogin()) return;
			const { detail } = this.data;
			const flag = !detail.hadGoods;
			detail.hadGoods = flag;
			detail.goods = Number(detail.goods) + (flag ? 1 : -1);
			if (detail.goods < 0) detail.goods = 0;
			this.setData({ detail });
			let other_id = '';
			if (detail && detail.userDetail) {
				other_id = detail.userDetail.id;
			}
			const user_id = wx.getStorageSync('user_id');
			post({
				url: '/goods/addPostsGoods',
				data: { user_id, other_id, content_id: detail.id, goods_type: flag },
			});
		},
	},
});
