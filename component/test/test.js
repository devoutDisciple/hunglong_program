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
		attached: function () {
			console.log(111);
		},
		moved: function () {
			console.log(222);
		},
		detached: function () {
			console.log(333);
		},
		created: function () {
			console.log(444);
		},
		ready: function () {
			console.log(5555);
		},
	},
	pageLifetimes: {
		show: function () {
			// 页面被展示
			console.log('page1111');
		},
		hide: function () {
			// 页面被隐藏
			console.log('page2222');
		},
		resize: function (size) {
			// 页面尺寸变化
			console.log('page3333');
		},
	},

	/**
	 * 组件的方法列表
	 */
	methods: {},
});
