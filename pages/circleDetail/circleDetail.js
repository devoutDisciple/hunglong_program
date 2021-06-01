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
		notices: [], // 公告列表
		isLoading: false, // 是否在加载中
		current: 1, // 当前页码
		lowerThreshold: 400, // 距离底部多远的时候触发上拉事件
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
			// 获取公告
			this.getNotice();
			// 获取圈子详情
			this.getCircleDetail();
			// 获取内容
			this.getContentsByCircleAndType();
		});
		// 获取设备信息
		this.getDeviceData();
	},

	// 滑动到底部
	onScrollBtm: function () {
		const { isLoading } = this.data;
		if (!isLoading) {
			this.setData({ isLoading: true }, async () => {
				await this.getContentsByCircleAndType(2);
			});
		}
	},

	// 获取公告
	getNotice: function () {
		const { circle_id } = this.data;
		get({ url: '/notice/notices', data: { circle_id } }).then((res) => {
			if (Array.isArray(res)) {
				res.forEach((item) => {
					item.tag = item.type === 1 ? '公告' : '置顶';
				});
				this.setData({ notices: res });
			}
		});
	},

	// 点击公告
	onTapNotice: function (e) {
		const { noticeid } = e.currentTarget.dataset;
		wx.navigateTo({
			url: `/pages/notice/notice?noticeId=${noticeid}`,
		});
	},

	// 获取圈子详情
	getCircleDetail: function () {
		const user_id = wx.getStorageSync('user_id');
		const { circle_id } = this.data;
		get({ url: '/circle/circleDetailById', data: { circle_id, user_id } }).then((res) => {
			this.setData({ circleDetail: res || {} });
		});
	},

	// 选择tab的时候
	onChangeTab: function (e) {
		const { index } = e.detail;
		this.setData({ dataList: [], activeIdx: index, current: 1 }, () => {
			this.getContentsByCircleAndType();
		});
	},

	// 获取内容
	getContentsByCircleAndType: function () {
		loading.showLoading();
		const { circle_id, activeIdx, current, dataList } = this.data;
		const user_id = wx.getStorageSync('user_id');
		get({ url: '/content/contentsByCircleAndType', data: { user_id, circle_id, activeIdx, current } })
			.then((res) => {
				res.forEach((item) => {
					item.type = filterContentTypeByNum(item.type);
				});
				const newData = [...dataList, ...res];
				this.setData({ dataList: newData || [], current: current + 1, isLoading: false });
			})
			.finally(() => loading.hideLoading());
	},

	// 点击返回
	onGoback: function () {
		wx.navigateBack({
			complete: () => {},
		});
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
