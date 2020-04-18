import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/login',
      component: resolve => require(['@/views/login/index.vue'], resolve),
    },
    {
      path: '/',
      component: resolve => require(['@/views/layout/App.vue'], resolve),
      meta: {
        title: '首页',
        keepAlive: false, // 不需要缓存
      },
      children: [{
          path: '/',
          name: 'Dashboard',
          meta: {
            title: '首页',
            keepAlive: true // 需要被缓存
          },
          component: resolve => require(['@/views/home/Index.vue'], resolve),
        },
        {
          path: '/charts_line',
          name: 'Line',
          meta: {
            title: '折线图',
            keepAlive: false
          },
          component: resolve => require(['@/views/charts/Line.vue'], resolve),
        },
        {
          path: '/charts_bar',
          name: 'Bar',
          meta: {
            title: '柱状图',
            keepAlive: false
          },
          component: resolve => require(['@/views/charts/Bar.vue'], resolve),
        },
        {
          path: '/font_awesome',
          name: 'FontAwesome',
          meta: {
            title: 'FontAwesome 图标',
            keepAlive: false
          },
          component: resolve => require(['@/views/icon/FontAwesome.vue'], resolve),
        },
        {
          path: '/element_icon',
          name: 'ElementIcon',
          meta: {
            title: 'Element 图标',
            keepAlive: false
          },
          component: resolve => require(['@/views/icon/ElementIcon.vue'], resolve),
        },
        {
          path: '/map_baidu',
          name: 'Baidu',
          meta: {
            title: '百度地图',
            keepAlive: false
          },
          component: resolve => require(['@/views/map/Baidu.vue'], resolve),
        },
        {
          path: '/product_manage',
          name: 'product',
          meta: {
            title: '商品列表管理',
            keepAlive: false
          },
          component: resolve => require(['@/views/tableManage/tableManage.vue'], resolve),
        },
        {
          path: '/product_member',
          name: 'member',
          meta: {
            title: '商品购买管理',
            keepAlive: false
          },
          component: resolve => require(['@/views/userManage/userManage.vue'], resolve),
        }

      ]
    }
  ]
})
