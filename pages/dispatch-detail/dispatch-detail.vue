<template>
	<view>
		<!-- 自定义导航栏 -->
		<u-navbar :is-back="true" back-icon-color="#ffffff"  title="服务订单详情" :height="height" :background="background" title-color="#ffffff"></u-navbar>
		<swiperTabHead :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></swiperTabHead>
		<view class="content">
			<view class="text">恭喜您接单成功！</view>
			<view class="text">等待上门</view>
			<view class="">
				<view class="order-detail">
					<view class="contact">
						<view class="name">
							<view class="sever">{{data.name}}</view>
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
						<view class="">服务时长:{{data.door_time}}</view>
						<view class="">客户电话:{{data.tel}}</view>
					</view>
					<view class="textdetail">
						<view class="">工具要求:{{data.label}}</view>
					</view>
					<view class="textdetail">
						<view class="">所在位置:{{data.origin}}</view>
					</view>
					<view class="textdetail">
						<view class="">备注:{{data.content}}</view>
					</view>
				</view>
			</view>
			<button type="default" class="btn" @tap="start">服务完成</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 自定义导航栏
				height:"",
				background:{
					backgroundImage: "linear-gradient(90deg, #54C3F1, #00ABEB)",
				},
				// 自定义导航栏
				data:{}
			}
		},
		onLoad(event) {
			// TODO 后面把参数名替换成 payload
			const payload = event.serverDate;
			// 目前在某些平台参数会被主动 decode，暂时这样处理。
			try {
				this.data= JSON.parse(decodeURIComponent(payload));
				console.log("详情页参数");
				console.log(this.data);
			} catch (error) {
				this.data = JSON.parse(payload);
				console.log("详情页参数");
				console.log(this.data);
			}
		},
		methods: {
			start(){
				let that = this;
				uni.showModal({
					  title: '提示',
					    content: '订单服务已结束,订单完成后可到订单中心查看结款状态',
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
								that.getAccomplish(that.data.code);
								uni.navigateTo({
									url:"../order/order"
								})
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
				})
			},
			//拉去用户订单完成信息
			getAccomplish(code){
				
				uni.request({
					url:this.$apiUrl+"work/accomplish",
					method:"POST",
					dataType:JSON,
					data:{
						uid:this.data.uid,
						code:code,
					},
					success(res) {
						console.log("完成订单");
						console.log(res);
					},
					fail(res) {
						console.log(res);
						uni.showToast({
							title:"服务器无响应"
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
	.content{
		background: linear-gradient(90deg, #00ABEB, #54C3F1);
		height: 1214upx;
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
		margin: 100upx 25upx;
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
</style>
