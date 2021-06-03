import { get, post } from '../../utils/request';
import loading from '../../utils/loading';
import login from '../../utils/login';
import { filterContentTypeByNum } from '../../utils/filter';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		detail: {
			userDetail: {},
		},
		isLoading: false, // 上拉加载的时候
		current: 1, // 当前页码
		lowerThreshold: 400, // 距离底部多远的时候触发上拉事件
		dataList: [],
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {
		this.getUserDetail();
		this.getUserGoodsRecord(1);
	},

	// 获取用户基本信息
	getUserDetail: function () {
		if (!login.isLogin()) return;
		loading.showLoading();
		const user_id = wx.getStorageSync('user_id');
		get({ url: '/user/userDetailByUserId', data: { user_id } })
			.then((res) => {
				this.setData({ detail: { userDetail: res || {} } });
			})
			.finally(() => loading.hideLoading());
	},

	// 获取点赞的记录
	getUserGoodsRecord: function (type) {
		if (type === 1) loading.showLoading();
		const { dataList, current } = this.data;
		const user_id = wx.getStorageSync('user_id');
		get({ url: '/goods/goodsDetailByUser', data: { user_id, current } }).then((res) => {
			if (Array.isArray(res) && res.length !== 0) {
				res.forEach((item) => {
					if (item.contentType === '-1') return;
					item.contentType = filterContentTypeByNum(item.contentType);
				});
				const newList = [...dataList, ...res];
				this.setData({ isLoading: false, dataList: newList, current: current + 1 }, () => {
					if (type === 1) loading.hideLoading();
				});
			}
		});
	},

	/**
	 * 滑动到底部的时候
	 */
	onScrollBtm: function () {
		const { isLoading } = this.data;
		if (!isLoading) {
			this.setData({ isLoading: true }, () => {
				this.getUserGoodsRecord(2);
			});
		}
	},

	// 点击详情
	onSearchContentDetail: function (e) {
		const { contentid, hascontent, type } = e.currentTarget.dataset;
		if (!hascontent) {
			return wx.showToast({
				title: '该内容已删除',
				icon: 'error',
			});
		}
		wx.navigateTo({
			url: `/pages/detail/detail?content_id=${contentid}&type=${type}`,
		});
	},

	// 点赞
	onTapGoods: function (e) {
		const user_id = wx.getStorageSync('user_id');
		const { item, index } = e.currentTarget.dataset;
		const { type, content_id, comment_id, hadGoods } = item;
		const { dataList } = this.data;
		let flag = true;
		if (dataList[index]) {
			flag = !hadGoods;
			dataList[index].hadGoods = flag;
			this.setData({ dataList });
		}
		// 给帖子的赞
		if (type === 1) {
			post({ url: '/goods/addPostsGoods', data: { user_id, content_id, goods_type: flag } });
		}
		if (type === 2) {
			post({ url: '/goods/addReplyGoods', data: { user_id, content_id, goods_type: flag, comment_id } });
		}
	},

	// 删除
	onDeleteGoods: function (e) {
		wx.showModal({
			title: '是否确认删除该点赞？',
			success: (res) => {
				const { confirm } = res;
				if (confirm) {
					const { item } = e.currentTarget.dataset;
					const { dataList } = this.data;
					const newList = dataList.filter((data) => data.id !== item.id);
					this.setData({ dataList: newList });
					post({ url: '/goods/deleteGoodsById', data: { id: item.id } });
				}
			},
		});
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {},
});
