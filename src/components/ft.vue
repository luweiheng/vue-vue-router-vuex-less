<template>
  	<div id="ft">
  		<router-link to="/mv" class="router" :class="menuNum == 1 ? 'active' : ''" @click.native="_menuNum(1)"><span>电影</span></router-link>
		<router-link to="/music" class="router" :class="menuNum == 2 ? 'active' : ''" @click.native="_menuNum(2)"><span>音乐</span></router-link>
		<router-link to="/book" class="router" :class="menuNum == 3 ? 'active' : ''" @click.native="_menuNum(3)"><span>书籍</span></router-link>
  	</div>
</template>

<script>
	import Vue from 'vue'
	
	export default {
	  	components: {
	    
	  	},
	  	data () {
		  	return{
		  		menuNum: ''
		  	}
	  	
	  	},
		methods:{
			_menuNum (t) {
				this.menuNum = t
			}
		},
		mounted () {
		  	let url = window.location.href
		  	if(url.match('movie') || url.match('mv')){
		  		this.menuNum = 1
		  	}
		  	else if (url.match('music')){
		  		this.menuNum = 2
		  	}
		  	else{
		  		this.menuNum = 3
		  	}
		}
	}
</script>
<style lang="less">
	@import '../less/ft.less';
</style>

