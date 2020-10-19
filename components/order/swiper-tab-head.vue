<template>
	<view class="uni-tab-bar">
		<scroll-view scroll-x class="uni-swiper-tab" :style="scrollStyle">
			<block v-for="(tab,index) in tabBars" :key="tab.id">
				<view class="swiper-tab-list" :class="{'active':tabIndex == index}" @tap="tabtap(index)" :style="scrollItemStyle">
					{{tab.name}} {{tab.num?tab.num:''}}
					<view class="swiper-tab-line"></view>
				</view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props:{
			tabBars:Array,
			tabIndex:Number,
			scrollStyle:{
				type:String,
				default:""
			},
			scrollItemStyle:{
				type:String,
				default:""
			}
		},
		methods:{
			tabtap(index){
				this.$emit("tabtap",index);
			}
		}
	}
</script>

<style scoped lang="scss">
.uni-swiper-tab {
    background-color: #FFFFFF;
}
.swiper-tab-list{
		color:#969696;
		font-weight: bold;
		// margin-left: 30upx;
		// height: 50px;
		width: 33.3%;
	}
	.uni-tab-bar .active {
	color: $themeright;
	}
	.active .swiper-tab-line{
		// border-bottom: 6upx solid $themeright;
		width:100%;
		margin: auto;
		border-top: 6upx solid $themeright;
		margin-top: 26rpx;
		// border-radius: 20upx;
	}
	.swiper-box{
		/* height: 700upx !important; */
	}
	.uni-swiper-tab{
		/* border-bottom: 1px solid #ffffff;
		padding-left: 25upx;
		padding-right: 25upx; */
	}
	.uni-scroll-view {
	    position: relative;
	    -webkit-overflow-scrolling: touch;
	    width: 100%;
	    height: 100%;
	    max-height: inherit;
	    display: flex;
	    justify-content: space-around !important;
	}
</style>
