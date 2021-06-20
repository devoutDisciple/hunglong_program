// component/posts/postTxt/postTxt.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		// 是否显示全部内容
		showAll: {
			type: Boolean,
			value: false,
		},
		// posts blogs battle vote video
		type: {
			type: String,
			value: '',
		},
		// 帖子详情
		detail: {
			type: Object,
			value: {},
		},
		// 全部详情
		contentDetail: {
			type: Object,
			value: {},
		},
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		topicTxt: '',
	},

	lifetimes: {
		attached: function () {
			const { contentDetail } = this.data;
			let topicTxt = '';
			if (contentDetail && contentDetail.topic_names && Array.isArray(contentDetail.topic_names)) {
				const { topic_names } = contentDetail;
				topicTxt = topic_names.join(' ');
			}
			this.setData({ topicTxt });
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
