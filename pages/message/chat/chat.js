import emoji from '../../../config/emoji';
import { formatTime } from '../../../utils/util';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		orginData: [], // 全部的消息记录
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
		let msgData = wx.getStorageSync('msg_data');

		msgData = JSON.parse(msgData);
		if (Array.isArray(msgData)) {
			const nowData = msgData.filter((item) => String(item.person_id) === String(person_id))[0];
			const { msg } = nowData;
			console.log(nowData, 111);
			console.log(msg, 222);
			wx.setNavigationBarTitle({
				title: nowData.user_name || '聊天',
			});
			this.setData({ orginData: msgData, msg: msg || [] }, () => {
				if (!msg || msg.length === 0) return;
				// 滚动到底部
				this.setData({ scrollBtmId: `item_${msg.length}` });
			});
		}
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

	// 键盘聚焦的事件
	onInputFocus: function () {
		this.setData({ focus: true });
	},

	// 键盘失焦事件
	onInputBlur: function () {
		this.setData({ focus: false });
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

	// 点击发送
	onSendMsg: function () {
		const { msgTxt, msg } = this.data;
		const newMsg = {
			content: msgTxt,
			from: 1,
			time: formatTime(new Date()),
			type: 1,
		};
		msg.push(newMsg);
		this.setData({ msg, msgTxt: '' }, () => {
			// 滚动到底部
			this.setData({ scrollBtmId: `item_${msg.length}` });
		});
	},
});
