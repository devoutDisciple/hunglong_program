// component/hotReply/hotReply.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		replyDetail: {
			type: Object,
			value: {},
		},
		contentId: {
			type: String,
			value: '',
		},
		type: {
			type: String,
			value: '',
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
		// 点赞
		onTapGood: function () {},

		// 点击内容区
		onTapContent: function () {
			const { type, contentId } = this.data;
			wx.navigateTo({
				url: `/pages/detail/detail?content_id=${contentId}&type=${type}`,
			});
		},
	},
});
