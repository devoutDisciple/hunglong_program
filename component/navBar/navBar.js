Component({
	properties: {
		/**
		 * 自定义返回事件处理
		 */
		customBackReturn: {
			type: Boolean,
			value: false,
		},
	},
	data: {
		headerHight: 60, // 导航总高度
		statusHeight: 20, // 状态栏高度
		navHeight: 40, // 内容高度
		disWidth: 101, // 按钮占用的宽度
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
			this.triggerEvent('onChange', { zz: 'zhangzhen' });
		},
	},
	// 组件生命周期函数-在组件实例进入页面节点树时执行)
	attached() {
		const self = this;
		// 菜单按钮的布局信息
		const menuDetail = wx.getMenuButtonBoundingClientRect();
		// 获取设备信息
		wx.getSystemInfo({
			success: function (res) {
				const { height: btnHeight, top: btnTop, width: btnWidth, right: btnRight } = menuDetail;
				const { statusBarHeight, screenWidth } = res;
				const headerHight = (btnTop - statusBarHeight) * 2 + statusBarHeight + btnHeight;
				const navHeight = headerHight - statusBarHeight;
				const disWidth = (screenWidth - btnRight) * 2 + btnWidth;
				const paddingLeft = screenWidth - btnRight;
				const paddingTop = btnTop - statusBarHeight;
				const conHegiht = navHeight - paddingTop * 2;
				console.log(menuDetail, res);
				self.setData({
					headerHight: headerHight,
					statusHeight: statusBarHeight,
					navHeight: navHeight,
					conHegiht: conHegiht,
					disWidth: disWidth,
					paddingLeft: paddingLeft,
					paddingTop: paddingTop,
				});
			},
		});
	},
});
