<template>
	<view>
	<!-- 订单列表 -->
		<view class="wait-list">
			<view class="info" >
				<view class="parm" @tap="goDetail(item)">
					<view class="parm-txt title">{{item.type}}/{{item.duration}}</view>
					<view class="parm-tips">
						<view class="parm-item-l">
							<view class="parm-txt">{{item.origin}}</view>
							<view class="parm-txt door-time">上门时间：{{item.door_time}}</view>
						</view>
						<view class="parm-item-r">
							<template v-if="item.Distance">
								<view class="parm-txt">{{item.Distance}}公里</view>
							</template>
						</view>
					</view>
					<view class="parm-txt label">
						<block v-for="(items,indexs) in item.label" :key="indexs">
							<view class="label-item">{{items}}</view>
						</block>
					</view>
					<view class="price parm-txt">￥{{item.budget}}元</view>
					<template v-if="item.reason">
						<view  class="parm-txt reason">取消原因：{{item.reason}}</view>
					</template>
				</view>
			</view>
			<view class="btn-group">
				<button type="default" class="btn" >服务完成</button>
				<button type="default" class="btn active" @tap="start" @>立即抢单</button>
			</view>
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
									url:"../order/order?e=1"
								})
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
		height: 160upx;
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
		width: 100%;
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
		width: 300rpx;
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