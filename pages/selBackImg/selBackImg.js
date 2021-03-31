import { baseUrl } from '../../config/config';
import { get } from '../../utils/request';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		baseUrl,
		bgList: [],
		currentSelectIdx: 0,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {
		this.getAllDefaultBg();
	},

	// 获取所有背景图
	getAllDefaultBg: function () {
		get({ url: '/bgImg/getAllDefaultBg' }).then((res) => {
			// const result = [];
			// res.forEach((item) => {
			// 	result.push(`${baseUrl}/bg/${item}`);
			// });
			this.setData({ bgList: res });
		});
	},

	/**
	 * 点击选择
	 */
	onSelectImg: function (e) {
		const { idx } = e.currentTarget.dataset;
		this.setData({ currentSelectIdx: idx });
	},

	// 点击确定选择
	onSure: function () {
		const { bgList, currentSelectIdx } = this.data;
		const pages = getCurrentPages();
		// prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。
		const prevPage = pages[pages.length - 2];
		const bgName = bgList[currentSelectIdx];
		prevPage.setData({ bgUrl: `${baseUrl}/bg/${bgName}`, bgName });
		wx.navigateBack({
			complete: () => {},
		});
	},
});
