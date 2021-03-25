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
			this.triggerEvent('OnTap', { itemid });
		},
	},
});
