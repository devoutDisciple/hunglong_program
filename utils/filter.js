const filterContentTypeByTxt = (type) => {
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

const filterContentTypeByField = (type) => {
	let txt = '帖子';
	switch (type) {
		case 'posts':
			txt = '帖子';
			break;
		case 'blogs':
			txt = '博客';
			break;
		case 'vote':
			txt = '投票';
			break;
		case 'battle':
			txt = 'PK';
			break;
		default:
			break;
	}
	return txt;
};

const filterContentTypeByNum = (type) => {
	let txt = 'posts';
	switch (type) {
		case 1:
			txt = 'posts';
			break;
		case 2:
			txt = 'blogs';
			break;
		case 3:
			txt = 'vote';
			break;
		case 4:
			txt = 'battle';
			break;
		default:
			break;
	}
	return txt;
};

module.exports = {
	filterContentTypeByTxt,
	filterContentTypeByField,
	filterContentTypeByNum,
};
