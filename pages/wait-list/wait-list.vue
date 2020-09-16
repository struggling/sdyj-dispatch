<template>
	<view>
		<!-- 顶部自定义导航 -->
		<u-navbar :is-back="true"  title="订单详情" :height="height" :background="background" title-color="#ffffff" back-icon-color="#ffffff" >
		</u-navbar>
		<!-- map -->
		<map :latitude="latitude" :longitude="longitude" :markers="covers" :scale="scale"></map>
		<!-- orderDetail -->
		<view class="orderDetail">
			<view class=" iconfont icongerenzhongxin-zhong">
				<span style="padding-left: 25upx;">订单信息</span>
			</view>
			<view class="parameter">
				<view class=" iconfont icontongxunlu">
					<span style="padding-left: 25upx;">{{data.name}}</span>
				</view>
				<view class="r-txt">
					<span style="padding-left: 25upx;">服务类型：{{data.type}}</span>
				</view>
			</view>
			<view class="parameter">
				<view class=" iconfont iconshouji">
					<span style="padding-left: 25upx;">{{data.tel}}</span>
				</view>
				<view class="r-txt "  style="font-size: 24upx;">
					<span style="padding-left: 25upx;">费用：{{data.budget}}元</span>
				</view>
			</view>
			<view class="parameter">
				<view class="r-txt " style="font-size: 24upx;">
					<span >上门时间：
					{{dataDoortime}}
					</span>
					
				</view>
				<view class=" r-txt"  style="font-size: 24upx;padding-left: 25upx;">
					<span>{{data.duration}}</span>
				</view>				
			</view>
			<view class="parameter">位置：{{data.origin}}</view>
			<view class="parameter">工具要求：{{data.label}}</view>
			<view class="parameter">备注：{{data.content}}</view>
			<view class="btngroup">
				<button type="default" class="theme" @tap="navlociton">导航目标</button>
				<button type="default"  @tap="opentake" :clsss="{'active':isactive,'theme':istheme}">立即抢单</button>
			</view>
			<!-- <image src="../../static/logo.png" mode=""></image> -->
			<!-- model -->
			<u-modal v-model="show" :content="content"></u-modal>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				istheme:true,
				show: false,
				content: '您已经成功参与抢单，该订单需要平台工作人员进行人工审核；审核通过后请到“订单”列表查看具体订单信息并且联系客户预约上门进行服务',
				height:"",
				background:{
					backgroundImage: "linear-gradient(90deg, #54C3F1, #00ABEB)",
				},
				data:{},
				isactive:false,
				id:0, // 使用 marker点击事件 需要填写id
				title: 'map',
				scale:10,
				latitude: 39.909,
				longitude: 116.39742,
				covers: [{
					latitude: 39.909,
					longitude: 116.39742,
					iconPath: '../../static/wait-list/location.png',
					width:30,
					height:30,
					
				}, {
					latitude: 39.90,
					longitude: 116.39,
					iconPath: '../../static/wait-list/location1.png',
					width:30,
					height:30,
				}]
			}

		},
		
		onLoad(event) {
			// TODO 后面把参数名替换成 payload
			const payload = event.detailDate;
			
			// 目前在某些平台参数会被主动 decode，暂时这样处理。
			try {
				this.data= JSON.parse(decodeURIComponent(payload));
				console.log(this.data);
				let loction = this.data.longitude.split(",");
				console.log(loction);
				this.latitude = loction[1];
				this.longitude  =loction[0];
				this.covers[0].latitude = loction[1];
				this.covers[0].longitude  =loction[0];
				this.covers[1].longitude=uni.getStorageSync('longitude');
				this.covers[1].latitude=uni.getStorageSync('latitude');
			} catch (error) {
				this.data = JSON.parse(payload);
				console.log(this.data);
			};
			
		},
		computed:{
			dataDoortime(){
				if(this.data){
					console.log(this.data);
					return  this.data.door_time.substring(5,this.data.door_time.length-3)
				}
			}
		},
		methods: {
			navlociton(){
				let that  = this;
				console.log(that.latitude);
				wx.openLocation({
					latitude:Number(that.latitude) ,
					longitude: Number(that.longitude) ,
					success() {
						console.log("成功");
					}
				})
			},
			opentake(){
				let that =this;
				let phone = uni.getStorageSync('phone');
				let user_uid = uni.getStorageSync('uid');
				let badgecont = uni.getStorageSync("badgecont");
				let code = this.data.code;
				console.log("phone"+phone);
				console.log(user_uid);
				if (phone) {
						uni.request({
							url:this.$apiUrl+"work/take",
							method:"POST",
							dataType:JSON,
							data:{
								uid:user_uid,
								code:code,//订单编号
								WorkNautica:[this.longitude,this.latitude],
								phone:phone
							},
							success(res) {
								console.log(res);
								// console.log(res);
								const data = JSON.parse(res.data);
								console.log(data.code);
								switch (data.code){
									case 200:
										//抢单成功体醒
										//提醒订单
										that.show = true;
										that.isactive = true;
										let badgecont = 0;
										// that.$badge++;
										badgecont ++;
										// console.log(this.$badge);
										uni.$emit('updatebadgecont',{badgecont:badgecont});
										setTimeout(()=>{
											uni.navigateBack({
											    delta: 1
											});
										},3000);
										break;
									case 300:
										uni.showToast({
											title:data.msg
										});
										that.isactive = true;
										break;
									case 400:
										uni.showToast({
											title:data.msg
										})
										break;	
									default:
										uni.showToast({
											title:data.mag
										})
										break;
								}
								
							},
							fail() {
								console.log(res);
							}
						})
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
	/* map */
	uni-map {
		position: relative;
		width: 100%;
		height: 722upx;
		display: block;
	}
	/* 修改小程序中map默认样式 */
	map{
		position: relative;
		width: 100%;
		height: 646upx;
		display: block;
	}
	label{
		display: inline-block !important;
	}
	/* orderDetail */
	.orderDetail{
		padding-left: 25upx;
		padding-right: 25upx;
		padding-top: 30upx;
		position: relative;
	}
	.parameter2{
		
	}
	.parameter .r-txt{
		width: 40%;
		text-align: left;
	}
	.parameter{
		display: flex;
		padding-top: 6upx;
		padding-bottom: 6upx;
		justify-content: space-between;
		font-size: 24upx;
		margin-top: 25upx;
	}
	.parameter .iconfont {
		font-size: 24upx;
	}
	.parameter .iconfont span{
		font-size: 24upx;
		text-align: left;
	}
	.parameter  span{
		text-align: left;
	}
	.orderDetail image{
		width: 130upx;
		height: 130upx;
		border-radius: 100%;
		border: 4upx solid #00ABEB;
		background-color: #CCCCCC;
		position: absolute;
		right: 80upx;
		top: -68upx;
	}
	.orderDetail button{
		background-color:#F86032 ;
		color: #FFFFFF;
		border-radius: 8upx;
		width: 300upx;
		height:76upx ;
		font-size: 40upx;
		line-height: 76upx;
		margin:40upx auto;
	}
	.btngroup{
		display: flex;
		justify-content: space-between;
	}
	/* 修改小程序的默认button样式 */
	button{
		-webkit-appearance:none
	}
	button::after {
		border: none;
	}
	.active{
		background-color: #CCCCCC;
	}
</style>
