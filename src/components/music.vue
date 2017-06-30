<template>
  	<div id="music">
  		<hd :tit = "tit"></hd>
  		<ul class="m-list">
  			<li class="list-item" v-for = "(item,index) in list">
  				<img class="pic" :src="item.album.blurPicUrl ? item.album.blurPicUrl : item.album.picUrl">
  				<div class="desc">
  					<p class="title" @click="_searchSinger($event)">{{item.name}}</p>
  					<p class="oth">
  						<span class="genres">
  							专辑 : {{item.album.name}}
  						</span>
  					</p>
  				</div>
  				<div class="singer">{{item.artists[0].name}}</div>
  				<span class="detail ion-play" @click="_play(index)"></span>
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

	import VueResource from 'vue-resource'
	Vue.use(VueResource)

	export default {
	  	name: 'app',
	  	components: {
	    	hd
	  	},
	  	data () {
		  	return{
		  		tit: 'music',
		  		start: 3,
		  		data: [],
		  		list: []
		  	}
	  	
	  	},
		methods:{
			_play (n) {
				console.log(this.list[n].id)
				// window.location.href = '/m/song/' + this.list[n].id + '?autoplay=true'
			},
			_searchSinger (e) {
				var key = e.target.innerHTML
				this.$http.get('/search/get?id=454561808&s=' + key + '&type=1')
				.then(function(res){
					console.log(res.data)
					this.list = res.data.result.songs
				},function(err){
					console.log(err)
				})
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
			  		me.start += 10
			    	for(var i = me.start; i < me.start + 10; i++){
			    		me.list.push(me.data[i])
			    	}
			    	loading = false;
			  	}, 1000);   //模拟延迟
			});
		  	this.$http.get('../static/php/music.php')
		  	.then(function(res){
		  		// console.log(res.data.result)
		  		res.data = JSON.parse(res.data)
		  		this.data = res.data.result.tracks
		  		for(var i = 3; i < 13; i++){
		  			this.list.push(this.data[i])
		  		}
		  	},function(err){
		  		console.log(err)
		  	})
		}
	}
</script>
<style lang="less">
	@import '../less/music.less';
</style>

