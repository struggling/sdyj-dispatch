<template>
	<view>
		<swiperTabHead :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></swiperTabHead>
		<view class="uni-tab-bar">
			<swiper class="swiper-box" :style="{height:swiperheight+'px'}" :current="tabIndex" @change="tabChange">
				<swiper-item v-for="(items,index) in newslist" :key="index">
					<scroll-view scroll-y class="list" @scrolltolower="loadmore(index)">
						<!-- 图文列表 -->
						<template v-if="items.list.length>0">
							<block v-for="(item,index1) in items.list" :key="index1">
								<orderList :item="item" :index="index1"></orderList>
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
	import orderList from "../../components/index/order-list.vue";
	import swiperTabHead from "../../components/index/swiper-tab-head.vue";
	import loadMore from "../../components/common/load-more.vue";
	import noThing from "../../components/common/no-thing.vue";
	export default {
		components: {
			"orderList": orderList,
			"swiperTabHead": swiperTabHead,
			"loadMore": loadMore,
			"noThing": noThing,
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
				newslist: [{
						loadtext: "上拉加载更多",
						list: [{
								avatar: require("../../static/logo.png"),
								username: "昵称",
								isconcern: false,
								title: "我是标题",
								type: "img", //img图文，video视频
								titlepic: require("../../static/logo.png"),
								playnum: 200000,
								long: "2:47",
								infonum: {
									index: 0, //没有操作,
									smile: 11,
									angry: 11,
								},
								commentnum: 10,
								share: 10
							},
							{
								avatar: require("../../static/logo.png"),
								username: "昵称",
								isconcern: false,
								title: "我是标题",
								type: "video", //img图文，video视频
								titlepic: require("../../static/logo.png"),
								playnum: "20w",
								long: "2:47",
								infonum: {
									index: 1, //没有操作,
									smile: 11,
									angry: 11,
								},
								commentnum: 10,
								share: 10
							}
						]

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
					let obj = {
						avatar: require("../../static/logo.png"),
						username: "昵称",
						isconcern: false,
						title: "我是标题",
						type: "img", //img图文，video视频
						titlepic: require("../../static/logo.png"),
						playnum: 200000,
						long: "2:47",
						infonum: {
							index: 0, //没有操作,
							smile: 11,
							angry: 11,
						},
						commentnum: 10,
						share: 10
					};

					this.newslist[index].list.push(obj);
					this.newslist[index].loadtext = "上拉加载更多";
				}, 1000)

				// this.newslist[index].loadtext = "上拉加载更多"
				// this.newslist[index].loadtext = "上拉加载更多"
			},
			//tabbar点击事件
			tabtap(index) {
				this.tabIndex = index;
			},
			//滑动事件
			tabChange(e) {
				this.tabIndex = e.detail.current;
			}
		}
	}
</script>

<style>

</style>
