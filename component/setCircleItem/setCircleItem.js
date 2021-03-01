// component/setCircle/setCircle.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		title: {
			type: String,
			value: '',
		},
		data: {
			type: Object,
			value: [],
		},
		item: {
			type: Object,
			value: [],
		},
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		iptDialogVisible: false,
	},

	lifetimes: {
		// 生命周期函数，可以为函数，或一个在methods段中定义的方法名
		attached: function () {},
		moved: function () {},
		detached: function () {},
	},

	pageLifetimes: {
		// 组件所在页面的生命周期函数
		show: function () {},
		hide: function () {},
		resize: function () {},
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		hello: function (...rest) {
			console.log(rest, 111);
		},
		onCancleDialog: function (e) {
			console.log(e, 2222);
			this.setData({ iptDialogVisible: false });
		},
		onFeedback: function () {
			this.setData({ iptDialogVisible: true });
		},
	},
});
