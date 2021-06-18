// component/posts/postTxt/postTxt.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		showAll: {
			type: Boolean,
			value: false,
		},
		showLink: {
			type: Boolean,
			value: false,
		},
		type: {
			type: String,
			value: '',
		},
		detail: {
			type: Object,
			value: {},
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

	lifetimes: {
		attached: function () {
			console.log(this.data.detail, 1222);
		},
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		onClick: function () {
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
});
