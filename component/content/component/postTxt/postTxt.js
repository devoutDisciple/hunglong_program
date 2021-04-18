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
		type: {
			type: String,
			value: '',
		},
		showLink: {
			type: Boolean,
			value: false,
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
		onClick: function () {
			const { type } = this.data;
			wx.navigateTo({
				url: `/pages/detail/posts/posts?type=${type}`,
			});
		},
	},
});
