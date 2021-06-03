Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		hasAttention: {
			type: Boolean,
			value: false,
		},
		detail: {
			type: Object,
			value: {
				userDetail: {},
			},
		},
		showAttention: {
			type: Boolean,
			value: false,
		},
		showTime: {
			type: Boolean,
			value: false,
		},
		time: {
			type: String,
			value: '',
		},
		type: {
			type: Number,
			value: 1,
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
		// 点击关注
		onAttentionUser: function () {
			const { detail } = this.data;
			detail.hadAttention = !detail.hadAttention;
			this.setData({ detail });
		},
	},
});
