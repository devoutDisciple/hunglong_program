const formatNumber = (n) => {
	n = n.toString();
	return n[1] ? n : `0${n}`;
};
module.exports = {
	format: (timestap) => {
		const date = new Date(Number(timestap)); // 获取一个时间对象
		const year = date.getFullYear(); // 获取完整的年份(4位,1970)
		const month = formatNumber(date.getMonth()); // 获取月份(0-11,0代表1月,用的时候记得加上1)
		const day = formatNumber(date.getDate()); // 获取日(1-31)
		// let time = date.getTime();  // 获取时间(从1970.1.1开始的毫秒数)
		const hours = formatNumber(date.getHours()); // 获取小时数(0-23)
		const minutes = formatNumber(date.getMinutes()); // 获取分钟数(0-59)
		const seconds = formatNumber(date.getSeconds()); // 获取秒数(0-59)
		return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	},
	formatToDay: (timestap) => {
		const date = new Date(Number(timestap)); // 获取一个时间对象
		const year = date.getFullYear(); // 获取完整的年份(4位,1970)
		const month = formatNumber(date.getMonth()); // 获取月份(0-11,0代表1月,用的时候记得加上1)
		const day = formatNumber(date.getDate()); // 获取日(1-31)
		return `${year}-${month}-${day}`;
	},
	getNowDate: () => {
		const date = new Date();
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const hour = date.getHours();
		const minute = date.getMinutes();
		const second = date.getSeconds();
		return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second]
			.map(formatNumber)
			.join(':')}`;
	},
};
