// component/loginBtn/loginBtn.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		label: {
			type: String,
			value: '',
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
		onClick: function () {
			this.triggerEvent('OnClick');
		},
	},
});
