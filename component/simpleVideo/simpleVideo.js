// component/simpleVideo/simpleVideo.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		videoDetail: {
			type: Object,
			value: {},
		},
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		active: false,
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		// 点击视频，控制视频播放和结束
		onTapVideo: function () {
			const { active } = this.data;
			// 组件中必须用this
			const videoContext = wx.createVideoContext('myVideo', this);
			if (active) {
				videoContext.pause();
			} else {
				videoContext.play();
			}
			this.setData({ active: !active });
		},
		// 视频播放结束时候
		onVideoEnd: function () {
			this.setData({ active: false });
		},
		videoErrorCallback: function (e) {
			console.log('视频错误信息:');
			console.log(e.detail.errMsg);
		},
	},

	lifetimes: {
		attached: function () {
			// const query = wx.createSelectorQuery();
			// this.videoContext = wx.createVideoContext('myVideo');
		},
	},
});
