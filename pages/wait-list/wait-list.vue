<template>
	<view>
		<!-- 顶部自定义导航 -->
		<u-navbar :is-back="true"  title="订单详情" :height="height" :background="background" title-color="#ffffff" back-icon-color="#ffffff" >
		</u-navbar>
		<!-- map -->
		<map :latitude="latitude" :longitude="longitude" :markers="covers"></map>
		<!-- orderDetail -->
		<view class="orderDetail">
			<view class=" iconfont icongerenzhongxin-zhong">
				<span style="padding-left: 25upx;">客户订单信息</span>
			</view>
			<view class="parameter">
				<view class=" iconfont icontongxunlu">
					<span style="padding-left: 25upx;">王先生</span>
				</view>
				<view class="r-txt">
					<span style="padding-left: 25upx;">服务类型：家政保洁</span>
				</view>
			</view>
			<view class="parameter">
				<view class=" iconfont iconshouji">
					<span style="padding-left: 25upx;">1322****5123</span>
				</view>
				<view class="r-txt ">
					<span style="padding-left: 25upx;">参考价格：160元</span>
				</view>
			</view>
			<view class="parameter">
				<view class=" r-txt">
					<span>服务时长：2小时</span>
				</view>
				<view class="r-txt ">
					<span style="padding-left: 25upx;">人员要求：2人</span>
				</view>
			</view>
			<view class="parameter">位置：四川省眉山市仁寿县中城国际社区24栋1单元202</view>
			<view class="parameter">工具要求：吸尘器    蒸汽机   除螨器   吸尘器    蒸汽机   除螨器</view>
			<view class="parameter">备注：不要毛巾，哈哈啊哈哈哈，真的不要毛巾，哈哈啊哈哈哈 真的不要毛巾，哈哈啊哈哈哈，真的</view>
			<button type="default" class="theme">立即抢单</button>
			<image src="../../static/logo.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				height:"",
				background:{
					backgroundImage:"linear-gradient(90deg, #00ABEB, #54C3F1)",
				},
				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 29.993299,
				longitude: 104.154709,
				covers: [
					{
					id: 0, 
					latitude: 29.994521,
					longitude: 104.154741,
					iconPath: '../../static/wait-list/location.png',
					width:20,
					height:20,
					content:'唐山迁安',//文本
				}, 
				{
					latitude: 29.992511,
					longitude: 104.151347,
					iconPath: '../../static/wait-list/location.png'
				},
				]
			}
		},
		onLoad() {
			
		},
		methods: {

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
		width: 482upx;
		height:76upx ;
		font-size: 40upx;
		line-height: 76upx;
		margin:40upx auto;
	}
	/* 修改小程序的默认button样式 */
	button{
		-webkit-appearance:none
	}
</style>
