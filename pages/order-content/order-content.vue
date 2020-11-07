<template>

	
	<view>
		<!-- 顶部自定义导航 -->
		<!-- <u-navbar :is-back="true"  title="订单详情" :height="height" :background="background" title-color="#ffffff" back-icon-color="#ffffff" >
		</u-navbar> -->
		<!-- map -->
		<map :latitude="latitude" :longitude="longitude" :markers="covers" :scale="scale"></map>
		<!-- orderDetail -->
		<view class="orderDetail">
			<view class=" iconfont icongerenzhongxin-zhong">
				<span class="name" style="">{{data.name}}</span>
			</view>
			<view class="parameter">
				<view class="r-txt">
					<span style="color:#666666 font-size: 28upx;">类型：{{data.type}}</span>
				</view>
				<view class="r-txt "  style="font-size: 28upx;text-align: right;">
					<span style="padding-left: 25upx;font-size: 36upx;color:#FF4F4F;font-weight:bold;line-height: 34upx;">￥{{data.budget}}元</span>
				</view>
			</view>
			<view class="parameter">
				<view class="r-txt">
					<span style="color:#666666 font-size: 28upx;width: 100%;height: 40rpx;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">{{data.producttype}}</span>
				</view>
				<view class="r-txt "  style="font-size: 28upx;width: 100%;">
					<span style="
    font-size: 20upx;
    color: #7f7f7f;
    text-align: right;
    display: block;
    width: 100%;">完成订单可获得:{{data.integral}}积分</span>
				</view>
			</view>
			<view class="parameter label">
				<block v-for="(items,indexs) in data.label" :key="indexs">
					<view class="label-item">{{items}}</view>
				</block>
			</view>
			<view class="parameter">备注：{{data.content}}</view>
			<view class="parameter" @tap="go">
				<view class="iconfont icondianhua1 contact">
					<span style="padding-left: 25upx;">{{data.tel}}</span>
				</view>
			</view>
			<view class="parameter graytd">
				<view class="r-txt " style="font-size: 24upx; padding-left: 25upx;">
					<span class="iconfont iconshijian">上门时间：
					{{data.door_time}}
					</span>
					
				</view>
				<view class=" r-txt"  style="font-size: 24upx;padding-left: 25upx;">
					<span class="iconfont iconshalou">{{data.duration}}</span>
				</view>	
				<view class=" r-txt"  style="font-size: 24upx;padding-left: 25upx;">
					<span class="iconfont icondiliweizhi">{{data.origin}}</span>
				</view>				
			</view>
			<view class="btngroup">

				<button type="default" style="    border: 1px solid #979797;
    color: #333333;
    background: none;" class="iconfont iconfeiji"  @tap="navlociton">开启导航</button>

				<button type="default" style="background: linear-gradient(133deg, #48C0FF 0%, #0F80FF 100%);" @click="showmask">完成服务</button>
			</view>
			<!-- <image src="../../static/logo.png" mode=""></image> -->
			<!-- model -->
			<!-- <u-modal v-model="show" :content="content" :async-close="true"  @confirm="confirm" ref="uModal"></u-modal> -->
			
			<!-- mask -->
			<!-- 上传图片 -->
			
		</view>
		<u-popup v-model="show" mode="bottom" border-radius="14" length="59%">
					<view class="pad">
						<view class="mask-title">确认完成服务</view>
						<!-- 图片上传 -->
						<view class="mask-uptext">上传现场图片(最多4张图片,非必填)</view>
						<vastwu-saveimg
							:imgListprop="photo_list" 
							:num='4' :isBase64='true' 
							:isSave='true' 
							:size='80'
							 @chooseImage='imglist_msg'  
							 @delImg='del_imglist_msg'>
							 </vastwu-saveimg>
							<view class="mask-uptext">备注(非必填)</view>
							<textarea class="mask-area" value="" v-model='remarks'  />
							<view class="mask-btn" @tap="submit">确认完成</view>
						</view>
		</u-popup>
			
	</view>
</template>

<script>
	import vastwuSaveimg from '../../components/vastwu-saveimg/vastwu-saveimg.vue'
	export default {
		components:{
			vastwuSaveimg
		},
		data() {
			return {
				imgs:"",
				header:{},
				remarks:"",
				action: 'https://yigongdan.com/public/applet/work/uploadImg',
				fileList: [
					{
						url: 'http://pics.sc.chinaz.com/files/pic/pic9/201912/hpic1886.jpg',
					}
				],
				show:false,
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
					iconPath: 'http://7n.51tiaoyin.com/20201019170033.png',
					width:80,
					height:65,
					
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
				this.latitude = loction[1]-0.0060;
				this.longitude  =loction[0]-0.0065;
				this.covers[0].latitude = loction[1]-0.0060;
				this.covers[0].longitude  =loction[0]-0.0065;
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
			//上传图片
			imglist_msg(res){
				
				// for (var i = 0; i < res.length; i++) {
				// 	res[i]+"%&@";
				// }
				console.log(res.length);
				if(res.length == 1){
					this.imgs = res[0];
					// console.log(res);
				}else{
					this.imgs = res.join("*|*");
					// console.log("图片多张");
					// console.log(res);
				}
				
			},
			del_imglist_msg(res){
				// console.log(res,"删除图片");
				if(res.length == 1){
					this.imgs = res[0];
					// console.log(res);
				}else{
					this.imgs = res.join("*|*");
					// console.log("图片多张");
					// console.log(res);
				}
			},
			submit(){
				console.log("发送图片");
				this.show =false;
				// this.$refs.uUpload.upload();
				let code = this.data.code;
				let imgs = this.imgs;
				// console.log("图片六");
				// console.log(imgs);
				let remarks =  this.remarks;
				this.$myRequest({
					url:'work/accomplish',
					data:{
						code:code,
						imgs: imgs,
						remarks:remarks
					},
					methods:"POST"
					
				}).then(res=>{
				// 	console.log(res);
				// const data = JSON.parse(res.data);
					if(res.data.code == 200){
						console.log(res.data.msg);
						uni.showModal({
							  title: '提示',
							    content: '恭喜，订单已完成！订单完成后可到订单中心查看结款状态',
							    success: function (res) {
							        if (res.confirm) {
							            console.log('用户点击确定');
										uni.switchTab({
											url:"../order/order"
										})
							        } else if (res.cancel) {
							            console.log('用户点击取消');
							        }
							    }
						})
					}
					// 返回300以及非200的状态码可以在请求的响应拦截里面统一封装，再封装全局统一的弹框，进行调用
					else if(res.data.code == 300){
						console.log(res.data.msg);
						uni.showModal({
							  title: '提示',
							    content: res.data.msg,
							    success: function (res) {
							        if (res.confirm) {
							            console.log('用户点击确定');
										uni.switchTab({
											url:"../order/order"
										})
							        } else if (res.cancel) {
							            console.log('用户点击取消');
							        }
							    }
						})
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
						})
					}
				})
			},
			showmask(){
				this.show = true;
				console.log(this.show);
			},
			navlociton(){
				let that = this;
				console.log(that.latitude);
				wx.openLocation({
					latitude:Number(that.latitude) ,
					longitude: Number(that.longitude) ,
					success() {
						console.log("成功");
					}
				})
				// let that  = this;
				// let plugin = requirePlugin('routePlan');
				// let key = "E6FBZ-XLTWP-S7SDE-V435J-YVAAE-I2BAT";
				// let referer = "易工单";
				// let endPoint = {
				//   "name": "客户地址",
				//   "latitude": this.latitude,
				//   "longitude": this.longitude
				// };
				// let jiexi = JSON.stringify(endPoint)

				// let themeColor = '#00ABEB'
				// console.log(jiexi);
				// uni.navigateTo({
				// 	url:"plugin://routePlan/index?key=" + key + "&referer="+ referer + "&endPoint=" + jiexi + "&themeColor="+themeColor
				// })
			},
			//拨打客服电话
			go(){
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
			},

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
				path: this.$overShare.path,
				imageUrl:this.$overShare.imageUrl,
				
			}
		}
	}
</script>


<style>
	.u-popup{
		padding-left: 40upx;
	}
	.u-upload{
		
	}
	.slot-btn {
		width: 88rpx;
		height: 88rpx;
		display: flex;
		margin:10upx ;
		justify-content: center;
		align-items: center;
		background: rgb(244, 245, 246);
		border-radius: 10rpx;
	}
	
	.slot-btn__hover {
		background-color: rgb(235, 236, 238);
	}
</style>
<style scoped lang="scss">
	// mask
	.pad{
		padding-left: 40upx;
	}
	.mask-title{
		width: 220upx;
		height: 50upx;
		font-size: 36upx;
		font-family: Helvetica;
		color: #333333;
		line-height: 44upx;
		padding-top: 50upx;
		font-weight: bold;
	}
	.mask-uptext{
		width: 372upx;
		height: 34upx;
		font-size: 24upx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333330;
		line-height: 34upx;
		margin-top: 100upx;
	}
	.mask-area{
		width: 620upx;
		height: 80upx;
		background: #F8F8F8;
		border-radius: 6upx;
		margin-top: 52upx;
		text-align: left;
		padding-left: 50rpx;
		padding-right: 50rpx;
		color: #666666;
		line-height: 80rpx;
	}
	.mask-btn{
		width: 652upx;
		height: 88upx;
		background: linear-gradient(133deg, #48C0FF 0%, #0F80FF 100%);
		border-radius: 6upx;
		margin-top: 124upx;
		font-size: 32rpx;
		color: #ffffff;
		text-align: center;
		line-height: 88rpx;
		margin-bottom: 60rpx;
	}
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
		height: 618upx;
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
		border-radius: 4%;
	}
	.orderDetail .iconfont{
		color: $themeright;
	}
	.orderDetail .iconfont .name{
		padding-left: 25upx;
		font-size: 36upx;
		color:$themeright;
		font-weight: bold;
	}
	.parameter2{
		
	}
	.parameter .contact{
		width: 100%;
		height:80upx;
		
		border: 1px solid #000000;
	}
	.graytd{
		background:#F8F8F8;
		height: 200upx;
		flex-direction: column;
		justify-content: center !important;
		align-items: center;
	}
	.label{
		justify-content: flex-start !important;
	}
	.graytd .r-txt{
		margin-bottom: 20rpx;
		height: 40rpx ;
		width: 100% !important;
		// text-align: center !important;
	}
	.graytd .r-txt .iconfont{
		font-size: 28upx;
	}
	.label-item{
		margin-top: 20upx;
		font-size: 20upx;
		border:1upx solid #000000;
		border-radius: 8upx;
		margin-right: 20upx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		line-height: 34upx;
		color: #666666;
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
		flex-wrap: wrap;
	}
	.parameter .iconfont {
		font-size: 32upx;
		text-align: center;
		line-height: 80rpx;
		color: #000000;
	}
	.parameter .iconfont span{
		font-size: 32upx;
		// text-align: left;
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
		
		
		color: #FFFFFF;
		border-radius: 8upx;
		width: 40% !important;
		height:76upx ;
		font-size: 40upx;
		line-height: 76upx;
		margin:40upx auto;
		color: #FFFFFF;
		// border: 1px solid #000000;
	}
	.btngroup{
		display: flex;
		justify-content: space-between;
	}
	.themes{
		background: linear-gradient(133deg, $themeleft 0%, $themeright 100%);
		border: none;
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
