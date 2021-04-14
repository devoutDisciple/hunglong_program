import { photoUrl } from '../../../../config/config';

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
			type: Number,
			value: 1,
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
		photoUrl,
	},

	/**
	 * 组件的方法列表
	 */
	methods: {},

	lifetimes: {
		attached: function () {
			console.log(this.data.detail, 798);
		},
	},
});
