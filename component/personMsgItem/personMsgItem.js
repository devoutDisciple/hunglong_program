// component/personMessageItem/personMessageItem.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		label: {
			type: String,
			value: '',
		},
		value: {
			type: String,
			value: '',
		},
		key: {
			type: String,
			value: '',
		},
		type: {
			type: String,
			value: '',
		},
		photoTmpUrl: {
			type: String,
			value: '',
		},
		backgroundTmpUrl: {
			type: String,
			value: '',
		},
		heightAuto: {
			type: Boolean,
			value: false,
		},
	},

	lifetimes: {
		attached: function () {
			// 在组件实例进入页面节点树时执行
		},
		detached: function () {
			// 在组件实例被从页面节点树移除时执行
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
		click: function (e) {
			const { key } = e.currentTarget.dataset;
			this.triggerEvent('click', key);
		},
	},
});
