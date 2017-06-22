<template>
  	<div id="mv_coming">
  		<ul class="mv-list">
  			<li class="list-item" v-for = "(item,index) in list">
  				<img class="pic" v-bind:src="item.images.small">
  				<div class="desc">
  					<p class="title">{{item.title}}</p>
  					<p class="oth">
  						<span class="genres" v-for = "(itemg,indexg) in item.genres">
  							{{itemg}}
  						</span>
  						<span class="average">(评分:{{item.rating.average}})</span>
  					</p>
  				</div>
  				<span class="detail ion-eye"></span>
  			</li>
  		</ul>
  	</div>
</template>

<script>
	import Vue from 'vue'
	// import VueAwesomeSwiper from 'vue-awesome-swiper'
	// Vue.use(VueAwesomeSwiper)
	// // if (process.BROWSER_BUILD) {
	// //   const VueAwesomeSwiper = require('vue-awesome-swiper/ssr')
	// //   Vue.use(VueAwesomeSwiper)
	// // }
	// import { swiper, swiperSlide } from 'vue-awesome-swiper'

	// import Vuwe from 'vuwe'
	// Vue.use(Vuwe)

	import VueResource from 'vue-resource'
	Vue.use(VueResource)

	export default {
	  	name: 'app',
	  	components: {
	    	
	  	},
	  	data () {
		  	return{
		  		list: []
		  	}
	  	
	  	},
		methods:{

		},
		mounted () {
		  	this.$http.jsonp('https://api.douban.com/v2/movie/coming_soon?count=10&start=0')
		  	.then(function(res){
		  		console.log(res.data)
		  		this.list = res.data.subjects
		  	},function(err){
		  		console.log(err)
		  	})
		}
	}
</script>
<style lang="less">
	@import '../less/mv_hot.less';
</style>

