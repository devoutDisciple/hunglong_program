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
		circleId: {
			type: String,
			value: '',
		}, // 圈子id
	},

	/**
	 * 组件的初始数据
	 */
	data: {},

	/**
	 * 组件的方法列表
	 */
	methods: {
		onTapBtn: async function () {
			this.setData({ active: !this.data.active });
			const { circleId } = this.data;
			if (!login.isLogin()) return;
			const user_id = wx.getStorageSync('user_id');
			// 关注或取消关注圈子
			const res = await post({ url: '/circle/attentionCircleByUser', data: { user_id, circle_id: circleId } });
			if (!res) return;
			this.triggerEvent('OnTap');
		},
	},
});
