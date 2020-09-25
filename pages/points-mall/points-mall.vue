<template>
	<view>
		<!-- 顶部自定义导航 -->
		<u-navbar :is-back="true"  title="积分商城" :height="height" :background="background" title-color="#ffffff" back-icon-color="#ffffff" >
		</u-navbar>
		<!-- 头部展示栏 -->
		<view class="top">
			<view class="bg"><image src="../../static/home/home.png" mode=""></image></view>
			<view class="panel">
				<view class="text-l">
					<view class="pic"><image src="../../static/home/home.png" mode=""></image></view>
					<view class="point">
						<view class="">总积分</view>
						<view class="">1234</view>
					</view>
				</view>
				<view class="text-r">
					<view class="range"><u-icon name="star-fill" color="#ffffff" size="44" margin-left="20upx"></u-icon></view>
					<view class="text">积分明细</view>
				</view>
			</view>
		</view>
		<!-- uview content -->
		<view class="content">
			<view class="pointtip">
				<view class="line"></view>
				<view class="text"><span>积分</span>兑好礼</view>
				<view class="line"></view>
			</view>
			<view class="malllist">
				<view class="mallitem">
					<view class="ppic"></view>
					<view class="malltitle">玻璃清洁剂</view>
					<view class="malltips">8596积分 ￥2650</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//顶部导航栏
				height:"",
				background:{
					backgroundImage:"linear-gradient(90deg,  #54C3F1,#00ABEB)",
				},
				//顶部导航栏
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.top{
		height: 211upx;
		position: relative;
	}
	.top .bg{
		height: 211upx;
	}
	.top .bg image{
		height: 211upx;
		width: 100%;
	}
	.top .panel{
		position: absolute;
		top: 44upx;
		left: 53upx;
		width: 93%;
	}
	.panel {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.panel .text-l{
		display: flex;
		align-items: center;
	}
	.panel .text-l .pic{
		
	}
	.panel .text-l .pic image{
		width: 117upx;
		height: 121upx;
		border-radius: 100%;
	}
	.panel .text-r{
		background: linear-gradient(90deg, #00ABEB, #54C3F1);
		width: 186upx;
		height: 52upx;
		border-bottom-left-radius: 20upx;
		border-top-left-radius: 20upx;
		/* opacity: 0.32; */
		display: flex;
		align-items: center;
		color: #FFFFFF;
		font-weight: bold;
	}
	.panel .text-r .range{
		width: 52upx;
		height: 52upx;
		border-radius: 100%;
		
		background: linear-gradient(180deg, #FFAF00, #FFCF00);
		text-align: center;
		line-height: 52upx;
	}
	
	/* 列表样式 */
	.content{
		margin-left: 25upx;
		margin-right: 25upx;
	}
	.pointtip{
		display: flex;
		margin: 0 auto;
		align-items: center;
		justify-content: center;
	}
	.pointtip .line{
		width: 20upx;
		height: 2upx;
		background-color: #00AAEB;
		margin: 0 20upx;
	}
	.malllist{
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.malllist .mallitem{
		width: 344upx;
		height: 398upx;
		background: #FFFFFF;
		border: 1upx solid #E5E5E5;
		border-radius: 20upx;
	}
	.malllist .mallitem .ppic{
		width: 344upx;
		height: 288upx;
		background: #E8E8E8;
	}
</style>
