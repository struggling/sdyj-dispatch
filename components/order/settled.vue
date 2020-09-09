<template>
	<view>
		<!-- 订单列表 -->
		<view class="wait-list">
			<view class="info">
				<view class="parm" @tap="goDetail(item)">
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

					<view v-show="btn[0] != '' " class="btn" @tap="deleteOrder(index)">{{btn[0]}}</view>
				

					<view v-show="btn[1] != '' " class="btn active" @tap="openpage(item)">{{btn[1]}}</view>
				
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
				index1:0,
				itemData:[]
			}
		},
		onReady() {
			console.log("要传递的值");
			console.log(this.item);
			this.itemData.push(this.item);
		},
		methods:{
			//跳转到详情页
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
					url: '../../pages/order-detail/order-detail?detailDate=' + encodeURIComponent(JSON.stringify(detail))
				});
				// uni.navigateTo({
				// 	url: '../list2detail-detail/list2detail-detail?detailDate=' + encodeURIComponent(JSON.stringify(detail))
				// });
			},
			openpage(item){
				let server = {
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
					if(this.btn[1] =="立即上门"){
						uni.navigateTo({
							url: '../../pages/dispatch-detail/dispatch-detail?serverDate=' + encodeURIComponent(JSON.stringify(server))
						})
					}else{
						this.go()
					}
			},
			//删除订单
			deleteOrder(index){
				this.$emit("deleteOrder",index)
			},
			//拨打客服电话
			go(){
			 	uni.makePhoneCall({
			 	
			 	// 手机号
			    phoneNumber: '400-0015-021', 
			
				// 成功回调
				success: (res) => {
					console.log('调用成功!')	
				},
			
				// 失败回调
				fail: (res) => {
					console.log('调用失败!')
				}
				
			  });
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