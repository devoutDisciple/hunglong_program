import { photoUrl } from '../../../../config/config';
import { filterContentTypeByField } from '../../../../utils/filter';

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
		photoUrl,
		typeTxt: '帖子',
	},

	/**
	 * 组件的方法列表
	 */
	methods: {},

	lifetimes: {
		attached: function () {
			console.log(this.data.type, 2332);
			const txt = filterContentTypeByField(this.data.type);
			this.setData({ typeTxt: txt });
		},
	},
});
