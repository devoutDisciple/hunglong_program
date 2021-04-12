// component/publish/vote/vote.js
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
		itemList: [
			{ id: 0, value: '' },
			{ id: 1, value: '' },
		],
		isMultiple: false, // 默认单选
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		hello: function () {
			console.log(1111);
		},

		// 输入标题内容
		onChangeTitle: function (e) {
			console.log(e, 324);
		},
		// 输入选项内容
		onChangeItem: function (e) {
			const { itemList } = this.data;
			const { idx } = e.target.dataset;
			const desc = e.detail;
			itemList[idx].value = desc;
			this.setData({ itemList });
		},
		// 增加选项
		addItem: function () {
			const { itemList } = this.data;
			if (itemList.length > 4) {
				return wx.showToast({
					title: '最多5个选项',
					icon: 'error',
				});
			}
			itemList.push({
				value: '',
			});
			itemList.forEach((item, index) => {
				item.id = index;
			});
			this.setData({ itemList });
		},
		// 移除选项
		removeItem: function (e) {
			const { idx } = e.target.dataset;
			const { itemList } = this.data;
			itemList.splice(idx, 1);
			this.setData({ itemList });
		},
		// 选择单选还是多选
		onMultiple: function () {
			const self = this;
			wx.showActionSheet({
				alertText: '请选择',
				itemList: ['单选', '多选'],
				success(res) {
					const { tapIndex } = res;
					self.setData({ isMultiple: tapIndex === 1 });
				},
			});
		},
	},
});
