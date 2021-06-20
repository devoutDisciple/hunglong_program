// component/posts/postTopic/postTopic.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		topics: {
			type: Array,
			value: [],
		},
		circles: {
			type: Array,
			value: [],
		},
		topicids: {
			type: Array,
			value: [],
		},
		circleids: {
			type: String,
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
		// 点击圈子icon
		onGoCircleDetail: function (e) {
			const { idx } = e.currentTarget.dataset;
			const { circleids } = this.data;
			let ids = [];
			if (circleids) {
				ids = circleids.split(',');
				const currentCircleid = ids[idx];
				// 进入详情页面
				wx.navigateTo({
					url: `/pages/circleDetail/circleDetail?circleId=${currentCircleid}`,
				});
			}
		},
	},

	lifetimes: {
		attached: function () {},
	},
});
