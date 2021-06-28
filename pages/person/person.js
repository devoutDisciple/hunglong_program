import { get, post, uploadFile } from '../../utils/request';
import util from '../../utils/util';
import loading from '../../utils/loading';
import { filterContentTypeByNum, filterUserIdentity } from '../../utils/filter';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		screenWidth: 414, // 屏幕宽度
		navHeight: '40px',
		lineHeight: '47px',
		statusBarHeight: '26px',
		backIconHeight: '26px',
		backIconMarginTop: '10px',
		activeIdx: 0, // 当前选择的tab
		user_id: '', // 当前主页的用户id
		userDetail: {}, // 当前用户的数据
		current_user_id: '', // 当前登录账户
		txtObj: {
			threeDays: [], // 三天内的数据
			monthDays: [], // 一个月内的数据
			longago: [], // 一月以前的数据
		}, // 文字数据
		videoObj: {
			threeDays: [], // 三天内的数据
			monthDays: [], // 一个月内的数据
			longago: [], // 一月以前的数据
		}, // 视频数据

		tabList: [
			{
				key: 'posts',
				value: '文字',
			},
			{
				key: 'blog',
				value: '视频',
			},
			{
				key: 'vote',
				value: '相册',
			},
		],
		albumsList: [], // 相册列表
		isLoading: false, // 上拉加载的时候
		current: 1, // 当前页码
		lowerThreshold: 400, // 距离底部多远的时候触发上拉事件
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		const current_user_id = wx.getStorageSync('user_id');
		const { user_id } = options;
		this.setData({ user_id: String(user_id), current_user_id: String(current_user_id) }, () => {
			// 获取设备信息
			this.getDeviceData();
			// 获取用户基本信息
			this.getUserDetail();
			// 获取帖子博客等内容
			this.getPostsByUserId(0);
			// 添加浏览历史
			this.addViewRecord();
		});
	},

	// 点击发送消息
	onTapMsg: function () {
		const { userDetail } = this.data;
		let msgData = wx.getStorageSync('msg_data');
		let data = [
			{
				person_id: userDetail.id,
				person_name: userDetail.username,
				person_photo: userDetail.photo,
				unread: 0,
				msg: [],
			},
		];
		if (msgData) {
			msgData = JSON.parse(msgData);
			if (Array.isArray(msgData)) {
				let flag = true;
				let curUser = {};
				let curIdx = 0;
				// 应当判断是否已经给该用户发过消息
				msgData.forEach((item, index) => {
					if (item.person_id === userDetail.id) {
						flag = false;
						curUser = item;
						curIdx = index;
					}
				});
				if (flag) {
					data = [...data, ...msgData];
				} else {
					msgData.splice(curIdx, 1);
					msgData.unshift(curUser);
					data = msgData;
				}
			}
		}
		wx.setStorageSync('msg_data', JSON.stringify(data));
		wx.navigateTo({
			url: `/pages/message/chat/chat?person_id=${userDetail.id}`,
		});
	},

	// 点击返回
	onGoback: function () {
		wx.navigateBack({
			complete: () => {},
		});
	},

	// 添加浏览历史
	addViewRecord: function () {
		const { user_id, current_user_id } = this.data;
		if (user_id && current_user_id && String(user_id) !== String(current_user_id)) {
			post({ url: '/viewRecord/addRecord', data: { user_id: current_user_id, other_id: user_id } });
		}
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
				screenWidth: res.screenWidth,
			});
		});
	},

	// 获取用户基本信息
	getUserDetail: function () {
		const { user_id } = this.data;
		get({ url: '/user/userDetailByUserId', data: { user_id } }).then((res) => {
			res.identityTxt = filterUserIdentity(res.identity);
			this.setData({ userDetail: res }, () => {
				// 获取是否已经关注该用户
				this.getHadAttentionUser();
			});
		});
	},

	// 获取是否已经关注该用户
	getHadAttentionUser: function () {
		const { user_id, current_user_id, userDetail } = this.data;
		get({ url: '/user/hadAttentionUser', data: { user_id, current_user_id } }).then((res) => {
			userDetail.hadAttention = res.hadAttention;
			this.setData({ userDetail });
		});
	},

	// 点击关注获取取消
	onAttentionUser: function () {
		const { userDetail } = this.data;
		const user_id = wx.getStorageSync('user_id');
		if (!user_id) {
			return wx.showToast({
				title: '请先登录',
				icon: 'error',
			});
		}
		userDetail.hadAttention = !userDetail.hadAttention;
		post({ url: '/attention/attentionUser', data: { user_id, other_id: userDetail.id } });
		this.setData({ userDetail });
	},

	// 切换tab的时候
	onChangeTab: function (e) {
		const { index } = e.detail;
		this.setData(
			{
				activeIdx: index,
				txtObj: {
					threeDays: [], // 三天内的数据
					monthDays: [], // 一个月内的数据
					longago: [], // 一月以前的数据
				},
				videoObj: {
					threeDays: [], // 三天内的数据
					monthDays: [], // 一个月内的数据
					longago: [], // 一月以前的数据
				},
				albumsList: [],
				current: 1,
			},
			() => {
				if (index === 2) {
					this.getAllImgsByUserId();
				} else {
					this.getPostsByUserId(index);
				}
			},
		);
	},

	// 根据user_id 查询图片
	getAllImgsByUserId: function () {
		const { user_id } = this.data;
		get({ url: '/album/allByUserId', data: { user_id } }).then((res) => {
			this.setData({ albumsList: res || [] });
		});
	},

	// 上传图片
	onUploadImg: function () {
		const user_id = wx.getStorageSync('user_id');
		wx.chooseImage({
			count: 9,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success: async (res) => {
				// tempFilePath可以作为img标签的src属性显示图片
				if (res.errMsg === 'chooseImage:ok') {
					const { tempFilePaths } = res;
					if (tempFilePaths && tempFilePaths.length !== 0) {
						let len = tempFilePaths.length;
						loading.showLoading();
						while (len > 0) {
							len -= 1;
							// eslint-disable-next-line no-await-in-loop
							await uploadFile({
								url: '/album/upload',
								data: tempFilePaths[len],
								formData: { user_id },
							});
						}
						this.getAllImgsByUserId();
						loading.hideLoading();
					}
				}
			},
			fail: function () {
				wx.showToast({
					title: '请重新选择',
					icon: 'error',
				});
			},
		});
	},

	// 滑动到底部
	onScrollBtm: function () {
		const { isLoading, activeIdx } = this.data;
		if (!isLoading) {
			this.setData({ isLoading: true }, () => {
				this.getPostsByUserId(activeIdx);
			});
		}
	},

	// 获取帖子博客等相应内容
	getPostsByUserId: function (activeIdx) {
		loading.showLoading();
		const { user_id, txtObj, videoObj, current, screenWidth } = this.data;
		get({ url: '/content/contentsByTypeAndUserId', data: { user_id, activeIdx, current } })
			.then((res) => {
				if (Array.isArray) {
					const {
						threeDays = [], // 三天内的数据
						monthDays = [], // 一个月内的数据
						longago = [], // 一月以前的数据
					} = res;
					util.handleContentList(threeDays, screenWidth);
					util.handleContentList(monthDays, screenWidth);
					util.handleContentList(longago, screenWidth);
					let result = [];
					const initObj = {
						threeDays: [], // 三天内的数据
						monthDays: [], // 一个月内的数据
						longago: [],
					};
					if (activeIdx === 0) {
						result = {
							threeDays: txtObj.threeDays.concat(threeDays),
							monthDays: txtObj.monthDays.concat(monthDays),
							longago: txtObj.longago.concat(longago),
						};
						this.setData({
							txtObj: result || initObj,
							videoObj: initObj,
							current: current + 1,
							loading: false,
						});
					}
					if (activeIdx === 1) {
						result = {
							threeDays: videoObj.threeDays.concat(threeDays),
							monthDays: videoObj.monthDays.concat(monthDays),
							longago: videoObj.longago.concat(longago),
						};
						this.setData({
							txtObj: initObj,
							videoObj: result || initObj,
							current: current + 1,
							loading: false,
						});
					}
				} else {
					this.setData({
						txtObj: {
							threeDays: [], // 三天内的数据
							monthDays: [], // 一个月内的数据
							longago: [], // 一月以前的数据
						},
					});
				}
			})
			.finally(() => loading.hideLoading());
	},
});
