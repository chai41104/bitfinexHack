<template>
  <div class="crypto-list">
    <h1>Trades</h1>
    Legend: 
    <table>
      <tr>
        <td>Healthy</td>
        <td style="background-color: green"></td>

        <td>moderate</td>
        <td style="background-color: orange"></td>

        <td>Unhealthy</td>
        <td style="background-color: red"></td>
      </tr>
    </table>

    <hr>
    <hr>
    n
    <table>
      <thead>
        <tr>
          <th>Symbol</th>
          <th>HEALTH</th>
          <th>Bid</th>
          <th>Bid Size</th>
          <th>Ask</th>
          <th>Ask Size</th>
          <th>Daily Change Percision</th>
          <th>Last Price</th>
          <th>Volume</th>
          <th>High</th>
          <th>Low</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ticker, symbol) in tickers">
          <td>{{symbol}}</td>
          <td ref="color" :style="{backgroundColor: getColorFromHealth(ticker.health)}">
            {{ticker.health}}
          </td>

          <td ref="bid">
               {{ticker.bid}}
          </td>
          <td ref="bidSize">{{ticker.bidSize}}</td>
          <td ref="ask">{{ticker.ask}}</td>
          <td ref="askSize">{{ticker.askSize}}</td>
          <td ref="dailyChangePerc">{{ticker.dailyChangePerc}}</td>
          <td ref="lastPrice">{{ticker.lastPrice}}</td>
          <td ref="volume">{{ticker.volume}}</td>
          <td ref="high">{{ticker.high}}</td>
          <td ref="low">{{ticker.low}}</td>
        </tr>
      </tbody>  
    </table>
  </div>

</template>

<script>
// const BFX = require('bitfinex-api-node')
import axios from 'axios'


export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      entries: [],
      tickers: require('./initialTickers.json'),
      oldTickers: null

    }
  },
  mounted () {
    this.loadHealths()
    this.oldTickers = JSON.parse(JSON.stringify(this.tickers))

    // window.setTimeout(() => {
    //   this.tickers["btcusd"].bid = 1111
    // }, 1000)

    window.setInterval(() => {
      axios.get('http://localhost:3000/data', 'get').then(res => {
        console.log(res.data)
        for (var i=0; i<res.data.length; i++) {
          let symbol = res.data[i].symbol
          this.tickers[symbol] = res.data[i]
        }
      })
    }, 1500)
  },
  computed: {
    symbols () {
      var res = []
      for (var k in this.tickers) {
        res.push(k)
      }
      return res
    }
  },
  watch: {
    tickers: {
      handler (newValue, oldValue) {
        // console.log(newValue)
        
        for (var i=0; i<this.symbols.length; i++) {

          // TweenLite.to(this.$data.tickers[k], 50, {bid: newValue[k].bid})
          // console.log(this.$refs.bid[0])
          // alert(this.tickers[this.symbols[i]].bid, newValue[this.symbols[i]])
          this.animateElement(i, "bid")
          // this.animateElement(i, "bidPeriod")
          this.animateElement(i,"bidSize")
          this.animateElement(i,"ask")
          // this.animateElement(i,"askPeriod")
          this.animateElement(i,"askSize")
          this.animateElement(i,"dailyChangePerc")
          this.animateElement(i,"lastPrice")
          this.animateElement(i,"volume")
          this.animateElement(i,"high")
          this.animateElement(i,"low")

          // console.log(this.tickers[this.symbols[i]].bid, this.oldTickers[this.symbols[i]].bid)
        }
        this.oldTickers = JSON.parse(JSON.stringify(this.tickers))

        // reload health data
        this.loadHealths()
      } ,
      deep: true
    }
  },
  methods: {
    loadHealths () {
      let healths = require('./health.json')
      for (var i=0; i<this.symbols.length; i++) {
        let symb = this.symbols[i].substr(1)
        console.log(symb)
        console.log(healths[symb])
        if (healths[symb]) {
          this.tickers[this.symbols[i]].health = healths[symb].medianpc
        }
      }
    },
    animateElement (i, keyValue) {
          // console.log(this.symbols[i], i, keyValue)
          let refObj = this.$refs[keyValue][i]
          if ( this.tickers[this.symbols[i]][keyValue] !== this.oldTickers[this.symbols[i]][keyValue] ) {
            TweenLite.to(refObj, 0.3, {
              backgroundColor:"#aaa",
              color:"red",
              onComplete: () => {
                TweenLite.to(refObj, 0.3, {backgroundColor: "white", color: "black"})
              }
            })
          }
    },
    getColorFromHealth (healthvalue) {
      let x = 0.2478
      let y = 0.5411
      if (healthvalue < x) {
        return 'green'
      }
      if (healthvalue >= x && healthvalue < y) {
        return 'orange'
      }
      if (!healthvalue) {
        return 'white'
      }
      return 'red'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

</style>
