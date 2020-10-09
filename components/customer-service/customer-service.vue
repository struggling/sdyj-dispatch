<template>
	<view class="customer-service">
		<u-mask :show="openmask" @tap="closemask">
			<view class="warp">
				<view class="rect" @tap.stop>
					<button type="default" @tap="go">拨打热线</button>
					<button type="default" open-type="contact">客服会话</button>
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
		width: 120px;
		height: 120px;
		background-color: #fff;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
	}
</style>
