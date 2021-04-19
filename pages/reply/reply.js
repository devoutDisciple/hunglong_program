import { get } from '../../utils/request';
import { photoUrl } from '../../config/config';
import loading from '../../utils/loading';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		visible: false,
		focus: false,
		currentReply: {},
		replyList: [],
		replyImgList: [
			{
				url: '/asserts/temp/1.jpg',
				width: 600,
				height: 500,
			},
			{
				url: '/asserts/temp/2.jpg',
				width: 600,
				height: 500,
			},
			{
				url: '/asserts/temp/1.jpg',
				width: 600,
				height: 500,
			},
			{
				url: '/asserts/temp/2.jpg',
				width: 600,
				height: 500,
			},
		],
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		const { id } = options;
		if (!id) {
			return wx.switchTab({
				url: '/pages/home/home',
			});
		}
		this.getReplyData(id);
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {},

	// 获取当前评论详情
	getReplyData: async function (id) {
		loading.showLoading();
		const currentReply = await get({ url: '/reply/replyDetailById', data: { id } });
		currentReply.userPhoto = `${photoUrl}/${currentReply.userPhoto}`;
		this.setData({ currentReply: currentReply || {} }, () => {
			this.onSerchReplyList();
			loading.hideLoading();
		});
	},

	// 获取评论的评论的列表
	onSerchReplyList: async function () {
		const { currentReply } = this.data;
		loading.showLoading();
		// 获取评论的评论的列表
		const replyList = await get({ url: '/reply/replyListByReplyId', data: { id: currentReply.id } });
		if (Array.isArray(replyList)) {
			replyList.forEach((item) => {
				item.userPhoto = `${photoUrl}/${item.userPhoto}`;
			});
		}
		this.setData({ replyList }, () => {
			loading.hideLoading();
		});
	},

	//   输入框聚焦
	openReply: function () {
		this.setData({ visible: true });
		setTimeout(() => {
			this.setData({ focus: true });
		}, 100);
	},

	onCloseIptDialog: function () {
		this.setData({ visible: false, focus: false });
	},
});
