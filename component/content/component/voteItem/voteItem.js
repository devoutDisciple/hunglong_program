// component/voteItem/voteItem.js
Component({
	options: {
		styleIsolation: 'isolated', // isolated 表示启用样式隔离，在自定义组件内外，使用 class 指定的样式将不会相互影响（一般情况下的默认值）；
	},
	/**
	 * 组件的属性列表
	 */
	properties: {
		isSelect: {
			type: Boolean,
			value: false,
		},
		detail: {
			type: Object,
			value: {
				num: 0,
				value: '',
			},
		},
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		voteWidth: '20%',
	},

	/**
	 * 组件的方法列表
	 */
	methods: {},
});
