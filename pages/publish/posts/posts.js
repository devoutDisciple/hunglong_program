/* eslint-disable no-await-in-loop */
import loading from '../../../utils/loading';
import { baseUrl } from '../../../config/config';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		title: '',
		desc: '',
		imgUrls: [],
		hasUploadUrl: [],
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {},

	// 输入标题
	onChangeTitle: function (e) {
		const { detail } = e;
		this.setData({ title: detail });
	},

	// 输入内容
	onChangeDesc: function (e) {
		const { detail } = e;
		this.setData({ desc: detail });
	},

	// 选择图片
	chooseImg: function () {
		const self = this;
		wx.chooseImage({
			count: 9,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success(res) {
				// tempFilePath可以作为img标签的src属性显示图片
				const { tempFilePaths } = res;
				self.setData({ imgUrls: tempFilePaths });
			},
			fail: function () {
				wx.showToast({
					title: '请重新选择',
					icon: 'error',
				});
			},
		});
	},

	// 移除图片
	onRemoveImg: function (e) {
		const { idx } = e.target.dataset;
		const { imgUrls } = this.data;
		imgUrls.splice(idx, 1);
		this.setData({ imgUrls });
	},

	// 发布
	onSave: async function () {
		const { title, desc, imgUrls } = this.data;
		// 上传图片
		console.log(title, desc, imgUrls);
		if (imgUrls && imgUrls.length !== 0) {
			let len = imgUrls.length;
			loading.showLoading();
			while (len > 0) {
				len -= 1;
				await this.uploadImg(imgUrls[len]);
			}
			loading.hideLoading();
		}
	},

	// 上传图片
	uploadImg: function (filePath) {
		return new Promise((resolve, reject) => {
			wx.uploadFile({
				filePath: filePath,
				name: 'file',
				url: `${baseUrl}/posts/uploadImg`,
				success: function (result) {
					const filename = JSON.parse(result.data).data;
					resolve(filename);
				},
				fail: function (err) {
					console.log(err);
					wx.showToast({
						title: '上传失败',
						icon: 'error',
					});
					reject('系统错误');
				},
				complete: function () {
					loading.hideLoading();
				},
			});
		});
	},
});
