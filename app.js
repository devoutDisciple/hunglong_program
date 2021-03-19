import { post } from './utils/request';
import loading from './utils/loading';

App({
	onLaunch() {
		loading.showLoading();
		// 微信登录
		wx.login({
			// 成功失败与否
			complete: (res) => {
				if (res && res.errMsg === 'login:ok') {
					const { code } = res;
					post({ url: '/login/loginByWxOpenid', data: { code } })
						.then((data) => {
							this.globalData.userInfo = data;
						})
						.finally(() => {
							loading.hideLoading();
						});
				}
			},
		});
		// 在这里统计实时在线人数
	},
	globalData: {
		userInfo: null,
	},
});
