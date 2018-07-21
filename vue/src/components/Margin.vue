<template>
  <div class="crypto-list">
    <h1>- Margins</h1>
    <table>
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Bid</th>
          <th>Bid Period</th>
          <th>Bid Size</th>
          <th>Ask</th>
          <th>Ask Period</th>
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

          <td ref="bid">
               {{ticker.bid}}
          </td>
          <td ref="bidPeriod">{{ticker.bidPeriod}}</td>
          <td ref="bidSize">{{ticker.bidSize}}</td>
          <td ref="ask">{{ticker.ask}}</td>
          <td ref="askPeriod">{{ticker.askPeriod}}</td>
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
      tickers: require('./initialMarginTickers.json'),
      oldTickers: null

    }
  },
  mounted () {

    if (localStorage.getItem('marginTickers')) {
        this.tickers = localStorage.getItem('marginTickers')
    }

    this.oldTickers = JSON.parse(JSON.stringify(this.tickers))

    // window.setTimeout(() => {
    //   this.tickers["btcusd"].bid = 1111
    // }, 1000)

    window.setInterval(() => {
      axios.get('http://localhost:8888', 'get').then(res => {
        console.log(res.data)
        for (var i=0; i<res.data.length; i++) {
          let symbol = res.data[i].symbol
          this.tickers[symbol] = res.data[i]
          localStorage.setItem('margintickers', this.tickers) 

        }
      })
    }, 3000)
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
        console.log(newValue)
        
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

          console.log(this.tickers[this.symbols[i]].bid, this.oldTickers[this.symbols[i]].bid)
        }
        this.oldTickers = JSON.parse(JSON.stringify(this.tickers))
      } ,
      deep: true
    }
  },
  methods: {
    animateElement (i, keyValue) {
          let refObj = this.$refs[keyValue][i]
          if ( this.tickers[this.symbols[i]][keyValue] !== this.oldTickers[this.symbols[i]][keyValue] ) {
            TweenLite.to(refObj, 1, {
              backgroundColor:"#aaa", 
              color:"red",
              onComplete: () => {
                TweenLite.to(refObj, 2, {backgroundColor: "white", color: "black"})
              }
            })
          }
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
