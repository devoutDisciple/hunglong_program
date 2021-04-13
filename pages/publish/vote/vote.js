import loading from '../../../utils/loading';
import { get } from '../../../utils/request';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		activeTab: 0, // 当前选择的tab
		selectCircles: [], // 选择的圈子
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {
		// 获取个人学校圈子
		this.getPersonSchoolCircle();
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
		this.voteDom = this.selectComponent('#vote');
		this.battleDom = this.selectComponent('#battle');
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {},

	// 获取个人的学校圈子
	getPersonSchoolCircle: function () {
		loading.showLoading();
		const user_id = wx.getStorageSync('user_id');
		const { selectCircles } = this.data;
		// 获取个人学校圈子
		get({ url: '/circle/getPersonSchoolCircle', data: { user_id } })
			.then((res) => {
				if (!res) return;
				res.selected = true;
				const newCircle = [...selectCircles, res];
				this.setData({ selectCircles: newCircle });
			})
			.finally(() => loading.hideLoading());
	},

	// 改变tab
	onChangeTab: function (e) {
		const { index } = e.detail;
		this.setData({ activeTab: index });
	},

	// 点击发布
	onSave: function () {
		const { activeTab } = this.data;
		if (activeTab === 0) {
			this.voteDom.onPublish();
		}
		if (activeTab === 1) {
			this.battleDom.onPublish();
		}
	},
});
