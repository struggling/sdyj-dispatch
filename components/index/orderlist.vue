<template>
	<view>
		<!-- 订单列表 -->
		<!-- <mescroll-uni :ref="'mescrollRef'+index" @init="mescrollInit" height="100%" top="60" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @emptyclick="emptyClick"> -->
			<view class="wait-list">
				<view class="info" >
					<view class="parm" @tap="goDetail(item)">
						<view class="parm-txt title">{{item.type}}/{{item.duration}}</view>
						<view class="parm-tips">
							<view class="parm-item-l">
								<view class="parm-txt">{{item.origin}}</view>
								<view class="parm-txt door-time">上门时间：{{item.door_time}}</view>
							</view>
							<view class="parm-item-r">
								<template v-if="item.jl">
									<view class="parm-txt">{{item.jl}}公里</view>
								</template>
							</view>
						</view>
						<view class="parm-txt label">
							<block v-for="(items,indexs) in item.label" :key="indexs">
								<view class="label-item">{{items}}</view>
							</block>
						</view>
						<view style="display: flex;justify-content: space-between;">
							<view class="price parm-txt">￥{{item.budget}}元</view>
							<block v-if="item.integral">
								<view class="price parm-txt" style="color: #7f7f7f;font-size: 20upx;font-weight: 100;line-height: 50rpx;">完成订单可获得:{{item.integral}}积分</view>
							</block>
						</view>
						<template v-if="item.reason">
							<view style="color: #0080FF;font-weight: 600;padding-bottom: 30upx;"  class="parm-txt reason">原因：{{item.reason}}</view>
							
						</template>
					</view>
				</view>
				<view class="btn-group">
					<block v-if="item.state==5">
						<button type="default" class="btn shenhe">审核中</button>
					</block>
					<block v-else-if="item.state==6">
						<button type="default" class="btn shenhe">审核未通过</button>
					</block>
					<block v-else>
						<button type="default" class="btn active" @tap="goDetail(item)" @>立即抢单</button>
					</block>
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
				// if(this.item.label){
				// 	this.label = this.item.label.split(",");
				// 	console.log("标签");
				// 	console.log(this.label);
				// }
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
				
				if(item.state == 5){
					console.log(item.state,"跳转限制5");
					return false
					
				}else if(item.state == 6){
					console.log(item.state,"跳转限制6");
					return false
				}
				else{
					console.log(item.state,"非跳转限制");
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
						integral:item.integral,
						jl:item.jl
					};
					uni.navigateTo({
						// url: '../../pages/order-detail/order-detail?detailDate=' + encodeURIComponent(JSON.stringify(detail))
						url: '../../pages/wait-list/wait-list?detailDate=' + encodeURIComponent(JSON.stringify(detail))
					});
				}
				
			},
			
		}
	}
</script>

<style scoped lang="scss">
	.shenhe{
		// color: #CCCCCC;
		background:#CCCCCC ;
	}
	/* 订单列表 */
	.wait-list{
		
		/* border-bottom: 1upx solid #c5c4d5; */
		margin-top: 40upx;
		margin-left: 40upx;
		margin-right: 40upx;
		border-radius: 2upx;
		padding: 40upx;
		background-color: #FFFFFF;
	}
	.uni-tab-bar .list {
	    width: 750rpx;
	    /* height: 94%; */
		height: auto;
	}
	.wait-list .btn-group{
		display: flex;
		/* justify-content: end; */
		/* padding: 15upx; */
		/* justify-content: flex-end; */
		/* border-bottom: 1upx solid #c5c4d5; */
		justify-content: space-between;
	}
	.btn-group .active{
		
		background: linear-gradient(133deg, $themeleft 0%, $themeright 100%) !important;
		color: #FFFFFF !important;
		border: none !important;
	}
	.btn-group .btn {
		width: 100%;
		height: 88upx;
		text-align: center;
		line-height: 88upx;
		font-size: 32upx;
		border-radius: 8upx;
		border: 1upx solid #979797;
		color:#333333;
		padding-left: 20upx;
		padding-right: 20upx;
		line-height: 88upx;
		/* margin-left: 48upx; */
		border: 1upx solid #c5c4d5;
		background: none;
	}
	.info{
		/* padding-left: 25upx;
		padding-right: 25upx; */
		
		display: flex;
		align-items: center;
		justify-content: space-between;
		
	}
	.info .parm{
		width: 100%;
	}
	.info .label{
		
		display: flex;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		flex-wrap: wrap;
	}
	.info .label .label-item{
		margin-top: 20upx;
		font-size: 20upx;
		border:1upx solid #000000;
		border-radius: 8upx;
		margin-right: 20upx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		line-height: 34upx;
	}
	.parm-tips{
		display: flex;
		justify-content: space-between;
		padding: 16upx;
		background-color:#F8F8F8;
		align-items: center;
		margin-top: 20upx;
	}
	.parm-item-l{
	
		width: 60%;
	}
	.parm-item-r{
		width: 20%;
	
	}
	.parm-item-l .parm-txt{
		line-height: 24upx !important;
		font-size: 24upx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		margin-top: 20rpx;
	}
	.parm-item-l .door-time{
		color: #1E91FF;
	}
	.parm-item-r .parm-txt{
		line-height: 24upx !important;
		font-size: 20upx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.parm-txt{
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.reason{
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		color: $themeright;
		font-size: 32upx;
	}
	.parm{
		line-height: 28upx;
	}
	.parm .title{
		font-size: 32upx;
		font-weight: bold;
	}
	.parm .price{
		text-align: left;
		color:#FF3D3D;
		
		font-weight: 400;
		font-size: 44upx;
		margin-top: 40upx;
		margin-bottom: 40upx;
	}
	.parm .pic image{
		width: 168upx;
		height: 168upx;
		border-radius: 100%;
	}
	
	button{
		-webkit-appearance: none;
	}
	button::after{
		border: none;
	}
</style>
