<template>
  	<div id="hd">
  		<i class="ion-navicon-round" @click="_pannel()"></i>
  		<span class="title">{{tit}}</span>
  		<i class="ion-refresh" @click="_reload()"></i>
  		<div class="opa" :class="opa ? 'active' : ''">
  			<div class="opa-left">
  				<img src="https://img3.doubanio.com\/icon\/up162858873-2.jpg" width="140">
  				<ul>
  					<li>梁呈</li>
  					<li>1993/09/05</li>
  					<li>韶关学院</li>
  					<li>本科</li>
  					<li>QQ : 1101126974</li>
  				</ul>
  			</div>
  			<div class="opa-right" @click="_closeOpa()"></div>
  		</div>
  	</div>
</template>

<script>
	import Vue from 'vue'
	
	export default {
		props: [
			'tit'
		],
	  	components: {
	    
	  	},
	  	data () {
		  	return{
		  		opa: false
		  	}
	  	},
		methods:{
			_pannel () {
				this.opa = true
			},
			_closeOpa () {
				this.opa = false
			},
			_reload () {
				window.location.reload()
			}
		},
		mounted () {
		  	
		}
	}
</script>
<style lang="less">
	@import '../less/hd.less';
</style>

