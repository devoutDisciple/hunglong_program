// component/reply/reply.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		focus: {
			type: Boolean,
			value: false,
		},
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		focus: false,
	},

	/**
	 * 组件的方法列表
	 */
	methods: {},

	lifetimes: {
		// 生命周期函数，可以为函数，或一个在methods段中定义的方法名
		attached: function () {},
		moved: function () {},
		detached: function () {},
	},
});
