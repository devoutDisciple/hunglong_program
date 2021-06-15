Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		imgList: {
			type: Array,
			value: [],
		},
		showAll: {
			type: Boolean,
			value: false,
		},
	},

	/**
	 * 组件的初始数据
	 */
	data: {},

	/**
	 * 组件的方法列表
	 */
	methods: {
		showImg: function (e) {
			const { index } = e.currentTarget.dataset;
			const { imgList } = this.data;
			const urls = [];
			imgList.forEach((item) => {
				if (item.url) urls.push(item.url);
			});
			wx.previewImage({ urls, current: urls[index], showmenu: true });
		},
	},

	/**
	 * 生命周期
	 */
	lifetimes: {
		attached: function () {
			const { imgList } = this.data;
			if (Array.isArray(imgList) && imgList.length > 2) {
				const len = imgList.length;
				const remain = len % 3;
				if (remain === 1) {
					const newImgList = imgList.concat([{ empty: true }, { empty: true }]);
					return this.setData({ imgList: newImgList, imgListLen: imgList.length });
				}
				if (remain === 2) {
					const newImgList = imgList.concat([{ empty: true }]);
					return this.setData({ imgList: newImgList, imgListLen: imgList.length });
				}
			}
			this.setData({ imgList, imgListLen: imgList.length });
		},
		detached: function () {
			// 在组件实例被从页面节点树移除时执行
		},
	},
});
