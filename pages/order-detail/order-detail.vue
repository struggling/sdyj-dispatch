<template>
	<view>
		<!-- 顶部自定义导航 -->
		<u-navbar :is-back="true" title="订单详情" :height="height" :background="background" title-color="#ffffff"
		 back-icon-color="#ffffff">
		</u-navbar>
		<view class="order-detail">
			<view class="order-row">
				<view class="order-td top iconfont icongerenzhongxin-zhong"><span>客户订单信息</span></view>
			</view>
			<view class="order-row">
				<view class="order-td iconfont icontongxunlu"><span>{{data.name}} </span></view>
				<view class="order-td r-box iconfont iconshouji"><span>{{data.tel}}</span></view>
			</view>
			<view class="order-row">
				<view class="order-td">
					<view class="tips">服务类型:</view>
					<view>{{data.type}}</view>
				</view>
				<view class="order-td r-box">
					<view class="tips">服务时长：</view>
					<view> {{data.duration}}</view>
				</view>
			</view>
			<view class="order-row">
				<view class="order-td">
					<view class="tips">上门时间:</view>
					<view>{{data.door_time}}</view>
				 </view>
				<view class="order-td"></view>
			</view>
			<view class="order-row">
				<view class="order-td">
					<view class="tips">位置: </view>
					<view>{{data.origin}}</view>
				</view>
				<view class="order-td"></view>
			</view>
			<view class="order-row">
				<view class="order-td">
					<view class="tips">工具要求:</view>
					<view>{{data.label}}</view>
				</view>
				<view class="order-td"></view>
			</view>
			<view class="order-row">
				<view class="order-td">
					<view class="tips">备注:</view>
					<view>{{data.content}}</view>
				</view>
				<view class="order-td"></view>
			</view>
		</view>
		<view class="order-status">
			<view class="order-row">
				<view class="order-td">
					<view class="tips"> 订单状态:</view>
					<view>未派单{{data.state}}</view>
				</view>
				<view class="order-td r-box">
					<view class="tips">参考价格:</view>
					<view>{{data.budget}}</view>
				</view>
			</view>
			<view class="order-row">
				<view class="order-td">
					<view class="tips">订单编号:</view>
					<view>{{data.code}}</view>
				</view>
				<view class="order-td r-box">
					<view class="tips">发布时间: </view>
					<view>{{data.door_time}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:{},
				height: "",
				background: {
					backgroundImage: "linear-gradient(90deg, #00ABEB, #54C3F1)",
				},
			}
		},
		onLoad(event) {
			// TODO 后面把参数名替换成 payload
			const payload = event.detailDate || event.payload;
			// 目前在某些平台参数会被主动 decode，暂时这样处理。
			try {
				this.data= JSON.parse(decodeURIComponent(payload));
				console.log(this.data);
			} catch (error) {
				this.data = JSON.parse(payload);
				console.log(this.data);
			}
		},
		onReady() {
				
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
