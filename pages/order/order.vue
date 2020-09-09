<template>
	<view>
		<!-- 自定义导航栏 -->
		<u-navbar :is-back="false"  title="订单中心" :height="height" :background="background" title-color="#ffffff"></u-navbar>
		<swiperTabHead :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></swiperTabHead>
		<view class="uni-tab-bar">
			<swiper class="swiper-box" :style="{height:swiperheight+'px'}" :current="tabIndex" @change="tabChange">
				<swiper-item v-for="(items,index) in newslist" :key="index">
					<scroll-view scroll-y class="list" @scrolltolower="loadmore(index)">
						<!-- 待上门订单列表 -->
						<template v-if="items.list.length>0">
							<block v-for="(item,index1) in items.list" :key="index1">
								<Settled :item="item" :index="index1" :btn="items.btn" @deleteOrder="deleteOrder"></Settled>
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
					backgroundImage:"linear-gradient(90deg, #00ABEB, #54C3F1)",
				},
				// 自定义导航栏
				user_uid:"",
				code:"",//订单编号
				swiperheight: 500,
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
							"取消订单",
							"申请开票"
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
						list: []
					},
				],
			}
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
					// console.log(res.windowHeight);
					let height = res.windowHeight - uni.upx2px(100);
					this.swiperheight = height;
				}
			});
			 // uni.$emit('updates',{msg:'页面更新'});
			this.user_uid = uni.getStorageSync('user_uid');
			
			//获取订单页面所有数据
			this.getlistdata();
			this.getClose();
			this.getEnd();
			this.newslist[1].list= [
				{
					Distance: 1541.83,
					budget: "70.00",
					code: "J903134394979893",
					content: "测试",
					delete: 0,
					destination: "",
					door_time: "2020-09-03 14:09:00",
					duration: "时长：2小时",
					label: "扫把 毛巾 洗洁精 擦玻器 吸尘器 除胶剂",
					longitude: "120.17557880007,30.248398420426",
					name: "测试",
					origin: "杭州市上城区无",
					send: "开发者",
					state: 1,
					tel: "181****8028",
					type: "日常保洁",
					uid: 1
				}
			]
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
				
			},
			deleteOrder(index){
				let that = this;
				uni.showModal({
				    title: '提示',
				    content: '确认删除此订单吗？取消订单会影响个人信誉,降低平台对您派单量',
				    success: function (res) {
				        if (res.confirm) {
							let code = that.newslist[0].list.splice(index,1)[0].code;//当前删除的订单号
							 console.log('用户点击确定'+code);
							that.getlistCancel(code);
							that.newslist[0].list.splice(index,1);
							console.log("删除后还有几条订单");
							console.log(that.newslist[0].list.length);
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
							}else{
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
					uni.navigateTo({
						url:"../settlement/settlement"
					})
				}
			},
			
			//拉去师傅取消订单
			getlistCancel(code){
				uni.request({
					url:this.$apiUrl+"work/cancel",
					method:"POST",
					dataType:JSON,
					data:{
						uid:this.user_uid,
						code:code,
					},
					success(res) {
						console.log("取消订单");
						console.log(res);
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
