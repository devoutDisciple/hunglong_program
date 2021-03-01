// component/iptDialog/iptDialog.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {},

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
		// this.triggerEvent('onChange', { zz: 'zhangzhen' });
		onOk: function () {
			this.setData({ show: false });
			this.triggerEvent('onOk', { zz: 'zhangzhen' });
		},
		onClose: function () {
			this.triggerEvent('onCancle', { zz: 'zhangzhen' });
		},
	},
});
