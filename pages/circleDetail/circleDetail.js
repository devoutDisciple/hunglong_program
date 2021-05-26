import util from '../../utils/util';
import { get } from '../../utils/request';
import loading from '../../utils/loading';
import { filterContentTypeByNum } from '../../utils/filter';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		navHeight: '40px',
		statusBarHeight: '20px',
		backIconHeight: '20px',
		backIconMarginTop: '10px',
		headerHight: '60px',
		circleDetail: {},
		activeIdx: 0, // 当前选择的tab
		tabList: [
			{
				key: 'posts',
				value: '帖子',
			},
			{
				key: 'blog',
				value: '博客',
			},
			{
				key: 'vote',
				value: '投票PK',
			},
			{
				key: 'video',
				value: '视频',
			},
		],
		dataList: [], // 数据
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		const { circleId } = options;
		if (!circleId) {
			return wx.navigateBack({});
		}
		this.setData({ circle_id: circleId }, () => {
			// 获取圈子详情
			this.getCircleDetail();
			// 获取内容
			this.getContentsByCircleAndType();
		});
		// 获取设备信息
		this.getDeviceData();
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {},

	// 获取圈子详情
	getCircleDetail: function () {
		const user_id = wx.getStorageSync('user_id');
		const { circle_id } = this.data;
		get({ url: '/circle/circleDetailById', data: { circle_id, user_id } }).then((res) => {
			console.log(res, 4345);
			this.setData({ circleDetail: res || {} });
		});
	},

	// 选择tab的时候
	onChangeTab: function (e) {
		const { index } = e.detail;
		this.setData({ dataList: [], activeIdx: index }, () => {
			this.getContentsByCircleAndType();
		});
	},

	// 获取内容
	getContentsByCircleAndType: function () {
		loading.showLoading();
		const { circle_id, activeIdx } = this.data;
		const user_id = wx.getStorageSync('user_id');
		get({ url: '/content/contentsByCircleAndType', data: { user_id, circle_id, activeIdx } })
			.then((res) => {
				res.forEach((item) => {
					item.type = filterContentTypeByNum(item.type);
				});
				this.setData({ dataList: res || [] });
			})
			.finally(() => loading.hideLoading());
	},

	// 获取设备信息
	getDeviceData: function () {
		// 获取设备信息
		util.getDeviceInfo().then((res) => {
			this.setData({
				headerHight: `${res.headerHight}px`,
				navHeight: `${res.navHeight}px`,
				statusBarHeight: `${res.statusBarHeight}px`,
				backIconHeight: `${res.navHeight / 2}px`,
				backIconMarginTop: `${res.navHeight / 4}px`,
			});
		});
	},
});
