import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routerConfig from './routers'

/* eslint-disable no-new */
Vue.use(VueRouter)
Vue.use(VueResource)

// const Foo = { template: login }

const router = new VueRouter({routes: routerConfig})
new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
