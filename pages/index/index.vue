<template>
	<view>
		<view class="content">
			<!-- 地理位置 -->
			<view class="location">
				<span class="iconfont icondiliweizhi"></span>
				<span>仁寿县</span>
			</view>
			<!-- 滚动通知 -->
			<u-notice-bar mode="vertical" :list="notice" :duration="2500"></u-notice-bar>
			<!-- 接单列表 -->
			<!-- 列表 -->
			<view class="orderlist">
				<view class="order-item">
					<view class="item-l">
						<view class="title">家政服务/日常保洁/2小时</view>
						<view class="address">仁寿县中城国际社区2楼</view>
						<view class="distance">距离：<1.6公里</view>
						<view class="tool"><span>毛巾</span><span>扳手大锤</span><span>长托帕</span></view>
						<view class="vtime">上门时间：2020-8-22 14:00</view>
					</view>
					<view class="item-r">
						<view class="img">
							<image src="../../static/logo.png" mode=""></image>
						</view>
						<view class="price">160元</view>
						<view class="status">平台审核中</view>
					</view>
				</view>
				<view class="order-item">
					<view class="item-l">
						<view class="title">家政服务/日常保洁/2小时</view>
						<view class="address">仁寿县中城国际社区2楼</view>
						<view class="distance">距离：<1.6公里</view>
						<view class="tool"><span>毛巾</span><span>扳手大锤</span><span>长托帕</span></view>
						<view class="vtime">上门时间：2020-8-22 14:00</view>
					</view>
					<view class="item-r">
						<view class="img">
							<image src="../../static/logo.png" mode=""></image>
						</view>
						<view class="price">160元</view>
						<view class="status">平台审核</view>
					</view>
				</view>
			</view>
		</view>
	</view>


</template>

<script>
	const Mock = require("../../common//mock.mp.js")
	export default {
		data() {
			return {
				notice: [
					
				],
				current:0,
				tabsList: [{
						name: '待抢单'
					},
					{
						name: '已抢单'
					}
				],
			}
		},
		onLoad() {
			//用户授权
			uni.authorize({
				scope: 'scope.userLocation',
				success() {
					//若是用户同意授权，则会跳转到此函数，可以在此调用获取位置信息的api
					// 腾讯地图地理位置api
					uni.getLocation({
						type: 'gcj02', //腾讯地图使用gcj02获取位置坐标
						success: function(res) {
							console.log('当前位置的经度：' + res.longitude);
							console.log('当前位置的纬度：' + res.latitude);
						}
					});
				},
				fail(err) {
					console.log(err)
				}
			});
			// mock数据
			const Random = Mock.Random;
			Random.cname();
			Random.city();
			const data =  Mock.mock({
				'list|5-20': [{
				        name :"@cname()",
				        city:'@city(true)',
						"type|+1": [
						    "日常保洁" ,
							"开荒保洁",
							"上门除甲醛",
							"上门维修",
						  ]
				    }]
				
			}  
			);
			console.log(data);
			for (var i = 0; i < data.list.length; i++) {
				var str = "恭喜--"+data.list[i].name+"--抢到"+data.list[i].city+"--"+data.list[i].type+"--订单";
				this.notice.push(str);
			}
			console.log(this.notice)
		},
		methods: {
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
			},

		}
	}
</script>

<style scoped>
	/* content */
	.content {}

	/* < 地理位置 */
	.location {
		background-color: #f85f31;
		width: 100%;
		height: 51upx;
		color: #FFFFFF;
		padding-left: 25upx;
		padding-right: 25upx;
	}

	.location .icondiliweizhi {
		font-size: 28upx;
		padding-right: 10upx;
	}
	/* tabs */
	/* orderlist */
	.orderlist{
		
	}
	.order-item{
		border-bottom: 1upx solid #a7a7a7;
		border-top: 1upx solid #a7a7a7;
		display: flex;
		justify-content: space-between;
		padding-top: 40upx;
		padding-bottom: 30upx;
		padding-left: 25upx;
		padding-right: 25upx;
	}
	.order-item .item-l .title{
		font-weight: bold;
		font-size: 40upx;
		margin-bottom: 30upx;
	}
	.order-item .item-l .address{
		
		font-size: 28upx;
		color: #969CA8;
		margin-bottom: 30upx;
		font-weight: bold;
	}
	.order-item .item-l .distance{
		font-size: 28upx;
		color: #FA5741;
		margin-bottom: 30upx;
		font-weight: bold;
	}
	.order-item .item-l .tool{
		font-size: 28upx;
		color: #3072F6;
		margin-bottom: 30upx;
		font-weight: bold;
	}
	.order-item .item-l .tool span{
		padding-left: 10upx;
		padding-right: 10upx;
		padding-top: 4upx;
		padding-bottom: 4upx;
		background-color:  #e6e8f6;
		margin-bottom: 10upx;
		margin-right: 10upx;
		border-radius: 8upx;
	}
	.order-item .item-l .vtime{
		color: #3072F6;
		font-weight: bold;
		
	}
	.order-item .item-r{
		display: flex;
		flex-direction: column;
		text-align: center;
		width: 220upx;
	}
	.order-item .item-r .img image{
		border-radius: 100%;
		flex-shrink: 0;
		width: 160upx;
		height: 160upx;
	}
	.order-item .item-r .price{
		color: #FA5741;
		font-size:32upx;
		font-weight: bold;
		margin-top: 20upx;
		margin-bottom: 20upx;
	}
	.order-item .item-r .status{
		height: 60upx;
		line-height: 60upx;
		font-size: 32upx;
		font-weight: bold;
		color: #FFFFFF;
		background-color: #FA5741;
		border-radius: 40upx;
		padding: 0 30upx;
	}
	.success{
		background-color: #FA5741;
	}
	.fail{
		background-color: #cccccc;
	}
</style>
