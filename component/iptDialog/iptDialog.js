// component/iptDialog/iptDialog.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		title: {
			type: String,
			value: '',
		},
		defaultValue: {
			type: String,
			value: '',
		},
		maxlength: {
			type: Number,
			value: 6, // 最大长度
		},
		placeholer: {
			type: String,
			value: '请输入',
		},
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		show: true,
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		onChange: function (e) {
			this.setData({ defaultValue: e.detail });
		},
		// this.triggerEvent('onChange', { zz: 'zhangzhen' });
		onOk: function () {
			const { defaultValue } = this.data;
			if (!defaultValue) {
				return wx.showToast({
					title: '请输入',
					icon: 'error',
				});
			}
			this.setData({ show: false });
			this.triggerEvent('OnOk', { data: defaultValue });
		},
		onClose: function () {
			this.triggerEvent('OnCancle', { data: '' });
		},
	},
});
