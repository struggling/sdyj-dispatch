<template>
	<view>
		<!-- 自定义导航栏 -->
		<u-navbar :is-back="false" title="接单池" :height="height" :background="background" title-color="#ffffff">
			<view class="slot-wrap" @tap="openConfirm">
				{{address}}
			</view>
		</u-navbar>
		<!-- 自定义收藏我的小程序 -->
		<add-tip :tip="tip" :duration="duration" />
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
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
				<swiper class="swiper-box" :style="{height:swiperheight+'px'}"  :current="tabIndex" @change="tabChange">
					
					<swiper-item>
						<scroll-view  scroll-y="true" class="list">
							<!-- <mescroll-uni ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption" > -->
								<template v-if="orderlist.length>0">
									<block v-for="(item,index) in orderlist" :key="index">
										<orderList :item="item" :index="index" :tool="tool"  @openModel="openModel"></orderList>
									</block>
								</template>
							
							<!-- nothing -->
								<template v-else>
									<noThing></noThing>
								</template>
							<!-- </mescroll-uni> -->
							<!-- 上拉加载 -->
							<!-- <load-more :loadtext="loadtext"></load-more> -->
						</scroll-view>
					</swiper-item>
					<swiper-item>
						<scroll-view  scroll-y="true" class="list"  >
							<!-- <template v-if="takelist.length>0">
								<block v-for="(item,index) in takelist" :key="index">
									<Already :item="item" :index="index" :tool="tool" :jl="jl" @openModel="openModel"></Already>
								</block>
							</template> -->
							<!-- nothing -->
							
							<!-- <mescroll-uni ref="mescrollRef1" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption" > -->
								<template v-if="takelist.length>0">
									<block v-for="(item,index) in takelist" :key="index">
										<Already :item="item" :index="index" :tool="tool" :jl="jl" @openModel="openModel"></Already>
									</block>
								</template>
							
							<!-- nothing -->
								<!-- <mescroll-empty v-if="orderlist.length==0" ></mescroll-empty> -->
								<template v-else>
									<noThing></noThing>
								</template>
							<!-- </mescroll-uni> -->
							<!-- 上拉加载 -->
							<!-- <load-more :loadtext="loadtext"></load-more> -->
						</scroll-view>
					</swiper-item>
					
				</swiper>
			</view>
			
			<!-- 动态数字角标提醒 -->
			<u-badge type="error" :count="badgeconts" style="position: absolute;top: 110upx;left: 720upx;"></u-badge>
			<!-- model -->
			<u-modal v-model="show" :content="content"></u-modal>
			<!-- popup -->
			<!-- <u-popup v-model="showpopup" mode="center" border-radius="8" width="80%" ref="popup">
				<view>
					<view class="iconfont iconclose" style="text-align: right;font-size: 40upx;color: #CCCCCC;padding-right: 20upx;padding-top: 20upx;"
					 @tap="close"></view>
					<h2 style="text-align: center;font-size: 40upx;font-weight: bold;margin-top: 30upx;margin-bottom: 60upx;">温馨提示</h2>
					<p style="padding-left: 50upx;padding-right: 50upx;margin-bottom: 30upx;line-height: 1.8;">您已经成功参与抢单，该订单需要平台工作人员进行人工审核；审核通过后请到“订单”列表查看具体订单信息并且联系客户预约上门进行服务</p>
				</view>
			</u-popup> -->
		</view>
		 </mescroll-body>
	</view>


</template>

<script>
	const Mock = require("../../common//mock.mp.js");
	import md5 from "../../common/md5.min.js";
	//引入小程序微信小程序JavaScriptSDK
	// const QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
	var bmap = require('../../libs/bmap-wx.js');
	import loadMore from "../../components/common/load-more.vue";
	import addTip from "../../components/struggler-uniapp-add-tip/struggler-uniapp-add-tip";
	import noThing from "../../components/common/no-thing.vue";
	import orderList from "../../components/index/orderlist.vue";
	import Already from "../../components/index/already.vue";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollEmpty from '@/components/mescroll-uni/components/mescroll-empty.vue';
	export default {
		mixins: [MescrollMixin],
		components: {
			loadMore,
			addTip,
			noThing,
			orderList,
			Already,
			MescrollEmpty
		},
		data() {
			return {
				upOption:{
					use:false
				},
				downOption:{
					auto:false,
					// empty:{
					//   use : true ,
					//   icon : null ,
					//   tip : "暂无相关数据",
					//   btnText : "",
					//   fixed: false,
					//   top: "100rpx",
					//   zIndex: 99
					// }
				},
				// distance:[],
				badgeconts:0,
				triggered: true,
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
					backgroundImage: "linear-gradient(90deg, #54C3F1, #00ABEB)",
				},
				user_uid: "",
				showpopup: false,
				show: false,
				content: '您已经成功参与抢单，该订单需要平台工作人员进行人工审核；审核通过后请到“订单”列表查看具体订单信息并且联系客户预约上门进行服务',
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
				page:1,
				istake:false
			}
		},
		onReady() {
		},
		
		onShow() {
			//检查登录授权
			// 检查登录是否过期
			// async function (){
				
			// }
			//判断用户是否注册服务工种,获取缓存里面的值
			this.user_uid = uni.getStorageSync('uid');
			this.phone = uni.getStorageSync('phone');
			this.getAuthorizeInfo();
			this.checklogin();
			setTimeout(()=>{
				uni.hideLoading({
					title:"加载中",
					duration:1500
				})
				this.getWOrkstay();
			},1500);
			
			console.log("重新排序");
			
		},
		
		computed:{
			//重新排序待派单订单
			sortOrderlist(){
				for (var i = 0; i < this.orderlist.length; i++) {
					let location = this.orderlist[i].longitude;
					let str1 = location.split(",")[0];
					str1 = str1.substring(0,9);
					let str2 = location.split(",")[1];
					str2 = str2.substring(0,9);
					var longitude = str1;
					var latitude = str2;
					let latitude1 = uni.getStorageSync("latitude");
					let longitude1 = uni.getStorageSync("longitude");
					var jl = this.countDistance(latitude1, longitude1, latitude, longitude);
					jl = Math.floor(jl/1000 * 10) / 10;
					// this.distance =this.distance.push(jl);
					console.log("距离");
					// console.log(this.distance);
					this.orderlist[i].jl = jl;
					
				}
				function compare(property){
				    return function(a,b){
				        var value1 = a[property];
				        var value2 = b[property];
				        return value1 - value2;
				    }
				}
				return this.orderlist.sort(compare('longitude'));
				console.log("排序");
				console.log(this.orderlist.sort(compare('longitude')));
			},
			
		},
		
		onLoad(event) {
			let tabbar = event.e;
			console.log(tabbar);
			this.tabIndex = tabbar;
			// this.checklogin();
			var that = this;
			
			// 获取scoll-view高度值
			uni.getSystemInfo({
				success: (res) => {
					// console.log(res.windowHeight);
					let height = res.windowHeight - uni.upx2px(300);
					this.swiperheight = height;
					console.log(this.swiperheight);
				}
			});
			
			// mock数据通知栏
			this.getNavbar();
			//判断用户是否注册服务工种,获取缓存里面的值
			// this.user_uid = uni.getStorageSync('uid');
			// this.phone = uni.getStorageSync('phone');
			// uni.setStorageSync("badgecont",this.badgecont);
			console.log("uid的值:"+this.user_uid);
			//加载mock假数据
			// let data = this.getmock();
			// this.orderlist = data.orderlist;
			// console.log(this.orderlist);
			this._freshing = false;
			uni.$on('updatebadgecont',function(badgecont){
			         console.log('监听到事件来自 update ，携带参数 msg 为：' + badgecont.badgecont);
					 that.badgeconts++;
					 that.tabIndex = 1;
					 console.log(that.badgeconts);
			});
			
		},
		// onPullDownRefresh() {
		// 	this.getWOrkstay();
		// 	this.getAlready();
		// 	console.log("下拉刷新");
		// },
		
		methods: {
			/*下拉刷新的回调 */
			downCallback() {
				// 这里加载你想下拉刷新的数据, 比如刷新轮播数据
				// loadSwiper();
				this.getWOrkstay();
				this.getAlready();
				// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				setTimeout(()=>{
					this.mescroll.endSuccess();
					// console.log('111');
				},1500)
			},
			
			// tabs通知swiper切换
			//tabbar点击事件
			xuanzhong(index) {
				this.tabIndex = index;
				console.log(index);
				// this.getWOrkstay();
			},
			//滑动切换
			tabChange(e) {
				this.tabIndex = e.detail.current;
				if(e.detail.current == 0){
						// this.getWOrkstay();
				}
				
				if(e.detail.current == 1){
						this.getAlready();
						// this.$refs.popup.open();
						this.badgeconts = 0;
				}
			},
			//上拉加载
			loadmore() {
				
			},

			// model,发送抢单请求
			openModel(index) {
				let phone = uni.getStorageSync('phone');
				console.log(phone);
				if (phone) {
					let indextag = true;
					if(indextag){
						indextag = false;
						this.istake = true;
						console.log(this.istake);
						let that = this;
						let code = that.orderlist[index].code;
						this.$myRequest({
							url:'work/take',
							data:{
								uid:this.user_uid,
								code:code,//订单编号
								WorkNautica:[this.longitude,this.latitude],
								phone:phone
							},
							methods:"POST"
							
						}).then(res=>{
							console.log(res);
						// const data = JSON.parse(res.data);
							if(res.data.code == 200){
								console.log(res.msg);
								this.badgeconts++;
								this.orderlist.splice(index,1);
								this.show = true;
								this.takelist = res.data.data;
								// this.mescroll.endSuccess();
							}else if(res.data.code == 300){
								console.log(res.msg);
								// this.mescroll.endSuccess();
							}else{
								console.log(res.msg)
							}
						})
						// uni.request({
						// 	url:this.$apiUrl+"work/take",
						// 	method:"POST",
						// 	dataType:JSON,
						// 	data:{
						// 		uid:this.user_uid,
						// 		code:code,//订单编号
						// 		WorkNautica:[this.longitude,this.latitude],
						// 		phone:phone
						// 	},
						// 	success(res) {
						// 		console.log(res);
						// 		console.log("当前点击的为："+index);
						// 		if(res.code = 200){
						// 			//抢单成功体醒
						// 			that.show = true;
						// 			//删除该订单
									
									
						// 			that.badgeconts++;
						// 			 that.orderlist.splice(index,1);
						// 		}else{
						// 			uni.showToast({
						// 				title:"无网络!"
						// 			})
						// 		}
						// 	},
						// 	fail() {
						// 		console.log(res);
						// 	}
						// })
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
					url:this.$apiUrl+"work/already",
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
			
			
			//计算距离
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
				this.$myRequest({
					url:'work/msg',
					data:{},
					methods:"GET"
					
				}).then(res=>{
				// 	console.log(res);
				// const data = JSON.parse(res.data);
					if(res.data.code == 200){
						console.log(res.data.msg);
						// this.mescroll.endSuccess();
						this.notice = res.data.data;
					}else if(res.data.code == 300){
						console.log(res.data.msg);
						// this.mescroll.endSuccess();
					}else{
						console.log(res.data.msg)
					}
				})
				// const Random = Mock.Random;
				// Random.county();
				// Random.cname();
				// Random.city();
				// Random.datetime();
				// const data = Mock.mock({
				// 	'list|3': [{
				// 		name: "@cname()",
				// 		city: '@city(true)',
				// 		"type|+1": [
				// 			"日常保洁",
				// 			"开荒保洁",
				// 			"上门除甲醛",
				// 			"上门维修",
				// 		]
				// 	}]
				// });
				// for (var i = 0; i < data.list.length; i++) {
				// 	var str = "恭喜--" + data.list[i].name + "--抢到" + data.list[i].city + "--" + data.list[i].type + "--订单";
				// 	this.notice.push(str);
				// }
			},
			
			//获取待派单列表信息
			async getWOrkstay(){
				let phone = uni.getStorageSync('phone');
				if(phone){
					// console.log("data里面的地理精度");
					// console.log(this.latitude);
					let that  =this;
					let str = uni.getStorageSync("type");
					let town = uni.getStorageSync("town");
					// this.mescroll.endSuccess();
					// console.log(cookie);
					let type = str.split(",");
					// await this.getAllClass();
					this.$myRequest({
						url:'work/stay',
						data:{
							"town":town ,
							"genre": type,
							"uid": this.user_uid,
						},
						methods:"POST"
						
					}).then(res=>{
					// 	console.log(res);
					// const data = JSON.parse(res.data);
						if(res.data.code == 200){
							console.log(res.data.msg);
							// this.mescroll.endSuccess();
							this.orderlist = res.data.data;
										
						}else if(res.data.code == 300){
							console.log(res.data.msg);
							// this.mescroll.endSuccess();
						}else{
							console.log(res.data.msg)
						}
					})
				}else{
					let that  =this;
					let town = uni.getStorageSync("town");
					// this.mescroll.endSuccess();
					// console.log(cookie);

					// await this.getAllClass();
					this.$myRequest({
						url:'work/stay',
						data:{
							"town":town ,
							"uid": this.user_uid,
						},
						methods:"POST"
						
					}).then(res=>{
					// 	console.log(res);
					// const data = JSON.parse(res.data);
						if(res.data.code == 200){
							console.log(res.data.msg);
							// this.mescroll.endSuccess();
							this.orderlist = res.data.data;
						}else if(res.data.code == 300){
							console.log(res.data.msg);
							// this.mescroll.endSuccess();
						}else{
							console.log(res.data.msg)
						}
					})
				}
				
				//这里只需要传入不同的接口地址就可以
				// console.log(res);

				// uni.request({
				// 	url: this.$apiUrl+"work/stay",
				// 	method: "POST",
				// 	dataType: JSON,
				// 	header:{
				// 		'content-type': 'application/x-www-form-urlencoded',
				// 		 'cookie':cookie//读取cookie
				// 	},
				// 	data: {
				// 		"town":town ,
				// 		"genre": type,
				// 		"uid": this.user_uid,
				// 		"token":token
				// 	},
				// 	success(res) {
				// 		console.log(res);
				// 		// uni.stopPullDownRefresh();
				// 		const data = JSON.parse(res.data);
				// 		console.log(data.data);
				// 		if(data.code == 200){
				// 			// console.log(res)
				
				// 			// that.mescroll.endSuccess();
				// 			that.orderlist = data.data;
				// 			// this.triggered = true;
				// 			console.log("订单列表:");
				// 			console.log(that.orderlist);
				// 			//计算经纬度距离和循环遍历工具要求
				// 			// for (var i = 0; i < that.orderlist.length; i++) {
				// 			// 	console.log("订单数据长度"+that.orderlist.length);
				// 			// 	var location = that.orderlist[i].longitude;
				// 			// 	// console.log(location);
				// 			// 	// let index = str .lastIndexOf(">")
				// 			// 	//客户距离
				// 			// 	let str1 = location.split(",")[0];
				// 			// 	str1 = str1.substring(0,9);
				// 			// 	let str2 = location.split(",")[1];
				// 			// 	str2 = str2.substring(0,9);
				// 			// 	console.log("str1-"+str1);
				// 			// 	var longitude = str1;
				// 			// 	var latitude = str2;
				// 			// 	//计算距离
				// 			// 	let latitude1 = uni.getStorageSync("latitude");
				// 			// 	let longitude1 = uni.getStorageSync("longitude");
				// 			// 	//我的距离
				// 			// 	console.log(that.latitude);
				// 			// 	console.log(that.longitude);
				// 			// 	console.log(latitude);
				// 			// 	console.log(longitude);
				// 			// 	var jl = that.countDistance(latitude1, longitude1, latitude, longitude);
				// 			// 	jl = Math.floor(jl/1000 * 10) / 10;
				// 			// 	that.jl = that.jl.concat(jl);
				// 			// 	console.log("距离");
				// 			// 	console.log(that.jl);
				// 			// }
				// 		}else if(data.code == 300){
				// 			uni.showToast({
				// 				title:"该地区没有相关工单"
				// 			})
				// 		}
				// 		else{
				// 			console.log(res);
				// 			uni.showToast({
				// 				title:"无网络"
				// 			})
				// 		}
						
				// 	},
				// 	fail(err) {
				// 		console.log(err);
				// 	}
				// })
			},
			
			
			//获取已抢单列表信息
			getAlready(){
				this.$myRequest({
					url:'work/already',
					data:{
						"uid": this.user_uid,
					},
					methods:"POST"
					
				}).then(res=>{
				// 	console.log(res);
				// const data = JSON.parse(res.data);
					if(res.data.code == 200){
						console.log(res.data.msg);
						this.takelist = res.data.data;
						// this.mescroll.endSuccess();
					}else if(res.data.code == 300){
						console.log(res.data.msg);
						// this.mescroll.endSuccess();
					}else{
						console.log(res.data.msg)
					}
				})
				// let that  =this;
				// uni.request({
				// 	url: this.$apiUrl+"work/already",
				// 	method: "POST",
				// 	dataType: JSON,
				// 	data: {
				// 		uid: this.user_uid
				// 	},
				// 	 success(res) {
				// 		console.log(res);
				// 		const data = JSON.parse(res.data);
				// 		console.log(data.data);
				// 		// uni.stopPullDownRefresh();
				// 		if(data.code == 200){
				// 			// console.log(res)
				// 			that.takelist = data.data;
				// 			// console.log("已抢单订单列表:");
				// 			// console.log(that.takelist);
				// 			// // var jl = await that.countDistance( 39.923423,116.368904,116.387271,39.922501);
				// 			// // console.log("距离"+jl);
				// 			// //计算经纬度距离
				// 			for (var i = 0; i < that.takelist.length; i++) {
				// 				console.log("订单数据长度"+that.takelist.length);
				// 				var location = that.takelist[i].longitude;
				// 				// console.log(location);
				// 				// let index = str .lastIndexOf(">")
				// 				//客户距离
				// 				let str1 = location.split(",")[0];
				// 				str1 = str1.substring(0,9);
				// 				let str2 = location.split(",")[1];
				// 				str2 = str2.substring(0,9);
				// 				console.log("str1-"+str1);
				// 				var longitude = str1;
				// 				var latitude = str2;
				// 				//计算距离
				// 				let latitude1 = uni.getStorageSync("latitude");
				// 				let longitude1 = uni.getStorageSync("longitude");
				// 				//我的距离
				// 				console.log(that.latitude);
				// 				console.log(that.longitude);
				// 				console.log(latitude);
				// 				console.log(longitude);
				// 				var jl = that.countDistance(latitude1, longitude1, latitude, longitude);
				// 				jl = Math.floor(jl/1000 * 10) / 10;
				// 				that.jl = jl;
				// 				console.log("距离");
				// 				console.log(that.jl);
				// 			}
				// 		}
				// 		else if(data.code == 300){
				// 			uni.showToast({
				// 				title:"无最新工单",
				// 				duration:2000
				// 			})
				// 		}
				// 		else{
				// 			console.log(res);
				// 			uni.showToast({
				// 				title:"无网络"
				// 			})
				// 		}
						
				// 	},
				// 	fail(err) {
				// 		console.log(err);
				// 	}
				// })
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
			},
			// 位置授权
			getAuthorizeInfo(){
				const that = this;
				uni.authorize({
					scope: 'scope.userLocation',
					success() { // 允许授权
						that.getLocationInfo();
					},
					fail(){    // 拒绝授权
						that.openConfirm();
						that.address ="未授权";
						console.log("你拒绝了授权，无法获得周边信息")
					}
				})
			},
			// 获取地理位置
			// 获取用户地理位置经纬都
			getLocationInfo(){
				let that  = this;
			    uni.getLocation({
			    	type: 'gcj02',
			    	isHighAccuracy:true,
			    	success(res) {
			    		console.log(res);
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
								const towns = res.wxMarkerData[0].address.indexOf("省");
								const shi = res.wxMarkerData[0].address.indexOf("市");
								console.log("省下表"+towns);
								console.log("市下表"+shi);
								const town = res.wxMarkerData[0].address.substring(towns+1,shi+1);
								console.log(town);
								uni.setStorageSync('town', town);
								// that.getWOrkstay();
			    			},
			    			fail(error) {
			    				console.log(error);
			    				console.log("失败");
			    			}
			    
			    		})
			    	},
			    	fail(res) {
			    		console.log(res);
			    		
			    	}
			    });
			},
			
			// 再次获取授权
			// 当用户第一次拒绝后再次请求授权
			openConfirm(){
				let that = this;
				uni.showModal({
					title: '请求授权当前位置',
					content: '需要获取您的地理位置，请确认授权',
					success: (res)=> {
						if (res.confirm) {
							uni.openSetting({
							  success(res) {
							    console.log(res.authSetting)
								// that.getLocationInfo();
							  }
							});// 打开地图权限设置
						} else if (res.cancel) {
							uni.showToast({
								title: '你拒绝了授权，无法获得周边信息',
								icon: 'none',
								duration: 1000
							})
						}
					}
				});
			},
			
			//控件被下拉
			
			getAllClass(){
			    return new Promise((resolve, reject) => {
					
                resolve(this.checklogin());

			       
			    })
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
	/* 数字角标 */
	.badge {
			background-color: blue;
			color: white;
			position: absolute;
			top: 200upx;
			right: 20upx;
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
		background: linear-gradient(90deg,  #54C3F1, #00ABEB);
	}

	uni-scroll-view .uni-scroll-view::-webkit-scrollbar {
		/* 隐藏滚动条，但依旧具备可以滚动的功能 */
		/* display: none */
	}

	/* xss中添加以下样式代码 */
	/*隐藏滚动条*/
	/* ::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	} */

	
</style>
