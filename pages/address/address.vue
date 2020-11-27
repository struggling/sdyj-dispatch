<template>
	<view>
		<block v-if="siteList.length>0">
			<view class="item" v-for="(res, index) in siteList" :key="res.id" @tap="xzaddress(res)">
				<view class="top">
					<view class="name">{{ res.consignee }}</view>
					<view class="phone">{{ res.phone }}</view>
					<view class="tag">
						<text>{{ res.tag }}</text>
						<block v-if="res.is_default==1"><text  :class="{red:res.is_default==1}">默认</text></block>
						
					</view>
				</view>
				<view class="bottom">
					{{res.address}}
					<u-icon name="edit-pen" :size="40" color="#999999" @tap.stop="toAddSite(res)"></u-icon>
				</view>
			</view>
		</block>
		<block v-else>
			<view class="noaddress">暂无收货地址，请手动添加</view>
		</block>
		<view class="addSite" @tap="toAddSite">
			<view class="add">
				<u-icon name="plus" color="#ffffff" class="icon" :size="30"></u-icon>新建收货地址
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			siteList: [],
			data:"",
			page:1,
			point:{}
		};
	},
	onLoad(event) {
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
		const payload = event.detailDate;
		// 目前在某些平台参数会被主动 decode，暂时这样处理。
		// 接受页码值判断是哪个页面进来的
		const page = event.page;
		console.log(page,"接受页码值：");
		if(page){
			try {
				this.page = page
			
			} catch (error) {
				this.page = page
			};
		}
		if(payload){
			try {
				this.data= JSON.parse(decodeURIComponent(payload));
				console.log("详情页参数");
				console.log(this.data);
			
			} catch (error) {
				this.data = JSON.parse(payload);
				console.log("详情页参数");
				console.log(this.data);
			};
		}
		// 获取地址列表
		this.getData();
	},
	methods: {
		// 获取地址列表
		getData() {
			
			this.$myRequest({
				url:'address/index',
				data:{},
				methods:"GET"
			}).then(res=>{
				if(res.data.status == 200){
					console.log(res.data.msg);
					this.siteList = res.data.data;
				}else{
					console.log(res.data.msg);
					uni.showToast({
						icon:"none",
						title:res.data.msg
					})
				}
			})
		},
		// 增加和修改地址信息 传参为修改地址信息
		toAddSite(item){
			console.log(item.is_default);
			let detail = {
				id: item.id,
				name: item.consignee,
				phone: item.phone,
				tag: item.tag,
				site: item.address,
				quyu:item.location,
				is_default:item.is_default
			};
			if(this.page ==1){
				uni.navigateTo({
					// url: '../../pages/order-detail/order-detail?detailDate=' + encodeURIComponent(JSON.stringify(detail))
					url: './addSite?addsite=' + encodeURIComponent(JSON.stringify(detail))+'&page='+this.page
				});
			}else if(this.page ==2){
				uni.navigateTo({
					// url: '../../pages/order-detail/order-detail?detailDate=' + encodeURIComponent(JSON.stringify(detail))
					url: './addSite?addsite=' + encodeURIComponent(JSON.stringify(detail))+'&page='+this.page
				});
			}else{
				uni.setStorageSync('addressid',detail.id);
				uni.navigateTo({
					// url: '../../pages/order-detail/order-detail?detailDate=' + encodeURIComponent(JSON.stringify(detail))
					url: './addSite?point='+ encodeURIComponent(JSON.stringify(this.point))+'&detailid='+detail.id+'&page='+this.page+'&addsite=' + encodeURIComponent(JSON.stringify(detail))
				});
			}
		},
		//选中地址回调原页面
		xzaddress(item){
			console.log("回传注册页面参数地址",item,item.id,this.page);
			// console.log("回传注册页面参数地址",item.address);
			let detail = {
				id: item.id,
				name: item.consignee,
				phone: item.phone,
				tag: item.tag,
				site: item.address,
				quyu:item.location,
				is_default:item.is_default
			};
			if(this.page ==1){
				uni.reLaunch({
					// url: '../../pages/order-detail/order-detail?detailDate=' + encodeURIComponent(JSON.stringify(detail))
					url: '../register/register?detailDate=' + encodeURIComponent(JSON.stringify(detail))
				});
			}else if(this.page ==2){
				uni.reLaunch({
					// url: '../../pages/order-detail/order-detail?detailDate=' + encodeURIComponent(JSON.stringify(detail))
					url: '../myinfo/myinfo?detailDate=' + encodeURIComponent(JSON.stringify(detail))
				});
			}else{
				uni.setStorageSync('addressid',detail.id);
				uni.reLaunch({
					// url: '../../pages/order-detail/order-detail?detailDate=' + encodeURIComponent(JSON.stringify(detail))
					url: '../mall-detail/mall-detail?detailDate='+ encodeURIComponent(JSON.stringify(this.point))+'&detailid='+detail.id
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
	.noaddress{
		text-align: center;
		margin-top: 400rpx;
		color: #666666;
	}
	view{
		line-height: 3.15;
	}
.item {
	padding: 40rpx 20rpx;
	.top {
		display: flex;
		font-weight: bold;
		font-size: 34rpx;
		.phone {
			margin-left: 60rpx;
		}
		.tag {
			display: flex;
			font-weight: normal;
			align-items: center;
			text {
				display: block;
				width: 60rpx;
				height: 34rpx;
				line-height: 34rpx;
				color: #ffffff;
				font-size: 20rpx;
				border-radius: 6rpx;
				text-align: center;
				margin-left: 30rpx;
				background-color:rgb(49, 145, 253);
			}
			.red{
				background-color:red
			}
		}
	}
	.bottom {
		display: flex;
		margin-top: 20rpx;
		font-size: 28rpx;
		justify-content: space-between;
		color: #999999;
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
	background-color: red;
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
