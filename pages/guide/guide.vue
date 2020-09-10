<template>
    <view>
        <view class="uni-padding-wrap">
            <view class="page-section swiper" :style="{height:swiperheight+'px'}">
                <view class="page-section-spacing">
                    <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" indicator-active-color="#00ABEB">
                        <swiper-item>
                            <view class="swiper-item">
								<image src="../../static/guide/guide1.jpg" mode=""></image>
								<view class="text">轻轻一点 接单神器</view>
								<view class="text1 " @tap="openindex">跳过</view>
								</view>
                        </swiper-item>
                        <swiper-item>
                            <view class="swiper-item">
								<image src="../../static/guide/guide2.jpg" mode=""></image>
								<view class="text">就近抢单  方便快捷</view>
							</view>
                        </swiper-item>
                        <swiper-item>
                            <view class="swiper-item">
								<image src="../../static/guide/guide3.jpg" mode=""></image>
								<view class="text">确认完成  费用秒到账</view>
							</view>
                        </swiper-item>
						<swiper-item>
						    <view class="swiper-item">
								<image src="../../static/guide/guide4.jpg" mode=""></image>
								<view class="text btn" @tap="openindex">立即体验</view>
							</view>
						</swiper-item>
                    </swiper>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
	export default {
	    data() {
	        return {
	            background: ['color1', 'color2', 'color3'],
	            indicatorDots: true,
	            // autoplay: true,
	            interval: 5000,
	            duration: 1000,
				swiperheight: 500,
	        }
	    },
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					console.log(res.windowHeight);
					let height = res.windowHeight - uni.upx2px(0);
					this.swiperheight = height;
				}
			});
		},
	    methods: {
			openindex(){
				uni.reLaunch({
					url:"../index/index"
				})
			},
	        changeIndicatorDots(e) {
	            this.indicatorDots = !this.indicatorDots
	        },
	        changeAutoplay(e) {
	            this.autoplay = !this.autoplay
	        },
	        intervalChange(e) {
	            this.interval = e.target.value
	        },
	        durationChange(e) {
	            this.duration = e.target.value
	        }
	    }
	}
</script>

<style scoped>
	.uni-padding-wrap{
		width: 100%;
		
	}
	.page-section-spacing{
		box-sizing: border-box;
		padding-top: 16%;
	}
	.page-section-spacing.swiper{
		height: 600upx !important;
	}
	.uni-padding-wrap {
	padding: 0 ;
	}
	.swiper-item image{
		width: 100%;
		height: 570upx;
	}
	swiper{
		height: 1200upx !important;
	}
	.swiper-item{
		position: relative;
		padding-top: 246upx;
	}
	.swiper-item .text{
		position: absolute;
		top: 968upx;
		text-align: center;
		font-weight: bold;
		color: #000000;
		width: 100%;
	}
	.swiper-item .text1{
		position: absolute;
		top: 66upx;
		left: 327upx;
		text-align: center;
		font-weight: bold;
		color: #000000;
		width: 100%;
	}
	.btn{
		border: 2upx solid #00ABEB;
		border-radius: 20upx;
		padding: 25upx;
		width: 400upx !important;
		color:#00ABEB !important;
		width: 400upx;
		margin: 0 25%;
	}
</style>
