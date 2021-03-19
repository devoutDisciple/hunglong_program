// pages/home/home.js
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		iconList: [
			{
				key: 'school',
				title: '学校',
				iconUrl: '/asserts/public/school.png',
			},
			{
				key: 'game',
				title: '游戏',
				iconUrl: '/asserts/public/game.png',
			},
			{
				key: 'star',
				title: '追星',
				iconUrl: '/asserts/public/star.png',
			},
			{
				key: 'joke',
				title: '搞笑',
				iconUrl: '/asserts/public/joke.png',
			},
			{
				key: 'exchange',
				title: '学科交流',
				iconUrl: '/asserts/public/exchange.png',
			},
			{
				key: 'question',
				title: '有问必答',
				iconUrl: '/asserts/public/question.png',
			},
			{
				key: 'cloud',
				title: '云盘资料',
				iconUrl: '/asserts/public/cloud.png',
			},
			{
				key: 'waiting',
				title: '敬请期待',
				iconUrl: '/asserts/public/waiting.png',
			},
		],
		activeTab: 1, // 选中的tab
		activeNames: ['1'],
		topicClass: 'topic_origin',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {},

	/**
	 * 改变话题
	 */
	onChange(event) {
		this.setData({
			activeNames: event.detail,
		});
	},

	/**
	 * 点击展开话题
	 */
	cntOpen: function () {
		const { topicClass } = this.data;
		this.setData({ topicClass: topicClass !== 'topic_open' ? 'topic_open' : 'topic_close' });
	},

	// 点击帖子内容区
	onTapCon: function () {
		wx.navigateTo({
			url: '/pages/detail/posts/posts',
		});
	},

	// 给帖子点赞
	onTapGood: function () {
		console.log('点赞');
	},
});
