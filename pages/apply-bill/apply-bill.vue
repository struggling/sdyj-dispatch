<template>
	
	<view>
		<u-navbar :is-back="false"  title="抢单池" :height="height" :background="background" title-color="#ffffff">
			<view class="slot-wrap">
				{{address}}
			</view>
		</u-navbar>
		<view class="content">
			<!--bill-title  -->
			<view class="line" style="width: 100%;height: 25upx;background-color:#F2F2F2 ;"></view>
			<view class="bill">
				<view class="bill-num">订单编号 <span>123456789644236</span></view>
				<view class="bill-price">开票金额 <span>￥160</span></view>
			</view>
			<view class="bill" style="margin-top: 25upx;">
				<u-form :model="form" ref="uForm">
					<u-form-item label="抬头类型">
						<u-radio-group v-model="radio">
							<u-radio active-color="#00abeb" v-for="(item, index) in radioList" :key="index" :name="item.name" :disabled="item.disabled"
							 @change="radioChange">
								{{ item.name }}
							</u-radio>
						</u-radio-group>
					</u-form-item>
					<u-form-item label="发票类型" prop="bill">
						<view class="selectType" @tap="opensheet" >{{bill}}</view>
						<u-icon name="arrow-right" @tap="opensheet"></u-icon>
					</u-form-item>
					<u-form-item label="发票抬头" prop="name">
						<u-input v-model="form.name" placeholder="填写需要开票的个人姓名" />
					</u-form-item>
					<view v-if="type == '个人'">
						<u-form-item label="个人地址" prop="address">
							<u-input v-model="form.address" placeholder="填写需要开票的个人地址" />
						</u-form-item>
						<u-form-item label="个人电话" prop="tel">
							<u-input v-model="form.tel" placeholder="填写需要开票的个人电话" />
						</u-form-item>
					</view>
					<view v-else>
						<u-form-item label="税号" prop="suinum">
							<u-input v-model="form.tel" placeholder="填写需要开票的个人电话" />
						</u-form-item>
						<u-form-item label="企业地址" prop="cpadd">
							<u-input v-model="form.tel" placeholder="填写需要开票的个人电话" />
						</u-form-item>
						<u-form-item label="银行账号" prop="banknum">
							<u-input v-model="form.tel" placeholder="填写需要开票的个人电话" />
						</u-form-item>
						<u-form-item label="企业邮箱" prop="eamil">
							<u-input v-model="form.tel" placeholder="填写需要开票的个人电话" />
						</u-form-item>
					</view>
				</u-form>
			</view>
			<button @click="submit" class="theme">提交申请</button>
			<!-- 操作菜单 -->
			<u-action-sheet :list="list" v-model="show" :tips="tips" @click="click"></u-action-sheet>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				address:"",
				height:"",
				background:{
					backgroundImage:"linear-gradient(90deg, #00ABEB, #54C3F1)",
				},
				type:"个人",
				bill:"增值税电子普通发票",
				list: [{
						text: '增值税电子普通发票',
						color: '#F86032',
						fontSize: 28
					},
					{
						text: '增值税电子专用发票'
					},
					{
						text: '增值税纸质普通发票'
					},
					{
						text: '增值税纸质普通发票'
					},
				],
				tips: {
					text: '发票类型选择',
					color: '#000000',
					fontSize: 36
				},
				show: false,
				form: {
					name: '',
					intro: '',
				},
				radio: '个人', //默认选中
				radioList: [{
						name: '个人',
						disabled: false,
					},
					{
						name: '企业',
						disabled: false,

					},
				],
				rules: {
					name: [{
						required: true,
						message: '请填写需要开票的个人姓名',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}],
					address: [{
						min: 5,
						message: '请填写需要开票的个人地址',
						trigger: 'change'
					}],
					tel: [{
						min: 11,
						max: 11,
						message: '请填写需要开票的11位手机号码',
						trigger: 'change'
					}],

				}
			};
		},
		methods: {
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
					} else {
						console.log('验证失败');
					}
				});
			},
			// 选中某个单选框时，由radio时触发
			radioChange(e) {
				console.log(e);
				this.type  =e;
			},
			// opensheet
			opensheet() {
				this.show = true;
			},
			//选择发票类型
			click(index) {
				console.log(`点击了第${index + 1}项，内容为：${this.list[index].text}`);
				this.bill =`${this.list[index].text}`;
			}
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	};
</script>
<style scoped>
	
	.content {
		background-color: #F2F2F2;
		box-sizing: border-box;
		width: 100%;
		height: 1246upx;
	}
	.u-radio-group{
		display: flex;
	}

	/* bill-title */
	.bill {
		margin-left: 25upx;
		margin-right: 25upx;
		border-radius: 8upx;
		background-color: #FFFFFF;
		padding: 25upx;
		/* margin-top: 25upx; */
		font-size: 30upx;
		font-weight: bold;
	}

	.bill-num {
		line-height: 1.8;
		color: #4D4D4D;
	}

	.bill-num span {
		padding-left: 60upx;
	}

	.bill-price {
		line-height: 1.8;
		color: #4D4D4D;
	}

	.bill-price span {
		padding-left: 60upx;
		color: #ff5500;
	}

	/* form */
	.u-form-item--left {
		width: 62upx !important;
		flex: 0;
	}

	/* button */
	.u-btn {
		width: 482upx;
		height: 76upx;
		background-color: #F86032;
		border-radius: 8upx;
		color: #FFFFFF;
		margin: 0 auto;
		margin-top: 100upx;
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
	/* selecttype */
	.selectType {
		color: #4D4D4D;
		padding-right: 20upx;
	}
</style>
