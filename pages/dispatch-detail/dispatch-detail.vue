<template>
	<view>
		<!-- 自定义导航栏 -->
		<u-navbar :is-back="false"  title="服务订单详情" :height="height" :background="background" title-color="#ffffff"></u-navbar>
		<swiperTabHead :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></swiperTabHead>
		<view class="content">
			<view class="">恭喜您接单成功！</view>
			<view class="">等待上门</view>
			<view class="">
				<view class="order-detail">
					<view class="">
						<view class="">订单金额:160元</view>
						<view class="">服务类型:家政保洁</view>
					</view>
					<view class="">
						<view class="">服务时长:2小时</view>
						<view class="">客户电话:123454678910</view>
					</view>
					<view class="">
						<view class="">工具要求:蒸汽机  扫把啊  拖把啊  除螨机  扫地机  打扫啊</view>
					</view>
					<view class="">
						<view class="">所在位置:四川省眉山市仁寿县中城国际社区24栋一 单元205</view>
					</view>
					<view class="">
						<view class="">备注:干活</view>
					</view>
				</view>
				<view class="bg"></view>
			</view>
			<view class=""></view>
			<button type="default">立即开始</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 自定义导航栏
				height:"",
				background:{
					backgroundImage:"linear-gradient(90deg, #00ABEB, #54C3F1)",
				},
				// 自定义导航栏
			}
		},
		onLoad() {
			  uni.$on('updates',function(data){
			        console.log('监听到事件来自 update ，携带参数 msg 为：' + data.msg);
			    })
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
