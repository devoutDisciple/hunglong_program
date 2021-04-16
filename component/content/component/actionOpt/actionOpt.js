// component/goodBtm/goodBtm.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		detail: {
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
		// 点击转发
		onTapShare: function () {
			this.triggerEvent('OnTapShare');
		},
		// 点击消息
		onTapMsg: function () {
			const { detail } = this.data;
			const { type } = detail;
			// 进入详情页面
			const goToDetail = (url) => {
				wx.navigateTo({
					url: `${url}?content_id=${detail.id}&type=${type}`,
				});
			};
			if (type === 1 || type === 2) goToDetail('/pages/detail/detail');
			if (type === 3) goToDetail('/pages/detail/vote/vote');
			if (type === 4) goToDetail('/pages/detail/battle/battle');
		},
		// 点击赞
		onTapGood: function () {},
	},

	lifetimes: {
		attached: function () {},
	},
});
