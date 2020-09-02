<template>
	<view>
		<view class="bg">
			<image class="bgimg" src="../../static/home/home.png" mode=""></image>
			<view class="text">
				<view class="nickname">速达易家售前</view>
				<view class="sign" @tap="showsign = true">点击签到</view>
			</view>
			<image src="../../static/logo.png" class="avatar" mode=""></image>
			<view class="panel">
				<view class="panel-item">
					<view class="icon">
						<image src="../../static/home/icon1.png" mode=""></image>
					</view>
					<view class="txt" @tap="openinfo">个人数据</view>
				</view>
				<view class="panel-item">
					<view class="icon">
						<image src="../../static/home/icon3.png" mode=""></image>
					</view>
					<view class="txt">我的积分</view>
				</view>
				<view class="panel-item">
					<view class="icon">
						<image src="../../static/home/icon2.png" mode=""></image>
					</view>
					<view class="txt">积分商城</view>
				</view>
				<view class="panel-item">
					<view class="icon">
						<image src="../../static/home/icon3.png" mode=""></image>
					</view>
					<view class="txt">售后客服</view>
				</view>
			</view>
		</view>
		<!-- 个人信息列表 -->
		<view class="u-m-t-20">
			<u-cell-group>
				
				<u-cell-item title="个人信息"></u-cell-item>
				<u-cell-item  title="个人工号">个人工号123456</u-cell-item>
				<u-cell-item  title="个人工作时间" @tap="showtime=true">{{timeval}}</u-cell-item>
				<u-cell-item  title="评分指南">9.4分</u-cell-item>
				<u-cell-item  title="意见反馈"></u-cell-item>
				<u-cell-item  title="设置" @tap="openset"></u-cell-item>
			</u-cell-group>
		</view>
		<!-- class="iconfont icongerenxinxi"  class="iconfont icongonghao" class="iconfont iconshijian" class="iconfont iconpingfen" class="iconfont iconxinxi" class="iconfont iconshezhi"-->
		<!-- 时间选择器 -->
		<!-- <u-picker mode="time" v-model="showtime" :params="params"></u-picker> -->
		<u-select v-model="showtime" mode="mutil-column" :list="list" @confirm="confirm"></u-select>
		<!-- 签到时间 -->
		<u-calendar v-model="showsign" :mode="mode" :change-year="false" @change="change"></u-calendar>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				pic: 'https://uviewui.com/common/logo.png',
				show: true,
				showtime: false,
				showsign: false,
				mode: 'date',
				timeval: "9:00——18:00",
				list: [
					[{
							value: '8:00',
							label: '8:00'
						},
						{
							value: '9:00',
							label: '9:00'
						}
					],
					[{
							value: '12:00',
							label: '12:00'
						},
						{
							value: '18:00',
							label: '18:00'
						}
					],

				],
			}
		},
		onLoad() {

		},
		methods: {
			// 回调参数为包含多个元素的数组，每个元素分别反应每一列的选择情况
			confirm(e) {
				console.log(e);
				this.timeval = e[0].value + "——" + e[1].value;
			},
			//签到
			change(e) {
				console.log(e);
				uni.showToast({
					title:"签到成功",
					duration:1000
				})
			},
			//打开个人信息页面
			openinfo(){
				uni.navigateTo({
					url:"../myinfo/myinfo"
				})
			},
			// 打开设置权限
			openset(){
				wx.openSetting({
				  success (res) {
				    console.log(res.authSetting)
				    // res.authSetting = {
				    //   "scope.userInfo": true,
				    //   "scope.userLocation": true
				    // }
				  }
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #ededed;
	}

	.camera {
		width: 54px;
		height: 44px;

		&:active {
			background-color: #ededed;
		}
	}

	.user-box {
		background-color: #fff;
	}
	// 个人信息列表
	.u-m-t-20 {
		margin-top: 140upx !important;
		
	}

	.bg .bgimg {
		width: 100%;
		height: 340upx;
	}

	.bg {
		position: relative;
	}

	.bg .avatar {
		position: absolute;
		width: 152upx;
		height: 152upx;
		border-radius: 100%;
		margin: 4upx;
		top: 120upx;
		display: block;
		left: 292upx;
		z-index: 1000;
		background-color: #FFFFFF;
	}

	.bg .text {
		position: absolute;
		display: flex;
		justify-content: flex-end;
		padding-left: 25upx;
		padding-right: 25upx;
		width: 100%;
		align-items: center;
		top: 40upx;
	}

	.bg .panel {
		margin-left: 25upx;
		margin-right: 25upx;
		width: 702upx;
		background-color: #FFFFFF;
		border-radius: 8upx;
		top: 208upx;
		display: flex;
		justify-content: space-around;
		height: 240upx;
		position: absolute;
		align-items: center;
		z-index: 999;
		box-shadow: 2px 2px 8px 1px rgba(248, 95, 4, 3)
	}

	.bg .panel .icon {
		text-align: center;
	}

	.bg .panel .icon image {
		width: 56upx;
		height: 48upx;
	}

	.bg .text .sign {
		margin-left: 134upx;
		border-radius: 20upx;
		background-color: #FFFFFF;
		color: #343434;
		padding: 12upx;
		font-size: 24upx;
	}

	.bg .text .nickname {
		font-size: 32upx;
		color: #FFFFFF;
		line-height: 52upx;
	}
</style>
