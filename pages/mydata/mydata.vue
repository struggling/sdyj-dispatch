<template>
	<view>
		<!-- 顶部自定义导航 -->
		<u-navbar :is-back="true"  title="个人数据" :height="height" :background="background" title-color="#ffffff" back-icon-color="#ffffff" >
		</u-navbar>
		
			<view class="mypanel">
				<!-- 个人信息面板 -->
				<view class="bg"><image src="../../static/home/home.png" mode=""></image></view>
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
				<!-- 选择日期 -->
				<view class="select-cal">
					<view class="txt">2020.08.20-2020.09.20</view>
					<view class="txt"><u-icon name="arrow-down-fill" color="#2979ff" size="30"></u-icon></view>
				</view>
				<!-- 弹出日历选择 -->
				<u-calendar class="calendar" v-model="show" :mode="mode" @change="change"></u-calendar>
			</view>
			<view class="p-white">
				<view class="v-data">
					<view class="">
						<view class="txt">订单数量</view>
						<view class="txt">1</view>
					</view>
					<view class="">
						<view class="txt">订单数量</view>
						<view class="txt">1</view>
					</view>
					<view class="">
						<view class="txt">订单数量</view>
						<view class="txt">1</view>
					</view>
				</view>
				<view class="qiun-columns">
					<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
						<view class="qiun-title-dot-light">月基本信息</view>
					</view>
					<view class="qiun-charts" >
						<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" @touchstart="touchColumn"></canvas>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	var _self;
	var canvaColumn=null;
	export default {
		data() {
			return {
				//顶部导航栏
				height:"",
				background:{
					backgroundImage:"linear-gradient(90deg, #00ABEB, #54C3F1)",
				},
				data:{},
				//顶部导航栏
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				serverData:'',
				count: 5,
				value: 4,
				show: false,
				mode: 'range'
			}
		},
		onLoad(event) {
			_self = this;
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
			this.getServerData();
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
		},
		methods: {
			getServerData(){
				uni.request({
					url: 'https://www.ucharts.cn/data.json',
					data:{
					},
					success: function(res) {
						console.log(res.data.data)
						//下面这个根据需要保存后台数据，我是为了模拟更新柱状图，所以存下来了
						_self.serverData=res.data.data;
						let Column={categories:[
							 "4",
							 "5",
							 "6",
							 "7",
							 "8",
							 "9",
						],series:[
							{
							  name: "完成订单",
							  data: [15, {
							    value: 20,
							    color: "#f04864"
							  }, 45, 37, 43, 34]
							}, 
							{
							  name: "结算金额",
							  "data": [30, {
							    "value": 40,
							    "color": "#facc14"
							  }, 25, 14, 34, 18]
							},
							{
							  name: "取消订单",
							  "data": [30, {
							    "value": 40,
							    "color": "#facc14"
							  }, 25, 14, 34, 18]
							},
						]};
						//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
						// Column.categories=res.data.data.Column.categories;
						// Column.series=res.data.data.Column.series;
						_self.showColumn("canvasColumn",Column);
					},
					fail: () => {
						_self.tips="网络错误，小程序端请检查合法域名";
					},
				});
			},
			showColumn(canvasId,chartData){
				canvaColumn=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'column',
					legend:{show:true},
					fontSize:11,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					animation: true,
					categories: chartData.categories,
					series: chartData.series,
					xAxis: {
						disableGrid:true,
					},
					yAxis: {
						//disabled:true
					},
					dataLabel: true,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						column: {
							type:'group',
							width: _self.cWidth*_self.pixelRatio*0.45/chartData.categories.length
						}
					  }
				});
				
			},
			touchColumn(e){
				canvaColumn.showToolTip(e, {
					format: function (item, category) {
						if(typeof item.data === 'object'){
							return category + ' ' + item.name + ':' + item.data.value 
						}else{
							return category + ' ' + item.name + ':' + item.data 
						}
					}
				});
			},
			change(e) {
				console.log(e);
			}
		}
	}
</script>

<style>
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


	.mypanel{
		position: relative;
		
	}
	.mypanel .bg{
		width: 100%;
		height: 508upx;
	}
	.mypanel .bg image{
		width: 100%;
		height: 508upx;
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
		padding-left: 25upx;
		padding-right: 25upx;
		border-radius: 12upx;
		margin-top: -200upx;
		z-index: 100;
		position: absolute;
		top: 789upx;
	}
	.v-data{
		display: flex;
		justify-content: space-between;
		margin-top: 25upx;
		margin-bottom: 25upx;
	}
	.v-data .txt{
		text-align: center;
	}
</style>
