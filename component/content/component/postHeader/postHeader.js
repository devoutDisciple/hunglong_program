import { post } from '../../../../utils/request';
import login from '../../../../utils/login';
import { filterContentTypeByField } from '../../../../utils/filter';

Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		userDetail: {
			type: Object,
			value: {},
		},
		type: {
			type: String,
			value: '',
		},
		createTime: {
			type: String,
			value: '',
		},
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		typeTxt: '',
		user_id: '',
		hadAttention: false, // 是否已经关注
		showAttentionBtn: true, // 是否显示关注按钮
		routerUrl: '',
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		// 点击关注和取消关注
		onAttentionUser: function () {
			const { userDetail } = this.data;
			const user_id = wx.getStorageSync('user_id');
			if (!user_id) {
				return wx.showToast({
					title: '请先登录',
					icon: 'error',
				});
			}
			if (!login.isLogin()) return;
			userDetail.hadAttention = !userDetail.hadAttention;
			post({ url: '/attention/attentionUser', data: { user_id, other_id: userDetail.id } });
			this.setData({ userDetail });
		},

		// 点击用户头像
		onSearchUserDetail: function () {
			const { userDetail, routerUrl } = this.data;
			if (routerUrl === 'pages/person/person') {
				return;
			}
			wx.navigateTo({
				url: `/pages/person/person?user_id=${userDetail.id}`,
			});
		},
	},

	lifetimes: {
		attached: function () {
			const txt = filterContentTypeByField(this.data.type);
			const { userDetail } = this.data;
			const user_id = wx.getStorageSync('user_id');
			const pages = getCurrentPages();
			const currentPage = pages[pages.length - 1];
			if (currentPage.route === 'pages/person/person' || String(user_id) === String(userDetail.id)) {
				this.setData({ showAttentionBtn: false });
			} else {
				this.setData({ showAttentionBtn: true });
			}
			this.setData({ typeTxt: txt, user_id, routerUrl: currentPage.route });
		},
	},
});
