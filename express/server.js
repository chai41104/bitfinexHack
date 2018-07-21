require('babel-register')({
	presets:['react']
})

var express = require('express');
var app = express();
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var path = require('path');

const BFX = require('bitfinex-api-node')

const bfx = new BFX({
  apiKey: 'wTERFbxYaLiR7dhsOYRFXKSZij115X6UCBOYygVe1SG',
  apiSecret: 'YBX6uqyT7S13FY0sc9M8yBW6A0Jm0KZqSo0ne0Bdja8',

  ws: {
    url:'wss://api.bitfinex.com/ws/2',
    autoReconnect: true,
    seqAudit: true,
    packetWDDelay: 10 * 1000
  }

  
//   rest: {
//     url: REST_URL,
//     agent
//   }
})

const ws = bfx.ws(2, { transform: true })
var symbol_list= require('./test.json')
var data = require('./bitfinex.json')
var start = 0

ws.on('open', () => {
  console.log('open')
  ws.subscribeTicker('tETHUSD')

  for (var i=0; i< symbol_list.length; i++)
  {
	  //ws.subscribeTicker('fUSD')
	  let name = 't'+ symbol_list[i].toUpperCase()
	  ws.subscribeTicker(name)
  }
	// ws.subscribeTicker('fUSD')

})

// ws.onTicker({ symbol: 'tETHUSD' }, (ticker) => {
//   console.log('ETH/USD ticker: %j', ticker.toJS())
//   data.push(ticker.toJS())
// })

ws.onTicker({}, (ticker) => {
  data.push(ticker.toJS())
})

ws.open()

// app.use(express.static(path.join(__dirname, './www')));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', function(request, response){
	response.setHeader('Access-Control-Allow-Origin', '*')
	var res = []
	// let end = Math.min(data.length, start+10)
	let end = data.length
	if (start < end) {
		for (var i=start; i<end ; i++) {
			res.push(data[i])
		}	
	}
	response.send(res);
	start = end;
});

var PORT=3000;
app.listen(PORT, function(){
	console.log('http://localhost:' + PORT);
});
