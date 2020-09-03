module.exports = (a, b) => {
	if (a.length >= 0) {
		a.filter((val) => b.indexOf(val) != -1);
	}
};
