import { getMsgShowTime } from '../../../utils/util';

Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		msg: {
			type: Object,
			value: '',
		},
	},

	/**
	 * 组件的初始数据
	 */
	data: {},

	/**
	 * 组件的方法列表
	 */
	methods: {},

	lifetimes: {
		attached: function () {
			const { msg } = this.data;
			msg.time = msg.time ? getMsgShowTime(msg.time) : '';
			this.setData({ msg });
		},
	},
});
