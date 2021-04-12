// component/publish/battle/battle.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		selectCircles: {
			type: Object,
			value: [],
		},
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		activeTimeIdx: 1, // 默认选择一天
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		// 切换选择时间
		onChangeTime: function (e) {
			console.log(this.data.activeTimeIdx);
			const { index } = e.currentTarget.dataset;
			console.log(e, index, 32);
			this.setData({ activeTimeIdx: index });
		},
	},
});
