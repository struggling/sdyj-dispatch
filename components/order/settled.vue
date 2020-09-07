<template>
	<view>
		<!-- 订单列表 -->
		<view class="wait-list">
			<view class="info">
				<view class="parm">
					<view class="parm-txt title">{{item.name}}/{{item.duration}}</view>
					<view class="parm-txt">{{item.origin}}</view>
					<view class="parm-txt">距离：&alt {{item.Distance}}公里</view>
					<view class="parm-txt"><span>{{item.label}}</span></view>
					<view class="parm-txt">上门时间：{{item.door_time}}</view>
				</view>
				<view class="parm">
					<view class="price">{{item.budget}}元</view>
				</view>
			</view>
			<view class="btn-group">
				<view class="btn">{{btn[0]}}</view>
				<view class="btn active" @tap="openpage(index)">{{btn[1]}}</view>
			</view>
		</view>
	</view>	
</template>

<script>
	export default {
		props:{
			item: Object,
			index: Number,
			btn:Array
		},
		data() {
			return {
				data:[]
			}
		},
		onReady() {
			console.log("要传递的值");
			console.log(this.item);
			
			this.data.push(this.item);
			console.log(this.data);
		},
		methods:{
			openpage(index){
				console.log(this.data[index]);
				switch (index){
					case 0:
						uni.navigateTo({
							url:'../../pages/order-detail/order-detail?data='+this.data[index]
						})
						break;
					default:
						break;
				}
			}
		}
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
		background-color: #00AAEB;
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
