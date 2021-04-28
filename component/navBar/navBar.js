import { getDeviceInfo } from '../../utils/util';

Component({
	properties: {
		/**
		 * 自定义返回事件处理
		 */
		// customBackReturn: {
		// 	type: Boolean,
		// 	value: false,
		// },
	},
	data: {
		headerHight: 60, // 导航总高度
		statusHeight: 20, // 状态栏高度
		navHeight: 40, // 内容高度
		conHegiht: 32, // 内容区要展示内容的高度
		disWidth: 101, // 按钮占用的宽度
		paddingLeft: 7, // 左边留白宽度
		paddingTop: 4, // 上方留白高度
	},

	methods: {},

	// 组件生命周期函数-在组件实例进入页面节点树时执行)
	attached() {
		getDeviceInfo().then((res) => {
			const {
				headerHight,
				statusBarHeight: statusHeight,
				navHeight,
				conHegiht,
				disWidth,
				paddingLeft,
				paddingTop,
			} = res;
			this.setData({
				headerHight,
				statusHeight,
				navHeight,
				conHegiht,
				disWidth,
				paddingLeft,
				paddingTop,
			});
		});
	},
});
