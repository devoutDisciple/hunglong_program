// component/test/test.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {},

	/**
	 * 组件的初始数据
	 */
	data: {},

	lifetimes: {
		// 生命周期函数，可以为函数，或一个在methods段中定义的方法名
		attached: function () {},
		moved: function () {},
		detached: function () {},
		created: function () {},
		ready: function () {},
	},
	pageLifetimes: {
		show: function () {
			// 页面被展示
		},
		hide: function () {
			// 页面被隐藏
		},
		resize: function () {
			// 页面尺寸变化
		},
	},

	/**
	 * 组件的方法列表
	 */
	methods: {},
});
