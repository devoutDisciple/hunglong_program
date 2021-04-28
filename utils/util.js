import moment from './moment';

const formatNumber = (n) => {
	n = n.toString();
	return n[1] ? n : `0${n}`;
};

const formatTime = (date) => {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();
	const second = date.getSeconds();
	return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute, second].map(formatNumber).join(':')}`;
};

const getMsgShowTime = (date) => {
	const diffDays = moment(new Date()).diff(moment(date), 'days');
	if (diffDays < 3) return moment(date).calendar();
	if (diffDays < 30) return moment(date).format('MM-DD HH:mm');
	return moment(date).format('YYYY-MM-DD HH:mm');
};

const getDiffTime = (d1, d2) => {
	const diffDays = moment(d1).diff(moment(d2), 'minutes');
	return diffDays;
};

const getDeviceInfo = () => {
	return new Promise((resolve) => {
		// 菜单按钮的布局信息
		const menuDetail = wx.getMenuButtonBoundingClientRect();
		// 获取设备信息
		wx.getSystemInfo({
			success: function (res) {
				const { height: btnHeight, top: btnTop, width: btnWidth, right: btnRight } = menuDetail;
				const { statusBarHeight, screenWidth } = res;
				const headerHight = (btnTop - statusBarHeight) * 2 + statusBarHeight + btnHeight;
				const navHeight = headerHight - statusBarHeight;
				const disWidth = (screenWidth - btnRight) * 2 + btnWidth;
				const paddingLeft = screenWidth - btnRight;
				const paddingTop = btnTop - statusBarHeight;
				const conHegiht = navHeight - paddingTop * 2;
				resolve({
					headerHight,
					statusBarHeight,
					navHeight,
					conHegiht,
					disWidth,
					paddingLeft,
					paddingTop,
				});
			},
		});
	});
};

module.exports = {
	formatTime,
	getMsgShowTime,
	getDiffTime,
	getDeviceInfo,
};
