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
								<Settled :item="item" :index="index1" :btn="items.btn"></Settled>
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
						btn:[],
						loadtext: "上拉加载更多",
						list: []
					},
				],
			}
		},
		onLoad() {
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
			this.user_uid = uni.getStorageSync('user_uid');
			if(this.tabIndex == 0){
				this.getlistdata();
			}
		},
		//监听搜索框点击事件
		onNavigationBarSearchInputClicked() {
			// console.log("打开搜索页");
			uni.navigateTo({
				url: '../search/search',

			});
		},
		//监听原生标题导航按钮点击事件
		onNavigationBarButtonTap(e) {
			// console.log(JSON.stringify(e));
			switch (e.index) {
				case 1:
					uni.navigateTo({
						url: "../add-input/add-input",
					});
			}
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
					let obj = this.getlistdata();
					this.newslist[index].list.concat(obj);
					this.newslist[index].loadtext = "上拉加载更多";
				}, 1000)
			},
			//tabbar点击事件
			tabtap(index) {
				this.tabIndex = index;
				this.tabclick = index;
			},
			//滑动事件
			tabChange(e) {
				this.tabIndex = e.detail.current;
				
				if(this.tabclick != e.detail.current){
					this.tabclick =  e.detail.current;
					switch (this.tabIndex){
						case 0:
						this.getlistdata();
						// this.newslist[0].list = 
							break;
						default:
							break;
					}
				}else{
					console.log("取消多次请求");
				}
				

			},
			//拉去待上门数据
			getlistdata(){
				let phone = uni.getStorageSync('phone');
				let that = this;
				if(phone){
					uni.request({
						url:"https://applet.51tiaoyin.com/public/applet/work/been",
						method:"POST",
						dataType:JSON,
						data:{
							uid:this.user_uid
						},
						success(res) {
							console.log("待上门:"+res);
							console.log(res);
							const data = JSON.parse(res.data);
							console.log(data);
							if(data.code == 200){
								that.newslist[0].list = data.data;
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
			}
		}
	}
</script>

<style>
	view{
		line-height: 2.25;
	}
</style>
