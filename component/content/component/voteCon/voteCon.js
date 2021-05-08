import { post } from '../../../../utils/request';

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
		contentDetail: {
			type: Object,
			value: {},
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
			const user_id = wx.getStorageSync('user_id');
			const { idx } = e.currentTarget.dataset;
			const { detail, contentDetail } = this.data;
			if (Array.isArray(detail.content)) {
				if (String(detail.type) === '1') {
					// 单选
					detail.content.forEach((item, index) => {
						if (idx === index) {
							item.selected = !item.selected;
							item.num = Number(item.num) + (item.selected ? 1 : -1);
							detail.total = Number(detail.total) + (item.selected ? 1 : -1);
						} else {
							if (item.selected) {
								item.selected = false;
								item.num = Number(item.num) - 1;
								detail.total -= 1;
							}
							item.selected = false;
						}
					});
				} else {
					// 取消的时候
					if (detail.content[idx].selected) {
						detail.content[idx].num -= 1;
						detail.total -= 1;
					} else {
						detail.content[idx].num += 1;
						detail.total += 1;
					}
					// 多选
					detail.content[idx].selected = !detail.content[idx].selected;
				}
			}
			const selectItems = [];
			if (Array.isArray(detail.content)) {
				detail.content.forEach((item, index) => {
					// 要传输的数据
					if (item.selected) selectItems.push(index);
					// 重新计算数量
					if (String(detail.total) === '0') {
						item.width = '0%';
					} else {
						item.width = `${Number((item.num / detail.total) * 100).toFixed(0)}%`;
					}
				});
			}
			post({
				url: '/vote/selectVoteItem',
				data: { user_id, content_id: contentDetail.id, select_items: selectItems },
			});
			this.setData({ detail });
		},

		// 查看详情
		onGoDetail: function () {
			const { contentDetail } = this.data;
			const pages = getCurrentPages();
			const currentPage = pages[pages.length - 1];
			if (currentPage.route !== 'pages/detail/detail') {
				wx.navigateTo({
					url: `/pages/detail/detail?content_id=${contentDetail.id}&type=${contentDetail.type}`,
				});
			}
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
