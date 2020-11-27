<template>
	<view>
		<view class="bghome">
			<image src="http://7n.51tiaoyin.com/%E6%A4%AD%E5%9C%86%E5%BD%A2%20%2B%20%E6%A4%AD%E5%9C%86%E5%BD%A2%E5%A4%87%E4%BB%BD%20%E8%92%99%E7%89%88%402x.png" mode=""></image>
		</view>
		<view class="dingwei">
			<view class="pannel" style="background:none!important;box-shadow: none;">
				<view class="item" style="margin-bottom: 0;" @tap="openinfo">
					 <image :src="user_avatar" style="border-radius: 100%;" mode=""></image>
					 <view class="text" style="font-size:44upx;padding-right: 40upx;text-overflow: ellipsis;white-space: nowrap;width: 482upx;color: #FFFFFF;">{{user_name}}</view>
					<u-icon name="arrow-right" color="#ffffff" size="40" margin-right="100upx"></u-icon>
				</view>
			</view>
			 <view class="zhuanqian">
				 <view class="text">我已经赚了</view>
				 <view class="jine">{{total_amount}}</view>
				 <view class="tips">只包含已结算订单，未结算和已取消订单不纳</view>
				 <view class="chakan" @tap="openmydata">查看明细</view>
			 </view>
			 <view class="pannel" >
				 <view class="item" @tap="openinfo">
					 <image src="http://7n.51tiaoyin.com/Group%203%402x.png" mode=""></image>
					 <view class="text" >个人信息</view>
					<u-icon name="arrow-right" color="#666666" size="28"></u-icon>
				 </view>
				 <view class="item" @tap="showpopup=true">
				 					 <image src="http://7n.51tiaoyin.com/20201103102653.png" mode=""></image>
				 					 <view class="text" >积分签到</view>
				 					<u-icon name="arrow-right" color="#666666" size="28"></u-icon>
				 </view>
				<!-- <view class="item" @tap="tomypoints">
					 <image src="../../static/home1.png" mode=""></image>
					 <view class="text" >我的积分</view>
					<u-icon name="arrow-right" color="#666666" size="28"></u-icon>
				 </view> -->
				 <view class="item" @tap="topointsmall">
					 <image src="http://7n.51tiaoyin.com/Group%203%402x%20%281%29.png" mode=""></image>
					 <view class="text" >积分商城</view>
					<u-icon name="arrow-right" color="#666666" size="28"></u-icon>
				 </view>
				 <view class="item" @tap="openset">
					 <image src="http://7n.51tiaoyin.com/Group%402x.png" mode=""></image>
					 <view class="text" >账号设置</view>
					<u-icon name="arrow-right" color="#666666" size="28"></u-icon>
				 </view>
				 <view class="item" @tap="openmask=true">
					 <image src="http://7n.51tiaoyin.com/Group%204%402x.png" mode=""></image>
					 <view class="text" >售后客服</view>
					<u-icon name="arrow-right" color="#666666" size="28"></u-icon>
				 </view>
				 
			 </view>
		 </view>
		<!-- class="iconfont icongerenxinxi"  class="iconfont icongonghao" class="iconfont iconshijian" class="iconfont iconpingfen" class="iconfont iconxinxi" class="iconfont iconshezhi"-->
		<!-- 时间选择器 -->
		<!-- <u-picker mode="time" v-model="showtime" :params="params"></u-picker> -->
		<u-select v-model="showtime" mode="mutil-column" :list="list" @confirm="confirm"></u-select>
		<!-- 签到时间 -->
		<!-- <u-calendar v-model="showsign" :mode="mode" :change-year="false" @change="change"></u-calendar> -->
		<u-popup v-model="showpopup" mode="center" border-radius="8" width="80%" ref="popup">
			<view class="content">
				<view class="signed theme" @tap="$u.throttle(Sign, 1000)">签到</view>
				
					<view class="change" style="padding-left: 25rpx;/* margin-top: 25rpx; */padding-top: 25rpx;">签到日期：{{curDate}}</view>
					<view class="guize" style="padding-left: 25rpx;font-size: 32rpx;font-weight: bold;margin-top: 25rpx;">
						积分规则
					</view>
					<view class="guize" style="padding-left: 25rpx;padding-right: 25rpx;margin-top: 25rpx;font-size: 24rpx;color: #f30404;">
						每日签到获得1积分，连续七天签到可以额外增加5积分，长期签到可以增加接单成功率。
					</view>
					<ren-calendar ref='ren' :markDays='markDays' :open="true" :disabledAfter='true' :collapsible="false" @onDayClick='onDayClick'></ren-calendar>
				
			    
				 <!-- @onDayClick='onDayClick' -->
			</view>
		</u-popup>
		
		<!-- 客户电话遮罩 -->
		<customer-service  :openmask="openmask" @closemask="closemask"></customer-service>
	</view>
</template>

<script>
	import RenCalendar from '@/components/ren-calendar/ren-calendar.vue';
	import customerService from "../../components/customer-service/customer-service.vue";
	export default {
		components:{
			RenCalendar,
			customerService
		},
		data() {
			return {
				showcalendar:false,
				total_amount:"0",
				openmask:false,
				text:"订阅消息",
				currcount:0,
				currentpage:"",
				score:"",
				template_id1:"",
				template_id2:"",
				template_id3:"",
				showpopup:false,
				curDate:'',
				markDays:[],
				//顶部导航栏
				height:"",
				background:{
					backgroundImage:"linear-gradient(90deg,  #54C3F1,#00ABEB)",
				},
				//顶部导航栏
				user_name:"未知用户",
				user_avatar:"../../static/logo.png",
				user_phone:"",
				user_address:"",
				user_type:"",
				number:'',
				pic: 'https://uviewui.com/common/logo.png',
				show: true,
				showtime: false,
				showsign: false,
				mode: 'date',
				timeval: "9:00——18:00",
				list: [
					[{
							value: '8:00',
							label: '8:00'
						},
						{
							value: '9:00',
							label: '9:00'
						}
					],
					[{
							value: '12:00',
							label: '12:00'
						},
						{
							value: '18:00',
							label: '18:00'
						}
					],

				],
			}
		},
		onLoad() {
			//检查状态
			this.checklogin();
			this.user_name = uni.getStorageSync("user_name") || "未知用户";
			this.user_avatar = uni.getStorageSync("user_avatar")||"../../static/tabBar/homeselect.png";
			this.user_phone = uni.getStorageSync("phone");
			this.user_address = uni.getStorageSync("address");
			this.number = uni.getStorageSync("number");
			// console.log(this.user_address);
			this.SignList();
			this.getInfo();
			var pages = getCurrentPages();
			var page = pages[pages.length - 1];
			var currentpage = page.route;
			this.currentpage = currentpage;
			console.log(currentpage);
			uni.$on('updatename',function(data){
			        console.log('监听到事件来自 updatename ，携带参数 msg 为：' + data.msg);
					this.user_name = data.msg;
			    })
		},
		onShow() {
			this.getInfo();
			this.checklogin();
		},
		onReady() {
		    let today = this.$refs.ren.getToday().date;
		    this.curDate = today;
		    this.markDays.push(today);
		},
		methods: {
			closemask(){
				this.openmask = false;
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
						let arr  = res.data.data.work_time;
						let score  = res.data.data.score;
						this.user_name = res.data.data.wechat_name;
						this.timeval  =arr;
						this.score  =score;
						this.user_type = res.data.data.type
						this.total_amount = res.data.data.total_amount
					}else if(res.data.code == 300){
						console.log(res.data.msg);
				
					}else{
						console.log(res.data.msg)
					}
				})
			},
			//日历
			onDayClick(data){
			    this.curDate = data.date;
			},
			SignList(){
				this.$myRequest({
					url:'user/SignList',
					methods:"POST",
					data:{}
				}).then(res=>{
				// 	console.log(res);
				// const data = JSON.parse(res.data);
					if(res.data.code == 200){
						console.log(res.data.msg);
						console.log(res.data);
						console.log(res);
						this.markDays = res.data.data;
					}else if(res.data.code == 300){
						console.log(res.data.msg);
					}else{
						console.log(res.data.msg)
					}
				})	
			},
			Sign(){
				this.$myRequest({
					url:'user/Sign',
					methods:"POST",
					data:{
						time:this.curDate
					}
				}).then(res=>{
				// 	console.log(res);
				// const data = JSON.parse(res.data);
					if(res.data.code == 200){
						console.log(res.data.msg);
						console.log(res);
						// uni.showToast({
						// 	icon:"none",
						// 	title:res.data.msg,
						// 	duration:3000
						// })
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
					}else if(res.data.code == 300){
						console.log(res.data.msg);
						uni.showToast({
							icon:"none",
							title:res.data.msg
						})
					}else{
						console.log(res.data.msg)
					}
				})	
			},
			//订阅消息
			 requestMsg(){
				 console.log(111);
				let that = this;
				
				wx.requestSubscribeMessage({
				  tmplIds: [this.template_id1,this.template_id2,this.template_id3],
				  success (res) {
					  console.log("模板");
					  console.log(res);
					   if (res['iiQ90pese4nEszXQth3EOf8Tb5SYJIyIKN-vA3EeBL4'] === 'accept'){
									that.currcount++;
					               wx.showToast({
					                 title: '订阅+1',
					                 duration: 1000,
					    })
					}
				  }
				})
			},
			// 回调参数为包含多个元素的数组，每个元素分别反应每一列的选择情况
			confirm(e) {
				console.log(e);
				this.timeval = e[0].value + "——" + e[1].value;
			},
			//签到
			change(e) {
				console.log(e);
				uni.showToast({
					title:"签到成功",
					duration:1000
				})
			},
			//打开个人数据页面
			openmydata(){
				let uid = uni.getStorageSync('uid');
				if(!uid){
					this.checklogin();
					return
				}
				let userdata = {
					user_name : this.user_name,
					user_avatar: this.user_avatar,
					user_phone: this.user_phone,
					user_address:this.user_address,
					user_type:this.user_type,
				}
				uni.navigateTo({
					url: "../mydata/mydata?userdata="+ encodeURIComponent(JSON.stringify(userdata))
				});
			},
			//打开个人信息页面
			openinfo(){
				let uid = uni.getStorageSync('uid');
				if(!uid){
					this.checklogin();
					return
				}
				let userinfo = {
					user_name : this.user_name,
					user_avatar: this.user_avatar,
					user_phone: this.user_phone,
					user_address:this.user_address,
					user_type:this.user_type,
					user_score:this.score
				}
				uni.navigateTo({
					url:"../myinfo/myinfo?userinfo="+ encodeURIComponent(JSON.stringify(userinfo))
				})
			},
			// 打开设置权限
			openset(){
				let uid = uni.getStorageSync('uid');
				if(!uid){
					this.checklogin();
					return
				}
				wx.openSetting({
				  success (res) {
				    console.log(res.authSetting)
					let auth = res.authSetting["scope.userLocation"]
						if(!auth){
							uni.$emit('updateaddress',{msg:'未授权'})
						}
					
				  }
				})
			},
			//开发中
			showcoder(){
				uni.showToast({
					title:"开发中"
				})
			},
			//我的积分
			tomypoints(){
				let uid = uni.getStorageSync('uid');
				if(!uid){
					this.checklogin();
					return
				}
				uni.navigateTo({
					url:"../my-points/my-points"
				})
			},
			//积分商城
			topointsmall(){
				let uid = uni.getStorageSync('uid');
				if(!uid){
					this.checklogin();
					return
				}
				uni.navigateTo({
					url:"../points-mall/points-mall"
				})
			},
			//拨打客服电话
			go(){
			 	uni.makePhoneCall({
			 	
			 	// 手机号
			    phoneNumber: '400-0015-021', 
			
				// 成功回调
				success: (res) => {
					console.log('调用成功!')	
				},
			
				// 失败回调
				fail: (res) => {
					console.log('调用失败!')
				}
				
			  });
			}
		},
		//自定义分享页面
		//自定义分享页面
		onShareAppMessage(e){
			return {
				title: this.$overShare.title,
				path: this.$overShare.path,
				imageUrl:this.$overShare.imageUrl,
				desc:this.$overShare.imageUrldesc
			}
		}
	}
</script>

<style lang="scss">
	// .u-cell-group{
	// 	background-color: #CCCCCC;
	// }
	//dingwei
	.bghome image{
		width: 100%;
		height: 360upx;
	}
	.dingwei{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		position: absolute;
		top: 0;
		right: 40rpx;
	}
	// zhuangqian
	.zhuanqian{
		width: 670upx;
		height: 244upx;
		background: #FFFFFF;
		box-shadow: 0px 12upx 26upx 0px rgba(158, 166, 176, 0.28);
		border-radius: 8px;
		padding: 60upx;
		position: relative;
	}
	.zhuanqian .text{
		color: #008BFF;
	}
	.zhuanqian .jine{	
		font-size: 31px;
		font-weight: bold;
		padding-top: 16upx;
		padding-bottom: 16upx;
	}
	.zhuanqian .tips{
		
		font-size: 20upx;
		color: #999999;
	}
	.zhuanqian .chakan{
		position: absolute;
		right: 60upx;
		top:102upx;
		width: 180upx;
		height: 72upx;
		background: linear-gradient(180deg, #00B7FF 0%, #0080FF 100%);
		box-shadow: 0px 10upx 22upx -6px rgba(21, 51, 92, 0.38), 0px 2upx 10upx 0px #F7FBFF, 0px -2upx 6upx 0px rgba(13, 39, 177, 0.39);
		border-radius: 38upx;
		color:#ffffff;
		text-align: center;
		line-height: 72upx;
	}
	.pannel{
		padding:40upx;
		background: #FFFFFF;
		box-shadow: 0px 12upx 26upx 0px rgba(158, 166, 176, 0.28);
		border-radius: 8upx;
		width: 670upx;
		margin-top: 40upx;
	}
	.pannel{
		padding:40upx;
		// background: #FFFFFF;
		// box-shadow: 0px 12upx 26upx 0px rgba(158, 166, 176, 0.28);
		// border-radius: 8upx;
		width: 670upx;
		margin-top: 40upx;
		margin-bottom: 40upx;
	}
	.pannel .item{
		// padding-left: 40upx;
		// padding-right: 40upx;
		display: flex;
		margin-bottom: 40upx;
	}
	.pannel .item image{
		text-align: left;
		width: 80upx;
		height: 80upx;
	}
	.pannel .item .text{
		text-align: left;
		padding-left: 36upx;
		padding-right: 332rpx;
		line-height: 80rpx;
	}
	.content{
		position: relative;
	}
	.signed{
		width: 115upx;
		height: 44upx;
		background: linear-gradient(90deg, $themeleft, $themeright);
		border-radius: 22upx;
		position: absolute;
		top: 8px;
		right: 12px;
		text-align: center;
		line-height: 44upx;
		color: #ffffff;
	}
	page {
		background-color: #ededed;
	}

	
</style>
