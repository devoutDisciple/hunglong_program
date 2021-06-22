const { post } = require('../../utils/request');

// component/setCircle/setCircle.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		title: {
			type: String,
			value: '',
		},
		type: {
			type: String,
			value: '', // my-我的关注 circle-圈子
		},
		status: {
			type: String,
			value: 'new',
		},
		data: {
			type: Object,
			value: [],
		},
		myCirCles: {
			type: Object,
			value: [],
		},
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		iptDialogVisible: false, // 反馈弹框
		showCircles: [], // 应该展示的圈子
	},

	lifetimes: {
		// 生命周期函数，可以为函数，或一个在methods段中定义的方法名
		attached: function () {},
		moved: function () {},
		detached: function () {},
	},

	pageLifetimes: {
		// 组件所在页面的生命周期函数
		show: function () {},
		hide: function () {},
		resize: function () {},
	},

	observers: {
		'myCirCles, data': function (myCirCles, data) {
			if (!myCirCles || !data) return;
			const circleIds = myCirCles.map((item) => item.id);
			const newCircle = data.filter((item) => !circleIds.includes(item.id));
			this.setData({ showCircles: newCircle });
		},
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		// 点击管理
		onClickManage: function () {
			this.triggerEvent('tapManage');
		},
		// 移除关注圈子
		onRemoveCircle: function (e) {
			const { circle } = e.currentTarget.dataset;
			this.triggerEvent('removeCircle', { data: circle });
		},
		// 添加关注圈子
		onAddCircle: function (e) {
			const { circle } = e.currentTarget.dataset;
			this.triggerEvent('addCircle', { data: circle });
		},
	},
});
