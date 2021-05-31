import util from '../../utils/util';
import { get } from '../../utils/request';
import loading from '../../utils/loading';
import { filterContentTypeByNum } from '../../utils/filter';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		headerHight: 60,
		activeIdx: 0,
		tabList: [
			{
				key: 'posts',
				value: '文字',
			},
			{
				key: 'vote',
				value: '投票',
			},
			{
				key: 'battle',
				value: 'PK',
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
		posts: [], // 帖子博客
		votes: [], // 投票
		battles: [], // PK
		videos: [], // 视频
		circles: [], // 圈子
		users: [], // 用户
		keywords: '', // 关键字
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {
		// 获取设备信息
		this.getDeviceData();
	},

	// 输入框改变
	onIptChange: function (e) {
		const { value } = e.detail;
		this.setData({ keywords: value });
	},

	// 输入确认的时候
	onIptConfirm: function () {
		const { activeIdx } = this.data;
		this.onSearch(activeIdx);
	},

	// 获取设备信息
	getDeviceData: function () {
		// 获取设备信息
		util.getDeviceInfo().then((res) => {
			this.setData({
				headerHight: res.headerHight,
			});
		});
	},

	// 查询帖子或者博客数据
	getTxtContents: function () {
		loading.showLoading();
		const user_id = wx.getStorageSync('user_id');
		const { keywords } = this.data;
		get({ url: '/search/txtContents', data: { keywords, user_id } })
			.then((res) => {
				res.forEach((item) => {
					item.type = filterContentTypeByNum(item.type);
				});
				this.setData({ posts: res || [] });
			})
			.finally(() => loading.hideLoading());
	},

	// 查询投票
	getVoteContents: function () {
		loading.showLoading();
		const user_id = wx.getStorageSync('user_id');
		const { keywords } = this.data;
		get({ url: '/search/voteContents', data: { keywords, user_id } })
			.then((res) => {
				res.forEach((item) => {
					item.type = filterContentTypeByNum(item.type);
				});
				this.setData({ votes: res || [] });
			})
			.finally(() => loading.hideLoading());
	},

	// 查询PK
	getBattleContents: function () {
		loading.showLoading();
		const user_id = wx.getStorageSync('user_id');
		const { keywords } = this.data;
		get({ url: '/search/battleContents', data: { keywords, user_id } })
			.then((res) => {
				res.forEach((item) => {
					item.type = filterContentTypeByNum(item.type);
				});
				console.log(res, 999);
				this.setData({ battles: res || [] });
			})
			.finally(() => loading.hideLoading());
	},

	// 查询视频
	getVideoContents: function () {
		loading.showLoading();
		const user_id = wx.getStorageSync('user_id');
		const { keywords } = this.data;
		get({ url: '/search/videoContents', data: { keywords, user_id } })
			.then((res) => {
				res.forEach((item) => {
					item.type = filterContentTypeByNum(item.type);
				});
				this.setData({ videos: res || [] });
			})
			.finally(() => loading.hideLoading());
	},

	// 根据关键字查询圈子
	getCirclesByKey: function () {
		loading.showLoading();
		const user_id = wx.getStorageSync('user_id');
		const { keywords } = this.data;
		get({ url: '/search/circles', data: { keywords, user_id } })
			.then((res) => {
				this.setData({ circles: res || [] });
			})
			.finally(() => loading.hideLoading());
	},

	// 根据关键字查询用户
	getUsersByKey: function () {
		loading.showLoading();
		const user_id = wx.getStorageSync('user_id');
		const { keywords } = this.data;
		get({ url: '/search/users', data: { keywords, user_id } })
			.then((res) => {
				this.setData({ users: res || [] });
			})
			.finally(() => loading.hideLoading());
	},

	onSearch: function (index) {
		const { keywords } = this.data;
		if (!keywords) return;
		// 帖子博客
		if (index === 0) {
			this.getTxtContents(index);
		}
		// 投票
		if (index === 1) {
			this.getVoteContents(index);
		}
		// PK
		if (index === 2) {
			this.getBattleContents();
		}
		// 视频
		if (index === 3) {
			this.getVideoContents();
		}
		// 圈子
		if (index === 4) {
			this.getCirclesByKey();
		}
		// 用户
		if (index === 5) {
			this.getUsersByKey();
		}
	},

	// 改变tab
	onChangeTab: function (e) {
		const { index } = e.detail;
		this.setData(
			{
				activeIdx: index,
				posts: [], // 图文或者视频
				circles: [], // 圈子
				users: [], // 用户
			},
			() => this.onSearch(index),
		);
	},
});
