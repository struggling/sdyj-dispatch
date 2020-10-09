<template>
	<!-- 类型选择 -->
	<view class="typecontent">
		<view class="typefy">当前选择种类{{counttype}}</view>
		<!-- 一级分类 -->
		<view class="title">当前选择种类</view>
		<view class="onelist">
			<block v-for="(item,index) in listtype" :key="index">
				<view  :class="[list,tabIndex == index?'theme':'']" @tap='tabbar(index)'>{{item.label}}</view>
			</block>
		</view>
		<!-- 二级分类 -->
		<view class="title">种类</view>
		<view class="onelist">
			<block v-for="(item,index) in typename" :key="index">
				<view :class="[list,{'theme': rSelect.indexOf(index)!=-1}]" @tap="selecttype(index)">{{item.label}}</view>
			</block>
		</view>
		<view class="btn" style="text-align: center;background-color: #00A43F;" @tap="submittype">确定</view>
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
				listtype:[],
				tabIndex:0,
				rSelect: [],
				typename: [],
				sumstring: [],
				selectname: [],
				list: "list",
				typefy:""
			}
		},
		created() {
			this.getinittype();
		},
		onReady() {
			console.log("获取的类型属性:");
			console.log(this.listtype);
			this.typename = this.listtype[0].children;
			this.typefy = this.listtype[0].label;
		},
		computed: {
			counttype() {
				let selectname = "";
				for (var i = 0; i < this.selectname.length; i++) {
					
					selectname = selectname+ "," +this.selectname[i].label
					 //类型加二级类型
				}
				return this.typefy+selectname;
			}
		},
		methods:{
			//点击一级分类切换
			tabbar(index){
				this.tabIndex = index;
				this.typefy = this.listtype[index].label;
				this.typename = this.listtype[index].children;
				console.log(this.typename);
				console.log(this.typefy);
				this.selectname=[];
				this.rSelect=[];
			},
			//选择二级分类服务类型
			selecttype(e) {
				if (this.rSelect.indexOf(e) == -1) {
					console.log(e) //打印下标
						this.rSelect.push(e); //选中添加到数组里
						this.selectname.push(this.typename[e]);
						console.log("当前增加二级分类");
						console.log(this.selectname);
					
				} else {
						this.rSelect.splice(this.rSelect.indexOf(e), 1); //取消
						this.selectname.splice(this.typename.indexOf(e), 1);
						console.log("当前删除二级分类");
						console.log(this.selectname);
				}
			},
			//初始化类型参数
			getinittype(){
				this.$myRequest({
					url:'user/AllType',
					data:{},
					methods:"POST"
				}).then(res=>{
					console.log(res);
				// const data = JSON.parse(res.data);
					if(res.data.code == 200){
						console.log(res.data.msg);
						console.log(res.data.data);
						this.listtype = res.data.data;
					}else if(res.data.code == 300){
						console.log(res.data.msg);
				
					}else{
						console.log(res.data.msg)
					}
				})
			},
			//提交分类选择
			submittype(){
				this.$emit("submittype",this.counttype,false);
			}
		}
	}
</script>

<style scoped>
	/* 表单类型选择 */
	.typecontent {
		background-color: #E1E1E1;
		width: 100%;
		margin-top: 800upx;
		margin-bottom: 25upx;
		border-radius: 12upx;
		padding-left: 25upx;
		padding-right: 25upx;
		/* margin-top: 25upx; */
		padding-bottom: 25upx;
		
	}
	
	.typecontent  image{
		height: 220upx;
		width: 100%;
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
	
</style>
