<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
  		<slot></slot>
  	</div>
  	<div class="dots">
  		<span
        class="dot"
        v-for="(item,index) in dots"
        :key="index"
        :class="{active:currentPageIndex===index}">
      </span>
  	</div>
  </div>
</template>
<script>
import BScroll from 'better-scroll';
import {addClass} from 'common/js/dom.js';
	export default {
		name: 'slider',
		props:{//外部传入的参数决定组件的数据
			loop :{//是否循环轮播
				type:Boolean,
				default:true,
			},
			autoPlay:{//是否自动轮播
				type:Boolean,
				default:true
			},
			interval:{//滚动间距
				type:Number,
				default:4000
			}
		},
		data(){
			return {
				dots:[],
				currentPageIndex:0
			}
		},
		mounted() {
			setTimeout(() => {
        this._setSliderWidth();
        this._initDots();
        this._initSlider();
        if(this.autoPlay) {
          this._play();
        }
			},20);
      window.addEventListener('resize', () => {
        if(this.slider) {
          this._setSliderWidth(true);
          this.slider.refresh();
        }
      }, false);
		},
		methods:{
			_setSliderWidth(isResize) {
        this.children = this.$refs.sliderGroup.children;
        let width = 0;
        //最外层元素宽度
        let sliderWidth = this.$refs.slider.clientWidth;
        for(let i=0;i<this.children.length;i++){
        	let child = this.children[i];
          addClass(child,'slider-item');
          //每个子元素宽度
          child.style.width = sliderWidth+'px';
          //父容器宽度
          width += sliderWidth;
        }

        if(this.loop && !isResize) {
        	//为了实现左右两侧无缝切换，左右两侧各复制一份图片
        	// width += 2*sliderWidth;
        }
        this.$refs.sliderGroup.style.width = width+'px';
			},
			_initSlider(){
        this.slider = new BScroll(this.$refs.slider,{
        	scrollX:true,
        	scrollY:false,
        	momentum:false,//惯性
        	snap:true,
        	snaploop:this.loop,
        	snapThreshold:0.3,
        	snapSpeed:400,
        });
        //初始化slider的时候是会派发一个事件的
        this.slider.on('scrollEnd', () => {
        	let pageIndex = this.slider.getCurrentPage().pageX;
        	//如果是循环的
          console.log(this.loop)
        	if(this.loop) {
            // pageIndex -= 1;
        	}
          console.log(pageIndex);
          this.currentPageIndex = pageIndex;

          if (this.autoPlay) {
            clearTimeout(this.timer);
            this._play();
          }
        })
			},
			_initDots() {
        this.dots = new Array(this.children.length);
			},
      _play() {
        let pageIndex = this.currentPageIndex + 1;
        if(this.loop) {
          // pageIndex += 1;
        }
        this.timer = setTimeout(() => {
          this.slider.goToPage(pageIndex,0,400);
        },this.interval);
      }
    },
    // 对于有计时器的组件，保留销毁的好习惯
    destroyed() {
      clearTimeout(this.timer);
    },
	}
</script>
<style scoped lang="scss">
	@import "../../common/style/variable.scss";
	.slider{
		min-height:1px;
		overflow: hidden;
		.slider-group{
			position: relative;
			white-space: nowrap;
			.slider-item{
				float:left;
				box-sizing:border-box;
				overflow: hidden;
				text-align:center;
				a{
					display:block;
					width:100%;
					overflow: hidden;
					text-decoration: none;
					img{
						width:100%;
					}
				}
			}
		}
		.dots{
      position: absolute;
      right: 0;
      left: 0;
      bottom: 12px;
      text-align: center;
      font-size: 0;
      .dot{
        display: inline-block;
        margin: 0 4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: $color-text-l;
        &.active{
          width: 20px;
          border-radius: 5px;
          background: $color-text-ll;
        }
      }
    }
	}
</style>
