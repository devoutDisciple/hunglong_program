// component/goodBtm/goodBtm.js
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

	/**
	 * 组件的方法列表
	 */
	methods: {
		// 点击转发
		onTapShare: function () {
			this.triggerEvent('OnTapShare');
		},
		// 点击消息
		onTapMsg: function () {
			this.triggerEvent('OnTapMsg');
		},
		// 点击赞
		onTapGood: function () {
			const { detail } = this.data;
			console.log(detail, 1111);
		},
	},

	lifetimes: {
		attached: function () {},
	},
});
