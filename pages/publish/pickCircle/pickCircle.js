import loading from '../../../utils/loading';
import { get, post } from '../../../utils/request';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		circles: [],
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
	onShow: async function () {
		loading.showLoading();
		const pages = getCurrentPages();
		// prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。
		const prevPage = pages[pages.length - 2];
		console.log(prevPage, prevPage.data, 89);
		const { selectCircles } = prevPage.data;
		const user_id = wx.getStorageSync('user_id');
		const newCircles = [];
		const myPlate = { plate_id: -1, plate_name: '我的关注', selected: true, children: [] };
		const myCircles = await get({ url: '/circle/getCirclesByUserId', data: { user_id } });
		myCircles.forEach((item) => {
			myPlate.children.push({
				circle_id: item.id,
				circle_name: item.name,
				selected: !!selectCircles.filter((selCir) => selCir.circle_id === item.id)[0],
			});
		});
		newCircles.push(myPlate);
		const plates = await get({ url: '/circle/getAllCirclesByPlate' });
		plates.forEach((item) => {
			const obj = {
				plate_id: item.plate_id,
				plate_name: item.plate_name,
				selected: false,
			};
			if (item.circles && Array.isArray(item.circles)) {
				obj.children = [];
				item.circles.forEach((circle) => {
					obj.children.push({
						circle_id: circle.id,
						circle_name: circle.name,
						selected: !!selectCircles.filter((selCir) => selCir.circle_id === item.id)[0],
					});
				});
			}
			newCircles.push(obj);
		});
		this.setData({ circles: newCircles });
		loading.hideLoading();
	},

	// 点击模块
	onClickPlate: function (e) {
		const { plateid } = e.currentTarget.dataset;
		const { circles } = this.data;
		circles.forEach((item) => {
			if (item.plate_id === plateid) item.selected = !item.selected;
		});
		this.setData({ circles });
	},

	// 点击圈子
	onClickCircle: function (e) {
		const { circleid } = e.currentTarget.dataset;
		const { circles } = this.data;
		circles.forEach((item) => {
			if (Array.isArray(item.children)) {
				item.children.forEach((circle) => {
					if (circle.circle_id === circleid) circle.selected = !circle.selected;
				});
			}
		});
		this.setData({ circles });
	},

	// 点击确定
	onSave: function () {
		const { circles } = this.data;
		const finalArr = [];
		const selectCircles = [];
		circles.forEach((item) => {
			if (Array.isArray(item.children)) {
				item.children.forEach((circle) => {
					if (circle.selected) selectCircles.push(circle);
				});
			}
		});
		if (selectCircles.length === 0) {
			return wx.showToast({
				title: '请选择圈子',
			});
		}
		selectCircles.forEach((item) => {
			const tempArr = finalArr.filter((circle) => circle.circle_id === item.circle_id)[0];
			if (!tempArr) finalArr.push(item);
		});
		const pages = getCurrentPages();
		// prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。
		const prevPage = pages[pages.length - 2];
		prevPage.setData({
			selectCircles: finalArr,
		});
		wx.navigateBack({
			complete: () => {},
		});
	},
});
