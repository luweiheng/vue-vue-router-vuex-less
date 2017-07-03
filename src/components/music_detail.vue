<template>
  	<div id="detail">
  		<div class="header">
  			<span class="ion ion-chevron-left" @click="_back()"></span>
  			<div class="title">
  				<h3>title</h3>
  			</div>
  		</div>
  		<div class="detail">
  			<!-- <audio autoplay="autoplay" :src="playing.url"></audio> -->
	  		<img class="img" :src="playing.img">
	  		<h3 class="tit">{{playing.title}}</h3>
	  		<p class="author">{{playing.author}}</p>
	  		<div class="menu">
	  			<span :class="playMd[playMdNum]" @click="_playMd()"></span>
	  			<span class="ion-skip-backward"></span>
	  			<span :class="play ? 'ion-pause' : 'ion-play'" @click="_play()"></span>
	  			<span class="ion-skip-forward"></span>
	  			<span class="ion-navicon"></span>
	  		</div>
	  		<div class="jindu">
	  			<span class="ing">{{time_ing2}}</span>
	  			<div class="out">
	  				<div class="in"></div>
	  			</div>
	  			<span class="time">{{playing.time}}</span>
	  		</div>
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
		  		list: [
		  			{
		  				url: 'http://m10.music.126.net/20170703182434/9da6970e06379d184270c98764f72f15/ymusic/b1c4/b5de/74d0/9158ae4873e10b743790320db9ef9b29.mp3',
		  				img: 'http://p1.music.126.net/QHw-RuMwfQkmgtiyRpGs0Q==/102254581395219.jpg?param=180y180',
		  				title: '海阔天空',
		  				author: 'beyond',
		  				time: '05:26',
		  				time2: '326'
		  			},
		  			{
		  				url: 'http://m10.music.126.net/20170703182204/f73add01492be1c101a86f3705ad186c/ymusic/ce70/d44c/021f/31d3215f707625a65663ab51858d6a86.mp3',
		  				img: 'http://p3.music.126.net/C6txAWMGlVmAcAD37RVutQ==/122045790684028.jpg?param=180y180',
		  				title: '蓝莲花',
		  				author: '许巍',
		  				time: '04:30',
		  				time2: '270'
		  			},
		  			{
		  				url:'http://m10.music.126.net/20170703180014/dcd2f1eed5f032ded13030adc19c6e0e/ymusic/3dee/604d/06d0/f182b7fe5394a75125c17a867829cdf7.mp3',
		  				img: 'http://p1.music.126.net/QHw-RuMwfQkmgtiyRpGs0Q==/102254581395219.jpg?param=180y180',
		  				title: '光辉岁月',
		  				author: 'beyond',
		  				time: '04:58',
		  				time2: '298'
		  			}
		  		],
		  		playing: {},
		  		play: true,
		  		playMd: ['ion-shuffle','ion-arrow-return-left','ion-refresh'],
		  		playMdNum: 0,
		  		time: null,
		  		time_ing: 0,
		  		time_ing2: ''
		  	}
	  	
	  	},
		methods:{
			_play () {
				this.play = !this.play
				var music = $('audio')[0]
				var me = this
				if (music.paused){ 
			        music.play()
			        var playing = this.playing
			        var step = parseFloat($('.in').css('left'))/playing.time2
			        me.time =setInterval(function(){
				  		var left = parseFloat($('.in').css('left')) - step*2
				  		if(me.time_ing % 2 == 0){
				  			$('.in').css('left', left + 'px')
				  		}
				  		if(left >= 0){
				  			clearInterval(me.time)
				  		}
				  		me.time_ing += 1
				  		me._timeFormat()
				  	},1000)
			    } 
			    else{ 
			        music.pause();
			        clearInterval(this.time)
			    }
			},
			_playMd () {
				++ this.playMdNum
				if(this.playMdNum == 3){
					this.playMdNum = 0
				}
			},
			_timeFormat () {
				var sec = this.time_ing
				var mm = parseInt(sec/60)
				mm = '0' + mm
				var ss = sec%60
				if(ss <= 9){
					ss = '0' + ss
				}
				this.time_ing2 = mm + ':' + ss
			},
			_back () {
				window.history.go(-1)
			}
		},
		mounted () {
			var me = this
			$(function() {
			    FastClick.attach(document.body);
			});
			this.playing = this.list[2]
			var playing = this.playing
			var step = parseFloat($('.in').css('left'))/playing.time2
		  	me.time = setInterval(function(){
		  		var left = parseFloat($('.in').css('left')) - step*2
		  		if(me.time_ing % 2 == 0){
		  			$('.in').css('left', left + 'px')
		  		}
		  		if(left >= 0){
		  			clearInterval(me.time)
		  		}
		  		me.time_ing += 1
		  		me._timeFormat()
		  	},1000)
		}
	}
</script>
<style lang="less">
	@import '../less/music_detail.less';
</style>

