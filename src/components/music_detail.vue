<template>
  	<div id="detail">
  		<div class="header">
  			<span class="ion ion-chevron-left" @click="_back()"></span>
  			<div class="title">
  				<h3>title</h3>
  			</div>
  		</div>
  		<div class="detail">
  			<audio autoplay="autoplay" :src="playing.url"></audio>
  			<p style="font-size: 18px;color: #f00;">因接口更换原因，此页数据为静态数据！</p>
	  		<img class="img" :src="playing.img" width="180" height="180">
	  		<h3 class="tit">{{playing.title}}</h3>
	  		<p class="author">{{playing.author}}</p>
	  		<div class="menu">
	  			<span :class="playMd[playMdNum]" @click="_playMd()"></span>
	  			<span class="ion-skip-backward" @click="_changePlay(-1)"></span>
	  			<span :class="play ? 'ion-pause' : 'ion-play'" @click="_play()"></span>
	  			<span class="ion-skip-forward" @click="_changePlay(1)"></span>
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
		  				url: '../assets/张学友 - 吻别.mp3',
		  				img: 'http://imge.kugou.com/stdmusic/20170425/20170425071843619428.jpg',
		  				title: '吻别',
		  				author: '张学友',
		  				time: '04:59',
		  				time2: '299'
		  			},
		  			{
		  				url: '../assets/薛之谦 - 演员.mp3',
		  				img: 'http://singerimg.kugou.com/uploadpic/softhead/400/20170713/20170713161536456.jpg',
		  				title: '演员',
		  				author: '薛之谦',
		  				time: '04:21',
		  				time2: '261'
		  			},
		  			{
		  				url:'../assets/周传雄 - 青花.mp3',
		  				img: 'http://imge.kugou.com/stdmusic/20170619/20170619161444489222.jpg',
		  				title: '青花',
		  				author: '周传雄',
		  				time: '04:57',
		  				time2: '297'
		  			}
		  		],
		  		playing: {},
		  		playIndex: 0,
		  		play: true,
		  		playMd: ['ion-shuffle','ion-arrow-return-left','ion-refresh'],
		  		playMdNum: 0,
		  		time: null,
		  		time_ing: -1,
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
			        var playing = me.playing
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
			_changePlay (t) {
				var me = this
				this.time_ing = -1
				$('.in').css('left', '-100%')
				var playing = this.playing
				var step = parseFloat($('.in').css('left'))/playing.time2
				clearInterval(me.time)
				
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
				if(this.playMdNum == 0){
					while(true){
						var r = parseInt(Math.random() * 3)
						if(r != this.playIndex){
							this.playIndex = r
							this.playing = this.list[r]
							break;
						}
					}
				}
				else{
					this.playIndex += t
					if(this.playIndex == 3){
						this.playIndex = 0
					}
					if(this.playIndex == -1){
						this.playIndex = 2
					}
					this.playing = this.list[this.playIndex]
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
			this.playing = this.list[0]
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

