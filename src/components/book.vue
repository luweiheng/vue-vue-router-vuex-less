<template>
  	<div id="book">
  		<div class="banner">
  			<swiper :options="swiperOption" ref="mySwiper">
		    <!-- slides -->
		    <swiper-slide>
				<img src="../assets/lunyu.jpg" height="310" width="100%">
		    </swiper-slide>
		    <swiper-slide>
				<img src="../assets/mengzi.jpg" height="310" width="100%">
		    </swiper-slide>
		    <!-- Optional controls -->
		    <div class="swiper-pagination"  slot="pagination"></div>
		    <div class="swiper-button-prev" slot="button-prev"></div>
		    <div class="swiper-button-next" slot="button-next"></div>
		</swiper>
  		</div>
  		<ul class="m-list">
  			<li class="list-item" v-for = "(item,index) in myList">
  				<img class="pic" :src="item.book.image">
  				<div class="desc">
  					<p>作者：{{item.book.author[0]}}</p>
  					<p>页数：{{item.book.pages}}</p>
  					<p>
  						标签：
  						<span class="tag" v-for = "(itemTag, indexTag) in item.tags">{{itemTag}}</span>
  					</p>
  					<p>出版社：{{item.book.publisher}}</p>
  					<div class="cart-box">
  						<p class="add-cart">
  							<span class="ion-android-cart"></span>
  							<span>加入购物车</span>
  						</p>
  					</div>
  					
  				</div>
  				<!-- <span class="detail ion-eye"></span> -->
  			</li>
  		</ul>
  		
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
		  		swiperOption: {
		          	pagination: '.swiper-pagination',
		          	nextButton: '.swiper-button-next',
		          	prevButton: '.swiper-button-prev',
		          	autoplay: 2000,
		          	speed:800,
		          	slidesPerView: 1,
		          	paginationClickable: true,
		          	spaceBetween: 30,
		          	loop: true
		        },
		  		myList: []
		  	}
	  	
	  	},
		methods:{

		},
		mounted () {
			var me =this
			$(function() {
			    	FastClick.attach(document.body);
			});
		  	this.$http.get('/v2/book/user/162858873/collections')
		  	.then(function(res){
		  		console.log(res.data)
		  		this.myList = res.data.collections
		  	},function(err){
		  		console.log(err)
		  	})
		}
	}
</script>
<style lang="less">
	@import '../less/book.less';
</style>

