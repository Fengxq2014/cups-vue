export default [{
  path: '/',
  name: 'index',
  showMenu: true,
  component: require('./views/index')
}, {
  path: '/login',
  name: 'login',
  component: require('./views/login')
}, {
  path: '/user',
  name: 'user',
  component: require('./components/userList')
}
]
