// components/menu.js
Component({
	options: {
		styleIsolation: 'isolated', // isolated 表示启用样式隔离，在自定义组件内外，使用 class 指定的样式将不会相互影响（一般情况下的默认值）；
	},
	/**
	 * Component properties
	 */
	properties: {
		type: {
			type: String,
			value: '', // posts-帖子 blogs-博客 vote-投票 battle-pk
		},
	},

	/**
	 * Component initial data
	 */
	data: {
		replyImgList: [
			{
				url: '/asserts/temp/1.jpg',
				width: 600,
				height: 500,
			},
			{
				url: '/asserts/temp/2.jpg',
				width: 600,
				height: 500,
			},
			{
				url: '/asserts/temp/3.jpg',
				width: 600,
				height: 500,
			},
		],
		focus: false,
		iptVisible: false, // 评论输入框
		iptFocus: false, // 评论输入框聚焦
	},

	/**
	 * Component methods
	 */
	methods: {
		// 查询评论回复内容
		searchReply: function () {
			wx.navigateTo({
				url: '/pages/reply/reply',
			});
		},

		// 打开评论输入框
		onShowIptDialog: function () {
			this.setData({ iptVisible: true });
			setTimeout(() => {
				this.setData({ iptFocus: true });
			}, 200);
		},

		// 评论输入框关闭
		onCloseIptDialog: function () {
			this.setData({ iptVisible: false, iptFocus: false });
		},
	},
});
