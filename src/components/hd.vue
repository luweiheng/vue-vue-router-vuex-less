<template>
  	<div id="hd">
  		<i class="ion-navicon-round" @click="_pannel()"></i>
  		<span class="title">{{title}}</span>
  		<i class="ion-refresh" @click="_reload()"></i>
  		<div class="opa">
  			<div class="opa-left"></div>
  		</div>
  	</div>
</template>

<script>
	import Vue from 'vue'
	
	export default {
	  	components: {
	    
	  	},
	  	data () {
		  	return{
		  		title: ''
		  	}
	  	},
		methods:{
			_pannel () {
				
			},
			_reload () {
				window.location.reload()
			}
		},
		mounted () {
		  	this.title = window.location.hash.slice(2)
		}
	}
</script>
<style lang="less">
	@import '../less/hd.less';
</style>

