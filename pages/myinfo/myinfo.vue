<template>
	<view>
		<!-- 顶部自定义导航 -->
		<u-navbar :is-back="true" title="个人信息" :height="height" :background="background" title-color="#ffffff"
		 back-icon-color="#ffffff">
		</u-navbar>
		<view class="content" :style="{height:swiperheight+'px'}">
			<!-- 用户基本数据 -->
			<view class="p-data">
				<view class="avatar">
					<u-avatar :src="data.user_avatar"></u-avatar>
				</view>
				<view class="information">
					<view class="nickname">{{data.user_name}}</view>
					<view class="rate">

						<u-rate :count="count" v-model="value" inactive-color="#b2b2b2" active-color="#F86032"></u-rate>
						<view class="scroe">4.9分</view>
					</view>

					<view class="address">
						<view class="iconfont icondiliweizhi"></view>
						<view class="add">{{data.user_address}}</view>
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
							<image :src="data.user_avatar" mode=""></image>
						</block>
						<!-- <image src="http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg" mode=""></image> -->

						<u-icon style="padding-left: 25upx;" name="arrow-right" color="#a69ea3" size="28"></u-icon>
					</view>
				</view>
			</view>
			<view class="user-data">
				<view class="user-avatar">
					<view class="l-text">{{data.user_name}}</view>
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
						<input type="text" value="" v-model="data.user_phone" focus placeholder="更改手机号码" />
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
			<button @click="submit" class="theme">保存信息</button>
			<!-- <u-upload  ref="uUpload" :action="action"></u-upload> -->
			<u-upload style="opacity:0" :custom-btn="true" ref="uUpload" :show-upload-list="showUploadList" :action="action"
			 :max-count="maxcount">
				<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
					<u-icon name="photo" size="60" color="#c0c4cc"></u-icon>
				</view>
			</u-upload>
			<!-- 类型选择 -->
			<u-select v-model="show" :list="list" mode="mutil-column-auto"  @confirm="confirm"></u-select>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:{},
				swiperheight: 667,
				height: "",
				background: {
					backgroundImage: "linear-gradient(90deg, #54C3F1, #00ABEB)",
				},
				show: false,
				action: 'localhost', // 演示地址
				maxcount: 1,
				type:"家政保洁",
				list: [
					{
						value: 1,
						label: '中国',
						children: [
							{
								value: 2,
								label: '广东',
								children: [
									{
										value: 3,
										label: '深圳'
									},
									{
										value: 4,
										label: '广州'
									}
								]
							},
							{
								value: 5,
								label: '广西',
								children: [
									{
										value: 6,
										label: '南宁'
									},
									{
										value: 7,
										label: '桂林'
									}
								]
							}
						]
					},
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
		onLoad(event) {
			// console.log("aaa");
			//设置容器高度
			uni.getSystemInfo({
				success: (res) => {
					console.log(res.windowHeight);
					let height = res.windowHeight - uni.upx2px(161);
					this.swiperheight = height;
				}
			});
			// TODO 后面把参数名替换成 payload
			
			console.log(event.userinfo );
			const payload = event.userinfo || event.payload;
			// 目前在某些平台参数会被主动 decode，暂时这样处理。
			try {
				this.data= JSON.parse(decodeURIComponent(payload));
				
				console.log(this.data);
			} catch (error) {
				this.data = JSON.parse(payload);
				console.log(this.data);
			};
			this.getInfo();
		},
		methods: {
			//获取用户信息
			getInfo(){
				this.$myRequest({
					url:'user/getInfo',
					data:{},
					methods:"POST"
				}).then(res=>{
					console.log(res);
				// const data = JSON.parse(res.data);
					if(res.data.code == 200){
						console.log(res.data.msg);
						// this.data = res.data.data
						let arr  = res.data.data.type.split(',');
						this.type  =arr[0];
					}else if(res.data.code == 300){
						console.log(res.data.msg);
				
					}else{
						console.log(res.data.msg)
					}
				})
			},
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
		onReady() {
			// 得到整个组件对象，内部图片列表变量为"lists"
			this.lists = this.$refs.uUpload.lists;
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
		button::after{
			border:none
		}
	.u-upload {
		position: absolute;
		top: 242upx;
		right: 118upx;

	}
</style>


</style>
