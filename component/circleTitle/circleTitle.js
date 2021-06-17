Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		detail: {
			type: Object,
			value: {},
		},
	},

	/**
	 * 组件的初始数据
	 */
	data: {},

	lifetimes: {
		attached: function () {},
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		onSearchCircleDetail: function () {
			const { detail } = this.data;
			wx.navigateTo({
				url: `/pages/circleDetail/circleDetail?circleId=${detail.id}`,
			});
		},
	},
});
