import { emptyImgUrl, photoUrl } from '../../config/config';
import { get } from '../../utils/request';
import loading from '../../utils/loading';

Component({
	options: {
		// isolated 表示启用样式隔离，在自定义组件内外，使用 class 指定的样式将不会相互影响（一般情况下的默认值）；
		styleIsolation: 'isolated',
	},
	/**
	 * Component properties
	 */
	properties: {
		detail: {
			type: Object,
			value: {
				userDetail: {
					photo: emptyImgUrl,
				},
			},
		},
		type: {
			type: String,
			value: 'posts',
		},
	},

	/**
	 * Component initial data
	 */
	data: {
		comments: [], // 评论的列表
	},

	lifetimes: {
		attached: function () {},
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
			}, 100);
		},

		// 评论输入框关闭
		onCloseIptDialog: function () {
			this.setData({ iptVisible: false, iptFocus: false });
		},
	},

	observers: {
		detail: function (detail) {
			if (detail.id) {
				loading.showLoading();
				get({ url: '/reply/allByContentId', data: { content_id: detail.id, current: 1 } })
					.then((res) => {
						if (Array.isArray(res)) {
							res.forEach((item) => {
								item.userPhoto = `${photoUrl}/${item.userPhoto}`;
							});
						}
						this.setData({ comments: res || [] });
					})
					.finally(() => loading.hideLoading());
			}
		},
	},
});
