<template>
	<view>
		<!-- 顶部自定义导航 -->
		<u-navbar :is-back="false"  title="易工单" :height="height" :background="background" title-color="#ffffff" back-icon-color="#ffffff" >
		</u-navbar>
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
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import md5 from "../../common/md5.min.js";
	export default {
		data() {
			return {
				isCanUse:true,
				height:"",
				background:{
					backgroundImage: "linear-gradient(90deg, #54C3F1, #00ABEB)",
				},
			};
		},
		methods: {
			// 用户点击授权
			wxGetUserInfo() {
				let that = this;
				uni.login({
					success(res) {
						let code = res.code
						//获取用户信息
						uni.getUserInfo({
							success(data) {
								console.log(data);
								let token = md5("code="+code+"&iv="+data.iv+"&encryptedData="+data.encryptedData+"0a88a84a25948b4f37f622b3a3ff9fc0");
								that.$myRequest({
									url: "login/index",
									method: "GET",
									data: {
										"code": code,
										"iv":data.iv,
										"encryptedData": data.encryptedData,
									},
								}).then(res=>{
									if(res.data.code == 200){
										uni.showLoading({
										    title: '登录中'
										});
										setTimeout(
										()=>{
										uni.reLaunch({
											url:"../index/index"
										})	
										},1500);
										// 把用户信息写入缓存
										
										// console.log(res.data.data);
										console.log("获取登陆");
										let phone = res.data.data.phone;
										let type  =res.data.data.type;
										let uid  =res.data.data.uid;
										let name  =res.data.data.name;
										let number = res.data.data.number;
										let cookie = res.data.data.session_id;
										uni.setStorageSync("phone",phone);	
										console.log("手机号码"+phone);
										uni.setStorageSync("type",type);
										console.log("服务类型"+type);
										uni.setStorageSync("uid",uid);
										console.log("uid标识"+uid);
										uni.setStorageSync("name",name);
										console.log("用户姓名"+name);
										uni.setStorageSync("number",number);
										console.log("用户编号"+number);
										uni.setStorageSync('user_name',res.data.data.wechat_name);
										uni.setStorageSync('user_avatar',res.data.data.wechat_img);
										console.log("用户姓名"+res.data.data.wechat_name);
										console.log("用户头像"+res.data.data.wechat_img);
										uni.setStorageSync("cookie",cookie);
										console.log("cookie"+cookie);
									}else{
										uni.showToast({
											title: "服务器无响应"
										});
									}
								})
								
							},
							fail(res) {
								uni.showToast({
									title:"无网络..."
								})
							}
						})
					}
				})
			},
		},
		onLoad() {
			// console.log(md5);
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
		width: 300rpx;
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
	button{
		-webkit-appearance:none;
		border: none;
		height: 80upx;
		line-height: 80upx;
		background: linear-gradient(90deg, #00ABEB, #54C3F1);
		border-radius: 21upx;
	}
	button::after{
		border: none;
	}
	.bottom {
		border-radius: 80rpx;
		margin: 70rpx 50rpx;
		font-size: 35rpx;
	}
</style>
