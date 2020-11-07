<template>
	<view class="nav-head">
		<view class="bg"><image src="../../static/title.png" mode=""></image></view>
		<view class="content">
			<!-- 地理位置 -->
			<view @tap="openConfirm" class="iconfont icondiliweizhi address">{{address}}</view>
			<!-- 列表头 -->
			<view class="tab-head">
				<block v-for="(item,index) in tabBars" :key="index">
					<view :class="[title,tabIndex == index?active:'']" @tap="xuanzhong(index)">
					{{item}}
					<view v-if="tabIndex == index" class="swiper-tab-line"></view>
					</view>
				</block>
			</view>
			<!-- 通知栏 -->
			<u-notice-bar mode="vertical" :list="notice" :duration="2500" bg-color="#355B93" color="#ffffff"></u-notice-bar>
		</view>
	</view>
	
</template>

<script>
	export default {
		props:{
			address:String,
			tabIndex:Number,
			notice:Array,
			
		},
		data() {
			return {
				title:"title",
				active:'active',
				tabBars: [
					"抢单池",
					"审核中",
					"抢单成功"
				],
			}
		},
		methods:{
			openConfirm(){
				this.$emit("openConfirm")
			},
			xuanzhong(index){
				this.$emit("xuanzhong",index)
			}
			
		}
	}
	
</script>
<style>
	.u-notice-bar{
		opacity: 0.6;
	}
</style>
<style scoped lang="scss">
	.nav-head{
		height: 391upx;
		background: linear-gradient(90deg, $themeleft, $themeright);
		position: relative;
	}
	.bg{
		width: 100%;
		height: 100%;
	}
	.bg image{
		width: 100%;
		height: 100%;
	}
	.content{
		position: absolute;
		left: 0;
		top: 0;
		z-index: 100;
		width: 100%;
	}
	.address{
		font-size: 20upx;
		padding-top:123upx;
		padding-left: 30upx;
		color: #ffffff;
		width: 391upx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.tab-head{
		display: flex;
		margin-left: 100upx;
		margin-right: 100upx;
		justify-content: space-between;
		margin-top: 52upx;
		margin-bottom: 44upx;
	}
	.tab-head .title{
		font-size: 40upx;
		color: #FFFFFF;
	}
	.active{
		font-weight: bold;
	}
	.swiper-tab-line{
		width:50%;
		margin: auto;
		border-top: 6upx solid #FFFFFF;
		margin-top: 26rpx;
	}
</style>
