// component/homePosts/homePosts.js
Component({
	options: {
		// isolated 表示启用样式隔离，在自定义组件内外，使用 class 指定的样式将不会相互影响（一般情况下的默认值）；
		styleIsolation: 'isolated',
	},
	/**
	 * 组件的属性列表
	 */
	properties: {
		detail: {
			type: Object,
			value: {
				userDetail: {},
				voteDetail: {},
			},
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
		// 点赞
		onTapGoods: function () {
			const { detail } = this.data;
			detail.hadGoods = !detail.hadGoods;
			detail.goods = Number(detail.goods) + (detail.hadGoods ? 1 : -1);
			if (detail.goods < 0) detail.goods = 0;
			this.setData({ detail });
		},

		// 选择某一项
		onTapSelectItem: function (e) {
			const { detail } = this.data;
			const { data } = e.detail;
			detail.voteDetail = data;
			this.setData({ detail });
		},
	},

	// 组件生命周期函数-在组件实例进入页面节点树时执行)
	attached: function () {
		const { detail } = this.data;
		console.log(detail, 1231321);
	},
});
