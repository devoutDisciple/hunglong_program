Component({
	properties: {
		/**
		 * 自定义返回事件处理
		 */
		// customBackReturn: {
		// 	type: Boolean,
		// 	value: false,
		// },
	},
	data: {
		headerHight: 60, // 导航总高度
		statusHeight: 20, // 状态栏高度
		navHeight: 40, // 内容高度
		conHegiht: 32, // 内容区要展示内容的高度
		disWidth: 101, // 按钮占用的宽度
		paddingLeft: 7, // 左边留白宽度
		paddingTop: 4, // 上方留白高度
	},

	methods: {},

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
				self.setData({
					headerHight,
					statusHeight: statusBarHeight,
					navHeight,
					conHegiht,
					disWidth,
					paddingLeft,
					paddingTop,
				});
			},
		});
	},
});
