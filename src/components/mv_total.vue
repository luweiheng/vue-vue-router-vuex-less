<template>
  	<div id="app">
  		<hd></hd>
  		<div class="mv_content">
  			<div class="mv_menu">
  				<router-link to="/mv_hot" class="router">正在热映</router-link>
				<router-link to="/mv_coming" class="router">即将上映</router-link>
  			</div>
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
	@import '../less/mv_total.less';
</style>

