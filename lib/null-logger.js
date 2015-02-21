function log (msg, props) {
	console.log(msg);
	if (!!props) {
		console.log(props);
	}
}

module.exports = {
	info: log,
	warn: log,
	error: log
};
