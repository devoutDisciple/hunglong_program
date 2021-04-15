import { photoUrl } from '../../../../config/config';
import { filterContentType } from '../../../../utils/filter';

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
		typeTxt: '帖子',
	},

	/**
	 * 组件的方法列表
	 */
	methods: {},

	lifetimes: {
		attached: function () {
			const txt = filterContentType(this.data.type);
			this.setData({ typeTxt: txt });
		},
	},
});
