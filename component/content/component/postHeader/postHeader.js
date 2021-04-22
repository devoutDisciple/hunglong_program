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
		typeTxt: '',
		hadAttention: false, // 是否已经关注
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		// 点击关注和取消关注
		onAttentionUser: function () {
			this.setData({ hadAttention: !this.data.hadAttention });
		},
	},

	lifetimes: {
		attached: function () {
			const txt = filterContentTypeByField(this.data.type);
			this.setData({ typeTxt: txt });
		},
	},
});
