<template>
	<view>
		<view class="orderlist">
			<view class="order-item" @tap="goDetail(item)">
				<view class="item-l">
					<view class="title">{{item.type}}/<span>{{item.duration}}</span></view>
					<view class="address">{{item.origin}}</view>
					<view class="dtime">
						<view class="distance">距离:{{item.jl}}公里</view>
						
					</view>
					<view class="tool">
						<block v-for="(items,index1) in label" :key="index1">
							<span>{{items}}</span>
						</block>
					</view>
				</view>
				<view class="item-r">
					<view class="price">{{item.budget}}元</view>
					<view class="vtime">上门时间:
					<view>{{item.door_time.substring(5,item.door_time.length-3)}}</view>
					</view>
					<view class="status theme" @tap.stop="openModel">立即抢单</view>
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
			// distance:Array
		},
		data() {
			return {
				index1:0,
				label:[],
				// door_time:""
				// distance:[],
				orderlist:[]
			}
		},
		onReady() {
			// this.label = this.item.label.split(/[ ]+/);
			
				this.label = this.item.label.split(",");
				console.log("标签");
				console.log(this.label);
				// this.getDistance();
			
			// this.door_time =this.item.door_time.substring(5,this.item.door_time.length-3);
		},
		
		
		methods:{
			openModel(){
				console.log(this.index);
				 this.$emit("openModel",this.index);
			},
			// openOrderdetail(index){
			// 	// uni.$emit("itemData",{
			// 	// 	data:this.itemData
			// 	// });
			// 	uni.setStorageSync("data",this.itemData[index]);
			// 	uni.navigateTo({
			// 		url:"../../pages/order-detail/order-detail"
			// 	})
			// },
			//跳转到导航详情页
			goDetail: function(item) {
				let detail = {
					Distance: item.Distance,
					budget: item.budget,
					code: item.code,
					content: item.content,
					delete: item.delete,
					destination: item.destination,
					door_time: item.door_time,
					duration: item.duration,
					label: item.label,
					longitude: item.longitude,
					name: item.name,
					origin: item.origin,
					send: item.send,
					state: item.state,
					tel: item.tel,
					type: item.type,
					uid: item.uid,
					jl:item.jl
				};
				uni.navigateTo({
					// url: '../../pages/order-detail/order-detail?detailDate=' + encodeURIComponent(JSON.stringify(detail))
					url: '../../pages/wait-list/wait-list?detailDate=' + encodeURIComponent(JSON.stringify(detail))
				});
			},
			
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
	.order-item .item-l{
		width: 420upx;
	}
	
	.order-item .item-l .title {
		font-weight: bold;
		font-size: 32upx;
		margin-bottom: 30upx;
		color: #101D37;
		
		
	}
	
	.order-item .item-l .address {
	
		font-size: 28upx;
		color: #969CA8;
		margin-bottom: 15upx;
		font-weight: bold;
	}
	
	.order-item .dtime {
		display: flex;
	}
	
	.order-item .item-l .distance {
		font-size: 28upx;
		color: #00ABEB;
		margin-bottom: 15upx;
		font-weight: bold;
	}
	
	.order-item .item-l .tool {
		font-size: 28upx;
		color: #3072F6;
		margin-bottom: 15upx;
		font-weight: bold;
		overflow:hidden;
		text-overflow:ellipsis;
		white-space:nowrap
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
	
	.order-item .item-r .vtime {
		color: #3072F6;
		font-weight: bold;
		font-size: 24upx;
		/* margin-left: 25upx; */
	
	}
	
	.order-item .item-r {
		display: flex;
		flex-direction: column;
		text-align: center;
		width: 260upx;
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
		margin-bottom: 20upx;
	}
	
	.order-item .item-r .status {
		height: 42upx;
		width: 180upx;
		margin-left: 50upx;
		line-height: 42upx;
		font-size: 28upx;
		font-weight: bold;
		color: #FFFFFF;
		background-color: #FA5741;
		border-radius: 20upx;
		padding: 0 30upx;
		margin-top: 36upx;
		z-index: 100;
	}
	
	.success {
		background-color: #FA5741;
	}
	
	.fail {
		background-color: #cccccc;
	}
</style>
