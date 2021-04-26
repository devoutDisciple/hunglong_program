Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		msg: {
			type: Object,
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
		// 点击消息
		onTapMsg: function () {
			const { msg } = this.data;
			wx.navigateTo({
				url: `/pages/message/chat/chat?person_id=${msg.person_id}`,
			});
		},
	},
});
