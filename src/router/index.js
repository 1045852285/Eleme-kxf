import Vue from 'vue'
import Router from 'vue-router'
import goods from '../components/comment/goods/goods.vue'
import ratings from '../components/comment/ratings/ratings.vue'
import seller from '../components/comment/seller/seller.vue'
import shangpinxiangqing from '../components/comment/shangpinxiangqing/shangpinxiangqing.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/seller'
    },
    {
      path: '/seller',
      name: 'seller',
      component: seller
    },
    {
      path: '/goods',
      name: 'goods',
      component: goods

    },
    {
      path: '/ratings',
      name: 'ratings',
      component: ratings
    }
    ,
    {
      path: '/seller/shangpinxiangqing',
      name:'shangpinxiangqing',
      component: shangpinxiangqing
    }
    ,
    {
      path: '*',
      redirect: '/seller'
    }
  ]
})
