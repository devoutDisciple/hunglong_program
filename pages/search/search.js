import { get } from '../../utils/request';
import loading from '../../utils/loading';
import { filterContentTypeByNum } from '../../utils/filter';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		activeIdx: 2,
		tabList: [
			{
				key: 'posts',
				value: '图文',
			},
			{
				key: 'video',
				value: '视频',
			},
			{
				key: 'circle',
				value: '圈子',
			},
			{
				key: 'user',
				value: '用户',
			},
		],
		posts: [], // 图文或者视频
		circles: [], // 圈子
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {
		// 获取图文
		this.getContents();
		// 获取圈子
		this.getCirclesByKey();
	},

	// 查询数据
	getContents: function () {
		loading.showLoading();
		const user_id = wx.getStorageSync('user_id');
		get({ url: '/search/contents', data: { user_id } })
			.then((res) => {
				res.forEach((item) => {
					item.type = filterContentTypeByNum(item.type);
				});
				console.log(res, 1111);
				this.setData({ posts: res || [] });
			})
			.finally(() => loading.hideLoading());
	},

	// 根据关键字查询圈子
	getCirclesByKey: function () {
		loading.showLoading();
		const user_id = wx.getStorageSync('user_id');
		get({ url: '/search/circles', data: { user_id } })
			.then((res) => {
				console.log(res, 222);
				this.setData({ circles: res || [] });
			})
			.finally(() => loading.hideLoading());
	},

	// 改变tab
	onChangeTab: function (e) {
		const { index } = e.detail;
		this.setData({ activeIdx: index });
	},
});
