// component/publish/selCircle/selCircle.js
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
		selectCircles: [], // 当前选择的圈子
	},

	lifetimes: {
		// 在组件实例进入页面节点树时执行
		attached: function () {
			const pages = getCurrentPages();
			const currentPage = pages[pages.length - 1];
			console.log(currentPage, 111);
			const { selectCircles } = currentPage.data;
			this.setData({ selectCircles });
		},
		detached: function () {
			// 在组件实例被从页面节点树移除时执行
		},
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		// 选择圈子
		onGoSelectCircle: function () {
			wx.navigateTo({
				url: '/pages/publish/pickCircle/pickCircle',
			});
		},
		// 移除圈子
		onRemoveCircle: function (e) {
			const { circleid } = e.target.dataset;
			const { selectCircles } = this.data;
			let num = 0;
			selectCircles.forEach((item) => {
				if (item.selected) num++;
			});
			if (num === 1) {
				return wx.showToast({
					title: '请勿移除',
					icon: 'error',
				});
			}
			const newCircles = selectCircles.filter((item) => item.circle_id !== circleid);
			const pages = getCurrentPages();
			const currentPage = pages[pages.length - 1];
			currentPage.setData({ selectCircles: newCircles });
		},
	},
});
