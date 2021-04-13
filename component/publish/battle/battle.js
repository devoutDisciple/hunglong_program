import loading from '../../../utils/loading';
import { uploadFile } from '../../../utils/request';

Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		selectCircles: {
			type: Object,
			value: [],
		},
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		activeTimeIdx: 1, // 默认选择一天
		title: '', // pk标题
		redImgUrl: '', // 红方图片
		redName: '', // 红方名称
		blueImgUrl: '', // 蓝方图片
		blueName: '', // 蓝方名称
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		// 切换选择时间
		onChangeTime: function (e) {
			const { index } = e.currentTarget.dataset;
			this.setData({ activeTimeIdx: index });
		},
		// 选择图片
		onChooseImg: function (e) {
			const { team } = e.currentTarget.dataset;
			const self = this;
			wx.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'],
				sourceType: ['album', 'camera'],
				success(res) {
					// tempFilePath可以作为img标签的src属性显示图片
					const { tempFilePaths } = res;
					const url = tempFilePaths[0] || '';
					self.setData(team === 'red' ? { redImgUrl: url } : { blueImgUrl: url });
				},
				fail: function () {
					wx.showToast({
						title: '请重新选择',
						icon: 'error',
					});
				},
			});
		},
		// 输入标题
		onChangeTitle: function (e) {
			const { detail } = e;
			this.setData({ title: detail });
		},
		// 输入双方名称
		onChangeName: function (e) {
			const { team } = e.currentTarget.dataset;
			const { detail } = e;
			this.setData(team === 'red' ? { redName: detail } : { blueName: detail });
		},
		// 发布
		onPublish: async function () {
			loading.showLoading();
			const { activeTimeIdx, title, redImgUrl, redName, blueImgUrl, blueName } = this.data;
			// 上传图片
			const redImgCurUrl = await uploadFile({ url: '/posts/uploadImg', data: redImgUrl });
			const blueImgCurUrl = await uploadFile({ url: '/posts/uploadImg', data: blueImgUrl });
			console.log(activeTimeIdx, title, redImgCurUrl, redName, blueImgCurUrl, blueName, 111);
			loading.hideLoading();
		},
	},
});
