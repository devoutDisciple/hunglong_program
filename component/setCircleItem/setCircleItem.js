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
		plateId: {
			type: String,
			value: '',
		},
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		iptDialogVisible: false, // 反馈弹框
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
		// 弹框确定
		onOkDialog: function (e) {
			const { data: iptValue } = e.detail;
			const user_id = wx.getStorageSync('user_id');
			const { plateId } = this.data;
			post({ url: '/feedback/aboutCircle', data: { user_id, plate_id: plateId, desc: iptValue } }).then(() => {
				wx.showToast({
					title: '反馈成功',
					icon: 'success',
				});
			});
		},
		onCancleDialog: function () {
			this.setData({ iptDialogVisible: false });
		},
		onFeedbackClick: function () {
			this.setData({ iptDialogVisible: true });
		},
	},
});
