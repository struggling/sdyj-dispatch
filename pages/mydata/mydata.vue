<template>
	<view>
			<view class="mypanel">
				<!-- 个人信息面板 -->
				<view class="bg"><image src="../../static/title.png" mode=""></image></view>
				<view class="p-data">
					<view class="avatar">
						<u-avatar :src="data.user_avatar"></u-avatar>
					</view>
					<view class="information">
						<view class="nickname">{{data.user_name}}</view>
						<view class="address">
							<view class="iconfont icondiliweizhi"></view>
							<view class="add">{{data.user_address}}</view>
						</view>
					</view>
				</view>
				<!-- 选择日期 -->
				<view class="select-cal" @tap="show =!show">
					<view class="txt">{{startDate}}-{{endDate}}</view>
					<view class="txt"><u-icon name="arrow-down-fill" color="#2979ff" size="30"></u-icon></view>
				</view>
				<!-- 弹出日历选择 -->
				<block  v-if="show">
					<u-calendar class="calendar" :ref="'calendar'" v-model="show" :mode="mode" @change="change" max-date="2050-01-01" ></u-calendar>
					<button type="default" @tap="gettime">确定</button>
				</block>
			</view>
			<view class="p-white">
				<view class="v-data">
					<view class="">
						<view class="txt">已结算订单数量</view>
						<view class="txt">{{datas.total}}</view>
					</view>
					<view class="">
						<view class="txt">总金额</view>
						<view class="txt">{{datas.total_amount}}</view>
					</view>
				</view>

			</view>
			<!-- 赚钱列表 -->
			

			<block v-if="datas.data.length>0" v-for="(item,index) in datas.data" :key="index">
				<view class="moneylist">
					<view class="text">
						<view class="dingdanhao">{{item.order_code}}</view>
						<view class="wanchengshijian">完成时间:{{item.acc_time}}</view>
						<view class="wanchengshijian">结算时间:{{item.end_time}}</view>
						<view class="wanchengshijian">上门时间:{{item.add_time}}</view>
					</view>
					<view class="huodejinqian">获得金额￥{{item.master_cost}}</view>
				</view>
			</block>
			<block v-else>
				<no-thing></no-thing>
			</block>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	import noThing from "../../components/common/no-thing.vue";
	var _self;
	var canvaColumn=null;
	export default {
		components:{
			noThing
		},
		data() {
			return {
				//顶部导航栏
				height:"",
				background:{
					backgroundImage: "linear-gradient(90deg, #54C3F1, #00ABEB)",
				},
				startDate:"2020.08.20",
				endDate:"2020.09.20",
				data:{},
				//顶部导航栏
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				serverData:'',
				count: 5,
				value: 4,
				show: false,
				mode: 'range',
				datas:{}
			}
		},
		onLoad(event) {
			_self = this;
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
			// this.getServerData();
			// TODO 后面把参数名替换成 payload
			console.log(event.userdata);
			const payload = event.userdata || event.payload;
			// 目前在某些平台参数会被主动 decode，暂时这样处理。
			try {
				this.data= JSON.parse(decodeURIComponent(payload));
				
				console.log(this.data);
			} catch (error) {
				this.data = JSON.parse(payload);
				console.log(this.data);
			}
			this.getuserUserData();
		},
		methods: {
			change(res){
				console.log(res);
			},
			gettime(){
				let startDate = this.$refs.calendar.startDate;
				let endDate = this.$refs.calendar.endDate;
				this.startDate = startDate;
				this.endDate = endDate;
				this.$refs.calendar.close();
				if(endDate==""){
					this.endDate = "2050-1-1"
				}
				this.getuserUserData(startDate,endDate)
				console.log(this.$refs.calendar);
			},
			//获取个人数据
			getuserUserData(s,e){
				this.$myRequest({
					url:'user/userData',
					data:{
						"start_time":s,
						"end_time":e
					},
					methods:"GET"
				}).then(res=>{
					console.log(res);
				// const data = JSON.parse(res.data);
					if(res.data.code == 200){
						console.log(res.data.data);
						console.log(res.data.msg);
						this.datas = res.data.data
			}
			})
		}
		}
	}
</script>

<style>
	.u-icon{
		color: red;
	}
page{background:#F2F2F2;width: 750upx;overflow-x: hidden;}
.qiun-padding{padding:2%; width:96%;}
.qiun-wrap{display:flex; flex-wrap:wrap;}
.qiun-rows{display:flex; flex-direction:row !important;}
.qiun-columns{display:flex; flex-direction:column !important;}
.qiun-common-mt{margin-top:10upx;}
.qiun-bg-white{background:#FFFFFF;}
.qiun-title-bar{width:94%; padding:10upx 2%; flex-wrap:nowrap;}
.qiun-title-dot-light{border-left: 10upx solid #0ea391; padding-left: 10upx; font-size: 32upx;color: #000000}
.qiun-charts{width: 700upx; height:500upx;background-color: #FFFFFF;}
.charts{width: 700upx; height:500upx;background-color: #FFFFFF;}
	/* 三角旋转 */
	.rotate{
	
	    transform-origin:center center; //旋转中心要是正中间 才行
	
	    transform: rotate(180deg);
	
	    -webkit-transform: rotate(180deg);
	
	    -moz-transform: rotate(180deg);
	
	    -ms-transform: rotate(180deg);
	
	    -o-transform: rotate(180deg);
	
	    transition: transform 0.2s; //过度时间 可调
	
	    -moz-transition: -moz-transform 0.2s; 
	
	    -moz-transition: -moz-transform 0.2s; 
	
	    -o-transition: -o-transform 0.2s; 
	
	    -ms-transition: -ms-transform 0.2s; 
	
	}
	
	.rotate1{
	
	    transform-origin:center center;
	
	    transform: rotate(0deg); //返回原点
	
	    -webkit-transform: rotate(0deg);
	
	    -moz-transform: rotate(deg);
	
	    -ms-transform: rotate(0deg);
	
	    -o-transform: rotate(0deg);
	
	    transition: transform 0.2s; 
	
	    -moz-transition: -moz-transform 0.2s; 
	
	    -moz-transition: -moz-transform 0.2s; 
	
	    -o-transition: -o-transform 0.2s; 
	
	    -ms-transition: -ms-transform 0.2s; 
	
	}
	.moneylist{
		margin: 25upx;
		padding:25upx;
		display: flex;
		justify-content: space-between;
		background: #FFFFFF;
		box-shadow: 0px 6px 13px 0px rgba(158, 166, 176, 0.28);
		border-radius: 4px;
		align-items: center;
	}
	.huodejinqian{
		color: red;
	}
	.mypanel{
		position: relative;
		
	}
	.mypanel .bg{
		width: 100%;
		height: 389upx;
	}
	.mypanel .bg image{
		width: 100%;
		height: 389upx;
	}
	/* 用户信息 */
	.p-data {
		display: flex;
		align-items: center;
		position: absolute;
		top:50upx;
		padding-left: 25upx;
		padding-right: 25upx;
		width: 100%;
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
		color: #FFFFFF;
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
	/* 日历选择 */
	.select-cal{
		width: 94%;
		height:100upx ;
		border-radius: 12upx;
		background-color: #FFFFFF;
		opacity: 0.32;
		color: #000000;
		position: absolute;
		top: 200upx;
		display: flex;
		justify-content: space-between;
		padding-left: 25upx;
		padding-right: 25upx;
		margin-left: 25upx;
		margin-right: 25upx;
		margin-top: 60upx;
		font-size: 30upx;
		line-height: 100upx;
	}
	.select-cal .txt{
		font-size: 30upx;
		line-height: 100upx;
	}
	/* .content{
		padding-left: 25upx;
		padding-right: 25upx;
	} */
	.p-white{
		background-color: #FFFFFF;
		/* margin-left: 25upx;
		margin-right: 25upx; */
		padding: 25upx;
		border-radius: 12upx;
		/* margin-top: -200upx; */
		z-index: 100;
		/* position: absolute;
		top: 789upx; */
	}
	.v-data{
		display: flex;
		justify-content: space-between;
		margin-top: 25upx;
		margin-bottom: 25upx;
		width: 100%;
	}
	.v-data .txt{
		text-align: center;
	}
	button{
		color: #FFFFFF !important;
		background: #0080ff !important;
		text-align: center;
		height: 80upx;
		line-height: 80upx;
		-webkit-appearance: none;
	}
</style>
