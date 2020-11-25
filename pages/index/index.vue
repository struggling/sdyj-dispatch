<template>
	<view>
		<nav-head :address="address" :tabIndex="tabIndex" :notice="notice"  @openConfirm="openConfirm" @xuanzhong="xuanzhong"></nav-head>
		<!-- 动态数字角标提醒 -->
		<u-badge type="error" :count="beenlength"></u-badge>
		<u-badge type="error" :count="alreadylenth" :offset='offsetbadge'></u-badge>
		<!-- <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption"> -->
		<view class="content">
			<!-- 收索筛选框 -->
			<!-- <u-search placeholder="姓名,电话,地址" v-model="keyword" @search = 'orderSearch' @custom=" $u.debounce(orderSearch1, 1000)" margin="25upx 25upx 25upx 25upx" style="margin-top: 25upx;"></u-search> -->
			<block v-if="closesearch">
				<slFilter
				:themeColor="themeColor" 
				:menuList="menuList" 
				@result="result" 
				:ref="'slFilter'" 
				:reflexTitle="false" 
				@showtime1="showtime1">
				</slFilter>
			</block>	
			<!-- 列表 -->
			<view class="uni-tab-bar">
			<!-- <mescroll-uni ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption" :noMoreSize="1" > -->
				<swiper class="swiper-box" :style="{height:swiperheight+'px',background: '#F2F2F2'}"  :current="tabIndex" @change="tabChange">
					
					<swiper-item>
						<scroll-view  scroll-y="true" class="list" @scrolltolower="loadmore">
							<mescroll-uni ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption" :noMoreSize="1" >
								<template v-if="orderlist.length>0">
									<block v-for="(item,index) in orderlist" :key="index">
										<orderList :item="item" :index="index" :tool="tool"  @openModel="openModel"></orderList>
									</block>
								</template>
							
							<!-- nothing -->
								<template v-else >
									<noThing :styles="swiperheight"></noThing>
								</template>
							</mescroll-uni>
							<!-- 上拉加载 -->
							<!-- <load-more :loadtext="loadtext"></load-more> -->
						</scroll-view>
					</swiper-item>
					<swiper-item>
						<scroll-view  scroll-y="true" class="list" @scrolltolower="loadmore">
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
								<template v-if="beenlist.length>0">
									<block v-for="(item,index) in beenlist" :key="index">
										<Already :item="item" :index="index" :tool="tool" :jl="jl" @openModel="openModel" @deleteOrder="deleteOrder"></Already>
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
				<!-- </mescroll-uni> -->
			</view>
			
			
			<!-- model -->
			<u-modal v-model="show" :content="content" :async-close="true"  @confirm="confirm" ref="uModal"></u-modal>
			<!-- popup -->
			<!-- <u-popup v-model="showpopup" mode="center" border-radius="8" width="80%" ref="popup">
				<view>
					<view class="iconfont iconclose" style="text-align: right;font-size: 40upx;color: #CCCCCC;padding-right: 20upx;padding-top: 20upx;"
					 @tap="close"></view>
					<h2 style="text-align: center;font-size: 40upx;font-weight: bold;margin-top: 30upx;margin-bottom: 60upx;">温馨提示</h2>
					<p style="padding-left: 50upx;padding-right: 50upx;margin-bottom: 30upx;line-height: 1.8;">您已经成功参与抢单，该订单需要平台工作人员进行人工审核；审核通过后请到“订单”列表查看具体订单信息并且联系客户预约上门进行服务</p>
				</view>
			</u-popup> -->
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
			<view class="popup_overlay" :hidden="userFeedbackHidden" @tap = "hideDiv()"></view>
		</view>
		 <!-- </mescroll-body> -->
	</view>


</template>

<script>
	const Mock = require("../../common//mock.mp.js");
	import md5 from "../../common/md5.min.js";
	//引入小程序微信小程序JavaScriptSDK
	const QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
	var bmap = require('../../libs/bmap-wx.js');
	import loadMore from "../../components/common/load-more.vue";
	import addTip from "../../components/struggler-uniapp-add-tip/struggler-uniapp-add-tip";
	import noThing from "../../components/common/no-thing.vue";
	import orderList from "../../components/index/orderlist.vue";
	import Already from "../../components/index/already.vue";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollEmpty from '@/components/mescroll-uni/components/mescroll-empty.vue';
	import slFilter from '@/components/sl-filter/sl-filter.vue';
	import RenCalendar from '@/components/ren-calendar/ren-calendar.vue';
	import navHead from "../../components/index/nav-head.vue"
	export default {
		mixins: [MescrollMixin],
		components: {
			loadMore,
			addTip,
			noThing,
			orderList,
			Already,
			MescrollEmpty,
			slFilter,
			RenCalendar,
			navHead
		},
		data() {
			return {
				
				offsetbadge:[180,300],
				alreadylenth:0,
				beenlength:0,
				closesearch:true,
				userFeedbackHidden: true, // 默认隐藏
				feedbackContent: '' ,// 用户反馈内容
				town:"",
				mode:"range",
				noon:[
					"上午",
					"下午"
				],
				actimeIndex:0,
				noonIndex:0,
				selectnoon:0,
				acmin:true,
				actime:[
					"不限时",
					"2小时",
					"3小时",
					"4小时",
					"5小时",
					"6小时",
				],
				selectactime:1,
				selectdetaillist:[],
				rSelect: [],
				rSelect1: [],
				choseminmix:"choseminmix",
				starttext:"开始",
				showpopup:false,
				themeColor:"#0080ff",
				// filterResult: '',
				menuList: [
						{
					        'title': '服务类型',
					        'detailTitle': '请选择服务类型（可多选）',
					        'isMutiple': true,
					        'key': 'jobType',
					        'detailList': [
					            
					        ]
					    },
						{
						       'title': '时间筛选',
						       'detailTitle': '',
						       'isMutiple': true,
						       'key': 'jobType',
						       'detailList': [
						           
						       ]
						   },
						   {
						          'title': '审核状态',
						          'detailTitle': '请选择审核状态（单选）',
						          'isMutiple': true,
						          'key': 'jobType',
						          'detailList': [
									  {
										  'title': '审核中',
										  'value': '0'
									  },
									  {
										  'title': '审核未通过',
										  'value': '1'
									  }
						          ]
						      },
				],
				selectortype:[1,2,3],
				params: {	
							year: true,
							month: true,
							day: true,
							hour: false,
							minute: false,
						},
				showselector:false,
				showtime:false,
				showrili:false,
				keyword: '',
				upOption:{
					use:true,
					noMoreSize:2,

				},
				downOption:{
					auto:false,
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
				height: "155",
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
				
				orderlist: [],
				beenlist:[],
				alreadylist:[],
				page:1,
				istake:false
			}
		},
		onReady() {
		},
		  /* 监听方法  开始*/
		watch:{
			town(val){
				console.log(val,"监听方法");
				console.log(this.$background);
			},
			/* num(val){
				console.log(val,"监听方法");
			} */
			/* 也可以写成  上面是 es6 新大地写法，更方便整洁*/
			// num:function(val){
			// 	console.log(val,"监听方法");
			// }
		},
		onShow() {
			//检查登录授权
			this.getBeen();
			this.getAlready();
			//判断用户是否注册服务工种,获取缓存里面的值
			this.user_uid = uni.getStorageSync('uid');
			this.phone = uni.getStorageSync('phone');
			
			this.getWOrkstay(1,10);
			
				
				this.getInfo();
				
		
			// mock数据通知栏
			this.getNavbar();
			console.log("重新排序");
			// let promise = new Promise((resolve,reject)=>{
			// 	resolve('res')
			// 	reject('res')
			// });
			// promise.then(res=>{
			// 	this.checklogin();
			// }).then(res=>{
			// 	this.getLocationInfo();
			// }).then(res=>{
			// 	this.getWOrkstay();
			// })
		},
		
		watch:{
			beenlist(old,xin){
				this.beenlength = this.beenlist.length;
				console.log("监听beenlist长度",this.beenlength);
			},
			alreadylist(old,xin){
				this.alreadylenth = this.alreadylist.length;
				console.log("监听alreadylist长度",this.alreadylenth);
			}
		},
		
		computed:{

			//重新排序待派单订单
			// sortOrderlist(){
			// 	for (var i = 0; i < this.orderlist.length; i++) {
			// 		let location = this.orderlist[i].longitude;
			// 		let str1 = location.split(",")[0];
			// 		str1 = str1.substring(0,9);
			// 		let str2 = location.split(",")[1];
			// 		str2 = str2.substring(0,9);
			// 		var longitude = str1;
			// 		var latitude = str2;
			// 		let latitude1 = uni.getStorageSync("latitude");
			// 		let longitude1 = uni.getStorageSync("longitude");
			// 		var jl = this.countDistance(latitude1, longitude1, latitude, longitude);
			// 		jl = Math.floor(jl/1000 * 10) / 10;
			// 		// this.distance =this.distance.push(jl);
			// 		console.log("距离");
			// 		// console.log(this.distance);
			// 		this.orderlist[i].jl = jl;
					
			// 	}
			// 	function compare(property){
			// 	    return function(a,b){
			// 	        var value1 = a[property];
			// 	        var value2 = b[property];
			// 	        return value1 - value2;
			// 	    }
			// 	}
			// 	return this.orderlist.sort(compare('jl'));
			// 	console.log("排序");
			// 	console.log(this.orderlist.sort(compare('jl')));
			// },
			
		},
		
		onLoad(event) {
			// 检查登录是否过期
			this.getAuthorizeInfo();
			//获取用户信息
			wx.showShareMenu({
					withShareTicket:true,
					//设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
					menus:["shareAppMessage","shareTimeline"]
				})
			console.log("页面类型111111");
			console.log(this.menuList);
			let tabbar = event.e;
			console.log("传值e:");
			console.log(tabbar);
			this.tabIndex = tabbar;
			// this.checklogin();
			var that = this;
			console.log(this.beenlist.length,"待上门订单");
			// 获取scoll-view高度值
			uni.getSystemInfo({
				success: (res) => {
					// console.log(res.windowHeight);
					let height = res.windowHeight - uni.upx2px(516);
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
			// uni.$on('updatebadgecont',function(badgecont){
			//          console.log('监听到事件来自 update ，携带参数 msg 为：' + badgecont.badgecont);
			// 		 that.badgeconts++;
			// 		 that.tabIndex = 1;
			// 		 console.log(that.badgeconts);
			// });
			// this.selectdetaillist = this.menuList[0].detailList[0].title+',';
			uni.$on('updateorderlist',function(data){
			      console.log('监听到事件来自 updateorderlist ，携带参数 msg 为：' ,data.data);
				that.orderlist = data.data;
				console.log(that.orderlist);
			})
		   uni.$on('updatebeenlist',function(data){
				 console.log('监听到事件来自 updatebeenlist ，携带参数 msg 为：' ,data.data);
				that.orderlist = data.data;
				
			})
		  uni.$on('updateaddress',function(data){
				 console.log('监听到事件来自 updateaddress ，携带参数 msg 为：' ,data.msg);
				that.address = "未授权";
				console.log(that.address);
		  })
		},

		 
		methods: {
			//删除取消订单
			deleteOrder(index){
				//uid code
				let that = this;
				uni.showModal({
				    title: '提示',
				    content: '确认取消此订单吗？取消订单会影响个人信誉,降低平台对您派单量',
				    success: function (res) {
				        if (res.confirm) {
							let code = that.beenlist[index].code;//当前删除的订单号
							uni.setStorageSync("code",code);
							 console.log('用户点击确定'+code);
							// that.getlistCancel(code);
							that.showDiv();
							console.log("原因："+that.feedbackContent);
							uni.setStorageSync("cannelindex",index);
							console.log("删除后还有几条订单");
							console.log(that.beenlist.length);
							
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
				
			},
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
				if(that.feedbackContent){
					that.hideDiv();
					// let index = uni.getStorageSync("cannelindex");
					// that.beenlist.splice(index,1);
					that.getBeen();
					let code  = uni.getStorageSync("code");
					let index = uni.getStorageSync("cannelindex");
					console.log("当前code："+code);
					if(that.issubmit){
						this.$myRequest({
							url:'work/cancel',
							data:{
								code:code,
								uid: this.user_uid,
								reason:this.feedbackContent
							},
							methods:"POST"
							
						}).then(res=>{
						// 	console.log(res);
						// const data = JSON.parse(res.data);
							if(res.data.code == 200){
								console.log(res.data.msg);
								that.beenlist.splice(index,1);
							}else if(res.data.code == 300){
								console.log(res.data.msg);
						
							}else{
								console.log(res.data.msg)
							}
						})
				}else{
					that.hideDiv();
				}
				
				}
			},
			//拉去待上门订单
			getBeen(){
				let phone = true;
				let that = this;
				if(phone){
				this.$myRequest({
					url:'work/been',
					data:{
						uid:this.user_uid,
					},
					methods:"POST"
					
				}).then(res=>{
				// 	console.log(res);
				// const data = JSON.parse(res.data);
					if(res.data.code == 200){
						console.log(res.data.msg);
						this.beenlist = res.data.data;
						// this.mescroll.endSuccess();
					}else if(res.data.code == 300){
						console.log(res.data.msg);
						// this.mescroll.endSuccess();
						this.beenlist = [];
					}else{
						console.log(res.data.msg)
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
									url:"../register/register"
								})
					        } else if (res.cancel) {
					            console.log('用户点击取消');
								
					        }
					    }
					});
				}
			},
			//选择模式
			checkmode(){
				this.mode = "date";
				
			},
			checkmodes(){
				this.mode = "range";
			},
			//选择复合类型
			//选择上下午
			selectnoon1(index){
				this.noonIndex = index;
				this.selectnoon = index;
			},
			//选择时间分类服务
			selectactim(index) {
				this.actimeIndex= index;
				this.selectactime = index;
			},
			//选择类型服务
			selecttype1(e) {
				if (this.rSelect1.indexOf(e) == -1) {
					console.log(e) //打印下标
					this.rSelect1.push(e); //选中添加到数组里
					
					this.selectdetaillist.push(this.menuList[0].detailList[e].title);
					
				} else {
					this.rSelect1.splice(this.rSelect1.indexOf(e), 1); //取消
					this.selectdetaillist.splice(this.selectdetaillist.indexOf(e), 1); //取消
					// tthis.selectdetaillist.splice(this.selectdetaillist.indexOf(e), 1); //取消
				}
			},
			//获取选中属性的值
			
			//筛选复合类型
			changetype(e){
				console.log("选中类型有哪些");
				console.log(this.selectdetaillist);
				let typestring =this.selectdetaillist.toString();
				let str = uni.getStorageSync("type");
				if(typestring == ""){
					e.type = str.split(',');
					e.startDate = "";
					e.endDate = "";
					console.log("如果没有选择");
				}else{
					e.type = typestring;//选择类型
					console.log("如果有选择");
				}
				
				e.timesolt = this.selectactime;//时间段选择
				e.noon = this.selectnoon;//上下午选择
				console.log(e);
				
				let town = uni.getStorageSync("town");												
				this.$myRequest({
					url:'work/stay',
					data:{
						"town":town ,
						"genre": e.type,
						"uid": this.user_uid,
						"start_time":e.startDate,
						"end_time":e.endDate,
						"noon":e.noon,
						"duration":e.timesolt,
						"date":e.result,
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
						uni.showToast({
							title:"暂无相关订单"
						})
						// this.mescroll.endSuccess();
					}else{
						console.log(res.data.msg)
					}
				})
			},
			//打开时间
			showtime1(){
				this.showrili = true
				console.log('aaa');
			},
			//日历
			searchtime(){
				let str = uni.getStorageSync("type");
				let town = uni.getStorageSync("town");
				let type = str.split(",");
				this.$myRequest({
					url:'work/stay',
					data:{
						"town":town ,
						"genre": type,
						"uid": this.user_uid,
						"date":this.curDate
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
						uni.showToast({
							title:"暂无相关订单"
						})
						// this.mescroll.endSuccess();
					}else{
						console.log(res.data.msg)
					}
				})
			},
			onDayClick(data){
			    this.curDate = data.date;
				console.log(data);
				
			},
			//筛选类型
			result(val) {
				let that = this;
				console.log(JSON.stringify(val));
				this.filterResult = JSON.stringify(val, null, 2);
				let arr = JSON.parse(this.filterResult).jobType;
				let selecttype =  arr.toString();
				
				let str = uni.getStorageSync("type");
				if (str){
					// console.log("类型选择默认",str);
					let town = uni.getStorageSync("town");
					if(selecttype){
						selecttype = selecttype
					}else{
						selecttype = str
					}
					// console.log(selecttype,str);
					let lng = uni.getStorageSync('longitude');
					let lat = uni.getStorageSync('latitude');
					this.$myRequest({
						url:'work/stay',
						data:{
							"town":town ,
							"genre": selecttype,
							"uid": this.user_uid,
							"page":1,
							"pageSize":10,
							"lng":lng,
							"lat":lat
						},
						methods:"POST"
						
					}).then(res=>{
					// 	console.log(res);
					// const data = JSON.parse(res.data);
						if(res.data.code == 200){
							console.log(res.data.msg);
							// this.mescroll.endSuccess();
							this.orderlist = res.data.data.data;
										
						}else if(res.data.code == 300){
							console.log(res.data.msg);
							uni.showToast({
								icon:"none",
								title:"暂无相关订单"
							})
							// this.mescroll.endSuccess();
						}else{
							console.log(res.data.msg)
						}
					})
				}else if(!this.user_uid){
					uni.showModal({
					    title: '提示',
					    content: '请先登录后操作',
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
								uni.navigateTo({
									url:"../login/login"
								})
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}
				else{
					uni.showModal({
					    title: '提示',
					    content: '请先入驻师傅录后操作',
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
								uni.navigateTo({
									url:"../register/register"
								})
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}
				
			 },
			confirmtype(res){
				console.log(res);
				
			},
			confirmtime(res){
				console.log(res);
				let date = res.year+res.month+res.day;
				let str = uni.getStorageSync("type");
				let town = uni.getStorageSync("town");
				let type = str.split(",");
				console.log(this.keyword);
				this.$myRequest({
					url:'work/stay',
					data:{
						"town":town ,
						"genre": type,
						"uid": this.user_uid,
						"date":date
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
						uni.showToast({
							title:"暂无相关订单"
						})
						// this.mescroll.endSuccess();
					}else{
						console.log(res.data.msg)
					}
				})
			},
			//搜索
			orderSearch(){
				let str = uni.getStorageSync("type");
				let town = uni.getStorageSync("town");
				let type = str.split(",");
				console.log(this.keyword);
				this.$myRequest({
					url:'work/stay',
					data:{
						"town":town ,
						"genre": type,
						"uid": this.user_uid,
						"search":this.keyword
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
						uni.showToast({
							title:"暂无相关订单"
						})
						// this.mescroll.endSuccess();
					}else{
						console.log(res.data.msg)
					}
				})
			},
			//搜索
			orderSearch1(){
				console.log(this.keyword);
				if(this.keyword){
					let str = uni.getStorageSync("type");
					let town = uni.getStorageSync("town");
					let type = str.split(",");
					console.log(this.keyword);
					this.$myRequest({
						url:'work/stay',
						data:{
							"town":town ,
							"genre": type,
							"uid": this.user_uid,
							"search":this.keyword
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
							uni.showToast({
								title:"暂无相关订单"
							})
							// this.mescroll.endSuccess();
						}else{
							console.log(res.data.msg)
						}
					})
				}
				
			},
			//获取用户信息
			getInfo(){
				this.$myRequest({
					url:'user/getInfo',
					data:{},
					methods:"POST"
				}).then(res=>{
					console.log(res);
				// const data = JSON.parse(res.data);
					if(res.data.code == 200){
						console.log(res.data.msg);
						// this.data = res.data.data
						console.log("获取服务器类型数据");
						if(res.data.data.length==0){
							return
						}else{
							this.checklogin();
						}
						console.log(res.data.data.type);
						let type = res.data.data.type.split(',');
						
						let menuListItem = {
						    'title': '服务类型',
						    'detailTitle': '请选择服务类型（可多选）',
						    'isMutiple': true,
						    'key': 'jobType',
						    'detailList': []
						};
						for (var i = 0; i < type.length; i++) {
							let objitem = {
								title: 'new_1',
								value: 'new_1'
							};
							 objitem.title = type[i];
							 objitem.value = type[i];
							 menuListItem.detailList.push(objitem);
							 console.log("获取类型数据");
							 console.log(menuListItem.detailList);
						}
						menuListItem.detailList[0].title = "全部";
						menuListItem.detailList[0].value = "全部";
						this.menuList[0] = menuListItem;
						console.log("获取子节点方法");
						console.log(this.$refs.slFilter);
						if(this.$refs.slFilter){
							this.$refs.slFilter.resetMenuList(this.menuList)
						}
						
						this.selectortype = type;
						
						// console.log(this.selectortype);
					}else if(res.data.code == 300){
						console.log(res.data.msg);
				
					}else{
						console.log(res.data.msg)
					}
				})
			},

			//筛选搜索

			/*下拉刷新的回调 */
			downCallback() {
				// 这里加载你想下拉刷新的数据, 比如刷新轮播数据
				// loadSwiper();
				// this.getWOrkstay(1,10);
				this.mescroll.resetUpScroll();
				// console.log("moren下拉刷新222",this.tabIndex);
				// switch (this.tabIndex){
				// 	case 0:
				// 	console.log("moren下拉刷新");
				// 	this.mescroll.resetUpScroll();
				// 		break;
				// 	case 1:
				// 	this.getAlready();
				// 	this.mescroll.endSuccess()
				// 		break;
				// 	case 2:
				// 	this.getBeen();
				// 	this.mescroll.endSuccess()
				// 		break;
				// 	default:
				// 		break;
				//}
				// this.getBeen();
				
				// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				
				// this.getAlready();
			},
			upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				console.log(page,"页码");
				this.getWOrkstay(pageNum,pageSize);
			},
			
			// tabs通知swiper切换
			//tabbar点击事件
			xuanzhong(index) {
				this.tabIndex = index;
				console.log(index);
				// this.getWOrkstay();
				if(index ==1){
					this.closesearch = false;
				}
			},
			//滑动切换
			tabChange(e) {
				this.tabIndex = e.detail.current;
				if(e.detail.current == 0){
						// 检查登录是否过期
						// this.getAuthorizeInfo();
						this.getWOrkstay(1,10);
						this.closesearch = true;
						uni.getSystemInfo({
							success: (res) => {
								// console.log(res.windowHeight);
								let height = res.windowHeight - uni.upx2px(516);
								this.swiperheight = height;
								console.log(this.swiperheight);
							}
						});
				}
				
				if(e.detail.current == 1){
						
						this.getAlready();
						this.badgeconts = 0;
						this.closesearch = false;
						// 获取scoll-view高度值
						uni.getSystemInfo({
							success: (res) => {
								// console.log(res.windowHeight);
								let height = res.windowHeight - uni.upx2px(395);
								this.swiperheight = height;
								console.log(this.swiperheight);
							}
						});
				}
				if(e.detail.current == 2){
						this.getBeen();
						// this.$refs.popup.open();
						this.badgeconts = 0;
						this.closesearch = false;
						// 获取scoll-view高度值
						uni.getSystemInfo({
							success: (res) => {
								// console.log(res.windowHeight);
								let height = res.windowHeight - uni.upx2px(395);
								this.swiperheight = height;
								console.log(this.swiperheight);
							}
						});
				}
			},
			
			confirm() {
				this.show = false;
				if(!this.show){
					this.requestMsg();
				}
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
								console.log(res.data.msg);
								this.badgeconts++;
								this.orderlist.splice(index,1);
								this.show = true;
								this.takelist = res.data.data;
								// this.mescroll.endSuccess();
							}else if(res.data.code == 300){
								console.log(res.data.msg);
								// this.mescroll.endSuccess();
							}else{
								console.log(res.data.msg)
								uni.showModal({
								    title: '提示',
								    content: res.data.msg,
								    success: function (res) {
								        if (res.confirm) {
								            console.log('用户点击确定');
								        } else if (res.cancel) {
								            console.log('用户点击取消');
								        }
								    }
								});
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
									url:"../register/register"
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
			},
			
			
			//上拉加载
			loadmore() {
				
			},
			
			//获取待派单列表信息
			async getWOrkstay(pageNum,pageSize){
				let phone = uni.getStorageSync('phone');
				let lng = uni.getStorageSync('longitude');
				let lat = uni.getStorageSync('latitude');
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
							"genre": "",
							"uid": this.user_uid,
							"page":pageNum,
							"pageSize":pageSize,
							"lng":lng,
							"lat":lat
						},
						methods:"POST"
						
					}).then(res=>{
					// 	console.log(res);
					// const data = JSON.parse(res.data);
						if(res.data.code == 200){
							console.log(res.data.msg);
							// 接口返回的当前页数据列表 (数组)
							let curPageData = res.data.data.data; 
							// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
							let curPageLen = curPageData.length; 
							// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
							let totalPage = res.data.data.total; 
							if(pageNum == 1) this.orderlist = []; //如果是第一页需手动置空列表
							this.orderlist = this.orderlist.concat(curPageData); //追加新数据
							//方法一(推荐): 后台接口有返回列表的总页数 totalPage
							this.mescroll.endByPage(curPageLen, totalPage); 
							// this.mescroll.endSuccess();
							// this.orderlist = res.data.data;
										
						}else if(res.data.code == 300){
							console.log(res.data.msg);
							console.log("genghuan位置");
							uni.showToast({
								icon:"none",
								title:res.data.msg
							})
							this.mescroll.endErr()
							// this.mescroll.endSuccess();
							this.orderlist = [];
						}else{
							console.log(res.data.msg);
							this.mescroll.endErr()
						}
					})
				}else{
					let that  =this;
					let town = uni.getStorageSync("town");
					let lng = uni.getStorageSync('longitude');
					let lat = uni.getStorageSync('latitude');
					// this.mescroll.endSuccess();
					// console.log(cookie);

					// await this.getAllClass();
					this.$myRequest({
						url:'work/stay',
						data:{
							"town":town ,
							"uid": this.user_uid,
							"page":pageNum,
							"pageSize":pageSize,
							"lng":lng,
							"lat":lat
						},
						methods:"POST"
						
					}).then(res=>{
					// 	console.log(res);
					// const data = JSON.parse(res.data);
						if(res.data.code == 200){
							console.log(res.data.msg);
							// 接口返回的当前页数据列表 (数组)
							let curPageData = res.data.data.data; 
							// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
							let curPageLen = curPageData.length; 
							// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
							let totalPage = res.data.data.total; 
							if(pageNum == 1) this.orderlist = []; //如果是第一页需手动置空列表
							this.orderlist = this.orderlist.concat(curPageData); //追加新数据
							//方法一(推荐): 后台接口有返回列表的总页数 totalPage
							this.mescroll.endByPage(curPageLen, totalPage); 
							// this.mescroll.endSuccess();
							// this.orderlist = res.data.data;
						}else if(res.data.code == 300){
							console.log(res.data.msg);
							// this.mescroll.endSuccess();
							this.mescroll.endErr()
							uni.showToast({
								icon:"none",
								title:res.data.msg
							})
							// this.mescroll.endSuccess();
							this.orderlist = [];
						}else{
							this.mescroll.endErr()
							console.log(res.data.msg)
						}
					})
				}
				
			},
			
			
			//获取已抢单列表信息
			getAlready(){
				let str = uni.getStorageSync("type");
				let town = uni.getStorageSync("town");
				let uid = uni.getStorageSync("uid");
				let lng = uni.getStorageSync('longitude');
				let lat = uni.getStorageSync('latitude');
				if(uid){
					this.$myRequest({
						url:'work/already',
						data:{
							"town":town ,
							"uid":uid ,
							"genre": str,
							"status":0,
							"page":1,
							"pageSize":10,
							"lng":lng,
							"lat":lat
						},
						methods:"POST"
						
					}).then(res=>{
					// 	console.log(res);
					// const data = JSON.parse(res.data);
						if(res.data.code == 200){
							// 增加该类订单长度监听
							console.log(res.data.msg);
							this.alreadylist = res.data.data;
							this.alreadylenth = this.alreadylist.length;
							console.log(this.alreadylist.length,'审核列表长度');
							console.log("审核状态",res.data.data);
								if(res.data.data.length>0){
									this.orderlist = res.data.data;
									
									// console.log(this.orderlist.length,'审核列表长度');
									
								}else{
									uni.showToast({
										icon:"none",
										title:"暂无相关订单"
									})
									this.orderlist =[];
								}
							
								
						}else if(res.data.code == 300){
							console.log(res.data.msg);
							uni.showToast({
								title:"暂无相关订单"
							})
							this.orderlist =[];
						}else{
							console.log(res.data.msg)
						}
					})
				}else{
					uni.showModal({
					    title: '提示',
					    content: '请先登录后操作',
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
								uni.navigateTo({
									url:"../login/login"
								})
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}
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
						console.log("允许授权");
						that.getLocationInfo();
					},
					fail(){    // 拒绝授权
						console.log("拒绝授权");	
						that.openConfirm();
						that.address ="未授权";
						console.log("你拒绝了授权，无法获得周边订单信息");
						uni.showToast({
							title: '你拒绝了授权，无法获得周边订单信息',
							icon: 'none',
							duration: 2000
						})
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
						console.log("获取地理位置成功");
			    		console.log(res);
			    		console.log('当前位置的经度：' + res.longitude);
			    		console.log('当前位置的纬度：' + res.latitude);
			    		that.latitude = res.latitude;
			    		that.longitude = res.longitude;
			    		//注册页面经纬度缓存
			    		uni.setStorageSync('longitude', res.longitude);
			    		uni.setStorageSync('latitude', res.latitude);
			    		
			    		//腾讯地图
			    		that.getTxmap(res.latitude,res.longitude)
			    		
			    	},
			    	fail(res) {
						console.log("获取地理位置失败");
			    		console.log(res);
			    		
			    	}
			    });
			},
			
			// 再次获取授权
			// 当用户第一次拒绝后再次请求授权
			openConfirm(){
				let that = this;
				if(this.address != "未授权"){
					uni.chooseLocation({
						 type: 'gcj02',
						    success: function (res) {
						        console.log('当前位置的经度：' + res.longitude);
						        console.log('当前位置的纬度：' + res.latitude);
								uni.setStorageSync('longitude', res.longitude);
								uni.setStorageSync('latitude', res.latitude);
								//腾讯地图
								that.getTxmap(res.latitude,res.longitude)
						    }
					})
				}
				if(this.address =="未授权"){
					uni.showModal({
						title: '请求授权当前位置',
						content: '需要获取您的地理位置，请确认授权',
						success: (res)=> {
							if (res.confirm) {
								uni.openSetting({
								  success(res) {
									  console.log("授权返回");
								    console.log(res.authSetting)
									that.getLocationInfo();
								  },
								  // fail(res) {
									 //  that.address = "未授权"
								  // 	uni.showToast({
								  // 		title: '你拒绝了授权，无法获得周边订单信息',
								  // 		icon: 'none',
								  // 		duration: 2000
								  // 	})
								  // }
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
				}
			},
			
			//控件被下拉
			
			getAllClass(){
			    return new Promise((resolve, reject) => {
					
                resolve(this.checklogin());

			       
			    })
			},
			//封装百度地图调用api
			getbmap(la,lo){
				//百度地图
				let that = this;
				var BMap = new bmap.BMapWX({
					ak: 'q58GRKnjyQGGXI72GMdHKBBUaHEIKSyc'
				});
				BMap.regeocoding({
					location: la + "," + lo,
					// location:"116.409443,39.909843",
					success(res) {
						// console.log(res.wxMarkerData[0].address);
						const address = res.wxMarkerData[0].address.substring(3);
						// console.log(this);
						that.address = address;
						uni.setStorageSync('address', address);
						
					},
					fail(error) {
						console.log(error);
						console.log("失败");
					}
							    
				})
			},
			//封装腾讯逆地址解析
			getTxmap(la,lo){
				let qqmapsdk = new QQMapWX({
					key: 'E6FBZ-XLTWP-S7SDE-V435J-YVAAE-I2BAT'
				});
				let that = this;
				qqmapsdk.reverseGeocoder({
					location: {
						latitude: la,
						longitude: lo
					},
					success: (res) => {
						console.log("腾讯逆地址");
						console.log(res);
						
						that.address = res.result.formatted_addresses.recommend;
						uni.setStorageSync('address', that.address);
						const towns = res.result.address.indexOf("省");
						const shi = res.result.address.indexOf("市");
						console.log("省下表"+towns);
						console.log("市下表"+shi);
						const town = res.result.address.substring(towns+1,shi+1);
						console.log(town);
						that.town = town;
						uni.setStorageSync('town', town);
						that.getWOrkstay(1,10);
					}
				})
			}
		},
		
		//自定义分享页面
		onShareAppMessage(e){
			return {
				title: this.$overShare.title,
				path: this.$overShare.path,
				imageUrl:this.$overShare.imageUrl,
				desc:this.$overShare.imageUrldesc
			}
		},
		//分享到朋友圈
		onShareTimeline(res) {
			// let distSource = uni.getStorageSync('distSource');
			
				return {
					title: '欢迎使用xxx商城',
					type: 0,
					query: 'id=' + distSource,
					summary: "",
					imageUrl: "https://58d.oss-cn-hangzhou.aliyuncs.com/goods/ttg_1596073788000.png"
				}
		},
	}
</script>
<style>
	.swiper-box{
		padding-bottom: 40upx;
	}
	.u-search{
		margin-left: 25upx;
		margin-right: 25upx;
		padding-top: 25upx;
	}
	.shaixuan{
		display: flex;
		justify-content: space-between;
		/* margin-left: 25upx;
		margin-right: 25upx; */
		margin: 25upx;
	}
	.showselector{
		width: 20%;
		height: 60upx !important;
		
	}
	.showtime{
		width: 20%;
		height: 60upx !important;
	}
	button::after{
		border: none;
	}
	.u-size-default {
	    font-size: 30rpx;
	    height: 60rpx;
	    line-height: 80rpx;
	}
	
</style>
<style scoped>
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
			height: 242upx;
			width: 440upx;
			background-color: #F1F1F1;
			margin-top: 30upx;
			margin-left: 20upx;
		}
	 
		.popup_textarea {
			width: 410upx;
			font-size: 26upx;
			margin-left: 20upx;
			height:242upx;
		}
	 
		.popup_button {
			color: white;
			background-color: #4399FC;
			border-radius: 20upx;
		}
		button{
			-webkit-appearance:none;
			height: 26px !important;
			line-height: 56upx !important;
			color: #00abeb;
			font-size: 32upx;
			margin-top: 60upx;
		}
		button::after{
			border: none;
		}
	.acmin{
		color: #00ABEB;
	}
	.choseminmix{
		padding-top: 6upx;
		 padding-bottom: 6upx;
		 background: #ccc;
		 border-radius: 24upx;
		 margin-top: 5upx;
		 width: 150upx;
	}
	.content1{
		position: relative;
	}
	.signed{
		width: 115upx;
		height: 44upx;
		background: linear-gradient(90deg, #00ABEB, #54C3F1);
		border-radius: 22upx;
		position: absolute;
		top: 8px;
		right: 12px;
		text-align: center;
		line-height: 44upx;
		color: #ffffff;
		
	}
	/* u-search */
	
	/* 顶部导航栏自定义 */
	.slot-wrap {
		/* display: flex; */
		align-items: center;
		/* 如果您想让slot内容占满整个导航栏的宽度 */
		/* flex: 1; */
		/* 如果您想让slot内容与导航栏左右有空隙 */
		padding: 0 25rpx;
		color: #FFFFFF;
		margin-top: 2upx;
		font-size: 22upx;
		flex-direction: column;
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
		/* justify-content: space-between; */
		padding-left: 25upx;
		padding-right: 25upx;
		margin-top: 40upx;
		margin-bottom: 40upx;
		width: 600upx;
	}

	.tab-bar view {
		/* width: 340upx;
		height: 76upx; */
		/* background-color: #CCCCCC; */
		color: #FFFFFF;
		border-radius: 8upx;
		font-size: 40upx;
		/* font-weight: bold; */
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
