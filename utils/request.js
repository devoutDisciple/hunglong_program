const app = getApp();
const config = require('../config/config');

const { baseUrl } = config;

module.exports = {
	get: (params = {}) => {
		return new Promise((resolve, reject) => {
			wx.request({
				method: 'GET',
				url: baseUrl + params.url,
				data: params.data,
				success: function (res) {
					if (res.data && res.data.code === 200) {
						resolve(res.data.data || {});
					} else {
						wx.showToast({
							title: '网络异常',
							icon: 'error',
							duration: 2000,
						});
						reject(res.data || {});
					}
				},
				fail: function (err) {
					console.info('服务端错误: ', err);
					wx.showToast({
						title: '网络异常',
						icon: 'error',
						duration: 2000,
					});
					reject(err);
				},
			});
		});
	},
	post: (params = {}) => {
		return new Promise((resolve, reject) => {
			wx.request({
				method: 'POST',
				url: baseUrl + params.url,
				data: {
					...params.data,
				},
				success: function (res) {
					if (res.data && res.data.code === 200) {
						resolve(res.data.data || {});
					} else {
						wx.showToast({
							title: '网络异常',
							icon: 'error',
							duration: 2000,
						});
						reject(res.data || {});
					}
				},
				fail: function (err) {
					console.info('服务端错误: ', err);
					wx.showToast({
						title: '网络异常',
						icon: 'error',
						duration: 2000,
					});
					reject(err);
				},
			});
		});
	},
};
