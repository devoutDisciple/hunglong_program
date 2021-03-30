import moment from '../../../utils/moment';
import { baseUrl } from '../../../config/config';
import loading from '../../../utils/loading';
import { get, post } from '../../../utils/request';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		photoTmpUrl: '/asserts/public/photo.png',
		backgroundTmpUrl: '/asserts/public/photo.png',
		dateStart: '1990-01-01',
		username: '张振1',
		sex: 0,
		dateEnd: moment.getNowDate(),
		activeDate: '2000-01-01',
		originArea: [], // 原始的地区数据
		areaList: [], // 微信小程序需要渲染的地区数据
		provinceIdx: 0, // 选择的省的下标
		cityIdx: 0, // 选择的市的下标
		address: '浙江省 杭州市 西湖区',
		schoolList: [],
		schoolName: '',
		levelList: ['初一', '初二', '初三', '高一', '高二', '高三', '大一', '大二', '大三', '大四'],
		levelName: '高一',
		iptDialogVisible: false,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {
		this.onSearchAddress();
		this.onSearchSchool();
	},

	// 查询地区信息
	onSearchAddress: function () {
		get({ url: '/address/getAll' }).then((res) => {
			this.setData({ originArea: res });
			const { name } = res[0];
			this.onSearchSchool(name);
			this.getAddressList(0, 0);
		});
	},

	// 获取学校
	onSearchSchool: function () {
		get({ url: '/circle/getAllByAddress', data: { addressName: '杭州' } }).then((res) => {
			if (res && Array.isArray(res)) {
				const schoolList = [];
				let schoolName = '';
				res.forEach((item, index) => {
					if (index === 0) schoolName = item.name;
					schoolList.push(item.name);
				});
				console.log(schoolList, 999);
				this.setData({ schoolList, schoolName });
			}
		});
	},

	// 筛选地区的选项
	getAddressList: function (column, idx) {
		const { originArea: data } = this.data;
		let { provinceIdx, cityIdx } = this.data;
		const provinceList = [];
		const cityList = [];
		const countryList = [];
		let cityRes = data[provinceIdx].children;
		let countryRes = cityRes[cityIdx].children;
		switch (column) {
			case 0:
				cityRes = data[idx].children ? data[idx].children || [] : [];
				countryRes = cityRes[cityIdx] ? cityRes[cityIdx].children || [] : [];
				provinceIdx = idx;
				break;
			case 1:
				countryRes = cityRes[idx] ? cityRes[idx].children || [] : [];
				cityIdx = idx;
				break;
			default:
		}
		data.forEach((item) => {
			provinceList.push(item.name);
		});
		cityRes.forEach((item) => {
			cityList.push(item.name);
		});
		countryRes.forEach((item) => {
			countryList.push(item.name);
		});
		this.setData({ areaList: [provinceList, cityList, countryList], provinceIdx, cityIdx });
	},

	// 地区滚轮滚动
	addressPickerColumnChange: function (e) {
		const { column, value } = e.detail;
		if (column !== 2) this.getAddressList(column, value);
	},

	// 地区滚轮选择
	addressPickerChange: function (e) {
		const { value } = e.detail;
		const { areaList } = this.data;
		const [provinceList, cityList, countryList] = areaList;
		this.setData({ address: `${provinceList[value[0]]} ${cityList[value[1]]} ${countryList[value[2]]}` });
	},

	// 选择学校
	schoolChange: function (e) {
		const { value } = e.detail;
		const { schoolList } = this.data;
		const curSelectSchool = schoolList[value];
		this.setData({ schoolName: curSelectSchool });
	},

	// 选择班级
	levelChange: function (e) {
		const { value } = e.detail;
		const { levelList } = this.data;
		const curSelectLevel = levelList[value];
		this.setData({ levelName: curSelectLevel });
	},

	// 保存信息到服务端
	onSaveMsg: function (data) {
		const user_id = wx.getStorageSync('user_id');
		post({ url: '/user/updateMsg', data: { user_id, data } }).then((res) => {
			if (res === 'success') {
				wx.showToast({
					title: '保存成功',
					icon: 'success',
				});
			}
		});
	},

	// 选择出生日期
	bindDateChange: function (e) {
		const { value } = e.detail;
		this.setData({ activeDate: value });
	},

	// 点击取消弹框
	onCancleDialog: function () {
		this.setData({ iptDialogVisible: false });
	},

	// 弹框点击确定
	onIptOk: function (e) {
		const { data } = e.detail;
		this.setData({ username: data });
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
					loading.showLoading();
					wx.uploadFile({
						filePath,
						name: 'file',
						url: `${baseUrl}/user/uploadPhoto`,
						formData: {
							user_id,
						},
						success: function () {
							wx.showToast({
								title: '上传成功',
							});
							self.setData({ photoTmpUrl: filePath });
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
		}
		if (type === 'name') {
			this.setData({ iptDialogVisible: true });
		}
		// 选择性别
		if (type === 'sex') {
			wx.showActionSheet({
				alertText: '请选择',
				itemList: ['男', '女'],
				success(res) {
					const { tapIndex } = res;
					self.setData({ sex: tapIndex });
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
