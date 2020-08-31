<template>
	<view>
		<view class="content">
			<!-- 用户基本数据 -->
			<view class="p-data">
				<view class="avatar">
					<u-avatar :src="src"></u-avatar>
				</view>
				<view class="information">
					<view class="nickname">苏达强</view>
					<view class="rate">
						
						<u-rate :count="count" v-model="value" inactive-color="#b2b2b2" active-color="#F86032"></u-rate>
						<view class="scroe">4.9分</view>
					</view>
					
					<view class="address">
						<view class="iconfont"></view>
						<view class="add">眉山市 仁寿县</view>
					</view>
				</view>
			</view>
			<!-- 用户信息列表 -->
			<view class="user-data">
				<view class="user-avatar">
					<view class="l-text">头像</view>
					<view class="r-text">
						<image src="http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg" mode=""></image>
						<u-icon name="arrow-right" color="#2979ff" size="28"></u-icon>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
				text: '无头像',
				count: 5,
				value: 4
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	/* 页面 */
	.content{
		background-color: #F2F2F2;
		padding-left: 25upx;
		padding-right: 25upx;
		padding-top: 25upx;
		padding-bottom: 25upx;
	}
	/* 用户信息 */
	.p-data{
		display: flex;
		align-items: center;
	}
	.p-data .avatar{
		flex-shrink: 0;
		/* flex: 1; */
		
		
	}
	.p-data .avatar .u-avatar{
		width: 160upx !important;
		height: 160upx !important;
		border-radius: 100%;
		padding: 6upx;
		background-color: #FFFFFF !important;
	}
	.p-data .information{
		padding-left: 60upx;
	}
	.p-data .information .rate{
		display: flex;
		margin-bottom: 10upx;
	}
	.p-data .information .rate .scroe{
		padding-left: 20upx;
	}
	.p-data .information .nickname{
		font-size: 40upx;
		font-weight: bold;
		margin-bottom: 10upx;
	}
	.p-data .information .address{
		font-size: 36upx;
		margin-bottom: 10upx;
	}
	/* 用户列表信息 */
	.user-data{
		background-color: #FFFFFF;
		border-radius: 8upx;
		width: 100%;
		display: flex;
		height: 126upx;
	}
</style>


</style>
