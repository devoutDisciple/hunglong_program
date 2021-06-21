import getLevel from '../../utils/level';

Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		userDetail: {
			type: Object,
			value: {},
		},
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		levelDetail: {
			url: '/asserts/public/level1.png',
			level: '小白 Ⅰ',
		},
	},

	lifetimes: {
		attached: function () {
			const { userDetail } = this.data;
			if (userDetail && userDetail.integral) {
				const levelDetail = getLevel(userDetail.integral);
				this.setData({ levelDetail });
			} else {
				this.setData({
					levelDetail: {
						url: '/asserts/public/level1.png',
						level: '小白 Ⅰ',
					},
				});
			}
		},
	},

	/**
	 * 组件的方法列表
	 */
	methods: {},
});
