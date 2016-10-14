import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routerConfig from './routers'
import store from '../vuex/store'
import VueEditable from './vue-editable.js'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'material-design-icons/iconfont/material-icons.css'

/* eslint-disable no-new */
Vue.use(VueEditable)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Element)

// const Foo = { template: login }

const router = new VueRouter({routes: routerConfig})
new Vue({
  router,
  el: '#app',
  store,
  render: h => h(App)
})
