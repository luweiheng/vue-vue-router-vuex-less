<template>
  	<div id="book">
  		<hd :tit = "tit"></hd>
  		<div class="banner">
  			<swiper :options="swiperOption" ref="mySwiper">
		    <!-- slides -->
		    <swiper-slide>
				<img src="../assets/lunyu.jpg" height="250" width="100%">
		    </swiper-slide>
		    <swiper-slide>
				<img src="../assets/mengzi.jpg" height="250" width="100%">
		    </swiper-slide>
		    <!-- Optional controls -->
		    <div class="swiper-pagination"  slot="pagination"></div>
		    <div class="swiper-button-prev" slot="button-prev"></div>
		    <div class="swiper-button-next" slot="button-next"></div>
		</swiper>
  		</div>
  		<ul class="m-list">
  			<li class="list-item" v-for = "(item,index) in myList">
  				<div class="author_detail">
  					<p>{{item.book.author_intro}}</p>
  				</div>
  				<img class="pic" :src="item.book.image" @click="_bk_detail(item.book_id)">
  				<div class="desc">
  					<p>作者：<span class="author" @click="_author(index)">{{item.book.author[0]}}<span class="ion ion-chevron-down"></span></span></p>
  					<p>页数：{{item.book.pages}}</p>
  					<p>
  						标签：
  						<span class="tag" v-for = "(itemTag, indexTag) in item.tags">{{itemTag}}</span>
  					</p>
  					<p>出版社：{{item.book.publisher}}</p>
  					<div class="cart-box">
  						<p class="add-cart" @click="_addCart(index)">
  							<span class="ion-android-cart"></span>
  							<span>加入购物车</span>
  						</p>
  					</div>	
  				</div>
  			</li>
  		</ul>
  		
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
	  	name: 'app',
	  	components: {
	    	hd
	  	},
	  	data () {
		  	return{
		  		tit: 'book',
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
			_bk_detail (id) {
				console.log(id)
			},
			_author (t) {
				if ($('.author_detail')[t].className.match('active')) {
					$('.author_detail')[t].className = 'author_detail'
					$('.ion')[t].className = 'ion ion-chevron-down'
				}
				else{
					$('.author_detail')[t].className = 'author_detail active'
					$('.ion')[t].className = 'ion ion-chevron-up'
				}
			},
			_addCart (t) {
				alert('《' + this.myList[t].book.title + '》成功加入购物车！' )
			}

		},
		mounted () {
			var me =this
			$(function() {
			    	FastClick.attach(document.body);
			});
		  	// this.$http.get('../static/php/book.php')
		  	this.$http.get('/v2/book/user/162858873/collections')
		  	.then(function(res){
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

