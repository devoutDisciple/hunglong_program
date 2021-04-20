import { baseUrl } from '../../config/config';
import loading from '../../utils/loading';
import { post } from '../../utils/request';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		bgUrl: '', // 背景图的url
		bgName: '', // 背景图的名字
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
					success: function (result) {
						const filename = JSON.parse(result.data).data;
						self.setData({ bgUrl: filePath, bgName: filename });
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

	// 保存
	onSave: function () {
		const user_id = wx.getStorageSync('user_id');
		const filename = this.data.bgName;
		post({ url: '/bgImg/saveBgUrl', data: { filename, user_id } }).then((filePath) => {
			wx.showToast({
				title: '应用成功',
				icon: 'success',
			});
			const pages = getCurrentPages();
			// prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。
			const prevPage = pages[pages.length - 2];
			prevPage.setData({ backgroundTmpUrl: filePath });
			wx.navigateBack({
				complete: () => {},
			});
		});
	},
});
