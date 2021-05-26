import { get } from '../../utils/request';
import loading from '../../utils/loading';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		detail: {},
		content: '空间的开发商\n咖啡机肯定是',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		loading.showLoading();
		const { noticeId } = options;
		get({ url: '/notice/noticeDetail', data: { notice_id: noticeId } })
			.then((res) => {
				console.log(res.desc, 78239);
				this.setData({ detail: res || {} });
			})
			.finally(() => loading.hideLoading());
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {},
});
