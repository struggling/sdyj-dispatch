<template>
	<view>
		<!-- 顶部自定义导航 -->
		<!-- <u-navbar :is-back="true" title="入驻协议书" :height="height" :background="background" title-color="#ffffff"
		 back-icon-color="#ffffff">
		</u-navbar> -->
		<view class="content">
			<u-parse :html="content"></u-parse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				height: "",
				background: {
					backgroundImage: "linear-gradient(90deg, #54C3F1, #00ABEB)",
				},
				content:`<img src="http://7n.51tiaoyin.com/102014350351.png" />`,
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.content{
		padding-left: 25upx;
		padding-left: 25upx;
	}
</style>
