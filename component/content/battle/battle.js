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
		// 点击内容区
		onTapCon: function () {
			this.triggerEvent('OnTapCon');
		},
		// 点赞
		onTapGood: function () {
			console.log('点赞');
		},
		// 点击分享
		onTapShare: function () {
			console.log('点击分享');
		},
	},

	// 组件生命周期函数-在组件实例进入页面节点树时执行)
	attached: function () {
		const { detail } = this.data;
		console.log(detail, 1111);
	},
});
