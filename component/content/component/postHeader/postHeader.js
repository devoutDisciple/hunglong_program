import { filterContentTypeByField } from '../../../../utils/filter';
import { post } from '../../../../utils/request';

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
			userDetail.hadAttention = !userDetail.hadAttention;
			post({ url: '/attention/attentionUser', data: { user_id, other_id: userDetail.id } });
			this.setData({ userDetail });
		},
	},

	lifetimes: {
		attached: function () {
			const txt = filterContentTypeByField(this.data.type);
			const user_id = wx.getStorageSync('user_id');
			this.setData({ typeTxt: txt, user_id });
		},
	},
});
