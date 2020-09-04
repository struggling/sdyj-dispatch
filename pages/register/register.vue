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
				<view class="input"><input type="text" v-model="name" value="" placeholder="请填写你的姓名"/></view>
			</view>
			<view class="from-group">
				<view class="iconfont icongerenzhongxinwoderenwubiaozhuntouxianxing"></view>
				<view class="line"></view>
				<view class="input"><input type="text" v-model="worktime" value="" placeholder="请填写你的工龄"/></view>
			</view>
			<view class="from-group">
				<view class="iconfont iconshouji"></view>
				<view class="line"></view>
				<view class="input"><button  open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">{{phonenum}}</button></view>
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
							<view :class="[list,{'theme': rSelect.indexOf(index)!=-1}]"  @tap="selecttype(index)">{{item}}</view>
						</block>
					</view>
			</view>
			<!-- 协议 -->
			<input name="Fruit" type="radio" value="" />
			<view class="xieyi">
				<input type="radio" checked/>
确定同意<span>《协议》</span></view>
			<!-- 提交 -->
			<button type="default" class="btn theme"> 确定提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectname :[],
				counttype:"请选择服务类型",
				name:"",
				worktime:"",
				phonenum:"获取手机号码",
				list:"list",
				rSelect:[],
				typefy:"",
				typename:[],
				height: "",
				background: {
					backgroundImage: "linear-gradient(90deg, #00ABEB, #54C3F1)",
				},
			}
		},
		computed:{
			counttype(){
				let selectname = this.selectname;
				for (let i = 0; i < selectname.length; i++) {
					let sumstring =  selectname[i];
					console.log(sumstring);
				}
				return this.typefy+"——"+sumstring
			}
		},
		onLoad(option) {
			console.log(option.id); //打印出上个页面传递的参数。
			this.typefy = option.id;
			let typedata = uni.getStorageSync("typedata");
			for(var typename in typedata){//遍历对象属性名
				
				if(option.id == typename){
					console.log(typeof(typedata));
					console.log(typedata[typename]);
					this.typename = typedata[typename];
					console.log(this.typename);
				}
			}
			
		},
		methods: {
			//选择二级分类服务类型
			selecttype(e){
				 if (this.rSelect.indexOf(e) == -1) {
					console.log(e)//打印下标
					this.rSelect.push(e);//选中添加到数组里
					this.selectname.push(this.typename[e]);
				} else {
					this.rSelect.splice(this.rSelect.indexOf(e), 1); //取消
				 }
			},
			//获取手机号码
			getPhoneNumber(e) {
				 console.log(e);  
				 console.log(e.detail.iv);  
				 console.log(e.detail.encryptedData);  
			}  
		},
		onReady() {
			
		}
	}
</script>

<style scoped>
	.content{
		padding-left: 25upx;
		padding-right: 25upx;
		padding-top: 80upx;
	}
	/* 表单登记 */
	.from-group{
		display: flex;
		border-bottom: 1upx solid #B3B3B3;
		padding-top: 29upx;
		padding-bottom: 29upx;
	}
	.from-group .line{
		width: 4upx;
		height: 50upx;
		background-color:#B3B3B3; 
		margin-left: 25upx;
		margin-right: 25upx;
	}
	.from-group .iconfont{
		font-size: 44upx;
		color:#B3B3B3;
	}
	.from-group .input{
		flex: 1;
	}
	.from-group .input input{
		font-size: 30upx;
		color:#B3B3B3;
		width: 100%;
	}
	.from-group .input button{
		-webkit-appearance: none;
		height: 100%;
		line-height: 50upx;
		background: linear-gradient(90deg, #00ABEB, #54C3F1);
		color: #FFFFFF;
		
	}
	/* 表单类型选择 */
	.typecontent{
		background-color:#E1E1E1;
		width: 100%;
		margin-bottom:25upx ;
		border-radius: 12upx;
		padding-left: 25upx;
		padding-right: 25upx;
		margin-top: 25upx;
	}
	.typecontent .title{
		color: #808080;
		font-size:30upx;
		font-weight: bold;
		padding-top: 25upx;
		
	}
	.typecontent .onelist{
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.typecontent .onelist .list{
		width: 170upx;
		height: 60upx;
		background-color: #B3B3B3;
		border-radius: 20upx;
		margin-top:25upx ;
		text-align: center;
		line-height: 60upx;
		color: #FFFFFF;
	}
	.xieyi{
		text-align: center;
	}
	.xieyi span{
		text-decoration: solid;
		color: #0A98D5;
		margin-bottom: 25upx;
	}
	.btn{
		width: 60%;
		height: 70upx;
		line-height: 70upx;
		color: #FFFFFF;
		-webkit-appearance:none;
		border: none;
		margin: 0 auto;
		margin-top: 25upx;
		margin-bottom: 25upx;
	}
</style>
