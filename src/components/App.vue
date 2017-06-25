<template>
  	<div id="app">
  		<hd></hd>
  		<div class="mv_content">
  			<router-view></router-view>
  		</div>
  		<ft></ft>
  	</div>
</template>

<script>
	import Vue from 'vue'
	import hd from './hd.vue'
	import ft from './ft.vue'
	export default {
	  	components: {
	    	hd,
	    	ft
	  	},
	  	data () {
		  	return{
		  		
		  	}
	  	
	  	},
		methods:{

		},
		mounted () {
			
		}
	}
</script>
<style lang="less">
	@import '../less/app.less';
</style>

