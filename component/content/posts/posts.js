// component/homePosts/homePosts.js
Component({
	options: {
		styleIsolation: 'isolated', // isolated 表示启用样式隔离，在自定义组件内外，使用 class 指定的样式将不会相互影响（一般情况下的默认值）；
	},
	/**
	 * 组件的属性列表
	 */
	properties: {},

	/**
	 * 组件的初始数据
	 */
	data: {
		imgList: [
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
				url: '/asserts/temp/3.jpg',
				width: 600,
				height: 500,
			},
			{
				url: '/asserts/temp/88.png',
				width: 600,
				height: 700,
			},
			{
				url: '/asserts/temp/99.png',
				width: 600,
				height: 400,
			},
		],
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		// 点击内容区
		onTapCon: function () {
			// this.triggerEvent('OnTapCon');
			wx.navigateTo({
				url: '/pages/detail/posts/posts',
			});
		},
		// 点赞
		onTapGood: function () {
			console.log('点赞');
		},
		// 点击分享
		onTapShare: function () {
			console.log('点击分享');
		},
	},

	// 组件生命周期函数-在组件实例进入页面节点树时执行)
	attached: function () {
		const { imgList } = this.data;
		const imgLen = parseInt(Math.random() * 10);
		const newArr = [];
		for (let i = 0; i < imgLen; i++) {
			newArr.push(imgList[parseInt(Math.random() * 5)]);
		}
		this.setData({ imgList: newArr });
	},
});
