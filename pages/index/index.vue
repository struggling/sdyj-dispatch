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
							<template v-if="orderlist.length>0">
								<block v-for="(item,index) in orderlist" :key="index">
									<orderList :item="item" :index="index" :tool="tool" :jl="jl" @openModel="openModel"></orderList>
								</block>
							</template>
							<!-- nothing -->
							<template v-else>
								<noThing></noThing>
							</template>
							<!-- 上拉加载 -->
							<!-- <load-more :loadtext="loadtext"></load-more> -->
						</scroll-view>
					</swiper-item>
					<swiper-item>
						<scroll-view scroll-y class="list" @scrolltolower="loadmore" show-scrollbar="false">
							<template v-if="takelist.length>0">
								<block v-for="(item,index) in takelist" :key="index">
									<orderList :item="item" :index="index" :tool="tool" :jl="jl" @openModel="openModel"></orderList>
								</block>
							</template>
							<!-- nothing -->
							<template v-else>
								<noThing></noThing>
							</template>
							<!-- 上拉加载 -->
							<!-- <load-more :loadtext="loadtext"></load-more> -->
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
	import addTip from "../../components/struggler-uniapp-add-tip/struggler-uniapp-add-tip";
	import noThing from "../../components/common/no-thing.vue";
	import orderList from "../../components/index/orderlist.vue";
	import Already from "../../components/index/already.vue"
	export default {
		components: {
			loadMore,
			addTip,
			noThing,
			orderList,
			Already
		},
		data() {
			return {
				phone:1,
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
				orderlist: [],
				takelist:[],
				page:1
			}
		},
		onReady() {
		},
		onLoad() {
			// 检查登录是否过期
			var that = this;
			//检查登录授权
			this.checklogin();
			// 获取scoll-view高度值
			uni.getSystemInfo({
				success: (res) => {
					// console.log(res.windowHeight);
					let height = res.windowHeight - uni.upx2px(282);
					this.swiperheight = height;
					console.log(this.swiperheight);
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
							// console.log(this);
							that.address = address;
							uni.setStorageSync('address', address);
							// console.log(address);
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
			// mock数据通知栏
			this.getNavbar();
			//判断用户是否注册服务工种,获取缓存里面的值
			this.user_uid = uni.getStorageSync('user_uid');
			this.phone = uni.getStorageSync('phone');	
			console.log("uid的值:"+this.user_uid);
			// let isregister = true;
			//首页待派单订单请求
			this.getWOrkstay();
			this.getAlready();
			// if(phone){
				
			// }else{
			// 	console.log("打印假数据");
			// 	// let orderList = this.getmock();
			// 	console.log(orderList);
			// 	this.orderlist = orderList.orderlist.slice(0,4);
			// 	console.log("数据长度为："+this.orderlist.length);
			// }
			

		},
		onPullDownRefresh() {
			// this.getData();
			console.log("下拉刷新");
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
			},
			//上拉加载
			loadmore() {
				if (this.loadtext != "上拉加载更多") {
					return;
				}
				this.loadtext = "加载中...";
				console.log(this.loadtext);
				// 加载后端获取的数据
				let pagesize = 3
				let pagecount = this.orderlist.length/pagesize;
				this.page++;
				console.log("第几页："+this.page);
				//假数据
				let orderData = this.getmock();
				//真数据
				
				console.log("加载后端获取的数据");
				if(pagesize>orderData.orderlist.slice(pagesize*(this.page-1)+1,pagesize*this.page+1).length){
					this.loadtext = "暂无更多数据";
					console.log(this.loadtext);
					
				}else{
					let arr = orderData.orderlist.slice(pagesize*(this.page-1)+1,pagesize*this.page+1);
					console.log(arr);
					this.orderlist = this.orderlist.concat(arr);
					this.loadtext = "上拉加载更多";
					console.log(this.loadtext);
					// console.log(this.orderlist);
				}	
			},

			// model,发送抢单请求
			openModel(index) {
				let phone = uni.getStorageSync('phone');
				if (phone) {
					let indextag = true;
					if(indextag){
						indextag = false;
						uni.request({
							url:"https://applet.51tiaoyin.com/public/applet/work/take",
							method:"POST",
							dataType:JSON,
							data:{
								uid:this.user_uid,
								code:code,//订单编号
								WorkNautica:[this.longitude,this.latitude],
								phone:phone
							},
							success(res) {
								console.log(res);
								console.log("当前点击的为："+index);
								if(res.code = 200){
									//抢单成功体醒
									that.show = true;
									//删除该订单
									 that.orderlist.splice(index,1);
								}else{
									uni.showToast({
										title:"无网络!"
									})
								}
							},
							fail() {
								console.log(res);
							}
						})
					}
				} else {
					uni.showModal({
					    title: '提示',
					    content: '请先完成师傅服务类型注册，在抢单',
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
				let code  = this.orderlist[index].code;
				let that = this;
				//请求一次
				uni.showToast({
					title:indextag
				})
				let indextag = true;
				
				
			},
			//closemode
			close() {
				this.$refs.popup.close();
			},
			//openpage
			openWaitlist() {
				//判断用户类型值是否存在，
				//接受一个判断师傅类型的参数
				// const urlpath = "'../wait-list/wait-list'";
				// const ydurl = "../settlement/settlement";
				// const openurl = "";
				// this.istype ? openurl = urlpath : openurl = ydurl;
				// uni.navigateTo({
				// 	url: openurl,
				// })
				uni.request({
					url:"https://applet.51tiaoyin.com/public/applet/work/already",
					method:"GET",
					dataType:JSON,
					data:{
						uid:this.user_uid
					},
					success(res) {
						console.log("已抢单");
						console.log(res);
					},
					fail(res) {
						console.log(res);
					}
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
			},
			
			//获取通知栏信息
			getNavbar(){
				const Random = Mock.Random;
				Random.county();
				Random.cname();
				Random.city();
				Random.datetime();
				const data = Mock.mock({
					'list|3': [{
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
			},
			
			//获取待派单列表信息
			getWOrkstay(){
				let that  =this;
				uni.request({
					url: this.$apiUrl+"work/stay",
					method: "POST",
					dataType: JSON,
					data: {
						town: "成都",
						genre: ['日常保洁',"开荒保洁","上门除甲醛"],
						uid: this.user_uid
					},
					success(res) {
						console.log(res);
						const data = JSON.parse(res.data);
						console.log(data.data);
						if(data.code == 200){
							// console.log(res)
							that.orderlist = data.data;
							console.log("订单列表:");
							console.log(that.orderlist);
							//计算经纬度距离和循环遍历工具要求
							for (var i = 0; i < that.orderlist.length; i++) {
								var location = that.orderlist[i].longitude;
								console.log(location);
								var longitude = location.split(",")[0];
								var latitude = location.split(",")[1]
								var jl = that.countDistance(that.latitude, that.longitude, latitude, longitude);
								jl = Math.floor(jl/1000 * 10) / 10;
								that.jl = that.jl.concat(jl);
								console.log("距离");
								console.log(that.jl);
							}
						}else{
							console.log(res);
							uni.showToast({
								title:"无网络"
							})
						}
						
					},
					fail(err) {
						console.log(err);
					}
				})
			},
			
			
			//获取已抢单列表信息
			getAlready(){
				let that  =this;
				uni.request({
					url: this.$apiUrl+"work/already",
					method: "POST",
					dataType: JSON,
					data: {
						uid: this.user_uid
					},
					success(res) {
						console.log(res);
						const data = JSON.parse(res.data);
						console.log(data.data);
						if(data.code == 200){
							// console.log(res)
							that.takelist = data.data;
							console.log("已抢单订单列表:");
							console.log(that.takelist);
							//计算经纬度距离和循环遍历工具要求
							for (var i = 0; i < that.orderlist.length; i++) {
								var location = that.orderlist[i].longitude;
								console.log(location);
								var longitude = location.split(",")[0];
								var latitude = location.split(",")[1]
								var jl = that.countDistance(that.latitude, that.longitude, latitude, longitude);
								jl = Math.floor(jl/1000 * 10) / 10;
								that.jl = that.jl.concat(jl);
								console.log("距离");
								console.log(that.jl);
							}
						}else{
							console.log(res);
							uni.showToast({
								title:"无网络"
							})
						}
						
					},
					fail(err) {
						console.log(err);
					}
				})
			},
			
			//mock假数据
			getmock(){
				//如果用户没有注册使用假数据
				const Random = Mock.Random;
				Random.id();
				Random.county();
				Random.datetime()
				const orderData = Mock.mock({
						'orderlist|30-50': [{
							"Distance|1-100.2":1,
							"budget|100-500": 500,
							code: '@id()',
							"content|1": ["日常保洁","开荒保洁","上门除甲醛","家电维修"],
							delete: 0,
							destination: "",
							door_time: '@datetime()',
							duration: "时长：2小时",
							label: "扫把 毛巾 洗洁精 擦玻器 吸尘器 除胶剂",
							longitude: "120.17557880007,30.248398420426",
							"name|1": ["日常保洁","开荒保洁","上门除甲醛","家电维修"],
							origin: '@county(true)',
							send: "开发者",
							state: 1,
							tel: "181****8028",
							"type|1": ["日常保洁","开荒保洁","上门除甲醛","家电维修"],
							uid: 1
						}]
					}
				);
				return orderData
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

	
</style>
