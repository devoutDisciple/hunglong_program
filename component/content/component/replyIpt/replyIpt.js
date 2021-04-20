import { post } from '../../../../utils/request';
import loading from '../../../../utils/loading';

Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		visible: {
			type: Boolean,
			value: false,
		},
		focus: {
			type: Boolean,
			value: false,
		},
		type: {
			type: Number,
			value: 1,
		},
		commentId: {
			type: String,
			value: '',
		},
		contentId: {
			type: String,
			value: '',
		},
		callback: {
			type: Function,
			value: () => {},
		},
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		replyValue: '',
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		// 关闭的时候
		onClose: function () {
			this.triggerEvent('OnClose');
		},
		// 输入框改变
		onChangeValue: function (e) {
			this.setData({ replyValue: e.detail.value });
		},
		// 点击发送
		onSendMsg: function () {
			loading.showLoading();
			// type: 1-给帖子评论 2-二级评论
			const { replyValue, type, contentId, commentId } = this.data;
			const user_id = wx.getStorageSync('user_id');
			let url = '/reply/addContentReply';
			if (type === 2) url = '/reply/addReplyReply';
			post({
				url,
				data: { user_id, content_id: contentId, comment_id: commentId, type, desc: replyValue },
			})
				.then(() => {
					wx.showToast({
						title: '评论成功',
						icon: 'success',
					});
					this.triggerEvent('Callback');
					this.triggerEvent('OnClose');
				})
				.finally(() => {
					loading.hideLoading();
				});
		},
	},

	// observers: {
	// 	'focus, visible': function (focus, visible) {
	// 		console.log(focus, visible, 1231);
	// 	},
	// },
});
