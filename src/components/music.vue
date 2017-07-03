<template>
  	<div id="music">
  		<hd :tit = "tit"></hd>
  		<ul class="m-list">
  			<li class="list-item" v-for = "(item,index) in list" @click="_toDetail(item.id)">
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
  				<span class="detail ion-play"></span>
  			</li>
  		</ul>
  		<div class="weui-loadmore">
  			<!-- <span class="weui-loadmore__tips">已加载全部</span> -->
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
			_toDetail (id) {
				window.location.href += '/detail?' + id
			}
		},
		mounted () {
			
		  	// this.$http.get('../static/php/music.php')
		  	this.$http.get('/api/playlist/detail?id=325515019')
		  	.then(function(res){
		  		// console.log(res.data.result)
		  		// res.data = JSON.parse(res.data)
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

