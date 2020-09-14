<template>
	<view>
		<!-- 自定义导航栏 -->
		<u-navbar :is-back="true" back-icon-color="#ffffff"  title="订单详情" :height="height" :background="background" title-color="#ffffff"></u-navbar>
		<swiperTabHead :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></swiperTabHead>
		<!-- map -->
		<map :latitude="latitude" :longitude="longitude" :markers="covers"></map>
		<view class="content" :style="{height:swiperheight+'px'}">
			<!-- <view class="text">恭喜您接单成功！</view>
			<view class="text">等待上门</view> -->
			<view class="">
				<view class="order-detail">
					<view class="contact">
						<view class="name">
							<view class="sever">{{name}}</view>
							<view class="sever1">服务方</view>
						</view>
						<view class="name">
							<view class=""><u-icon name="checkmark-circle-fill" color="#00ABEB"></u-icon></view>
							<view class="">——</view>
						</view>
						<view class="name">
							<view class="sever">{{data.name}}</view>
							<view class="sever1">客户方</view>
						</view>
					</view>
					<view class="textdetail">
						<view class="">订单金额:{{data.budget}}元</view>
						<view class="">服务类型:{{data.type}}</view>
					</view>
					<view class="textdetail">
						<view class="">{{data.duration}}</view>
						<view class="">客户电话: {{data.tel}}</view>
					</view>
					<view class="textdetail">
						<view class="">工具要求:{{data.label}}</view>
					</view>
					<view class="textdetail">
						<view class="">订单编号:{{data.code}}</view>
					</view>
					<view class="textdetail">
						<view class="">上门时间:{{data.door_time}}</view>
					</view>
					<view class="textdetail">
						<view class="">所在位置:{{data.origin}}</view>
					</view>
					<view class="textdetail">
						<view class="">备注:{{data.content}}</view>
					</view>
				</view>
			</view>
			<view class="btngroup">
				<button type="default" class="active" @tap="navlociton">导航目标</button>
				<button type="default" class="active"  open-type='contact'>客服电话</button>
				<button type="default" class="active1">服务完成</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				data:{},
				height:"",
				swiperheight:500,
				background:{
					backgroundImage: "linear-gradient(90deg, #54C3F1, #00ABEB)",
				},
				id: 0, // 使用 marker点击事件 需要填写id
							title: 'map',
							latitude: 29.993299,
							longitude: 104.154709,
							scale:6,//地图层
							covers: [
								{
								id: 0, 
								latitude: 29.994521,
								longitude: 104.154741,
								iconPath: '../../static/wait-list/location.png',
								width:50,
								height:50,
				// 				label:{//为标记点旁边增加标签
				// 						content:'客户地址',//文本
				// 						color:'#F76350',//文本颜色
				// 						anchorX:0,//label的坐标，原点是 marker 对应的经纬度
				// 						anchorY:-80,//label的坐标，原点是 marker 对应的经纬度 
				// // 					    x:39.909,//这个组件微信在1.2.0以后就废弃了
				// // 					    y:116.39742,
				// 						bgColor:'#fff',//背景色
				// 						padding:5,//文本边缘留白
				// 						borderWidth:1,//边框宽度
				// 						borderColor:'#D84C29',//边框颜色							
				// 						textAlign:'right'//文本对齐方式。
				// 					 },
									 
							},
								{
									id: 1, 
									latitude: 29.994521,
									longitude: 104.154741,
									iconPath: '../../static/wait-list/location1.png',
									width:50,
									height:50,
					// 				label:{//为标记点旁边增加标签
					// 						content:'我的地址',//文本
					// 						color:'#F76350',//文本颜色
					// 						anchorX:0,//label的坐标，原点是 marker 对应的经纬度
					// 						anchorY:-80,//label的坐标，原点是 marker 对应的经纬度 
					// // 					    x:39.909,//这个组件微信在1.2.0以后就废弃了
					// // 					    y:116.39742,
					// 						bgColor:'#fff',//背景色
					// 						padding:5,//文本边缘留白
					// 						borderWidth:1,//边框宽度
					// 						borderColor:'#D84C29',//边框颜色							
					// 						textAlign:'right'//文本对齐方式。
					// 				}
														 
								}
							]
			}
		},
		onLoad(event) {
			// TODO 后面把参数名替换成 payload
			const payload = event.detailDate;
			// 目前在某些平台参数会被主动 decode，暂时这样处理。
			try {
				this.data= JSON.parse(decodeURIComponent(payload));
				console.log("详情页参数");
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
				console.log("详情页参数");
				console.log(this.data);
			};
			this.name = uni.getStorageSync("name");
			uni.getSystemInfo({
				success: (res) => {
					// console.log(res.windowHeight);
					let height = res.windowHeight - uni.upx2px(136);
					this.swiperheight = height;
					console.log(this.swiperheight);
				}
			});
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
		}
	}
</script>

<style scoped>
	.content{
		background: linear-gradient(90deg, #54C3F1,#00ABEB);
		padding-top: 1px;
		padding-bottom: 30px;
	}
	.content .text{
		margin: 0 35%;
		padding-top: 30upx;
		text-align: center;
		/* padding-bottom: 94upx; */
		color: #FFFFFF;
	}
	.content .text1{
		font-size: 30upx;
	}
	.content .text1{
		font-size: 40upx;
	}
	.order-detail{
		background-color: #FFFFFF;
		border-radius: 12upx;
		margin: 58upx 25upx;
		padding-left: 25upx;
		padding-right: 25upx;
	}
	.order-detail .contact{
		margin: 80upx 20%;
		display: flex;
		justify-content: space-between;
		padding-top: 80upx;
	}
	.order-detail .contact .name{
		text-align: center;
	}
	.order-detail .contact .name .sever{
		font-size: 34upx;
	}
	.order-detail .contact .name .seve1{
		font-size: 26upx;
		color: #CCCCCC;
	}
	.order-detail .textdetail{
		display: flex;
		justify-content: space-between;
		padding-top: 25upx;
		padding-bottom: 25upx;
		
	}
	.btn{
		width: 356upx;
		height: 80upx;
		background: #FFFFFF;
		border-radius: 12upx;
		color:#00ABEB;
		margin: 0 auto;
		line-height: 80upx;
		font-size: 32upx;
		border: none;
		-webkit-appearance:none
	}
	map{
		position: relative;
		width: 100%;
		height: 300upx;
		display: block;
	}
	.btngroup{
		display: flex;
		justify-content: space-between;
		padding-left: 25upx;
		padding-right: 25upx;
	}
	/* 修改小程序的默认button样式 */
	button{
		-webkit-appearance:none;
		height: 32px !important;
		line-height: 56upx !important;
		color: #FFFFFF;
		font-size: 32upx;
	}
	button::after{
		border: none;
	}
	.active{
		background-color: #ff5500;
	}
	.active1{
		background-color: #cccccc;
	}
</style>
