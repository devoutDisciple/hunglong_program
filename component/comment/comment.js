// component/comment/comment.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		type: {
			type: String,
			value: 'post', // post-帖子回复 reply-评论回复
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
		searchReply: function () {
			this.triggerEvent('SearchReply');
		},
	},
});
