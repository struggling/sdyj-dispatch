<template>
	<view>
		<!-- 顶部自定义导航 -->
		<!-- <u-navbar :is-back="true"  title="订单详情" :height="height" :background="background" title-color="#ffffff" back-icon-color="#ffffff" >
		</u-navbar> -->
		<!-- map -->
		<map :latitude="latitude" :longitude="longitude" :markers="covers" :scale="scale" layer-style="1" subkey="QHBBZ-IGB66-S3HSP-M25CJ-JLZYE-P6FIS"></map>
		<!-- <map 
		  id="map"
		  :subkey="QHBBZ-IGB66-S3HSP-M25CJ-JLZYE-P6FIS"
		  longitude="116.273514"
		  latitude="40.040417" 
		  scale="14"
		  :layer-style="1"
		></map> -->
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
					<span style="padding-left: 25upx;font-size: 36upx;color:#FF4F4F;font-weight:bold;">￥{{data.budget}}元</span>
				</view>
			</view>
			<view class="parameter">
				<view class="r-txt">
					<span style="color:#666666 font-size: 28upx;width: 100%;height: 40rpx;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">{{data.producttype}}</span>
				</view>
				<view class="r-txt "  style="font-size: 20upx;width: 50%;">
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
			<view class="parameter" @tap="tishi">
				<view class=" iconfont icondianhua1 contact" style="color: #000000;">
					<span style="padding-left: 25upx;color: #000000;"><!-- {{data.tel}} -->联系客户：抢单成功即可显示号码</span>
				</view>
			</view>
			<view class="parameter graytd">
				<view class="r-txt " style="font-size: 24upx;padding-left: 25upx;">
					<span class="iconfont iconshijian">上门时间：
					{{data.door_time}}
					</span>
					
				</view>
				<view class=" r-txt"  style="font-size: 24upx;padding-left: 25upx;">
					<span class="iconfont  iconshalou">{{data.duration}}</span>
				</view>
				<view class=" r-txt"  style="font-size: 24upx;padding-left: 25upx;">
					<span class="iconfont  iconshalou">{{dataorigin}} (抢单成功可显示详细地址)</span>
				</view>		
			</view>
			<view class="btngroup">
				<button type="default" class="iconfont iconfeiji" style="color: #FFFFFF;"  @tap="navlociton">开启导航</button>
				<button style="background: linear-gradient(133deg, #48C0FF 0%, #0F80FF 100%);" type="default"  @tap="opentake" clsss="themes">立即抢单</button>
			</view>
			<!-- <view class="btngroup">
			
				<button type="default" style="border: 1px solid #000000;color: #333333;"  @tap="navlociton">开启导航</button>
			
				<button type="default" style="background: linear-gradient(133deg, #48C0FF 0%, #0F80FF 100%);" @click="showmask">完成服务</button>
			</view> -->
			<!-- <image src="../../static/logo.png" mode=""></image> -->
			<!-- model -->
			<u-modal v-model="show" :content="content" :async-close="true"  @confirm="confirm" ref="uModal"></u-modal>
			
			<!-- mask -->
			<!-- 上传图片 -->
			<!-- <u-popup v-show="showmask" mode="bottom" >
				<view class="">
					
				</view>
			</u-popup> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shwomask:false,
				currentpage:"",
				istheme:true,
				show: false,
				content: '每人每天最多抢5单,您已经成功参与抢单,该订单需要平台工作人员进行人工审核；审核通过后请到“订单”列表查看具体订单信息并且联系客户预约上门进行服务',
				height:"",
				background:{
					backgroundImage: "linear-gradient(90deg, #54C3F1, #00ABEB)",
				},
				data:{},
				isactive:true,
				id:0, // 使用 marker点击事件 需要填写id
				title: 'map',
				scale:14,
				latitude: 39.909,
				longitude: 116.39742,
				covers: [
					{
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
			this.getLocationInfo();
			// 目前在某些平台参数会被主动 decode，暂时这样处理。
			try {
				this.data= JSON.parse(decodeURIComponent(payload));
				console.log(this.data);
				let loction = this.data.longitude.split(",");
				console.log(loction);
				this.latitude = loction[1]-0.0060;
				this.longitude  =loction[0]-0.0065;
				this.covers[0].latitude = loction[1]-0.0060;//纬度
				this.covers[0].longitude  =loction[0]-0.0065;//经度
				
				this.covers[1].longitude=uni.getStorageSync('longitude');
				this.covers[1].latitude=uni.getStorageSync('latitude');
			} catch (error) {
				this.data = JSON.parse(payload);
				console.log(this.data);
			};
			var pages = getCurrentPages();
			var page = pages[pages.length - 1];
			var currentpage = page.route;
			this.currentpage = currentpage;
			console.log(currentpage);
			this.checklogin();
			
		},
		computed:{
			dataorigin(){
				if(this.data.origin){
					console.log(this.data);
					// return  this.data.origin.substring(this.data.origin.length-6)
					// const towns = this.data.origin.indexOf("省");
					const shi = this.data.origin.indexOf("市");
					// console.log("省下表"+towns);
					// console.log("市下表"+shi);
					return this.data.origin.substring(shi+1);
				}
			}
		},
		methods: {
			tishi(){
				uni.showModal({
				    title: '提示',
				    content: "电话已隐藏，需要抢单后拨打客户电话!",
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			//使用小程序腾讯地图导航插件
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

				// let plugin = requirePlugin('routePlan');
				// let key = "E6FBZ-XLTWP-S7SDE-V435J-YVAAE-I2BAT";
				// let referer = "易工单";
				// // let longitude =  uni.getStorageSync('longitude');
				// // let latitude = uni.getStorageSync('latitude');
				// let endPoint = {
				//   "name": "客户地址",
				//   "latitude": this.latitude,
				//   "longitude": this.longitude
				// };
				// let jiexi = JSON.stringify(endPoint)
				// // let endPoint = JSON.stringify({
				// //   "name": "北京西站",
				// //   "latitude": 39.894806,
				// //   "longitude": 116.321592
				// // });
				// let themeColor = '#00ABEB'
				// console.log(jiexi);
				// uni.navigateTo({
				// 	url:"plugin://routePlan/index?key=" + key + "&referer="+ referer + "&endPoint=" + jiexi + "&themeColor="+themeColor
				// })
			},
			confirm() {
				this.show = false;
				if(!this.show){
					this.requestMsg();
				}
			},
			opentake(){
				let that =this;
				let phone = uni.getStorageSync('phone');
				let user_uid = uni.getStorageSync('uid');
				let badgecont = uni.getStorageSync("badgecont");
				let type = uni.getStorageSync("type");
				let code = this.data.code;
				console.log("phone",phone);
				console.log(user_uid,"uid");
				
				if (user_uid&&phone) {
					if(type.indexOf(this.data.type)<=0 ){
						uni.showModal({
						    title: '提示',
						    content: '该类订单与本人注册时类型不同,到抢单池看看符合类型的订单',
						    success: function (res) {
						        if (res.confirm) {
						            console.log('用户点击确定');
									uni.reLaunch({
										url:"../index/index"
									})
						        } else if (res.cancel) {
						            console.log('用户点击取消');
						        }
						    }
						});
					}else{
						this.$myRequest({
							url:'work/take',
							data:{
								uid:user_uid,
								code:code,//订单编号
								WorkNautica:[uni.getStorageSync('longitude'),uni.getStorageSync('latitude')],
								phone:phone
							},
							methods:"POST"
							
						}).then(res=>{
						// 	console.log(res);
						// const data = JSON.parse(res.data);
							if(res.data.code == 200){
								console.log(res.data.msg);
								that.show = true;
								that.isactive = true;
								let badgecont = 0;
								// that.$badge++;
								badgecont ++;
								// console.log(this.$badge);
								uni.$emit('updatebadgecont',{badgecont:badgecont});
								// setTimeout(()=>{
								// 	uni.navigateBack({
								// 		delta: 1
								// 	});
								// },3000);
							}else if(res.data.code == 300){
								console.log(res.data.msg);
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
				} 
				else if(user_uid) {
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
				else {
					uni.showModal({
					    title: '提示',
					    content: '请先登录后操作',
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
								//如果没有手机说明用户没有注册跳转
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
			    		// that.latitude = res.latitude;
			    		// that.longitude = res.longitude;
			    		//注册页面经纬度缓存
			    		uni.setStorageSync('longitude', res.longitude);
			    		uni.setStorageSync('latitude', res.latitude);
			    		that.covers[1].longitude=uni.getStorageSync('longitude');
			    		that.covers[1].latitude=uni.getStorageSync('latitude');
			    		//腾讯地图
			    		// that.getTxmap(res.latitude,res.longitude)
			    		
			    	},
			    	fail(res) {
						console.log("获取地理位置失败");
			    		console.log(res);
			    		
			    	}
			    });
			},
		},
		//自定义分享页面
		onShareAppMessage(e){
			return {
				title: this.data.type+"/"+this.data.duration+"/"+this.data.budget+"元",

				path: this.currentpage+"?detailDate=" + encodeURIComponent(JSON.stringify(this.data)),
				imageUrl:this.$overShare.imageUrl,
				
			}
		}
	}
</script>

<style scoped lang="scss">
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
		height: 620upx;
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
		height: 186upx;
		flex-direction: column;
		justify-content: center !important;
		align-items: center;
	}
	.label{
		justify-content: flex-start !important;
	}
	.graytd .r-txt{
		margin-bottom: 20rpx;
		height: 40rpx !important;
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
		width: 40%;
		height:76upx ;
		font-size: 40upx;
		line-height: 76upx;
		margin:40upx auto;
		color: #FFFFFF;
		background: #339949;
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
