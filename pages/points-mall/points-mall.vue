<template>
	<view>
		<!-- 顶部自定义导航 -->
		<!-- <u-navbar :is-back="true"  title="积分商城" :height="height" :background="background" title-color="#ffffff" back-icon-color="#ffffff" >
		</u-navbar> -->
		<!-- 头部展示栏 -->
		<view class="top">
			<view class="bg"><image src="../../static/title.png" mode=""></image></view>
			<view class="panel">
				<view class="text-l">
					<view class="pic"><image :src="touxiang" mode=""></image></view>
					<view class="point" style=" padding-left: 40rpx;color: #ffffff;">
						<view class="">总积分</view>
						<view class="">{{number}}</view>
						<view class="">积分可兑换下面商品</view>
					</view>
				</view>
				<!-- <view class="text-r">
					<view class="range"><u-icon name="star-fill" color="#ffffff" size="44" margin-left="20upx"></u-icon></view>
					<view class="text">积分明细</view>
				</view> -->
			</view>
		</view>
		<!-- uview content -->
		<view class="content">
			<view class="pointtip">
				<view class="line"></view>
				<view class="text"><span style="color:#0080FF;">积分</span>兑好礼</view>
				<view class="line"></view>
			</view>
			<view class="malllist">
				<block v-for="(item,index) in malllist" :key="index">
					<view class="mallitem" @tap="godetail(item)">
						<view class="ppic"><image :src="item.img" mode=""></image></view>
						<view class="malltitle">{{item.name}}</view>
						<view class="malltips"><span>{{item.original_price}}积分</span> <span style="color: red;font-weight: bold;">￥{{item.price}}</span></view>
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
				number:0,
				touxiang:''
			}
		},
		onLoad() {
			this.getMallList();
			this.touxiang = uni.getStorageSync("user_avatar")
		},
		methods: {
			//跳转详情页
			godetail(item,index){
				console.log(item);
				let detail = {
					id: item.id,
					name: item.name,
					img: item.img,
					price: item.price,
					original_price: item.original_price,
					description: item.description,
					index:index
				};
				uni.navigateTo({
					url:"../mall-detail/mall-detail?detailDate="+ encodeURIComponent(JSON.stringify(detail))
				})
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
		width: 100%;
		height: 100%;
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
		background: linear-gradient(90deg, #0080ff, ##00B7FF);
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
	.pointtip .text{
		margin: 40upx;
		font-size: 32upx;
		font-weight: bold;
	}
	.malllist{
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.malltitle{
		padding-left: 30upx;
		padding-top: 15upx;
		color: #253bff;
		font-weight: bold;
	}
	.malltips{
		padding-left: 30upx;
		padding-top: 15upx;
		font-weight: bold;
	}
	.malllist .mallitem{
		width: 330upx;
		height: 398upx;
		background: #FFFFFF;
		border: 1upx solid #E5E5E5;
		border-radius: 20upx;
		margin-top: 40upx;
	}
	.malllist .mallitem .ppic{
		width: 330upx;
		height: 288upx;
		background: #E8E8E8;
		border-top-left-radius: 4upx;
		border-top-right-radius: 4upx;
		
	}
</style>
