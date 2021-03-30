import { baseUrl } from '../../config/config';
import loading from '../../utils/loading';
import { get, post } from '../../utils/request';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		bgList: [],
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
			const result = [];
			res.forEach((item) => {
				result.push(`${baseUrl}/bg/${item}`);
			});
			console.log(result, 99);
			this.setData({ bgList: result });
		});
	},

	/**
	 * 点击预览
	 */
	onPrivewImg: function () {
		console.log(123);
	},
});
