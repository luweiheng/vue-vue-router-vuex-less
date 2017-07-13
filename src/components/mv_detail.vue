<template>
  	<div id="detail">
  		<div class="header">
  			<span class="ion ion-chevron-left" @click="_back()"></span>
  			<div class="title">
  				<h3>{{title}}</h3>
  			</div>
  		</div>
  		<div class="detail">
	  		<img class="img" :src="imgUrl">
	  		<h3 class="tit">{{title}}</h3>
	  		<p class="ava">导演 : {{ava}}</p>
	  		<div class="tag">标签 : <span v-for="(item,index) in tags">{{item}}/</span></div>
	  		<p class="desc">{{desc}}</p>
  		</div>
  	</div>
</template>

<script>
	import Vue from 'vue'

	import VueResource from 'vue-resource'
	Vue.use(VueResource)

	export default {
	  	components: {
	    	
	  	},
	  	data () {
		  	return{
		  		imgUrl: '',
		  		title: '',
		  		ava: '',
		  		tags: [],
		  		desc: ''
		  	}
	  	
	  	},
		methods:{
			_back () {
				window.history.go(-1)
			}
		},
		mounted () {
			var me =this
			$(function() {
			    FastClick.attach(document.body);
			});
			let url = window.location.href
			let id = url.slice(url.lastIndexOf('detail')+7)
		  	this.$http.get('../static/php/mv_detail.php?id=' + id)
		  	// this.$http.get('/v2/movie/subject/' + id)
		  	.then(function(res){
		  		console.log(res.data)
		  		this.imgUrl = res.data.images.large
		  		this.title = res.data.title
		  		this.ava = res.data.directors[0].name
		  		this.tags = res.data.genres
		  		this.desc = res.data.summary
		  	},function(err){
		  		console.log(err)
		  	})
		}
	}
</script>
<style lang="less">
	@import '../less/mv_detail.less';
</style>

