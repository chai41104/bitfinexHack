import Vuex from 'vuex'

const store = new Vuex.Store({
    state: {
      margins: require('../components/initialMarginTickers.json')
    },
    mutations: {
      storeTrades (state, payload) {
      }
    }
  })