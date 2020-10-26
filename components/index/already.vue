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
								<template v-if="item.Distance">
									<view class="parm-txt">{{item.Distance}}公里</view>
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
							<view  class="parm-txt reason" style="padding-bottom: 30upx;color: #0080FF;font-weight: 600;">取消原因：{{item.reason}}</view>
						</template>
					</view>
				</view>
				<view class="btn-group">
					<block v-if="!item.system">
						<button type="default"  class="btn " @tap="deleteOrder(index)">取消订单</button>
						<button type="default"  class="btn active" @tap="goDetail(item)">立即上门</button>
					</block>
					<block v-else>
						<button style="font-size: 20rpx;
    text-overflow: ellipsis;
    overflow: auto;
    overflow: hidden;
    white-space: nowrap;" type="default"  class="btn ">{{item.system}}</button>
						<button type="default"  class="btn active" @tap="goDetail(item)">立即上门</button>
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
			jl:Array
		},
		data() {
			return {
				state:[
					'待审核',
					'待上门',
					'待结算',
					'已结算',
					'已取消'
				],
				index1:0,
				itemData:[],
				label:[],
				distance:[]
			}
		},
		computed:{
			// countlabel:function(){
			// 	console.log(this.label);
			// 	return  this.item.label.split(",");
			// },
			countDoortime:function(){
				return this.item.door_time.substring(5,this.item.door_time.length-3)
			}
		},
		onReady() {
			
			console.log("标签");
			console.log(this.label);
			this.getDistance();
		},
		methods:{
			//删除订单
			deleteOrder(index){
				this.$emit("deleteOrder",index)
			},
			//进入到订单详情页面
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
					integral:item.integral,
					uid: item.uid,
					// system:item.system

				};
				uni.navigateTo({
					url: '../../pages/order-content/order-content?detailDate='  + encodeURIComponent(JSON.stringify(detail))
				});
			},
			//计算距离
			getDistance(){
				// console.log("计算属性"+this.items);
				let location = this.item.longitude;
				let str1 = location.split(",")[0];
				str1 = str1.substring(0,9);
				let str2 = location.split(",")[1];
				str2 = str2.substring(0,9);
				var longitude = str1;
				var latitude = str2;
				let latitude1 = uni.getStorageSync("latitude");
				let longitude1 = uni.getStorageSync("longitude");
				var jl = this.countDistance(latitude1, longitude1, latitude, longitude);
				jl = Math.floor(jl/1000 * 10) / 10;
				this.distance = jl;
				console.log("距离");
				console.log(this.distance);
			},
			//计算两点直线路径
			countDistance(la1, lo1, la2, lo2) {
				var FINAL = 6378137.0
				/** 
				 * 求某个经纬度的值的角度值 
				 * @param {Object} d 
				 */
				function calcDegree(d) {
					return d * Math.PI / 180.0;
				}
				/** 
				 * 根据两点经纬度值，获取两地的实际相差的距离 
				 * @param {Object} f    第一点的坐标位置[latitude,longitude] 
				 * @param {Object} t    第二点的坐标位置[latitude,longitude] 
				 */
				var flat = calcDegree(la1);
				var flng = calcDegree(lo1);
				var tlat = calcDegree(la2);
				var tlng = calcDegree(lo2);
				var result = Math.sin(flat) * Math.sin(tlat);
				result += Math.cos(flat) * Math.cos(tlat) * Math.cos(flng - tlng);
				return Math.acos(result) * FINAL;
			},
		}
	}
</script>

<style scoped lang="scss">
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
	.btn-group .btn {
		width: 280upx;
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
	button{
		-webkit-appearance: none;
	}
	button::after{
		border: none;
	}
</style>

