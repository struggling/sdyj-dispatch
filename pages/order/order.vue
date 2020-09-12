<template>
	<view>
		<!-- 自定义导航栏 -->
		<u-navbar :is-back="false"  title="订单中心" :height="height" :background="background" title-color="#ffffff"></u-navbar>
		<swiperTabHead :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></swiperTabHead>
		<view class="uni-tab-bar">
			<swiper class="swiper-box" :style="{height:swiperheight+'px'}" :current="tabIndex" @change="tabChange">
				<swiper-item v-for="(items,index) in newslist" :key="index">
					<scroll-view scroll-y class="list" @scrolltolower="loadmore(index)" refresher-enabled="true" :refresher-triggered="triggered"
            :refresher-threshold="30"  @refresherpulling="onPulling"
            @refresherrefresh="onRefresh" @refresherrestore="onRestore(index)" @refresherabort="onAbort">
						<!-- 待上门订单列表 -->
						<template v-if="items.list.length>0">
							<block v-for="(item,index1) in items.list" :key="index1">
								<Settled :item="item" :index="index1" :keys="index" :btn="items.btn" :color="items.color" @deleteOrder="deleteOrder"></Settled>
							</block>
						</template>
						<template v-else>
							<noThing></noThing>
						</template>
						<!-- 上拉加载 -->
						<loadMore :loadtext="items.loadtext"></loadMore>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	const Mock = require("../../common//mock.mp.js");
	import orderList from "../../components/order/order-list.vue";
	import swiperTabHead from "../../components/order/swiper-tab-head.vue";
	import loadMore from "../../components/common/load-more.vue";
	import noThing from "../../components/common/no-thing.vue";
	import orderSettled from "../../components/order/order-settled.vue";
	import Cancel from "../../components/order/cancel.vue";
	import Settled from "../../components/order/settled.vue";
	export default {
		components: {
			 orderList,
			 swiperTabHead,
			 loadMore,
			 noThing,
			Settled,
			Cancel,
			orderSettled
		},
		data() {
			return {
				// 自定义导航栏
				height:"",
				background:{
					backgroundImage: "linear-gradient(90deg, #54C3F1, #00ABEB)",
				},
				// 自定义导航栏
				user_uid:"",
				code:"",//订单编号
				swiperheight: 500,
				triggered: true,
				tabIndex: 0,
				tabclick:-1,
				tabBars: [{
						name: "待上门",
						id: "daishangmen"
					},
					{
						name: "待结算",
						id: "daijiesuan"
					},
					{
						name: "已结算",
						id: "yijiesuan"
					},
					{
						name: "已取消",
						id: "yiquxiao"
					},
				],
				newslist: [
					{
						btn:[
							"取消订单",
							"立即上门"
						],
						loadtext: "上拉加载更多",
						list: []

					},
					{
						btn:[
							" ",
							"联系客服",
						],
						loadtext: "上拉加载更多",
						list: []
					},
					{
						btn:[
							"取消订单"
							
						],
						loadtext: "上拉加载更多",
						list: []
					},
					{	
						btn:[
							" ",
							" ",
						],
						loadtext: "上拉加载更多",
						list: [],
						color:"#cccccc"
					},
				],
			}
		},
		onShow() {
			this.checklogin();
			//获取订单页面所有数据
			this.getlistdata();
			
		},
		onLoad() {
			// wx.hideShareMenu({
			//   menus: ['shareTimeline'],//小程序分享到朋友圈按钮
			//   success:(res)=>{
			// 	  console.log(res);
			//   }
			// })
			//检查登录授权
			this.checklogin();
			//设置容器高度
			uni.getSystemInfo({
				success: (res) => {
					console.log(res.windowHeight);
					let height = res.windowHeight - uni.upx2px(243);
					this.swiperheight = height;
				}
			});
			this._freshing = false;
			setTimeout(() => {
			    this.triggered = true;
			}, 1000);
			 // uni.$emit('updates',{msg:'页面更新'});
			this.user_uid = uni.getStorageSync('user_uid');
			
			
		},
		methods: {
			//上拉加载更多
			loadmore(index) {
				console.log(index);
				//修改状态
				if (this.newslist[index].loadtext != "上拉加载更多") {
					return;
				}
				this.newslist[index].loadtext = "加载中...";
				console.log(this.newslist[index].loadtext);
				//获取数据
				setTimeout(() => {
					//获取完成
					// let obj = this.getlistdata();
					// this.newslist[index].list.concat(obj);
					this.newslist[index].loadtext = "暂无更多数据";
				}, 1000)
			},
			//tabbar点击事件
			tabtap(index) {
				this.tabIndex = index;
				console.log("当前点击"+index);
				// if(this.tabclick != index){
				// 	this.tabclick = index;
				// 	switch (this.tabIndex){
				// 		case 1:
						
				// 		// this.newslist[0].list = 
				// 			break;
				// 		case 2:
				// 		//待上门订单
				// 		this.getlistdata();
				// 		// this.newslist[0].list = 
				// 			break;
				// 		case 3:
				// 		//待上门订单
				// 		// this.getlistdata();
				// 		// this.newslist[0].list = 
				// 			break;
				// 		default:
				// 			//待上门订单
				// 			console.log("待上门订单");
				// 			this.getlistdata();
				// 			break;
				// 	}
				// }else{
				// 	console.log("取消多次请求");
				// }
			},
			//滑动事件
			tabChange(e) {
				this.tabIndex = e.detail.current;
				switch (e.detail.current){
					case 1:
					this.getClose();
					break;
					case 2:
					this.getEnd();
					break;
					case 3:
					this.getlistCancel();
					break;
					default:
					this.getlistdata();
					break;
				}
			},
			deleteOrder(index){
				//uid code
				let that = this;
				uni.showModal({
				    title: '提示',
				    content: '确认取消此订单吗？取消订单会影响个人信誉,降低平台对您派单量',
				    success: function (res) {
				        if (res.confirm) {
							let code = that.newslist[0].list.splice(index,1)[0].code;//当前删除的订单号
							 console.log('用户点击确定'+code);
							that.getlistCancel(code);
							that.newslist[0].list.splice(index,1);
							console.log("删除后还有几条订单");
							console.log(that.newslist[0].list.length);
							uni.request({
								url:that.$apiUrl+"work/cancel",
								method: "POST",
								dataType: JSON,
								data: {
									code:code,
									uid: that.user_uid
								},
								success(res) {
									console.log(res);
								},
								fail(res) {
									console.log(res);	
								}
							})
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
				
			},
			//拉去待上门数据
			getlistdata(){
				let phone = uni.getStorageSync('phone');
				let that = this;
				if(phone){
					uni.request({
						url:this.$apiUrl+"work/been",
						method:"POST",
						dataType:JSON,
						data:{
							uid:this.user_uid
						},
						success(res) {
							console.log();
							console.log("待上门:"+res);
							console.log(res);
							const data = JSON.parse(res.data);
							console.log(data);
							if(data.code == 200){
								that.newslist[0].list = data.data;
								that.code = that.newslist[0].list.code;
								console.log("待上门列表：");
								console.log(that.newslist[0].list);
							}else if(data.code == 300){
								uni.showToast({
									title:"暂无数据"
								})
							}
							else{
								uni.showToast({
									title:"服务器无响应"
								})
							}
							// this.newslist[0].list  =res.data
						},
						fail() {
							uni.showToast({
								title:"无网络..."
							})
						}
					})
				}else{
					//如果没有手机说明用户没有注册跳转
					uni.showModal({
					    title: '提示',
					    content: '请先完成师傅服务类型注册，在开始抢单',
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
								//如果没有手机说明用户没有注册跳转
								uni.navigateTo({
									url:"../settlement/settlement"
								})
					        } else if (res.cancel) {
					            console.log('用户点击取消');
								
					        }
					    }
					});
				}
			},
			
			//拉去师傅已取消订单
			getlistCancel(){
				let that =this;
				uni.request({
					url:this.$apiUrl+"work/off",
					method:"POST",
					dataType:JSON,
					data:{
						uid:this.user_uid,
					},
					success(res) {
						console.log("取消订单");
						console.log(res);
						const data = JSON.parse(res.data);
						console.log(data);
						if(data.code == 200){
							that.newslist[3].list = data.data;
							that.code = that.newslist[3].list.code;
							console.log("取消订单：");
							console.log(that.newslist[3].list);
						}else if(data.code == 300){
							uni.showToast({
								title:"暂无数据"
							})
						}
						else{
							uni.showToast({
								title:"服务器无响应"
							})
						}
						
					},
					fail(res) {
						console.log(res);
						uni.showToast({
							title:"服务器无响应"
						})
					}
				})
			},
			
			
			//待结算订单
			getClose(){
				let that = this;
				uni.request({
					url:this.$apiUrl+"work/close",
					method:"POST",
					dataType:JSON,
					data:{
						uid:this.user_uid
					},
					success(res) {
						console.log("待结算:");
						console.log(res);
						const data = JSON.parse(res.data);
						console.log(data);
						if(data.code == 200){
							that.newslist[1].list = data.data;
							// that.code = that.newslist[1].list.code;
							console.log("待上门列表：");
							console.log(that.newslist[1].list);
						}else{
							uni.showToast({
								title:"服务器无响应"
							})
						}
					},
					fail() {
						uni.showToast({
							title:"无网络..."
						})
					}
				})
			},
			
			//已结算
			getEnd(){
				let that = this;
				uni.request({
					url:this.$apiUrl+"/work/end",
					method:"POST",
					dataType:JSON,
					data:{
						uid:this.user_uid
					},
					success(res) {
						console.log("已结算:");
						console.log(res);
						const data = JSON.parse(res.data);
						console.log(data);
						if(data.code == 200){
							that.newslist[1].list = data.data;
							// that.code = that.newslist[1].list.code;
							console.log("已结算列表：");
							console.log(that.newslist[1].list);
						}else{
							uni.showToast({
								title:"服务器无响应"
							})
						}
					},
					fail() {
						uni.showToast({
							title:"无网络..."
						})
					}
				})
			},
			//控件被下拉
			onPulling(e) {
			    console.log("onpulling", e);
			},
			//触发
			onRefresh() {
			    if (this._freshing) return;
			    this._freshing = true;
				// if(this.orderlist)
			    setTimeout(() => {
			        this.triggered = false;
			        this._freshing = false;
			    }, 1000)
			},
			//复位
			onRestore(index) {
			    this.triggered = 'restore'; // 需要重置
			    console.log("onRestore");
				console.log(index);
				// switch (index){
				// 	case 0:
				// 		this.getlistdata();
				// 		break;
				// 	case 1:
				// 		this.getClose();
				// 		break;	
				// 	case 0:
				// 		this.getEnd();
				// 		break;
				// 	case 3:
				// 		this.getlistCancel();
				// 		break;			
				// 	default:
				// 		break;
				// }
			},
			//终止
			onAbort() {
			    console.log("onAbort");
			}
		},
		
		//自定义分享页面
		onShareAppMessage(e){
			return {
				title: this.$overShare.title,
				path: this.$overShare.path,
				imageUrl:this.$overShare.imageUrl,
				
			}
		}
		
	}
</script>

<style>
	view{
		line-height: 2.25;
	}
</style>
