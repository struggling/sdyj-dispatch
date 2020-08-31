<template>
	<view>
		<!-- 订单列表 -->
		<view class="wait-list">
			<view class="info">
				<view class="parm">
					<view class="parm-txt title">{{item.type.id}}/{{item.type.childrentype}}/{{item.time}}小时</view>
					<view class="parm-txt">{{item.address}}</view>
					<view class="parm-txt">距离：&alt {{item.distance}}公里</view>
					<view class="parm-txt"><span>{{item.tool[0].name}}</span><span>毛巾</span><span>毛巾</span></view>
					<view class="parm-txt">上门时间：{{item.vtime}}</view>
				</view>
				<view class="parm">
					<view class="pic">
						<image src="../../static/logo.png" mode=""></image>
					</view>
					<view class="price">{{item.price}}元</view>
				</view>
			</view>
			<view class="btn-group">
				<view class="btn">取消订单</view>
				<view class="btn active">立即上门</view>
			</view>
		</view>
	</view>	
</template>

<script>
	export default {
		props:{
			item: Object,
			index: Number
		},
		data() {
			return {
				
			}
		},
	}

	
</script>

<style scoped>
	/* 订单列表 */
	.wait-list{
		
		border-bottom: 1upx solid #c5c4d5;
		padding-top: 50upx;
	}
	.wait-list .btn-group{
		display: flex;
		justify-content: end;
		padding: 15upx;
		justify-content: flex-end;
	}
	.btn-group .active{
		background-color: #FA5741;
		color: #FFFFFF !important;
		border: none !important;
	}
	.info{
		padding-left: 25upx;
		padding-right: 25upx;
		border-bottom: 1upx solid #c5c4d5;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.parm{
		line-height: 28upx;
	}
	uni-view{
		line-height: 2.15;
	}
	.parm .title{
		font-size: 32upx;
		font-weight: bold;
	}
	.parm .price{
		text-align: center;
		color:#FA5741 ;
	}
	.parm .pic image{
		width: 168upx;
		height: 168upx;
		border-radius: 100%;
	}
	.btn-group .btn {
		font-size: 28upx;
		border-radius: 28upx;
		border: 1upx solid #CCCCCC;
		color:#CCCCCC ;
		padding-left: 20upx;
		padding-right: 20upx;
		line-height: 1.5;
		margin-left: 48upx;
	}
</style>
