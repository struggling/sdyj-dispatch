<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<view v-if="isCanUse">
			<view>
				<view class='header'>
					<image src='../../static/logo.png'></image>
				</view>
				<view class='content'>
					<view>申请获取以下权限</view>
					<text>获得你的公开信息(昵称，头像、地区等)</text>
				</view>

				<button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">
					授权登录
				</button>
				
				<button type="default" class="" @tap="getinfo">获取缓存</button>
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isCanUse:true
			};
		},
		methods: {
			// 用户点击授权
			wxGetUserInfo() {
				uni.login({
					success(res) {
						let code = res.code
						//获取用户信息
						uni.getUserInfo({
							success(data) {
								console.log(data);
								uni.request({
										url: "https://applet.51tiaoyin.com/public/applet/login/",
										method: "GET",
										data: {
											"code": code,
											"iv": data.iv,
											"encryptedData": data.encryptedData
										},
										success(res) {
											JSON.stringify(res);
											console.log(res);
											uni.showToast({
												title: "登录成功"
											});
											// uni.reLaunch({
											// 	url:"../index/index",
											// });
											// 把用户信息写入缓存
											uni.setStorage('user_name', res.data.wechat_name);
											uni.setStorage('user_avatar', res.data.wechat_img);
											uni.setStorage('user_uid', res.data.wechat_uid);
										},
										fail(res) {
											uni.showToast({
												title: '获取授权信息失败',
												icon: 'none'
											});
											console.log(res);
										}
									})
							}
						})
					}
				})
			},
			//获取用户缓存信息
			getinfo(){
				uni.getStorage({
					key: 'user_uid',
					success(res) {
						console.log(res.data);
					},
					fail(res) {
						console.log(res);
					}
				})
			},
			},
		onLoad() {
			
		}
	}
</script>
<style>
	.header {
		margin: 90rpx 0 90rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
	}

	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}

	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}

	.bottom {
		border-radius: 80rpx;
		margin: 70rpx 50rpx;
		font-size: 35rpx;
	}
</style>
