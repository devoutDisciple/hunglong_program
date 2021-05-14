// component/publish/publish.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {},

	/**
	 * 组件的初始数据
	 */
	data: {
		active: false, // 是否展示发布内容
	},

	pageLifetimes: {
		show: function () {
			// 页面被展示
		},
		hide: function () {
			// 页面被隐藏
			this.setData({ active: false });
		},
		resize: function () {
			// 页面尺寸变化
		},
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		// 点击发布图标
		onClickPublish: function () {
			const { active } = this.data;
			this.setData({ active: !active });
		},
		// 点击具体的发布选项
		onClickItem: function (e) {
			const { itemid } = e.currentTarget.dataset;
			this.onCloseModal();
			this.triggerEvent('OnTap', { itemid });
		},
		// 关闭弹框
		onCloseModal: function () {
			this.setData({ active: false });
		},
	},
});
