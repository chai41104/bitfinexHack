const rest = require('./ethfinex');
const order = require('./order');

order.getOrder(rest,(result) => {
	console.log(result);
});
