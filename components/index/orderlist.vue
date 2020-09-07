<template>
	<view>
		<view class="orderlist">
			<view class="order-item">
				<view class="item-l">
					<view class="title">{{item.name}}<span>{{item.duration}}小时</span></view>
					<view class="address">{{item.origin}}</view>
					<view class="dtime">
						<view class="distance">距离:{{jl[index]}}公里</view>
						<view class="vtime">上门时间:{{item.door_time}}</view>
					</view>
					<view class="tool">
						<block v-for="(items,index1) in tool[0]" :key="index1">
								<span>{{items}}</span>
						</block>
					</view>
				</view>
				<view class="item-r">
					<view class="price">{{item.budget}}元</view>
					<view class="status theme" @tap="openModel">立即抢单</view>
				</view>
			</view>
		</view>
		<view class="orderlist">
			<view class="order-item">
				<view class="item-l" @tap="openOrderdetail(index)">
					<view class="title">{{item.name}}<span>{{item.duration}}小时</span></view>
					<view class="address">{{item.origin}}</view>
					<view class="dtime">
						<view class="distance">距离:{{jl[index]}}公里</view>
						<view class="vtime">上门时间:{{item.door_time}}</view>
					</view>
					<view class="tool">
						<block v-for="(items,index1) in tool[0]" :key="index1">
								<span>{{items}}</span>
						</block>
					</view>
				</view>
				<view class="item-r">
					<view class="price">{{item.budget}}元</view>
					<view class="status theme" @tap="openModel">立即抢单</view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		props:{
			item:Object,
			index:Number,
			tool:Array,
			jl:Array
		},
		data() {
			return {
				index1:0,
				itemData:[]
			}
		},
		onReady() {
			console.log(this.tool[0]);
			this.itemData.push(this.item);
			console.log(111);
			console.log(this.itemData);
		},
		methods:{
			openModel(){
				console.log(this.index);
				 this.$emit("openModel",this.index);
			},
			openOrderdetail(index){
				// uni.$emit("itemData",{
				// 	data:this.itemData
				// });
				uni.setStorageSync("data",this.itemData[index]);
				uni.navigateTo({
					url:"../../pages/order-detail/order-detail"
				})
			}
		}
	}
</script>

<style scoped>
	/* orderlist */
	.orderlist {}
	
	.order-item {
		/* border-bottom: 1upx solid #c3c3f6; */
		border-top: 1upx solid #c3c3f6;
		display: flex;
		justify-content: space-between;
		padding-top: 40upx;
		padding-bottom: 30upx;
		padding-left: 25upx;
		padding-right: 25upx;
	}
	
	.order-item .item-l .title {
		font-weight: bold;
		font-size: 32upx;
		margin-bottom: 30upx;
		color: #101D37;
	}
	
	.order-item .item-l .address {
	
		font-size: 20upx;
		color: #969CA8;
		margin-bottom: 30upx;
		font-weight: bold;
	}
	
	.order-item .dtime {
		display: flex;
	}
	
	.order-item .item-l .distance {
		font-size: 20upx;
		color: #00ABEB;
		margin-bottom: 30upx;
		font-weight: bold;
	}
	
	.order-item .item-l .tool {
		font-size: 20upx;
		color: #3072F6;
		margin-bottom: 30upx;
		font-weight: bold;
	}
	
	.order-item .item-l .tool span {
		padding-left: 10upx;
		padding-right: 10upx;
		padding-top: 4upx;
		padding-bottom: 4upx;
		background-color: #e6e8f6;
		margin-bottom: 10upx;
		margin-right: 10upx;
		border-radius: 8upx;
	}
	
	.order-item .item-l .vtime {
		color: #3072F6;
		font-weight: bold;
		font-size: 18upx;
		margin-left: 25upx;
	
	}
	
	.order-item .item-r {
		display: flex;
		flex-direction: column;
		text-align: center;
		width: 220upx;
	}
	
	.order-item .item-r .img image {
		border-radius: 100%;
		flex-shrink: 0;
		width: 168upx;
		height: 168upx;
	}
	
	.order-item .item-r .price {
		color: #FA5741;
		font-size: 28upx;
		font-weight: bold;
		margin-top: 20upx;
		margin-bottom: 20upx;
	}
	
	.order-item .item-r .status {
		height: 42upx;
		line-height: 42upx;
		font-size: 28upx;
		font-weight: bold;
		color: #FFFFFF;
		background-color: #FA5741;
		border-radius: 20upx;
		padding: 0 30upx;
		margin-top: 89upx;
	}
	
	.success {
		background-color: #FA5741;
	}
	
	.fail {
		background-color: #cccccc;
	}
</style>
