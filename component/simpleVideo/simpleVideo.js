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
		videoId: {
			type: String,
			value: '',
		},
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		active: false,
		hasPlay: false, // 是否已经播放过
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		// 点击视频，控制视频播放和结束
		onTapVideo: function () {
			const pages = getCurrentPages();
			const currentPage = pages[pages.length - 1];
			// 将当前播放的视频上下文保存在当前页面，以确保当前只有一个视频在播放
			const { videoContext: pageVideoContext } = currentPage.data;
			const { active, videoId } = this.data;
			if (!videoId) return;
			// 组件中必须用this
			const videoContext = wx.createVideoContext(videoId, this);
			// 停止上一个视频
			if (pageVideoContext && pageVideoContext.stop) {
				pageVideoContext.pause();
			}
			if (active) {
				videoContext.pause();
			} else {
				this.setData({ hasPlay: true });
				videoContext.play();
			}
			// 替换当前视频上下文
			currentPage.setData({ videoContext });
			this.setData({ active: !active });
		},
		// 视频暂停的时候
		onVideoPause: function () {
			this.setData({ active: false });
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
