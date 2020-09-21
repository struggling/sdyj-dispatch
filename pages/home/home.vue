<template>
	<view>
		<!-- 顶部自定义导航 -->
		<u-navbar :is-back="false"  title="个人中心" :height="height" :background="background" title-color="#ffffff" back-icon-color="#ffffff" >
		</u-navbar>
		<view class="bg">
			<image class="bgimg" src="../../static/home/home.png" mode=""></image>
			<view class="text">
				<view class="nickname">{{user_name}}</view>
				<view class="sign" @tap="showpopup = true">点击签到</view>
			</view>
			<image :src="user_avatar" class="avatar" mode=""></image>
			<view class="panel">
				<view class="panel-item" @tap="openmydata">
					<view class="icon">
						<image src="../../static/home/icon1.png" mode=""></image>
					</view>
					<view class="txt">个人数据</view>
				</view>
				<view class="panel-item" @tap="showcoder">
					<view class="icon">
						<image src="../../static/home/icon3.png" mode=""></image>
					</view>
					<view class="txt">我的积分</view>
				</view>
				<view class="panel-item" @tap="showcoder">
					<view class="icon">
						<image src="../../static/home/icon2.png" mode=""></image>
					</view>
					<view class="txt">积分商城</view>
				</view>
				<view class="panel-item" @tap="go">
					<view class="icon">
						<image src="../../static/home/icon3.png" mode=""></image>
					</view>
					<view class="txt">售后客服</view>
				</view>
			</view>
		</view>
		<!-- 客服会话 -->
		<!-- <button send-message-title="分享标题" send-message-img="分享的单个图片链接" show-message-card="true"  class='details_button' open-type='contact' plain>
		 </button> -->
		<!-- 个人信息列表 -->
		<view class="u-m-t-20">
			<u-cell-group>
				
				<u-cell-item title="个人信息" @tap="openinfo"></u-cell-item>
				<u-cell-item  title="个人工号">{{number}}</u-cell-item>
				<u-cell-item  title="个人工作时间" @tap="showtime=true">{{timeval}}</u-cell-item>
				<u-cell-item  title="评分指南">9.4分</u-cell-item>
				<u-cell-item  title="意见反馈"> <button send-message-title="分享标题" send-message-img="分享的单个图片链接" show-message-card="true"  class='details_button' open-type='contact' plain>
		 </button></u-cell-item>
				<u-cell-item  title="设置" @tap="openset"></u-cell-item>
				<u-cell-item  title="订阅消息" @tap="requestMsg"></u-cell-item>
			</u-cell-group>
		</view>
		 
		<!-- class="iconfont icongerenxinxi"  class="iconfont icongonghao" class="iconfont iconshijian" class="iconfont iconpingfen" class="iconfont iconxinxi" class="iconfont iconshezhi"-->
		<!-- 时间选择器 -->
		<!-- <u-picker mode="time" v-model="showtime" :params="params"></u-picker> -->
		<u-select v-model="showtime" mode="mutil-column" :list="list" @confirm="confirm"></u-select>
		<!-- 签到时间 -->
		<!-- <u-calendar v-model="showsign" :mode="mode" :change-year="false" @change="change"></u-calendar> -->
		<u-popup v-model="showpopup" mode="center" border-radius="8" width="80%" ref="popup">
			<view class="content">
				<view class="signed theme" @tap="Sign">签到</view>
				<ren-calendar ref='ren' :markDays='markDays' :open="true" :disabledAfter='true' :collapsible="false"  @onDayClick='onDayClick'></ren-calendar>
			    <!-- <view class="change">选中日期：{{curDate}}</view> -->
			</view>
		</u-popup>
		

	</view>
</template>

<script>
	import RenCalendar from '@/components/ren-calendar/ren-calendar.vue'
	export default {
		components:{
			RenCalendar
		},
		data() {
			return {
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
				user_name:"",
				user_avatar:"",
				user_phone:"",
				user_address:"",
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
			this.user_name = uni.getStorageSync("user_name");
			this.user_avatar = uni.getStorageSync("user_avatar");
			this.user_phone = uni.getStorageSync("phone");
			this.user_address = uni.getStorageSync("address");
			this.number = uni.getStorageSync("number");
			// console.log(this.user_address);
			this.SignList();
		},
		onReady() {
		    let today = this.$refs.ren.getToday().date;
		    this.curDate = today;
		    this.markDays.push(today);
		},
		methods: {
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
						uni.showToast({
							title:res.data.msg
						})
					}else if(res.data.code == 300){
						console.log(res.data.msg);
						uni.showToast({
							title:res.data.msg
						})
					}else{
						console.log(res.data.msg)
					}
				})	
			},
			//订阅消息
			async requestMsg(){
				
				await this.$myRequest({
					url:'user/getTemplateid',
					data:{},
				}).then(res=>{
					console.log(res);
				// const data = JSON.parse(res.data);
					if(res.data.code == 200){
						console.log(res.data.msg);
						console.log(res.data.data);
						this.template_id1 = res.data.data[0];
						this.template_id2 = res.data.data[1];
						this.template_id3 = res.data.data[2];
					}else if(res.data.code == 300){
						console.log(res.data.msg);

					}else{
						console.log(res.data.msg)
					}
				})
				// console.log(res.data);
				wx.requestSubscribeMessage({
				  tmplIds: [this.template_id1,this.template_id2,this.template_id3],
				  success (res) {
					  console.log("模板");
					  console.log(res);
					   if (res['c-QfMnWBUDkg2CIlBJDOYaGj6Bpn-p6g9HuKUi8LrXY'] === 'accept'){
					               wx.showToast({
					                 title: '订阅OK！',
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
				let userdata = {
					user_name : this.user_name,
					user_avatar: this.user_avatar,
					user_phone: this.user_phone,
					user_address:this.user_address
				}
				uni.navigateTo({
					url: "../mydata/mydata?userdata="+ encodeURIComponent(JSON.stringify(userdata))
				});
			},
			//打开个人信息页面
			openinfo(){
				let userinfo = {
					user_name : this.user_name,
					user_avatar: this.user_avatar,
					user_phone: this.user_phone,
					user_address:this.user_address
				}
				uni.navigateTo({
					url:"../myinfo/myinfo?userinfo="+ encodeURIComponent(JSON.stringify(userinfo))
				})
			},
			// 打开设置权限
			openset(){
				wx.openSetting({
				  success (res) {
				    console.log(res.authSetting)
				  }
				})
			},
			//开发中
			showcoder(){
				uni.showToast({
					title:"开发中"
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
		onShareAppMessage(e){
			return {
				title: this.$overShare.title,
				path: this.$overShare.path,
				imageUrl:this.$overShare.imageUrl,
				
			}
		}
	}
</script>

<style lang="scss">
	// .u-cell-group{
	// 	background-color: #CCCCCC;
	// }
	.content{
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
	page {
		background-color: #ededed;
	}

	.camera {
		width: 54px;
		height: 44px;

		&:active {
			background-color: #ededed;
		}
	}
	.details_button{
		opacity: 0;
	}
	.user-box {
		background-color: #fff;
	}
	// 个人信息列表
	.u-m-t-20 {
		margin-top: 140upx !important;
		
	}

	.bg .bgimg {
		width: 100%;
		height: 340upx;
	}

	.bg {
		position: relative;
	}

	.bg .avatar {
		position: absolute;
		width: 152upx;
		height: 152upx;
		border-radius: 100%;
		margin: 4upx;
		top: 120upx;
		display: block;
		left: 292upx;
		z-index: 1000;
		background-color: #FFFFFF;
	}

	.bg .text {
		position: absolute;
		display: flex;
		justify-content: flex-end;
		padding-left: 25upx;
		padding-right: 25upx;
		width: 100%;
		align-items: center;
		top: 40upx;
	}

	.bg .panel {
		margin-left: 25upx;
		margin-right: 25upx;
		width: 702upx;
		background-color: #FFFFFF;
		border-radius: 8upx;
		top: 208upx;
		display: flex;
		justify-content: space-around;
		height: 240upx;
		position: absolute;
		align-items: center;
		z-index: 999;
		box-shadow: 2px 2px 8px 1px rgba(0, 171, 236, 1)
	}

	.bg .panel .icon {
		text-align: center;
	}

	.bg .panel .icon image {
		width: 56upx;
		height: 48upx;
	}

	.bg .text .sign {
		margin-left: 134upx;
		border-radius: 20upx;
		background-color: #FFFFFF;
		color: #343434;
		padding: 12upx;
		font-size: 24upx;
	}

	.bg .text .nickname {
		font-size: 32upx;
		color: #FFFFFF;
		line-height: 52upx;
		flex: 1;
		text-align: right;
		padding-right: 10%;
	}
</style>
