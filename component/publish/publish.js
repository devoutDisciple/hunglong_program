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
		onClickPublish: function () {
			const { active } = this.data;
			this.setData({ active: !active });
		},
	},
});
