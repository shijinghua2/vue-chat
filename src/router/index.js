
import App from '../App'
export default [{
  path: '/',
  component: App,
  children: [{
      name: 'home',
      path: '',
      component: r => require.ensure([], () => r(require('../views/home')), 'home')
  }, {
      name: 'item',
      path: '/item',
      component: r => require.ensure([], () => r(require('../views/chat')), 'item')
  }]
}]