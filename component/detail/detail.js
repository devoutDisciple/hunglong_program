import { emptyImgUrl } from '../../config/config';
import { get, post } from '../../utils/request';
import loading from '../../utils/loading';
import login from '../../utils/login';

Component({
	options: {
		// isolated 表示启用样式隔离，在自定义组件内外，使用 class 指定的样式将不会相互影响（一般情况下的默认值）；
		styleIsolation: 'isolated',
	},
	/**
	 * Component properties
	 */
	properties: {
		detail: {
			type: Object,
			value: {
				userDetail: {
					photo: emptyImgUrl,
				},
			},
		},
		type: {
			type: String,
			value: 'posts',
		},
	},

	/**
	 * Component initial data
	 */
	data: {
		comments: [], // 评论的列表
		iptVisible: false, // 输入框是否可见
	},

	lifetimes: {
		attached: function () {
			this.onSearchCommonts();
		},
	},

	/**
	 * Component methods
	 */
	methods: {
		// 打开评论输入框
		onShowIptDialog: function () {
			if (!login.isLogin()) return;
			this.setData({ iptVisible: true });
			// setTimeout(() => {
			// 	this.setData({ iptFocus: true });
			// }, 100);
		},

		// 评论输入框关闭
		onCloseIptDialog: function () {
			this.setData({ iptVisible: false, iptFocus: false });
		},

		// 查询评论
		onSearchCommonts: function () {
			const user_id = wx.getStorageSync('user_id');
			const { detail } = this.data;
			loading.showLoading();
			get({ url: '/reply/allByContentId', data: { content_id: detail.id, user_id, current: 1 } })
				.then((res) => {
					this.setData({ comments: res || [] });
				})
				.finally(() => loading.hideLoading());
		},

		// 改变点赞
		onChangeGoods: function () {
			if (!login.isLogin()) return;
			const { detail } = this.data;
			const user_id = wx.getStorageSync('user_id');
			const flag = !detail.hadGoods;
			detail.goods += flag ? 1 : -1;
			detail.hadGoods = flag;
			this.setData({ detail });
			let other_id = '';
			if (detail && detail.userDetail) {
				other_id = detail.userDetail.id;
			}
			post({
				url: '/goods/addPostsGoods',
				data: { user_id, other_id, content_id: detail.id, goods_type: flag },
			});
		},
	},

	// observers: {
	// 	detail: function (detail) {
	// 		if (detail.id) {
	// 			this.onSearchCommonts();
	// 		}
	// 	},
	// },
});
