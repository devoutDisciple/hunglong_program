// component/content/component/voteCon/voteCon.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		detail: {
			type: Object,
			value: {
				content: [],
				title: '投票',
				total: 0,
				type: 1, // 1-单选 2-多选
			},
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
		// 选择的第几项
		onSelectItem: function (e) {
			const { idx } = e.currentTarget.dataset;
			const { detail } = this.data;
			if (Array.isArray(detail.content)) {
				if (String(detail.type) === '1') {
					// 单选
					detail.content.forEach((item, index) => {
						item.selected = idx === index ? !item.selected : false;
					});
				} else {
					// 多选
					detail.content[idx].selected = !detail.content[idx].selected;
				}
			}
			this.setData({ detail });
		},
	},

	// 组件生命周期函数-在组件实例进入页面节点树时执行)
	attached: function () {
		const { detail } = this.data;
		const { total, content } = detail;
		if (Array.isArray(content)) {
			content.forEach((item) => {
				if (total === 0) {
					item.width = 0;
					return;
				}
				item.width = `${Number((item.num / total) * 100).toFixed(0)}%`;
			});
		}
		this.setData({ detail });
	},
});
