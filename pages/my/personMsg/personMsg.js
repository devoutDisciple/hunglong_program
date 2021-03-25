import moment from '../../../utils/moment';
import { baseUrl } from '../../../config/config';
import { post } from '../../../utils/request';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		photoTmpUrl: '/asserts/public/photo.png',
		backgroundTmpUrl: '/asserts/public/photo.png',
		dateStart: '1990-01-01',
		dateEnd: moment.getNowDate(),
		activeDate: '2000-01-01',
		areaList: [
			['浙江省', '河南省'],
			['杭州市', '金华市', '舟山市', '宁波市', '台州市'],
			['余杭区', '西湖区'],
		],
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {},

	// 选择出生日期
	bindDateChange: function (e) {
		const { value } = e.detail;
		this.setData({ activeDate: value });
	},

	// 点击类目
	itemClick: function (e) {
		const type = e.detail;
		const self = this;
		const user_id = wx.getStorageSync('user_id');
		// 选择头像
		if (type === 'photo') {
			wx.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'],
				sourceType: ['album', 'camera'],
				success(res) {
					// tempFilePath可以作为img标签的src属性显示图片
					const { tempFilePaths } = res;
					const filePath = tempFilePaths[0];
					wx.uploadFile({
						filePath,
						name: 'file',
						url: `${baseUrl}/user/uploadPhoto`,
						formData: {
							user_id,
						},
						success: function (result) {
							console.log(result, 999);
						},
						fail: function (err) {
							console.log(err);
						},
					});
					self.setData({ photoTmpUrl: filePath });
				},
				fail: function () {
					wx.showToast({
						title: '请重新选择',
						icon: 'error',
					});
				},
			});
		}
		// 选择性别
		if (type === 'sex') {
			wx.showActionSheet({
				alertText: '请选择',
				itemList: ['男', '女'],
				success(res) {
					console.log(res.tapIndex);
				},
				fail(res) {
					console.log(res.errMsg);
				},
			});
		}
		//
	},

	// 点击下一步
	onClickNext: function () {
		wx.redirectTo({
			url: '/pages/sctCircle/sctCircle',
		});
	},
});
