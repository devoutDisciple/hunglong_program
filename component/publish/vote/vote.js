import loading from '../../../utils/loading';
import { post } from '../../../utils/request';

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
		title: '', // 标题
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		// 输入标题内容
		onChangeTitle: function (e) {
			const { detail } = e;
			this.setData({ title: detail });
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
		showErrToast: function (title) {
			wx.showToast({
				title,
				icon: 'error',
			});
		},
		// 发布
		onPublish: async function () {
			loading.showLoading();
			const user_id = wx.getStorageSync('user_id');
			const { isMultiple, title, itemList, selectCircles } = this.data;
			if (!title) return this.showErrToast('请输入标题');
			if (!selectCircles || selectCircles.length === 0) return this.showErrToast('请选择圈子');
			let flag = false;
			itemList.forEach((item) => {
				if (!item.value) flag = true;
			});
			if (flag) return this.showErrToast('请输入内容');
			const circle_ids = [];
			const circle_names = [];
			selectCircles.forEach((item) => {
				circle_ids.push(item.circle_id);
				circle_names.push(item.circle_name);
			});
			const conList = [];
			itemList.forEach((item, index) => {
				conList.push({
					idx: index,
					num: 0,
					value: item.value,
				});
			});
			post({
				url: '/vote/addVote',
				data: { user_id, isMultiple, title, conList, circle_ids, circle_names },
			})
				.then((res) => {
					if (res === 'success') {
						wx.showToast({
							title: '发布成功',
							icon: 'success',
						});
						setTimeout(() => {
							wx.navigateBack({
								complete: () => {},
							});
						}, 500);
					}
				})
				.finally(() => loading.hideLoading());
		},
	},
});
