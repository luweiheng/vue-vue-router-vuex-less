<template>
  	<div id="mv_hot">
  		<ul class="mv-list">
  			<li class="list-item" v-for = "(item,index) in list">
  				<img class="pic" :src="item.images.small">
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
  		<div class="weui-loadmore">
  			<i class="weui-loading"></i>
  			<span class="weui-loadmore__tips">正在加载</span>
		</div>
  	</div>
</template>

<script>
	import Vue from 'vue'
	import VueAwesomeSwiper from 'vue-awesome-swiper'
	Vue.use(VueAwesomeSwiper)
	// if (process.BROWSER_BUILD) {
	//   const VueAwesomeSwiper = require('vue-awesome-swiper/ssr')
	//   Vue.use(VueAwesomeSwiper)
	// }
	import { swiper, swiperSlide } from 'vue-awesome-swiper'

	import VueResource from 'vue-resource'
	Vue.use(VueResource)

	export default {
	  	name: 'app',
	  	components: {
	    	
	  	},
	  	data () {
		  	return{
		  		start: 0,
		  		list: []
		  	}
	  	
	  	},
		methods:{

		},
		mounted () {
			var me =this
			$(function() {
			    	FastClick.attach(document.body);
			});
			var loading = false;  //状态标记
			$(document.body).infinite().on("infinite", function() {
			  	if(loading) return;
			  	loading = true;
			  	setTimeout(function() {
			  		me.start += 10
			    	me.$http.get('/v2/movie/in_theaters?count=10&start=' + me.start)
		  			.then(function(res){
		  			console.log(res.data)
		  			this.list = this.list.concat(res.data.subjects)
		  			},function(err){
		  				console.log(err)
		  			})
			    	loading = false;
			  	}, 1000);   //模拟延迟
			});
		  	this.$http.get('/v2/movie/in_theaters?count=10&start=' + this.start)
		  	.then(function(res){
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

