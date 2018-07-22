const rest = require('./ethfinex');
const order = require('./order');

// order.getOrder(rest,(result) => {
// 	console.log(result);
// });

// order.sendOrder(rest, 'ETHUSD', '1', '500', (err, res) => {
// 	if (err) console.log(err)
// 	console.log(res)
// });

let symbols;

order.getSymbol(rest, (err, res) => {
	if (err) console.log(err)
	symbols = res;
	for(let i in symbols) {
		order.ticker(rest, symbols[i], (err, res) => {
			if (err) console.log(err)
			console.log(symbols[i]);
			console.log(res);
		});
	}
});

