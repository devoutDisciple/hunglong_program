// pages/approve/approve.js
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		usernameIptDialogVisible: false, // 真实姓名弹框
		idcardIptDialogVisible: false, // 身份证号码弹框
		idcard: '',
		username: '',
		schoolList: ['北京大学', '清华大学'],
		schoolName: '北京大学',
		subjectList: ['语文', '数学'],
		subjectName: '英语',
		credentialImg: '',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {},

	// 点击类目
	itemClick: function (e) {
		const type = e.detail;
		const self = this;
		if (type === 'school' || type === 'subject') return;
		if (type === 'credential') {
			wx.chooseImage({
				count: 3,
				sizeType: ['original', 'compressed'],
				sourceType: ['album', 'camera'],
				success(res) {
					// tempFilePath可以作为img标签的src属性显示图片
					const { tempFilePaths } = res;
					const filePath = tempFilePaths[0];
					self.setData({ credentialImg: filePath });
				},
			});
		}
		if (type === 'username') {
			this.setData({ usernameIptDialogVisible: true });
		}
		if (type === 'idcard') {
			this.setData({ idcardIptDialogVisible: true });
		}
	},

	// 昵称弹框点击确定
	onOkUsernameDialog: function (e) {
		const { data } = e.detail;
		this.setData({ username: data });
	},

	// 点击昵称取消弹框
	onCancleUsernameDialog: function () {
		this.setData({ usernameIptDialogVisible: false });
	},

	// 身份证号码点击确定
	onOkIdcardDialog: function (e) {
		const { data } = e.detail;
		this.setData({ idcard: data });
	},

	// 身份证号码点击取消
	onCancleIdcardDialog: function () {
		this.setData({ idcardIptDialogVisible: false });
	},

	// 选择学校
	schoolChange: function (e) {
		const { value } = e.detail;
		const { schoolList } = this.data;
		const curSelectSchool = schoolList[value];
		this.setData({ schoolName: curSelectSchool });
	},

	showError: function (txt) {
		wx.showToast({
			title: txt,
			icon: 'error',
		});
	},

	// 函数参数必须是字符串，因为二代身份证号码是十八位，而在javascript中，十八位的数值会超出计算范围，造成不精确的结果，导致最后两位和计算的值不一致，从而该函数出现错误。
	// 详情查看javascript的数值范围
	// 校验身份证
	checkoutIdcard: function (idcode) {
		// 加权因子
		const weight_factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
		// 校验码
		const check_code = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

		const code = `${idcode}`;
		const last = idcode[17]; // 最后一位

		const seventeen = code.substring(0, 17);

		// ISO 7064:1983.MOD 11-2
		// 判断最后一位校验码是否正确
		const arr = seventeen.split('');
		const len = arr.length;
		let num = 0;
		for (let i = 0; i < len; i++) {
			num += arr[i] * weight_factor[i];
		}

		// 获取余数
		const resisue = num % 11;
		const last_no = check_code[resisue];

		// 格式的正则
		// 正则思路
		/*
    第一位不可能是0
    第二位到第六位可以是0-9
    第七位到第十位是年份，所以七八位为19或者20
    十一位和十二位是月份，这两位是01-12之间的数值
    十三位和十四位是日期，是从01-31之间的数值
    十五，十六，十七都是数字0-9
    十八位可能是数字0-9，也可能是X
    */
		const idcard_patter =
			/^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;

		// 判断格式是否正确
		const format = idcard_patter.test(idcode);

		// 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
		return !!(last === last_no && format);
	},

	onClickNext: function () {
		// idcard: '',
		// username: '',
		// schoolList: ['北京大学', '清华大学'],
		// schoolName: '北京大学',
		// subjectList: ['语文', '数学'],
		// subjectName: '英语',
		// credentialImg: '',
		const { username, idcard, schoolName, subjectName, credentialImg } = this.data;
		if (!username) return this.showError('请填写姓名');
		if (!idcard) return this.showError('请填写身份证');
		if (!schoolName) return this.showError('请选择学校');
		if (!subjectName) return this.showError('请选择科目');
		if (!credentialImg) return this.showError('请上传凭证');
		const flag = this.checkoutIdcard(idcard);
		if (!flag) return this.showError('身份信息错误');
		wx.showToast({
			title: '提交成功',
		});
		wx.navigateBack({
			complete: (res) => {},
		});
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {},
});
