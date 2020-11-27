<template>
	<view class="wrap">
		<view class="top">
			<view class="item">
				<view class="left">收货人</view>
				<input type="text" placeholder-class="line" v-model="address.name" placeholder="请填写收货人姓名" />
			</view>
			<view class="item">
				<view class="left">手机号码</view>
				<input type="text" placeholder-class="line" v-model="address.phone" placeholder="请填写收货人手机号" />
			</view>
			<view class="item" @tap="showRegionPicker">
				<view class="left">所在地区</view>
				<input disabled type="text" placeholder-class="line" v-model="address.quyu" placeholder="省市区县、乡镇等" />
			</view>
			<view class="item address">
				<view class="left">详细地址</view>
				<textarea type="text" placeholder-class="line" v-model="address.site" placeholder="街道、楼牌等" />
			</view>
			<!-- <view class="site-clipboard">
				<textarea placeholder-class="line" value="" placeholder="粘贴文本,可自动识别姓名和地址等" />
				<view class="clipboard">
					地址粘贴板
					<u-icon name="arrow-down" class="icon" :size="20"></u-icon>
				</view>
			</view> -->
		</view>
		<view class="bottom">
			<view class="tag">
				<view class="left">标签</view>
				<view class="right">
					<block v-for="(item,index) in tags" :key="index">
						<text :class="['tags',tabIndex==index?'active':'']" @tap="xztags(index)">{{item}}</text>
					</block>
					<!-- 曾加自定义标签 -->
					<!-- <block v-if="showtags">
						<view class="tags plus"><input type="text" focus confirm-type="done" @confirm="confirm" @blur="cancel" value="" v-model="edtag" /></u-icon></view>
					</block>
					<block v-else>
						<view class="tags plus"><u-icon size="22" name="plus" @tap="edtags"></u-icon></view>
					</block> -->
					
				</view>
			</view>
			<view class="default">
				<view class="left">
					<view class="set">设置默认地址</view>
					<view class="tips">提醒：每次下单会默认推荐该地址</view>
				</view>
				<view class="right"><switch  :checked="flag" color="red" @change="setDefault" /></view>
			</view>
		</view>
		<view class="addSite" @tap="createadd">
			<view class="add">
				确认提交
			</view>
		</view>
		<u-picker mode="region" ref="uPicker" v-model="show" @confirm="rangeadd" @cancel="caladd"/>
	</view>
</template>

<script>
export default {
	data() {
		return {
			show: false,
			address:{
					id: 1,
					name: '',
					phone: '',
					tag: '家',
					site: '',
					quyu:'',
					is_default:2
			},
			tags:[
				"家",
				"公司",
				"学校",
			],
			tabIndex:0,
			showtags: false,
			edtag:'',
			flag:false,
			page:0,
			point:{}
		};
	},
	onLoad(event) {
		// 接受地址页面修改地址参数
		const page = event.page;
		console.log('页面跳转参数',page);
		//接受积分商城详情页数据
		const point = event.point;
		if(point){
			try {
				this.point =JSON.parse(decodeURIComponent(point))
				console.log(this.point);
			} catch (error) {
				this.point = JSON.parse(point);
			};
		}
		const payload = event.addsite;
		// 目前在某些平台参数会被主动 decode，暂时这样处理。
		// 接受页码值判断是哪个页面进来的
		console.log(page,"接受页码值：");
		if(page){
			try {
				this.page = page
			
			} catch (error) {
				this.page = page
			};
		}
		
		console.log(event.addsite);
		// 目前在某些平台参数会被主动 decode，暂时这样处理。
		if(payload){
			try {
				this.address= JSON.parse(decodeURIComponent(payload));
				console.log("详情页参数");
				console.log(this.address);
				for(var i = 0; i<this.tags.length;i++){
					if(this.tags[i] == this.address.tag){
						this.tabIndex = i;
					}
					
				}
				// 使用find方法执行查抄元素,当数组中的元素在测试条件时返回 true 时, find() 返回符合条件的元素，之后的值不会再调用执行函数。
				// tags
				 
				
			} catch (error) {
				this.address = JSON.parse(payload);
				console.log("详情页参数");
				console.log(this.address);
			};
		}
		const detailDate = event.detailDate;
		function checkTags(tag,index) {
		    return tag == "家"
		}				 
		let findtag=this.tags.findIndex(checkTags);
		console.log(findtag,"查找元素为");
		// 初始化区域信息
		// this.address.quyu = uni.getStorageSync('sheng');
		// if(this.address.is_default ==1){
		// 	this.flag = true
		// }else{
		// 	this.flag = false
		// }
	},
	methods: {
		setDefault() {
			// console.log('设置');
			this.flag =!this.flag;
			
			if(this.flag){
				this.address.is_default = 1
				console.log(this.address.is_default);
			}else{
				this.address.is_default = 2
				console.log(this.address.is_default);
			}
		},
		showRegionPicker() {
			this.show = true;
		},
		//点击选中tags
		xztags(index){
			this.tabIndex = index;
			this.address.tag = this.tags[index];
			console.log('选中tags下表',index);
		},
		// 点击编辑tags
		edtags(){
			this.showtags = true;
			this.edtag = '';
		},
		//监听键盘完成时间
		confirm(){
			this.showtags = false;
			if(this.edtag){
				this.tags.push(this.edtag)
			}
		},
		//取消tags输入
		cancel(){
			this.showtags = false;
		},
		//toAddSite增加地址信息
		toAddSite(){
			let detail = {
				id: this.address.id,
				name: this.address.name,
				phone: this.address.phone,
				tag: this.address.tag,
				site: this.address.site,
			};
			uni.navigateTo({
				// url: '../../pages/order-detail/order-detail?detailDate=' + encodeURIComponent(JSON.stringify(detail))
				url: './address?detailDate=' + encodeURIComponent(JSON.stringify(detail))
			});
		},
		// 地区选择确认
		rangeadd(e){
			console.log(e);
			this.address.quyu = e.province.label+e.city.label+e.area.label
		},
		// 地区选择取消
		caladd(e){
			console.log(e);
		},
		// 增加地址
		createadd(){
			//增加地址
			if(!this.address.id){
				this.$myRequest({
					url:'address/create',
					data:{
						consignee :this.address.name, //	是	string	收货人
						phone:this.address.phone,	//是	number	手机号
						location:this.address.quyu,//	是	string	所在地
						address:this.address.site,//	是	string	详细地址
						tag:this.address.tag, //	否	string	标签
						is_default:this.address.is_default    // 1为是2为否
					},
					methods:"POST"
				}).then(res=>{
					if(res.data.status == 200){
						console.log(res.data.msg,"传递页码值",this.page);
						console.log("传递页码值");
						uni.showToast({
							icon:"none",
							title:res.data.msg
						})
						// console.log();
						setTimeout(()=>{
							if(this.page ==1){
								uni.reLaunch({
									// url: '../../pages/order-detail/order-detail?detailDate=' + encodeURIComponent(JSON.stringify(detail))
									url: './address?page='+this.page
								});
							}else if(this.page ==2){
								uni.reLaunch({
									// url: '../../pages/order-detail/order-detail?detailDate=' + encodeURIComponent(JSON.stringify(detail))
									url: './address?page='+this.page
								});
							}else{
								// uni.setStorageSync('addressid',detail.id);
								uni.reLaunch({
									// url: '../../pages/order-detail/order-detail?detailDate=' + encodeURIComponent(JSON.stringify(detail))
									url: './address?point='+ encodeURIComponent(JSON.stringify(this.point))+'&detailid='+this.address.id+'&page='+this.page
								});
							}
						},500)
						
					}else{
						console.log(res.data.msg);
						uni.showToast({
							icon:"none",
							title:res.data.msg
						})
					}
				})
			}
			// 修改地址
			else{
				this.$myRequest({
					url:'address/updata',
					data:{
						id:this.address.id,
						consignee :this.address.name, //	是	string	收货人
						phone:this.address.phone,	//是	number	手机号
						location:this.address.quyu,//	是	string	所在地
						address:this.address.site,//	是	string	详细地址
						tag:this.address.tag, //	否	string	标签
						is_default:this.address.is_default    // 1为是2为否
					},
					methods:"POST"
				}).then(res=>{
					if(res.data.status == 200){
						console.log(res.data.msg);
						uni.showToast({
							icon:"none",
							title:res.data.msg
						})
						setTimeout(()=>{
							if(this.page ==1){
								uni.reLaunch({
									// url: '../../pages/order-detail/order-detail?detailDate=' + encodeURIComponent(JSON.stringify(detail))
									url: './address?page='+this.page
								});
							}else if(this.page ==2){
								uni.reLaunch({
									// url: '../../pages/order-detail/order-detail?detailDate=' + encodeURIComponent(JSON.stringify(detail))
									url: './address?page='+this.page
								});
							}else{
								// uni.setStorageSync('addressid',detail.id);
								uni.reLaunch({
									// url: '../../pages/order-detail/order-detail?detailDate=' + encodeURIComponent(JSON.stringify(detail))
									url: './address?point='+ encodeURIComponent(JSON.stringify(this.point))+'&detailid='+this.address.id+'&page='+this.page
								});
							}
						},500)
						
					}else{
						console.log(res.data.msg);
						uni.showToast({
							icon:"none",
							title:res.data.msg
						})
					}
				})
			}
			
		}
	}
};
</script>

<style lang="scss" scoped>
	view{
		line-height: 3.15;
	}
	.active{
		background-color: #3191fd;
		color: #FFFFFF !important;
	}
/deep/ .line {
	color: $u-light-color;
	font-size: 28rpx;
}
.wrap {
	background-color: #f2f2f2;
	.top {
		background-color: #ffffff;
		border-top: solid 2rpx $u-border-color;
		padding: 22rpx;
		.item {
			display: flex;
			font-size: 32rpx;
			line-height: 100rpx;
			align-items: center;
			border-bottom: solid 2rpx $u-border-color;
			.left {
				width: 180rpx;
			}
			input {
				text-align: left;
			}
		}
		
		.address {
			padding: 20rpx 0;
			textarea {
				// width: 100%;
				height: 150rpx;
				background-color: #f7f7f7;
				line-height: 60rpx;
				margin: 40rpx auto;
				padding: 20rpx;
			}
		}
		.site-clipboard {
			padding-right: 40rpx;
			textarea {
				// width: 100%;
				height: 150rpx;
				background-color: #f7f7f7;
				line-height: 60rpx;
				margin: 40rpx auto;
				padding: 20rpx;
			}
			.clipboard {
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 26rpx;
				color: $u-tips-color;
				height: 80rpx;
				.icon {
					margin-top: 6rpx;
					margin-left: 10rpx;
				}
			}
		}
	}
	.bottom {
		margin-top: 20rpx;
		padding: 40rpx;
		padding-right: 0;
		background-color: #ffffff;
		font-size: 28rpx;
		.tag {
			display: flex;
			.left {
				width: 160rpx;
			}
			.right {
				display: flex;
				flex-wrap: wrap;
				.tags {
					width: 140rpx;
					padding: 16rpx 8rpx;
					border: solid 2rpx $u-border-color;
					text-align: center;
					border-radius: 50rpx;
					margin: 0 10rpx 20rpx;
					display: flex;
					font-size: 28rpx;
					align-items: center;
					justify-content: center;
					color: $u-content-color;
					line-height: 1;
				}
				.plus {
					//padding: 10rpx 0;
				}
			}
		}
		.default {
			margin-top: 50rpx;
			display: flex;
			justify-content: space-between;
			border-bottom: solid 2rpx $u-border-color;
			line-height: 64rpx;
			.tips {
				font-size: 24rpx;
			}
			.right {
			}
		}
	}
}
.addSite {
	display: flex;
	justify-content: space-around;
	width: 600rpx;
	line-height: 100rpx;
	position: absolute;
	bottom: 30rpx;
	left: 80rpx;
	background-color: #3191fd;
	border-radius: 60rpx;
	font-size: 30rpx;
	.add{
		display: flex;
		align-items: center;
		color: #ffffff;
		.icon{
			margin-right: 10rpx;
		}
	}
}
</style>
