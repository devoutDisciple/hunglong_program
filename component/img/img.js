import { emptyImgUrl } from '../../config/config';

Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		data: {
			type: Object,
			value: {
				url: emptyImgUrl,
				width: 100,
				height: 100,
			},
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
});
