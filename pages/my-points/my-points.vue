<template>
	<view>
		<!-- 顶部自定义导航 -->
		<u-navbar :is-back="true" title="我的积分" :height="height" :background="background" title-color="#ffffff"
		 back-icon-color="#ffffff">
		</u-navbar>
		<!-- jifen -->
		<view class="content">
			<view class="totalpoint line"><span class="my">我的积分：</span> <span class="point">{{number}}</span></view>
			<view class="pointtitle line">
				<view class="shu"></view>
				<view class="mouth">本月</view>
			</view>
			<block >
				<view class="detail line">
					<view class="text-l">
						<view class="title">{{data[0].content}}</view>
						<view class="time">{{counttime}}</view>
					</view>
					<view class="text-r">
						<view class="">+66</view>
					</view>
				</view>
			</block>
			<block >
				<view class="detail line">
					<view class="text-l">
						<view class="title">兑换玻璃清洗剂</view>
						<view class="time">02-10  16:00</view>
					</view>
					<view class="text-r">
						<view class="">-88</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				height: "",
				background: {
					backgroundImage: "linear-gradient(90deg, #54C3F1, #00ABEB)",
				},
				data:{},
				number:1
			}
		},
		computed:{
			counttime(){
				//时间戳转日期
				if(this.data[0].create_time){
					return  new Date(parseInt(this.data[0].create_time) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
				}
			}
		},
		onLoad() {
			this.getPoint();
		},
		methods: {
			getPoint(){
				this.$myRequest({
					url:'mall/integrationLog',
					data:{},
					methods:"GET"
				}).then(res=>{
					console.log(res);
				// const data = JSON.parse(res.data);
					if(res.data.code == 200){
						console.log(res.data.msg);
						this.data = res.data.data;
						this.number  = res.data.number
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
			}
		}
	}
</script>

<style scoped>
	.content{
		padding-left: 25upx;
		padding-right: 25upx;
		padding-top: 40upx;
	}
	.totalpoint{
		height: 128upx;
		line-height: 128upx;
	}
	.totalpoint .my{
		
		font-size: 28upx;
		line-height: 128upx;
	}
	.totalpoint .point{
		
		font-size: 52upx;
		color: #00ABEB;
		font-weight: bold;
		line-height: 128upx;
	}
	.pointtitle{
		display: flex;
		font-weight: bold;
		height: 92upx;
		line-height:92upx;
		align-items: center;
	}
	.pointtitle .shu{
		width: 9upx;
		height: 30upx;
		background-color: #00AAEB;
		line-height:92upx;
	}
	.pointtitle .mouth{
		font-weight: bold;
		line-height:92upx;
		padding-left: 25upx;
	}
	
	.detail{
		display: flex;
		justify-content: space-between;
		height: 135upx;
		line-height: 135upx;
		align-items: center;
	}
	.text-l {
		line-height: 135upx;
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	.text-r{
		color: #00AAEB;
		line-height: 135upx;
	}
	.line{
		border-bottom: 1upx solid #CCCCCC;
	}
</style>
