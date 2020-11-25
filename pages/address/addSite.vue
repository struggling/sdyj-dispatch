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
					<block v-if="showtags">
						<view class="tags plus"><input type="text" focus confirm-type="done" @confirm="confirm" @blur="cancel" value="" v-model="edtag" /></u-icon></view>
					</block>
					<block v-else>
						<view class="tags plus"><u-icon size="22" name="plus" @tap="edtags"></u-icon></view>
					</block>
					
				</view>
			</view>
			<view class="default">
				<view class="left">
					<view class="set">设置默认地址</view>
					<view class="tips">提醒：每次下单会默认推荐该地址</view>
				</view>
				<view class="right"><switch color="red" @change="setDefault" /></view>
			</view>
		</view>
		<view class="addSite" @tap="toAddSite">
			<view class="add">
				<u-icon name="plus" color="#ffffff" class="icon" :size="30"></u-icon>确认提交
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
					name: '游X',
					phone: '183****5523',
					tag: [
						{
							tagText: '默认'
						},
						{
							tagText: '家'
						}
					],
					site: '广东省深圳市宝安区 自由路66号',
					quyu:'眉山是'
			},
			tags:[
				"家",
				"公司",
				"学校",
			],
			tabIndex:0,
			showtags: false,
			edtag:''
		};
	},
	methods: {
		setDefault() {},
		showRegionPicker() {
			this.show = true;
		},
		//点击选中tags
		xztags(index){
			this.tabIndex = index;
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
