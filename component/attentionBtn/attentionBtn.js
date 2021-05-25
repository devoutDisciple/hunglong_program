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
		personId: {
			type: String,
			value: '',
		}, // 人物id
		type: {
			type: Number,
			value: 1,
		}, // 默认是圈子 1-圈子 2-个人
	},

	/**
	 * 组件的初始数据
	 */
	data: {},

	/**
	 * 组件的方法列表
	 */
	methods: {
		onTapBtn: function () {
			this.setData({ active: !this.data.active });
			const { active, type, circleId, personId } = this.data;
			console.log(active, type, circleId, personId);
			if (!login.isLogin()) return;
			const user_id = wx.getStorageSync('user_id');
			// 关注或取消关注圈子
			if (type === 1) {
				post({ url: '/circle/attentionCircleByUser', data: { user_id, circle_id: circleId } });
			}
			this.triggerEvent('OnTap');
		},
	},
});
