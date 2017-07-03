// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '../components/App'

Vue.config.productionTip = false
import VueRouter from 'vue-router'
Vue.use(VueRouter) 
const router = new VueRouter({
		routes: [
			{ 
				path: '/', 
				redirect: '/mv' 
			},
			{
				path: '/mv',
				component: require('../components/mv.vue')
			},
			{
				path: '/mv/detail',
				component: require('../components/mv_detail.vue')
			},
			{
				path: '/music', 
				component: require('../components/music.vue')
			},
			{
				path: '/music/detail',
				component: require('../components/music_detail.vue')
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
