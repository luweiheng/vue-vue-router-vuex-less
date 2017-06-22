// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '../components/mv_total'

Vue.config.productionTip = false
	import VueRouter from 'vue-router'
	Vue.use(VueRouter) 
	const router = new VueRouter({
  		routes: [
  			{ 
  				path: '/', 
  				redirect: '/mv_hot' 
  			},
  			{
  				path: '/mv',
  				component: require('../components/mv_hot.vue')
  			},
  			{
  				path: '/mv_hot',
  				component: require('../components/mv_hot.vue')
  			},
			{
				path: '/mv_coming', 
				component: require('../components/mv_coming.vue')
			},
			{
				path: '/music', 
				component: require('../components/music.vue')
			},
			{
				path: '/book', 
				component: require('../components/book.vue')
			}
		]
	})

/* eslint-disable no-new */
const app = new Vue({  
    router: router,  
    render: h => h(App)  
}).$mount('#app')  
