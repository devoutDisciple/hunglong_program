// pages/my/my.js
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		headerHight: 60,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad() {},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {
		const self = this;
		// 菜单按钮的布局信息
		const menuDetail = wx.getMenuButtonBoundingClientRect();
		// 获取设备信息
		wx.getSystemInfo({
			success: function (res) {
				const { height: btnHeight, top: btnTop } = menuDetail;
				const { statusBarHeight } = res;
				const headerHight = (btnTop - statusBarHeight) * 2 + statusBarHeight + btnHeight;
				self.setData({ headerHight });
			},
		});
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	itemClick: function (e) {
		console.log(e, 111);
		const { detail } = e;
		console.log(detail);
		if (detail === 'account') {
			wx.navigateTo({
				url: '/pages/accountMsg/accountMsg',
			});
		}
	},
});
