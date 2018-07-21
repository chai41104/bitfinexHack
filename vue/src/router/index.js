import Vue from 'vue'
import Router from 'vue-router'
import Trade from '@/components/Trade'
import Margin from '@/components/Margin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Trade',
      component: Trade
    },
    {
      path: '/margin',
      name: 'Margin',
      component: Margin
    }
  ]
})
