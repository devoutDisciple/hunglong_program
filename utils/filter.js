const filterContentType = (type) => {
	let txt = '帖子';
	switch (type) {
		case 1:
			txt = '帖子';
			break;
		case 2:
			txt = '博客';
			break;
		case 3:
			txt = '投票';
			break;
		case 4:
			txt = 'PK';
			break;
		default:
			break;
	}
	return txt;
};

module.exports = {
	filterContentType,
};
