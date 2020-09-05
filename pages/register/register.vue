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
			<view class="from-group">
				<view class="iconfont iconleixing1"></view>
				<view class="line"></view>
				<view class="input"><button type="default">{{counttype}}</button></view>
			</view>
			<!-- 类型选择 -->
			<view class="typecontent">
				<view class="title">当前选择种类</view>
				<view class="onelist">
					<view class="list theme">{{typefy}}</view>
				</view>
				<view class="title">种类</view>
				<view class="onelist">
					<block v-for="(item,index) in typename" :key="index">
						<view :class="[list,{'theme': rSelect.indexOf(index)!=-1}]" @tap="selecttype(index)">{{item}}</view>
					</block>
				</view>
			</view>
			<!-- 协议 -->
			<view class="xieyi">
				<view :class="[check,{'theme':flag,'':flag}]" @tap="checked"></view>
				确定同意<span>《协议》</span></view>
			<!-- 提交 -->
			<button type="default" class="btn theme" @tap="submit()"> 确定提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				postData:[],
				flag:true,
				check:"check",
				ischeck:false,
				code:"",
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
					backgroundImage: "linear-gradient(90deg, #00ABEB, #54C3F1)",
				},
			}
		},
		computed: {
			counttype() {
				// console.log(this);
				let selectname = this.selectname;
				console.log(selectname);
				for (let i = 0; i < selectname.length; i++) {
					let sumstring = selectname[i];
					console.log(sumstring);
				return this.typefy + "," + sumstring
				}
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
					// console.log(typeof(typedata));
					// console.log(typedata[typename]);
					this.typename = typedata[typename];
					console.log(this.typename);
				}
			};
			uni.login({
				provider: 'weixin',
				success(res){
					console.log(res.code);
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
					console.log(this.typename[e]);
					this.selectname.push(this.typename[e]);
					// console.log(this.selectname.push(this.typename[e]));
					console.log(this.selectname);
				} else {
					this.rSelect.splice(this.rSelect.indexOf(e), 1); //取消
				}
			},
			//获取手机号码
			getPhoneNumber(e) {
				console.log(e.detail.errMsg);
				console.log(e.detail.iv);
				console.log(e.detail.encryptedData);
				let iv = e.detail.iv;
				let encryptedData = e.detail.encryptedData;
				let code = this.code;
				let that  =this;
				//检查session——key是否过期
				uni.checkSession({
					success(res) {
						console.log(res);
						uni.request({
									url: "https://applet.51tiaoyin.com/public/applet/user/get_phone",
									method: 'GET',
									dataType: JSON,
									data: {
										"code": code,
										"iv": iv,
										"encryptedData": encryptedData
									},
									success(res) {
										console.log(res.data);
										let data = JSON.parse(res.data);
										console.log(data);
										if (data.code== 200) {
											// console.log(this);
											console.log(data.data);
											that.phonenum = data.data;
										} else {
											uni.showToast({
												title: "没有获取手机号",
												duration: 1500
											})
										}
									},
									fail(res) {
										console.log(res)
									}
								})
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
				
				// 	//-----------------是否授权，授权通过进入主页面，授权拒绝则停留在登陆界面
				if (e.detail.errMsg == 'getPhoneNumber:user deny') { //用户点击拒绝
					uni.showToast({
						title:"拒绝获取手机号码"
					})

				} else { //允许授权执行跳转
					uni.showToast({
						title:"正在获取手机号码"
					})

				}
			},
			
			//选中协议
			checked(){
				return this.flag = !this.flag
			},
			//表单提交
			submit(){
				console.log(this.name);
				//姓名校验
				if(this.name == ""){
					uni.showToast({
						title:"姓名不能为空"
					})
				}
				//手机号码校验
				if(this.phonenum == ""){
					uni.showToast({
						title:"手机号不能为空"
					})
				}else{
					var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
					if(!reg.test(this.phonenum)){
						uni.showToast({
							title:"请填写正确的手机格式"
						})
					}
				}
				//工作时间校验
				if(this.worktime == ""){
					uni.showToast({
						title:"工作时间不能为空"
					})
				}else{
					
				}
				if(this.counttype == ""){
					uni.showToast({
						title:"请选择下方服务类型"
					})
				}
				console.log(this.phonenum);
				console.log(this.worktime);
				console.log(this.counttype);
				
				console.log("地址："+location);
				let latitude = uni.getStorageSync("latitude");
				let longitude = uni.getStorageSync("longitude")
				console.log('精度：'+latitude);
				
					let location={
						latitude:latitude,
						longitude:longitude
					}
					
				this.postData.push(this.name);
				this.postData.push(this.worktime);
				this.postData.push(this.counttype);
				this.postData.push(this.phonenum);
				this.postData.push(latitude);
				this.postData.push(longitude);
				console.log("参数为："+this.postData);
				
				uni.request({
					url:"https://applet.51tiaoyin.com/public/applet/user/get_info",
					method:"POST",
					data:{
						name:this.name,
						age:this.worktime,
						phone:this.phonenum,
						coord:latitude+","+longitude,
						type:this.counttype
					},
					success(res) {
						console.log(res);
					},
					fail() {
						console.log("失败："+res);
					}
				})
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
	}

	.xieyi span {
		text-decoration: solid;
		color: #0A98D5;
		margin-bottom: 25upx;
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
	.check{
		width: 40upx;
		height: 40upx;
		border-radius: 100%;
		background-color: #18B566;
	}
	.active{
		
	}
</style>
