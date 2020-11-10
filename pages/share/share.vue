<template>
	<view>
		<view class="bgshare" :style="{height:swiperheight+'px'}">
			<image class="pic" src="http://7n.51tiaoyin.com/%E8%83%8C%E6%99%AF%402x.png" mode=""></image>
		</view>
		<view class="content">
			<!-- <view class="logo"><image class="logoimg" src="../../static/logo.png" mode=""></image></view> -->
			<view class="issuse">
				<view class="youshi">
					<view class="title">入驻优势</view>
					<view class="text">方便快捷、就近派单</view>
					<view class="text"> 结算迅速、完成到账 </view>
					<view class="text">  积分商城、好礼送不停 </view>
					<view class="text">  全职招募、稳定收入</view>
				</view>
				<view class="tiaojian">
					<view class="title">入驻条件</view>
					<view class="text">专业稳定、兼职全职</view>
					<view class="text"> 诚实守信、热情服务 </view>
				</view>
			</view>
		</view>
		<view class="bottom-btn">
			<view class="kefu" @tap="openmask=true">客服</view>
			<view class="ruzhu" @tap="openregister">点击快速入驻</view>
		</view>
		<!-- 客户电话遮罩 -->
		<customer-service  :openmask="openmask" @closemask="closemask"></customer-service>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				openmask:false,
				swiperheight:500
			}
		},
		onLoad() {
			this.checklogin();
			// 获取页面高度值
			uni.getSystemInfo({
				success: (res) => {
					// console.log(res.windowHeight);
					let height = res.windowHeight;
					this.swiperheight = height;
					console.log(this.swiperheight);
				}
			});
		},
		methods: {
			
			
			closemask(){
				this.openmask = false;
			},
			openregister(){
				
				let phone = uni.getStorageSync("phone");
				console.log(phone);
				if(phone){
					uni.reLaunch({
						url:"../index/index"
					})
				}else{
					uni.navigateTo({
						
					
						url:"../register/register"
					})
				}
				
			}
		}
	}
</script>

<style lang="scss">
	.bgshare{
		.pic{
			width: 100%;
			height: 100%;
		}
	}
	.content{
		padding-left: 40upx;
		padding-right: 40upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		    top: 16px;
		    width: 100%;
		.logo{
			.logoimg{
				margin-top: 240upx;
				width: 480upx;
				height: 240upx;
				margin-bottom: 340upx;
			}
		}
		.issuse{
			display: flex;
			justify-content: space-between;
			margin-top: 280rpx;
			position: fixed;
			/* top: 750rpx; */
			bottom: 207rpx;
			.youshi{
				width: 310upx;
				height: 260upx;
				background: #FAFAFA;
				 text-align: center;
				.title{
					color: #333333;
					font-size: 32upx;
					font-weight: bold;
				}
				.text{
					line-height: 50rpx;
				}
			}
			.tiaojian{
				width: 310upx;
				height: 260upx;
				text-align: center;
				background: #FAFAFA; 
				.title{
					color: #333333;
					font-size: 32upx;
					font-weight: bold;
				}
			}
		 }
	}
	.bottom-btn{
		display: flex;
		justify-content: space-between;
		padding-left: 40upx;
		padding-right: 40upx;
		align-items: center;
		position: fixed;
		bottom: 40upx;
		.kefu{
			width: 160upx;
			height: 88upx;
			border-radius: 6upx;
			border: 1upx solid #3CB3FF;
			text-align: center;
			line-height: 88upx;
			color:#41B8FF ;
		}
		.ruzhu{
			width: 480upx;
			height: 88upx;
			margin-left: 30upx;
			background: linear-gradient(132deg, #48C0FF 0%, #0F80FF 100%);
			border-radius: 6upx;
			text-align: center;
			line-height: 88upx;
			color: #FFFFFF;
		}
	}
</style>
