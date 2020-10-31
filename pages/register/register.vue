<template>
	<view>
		<!-- 顶部自定义导航 -->
		<!-- <u-navbar :is-back="true" title="入驻登记" :height="height" :background="background" title-color="#ffffff"
		 back-icon-color="#ffffff">
		</u-navbar> -->
		<!-- 登记信息表单 -->
		<view class="content">
			<view class="">请输入姓名</view>
			<view class="from-group">
				
				<view class="input"><input type="text" v-model="name" value="" placeholder="请输入..." /></view>
			</view>
			<view class="">请输入您的工龄</view>
			<view class="from-group" @tap="showworktime=true">
				<block v-if="showss">
					
					<view class="input"><input type="text" v-model="selectworktime[worktimeindex]" value="" placeholder="请点击..." /></view>
				</block>
				<block v-else>
					<view class="input"><input type="text"  value="" placeholder="请点击..." /></view>
					
				</block>
			</view>
			<view class="">验证您的手机号</view>
			<view class="from-group">
				
				<view class="input"><button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">{{phonenum}}</button></view>
			</view>
			<view class="">选择您的种类</view>
			<view class="from-group">
				
				<view @tap="show=true" class="input"  style="white-space: nowrap;text-overflow: ellipsis; line-height: 88rpx;overflow: hidden;">
					<block v-if="shows">
						{{counttype}}
					</block>
					<block v-else>
						<input type="text"  value="" placeholder="请点击..." disabled="true" />
					</block>
					
				</view>
			</view>
			<!-- 类型选择弹框 -->
			<u-mask :show="show">
				<view class="warp">
					<view class="rect">
						<!-- 类型选择 -->
						<view class="typecontent">
							<view class="close" @tap="quxiaotype">x</view>
							<view class="title">选择种类</view>
							<view class="title">大类（单选）</view>
							<view class="onelist">
								<block v-for="(item,index) in type" :key="index">
									<view  :class="[list,tabIndex == index?'listactive':'']" @tap.stop='tabbar(index)'>{{item}}</view>
								</block>
							</view>
						
							<view class="title">小类（多选,必选）</view>
							<view class="onelist">
								<block v-for="(item,index) in typename" :key="index">
									<view :class="[list,{'erleiactive': rSelect.indexOf(index)!=-1}]" @tap.stop="selecttype(index)">{{item}}</view>
								</block>
							</view>
						</view>
						<view class="btns" @tap="quedingtype">确认</view>
					</view>
				</view>
			</u-mask>
			<!-- 协议 -->
			<view class="xieyi" @tap="checked">
				<view :class="[check,]">
					<block v-if="flag">
						<image src="http://7n.51tiaoyin.com/Group%205%402x.png" mode=""></image>
					</block>
					
					<!-- <view :class="{'checkbox':flag,'':flag}"></view> -->
				</view>
				<view class="text">确定同意
						<span class="navigator" @tap="goxieyi">《师傅入驻协议》</span class="">

				</view>
			</view>
			<!-- 提交 -->
			<button type="default" class="btn theme" @tap="submit()"> 确定提交</button>
		</view>
		<!-- 工龄类型选择 -->
		<u-popup v-model="showworktime" mode="bottom" length="60%">
			<view class="titlecontent">
				<view class="" @tap="quxiaoworktime">取消</view>
				<view class="" >选择工龄</view>
				<view class="" @tap="quedingworktime">确定</view>
				
			</view>
			<view class="wrapcontent">
				<block v-for="(item,index) in selectworktime" :key="index">
					<view :class="['item',worktimeindex == index?'listactive':'']" @tap.stop="checkworktime(index)">{{item}}</view>
				</block>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import Validator from '../../common/validator.esm.js';
	import selectType from "../../components/select-type/select-type.vue";
	const validator = new Validator();
	export default {
		components:{
			selectType
		},
		data() {
			return {
				// item:"wrapcontent item",
				worktimeindex:0,
				selectworktime:[
					"一年及一年一下",
					"2年",
					"3年",
					"4年",
					"5年",
					"6年",
					"7年",
					"8年",
					"9年",
					"十年及十年以上",
				],
				showworktime:false,
				showss:false,
				shows:false,
				show:false,
				tabIndex:0,
				isget:true,
				sumstring: [],
				postData: [],
				flag: false,
				check: "check",
				ischeck: false,
				code: "",
				type:[],
				selectname: [],
				// counttype: "请选择服务类型",
				name: "",
				worktime: "",
				phonenum: '获取手机号码',
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
				return this.typefy + "," + this.sumstring; //类型加二级类型
			}
		},
		onLoad(option) {
			this.$myRequest({
				url:'user/item',
				data:{}
			}).then(res=>{
				console.log(res);
			// const data = JSON.parse(res.data);
				if(res.data.code == 200){
					console.log(res.data.msg);
					const list = res.data.data;
					this.typedata = list;//所有类型
					console.log(list); 
					for(var i in list){
						this.type.push(i);
						console.log('类型');
						console.log(this.typedata);
						//初始化类型选择
						this.typefy  = this.type[0];
						for (var typename in this.typedata) { //遍历对象属性名
							if (this.type[0] == typename) {
								this.typename = this.typedata[typename];
								console.log(this.typename);
							}else{
								console.log("参数错误");
							}
						}
						// console.log(this.typedata);
						// // uni.setStorageSync("typedata",list);
					}
				}else if(res.data.code == 300){
					console.log(res.data.msg);
			
				}else{
					console.log(res.data.msg)
				}
			})
			console.log(this.type);
			
			let that = this;
			// console.log("一级分类");
			// console.log(option.id); //打印出上个页面传递的参数。
			// let latitude = uni.getStorageSync("latitude");
			// console.log(latitude);
			// this.typefy = option.id;
			// // let typedata = uni.getStorageSync("typedata");
			// console.log("二级分类");
			// console.log(typedata);
			
			// };
			uni.login({
				provider: 'weixin',
				success(res) {
					// console.log(res.code);
					that.code = res.code
				}
			});
			// 默认选中第一个类型
			
		},
		methods: {
			// 取消工龄
			quxiaoworktime(){
				this.showworktime = false;
				// this.showss = false
			},
			//queding工龄
			quedingworktime(){
				this.worktime = this.worktimeindex+1;
				this.showworktime = false;
				this.showss = true;
			},
			//选择工龄时间
			checkworktime(index){
				this.worktimeindex = index;
				
			},
			//跳转协议
			goxieyi(){
				console.log("tiaozhuan");
				uni.navigateTo({
					url:"../agreement/agreement"
				})
			},
			//确定分类
			quedingtype(){
				this.shows = true;
				this.show  =false;
			},
			//取消分类
			quxiaotype(){
				this.shows = false;
				this.show = false;
			},
			//点击一级分类切换
			tabbar(index){
				this.tabIndex = index;
				this.typefy = this.type[index];
				for (var typename in this.typedata) { //遍历对象属性名的二级分类
					if (this.type[index] == typename) {
						this.typename = this.typedata[typename];
						console.log(this.typename);
						this.selectname=[];
						this.rSelect = [] ;//取消
					}
				}
			},
			//选择二级分类服务类型
			selecttype(e) {
				if (this.rSelect.indexOf(e) == -1) {
					console.log(e) //打印下标
					if (this.type[this.tabIndex]) {
						this.rSelect.push(e); //选中添加到数组里
						this.selectname.push(this.typename[e]);
						console.log("当前增加二级分类");
						console.log(this.selectname);
					}
					
				} else {
					if (this.type[this.tabIndex]) {
						this.rSelect.splice(this.rSelect.indexOf(e), 1); //取消
						this.selectname.splice(this.typename.indexOf(e), 1);
						console.log("当前删除二级分类");
						console.log(this.selectname);
					}
				}
			},
			//获取手机号码
			getPhoneNumber(e) {
				console.log("手机号返回信息");
				console.log(e);
				
				// // console.log(e.detail.errMsg);
				// console.log(e.detail.iv);
				// console.log(e.detail.encryptedData);
				

				// 	//-----------------是否授权，授权通过进入主页面，授权拒绝则停留在登陆界面
				if (e.detail.errMsg == "getPhoneNumber:fail user deny") { //用户点击拒绝
					uni.showToast({
						title: "拒绝获取手机号码"
					})
				} else { //允许授权执行跳转
					uni.showLoading({
						title: "获取中",
						duration:1500
					});
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
									console.log(res);
								// const data = JSON.parse(res.data);
									if(res.data.code == 200){
										console.log(res.data.msg);
										that.phonenum = res.data.data;
										uni.hideLoading({
											title:"获取成功",
											duration:1500
										})
									}else if(res.data.code == 300){
										console.log(res.data.msg);
										// this.mescroll.endSuccess();
									}else{
										console.log(res.data.msg)
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
					}else{
						uni.showToast({
							title:"手机号码已存在"
						})
					}
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
							type: 'max:8',
							message: '用户名大于8位!'
						}
					])
					.add(this.worktime, [
						{
							type: 'required',
							message: '工龄为空'
						},
						{
							type: 'max:2',
							message: '工龄2位数字'
						},
						{
							type: 'callback',
							message: '工龄必须数字',
							callback :(value, message) =>  {
								var reg = /\d/;
							      return reg.test(value) ? void 0 : message 
							    }
						}
					])
					.add(Number(this.phonenum), [
						{
							type: 'required',
							message:'手机号码不能为空'
						},
						{
							type: 'phone',
							message: '手机号为空'
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
							uni.showLoading({
								title:"注册成功"
							});
							uni.setStorageSync("gonghao",res.id);
							setTimeout(()=>{
								uni.reLaunch({
									url:"../home/home"
								})
							},1500)
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
	/* 工龄类型选择 */
	.titlecontent{
		display: flex;
		justify-content: space-between;
		border-bottom: 1upx solid #CCCCCC;
		padding: 32rpx;
		font-weight: bold;
	}
	.wrapcontent{
		    /* display: -webkit-box; */
		    /* display: -webkit-flex; */
		    display: flex;
		    /* background: #CCCCCC; */
		    padding: 40rpx;
		    /* height: 87.2%; */
		    /* -webkit-flex-wrap: wrap; */
		    flex-wrap: wrap;
		    display: flex;
		    flex-wrap: wrap;
	}
	.wrapcontent .item{
		    color: #000000;
		    font-weight: bold;
		    padding: 24rpx;
		    border-radius: 4rpx;
		    height: 12%;
		    margin-right: 46rpx;
		    margin-top: 60rpx;
			    background: #c3c3c3;
	}
	.listactive{
		color: #FFFFFF;
		background:#0080FF !important;
	}
	/* 工龄类型选择 */
	.warp {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
		}
	
	.rect {
		width: 710upx;
		/* height: 820upx; */
		background-color: #fff;
	}
	.content {
		padding-left: 25upx;
		padding-right: 25upx;
		padding-top: 80upx;
	}

	/* 表单登记 */
	.from-group {
		display: flex;
		/* border-bottom: 1upx solid #B3B3B3; */
		padding-top: 29upx;
		padding-bottom: 60upx;
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
		    width: 622upx;
		    height: 88upx;
		    background: #f6f6f6;
		    border: 2upx solid #dbdbdb;
		    text-align: left;
		    /* line-height: 88upx; */
		    padding-left: 20px;
			border-radius: 8upx;
	}

	.from-group .input input {
		font-size: 30rpx;
		    color: #B3B3B3;
		    width: 100%;
		    line-height: 88upx;
		    height: 88upx;
		    line-height: normal;
	}

	.from-group .input button {
		-webkit-appearance: none;
		height: 100%;
		line-height: 88upx;
		/* background: linear-gradient(90deg, #00ABEB, #54C3F1); */
		color: #B3B3B3;
		text-align: left;
		padding-left: 0 !important;
		padding-right: 0 !important;

	}

	/* 表单类型选择 */
	.typecontent {
		/* background-color: #E1E1E1; */
		width: 100%;
		margin-bottom: 25upx;
		border-radius: 12upx;
		padding-left: 25upx;
		/* padding-right: 25upx; */
		margin-top: 25upx;
		padding-bottom: 25upx;
		position: relative;
	}
	 .btns{
		width: 92%;
		height: 88rpx;
		-webkit-border-radius: 2px;
		border-radius: 6rpx;
		background: -webkit-linear-gradient(318deg, #48C0FF 0%, #0F80FF 100%);
		background: linear-gradient(132deg, #48C0FF 0%, #0F80FF 100%);
		color: #FFFFFF;
		text-align: center;
		line-height: 88rpx;
		font-size: 32rpx;
		margin-left: 25rpx;
		margin-right: 25rpx;
		margin-bottom: 40rpx;
	}
	.typecontent .close{
		position: absolute;
		top: 20px;
		color: #666666;
		font-size: 52rpx;
		right: 36rpx;
	}
	.typecontent  image{
		height: 220upx;
		width: 100%;
	}
	.typecontent .title {
		color: #333333;
		font-size: 36upx;
		font-weight: bold;
		padding-top: 60upx;

	}

	.typecontent .onelist {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.typecontent .onelist .list {
		width: 200upx;
		height: 80upx;
		/* background-color: #B3B3B3; */
		border-radius: 4upx;
		margin-top: 25upx;
		text-align: center;
		line-height: 80upx;
		color: #666666;
		border: 1px solid #979797;
		 margin-right: 30rpx;
	}
	.listactive{
		background-color: #269AFF;
		border: none !important;
		color: #FFFFFF !important;
	}
	.erleiactive{
		color: #0080FF !important;
		font-weight: bold !important;
		background:#F2F6FF !important;
		border: none !important;
	}
	.xieyi {
		text-align: center;
		display: flex;
		/* justify-content: center; */
		align-items: center;
		margin-top: 30rpx;
		/* position: relative; */
	}

	.xieyi .navigator {
		text-decoration: solid;
		color: #0A98D5;
		margin-bottom: 25upx;
		display: inline;
		
	}
	.xieyi .text{
		line-height: 44rpx;
		padding-left: 20rpx;
		font-size: 32rpx;
	}
	.xieyi image{
		width: 100%;
		height: 100%;
	}
	.btn {
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		color: #FFFFFF;
		-webkit-appearance: none;
		border: none;
		margin: 0 auto;
		margin-top: 200rpx;
		margin-bottom: 25rpx;
		font-size: 32rpx;
		margin-top: 200rpx;
	}

	/* 选中协议 */
	.check {
		/* padding-right: 15upx; */
		width: 44upx;
		height: 44upx;
		border-radius: 100%;
		/* background-color: #18B566; */
		border: 4upx solid #00ABEB;
		position: relative;
	}
	.checkbox{
		width: 15upx;
		height: 15upx;
		border-radius: 100%;
		position: absolute;
		top: 4upx;
		left: 5rpx;
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
