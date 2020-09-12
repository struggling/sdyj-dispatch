<template>
	<view>
		<view class="orderlist">
			<view class="order-item" @tap="goDetail(item)">
				<view class="item-l">
					<view class="title">{{item.type}}/<span>{{item.duration}}</span></view>
					<view class="address">{{item.origin}}</view>
					<view class="dtime">
						<view class="distance">距离:{{distance}}公里</view>
						
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
			jl:Array
		},
		data() {
			return {
				index1:0,
				label:[],
				// door_time:""
				distance:[],
				orderlist:[]
			}
		},
		onReady() {
			// this.label = this.item.label.split(/[ ]+/);
			
				this.label = this.item.label.split(",");
				console.log("标签");
				console.log(this.label);
				this.getDistance();
			
			// this.door_time =this.item.door_time.substring(5,this.item.door_time.length-3);
		},
		computed:{
			sortOrderlist:function(){
				var arr = [
				    {name:'zopp',age:0},
				    {name:'gpp',age:18},
				    {name:'yjj',age:8}
				];
				this.item.longitude  = this.distance;
				this.orderlist = this.orderList.push(this.item);
				function compare(property){
				    return function(a,b){
				        var value1 = a[property];
				        var value2 = b[property];
				        return value1 - value2;
				    }
				}
				console.log("排序");
				console.log(this.orderlist.sort(compare('longitude')))
			}
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
					uid: item.uid
				};
				uni.navigateTo({
					// url: '../../pages/order-detail/order-detail?detailDate=' + encodeURIComponent(JSON.stringify(detail))
					url: '../../pages/wait-list/wait-list?detailDate=' + encodeURIComponent(JSON.stringify(detail))
				});
			},
			//计算距离
			getDistance(){
				console.log("计算属性"+this.items);
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
