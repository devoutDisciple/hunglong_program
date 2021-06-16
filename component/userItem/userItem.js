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
			value: 1, // 1-点赞 2-评论 3-浏览
		},
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		showType: '',
	},

	lifetimes: {
		attached: function () {
			const { type } = this.data;
			let showType = '点赞';
			if (type === 1) showType = '点赞';
			if (type === 2) showType = '评论';
			if (type === 3) showType = '浏览';
			this.setData({ showType });
		},
	},

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
		// 前往个人中心页面
		goUserDetail: function () {
			const { detail } = this.data;
			const { userDetail } = detail;
			wx.navigateTo({
				url: `/pages/person/person?user_id=${userDetail.id}`,
			});
		},
	},
});
