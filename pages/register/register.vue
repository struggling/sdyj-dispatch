<template>
	<view>
		<!-- 顶部自定义导航 -->
		<u-navbar :is-back="true" title="入驻登记" :height="height" :background="background" title-color="#ffffff"
		 back-icon-color="#ffffff">
		</u-navbar>
		<!-- 登记信息表单 -->
		<view class="content">
			<view class="from-group">
				<view class="iconfont iconyuangonggonglingfenbu"></view>
				<view class="line"></view>
				<view class="input"><input type="text" v-model="name" value="" placeholder="请填写你的姓名" /></view>
			</view>
			<view class="from-group">
				<view class="iconfont icongerenzhongxinwoderenwubiaozhuntouxianxing"></view>
				<view class="line"></view>
				<view class="input"><input type="text" v-model="worktime" value="" placeholder="请填写你的工龄" /></view>
			</view>
			<view class="from-group">
				<view class="iconfont iconshouji"></view>
				<view class="line"></view>
				<view class="input"><button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">{{phonenum}}</button></view>
			</view>
			<!-- <view class="from-group">
				<view class="iconfont iconleixing1"></view>
				<view class="line"></view>
				<view class="input"><button type="default" class="typebtn">{{counttype}}</button></view>
			</view> -->

			<!-- 类型选择 -->
			<view class="typecontent">
				<!-- <view class="title">当前选择种类</view>
				<view class="onelist">
					<view class="list theme">{{typefy}}</view>
				</view> -->
				<!-- <image src="../../static/settlement/longgqby.png" mode=""></image> -->
				<block v-if="typefy=='钢琴调音'">
					<image :src="longtype.longgqty" mode=""></image>
				</block>
				<block v-if="typefy=='钢琴搬运'">
					<image :src="longtype.longgyby" mode=""></image>
				</block>
				<block v-if="typefy=='家政服务'">
					<image :src="longtype.longjzbj" mode=""></image>
				</block>
				<block v-if="typefy=='家电维修'">
					<image :src="longtype.longjdwx" mode=""></image>
				</block>
				<view class="title">种类</view>
				<view class="onelist">
					<block v-for="(item,index) in typename" :key="index">
						<view :class="[list,{'theme': rSelect.indexOf(index)!=-1}]" @tap="selecttype(index)">{{item}}</view>
					</block>
				</view>
			</view>
			<!-- 协议 -->
			<view class="xieyi">
				<view :class="{'checkbox':flag,'':flag}"></view>
				<view :class="[check,]" @tap="checked"></view>
				<view class="text">确定同意<navigator url="../agreement/agreement">《协议》</navigator></view>
			</view>
			<!-- 提交 -->
			<button type="default" class="btn theme" @tap="submit()"> 确定提交</button>
		</view>
	</view>
</template>

<script>
		import Validator from '../../common/validator.esm.js';
		const validator = new Validator();
	export default {
		data() {
			return {
				isget:true,
				sumstring: [],
				postData: [],
				flag: false,
				check: "check",
				ischeck: false,
				code: "",
				selectname: [],
				// counttype: "请选择服务类型",
				name: "",
				worktime: "",
				phonenum: "获取手机号码",
				list: "list",
				rSelect: [],
				typefy: "",
				typename: [],
				height: "",
				background: {
					backgroundImage: "linear-gradient(90deg, #54C3F1, #00ABEB)",
				},
				longtype:{
					longjzbj:"../../static/settlement/longjzbj.png",
					longgqty:"../../static/settlement/longgqty.png",
					longgyby:"../../static/settlement/longgqby.png",
					longjdwx:"../../static/settlement/longjdwx.png",
				}
			}
		},
		computed: {
			counttype() {
				let selectname = this.selectname;
				this.sumstring = this.selectname;
				return this.typefy + "," + this.sumstring
			}
		},
		onLoad(option) {
			let that = this;
			console.log(option.id); //打印出上个页面传递的参数。
			let latitude = uni.getStorageSync("latitude");
			console.log(latitude);
			this.typefy = option.id;
			let typedata = uni.getStorageSync("typedata");
			for (var typename in typedata) { //遍历对象属性名
				if (option.id == typename) {
					this.typename = typedata[typename];
					console.log(this.typename);
				}
			};
			uni.login({
				provider: 'weixin',
				success(res) {
					// console.log(res.code);
					that.code = res.code
				}
			})
		},
		methods: {
			//选择二级分类服务类型
			selecttype(e) {
				if (this.rSelect.indexOf(e) == -1) {
					console.log(e) //打印下标
					this.rSelect.push(e); //选中添加到数组里
					this.selectname.push(this.typename[e]);
				} else {
					this.rSelect.splice(this.rSelect.indexOf(e), 1); //取消
					this.selectname.splice(this.typename.indexOf(e), 1);
				}
			},
			//获取手机号码
			getPhoneNumber(e) {
				
				if(this.isget){
					this.isget =false;
					let iv = e.detail.iv,
					encryptedData = e.detail.encryptedData,
					code = this.code,
					that = this;
					//检查session——key是否过期
					uni.checkSession({
						success(res) {
							console.log(res);
							that.$myRequest({
								url:'user/get_phone',
								data:{
									"code": code,
									"iv": iv,
									"encryptedData": encryptedData
								},
								methods:"GET"
								
							}).then(res=>{
							// 	console.log(res);
							// const data = JSON.parse(res.data);
								if(res.data.code == 200){
									console.log(res.data.msg);
									this.phonenum = data.data;
								}else if(res.data.code == 300){
									console.log(res.data.msg);
									this.mescroll.endSuccess();
								}else{
									console.log(res.data.msg)
								}
							})
							// uni.request({
							// 	url: "https://applet.51tiaoyin.com/public/applet/user/get_phone",
							// 	method: 'GET',
							// 	dataType: JSON,
							// 	data: {
							// 		"code": code,
							// 		"iv": iv,
							// 		"encryptedData": encryptedData
							// 	},
							// 	success(res) {
							// 		console.log(res.data);
							// 		let data = JSON.parse(res.data);
							// 		console.log(data);
							// 		if (data.code == 200) {
							// 			// console.log(this);
							// 			console.log(data.data);
							// 			that.phonenum = data.data;
							// 		} else {
							// 			uni.showToast({
							// 				title: "没有获取手机号",
							// 				duration: 1500
							// 			})
							// 		}
							// 	},
							// 	fail(res) {
							// 		console.log(res)
							// 	}
							// })
						},
						fail(err) {
							// session_key 已经失效，需要重新执行登录流程
							uni.login({
								success: res => {
									that.data.code = res.code
								}
							})
						}
					})
				}else{
					uni.showToast({
						title:"手机号码已存在"
					})
				}
				// console.log(e.detail.errMsg);
				// console.log(e.detail.iv);
				// console.log(e.detail.encryptedData);
				

				// 	//-----------------是否授权，授权通过进入主页面，授权拒绝则停留在登陆界面
				if (e.detail.errMsg == 'getPhoneNumber:user deny') { //用户点击拒绝
					uni.showToast({
						title: "拒绝获取手机号码"
					})
				} else { //允许授权执行跳转
					uni.showToast({
						title: "正在获取手机号码"
					})
				}
			},
			//选中协议
			checked() {
				return this.flag = !this.flag
			},
			//表单提交
			submit() {
				let name = true,
					phone = true,
					worktime = true,
					counttype = true;
				validator
					.init()
					.add(this.name, [{
							type: 'required',
							message: '用户名为空'
						},
						{
							type: 'min:2',
							message: '用户名小于2位!'
						},
						{
							type: 'max:6',
							message: '用户名大于6位!'
						}
					])
					.add(this.worktime, [{
							type: 'required',
							message: '手机号码为空'
						},
						{
							type: 'max:2',
							message: '工龄必须数字',
							callback :(value, message) =>  {
								var reg = '\d{2}';
							      return reg.test(value) ? void 0 : message 
							    }
						}
					])
					.add(this.phone, [{
							type: 'required',
							message: '手机号码为空'
						}
					])
					.add(this.counttype, [{
							type: 'required',
							message: '服务类型为空'
						},
						{
							type: 'min:6',
							message: '选择服务类型'
						},
					])
				const errorMsg = validator.validation()
				if (errorMsg) {
					uni.showToast({
						title:errorMsg
					});
					// console.error(errorMsg)
				} else if(!this.flag){
					uni.showToast({
						title:"请同意协议"
					});
				}
				else {
					uni.showLoading({
						title:"注册成功"
					})
					//获取首页中缓存的经纬度,uid
					let latitude = uni.getStorageSync("latitude");
					let longitude = uni.getStorageSync("longitude");
					let user_uid = uni.getStorageSync("uid");
					// console.log(user_uid);
					this.$myRequest({
						url:'user/get_info',
						data:{
							name: this.name,
							age: this.worktime,
							phone: this.phonenum,
							coord: latitude + "," + longitude,
							type: this.counttype,
							uid:user_uid
						},
						methods:"POST"
						
					}).then(res=>{
					// 	console.log(res);
					// const data = JSON.parse(res.data);
						if(res.data.code == 200){
							console.log(res.data.msg);
							//提交成功后的跳转到首页
							uni.hideLoading({
								title:"注册成功"
							});
							uni.setStorageSync("gonghao",res.id);
							setTimeout(()=>{
								uni.reLaunch({
									url:"../home/home"
								})
							},2500)
						}else if(res.data.code == 300){
							console.log(res.data.msg);
							
						}else{
							console.log(res.data.msg)
						}
					})
					// uni.request({
					// 	url: "https://applet.51tiaoyin.com/public/applet/user/get_info",
					// 	method: "POST",
					// 	data: {
					// 		name: this.name,
					// 		age: this.worktime,
					// 		phone: this.phonenum,
					// 		coord: latitude + "," + longitude,
					// 		type: this.counttype,
					// 		uid:user_uid
					// 	},
					// 	success(res) {
					// 		console.log(res);
					// 		//提交成功后的跳转到首页
					// 		uni.hideLoading({
					// 			title:"注册成功"
					// 		});
					// 		uni.setStorageSync("gonghao",res.id);
					// 		setTimeout(()=>{
					// 			uni.reLaunch({
					// 				url:"../home/home"
					// 			})
					// 		},2500)
							
					// 	},
					// 	fail() {
					// 		console.log("失败：" + res);
					// 	}
					// })
				}			
			}
		},
		onReady() {

		}
	}
</script>

<style scoped>
	.content {
		padding-left: 25upx;
		padding-right: 25upx;
		padding-top: 80upx;
	}

	/* 表单登记 */
	.from-group {
		display: flex;
		border-bottom: 1upx solid #B3B3B3;
		padding-top: 29upx;
		padding-bottom: 29upx;
	}

	.from-group .line {
		width: 4upx;
		height: 50upx;
		background-color: #B3B3B3;
		margin-left: 25upx;
		margin-right: 25upx;
	}

	.from-group .iconfont {
		font-size: 44upx;
		color: #B3B3B3;
	}

	.from-group .input {
		flex: 1;
	}

	.from-group .input input {
		font-size: 30upx;
		color: #B3B3B3;
		width: 100%;
	}

	.from-group .input button {
		-webkit-appearance: none;
		height: 100%;
		line-height: 50upx;
		background: linear-gradient(90deg, #00ABEB, #54C3F1);
		color: #FFFFFF;

	}

	/* 表单类型选择 */
	.typecontent {
		background-color: #E1E1E1;
		width: 100%;
		margin-bottom: 25upx;
		border-radius: 12upx;
		padding-left: 25upx;
		padding-right: 25upx;
		margin-top: 25upx;
		padding-bottom: 25upx;
	}
	
	.typecontent  image{
		height: 220upx;
	}
	.typecontent .title {
		color: #808080;
		font-size: 30upx;
		font-weight: bold;
		padding-top: 25upx;

	}

	.typecontent .onelist {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.typecontent .onelist .list {
		width: 170upx;
		height: 60upx;
		background-color: #B3B3B3;
		border-radius: 20upx;
		margin-top: 25upx;
		text-align: center;
		line-height: 60upx;
		color: #FFFFFF;
	}

	.xieyi {
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.xieyi navigator {
		text-decoration: solid;
		color: #0A98D5;
		margin-bottom: 25upx;
		display: inline;
		
	}

	.btn {
		width: 60%;
		height: 70upx;
		line-height: 70upx;
		color: #FFFFFF;
		-webkit-appearance: none;
		border: none;
		margin: 0 auto;
		margin-top: 25upx;
		margin-bottom: 25upx;
	}

	/* 选中协议 */
	.check {
		padding-right: 15upx;
		width: 30upx;
		height: 30upx;
		border-radius: 100%;
		/* background-color: #18B566; */
		border: 4upx solid #00ABEB;
	}
	.checkbox{
		width: 15upx;
		height: 15upx;
		border-radius: 100%;
		position: absolute;
		top: 8upx;
		left: 242upx;
		background-color: #00ABEB;
	}
	.active {}
	.typebtn{
		color: #000000 !important;
		background: #FFFFFF !important;
		border: none;
		-webkit-appearance: none;

	}
	button::after{
		border: none;
	}
</style>
