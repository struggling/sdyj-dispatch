<template>
	<view>
		<!-- 自定义导航栏 -->
		<u-navbar :is-back="false"  title="订单中心" :height="height" :background="background" title-color="#ffffff"></u-navbar>
		<swiperTabHead :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap" ></swiperTabHead>
		<mescroll-body :sticky="true" ref="mescrollRef" @init="mescrollInit" @down="downCallback" >
		<view class="uni-tab-bar">
			<swiper class="swiper-box" :style="{height:swiperheight+'px'}" :current="tabIndex" @change="tabChange">
				<swiper-item v-for="(items,index) in newslist" :key="index">
					<scroll-view scroll-y class="list"   >
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
						<!-- <loadMore :loadtext="items.loadtext"></loadMore> -->
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		</mescroll-body>
		<!-- 弹出输入取消框 -->
		<view :hidden="userFeedbackHidden" class="popup_content">
					<view class="popup_title">您的取消订单</view>
					<view class="popup_textarea_item">
						<textarea class="popup_textarea" placeholder='填写取消订单的详细原因...' v-model="feedbackContent">
						</textarea>
						<view @click="submitFeedback()">
							<button class="popup_button">提交说明</button>
						</view>
					</view>
				</view>
		<view class="popup_overlay" :hidden="userFeedbackHidden" @click="hideDiv()"></view>
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
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
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
				 userFeedbackHidden: true, // 默认隐藏
				 feedbackContent: '' ,// 用户反馈内容
				 issubmit:false,
				// 自定义导航栏
				height:"",
				background:{
					backgroundImage: "linear-gradient(90deg, #54C3F1, #00ABEB)",
				},
				// 自定义导航栏
				user_uid:"",
				code:"",//订单编号
				swiperheight: 500,
				triggered: false,
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
			this.user_uid = uni.getStorageSync('uid');
			console.log("取出uid:");
			console.log("取出uid:"+this.user_uid);
			this.getlistdata();
			
		},
		onLoad(event) {
			// wx.hideShareMenu({
			//   menus: ['shareTimeline'],//小程序分享到朋友圈按钮
			//   success:(res)=>{
			// 	  console.log(res);
			//   }
			// })
			let tabbar = event.e;
			console.log(tabbar);
			this.tabIndex = tabbar;
			//检查登录授权
			this.checklogin();
			//设置容器高度
			uni.getSystemInfo({
				success: (res) => {
					console.log(res.windowHeight);
					let height = res.windowHeight - uni.upx2px(239);
					this.swiperheight = height;
				}
			});
			this._freshing = false;
			this.triggered =true;
			 // uni.$emit('updates',{msg:'页面更新'});
			this.user_uid = uni.getStorageSync('uid');
			
			
		},
		methods: {
			/*下拉刷新的回调 */
			downCallback() {
				// 这里加载你想下拉刷新的数据, 比如刷新轮播数据
				// loadSwiper();
				this.getlistdata();
				this.getClose();
				this.getEnd();
				this.getlistCancel();
				// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				
			},
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
							uni.setStorageSync("code",code);
							 console.log('用户点击确定'+code);
							that.getlistCancel(code);
							that.showDiv();
							console.log("原因："+that.feedbackContent);
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
							uni.stopPullDownRefresh();
							const data = JSON.parse(res.data);
							console.log(data);
							if(data.code == 200){
								that.newslist[0].list = data.data;
								that.code = that.newslist[0].list.code;
								that.mescroll.endSuccess();
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
						uni.stopPullDownRefresh();
						const data = JSON.parse(res.data);
						console.log(data);
						if(data.code == 200){
							that.newslist[3].list = data.data;
							that.code = that.newslist[3].list.code;
							that.mescroll.endSuccess();
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
						uni.stopPullDownRefresh();
						const data = JSON.parse(res.data);
						console.log(data);
						if(data.code == 200){
							that.newslist[1].list = data.data;
							that.mescroll.endSuccess();
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
						uni.stopPullDownRefresh();
						const data = JSON.parse(res.data);
						console.log(data);
						if(data.code == 200){
							that.newslist[1].list = data.data;
							// that.code = that.newslist[1].list.code;
							that.mescroll.endSuccess();
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
			// onPulling(e) {
			//     console.log("onpulling", e);
			// },
			// //触发
			// onRefresh() {
			//     if (this._freshing) return;
			//     this._freshing = true;
			// 	// if(this.orderlist)
			//     setTimeout(() => {
			//         this.triggered = false;
			//         this._freshing = false;
			//     }, 3000)
			// },
			// //复位
			// onRestore() {
			//     this.triggered = 'restore'; // 需要重置
			//     console.log("onRestore");
			// 	// console.log(index);
			// 	// switch (index){
			// 	// 	case 0:
			// 	// 		this.getlistdata();
			// 	// 		break;
			// 	// 	case 1:
			// 	// 		this.getClose();
			// 	// 		break;	
			// 	// 	case 0:
			// 	// 		this.getEnd();
			// 	// 		break;
			// 	// 	case 3:
			// 	// 		this.getlistCancel();
			// 	// 		break;			
			// 	// 	default:
			// 	// 		break;
			// 	// }
			// },
			// //终止
			// onAbort() {
			//     console.log("onAbort");
			// },
			//弹出框方法
			showDiv() { // 显示输入弹出框
				this.userFeedbackHidden = false;
			},
			hideDiv() { // 隐藏输入弹出框
				this.userFeedbackHidden = true;
			},
			submitFeedback() { // 提交反馈
 
				var that =this;
			   // 提交反馈内容
			   this.issubmit = true;
				console.log(that.feedbackContent);
				that.hideDiv();
				let code  = uni.getStorageSync("code");
				console.log("当前code："+code);
				if(that.issubmit){
					uni.request({
						url:that.$apiUrl+"work/cancel",
						method: "POST",
						dataType: JSON,
						data: {
							code:code,
							uid: that.user_uid,
							reason:that.feedbackContent
							
						},
						success(res) {
							console.log(res);
						},
						fail(res) {
							console.log(res);	
						}
					})
				}
			}
		},
		
		
		// onPullDownRefresh() {
		// 	this.getlistdata();
		// 	this.getClose();
		// 	this.getEnd();
		// 	this.getlistCancel();
		// 	console.log("下拉刷新");
		// },
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

<style scoped>
	view{
		line-height: 2.25 !important;
	}
	/* 输入提示框 */
	.popup_overlay {
	 
			position: fixed;
			top: 0%;
			left: 0%;
			width: 100%;
			height: 100%;
			background-color: black;
			z-index: 1001;
			-moz-opacity: 0.8;
			opacity: .80;
			filter: alpha(opacity=88);
		}
	 
		.popup_content {
			position: fixed;
			top: 50%;
			left: 50%;
			width: 520upx;
			height: 550upx;
			margin-left: -270upx;
			margin-top: -270upx;
			border: 10px solid white;
			background-color: white;
			z-index: 1002;
			overflow: auto;
			border-radius: 20upx;
		}
	 
		.popup_title {
			padding-top: 20upx;
			width: 480upx;
			text-align: center;
			font-size: 32upx;
		}
	 
		.popup_textarea_item {
			padding-top: 5upx;
			height: 240upx;
			width: 440upx;
			background-color: #F1F1F1;
			margin-top: 30upx;
			margin-left: 20upx;
		}
	 
		.popup_textarea {
			width: 410upx;
			font-size: 26upx;
			margin-left: 20upx;
		}
	 
		.popup_button {
			color: white;
			background-color: #4399FC;
			border-radius: 20upx;
		}
		button{
			-webkit-appearance:none;
			height: 26px !important;
			line-height: 42upx !important;
			color: #00abeb;
			font-size: 32upx;
		}
		button::after{
			border: none;
		}
</style>
