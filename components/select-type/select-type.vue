<template>
	<!-- 类型选择 -->
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
</template>

<script>
	export default {
		
		data() {
			return {
				show:false,
				typefy:"",
				type:[],
				typename:'',
				rSelect: [],
				selectname:[],
				typedata:[],
				list: "list",
				tabIndex:0
			}
		},
		created() {
			this.getinittype();
		},
		onReady() {
			console.log(this.typename,"获取的类型属性:");
		},
		computed: {
			counttype() {
				let selectname = this.selectname;
				this.sumstring = this.selectname;
				return this.typefy + "," + this.sumstring; //类型加二级类型
			}
		},
		methods:{
			//确定分类
			quedingtype(){
				this.shows = true;
				this.show  =false;
				this.$emit("genggaifenlei",this.counttype)
				console.log("已选择分类又",this.counttype);
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
			//初始化类型参数
			getinittype(){
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
		width: 710upx;
		/* height: 820upx; */
		background-color: #fff;
	}
	/* 表单类型选择 */
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
</style>
