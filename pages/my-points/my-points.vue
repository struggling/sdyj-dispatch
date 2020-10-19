<template>
	<view>
		<!-- 顶部自定义导航 -->
		<!-- <u-navbar :is-back="true" title="我的积分" :height="height" :background="background" title-color="#ffffff"
		 back-icon-color="#ffffff">
		</u-navbar> -->
		<!-- jifen -->
		<view class="content">
			<view class="totalpoint line"><span class="my">我的积分：</span> <span class="point">{{number}}</span></view>
			
			
			 <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
					<!-- //  @init="mescrollInit" @down="downCallback" @up="upCallback"为固定值,不可删改(与mescroll-mixins保持一致) 
					 // :down="downOption" :up="upOption" 绝大部分情况无需配置 
					 // :top="顶部偏移量" :bottom="底部偏移量" :topbar="状态栏" :safearea="安全区" (常用)
					 // 字节跳动小程序 ref="mescrollRef" 必须配置 
					 // 此处支持写入原生组件  //数据列表 -->
					 <block v-if="data.length == 0">
						 <no-thing></no-thing>
						 <view class="tianchong" ></view>
					 </block>
					 <block v-for="(item,index) in newdatas" :key="index">
						 <view class="pointtitle line" >
						 	<view class="shu"></view>
						 	<view class="mouth">{{item.superUnitId}}月</view>
						 </view>
						 <block v-for="(items,index1) in item.superUnitList" :key="index1">
							 <view class="detail line">
							 	<view class="text-l">
							 		<view class="title">{{items.content}}</view>
							 		<view class="time">{{items.create_date}}</view>
							 	</view>
							 	<view class="text-r">
							 		<block v-if="item.type ==1"><view class="">+{{item.number}}</view></block>
							 		<block v-if="item.type ==2"><view class="">-{{item.number}}</view></block>
							 	</view>
							 </view>	
						 </block>
												
					</block>
			</mescroll-body>
		</view>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import noThing from "../../components/common/no-thing.vue";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		components:{
			noThing
		},
		data() {
			return {
				height: "",
				background: {
					backgroundImage: "linear-gradient(90deg, #54C3F1, #00ABEB)",
				},
				datas:[],
				data:{},
				number:0,
				mouth:[
					1,2,3,4,5,6,7,8,9,10,11,12
				]
			}
		},
		computed:{
			newdatas(){
				return this.newdata(this.data);
			}
		},
		onLoad() {
			// this.getPoint();\
			
		},
		methods: {
			newdata(originalArray){
			
					
					 // 根据 SUPERUNITID 生成的新的子数组对象
					 let resultArray = []
					 originalArray.map(mapItem => {
						 if (resultArray.length === 0) {
							 resultArray.push({superUnitId: mapItem['create_month'], superUnitList: [mapItem]})
						 } else {
							 let res = resultArray.some((someItem) => {
								 if (someItem['superUnitId']  === mapItem['create_month']) {
									 someItem['superUnitList'].push(mapItem)
									 return true
								 }
							 })
							 if (!res) {
								 resultArray.push({superUnitId: mapItem['create_month'], superUnitList: [mapItem]})
							 }
						 }
					 })
					 return resultArray
					 console.log('子数组对象', resultArray)
				
				
			},
			/*下拉刷新的回调, 有三种处理方式:*/
			downCallback(){

				// 第2种: 下拉刷新和上拉加载调同样的接口, 那么不用第1种方式, 直接mescroll.resetUpScroll()即可
				// this.mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				// 第3种: 下拉刷新什么也不处理, 可直接调用或者延时一会调用 mescroll.endSuccess() 结束即可
				this.mescroll.endSuccess()
				
				// 此处仍可以继续写其他接口请求...
				// 调用其他方法...
			},
			/*上拉加载的回调*/
			upCallback(page) {
				console.log(page,"页码");
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				this.getPoint(pageNum,pageSize);
			},
			getPoint(pageNum,pageSize){
				let that = this;
				this.$myRequest({
					url:'mall/integrationLog',
					data:{
						page:pageNum,
						pageSize:pageSize
					},
					methods:"GET"
				}).then(res=>{
					console.log(res);
				// const data = JSON.parse(res.data);
					if(res.data.code == 200){
						console.log(res.data.msg);
						this.number = res.data.number;
						// let newdatas = this.newdata(res.data.data.data);
						// console.log("新数组",newdatas);
						// if()newdatas.superUnitId
						// this.datas = this.datas.concat(newdatas);
						
						let curPageData = res.data.data.data; 
						
						// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
						let curPageLen = curPageData.length; 
						// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
						let totalSize = res.data.data.total
						//设置列表数据
						if(pageNum == 1) this.data = []; //如果是第一页需手动置空列表
						this.data = this.data.concat(curPageData); //追加新数据
						this.mescroll.endBySize(curPageLen, totalSize); 
					}else if(res.data.code == 300){
						console.log(res.data.msg);
						this.mescroll.endErr();
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
						console.log(res.data.msg);
						this.mescroll.endErr();
					}
				})
			}
		}
	}
</script>

<style scoped>
	.content{
		padding-left: 25upx;
		padding-right: 25upx;
		padding-top: 40upx;
	}
	.tianchong{
		height: 600rpx;
		width: 100%;
	}
	.totalpoint{
		height: 128upx;
		line-height: 128upx;
	}
	.totalpoint .my{
		
		font-size: 28upx;
		line-height: 128upx;
	}
	.totalpoint .point{
		
		font-size: 52upx;
		color: #00ABEB;
		font-weight: bold;
		line-height: 128upx;
	}
	.pointtitle{
		display: flex;
		font-weight: bold;
		height: 92upx;
		line-height:92upx;
		align-items: center;
	}
	.pointtitle .shu{
		width: 9upx;
		height: 30upx;
		background-color: #00AAEB;
		line-height:92upx;
	}
	.pointtitle .mouth{
		font-weight: bold;
		line-height:92upx;
		padding-left: 25upx;
	}
	
	.detail{
		display: flex;
		justify-content: space-between;
		height: 135upx;
		line-height: 135upx;
		align-items: center;
	}
	.text-l {
		line-height: 135upx;
		display: flex;
		/* align-items: center; */
		flex-direction: column;
	}
	.text-l .time{
		color: #999999;
		margin-top: 20rpx;
	}
	.text-r{
		color: #00AAEB;
		line-height: 135upx;
	}
	.line{
		border-bottom: 1upx solid #CCCCCC;
	}
</style>
