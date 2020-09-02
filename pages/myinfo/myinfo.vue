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
						<view class="iconfont icondiliweizhi"></view>
						<view class="add">眉山市 仁寿县</view>
					</view>
				</view>
			</view>
			<!-- 用户信息列表 -->
			<view class="user-data">
				<view class="user-avatar">
					<view class="l-text">头像</view>
					<view class="r-text">
						<block v-if="lists.length>0">
							<view class="pre-item" v-for="(item, index) in lists" :key="index">

								<image class="pre-item-image" :src="item.url" mode="aspectFill"></image>
							</view>
						</block>
						<block v-else>
							<image src="http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg" mode=""></image>
						</block>
						<!-- <image src="http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg" mode=""></image> -->

						<u-icon style="padding-left: 25upx;" name="arrow-right" color="#a69ea3" size="28"></u-icon>
					</view>
				</view>
			</view>
			<view class="user-data">
				<view class="user-avatar">
					<view class="l-text">昵称</view>
					<view class="r-text">
						<input type="text" value="" v-model="name" focus placeholder="更改昵称" />
						<!-- <view class="txt" >{{name}}</view> -->
						<u-icon style="padding-left: 25upx;" name="arrow-right" color="#a69ea3" size="28"></u-icon>
					</view>
				</view>
			</view>
			<view class="user-data">
				<view class="user-avatar">
					<view class="l-text">手机号</view>
					<view class="r-text">
						<input type="text" value="" v-model="tel" focus placeholder="更改手机号码" />
						<!-- <view class="txt">{{tel}}</view> -->
						<u-icon style="padding-left: 25upx;" name="arrow-right" color="#a69ea3" size="28"></u-icon>
					</view>
				</view>
			</view>
			<view class="user-data">
				<view class="user-avatar">
					<view class="l-text">服务类型</view>
					<view class="r-text" @tap="show=true">
						<view class="txt">{{type}}</view>
						<u-icon style="padding-left: 25upx;" name="arrow-right" color="#a69ea3" size="28"></u-icon>
					</view>
				</view>
			</view>
			<button @click="submit">保存信息</button>
			<!-- <u-upload  ref="uUpload" :action="action"></u-upload> -->
			<u-upload style="opacity:0" :custom-btn="true" ref="uUpload" :show-upload-list="showUploadList" :action="action"
			 :max-count="maxcount">
				<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
					<u-icon name="photo" size="60" color="#c0c4cc"></u-icon>
				</view>
			</u-upload>
			<!-- 类型选择 -->
			<u-select v-model="show" :list="list"  @confirm="confirm"></u-select>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				action: 'localhost', // 演示地址
				name: "苏达强",
				tel: "1996***5227",
				maxcount: 1,
				type:"家政保洁",
				list: [{
						value: '家政保洁',
						label: '家政保洁'
					},
					{
						value: '开荒保洁',
						label: '开荒保洁'
					}
				],
				showUploadList: false,
				// 如果将某个ref的组件实例赋值给data中的变量，在小程序中会因为循环引用而报错
				// 这里直接获取内部的lists变量即可
				lists: [{
						url: '../../static/logo.png', // 预览图片的地址
						error: false, // 上传失败，此值为true
						progress: 100, // 0-100之间的值
					}

				],
				src: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
				text: '无头像',
				count: 5,
				value: 4
			}
		},
		methods: {
			submit() {
				uni.showLoading({
					title: '保存中'
				});

				setTimeout(function() {
					uni.hideLoading();
					uni.showToast({
						title:"保存成功"
					})
				}, 2000);
				
			},
			// 类型选择
			confirm(e) {
				console.log(e);
				this.type = e[0].label
				
			}
		},
		onLoad() {

		},
		onReady() {
			// 得到整个组件对象，内部图片列表变量为"lists"
			this.lists = this.$refs.uUpload.lists;
		}
	}
</script>

<style scoped>
	/* 页面 */
	.content {
		background-color: #F2F2F2;
		padding-left: 25upx;
		padding-right: 25upx;
		padding-top: 25upx;
		padding-bottom: 25upx;
	}

	/* 用户信息 */
	.p-data {
		display: flex;
		align-items: center;
	}

	.p-data .avatar {
		flex-shrink: 0;
		/* flex: 1; */


	}

	.p-data .avatar .u-avatar {
		width: 160upx !important;
		height: 160upx !important;
		border-radius: 100%;
		padding: 6upx;
		background-color: #FFFFFF !important;
	}

	.p-data .information {
		padding-left: 60upx;
	}

	.p-data .information .rate {
		display: flex;
		margin-bottom: 10upx;
	}

	.p-data .information .rate .scroe {
		padding-left: 20upx;
	}

	.p-data .information .nickname {
		font-size: 40upx;
		font-weight: bold;
		margin-bottom: 10upx;
	}

	.p-data .information .address {
		font-size: 36upx;
		margin-bottom: 10upx;
		display: flex;
		/* justify-content: space-between; */
	}

	.p-data .information .address .add {
		padding-left: 25upx;
	}

	/* 用户列表信息 */
	.user-data {
		background-color: #FFFFFF;
		border-radius: 12upx;
		width: 100%;
		display: flex;
		height: 126upx;
		margin-top: 25upx;
	}

	.user-data .user-avatar {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}

	.user-data .user-avatar .l-text {
		width: 50%;
		font-size: 30upx;
		color: #4D4D4D;
		line-height: 126upx;
		padding-left: 25upx;
	}

	.user-data .user-avatar .r-text {
		display: flex;
		/* width: 50%; */
		align-items: center;
		padding-right: 25upx;
	}

	.user-data .user-avatar .r-text image {
		width: 100upx;
		height: 100upx;
		border-radius: 100%;

	}

	.user-data .user-avatar .r-text input {
		padding-left: 35%;
		text-align: right;

	}

	/* button */
	.u-btn {
		width: 482upx;
		height: 76upx;
		background-color: #F86032;
		border-radius: 8upx;
		color: #FFFFFF;
		margin: 0 auto;
		margin-top: 148upx;
		margin-bottom: 214upx;
	}
	button{
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
	.u-upload {
		position: absolute;
		top: 242upx;
		right: 118upx;

	}
</style>


</style>
