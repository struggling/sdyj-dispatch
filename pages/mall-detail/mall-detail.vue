<template>
	<view>
		<!-- 商品轮播 -->
		 <swiper style="height: 680upx;" class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
			<swiper-item>
				<view class="swiper-item uni-bg-red"><image class="pic" :src="data.img" mode=""></image></view>
			</swiper-item>
			<!-- <swiper-item>
				<view class="swiper-item uni-bg-green"></view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item uni-bg-blue"></view>
			</swiper-item> -->
		</swiper>
		<!-- 商品内容 -->
		<view class="content">
			<view class="top">
				<view class="title">{{data.name}}</view>
				<view class="score">{{data.original_price}} 分</view>
			</view>
			<view class="detail">
				{{data.description}}
			</view>
		</view>
		<view class="btn">
			<view  @tap="openmask=true" class="iconfont iconkefu kefu" style="text-align: center;">
				<view>客服</view>
				</view>
			<view class="duihuan" @tap="getExchange(data.index,data.id)">立即兑换</view>
		</view>
		<!-- 客户电话遮罩 -->
		<customer-service  :openmask="openmask" @closemask="closemask"></customer-service>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				openmask:false,
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 5000,
				duration: 500,
				data:{},
				userName:"hah",
				cityName:'',
				detailInfo:"",
				telNumber:""
			}
		},
		onLoad(event) {
			// TODO 后面把参数名替换成 payload
			const payload = event.detailDate;
			
			// 目前在某些平台参数会被主动 decode，暂时这样处理。
			try {
				this.data= JSON.parse(decodeURIComponent(payload));
				console.log(this.data);

			} catch (error) {
				this.data = JSON.parse(payload);
				console.log(this.data);
			};
			var pages = getCurrentPages();
			var page = pages[pages.length - 1];
			var currentpage = page.route;
			this.currentpage = currentpage;
			console.log(currentpage);
		},
		methods: {
			closemask(){
				this.openmask = false;
			},
			 changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.target.value
			},
			durationChange(e) {
				this.duration = e.target.value
			},
			
			getExchange(index,id){
				let that  =this;
				uni.chooseAddress({
				  success(res) {
				    console.log(res.userName)
				    console.log(res.postalCode)
				    console.log(res.provinceName)
				    console.log(res.cityName)
				    console.log(res.countyName)
				    console.log(res.detailInfo)
				    console.log(res.nationalCode)
				    console.log(res.telNumber)
					that.$myRequest({
						url:'mall/exchange',
						data:{
							id:id,
							addressee:res.userName,//收件人
							phone:res.telNumber,//phone
							city:res.cityName,//城市
							detailed:res.detailInfo//详细地址
						},
						methods:"POST"
					}).then(res=>{
						console.log(res);
					// const data = JSON.parse(res.data);
						if(res.data.code == 200){
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
							// console.log(res.data.data);
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
						}
					})
				  }
				})	
			},
		}
	}
</script>

<style lang="scss">
	uni-swiper {
	    display: block;
	    height: 680upx;
	}
	.swiper{
		.swiper-item{
			height: 680upx;
			.pic{
				height: 680upx;
				width: 100%;
			}
		}
		
	}
	// 商品类容.
	.content{
		margin-top: 80upx;
		margin-left: 40upx;
		margin-right: 40upx;
		.top{
			display: flex;
			justify-content: space-between;
			font-size:40upx ;
			font-weight: bold;
			.score{
				color: #2967FF;
			}
		}
		.detail{
			color:#232628;
			font-size: 26upx;
			margin-top: 60upx;
			margin-bottom:60upx;
			overflow: hidden;
			height: 200upx;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 4;
			-webkit-box-orient: vertical;
			line-height: 50upx;
		}
	}
	.btn{
		padding: 20upx;
		padding-left: 40upx;
		padding-right: 40upx;
		display: flex;
		align-items: center;
		border-top: 1upx solid #d0d0d0;
		position: fixed;
		bottom: 0;
		.kefu{
			color: #666666;
		}
		.duihuan{
			margin-left: 80upx;
			width: 536upx;
			height: 80upx;
			padding-left: 80upx;
			background: linear-gradient(133deg, #48C0FF 0%, #0F80FF 100%);
			border-radius: 12upx;
			text-align: center;
			color: #FFFFFF;
			line-height: 80upx;
		}
	}
</style>
