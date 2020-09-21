<template>
	<view>
		<!-- 顶部自定义导航 -->
		<u-navbar :is-back="true"  title="入驻引导" :height="height" :background="background" title-color="#ffffff" back-icon-color="#ffffff" >
		</u-navbar>
		<view class="content">
			<!-- 标题 -->
			<view class="title-nav">
				<view class="l-nav">
					<image src="../../static/settlement/logo.png" mode=""></image>
					<span>速达易家</span>
				</view>
				<view class="r-nav">师傅挣钱不容易，系统随机派单</view>
			</view>
				<!-- 入驻导航 -->
			<view class="gird">
				<block v-for="(item,index) in type" :key="index">
					<view class="gird-item" @tap="openregister(item)" :style="background1[index]">
						<image :src="pic[index]" mode=""></image>
						<view class="btn theme">申请入驻</view>
					</view>
				</block>
			</view>
			<!-- 入驻说明 -->
			<view class="ensure">
				<view class="title">入驻优势</view>
				<view class="panel">
					<view class="txt">
						<image src="../../static/settlement/ioon.png" mode="" style="vertical-position: ;"></image>
						<span>海量订单、精准推送</span>
					</view>
					<view class="txt">
						<image src="../../static/settlement/ioon.png" mode=""></image>
						<span>订单管理、专业有序</span>
					</view>
					
				</view>
			</view>
			<view class="ensure" style="margin-top: 40upx;">
				<view class="title">入驻要求</view>
				<view class="panel">
					<view class="txt">
						<image src="../../static/settlement/ioon.png" mode=""></image>
						<span>技能傍身、服务专业</span>
					</view>
					<view class="txt">
						<image src="../../static/settlement/ioon.png" mode=""></image>
						<span>积极向上、热情大方</span>
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
				pic:[
					"../../static/settlement/gqty.png",
					"../../static/settlement/gqby.png",
					"../../static/settlement/jzbj.png",
					"../../static/settlement/jdwx.png",
				],
				background1:[
					"background-color: #F8F5D5",
					"background-color: #D9F8D4",
					"background-color: #F8E5D4",
					"background-color: #D4F8EE",
					"background-color: #F8D4F8",
					"background-color: #D4EBF8",
				],
				type:[],
				typedata:{},
				height:"",
				background:{
					backgroundImage: "linear-gradient(90deg, #54C3F1, #00ABEB)",
				},
			}
		},
		onLoad() {
			this.$myRequest({
				url:'user/item',
				data:{}
			}).then(res=>{
				console.log(res);
			// const data = JSON.parse(res.data);
				if(res.data.code == 200){
					console.log(res.data.msg);
					const list = res.data.data;
					for(var i in list){
						 this.type.push(i);
						 this.typedata = list;
						console.log(this.type);
						uni.setStorageSync("typedata",list);
					}
				}else if(res.data.code == 300){
					console.log(res.data.msg);
			
				}else{
					console.log(res.data.msg)
				}
			})
			// uni.request({
			// 	url:"https://applet.51tiaoyin.com/public/applet/user/item",
			// 	method:"GET",
			// 	success:(res)=> {
			// 		console.log(res);
			// 		if(res.data.code == 200){
			// 			const list = res.data.data;
			// 			for(var i in list){
			// 				 this.type.push(i);
			// 				 this.typedata = list;
			// 				console.log(this.type);
			// 				uni.setStorageSync("typedata",list);
			// 			}
						
			// 		}else{
			// 			console.log(res.data.code);
			// 		}
			// 	},
			// 	fail(err) {
			// 		console.log(err);	
			// 	}
			// })
		},
		methods: {
			openregister(fulei){
				 // let typedata = encodeURIComponent(JSON.stringify(this.typedata));
				 let typedata = this.typedata;
				 console.log(typedata);
				uni.navigateTo({
					url:"../register/register?id="+fulei+"&children="+typedata
				})
			}
		}
	}
</script>

<style scoped>
	.content{
		padding-left: 25upx;
		padding-right: 25upx;
		margin-top: 40upx;
	}
	/* 标题 */
	.title-nav{
		display: flex;
		justify-content: space-between;
		font-size: 18upx;
		color:#00A43F ;
		align-items: center;
	}
	.l-nav{
		
	}
	.l-nav image{
		width: 32upx;
		height: 32upx;
		vertical-align: middle;
		padding-right: 15upx;
	}
	/* 宫格 */
	.gird{
		margin-top: 20upx;
		margin-bottom: 40upx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.gird .gird-item{
		width:338upx ;
		height: 356upx;
		border-radius: 12upx;
		background-color: #000000;
		text-align: center;
		margin-top: 20upx;
	}
	.gird .gird-item image{
		width: 298upx;
		height: 256upx;
		border-radius: 8upx;
		margin-top: 15upx;
	}
	.gird .gird-item .btn{
		width:231upx;
		height: 50upx;
		line-height: 50upx;
		border-radius: 8upx;
		font-size: 30upx;
		/* display: inline; */
		margin: 0 auto;
		margin-top: 10upx;
	}
	/* 入驻说明 */
	.ensure{
		
	}
	.ensure .title{
		width: 155upx;
		height: 40upx;
		background: linear-gradient(90deg, #80BF26, #5CB531);
		border-bottom-right-radius: 20upx;
		border-top-right-radius: 20upx;
		line-height: 40upx;
		text-align: center;
		color: #FFFFFF;
	}
	.ensure .panel{
		margin-top: 40upx;
		width: 691upx;
		height: 161upx;
		background: linear-gradient(90deg, #30C7FF, #55C3F2);
		border-radius: 10upx;
		display: flex;
		justify-content: space-between;
		padding-left: 25upx;
		padding-right: 25upx;
	}
	.ensure .panel image{
		width: 24upx;
		height:24upx;
		margin-right: 15upx;
	}
	.ensure .panel .txt{
		padding-left: 20upx;
		color: #FFFFFF;
		margin-top: 20upx;
	}
	.btn{
		color: #FFFFFF;
	}
</style>
