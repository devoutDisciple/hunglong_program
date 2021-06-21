import { filterContentTypeByField } from '../../../../utils/filter';
import getLevel from '../../../../utils/level';

Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		userDetail: {
			type: Object,
			value: {},
		},
		type: {
			type: String,
			value: '',
		},
		createTime: {
			type: String,
			value: '',
		},
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		typeTxt: '',
		user_id: '',
		hadAttention: false, // 是否已经关注
		routerUrl: '',
		levelDetail: {
			level: '小白 Ⅰ',
			url: '/asserts/public/level1.png',
		},
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		// 点击用户头像
		onSearchUserDetail: function () {
			const { userDetail, routerUrl } = this.data;
			if (routerUrl === 'pages/person/person') {
				return;
			}
			wx.navigateTo({
				url: `/pages/person/person?user_id=${userDetail.id}`,
			});
		},
	},

	lifetimes: {
		attached: function () {
			const txt = filterContentTypeByField(this.data.type);
			const { integral } = this.data.userDetail;
			const levelDetail = getLevel(integral);
			const user_id = wx.getStorageSync('user_id');
			const pages = getCurrentPages();
			const currentPage = pages[pages.length - 1];
			this.setData({ typeTxt: txt, user_id, routerUrl: currentPage.route, levelDetail });
		},
	},
});
