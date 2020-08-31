<template>
	<view>
		<view class="order-detail">
			<view class="order-row">
				<view class="order-td top iconfont icongerenzhongxin-zhong"><span>客户订单信息</span></view>
			</view>
			<view class="order-row">
				<view class="order-td iconfont icontongxunlu"><span>王先生 </span></view>
				<view class="order-td r-box iconfont iconshouji"><span>1322****5123</span></view>
			</view>
			<view class="order-row">
				<view class="order-td">
					<view class="tips">服务类型:</view>
					<view>家政保洁</view>
				</view>
				<view class="order-td r-box">
					<view class="tips">服务时长：</view>
					<view> 2小时</view>
				</view>
			</view>
			<view class="order-row">
				<view class="order-td">
					<view class="tips">上门时间:</view>
					<view>2020.08.09 15:15</view>
				 </view>
				<view class="order-td"></view>
			</view>
			<view class="order-row">
				<view class="order-td">
					<view class="tips">位置: </view>
					<view>镇江市淮海路236号-5 </view>
				</view>
				<view class="order-td"></view>
			</view>
			<view class="order-row">
				<view class="order-td">
					<view class="tips">工具要求:</view>
					<view>吸尘器  蒸汽机  除螨器  吸尘器  蒸汽机  除螨器</view>
				</view>
				<view class="order-td"></view>
			</view>
			<view class="order-row">
				<view class="order-td">
					<view class="tips">备注:</view>
					<view>不要毛巾，哈哈啊哈哈哈，真的</view>
				</view>
				<view class="order-td"></view>
			</view>
		</view>
		<view class="order-status">
			<view class="order-row">
				<view class="order-td">
					<view class="tips"> 订单状态:</view>
					<view>未派单</view>
				</view>
				<view class="order-td r-box">
					<view class="tips">参考价格:</view>
					<view>160元</view>
				</view>
			</view>
			<view class="order-row">
				<view class="order-td">
					<view class="tips">订单编号:</view>
					<view>123456789644236</view>
				</view>
				<view class="order-td r-box">
					<view class="tips">发布时间: </view>
					<view>2020.08.08 15:15</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style  scoped>
	.order-detail,.order-status{
		background-color: #F2F2F2;
		margin-top: 25upx;
		margin-left: 25upx;
		margin-right: 25upx;
		padding: 25upx;
	}
	.order-row{
		display: flex;
		justify-content: space-between;
		font-size: 30upx;
		color: #554D45;
		padding: 12upx;
		text-align: left;
	}
	.r-box{
		width: 240upx;
	}
	.tips{
		color: #B4B4B4;
		font-size: 24upx;
		margin-bottom: 20upx;
	}
	.top{
		font: 30upx;
		font-weight: bold;
	}
	.order-td span{
		padding-left: 20upx;
	}
</style>
