<template>
	<view class="customer-service">
		<u-mask :show="openmask" @tap="closemask">
			<view class="warp">
				<view class="rect">
					<button type="default" @tap="go">拨打热线</button>
					<button type="default" open-type="contact">客服会话</button>
					<view class="close" @tap.stop="closemask">X</view>
				</view>
			</view>
		</u-mask>
	</view>
</template>

<script>
	export default {
			props:{
				openmask:Boolean
			},
			data() {
				return {
					show: false,
					
				}
			},
			methods:{
				closemask(){
					this.$emit("closemask");
				},
				go(){
					uni.makePhoneCall({
					 	
					 	// 手机号
					    phoneNumber: '400-0015-021', 
					
						// 成功回调
						success: (res) => {
							console.log('调用成功!')	
						},
					
						// 失败回调
						fail: (res) => {
							console.log('调用失败!')
						}
						
					  });
				},
				
			}
		}
</script>

<style scoped>
	.warp {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
		}
	
	.rect {
		width: 300rpx;
		height: 300rpx;
		background-color: #ffffff;
		border-radius: 8upx;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		position: relative;
	}
	.close{
		width: 44upx;
		height: 44upx;
		background: #666666;
		color: #FFFFFF;
		border-radius: 100%;
		position: absolute;
		top: 2px;
		right: 2px;
		font-size: 32rpx;
		text-align: center;
		line-height: 44rpx;
	}
	button{
		-webkit-appearance: none !important;
		border: none;
		margin-bottom: 20rpx;
		color: #ffffff;
		background: #0080ff;
		height: 80rpx;
		line-height: 80rpx;
	}
</style>
