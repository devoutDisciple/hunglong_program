import emoji from '../../../config/emoji';
import { post, get, uploadFile } from '../../../utils/request';
import loading from '../../../utils/loading';
// eslint-disable-next-line import/named
import { formatTime, getMsgShowTime, getDiffTime } from '../../../utils/util';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		orginData: [], // 全部的消息记录
		user_detail: {}, // 当前用户的基本信息
		person_detail: {}, // 当前聊天的用户信息
		msg: [], // 消息记录
		focus: true, // input是否聚焦
		showEmoji: true, // 是否展示emoji
		emojis: emoji.emoji,
		msgTxt: '', // 输入的内容
		scrollBtmId: '',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		const { person_id } = options;
		if (!person_id) {
			return wx.switchTab({
				url: '/pages/home/home',
			});
		}
		this.getUserMsg();
		let orginData = wx.getStorageSync('msg_data');
		orginData = JSON.parse(orginData);
		if (Array.isArray(orginData)) {
			const nowData = orginData.filter((item) => String(item.person_id) === String(person_id))[0];
			if (!nowData) return;
			const { msg } = nowData;
			wx.setNavigationBarTitle({
				title: nowData.person_name || '聊天',
			});
			if (Array.isArray(msg)) {
				let time = formatTime(new Date());
				msg.forEach((item) => {
					// 如果时间间隔大于30分钟
					if (getDiffTime(time, item.time) > 30) {
						item.showTime = getMsgShowTime(item.time);
						time = item.time;
					}
				});
			}
			this.setData(
				{
					orginData,
					msg: msg || [],
					person_detail: {
						person_id: nowData.person_id,
						person_name: nowData.person_name,
						person_photo: nowData.person_photo,
					},
				},
				() => {
					if (!msg || msg.length === 0) return;
					// 滚动到底部
					this.setData({ scrollBtmId: `item_${msg.length}` });
				},
			);
		}
	},

	// 获取个人信息
	getUserMsg: function () {
		const user_id = wx.getStorageSync('user_id');
		get({ url: '/user/userDetailByUserId', data: { user_id } }).then((res) => {
			this.setData({ user_detail: res });
		});
	},

	// 键盘聚焦的事件
	onInputFocus: function () {
		this.setData({ focus: true });
	},

	// 键盘失焦事件
	onInputBlur: function () {
		this.setData({ focus: false });
	},

	// 选择图片
	onSelectImg: function () {
		const self = this;
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
						const result = [];
						while (len > 0) {
							len -= 1;
							// eslint-disable-next-line no-await-in-loop
							const imgDetail = await uploadFile({
								url: '/message/uploadImg',
								data: tempFilePaths[len],
							});
							result.push(imgDetail);
						}
						console.log(result, 34322);
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

	// 展示emoji
	onShowEmoji: function () {
		this.setData({ showEmoji: !this.data.showEmoji });
	},

	// 点击emoji
	onClickEmoji: function (e) {
		const { msgTxt } = this.data;
		const { item } = e.currentTarget.dataset;
		this.setData({ msgTxt: `${msgTxt} ${item} ` });
	},

	// 输入框输入的时候
	onChangeValue: function (e) {
		const { value } = e.detail;
		this.setData({ msgTxt: value });
	},

	// 保存消息到服务端
	postMessage: function (msgTxt) {
		const user_id = wx.getStorageSync('user_id');
		const { person_detail, user_detail } = this.data;
		const { person_id } = person_detail;
		console.log(user_detail, 1123);
		const { username, photo } = user_detail;
		post({ url: '/message/addMsg', data: { user_id, person_id, username, user_photo: photo, content: msgTxt } });
	},

	// 点击发送
	onSendMsg: function () {
		const { orginData, msgTxt, msg } = this.data;
		const newMsg = {
			content: msgTxt,
			from: 1,
			time: formatTime(new Date()),
			type: 1,
		};
		msg.push(newMsg);
		if (Array.isArray(msg)) {
			let time = formatTime(new Date());
			msg.forEach((item) => {
				// 如果时间间隔大于30分钟
				if (getDiffTime(time, item.time) > 30) {
					item.showTime = getMsgShowTime(item.time);
					time = item.time;
				}
			});
		}
		this.setData({ msg, msgTxt: '' }, () => {
			// 滚动到底部
			this.setData({ scrollBtmId: `item_${msg.length}` });
			// 存储消息
			wx.setStorage({
				data: JSON.stringify(orginData),
				key: 'msg_data',
			});
			this.postMessage(msgTxt);
		});
	},
});
