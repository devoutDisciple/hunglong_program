import { post, uploadFile } from '../../../../utils/request';
import loading from '../../../../utils/loading';

Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		// 输入框是否可见
		visible: {
			type: Boolean,
			value: false,
		},
		// 输入框聚焦
		focus: {
			type: Boolean,
			value: false,
		},
		//  1-给帖子评论 2-二级评论
		type: {
			type: Number,
			value: 1,
		},
		// 评论id
		commentId: {
			type: String,
			value: '',
		},
		// 帖子id
		contentId: {
			type: String,
			value: '',
		},
		// 点击发送之后的回调函数
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
		tempFilePaths: [], // 图片路径
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
		onSendMsg: async function () {
			loading.showLoading();
			// type: 1-给帖子评论 2-二级评论
			const { replyValue, type, contentId, commentId, tempFilePaths } = this.data;
			if (!String(replyValue).trim()) {
				return wx.showToast({
					title: '请输入评论',
					icon: 'error',
				});
			}
			const user_id = wx.getStorageSync('user_id');
			let url = '/reply/addContentReply';
			// 给帖子评论
			if (type === 1) {
				url = '/reply/addContentReply';
			} else {
				// 给评论评论
				url = '/reply/addReplyReply';
			}
			// 上传图片
			const uploadImgUrls = [];
			if (tempFilePaths && tempFilePaths.length !== 0) {
				let len = tempFilePaths.length;
				loading.showLoading();
				while (len > 0) {
					len -= 1;
					// eslint-disable-next-line no-await-in-loop
					const fileDetail = await uploadFile({ url: '/reply/uploadImg', data: tempFilePaths[len] });
					uploadImgUrls.push(fileDetail);
				}
			}
			post({
				url,
				data: {
					user_id,
					content_id: contentId,
					comment_id: commentId,
					type,
					desc: replyValue,
					img_urls: uploadImgUrls,
				},
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

		// 点击选择图片
		onChooseImg: function () {
			const self = this;
			wx.chooseImage({
				count: 9,
				sizeType: ['original', 'compressed'],
				sourceType: ['album', 'camera'],
				success(res) {
					// tempFilePath可以作为img标签的src属性显示图片
					const { tempFilePaths } = res;
					self.setData({ tempFilePaths });
				},
				fail: function () {
					wx.showToast({
						title: '请重新选择',
						icon: 'error',
					});
				},
			});
		},

		// 移除图片
		onRemoveImg: function (e) {
			const { idx } = e.currentTarget.dataset;
			const { tempFilePaths } = this.data;
			tempFilePaths.splice(idx, 1);
			this.setData({ tempFilePaths });
		},
	},

	// observers: {
	// 	'focus, visible': function (focus, visible) {
	// 		console.log(focus, visible, 1231);
	// 	},
	// },
});
