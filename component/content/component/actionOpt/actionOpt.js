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
			this.triggerEvent('OnTapGood');
		},
	},

	lifetimes: {
		attached: function () {
			console.log(this.data.detail, 6666);
		},
	},
});
