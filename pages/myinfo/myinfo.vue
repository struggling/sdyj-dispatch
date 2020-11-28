<template>
	<view>
		<view class="content" :style="{height:swiperheight+'px'}">
			<!-- 用户基本数据 -->
			<view class="p-data">
				<view class="avatar">
					<u-avatar :src="data.avatar"></u-avatar>
				</view>
				<view class="information">
					<view class="nickname">{{name}}</view>
					<view class="address">
						<view class="iconfont icondiliweizhi"></view>
						<view class="add">{{datas.user_address}}</view>
					</view>
				</view>
			</view>
			<!-- 用户信息列表 -->
			<view class="user-data">
				<view class="user-avatar">
					<view class="l-text">更改名称</view>
					<view class="r-text">
						<input type="text" value="" v-model="name" focus placeholder="更改昵称" />
						<u-icon style="padding-left: 25upx;" name="arrow-right" color="#a69ea3" size="28"></u-icon>
					</view>
				</view>
			</view>
			<view class="user-data">
				<view class="user-avatar">
					<view class="l-text">更改电话</view>
					<view class="r-text">
						<input type="text" value="" v-model="phone" focus placeholder="更改手机号码" />
						<u-icon style="padding-left: 25upx;" name="arrow-right" color="#a69ea3" size="28"></u-icon>
					</view>
				</view>
			</view>
			<view class="user-data" @tap="openmask">
				<view class="user-avatar">
					<view class="l-text">更改服务类型</view>
					<view class="r-text">
						<input type="text" value="counttype" v-model="counttype"  focus placeholder="请点击" disabled="true"/>
						<u-icon style="padding-left: 25upx;" name="arrow-right" color="#a69ea3" size="28"></u-icon>
					</view>
				</view>
			</view>
			<view class="user-data" @tap="goaddress">
				<view class="user-avatar">
					<view class="l-text">更改收货地址</view>
					<view class="r-text">
						<input type="text"  v-model="address" focus  placeholder="请选择收货地址" disabled="true" />
						<u-icon style="padding-left: 25upx;" name="arrow-right" color="#a69ea3" size="28"></u-icon>
					</view>
				</view>
			</view>
			<!-- 类型选择弹框 -->
			<select-type ref="selecttype" @genggaifenlei="genggaifenlei"></select-type>
			<block v-if="baocun">
				<button  class="theme" disabled="true">保存中...</button>
			</block>
			<block v-else><button @click="submit" class="theme">保存信息</button></block>
		</view>
	</view>
</template>

<script>
	import jpSelect from '@/components/jp-select/jp-select.vue';
	import selectType from "../../components/select-type/select-type.vue";
	export default {
		 components: {
		            jpSelect,
					selectType
		},
		data() {
			return {
				show:false,
				baocun:false,
				datas:{},
				swiperheight: 667,
				data:{},
				name:"",
				phone:'',
				type:[],
				counttype:"请点击",
				gaibian:false,
				address:'请选择收货地址'
			}
		},
		watch:{
			phone(old,val){
				if(!old == val){
					// this.gaibian = false
				}else{
					this.gaibian = true
				}
			},
			name(old,val){
				if(!old == val){
					// this.gaibian = false
				}else{
					this.gaibian = true
				}
			},
			counttype(old,val){
				if(!old == val){
					// this.gaibian = false
				}else{
					this.gaibian = true
				}
			},
			address(old,val){
				this.gaibian = true
			},
		},
		onLoad(event) {
			//设置容器高度
			uni.getSystemInfo({
				success: (res) => {
					console.log(res.windowHeight);
					let height = res.windowHeight - uni.upx2px(161);
					this.swiperheight = height;
				}
			});
			// TODO 后面把参数名替换成 payload
			
			// console.log(event.userinfo );
			const address = event.detailDate
			if(address){
				try{
					this.address = JSON.parse(decodeURIComponent(address)).site;
					this.gaibian = true;
					console.log(this.gaibian);
					console.log(this.address);
				}catch (error) {
				this.address = JSON.parse(address);
				console.log(this.address);
			};
				
			}
			let user_name =uni.getStorageSync("user_name");
			let user_avatar = uni.getStorageSync("user_avatar");
			let user_phone = uni.getStorageSync("user_phone");
			let user_address = uni.getStorageSync("address");
			let user_type = uni.getStorageSync("user_type");
			let user_score = uni.getStorageSync("user_score");
			this.datas ={
				user_name	:	user_name,
				user_avatar	:	user_avatar,	
				user_phone	:	user_phone,		
				user_address	:	user_address,	
				user_type	:	user_type,	
				user_score	:	user_score,
			};
			this.getInfo();

		},
		methods: {
			//跳转收货地址
			goaddress(){
				// this.gaibian = true;
				uni.navigateTo({
					url:"../address/address?page=2"
				})
			},
			//genggaifenlei
			genggaifenlei(fenlei){
				console.log(fenlei.length,"打印分类属性");
				this.counttype = fenlei;
			},
			//打开遮罩
			openmask(){
				console.log(this.$refs.selecttype,"子分类属性");
				this.$refs.selecttype.show = true;
			},
			//获取用户信息
			getInfo(){
				// this.gaibian = true;
				this.$myRequest({
					url:'user/getInfo',
					data:{},
					methods:"POST"
				}).then(res=>{
					console.log(res);
				// const data = JSON.parse(res.data);
					if(res.data.code == 200){
						console.log(res.data.msg);
						console.log(res.data.data);
						this.data = res.data.data;
						// console.log(this.data);
						 this.phone =this.data.phone;
						this.name =this.data.wechat_name;
						
					}else if(res.data.code == 300){
						console.log(res.data.msg);
				
					}else{
						console.log(res.data.msg)
					}
				})
			},
			//提交修改信息
			submit() {
				if(this.gaibian){
					this.gaibian = false,
					this.baocun =true;
					uni.showLoading({
						title: '保存中'
					});
					let phone = this.phone;
					// let nickname = this.data.user_name;
					let nickname = this.name;
					let counttype = "";
					if(this.counttype==""){
						counttype = uni.getStorageSync("type");
					}else{
						counttype = this.counttype
					}
					this.$myRequest({
						url:'user/updateInfo',
						data:{
							phone:phone,
							nickname:nickname,
							type:counttype,
						},
						methods:"POST"
					}).then(res=>{
						console.log(res);
						this.baocun =false;
					// const data = JSON.parse(res.data);
						if(res.data.code == 200){
							console.log(res.data.msg);
								uni.setStorageSync("type",counttype);
								uni.hideLoading();
								
								uni.showToast({
									title:"保存成功"
								});
								// uni.setStorageSync("user_name",this.name)
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
							console.log(res.data.msg)
						}
					})
					uni.hideLoading();
				}else{
					uni.showToast({
						icon:"none",
						title:"信息未更新,请修改信息",
						duration:3000
					})
				}
			},
		},
		onReady() {
			// 得到整个组件对象，内部图片列表变量为"lists"
			// this.lists = this.$refs.uUpload.lists;
		},
		onBackPress() {
			console.log("监听返回");
				uni.$emit('updatename',{msg:this.name});
				uni.switchTab({
				    url: '../home/home'
				});
		},
		// 用页面卸载周期替代返回建，在小程序中监听页面返回
		onUnload(){
			// uni.switchTab({
			//     url: '../home/home'
			// });
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
		text-overflow: ellipsis;
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
