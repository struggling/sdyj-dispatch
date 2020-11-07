<template>
		
		<block v-if="styles">
			<view class="nothing" :style="{height: styles + 'px' }">
				<image src="http://7n.51tiaoyin.com/Group%202%402x.png" mode="widthFix"></image>
				<view class="txt">抱歉，暂无数据!</view>
			</view>
		</block>
		<block v-else>
			<view class="nothing">
				<image src="http://7n.51tiaoyin.com/Group%202%402x.png" mode="widthFix"></image>
				<view class="txt">抱歉，暂无数据!</view>
			</view>
		</block>
		
</template>

<script>
	export default {
		props:{
			styles:Number
		}
	}
</script>

<style>
	.nothing{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #FFFFFF;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
	.nothing image{
		width: 60%;
	}
	.nothing .txt{
		font-size: 36upx;
		font-weight: bold;
	}
</style>
