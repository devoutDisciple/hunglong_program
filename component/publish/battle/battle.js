import util from '../../../utils/util';
import loading from '../../../utils/loading';
import { post, uploadFile } from '../../../utils/request';

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
		showErrToast: function (title) {
			wx.showToast({
				title,
				icon: 'error',
			});
		},
		// 发布
		onPublish: async function () {
			loading.showLoading();
			const user_id = wx.getStorageSync('user_id');
			const { activeTimeIdx, title, redImgUrl, redName, blueImgUrl, blueName, selectCircles } = this.data;
			if (!title) return this.showErrToast('请输入标题');
			if (!redImgUrl) return this.showErrToast('缺少红方图片');
			if (!redName) return this.showErrToast('缺少红方名称');
			if (!blueName) return this.showErrToast('缺少蓝方名称');
			if (!blueImgUrl) return this.showErrToast('缺少蓝方图片');
			if (!selectCircles || selectCircles.length === 0) return this.showErrToast('请选择圈子');
			// 上传图片
			const redImg = await uploadFile({ url: '/battle/uploadImg', data: redImgUrl });
			const blueImg = await uploadFile({ url: '/battle/uploadImg', data: blueImgUrl });
			const circle_ids = [];
			const circle_names = [];
			selectCircles.forEach((item) => {
				circle_ids.push(item.circle_id);
				circle_names.push(item.circle_name);
			});
			post({
				url: '/battle/addBattle',
				data: { user_id, activeTimeIdx, title, redImg, redName, blueImg, blueName, circle_ids, circle_names },
			})
				.then((res) => {
					if (res === 'success') {
						wx.showToast({
							title: '发布成功',
							icon: 'success',
						});
						util.reloadHomePage();
						setTimeout(() => {
							wx.navigateBack({
								complete: () => {},
							});
						}, 500);
					}
				})
				.finally(() => loading.hideLoading());
		},
	},
});
