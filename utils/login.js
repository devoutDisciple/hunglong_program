import { post } from './request';
import loading from './loading';

const app = getApp();

module.exports = {
	getLogin: (userinfo = {}) => {
		return new Promise((resolve, reject) => {
			loading.showLoading();
			// 微信登录
			wx.login({
				// 成功失败与否
				complete: (res) => {
					if (res && res.errMsg === 'login:ok') {
						const { code } = res;
						post({ url: '/login/loginByWxOpenid', data: { code, ...userinfo } })
							.then((data) => {
								app.globalData.userInfo = data;
								const { wx_openid, id } = data;
								wx.setStorageSync('user_id', id);
								wx.setStorageSync('wx_openid', wx_openid);
								resolve(data);
							})
							.catch(() => {
								reject();
							})
							.finally(() => {
								loading.hideLoading();
							});
					} else {
						loading.hideLoading();
						wx.showToast({
							title: '登录失败',
						});
					}
				},
			});
		});
	},
};