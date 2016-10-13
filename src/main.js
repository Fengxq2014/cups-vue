import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routerConfig from './routers'
import store from '../vuex/store'
import VueEditable from './vue-editable.js'
import 'keen-ui/dist/keen-ui.css'
import 'material-design-icons/iconfont/material-icons.css'

/* eslint-disable no-new */
Vue.use(VueEditable)
Vue.use(VueRouter)
Vue.use(VueResource)

// const Foo = { template: login }

const router = new VueRouter({routes: routerConfig})
new Vue({
  router,
  el: '#app',
  store,
  render: h => h(App)
})
