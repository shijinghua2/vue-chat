// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router'
import messageUI from './components/message';
import Api from './api/index';

Vue.use(VueRouter)
const router = new VueRouter({
	routes
})

Vue.config.productionTip = false;
Vue.prototype.$message = messageUI;
Vue.prototype.$api = Api;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
