Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		msg: {
			type: Object,
			value: {},
		},
		personId: {
			type: String,
			value: '',
		},
		msgData: {
			type: Array,
			value: [],
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
			const { msg, msgData, personId } = this.data;
			msgData.forEach((item) => {
				console.log(item.person_id, personId, 324);
				if (String(item.person_id) === String(personId)) item.noread = 0;
			});
			wx.setStorageSync('msg_data', JSON.stringify(msgData));
			wx.navigateTo({
				url: `/pages/message/chat/chat?person_id=${msg.person_id}`,
			});
		},
	},
});
