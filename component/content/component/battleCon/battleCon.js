import { battleUrl } from '../../../../config/config';

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
	methods: {},

	// 组件生命周期函数-在组件实例进入页面节点树时执行)
	attached: function () {
		const { detail } = this.data;
		if (detail.red_url && detail.red_url.url) {
			detail.red_url.url = `${battleUrl}/${detail.red_url.url}`;
		}
		if (detail.blue_url && detail.blue_url.url) {
			detail.blue_url.url = `${battleUrl}/${detail.blue_url.url}`;
		}
		this.setData({ detail });
	},
});
