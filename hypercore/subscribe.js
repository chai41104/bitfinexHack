const hypercore = require('hypercore')
const swarm = require('hyperdiscovery')
const ram = require('random-access-memory')

const feed = hypercore(ram, 'b00bc8b18ab520c2543723fd3e2c211dab227355050f312a4e18ad1f1ca440cf', {valueEncoding: 'json'})

feed.createReadStream({live: true}).on('data', console.log)

feed.ready(_ => swarm(feed))

