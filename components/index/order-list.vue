<template>
	<view>
		<view class="img-video-list animated fadeInLeft">
			<view class="avatar">
				<view>
					<image :src="item.avatar" mode="widthFix" lazy-load="">{{item.username}}</image>

				</view>
				<view v-show="!item.isconcern" @tap="guanzhu">
					<view class="iconfont icon-zengjia1"></view>关注
				</view>
			</view>
			<view class="img-video-title" @tap="opendetial">{{item.title}}</view>
			<view class="img-video" @tap="opendetial">
				<!-- 图片 -->

				<image :src="item.titlepic" mode="widthFix" lazy-load=""></image>

				<!-- 视频 -->
				<template v-if="item.type == 'video'">
					<view class="video-play iconfont icon-bofang"></view>
					<view class="video-play-info">{{item.playnum}}次播放 {{item.long}}</view>
				</template>

			</view>
			<view class="Commentaries">
				<view>
						<view class=" iconfont icon-xiaolianmanyifuwu" :class="{'active':(item.infonum.index==1)}" @tap="caozuo('smile')">
							<view>{{item.infonum.smile}}</view>
						</view>
						<view class="iconfont icon-kulian" :class="{'active':(item.infonum.index==2)}" @tap="caozuo('angry')">
							<view>{{item.infonum.angry}}</view>
						</view>
				</view>
				<view>
					<view>
						<view class=" iconfont icon-pinglun">{{item.commentnum}}</view>
						<view class="iconfont icon-zhuanfa">{{item.share}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>	
</template>

<script>
	export default {
		props: {
			item: Object,
			index: Number
		},
		methods: {
			//关注
			guanzhu() {
				this.item.isconcern = true;
				uni.showToast({
					title: '关注成功',
					mask: false,
					duration: 1500
				})
			},
			//操作
			caozuo(type) {
				switch (type) {
					case "smile":
						if (this.item.infonum.index == 1) {
							return;
						}
						this.item.infonum.smile++;
						if (this.item.infonum.index == 2) {
							this.item.infonum.angry--;
						}
						this.item.infonum.index = 1
						break;
					case "angry":
						if (this.item.infonum.index == 2) {
							return;
						}
						this.item.infonum.angry++;
						if (this.item.infonum.index == 1) {
							this.item.infonum.smile--;
						}
						this.item.infonum.index = 2
						break;

				}
			},
			//进入详情页
			opendetial(){
				console.log("进入详情页");
				console.log(this.item);
				uni.navigateTo({
					url: '../../pages/detail/detail?detailData='+JSON.stringify(this.item),
				});
			}
		}

	}
</script>

<style>
	.img-video-list {
		padding: 20upx;
		border-bottom: 1upx solid;
	}

	.avatar {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.avatar>view:first-child {
		display: flex;
		align-items: center;
		color: #929292;
	}

	.avatar>view:first-child image {
		width: 90upx;
		height: 90upx !important;
		border-radius: 50%;
		margin-right: 10upx;
	}

	.avatar>view:last-child {
		display: flex;
		align-items: center;
		background-color: #f4f4f4;
		border-radius: 5upx;
	}

	.img-video-title {
		padding: 15upx 0;
		font-size: 32upx;
	}

	.img-video {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		/* text-align: center; */
	}

	.img-video .video-play {
		position: absolute;
		/* background-color: rgba(51,51,51,0.72); */
		color: #FFFFFF;
		font-size: 140upx;


	}

	.img-video .video-play-info {
		position: absolute;
		background-color: rgba(51, 51, 51, 0.72);
		color: #FFFFFF;
		bottom: 8upx;
		right: 8upx;
		border-radius: 40upx;
		font-size: 22upx;
		padding: 0 10upx;

	}

	.img-video>image {
		width: 100%;
		border-radius: 20upx;
	}

	.Commentaries {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15upx 0;
		color: #999999;
	}

	.Commentaries>view:first-child {
		display: flex;
		align-items: center;
	}

	.Commentaries>view:last-child {
		display: flex;
		align-items: center;
	}

	.Commentaries>view>view {
		display: flex;
		align-items: center;
		margin-right: 15upx;
	}

	.Commentaries>view>view>view {
		margin-right: 15upx;

	}

	.active {
		color: #4130ff;
	}
</style>
