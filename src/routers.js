export default [{
  path: '/',
  name: 'index',
  component: require('./components/List')
}, {
  path: '/login',
  name: 'login',
  component: require('./views/login')
}, {
  path: '/user',
  name: 'user',
  component: require('./components/userList')
}, {
  path: '/card',
  name: 'card',
  component: require('./components/List')
}, {
  path: '/trans',
  name: 'trans',
  component: require('./components/transList')
}
]
