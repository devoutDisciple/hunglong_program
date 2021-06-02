import login from '../../utils/login';
import { post } from '../../utils/request';

Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		active: {
			type: Boolean,
			value: false,
		}, // 是否已经关注
		personId: {
			type: String,
			value: '',
		}, // 人物id
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		user_id: '', // 当前用户
	},

	lifetimes: {
		attached: function () {
			const user_id = wx.getStorageSync('user_id');
			this.setData({ user_id });
		},
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		onTapBtn: function () {
			this.setData({ active: !this.data.active });
			const { personId } = this.data;
			if (!login.isLogin()) return;
			const user_id = wx.getStorageSync('user_id');
			// 关注或取消关注人物
			post({ url: '/attention/attentionUser', data: { user_id, other_id: personId } });
			this.triggerEvent('OnTap');
		},
	},
});
