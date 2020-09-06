<template>
	<view>
		<!-- 自定义导航栏 -->
		<u-navbar :is-back="false" title="抢单池" :height="height" :background="background" title-color="#ffffff">
			<view class="slot-wrap">
				{{address}}
			</view>
		</u-navbar>
		<!-- 自定义收藏我的小程序 -->
		<add-tip :tip="tip" :duration="duration" />
		<view class="content">

			<!-- 地理位置 -->
			<!-- <view class="location theme">
				<span class="iconfont icondiliweizhi"></span>
				<span>仁寿县</span>
			</view> -->
			<!-- 滚动通知 -->
			<u-notice-bar mode="vertical" :list="notice" :duration="2500" bg-color="#E2F7FF" color="#010101"></u-notice-bar>
			<!-- 接单列表 -->
			<!-- 表头 -->
			<view class="tab-bar">
				<block v-for="(tab,index) in tabBars" :key="tab.id">
					<view :class="{active:tabIndex == index}" @tap="xuanzhong(index)">
						{{tab.name}}
					</view>
				</block>
			</view>
			<!-- 列表 -->
			<view class="uni-tab-bar">
				<swiper class="swiper-box" :style="{height:swiperheight+'px'}" :current="tabIndex" @change="tabChange">
					<swiper-item>
						<scroll-view scroll-y class="list" @scrolltolower="loadmore" show-scrollbar="false">
							<block v-for="(item,index) in orderlist" :key="index">
								<view class="orderlist">
									<view class="order-item">
										<view class="item-l">
											<view class="title">{{item.name}}<span>{{item.duration}}小时</span></view>
											<view class="address">{{item.origin}}</view>
											<view class="dtime">

												<view class="distance">距离：&lt {{jl[index]}}公里</view>
												<view class="vtime">上门时间：{{item.door_time}}</view>
											</view>
											<view class="tool">
												<block v-for="(items,index1) in tool" :key="index1">
													<view class="">{{items}}</view>
												</block>
												
											</view>
										</view>
										<view class="item-r">
											<view class="price">{{item.budget}}元</view>
											<view class="status theme" @tap="openModel">立即抢单</view>
										</view>
									</view>
								</view>
							</block>
							<!-- 上拉加载 -->
							<load-more :loadtext="loadtext"></load-more>
						</scroll-view>
					</swiper-item>
					<swiper-item>
						<scroll-view scroll-y class="list" @scrolltolower="loadmore" show-scrollbar="false">
							<block v-for="(item,index) in orderlist" :key="index">
								<view class="orderlist">
									<view class="order-item">
										<view class="item-l">
											<view class="title">{{item.type.id}}/{{item.type.childrentype}}/<span>{{item.time}}小时</span></view>
											<view class="address">{{item.address}}</view>
											<view class="distance">距离：&lt {{item.distance}}公里</view>
											<view class="tool">
												<span>{items}</span>
											</view>
											<view class="vtime">上门时间：{{item.vtime}}</view>
										</view>
										<view class="item-r">
											<view class="img">
												<image src="../../static/logo.png" mode=""></image>
											</view>
											<view class="price">{{item.price}}元</view>
											<view class="status" @tap="openWaitlist">平台审核中</view>
										</view>
									</view>
								</view>
							</block>
							<!-- 上拉加载 -->
							<load-more :loadtext="loadtext"></load-more>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>
			<!-- model -->
			<u-modal v-model="show" :content="content"></u-modal>
			<!-- popup -->
			<u-popup v-model="showpopup" mode="center" border-radius="8" width="80%" ref="popup">
				<view>
					<view class="iconfont iconclose" style="text-align: right;font-size: 40upx;color: #CCCCCC;padding-right: 20upx;padding-top: 20upx;"
					 @tap="close"></view>
					<h2 style="text-align: center;font-size: 40upx;font-weight: bold;margin-top: 30upx;margin-bottom: 60upx;">温馨提示</h2>
					<p style="padding-left: 50upx;padding-right: 50upx;margin-bottom: 30upx;line-height: 1.8;">您已经成功参与抢单，该订单需要平台工作人员进行人工审核；审核通过后请到“订单”列表查看具体订单信息并且联系客户预约上门进行服务</p>
				</view>
			</u-popup>
		</view>
	</view>


</template>

<script>
	const Mock = require("../../common//mock.mp.js");

	//引入小程序微信小程序JavaScriptSDK
	// const QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
	var bmap = require('../../libs/bmap-wx.js');
	import loadMore from "../../components/common/load-more.vue";
	import addTip from "../../components/struggler-uniapp-add-tip/struggler-uniapp-add-tip"
	export default {
		components: {
			loadMore,
			addTip
		},
		data() {
			return {
				tool:[],
				jl:[],
				latitude: '',
				longitude: "",
				tip: "点击「添加小程序」，下次访问更便捷",
				duration: 1,
				istype: "",
				address: "当前位置",
				height: "",
				background: {
					backgroundImage: "linear-gradient(90deg, #00ABEB, #54C3F1)",
				},
				user_uid: "",
				showpopup: false,
				show: false,
				content: '恭喜您抢单成功，请前往已抢单界面查看详情！',
				loadtext: "上拉加载更多",
				notice: [],
				swiperheight: 500,
				tabIndex: 0,
				tabBars: [{
						name: "待抢单",
						id: "daiqiangdan"
					},
					{
						name: "已抢单",
						id: "yiqiangdan"
					},

				],
				orderlist: [

				],
			}
		},
		onReady() {


		},
		onLoad() {
			// 检查登录是否过期
			var that = this;
			uni.checkSession({
					success: (res) => {
						if (res.errMsg == 'checkSession:ok') {
							console.log(res);
							console.log('登录暂未过期');
							console.log(uni.getStorageSync('user_uid'));
							this.user_uid = uni.getStorageSync('user_uid')
						}
					},
					fail: (err) => {
						//过期的话调用接口
						uni.showModal({
							cancelText: '取消',
							confirmText: '确定',
							title: '登录已过期,请重新登录',
							success: (res) => {
								if (res.confirm) {
									uni.showLoading({
										mask: true,
										title: '登录中...'
									})
								}
								uni.login({
									provider: 'weixin',
									success: (res) => {
										console.log(res);
										uni.request({
											url: "https://applet.51tiaoyin.com/public/applet/",
											method: "GET",
											data: {
												"code": res.code
											},
											success(res) {
												console.log(res);
												if (res.code = 300) {
													uni.showToast({
														title: "未登录",
													})
													uni.reLaunch({
														url: "../login/login"
													})
												}
												//用户已登录
												if (res.code = 200) {
													uni.showToast({
														title: "请授权登录",
													})
												}
											}
										})
									}
								})
							}
						});
					},
				}),
				// 获取scoll-view高度值
				uni.getSystemInfo({
					success: (res) => {
						console.log(res.windowHeight);
						let height = res.windowHeight - uni.upx2px(50);
						this.swiperheight = height;
					}
				});
			// 获取用户地理位置经纬都
			uni.getLocation({
				type: 'gcj02',
				success(res) {
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude);
					that.latitude = res.latitude;
					that.longitude = res.longitude;
					//注册页面经纬度缓存
					uni.setStorageSync('longitude', res.longitude);
					uni.setStorageSync('latitude', res.latitude);
					//百度地图
					var BMap = new bmap.BMapWX({
						ak: 'q58GRKnjyQGGXI72GMdHKBBUaHEIKSyc'
					});
					BMap.regeocoding({
						location: res.latitude + "," + res.longitude,
						// location:"116.409443,39.909843",
						success(res) {
							// console.log(res.wxMarkerData[0].address);
							const address = res.wxMarkerData[0].address.substring(3);
							console.log(this);
							that.address = address;

						},
						fail(error) {
							console.log(error);
							console.log("失败");
						}

					})
				},
				fail() {
					uni.showToast({
						title: "拒绝获取当前位置"
					})
					console.log("位置获取失败");
				}
			});

			// mock数据
			const Random = Mock.Random;
			Random.county();
			Random.cname();
			Random.city();
			Random.datetime();
			const data = Mock.mock({
				'list|5-20': [{
					name: "@cname()",
					city: '@city(true)',
					"type|+1": [
						"日常保洁",
						"开荒保洁",
						"上门除甲醛",
						"上门维修",
					]
				}]

			});
			for (var i = 0; i < data.list.length; i++) {
				var str = "恭喜--" + data.list[i].name + "--抢到" + data.list[i].city + "--" + data.list[i].type + "--订单";
				this.notice.push(str);
			}
			console.log(this.notice);
			const orderData = Mock.mock({
					'orderlist|3': [{
						"time|1-10": 10,
						"price|100-600": 600,
						address: "@county(true)",
						"distance|1-10.1": 1,
						vtime: "@datetime()",
						loadtext: "上拉加载更多",
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
								"childrentype|1": [
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
						"tool|1-3": [{
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
						}]
					}]
				}

			);
			console.log(orderData);
			//判断用户是否注册服务工种,获取缓存里面的值
			let isregister = true;
			if (isregister) {
				uni.request({
					//首页待派单订单请求
					url: "https://applet.51tiaoyin.com/public/applet/work/stay",
					method: "POST",
					dataType: JSON,
					data: {
						town: "杭州",
						genre: "日常保洁",
						uid: this.user_uid
					},
					success(res) {
						const data = JSON.parse(res.data);
						console.log(data.data);
						// console.log(res)
						that.orderlist = data.data;
						console.log(that.orderlist);
						for (var i = 0; i < that.orderlist.length; i++) {
							console.log(111);
							var location = that.orderlist[i].longitude;
							var tool = that.orderlist[i].label.split(" ");
							console.log(location);
							var longitude = location.split(",")[0];
							var latitude = location.split(",")[1]
							var jl = that.countDistance(that.latitude, that.longitude, latitude, longitude);
							   jl = Math.floor(jl/1000 * 10) / 10;
							   that.jl.push(jl);
							   that.tool.push(tool);
							console.log(that.jl);
							console.log(that.tool);
							
						}
					},
					fail(err) {
						console.log(err);
					}
				})
			} else {
				this.orderlist = orderData.orderlist;
			}

		},
		onPullDownRefresh() {
			this.getData();
			console.log("xiala");
		},
		methods: {
			// tabs通知swiper切换
			//tabbar点击事件
			xuanzhong(index) {
				this.tabIndex = index;
				console.log(index);
			},
			//滑动切换
			tabChange(e) {
				this.tabIndex = e.detail.current;
				if (this.tabIndex == 1) {
					this.showpopup = true
				}
			},
			//上拉加载
			loadmore() {
				if (this.loadtext != "上拉加载更多") {
					return;
				}
				this.loadtext = "加载中...";
				console.log(this.loadtext);
				// 加载后端获取的数据
				for (var i = 0; i < 5; i++) {
					const orderData = Mock.mock({
							'orderlist|3': [{
								"time|1-10": 10,
								"price|100-600": 600,
								address: "@county(true)",
								"distance|1-10.1": 1,
								vtime: "@datetime()",
								loadtext: "上拉加载更多",
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
										"childrentype|1": [
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
								"tool|1-3": [{
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
								}]
							}]
						}

					);
					const morelist = this.orderlist.concat(orderData.orderlist);
					this.orderlist = morelist;
				}
				console.log("加载后端获取的数据");

				this.loadtext = "暂无更多数据";
				console.log(this.loadtext);
			},
			//下拉刷新获取数据
			getData() {
				const orderData = Mock.mock({
						'orderlist|3': [{
							"time|1-10": 10,
							"price|100-600": 600,
							address: "@county(true)",
							"distance|1-10.1": 1,
							vtime: "@datetime()",
							loadtext: "上拉加载更多",
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
									"childrentype|1": [
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
							"tool|1-3": [{
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
							}]
						}]
					}

				);
				const morelist = orderData.orderlist;
				this.orderlist = morelist;
				console.log("xialashuju");
				uni.stopPullDownRefresh();
			},
			// model
			openModel() {
				this.show = true;
				uni.navigateTo({
					url: "../settlement/settlement",
					//"../wait-list/wait-list?latitude="+this.latitude+"&longitude"+
				})
			},
			//closemode
			close() {
				this.$refs.popup.close();
			},
			//openpage
			openWaitlist() {
				//判断用户类型值是否存在，
				//接受一个判断师傅类型的参数
				const urlpath = "'../wait-list/wait-list'";
				const ydurl = "../settlement/settlement";
				const openurl = "";
				this.istype ? openurl = urlpath : openurl = ydurl;
				uni.navigateTo({
					url: openurl,
				})

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
			}
		}
	}
</script>

<style scoped>
	/* 顶部导航栏自定义 */
	.slot-wrap {
		display: flex;
		align-items: center;
		/* 如果您想让slot内容占满整个导航栏的宽度 */
		/* flex: 1; */
		/* 如果您想让slot内容与导航栏左右有空隙 */
		padding: 0 25rpx;
		color: #FFFFFF;
		margin-top: 2upx;
		font-size: 22upx;
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	/* content */
	.content {}

	/* < 地理位置 */
	.location {
		background-color: #f85f31;
		width: 100%;
		height: 51upx;
		color: #FFFFFF;
		padding-left: 25upx;
		padding-right: 25upx;
	}

	.location .icondiliweizhi {
		font-size: 28upx;
		padding-right: 10upx;
	}

	/* tabs */
	.tab-bar {
		display: flex;
		justify-content: space-between;
		padding-left: 25upx;
		padding-right: 25upx;
		margin-top: 40upx;
		margin-bottom: 40upx;
	}

	.tab-bar view {
		width: 340upx;
		height: 76upx;
		background-color: #CCCCCC;
		color: #FFFFFF;
		border-radius: 8upx;
		font-size: 40upx;
		font-weight: bold;
		line-height: 76upx;
		text-align: center;
	}

	.tab-bar .active {
		background: linear-gradient(90deg, #00ABEB, #54C3F1);
	}

	uni-scroll-view .uni-scroll-view::-webkit-scrollbar {
		/* 隐藏滚动条，但依旧具备可以滚动的功能 */
		display: none
	}

	/* xss中添加以下样式代码 */
	/*隐藏滚动条*/
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

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

	.order-item .item-l .title {
		font-weight: bold;
		font-size: 32upx;
		margin-bottom: 30upx;
		color: #101D37;
	}

	.order-item .item-l .address {

		font-size: 20upx;
		color: #969CA8;
		margin-bottom: 30upx;
		font-weight: bold;
	}

	.order-item .dtime {
		display: flex;
	}

	.order-item .item-l .distance {
		font-size: 20upx;
		color: #00ABEB;
		margin-bottom: 30upx;
		font-weight: bold;
	}

	.order-item .item-l .tool {
		font-size: 20upx;
		color: #3072F6;
		margin-bottom: 30upx;
		font-weight: bold;
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

	.order-item .item-l .vtime {
		color: #3072F6;
		font-weight: bold;
		font-size: 18upx;
		margin-left: 25upx;

	}

	.order-item .item-r {
		display: flex;
		flex-direction: column;
		text-align: center;
		width: 220upx;
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
		margin-top: 20upx;
		margin-bottom: 20upx;
	}

	.order-item .item-r .status {
		height: 42upx;
		line-height: 42upx;
		font-size: 28upx;
		font-weight: bold;
		color: #FFFFFF;
		background-color: #FA5741;
		border-radius: 20upx;
		padding: 0 30upx;
		margin-top: 89upx;
	}

	.success {
		background-color: #FA5741;
	}

	.fail {
		background-color: #cccccc;
	}
</style>
