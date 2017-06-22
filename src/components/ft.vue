<template>
  	<div id="ft">
  		<ul>
  			<li @click="_href('mv')">电影</li>
  			<li @click="_href('music')">音乐</li>
  			<li @click="_href('book')">书籍</li>
  		</ul>
  	</div>
</template>

<script>
	import Vue from 'vue'
	
	export default {
	  	components: {
	    
	  	},
	  	data () {
		  	return{
		  		
		  	}
	  	
	  	},
		methods:{
			_href (u) {
				window.location.href = "./#/" + u
			}
		},
		mounted () {
		  	
		}
	}
</script>
<style lang="less">
	@import '../less/ft.less';
</style>

