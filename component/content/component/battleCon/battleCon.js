import { battleUrl } from '../../../../config/config';
import { post } from '../../../../utils/request';

Component({
	options: {
		// isolated 表示启用样式隔离，在自定义组件内外，使用 class 指定的样式将不会相互影响（一般情况下的默认值）；
		styleIsolation: 'isolated',
	},
	/**
	 * 组件的属性列表
	 */
	properties: {
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
	data: {
		battleUrl,
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		onSelectItem: function (e) {
			const user_id = wx.getStorageSync('user_id');
			const { detail, contentDetail } = this.data;
			const { item } = e.currentTarget.dataset;
			if (detail.expire) {
				return wx.showToast({
					title: '投票已截止',
					icon: 'error',
				});
			}
			if (String(detail.selectItem) !== String(item)) {
				detail.selectItem = item;
			} else {
				detail.selectItem = 3;
			}
			post({
				url: '/battle/selectBattleItem',
				data: { user_id, content_id: contentDetail.id, type: detail.selectItem },
			});
			this.setData({ detail });
		},

		// 查看详情
		onGoDetail: function () {
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

	// 组件生命周期函数-在组件实例进入页面节点树时执行)
	lifetimes: {
		attached: function () {},
	},
});
