<template>
	<view>
		<!-- 顶部自定义导航 -->
		<u-navbar :is-back="true"  title="积分商城" :height="height" :background="background" title-color="#ffffff" back-icon-color="#ffffff" >
		</u-navbar>
		<!-- 头部展示栏 -->
		<view class="top">
			<view class="bg"><image src="../../static/home/home.png" mode=""></image></view>
			<view class="panel">
				<view class="text-l">
					<view class="pic"><image src="../../static/home/home.png" mode=""></image></view>
					<view class="point">
						<view class="">总积分</view>
						<view class="">{{number}}</view>
					</view>
				</view>
				<view class="text-r">
					<view class="range"><u-icon name="star-fill" color="#ffffff" size="44" margin-left="20upx"></u-icon></view>
					<view class="text">积分明细</view>
				</view>
			</view>
		</view>
		<!-- uview content -->
		<view class="content">
			<view class="pointtip">
				<view class="line"></view>
				<view class="text"><span>积分</span>兑好礼</view>
				<view class="line"></view>
			</view>
			<view class="malllist">
				<block v-for="(item,index) in malllist" :key="index">
					<view class="mallitem" @tap="getExchange(index)">
						<view class="ppic"><image :src="item.img" mode=""></image></view>
						<view class="malltitle">{{item.name}}</view>
						<view class="malltips">{{item.original_price}}积分 ￥{{item.price}}</view>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//顶部导航栏
				height:"",
				background:{
					backgroundImage:"linear-gradient(90deg,  #54C3F1,#00ABEB)",
				},
				//顶部导航栏
				malllist:[],
				number:0
			}
		},
		onLoad() {
			this.getMallList();
		},
		methods: {
			getExchange(index){
				let name =  uni.getStorageSync("name");
				let phone =  uni.getStorageSync("phone");
				let town =  uni.getStorageSync("town");
				let address =  uni.getStorageSync("address");
				let id  =this.malllist[index].id;
				if(phone){
					this.$myRequest({
						url:'mall/exchange',
						data:{
							id:id,
							addressee:name,//收件人
							phone:phone,//phone
							city:town,//城市
							detailed:address//详细地址
						},
						methods:"POST"
					}).then(res=>{
						console.log(res);
					// const data = JSON.parse(res.data);
						if(res.data.code == 200){
							console.log(res.data.msg);
							// console.log(res.data.data);
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
						}
					})
				}else{
					uni.showModal({
					    title: '提示',
					    content: '请先完成师傅服务类型注册，在抢单',
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
								//如果没有手机说明用户没有注册跳转
								uni.navigateTo({
									url:"../register/register"
								})
					        } else if (res.cancel) {
					            console.log('用户点击取消');
								
					        }
					    }
					});
				}
				
			},
			getMallList(){
				this.$myRequest({
					url:'mall/MallList',
					data:{},
					methods:"POST"
				}).then(res=>{
					console.log(res);
				// const data = JSON.parse(res.data);
					if(res.data.code == 200){
						console.log(res.data.msg);
						console.log(res.data.data);
						this.malllist = res.data.data;
						this.number = res.data.number;
					}else if(res.data.code == 300){
						console.log(res.data.msg);
				
					}else{
						console.log(res.data.msg)
					}
				})
			}
		}
	}
</script>

<style scoped>
	.top{
		height: 211upx;
		position: relative;
	}
	.top .bg{
		height: 211upx;
	}
	.top .bg image{
		height: 211upx;
		width: 100%;
	}
	.ppic{
		text-align: center;
	}
	.ppic image{
		width: 200upx;
		height: 180upx;
	}
	.top .panel{
		position: absolute;
		top: 44upx;
		left: 53upx;
		width: 93%;
	}
	.panel {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.panel .text-l{
		display: flex;
		align-items: center;
	}
	.panel .text-l .pic{
		
	}
	.panel .text-l .pic image{
		width: 117upx;
		height: 121upx;
		border-radius: 100%;
	}
	.panel .text-r{
		background: linear-gradient(90deg, #00ABEB, #54C3F1);
		width: 186upx;
		height: 52upx;
		border-bottom-left-radius: 20upx;
		border-top-left-radius: 20upx;
		/* opacity: 0.32; */
		display: flex;
		align-items: center;
		color: #FFFFFF;
		font-weight: bold;
	}
	.panel .text-r .range{
		width: 52upx;
		height: 52upx;
		border-radius: 100%;
		
		background: linear-gradient(180deg, #FFAF00, #FFCF00);
		text-align: center;
		line-height: 52upx;
	}
	
	/* 列表样式 */
	.content{
		margin-left: 25upx;
		margin-right: 25upx;
	}
	.pointtip{
		display: flex;
		margin: 0 auto;
		align-items: center;
		justify-content: center;
	}
	.pointtip .line{
		width: 20upx;
		height: 2upx;
		background-color: #00AAEB;
		margin: 0 20upx;
	}
	.malllist{
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.malllist .mallitem{
		width: 344upx;
		height: 398upx;
		background: #FFFFFF;
		border: 1upx solid #E5E5E5;
		border-radius: 20upx;
	}
	.malllist .mallitem .ppic{
		width: 344upx;
		height: 288upx;
		background: #E8E8E8;
	}
</style>
