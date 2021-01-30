Component({
	properties: {
		/**
		 * 自定义返回事件处理
		 * customBackReturn="{{true}}" bind:customBackReturn="customBackReturn"
		 */
		customBackReturn: {
			type: Boolean,
			value: false,
		},
		hello: String,
	},
	data: {},
	what() {
		console.log(6666);
	},
	methods: {
		backClick() {
			if (this.data.customBackReturn) {
				this.triggerEvent('customBackReturn');
			} else if (getCurrentPages().length === 1) {
				wx.switchTab({
					url: '/pages/index/index',
				});
			} else {
				wx.navigateBack({
					delta: 1,
				});
			}
		},
		mytap() {
			console.log(22222);
			this.triggerEvent('onChange', { zhouna: 'zhangzhen' });
		},
	},
	attached() {
		const self = this;
		wx.getSystemInfo({
			success(res) {
				const isIos = res.system.indexOf('iOS') > -1;
				self.setData({
					statusHeight: res.statusBarHeight,
					navHeight: isIos ? 44 : 48,
				});
			},
		});
	},
});
