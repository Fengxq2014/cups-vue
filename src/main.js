import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routerConfig from './routers'
import store from '../vuex/store'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'material-design-icons/iconfont/material-icons.css'
import cookie from 'tiny-cookie'

/* eslint-disable no-new */
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Element)

// const Foo = { template: login }

const router = new VueRouter({routes: routerConfig})

router.beforeEach((to, form, next) => {
  if (cookie.get('login') === null && to.name !== 'login') {
    next('/login')
  } else {
    next()
  }
})

new Vue({
  router,
  el: '#app',
  store,
  render: h => h(App)
})
