<template>
	<view>
		<!-- 自定义导航栏 -->
		<u-navbar :is-back="true" back-icon-color="#ffffff"  title="订单详情" :height="height" :background="background" title-color="#ffffff"></u-navbar>
		<swiperTabHead :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></swiperTabHead>
		<!-- map -->
		<map :latitude="latitude" :longitude="longitude" :markers="covers" :scale="scale"></map>
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
						<view style="color: #ff0404;font-weight: bold;" class="" @tap="gouser">客户电话: {{data.tel}}</view>
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
				<button type="default" class="active"  open-type='contact'>在线客户</button>
				<!-- <template v-if="data.index==0"> -->
					<button type="default" class="active2" @tap="start">完成服务</button>
				<!-- </template> -->
				<!-- <template v-else> -->
					<!-- <button type="default" class="active1" @tap="complate">完成服务</button> -->
				<!-- </template> -->

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentpage:"",
				name:'',
				data:{},
				height:"",
				swiperheight:442,
				scale:14,
				background:{
					backgroundImage: "linear-gradient(90deg, #54C3F1, #00ABEB)",
				},
				id:0, // 使用 marker点击事件 需要填写id
				title: 'map',
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
					let height = res.windowHeight - uni.upx2px(480);
					this.swiperheight = height;
					console.log(this.swiperheight);
				}
			});
			var pages = getCurrentPages();
			var page = pages[pages.length - 1];
			var currentpage = page.route;
			this.currentpage = currentpage;
			console.log(currentpage);
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
			},
			// complate(){
			// 	uni.showModal({
			// 	    title: '提示',
			// 	    content: '订单已完成,不可点击',
			// 	    success: function (res) {
			// 	        if (res.confirm) {
			// 	            console.log('用户点击确定');
			// 	        } else if (res.cancel) {
			// 	            console.log('用户点击取消');
			// 	        }
			// 	    }
			// 	});
			// },
			start(){
				let that = this;
				uni.showModal({
					  title: '提示',
					    content: '订单完成后可到订单中心查看结款状态',
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
								that.getAccomplish(that.data.code);
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
				})
			},
			//拉去用户订单完成信息
			getAccomplish(code){
				this.$myRequest({
					url:'work/accomplish',
					data:{
						uid:uni.getStorageSync("uid"),
						code:code,
					},
					methods:"POST"
					
				}).then(res=>{
				// 	console.log(res);
				// const data = JSON.parse(res.data);
					if(res.data.code == 200){
						console.log(res.data.msg);
						setTimeout(()=>{
						uni.navigateBack({
							delta: 1
							});
						},1500);
					}else if(res.data.code == 300){
						console.log(res.data.msg);
						uni.showToast({
							title:"该订单已经完成了",
							duration:2000
						})
					}else{
						console.log(res.data.msg)
					}
				})
				// uni.request({
				// 	url:this.$apiUrl+"work/accomplish",
				// 	method:"POST",
				// 	dataType:JSON,
				// 	data:{
				// 		uid:uni.getStorageSync("uid"),
				// 		code:code,
				// 	},
				// 	success(res) {
				// 		console.log("完成订单");
				// 		console.log(res);
				// 		let data = JSON.parse(res.data);
				// 		console.log(data);
				// 		switch (data.code){
				// 			case 200:
				// 			setTimeout(()=>{
				// 				uni.navigateBack({
				// 				    delta: 1
				// 				});
				// 			},1500);
				// 				break;
				// 			case 300:
				// 			uni.showToast({
				// 				title:"该订单已经完成了",
				// 				duration:2000
				// 			})
				// 				break;
				// 			default:
				// 				break;
				// 		}
						
						
				// 	},
				// 	fail(res) {
				// 		console.log(res);
				// 		uni.showToast({
				// 			title:"服务器无响应"
				// 		})
				// 	}
				// })
			},
			//拨打客服电话
			gouser(){
			 	uni.makePhoneCall({
			 	
			 	// 手机号
			    phoneNumber: this.data.tel,
			
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
				path: this.currentpage,
				imageUrl:this.$overShare.imageUrl,
				
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
		height: 600upx;
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
		color: #00abeb;
		font-size: 32upx;
	}
	button::after{
		border: none;
	}
	.active{
		background-color: #ffffff;
	}
	.active1{
		background-color: #cccccc;
	}
	.active1{
		background-color: #ff5500;
	}
</style>
