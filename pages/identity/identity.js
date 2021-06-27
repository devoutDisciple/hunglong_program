const { post } = require('../../utils/request');

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		activeIdx: 1,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {},

	onTapChunk: function (e) {
		const { idx } = e.currentTarget.dataset;
		this.setData({ activeIdx: idx });
	},

	// 点击下一步
	onTapNext: function () {
		const user_id = wx.getStorageSync('user_id');
		const { activeIdx } = this.data;
		post({ url: '/user/updateIdentity', data: { user_id, identity: activeIdx } }).then((res) => {
			if (res === 'success') {
				wx.showToast({
					title: '选择成功',
					icon: 'success',
				});
				setTimeout(() => {
					if (Number(activeIdx) === 1) {
						wx.navigateTo({
							url: `/pages/my/personMsg/personMsg?user_id=${user_id}`,
						});
					}
					if (Number(activeIdx) === 2 || Number(activeIdx) === 3) {
						wx.navigateTo({
							url: '/pages/approve/approve',
						});
					}
				}, 500);
			}
		});
	},
});
