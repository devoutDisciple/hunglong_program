module.exports = {
	showLoading: () => {
		wx.showLoading({
			title: '...',
			mask: true,
		});
	},
	hideLoading: () => {
		wx.hideLoading();
	},
};
