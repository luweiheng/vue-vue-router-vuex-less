<template>
  	<div id="mv_hot">
  		<ul class="mv_menu">
  			<li @click="_mvMenu(1)">正在上映</li>
  			<li @click="_mvMenu(2)">即将上映</li>
  		</ul>
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
		  		menuNum: 1,
		  		hot_start: 0,
		  		coming_start: 0,
		  		hot_list: [],
		  		coming_list: [],
		  		list: []
		  	}
	  	
	  	},
		methods:{
			// 
			_mvMenu (t) {
				this.menuNum = t
				if (t == 1) {
					this.list = this.hot_list
				}
				else {
					if (!this.coming_list.length) {
						this.$http.get('/v2/movie/coming_soon?count=10&start=0')
			  			.then(function(res){
			  			console.log(res.data)
			  			this.coming_list = res.data.subjects
			  			this.list = this.coming_list
			  			},function(err){
			  				console.log(err)
			  			})
					}
					this.list = this.coming_list
				}
			}
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
			  		var start,urlData
			  		if (me.menuNum == 1) {
			  			me.hot_start += 10
			  			start = me.hot_start
			  			urlData = 'in_theaters'
			  		}
			  		else{
			  			me.coming_start += 10
			  			start = me.coming_start
			  			urlData = 'coming_soon'
			  		}
			    	me.$http.get('/v2/movie/' + urlData + '?count=10&start=' + start)
		  			.then(function(res){
		  				if (me.menuNum == 1) {
		  					me.hot_list = me.hot_list.concat(res.data.subjects)
		  					this.list = me.hot_list
		  				}
		  				else {
		  					me.coming_list = me.coming_list.concat(res.data.subjects)
		  					this.list = me.coming_list
		  				}
		  			},function(err){
		  				console.log(err)
		  			})
			    	loading = false;
			  	}, 1000);   
			});
		  	this.$http.get('/v2/movie/in_theaters?count=10&start=' + this.hot_start)
		  	.then(function(res){
		  		this.hot_list = res.data.subjects
		  		this.list = this.hot_list
		  	},function(err){
		  		console.log(err)
		  	})
		}
	}
</script>
<style lang="less">
	@import '../less/mv.less';
</style>

