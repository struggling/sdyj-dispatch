<template>
		<view class="nothing">
			<image src="../../static/nothing.png" mode="widthFix"></image>
			<view class="txt">抱歉，暂无数据!</view>
		</view>
</template>

<script>
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
