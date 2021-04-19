// component/comment/comment.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		type: {
			type: String,
			value: '', // content-内容回复 reply-评论回复
		},
		imgList: {
			type: Array,
			value: [], // 评论区的图片
		},
		detail: {
			type: Object,
			value: {},
		},
	},

	/**
	 * 组件的初始数据
	 */
	data: {},

	lifetimes: {
		attached: function () {},
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		searchReply: function () {
			const { detail } = this.data;
			wx.navigateTo({
				url: `/pages/reply/reply?id=${detail.id}`,
			});
		},
	},
});
