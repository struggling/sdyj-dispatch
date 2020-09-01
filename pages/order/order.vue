<template>
	<view>
		<swiperTabHead :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></swiperTabHead>
		<view class="uni-tab-bar">
			<swiper class="swiper-box" :style="{height:swiperheight+'px'}" :current="tabIndex" @change="tabChange">
				<swiper-item v-for="(items,index) in newslist" :key="index">
					<scroll-view scroll-y class="list" @scrolltolower="loadmore(index)">
						<!-- 待上门订单列表 -->
						<template v-if="items.list.length>0">
							<block v-for="(item,index1) in items.list" :key="index1">
								<Settled :item="item" :index="index1"></Settled>
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
				swiperheight: 500,
				tabIndex: 0,
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
						loadtext: "上拉加载更多",
						list: []

					},
					{
						loadtext: "上拉加载更多",
						list: []
					},
					{
						loadtext: "上拉加载更多",
						list: []
					},
					{
						loadtext: "上拉加载更多",
						list: []
					},
					{
						loadtext: "上拉加载更多",
						list: []
					},
					{
						loadtext: "上拉加载更多",
						list: []
					},
				],
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					// console.log(res.windowHeight);
					let height = res.windowHeight - uni.upx2px(100);
					this.swiperheight = height;
				}
			});
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
					let obj = this.getlistdata();;

					this.newslist[index].list.concat(obj);
					this.newslist[index].loadtext = "上拉加载更多";
				}, 1000)

				// this.newslist[index].loadtext = "上拉加载更多"
				// this.newslist[index].loadtext = "上拉加载更多"
			},
			//tabbar点击事件
			tabtap(index) {
				this.tabIndex = index;
				this.getlistdata();
			},
			//滑动事件
			tabChange(e) {
				this.tabIndex = e.detail.current;
				this.getlistdata();
			},
			getlistdata(){
				const Random = Mock.Random;
				Random.county();
				Random.cname();
				Random.city();
				Random.datetime();
				const orderData = Mock.mock({
						'orderlist|3': [{
							"time|1-10": 10,
							"price|100-600": 600,
							address: "@county(true)",
							"distance|1-10.1": 1,
							vtime: "@datetime()",
							loadtext:"上拉加载更多",
							"type|1": [{
									"id|1": "家政服务",
									"childrentype|1": [
										"日常保洁",
										"开荒保洁",
										"地板养护",
										"空气检测",
										"甲醛治理",
										"沙发清洗",
										"窗帘清洗",
										"收纳师",
										"保姆",
										"月嫂",
										"做饭阿姨",
										"上门除螨",
										"消毒服务"
									]
								},
								{
									"id|1": "清洗服务",
									"childrentype|1":[
										"油烟机清洗",
										"洗衣机清洗",
										"冰箱清洗",
										"热水器清洗",
										"饮水机清洗",
										"燃气罩清洗",
										"电风扇清洗",
										"微波炉清洗",
										"沙发清洗",
										"窗帘清洗",
									]
								},
								{
									"id|1": "安装维修",
									"childrentype|1": [
										"家电维修",
										"锁具安装",
										"管道疏通",
										"卫浴维修",
										"开锁换锁",
										"壁纸壁画",
										"地板安装",
										"五金安装",
										"卫浴安装",
										"家具安装",
										"家具维修",
									]
								},
								{
									"id|1": "搬运搬家",
									"childrentype|1": [
										"钢琴搬运",
										"家庭搬家",
										"企业搬家",
										"车辆托运",
									]
								},
								{
									"id|1": "乐器维修",
									"childrentype|1": [
										"钢琴调音",
										"钢琴维修",
										"电子琴维修",
										"古筝调音",
										"古筝维修",
										"吉他维修",
										"风琴维修",
									]
								},
								{
									"id|1": "房屋装修",
									"childrentype|1": [
										"水电工",
										"油漆工",
										"木工",
										"拆墙工",
										"水暖工",
										"泥水工",
										"防水工",
										"力工",
										"打孔",
										"安装工",
									]
								},
							],
							 "tool|1-3": [
							    {
							      "name|+1": [
							        '毛巾',
							        '托帕',
							        '扳手大锤',
							        '梯子',
							        '掸子',
							        '铲刀',
							        '涂水',
							        '擦地拖地器具',
							        '吸尘吸水器具',
							        '刮子',
							        '加长杆'
							      ]
							    }
							  ]
						}]
					}
				
				);
				this.newslist[0].list = orderData.orderlist;
				console.log(this.newslist[0].list );
			}
		}
	}
</script>

<style>
	view{
		line-height: 2.25;
	}
</style>
