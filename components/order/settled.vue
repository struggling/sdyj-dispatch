<template>
	<view>
		<!-- 订单列表 -->
		<!-- <mescroll-uni :ref="'mescrollRef'+index" @init="mescrollInit" height="100%" top="60" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @emptyclick="emptyClick"> -->
			<view class="wait-list">
				<view class="info" >
					<view class="parm" @tap="goDetail(item)">
						<block v-if="item.producttype">
							<view class="parm-txt title">{{item.type}}/{{item.producttype}}</view>
						</block>
						<block v-else>
							<!-- <view class="parm-txt title">{{item.type}}/{{item.producttype}}</view> -->
							<view class="parm-txt title">{{item.type}}/{{item.duration}}</view>
						</block>
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
									<view class="label-item">1{{items}}</view>
									</block>

							
							
						</view>
						<view style="display: flex;justify-content: space-between;">
							<view class="price parm-txt">￥{{item.budget}}元</view>
							<block v-if="item.integral">
								<view class="price parm-txt" style="color: #7f7f7f;font-size: 20upx;font-weight: 100;line-height: 50rpx;">完成订单可获得:{{item.integral}}积分</view>
							</block>
						</view>
						<template v-if="item.reason">
							<view style="color: #0080FF;font-weight: 600;padding-bottom: 30upx;"  class="parm-txt reason">取消原因：{{item.reason}}</view>
						</template>
						
					</view>
				</view>
				<view class="btn-group">
					<template v-if="btn[0] != ' '">
						<view class="btn" @tap="deleteOrder(index)">{{btn[0]}}</view>
					</template>
					<template v-if="btn[1] != ' '">
						<template v-if="btn[1] == '联系客服'">
							<button type="default" open-type="contact" class="btn">{{btn[1]}}</button>
							<view  class="btn active" @tap="go">拨打电话</view>
						</template>
						<template v-else>
							<view class="btn active" @tap="openpage(item)">{{btn[1]}}</view>
						</template>
					</template>
				</view>
			</view>
		<!-- </mescroll-uni> -->
			<!-- 拨打客服电话或者小程序客户 -->
			<!-- <u-select v-model="showcot" :list="list" @confirm="confirm"></u-select> -->
	</view>	
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/components/mescroll-uni/mixins/mescroll-more-item.js";
	
	export default {
		mixins: [MescrollMixin,MescrollMoreItemMixin], 
		props:{
			item: Object,
			index: Number,
			btn:Array,
			keys:Number,
			color:String,
			isclick:Boolean
		},
		computed:{
			
		},
		data() {
			return {
				show: false,
				list:[
					{
						value: '1',
						label: '聊天客服'
					},
					{
						value: '2',
						label: '客服电话'
					}
				],
				index1:0,
				itemData:[],
				cancel:'background:#cccccc',
				upOption:{
					use:false
				},
				downOption:{
					auto:false,
				},
			}
		},
		onReady() {
			console.log("要传递的值");
			console.log(this.item);
			console.log(this.key);
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
					uid: item.uid,
					integral:item.integral,
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
							url: '../../pages/order-content/order-content?detailDate=' + encodeURIComponent(JSON.stringify(server))
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