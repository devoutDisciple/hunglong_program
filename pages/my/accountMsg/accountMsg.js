import moment from '../../../utils/moment';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		photoTmpUrl: '/asserts/public/photo.png',
		backgroundTmpUrl: '/asserts/public/photo.png',
		dateStart: '1990-01-01',
		dateEnd: moment().format('YYYY-MM-DD HH:mm:ss'),
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

	itemClick: function (e) {
		const type = e.detail;
		const self = this;
		// 选择头像
		if (type === 'photo') {
			wx.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'],
				sourceType: ['album', 'camera'],
				success(res) {
					// tempFilePath可以作为img标签的src属性显示图片
					const { tempFilePaths } = res;
					const photoTmpUrl = tempFilePaths;
					self.setData({ photoTmpUrl });
				},
				fail: function (err) {
					console.log(err);
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
});
