import { baseUrl } from '../../config/config';
import loading from '../../utils/loading';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		bgUrl: '',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {},

	// 选择背景图
	onSelectBg: function () {
		wx.navigateTo({
			url: '/pages/selBackImg/selBackImg',
		});
	},

	// 从手机或者拍一张
	onSelectPhoto: function (e) {
		const { type } = e.currentTarget.dataset;
		const self = this;
		const user_id = wx.getStorageSync('user_id');
		wx.chooseImage({
			count: 1,
			sizeType: ['original', 'compressed'],
			sourceType: [type],
			success(res) {
				// tempFilePath可以作为img标签的src属性显示图片
				const { tempFilePaths } = res;
				const filePath = tempFilePaths[0];
				loading.showLoading();
				wx.uploadFile({
					filePath,
					name: 'file',
					url: `${baseUrl}/bgImg/uploadBg`,
					formData: {
						user_id,
					},
					success: function () {
						self.setData({ bgUrl: filePath });
					},
					fail: function (err) {
						console.log(err);
						wx.showToast({
							title: '上传失败',
							icon: 'error',
						});
					},
					complete: function () {
						loading.hideLoading();
					},
				});
			},
			fail: function () {
				wx.showToast({
					title: '请重新选择',
					icon: 'error',
				});
			},
		});
	},
});
