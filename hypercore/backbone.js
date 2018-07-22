const BFX = require('bitfinex-api-node')
const hypercore = require('hypercore')
const hyperdiscovery = require('hyperdiscovery')
const feed = hypercore('./ticker-data', {valueEncoding: 'json'})
feed.once('ready', () => console.log(feed.key.toString('hex')))
feed.once('ready', () => hyperdiscovery(feed))


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
  return feed.append(ticker.toJS())

})

ws.open()