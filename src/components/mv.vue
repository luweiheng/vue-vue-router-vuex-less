<template>
  	<div id="mv_hot">
  		<hd :tit = "tit"></hd>
  		<ul class="mv_menu">
  			<li :class="menuNum == 1 ? 'active' : ''" @click="_mvMenu(1)"><span>正在上映</span></li>
  			<li :class="menuNum == 2 ? 'active' : ''" @click="_mvMenu(2)"><span>即将上映</span></li>
  		</ul>
  		<ul class="mv-list">
  			<li class="list-item" v-for = "(item,index) in list" @click="_mv_detail(item.id)">
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

	import hd from './hd.vue'

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
	  	// props: {
	  	// 	tit: this.tit
	  	// },
	  	components: {
	    	hd
	  	},
	  	data () {
		  	return{
		  		tit: 'movie',
		  		menuNum: 1,
		  		hot_start: 0,
		  		coming_start: 0,
		  		hot_list: [],
		  		coming_list: [],
		  		list: []
		  	}
	  	
	  	},
		methods:{
			_mvMenu (t) {
				if (this.menuNum != t) {
					document.body.scrollTop = 0
				}
				this.menuNum = t
				if (t == 1) {
					this.list = this.hot_list
				}
				else {
					if (!this.coming_list.length) {
						this.$http.get('../static/php/mv_comming.php?count=10&start=0')
			  			.then(function(res){
			  				res.data = JSON.parse(res.data)
			  				console.log(res.data)
			  				this.coming_list = res.data.subjects
			  			},function(err){
			  				console.log(err)
			  			})
					}
					this.list = this.coming_list
				}
			},
			_mv_detail (id) {
				console.log(id)
				window.location.href += '/detail?' + id
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
			  			urlData = 'mv_hot'
			  		}
			  		else{
			  			me.coming_start += 10
			  			start = me.coming_start
			  			urlData = 'mv_comming'
			  		}
			    	me.$http.get('../static/php/'+urlData+'.php?count=10&start=' + start)
		  			.then(function(res){
		  				res.data = JSON.parse(res.data)
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
		  	// this.$http.get('/v2/movie/in_theaters?count=10&start=' + this.hot_start)
		  	this.$http.get('../static/php/mv_hot.php?count=10&start=' + this.hot_start)
		  	.then(function(res){
		  		res.data = JSON.parse(res.data)
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

