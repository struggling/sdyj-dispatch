<template>
    <view>
		<view class="uni-tab-bar">
			<scroll-view scroll-x class="uni-swiper-tab" :style="scrollStyle">
				<block v-for="(tab,index) in tabBars" :key="tab.id">
					<view class="swiper-tab-list" :class="{'active':tabIndex == index}" @tap="tabtap(index)" :style="scrollItemStyle">
						{{tab.name}} {{tab.num?tab.num:''}}
						<view class="swiper-tab-line"></view>
					</view>
				</block>
			</scroll-view>
		</view>
		<view class="uni-tab-bar">
			<swiper class="swiper-box" :style="{height:'500px'}" :current="tabIndex" @change="tabChange">
				<swiper-item v-for="(item,index) in newslist" :key="index">
					<scroll-view style="height: 300px;" scroll-y="true" refresher-enabled="true" :refresher-triggered="triggered"
					    :refresher-threshold="100" refresher-background="lightgreen" @refresherpulling="onPulling"
					    @refresherrefresh="onRefresh" @refresherrestore="onRestore" @refresherabort="onAbort">
						<!-- 待上门订单列表 -->
						<view class="">{{item.list}}1</view>

					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
        <!-- <scroll-view style="height: 300px;" scroll-y="true" refresher-enabled="true" :refresher-triggered="triggered"
            :refresher-threshold="100" refresher-background="lightgreen" @refresherpulling="onPulling"
            @refresherrefresh="onRefresh" @refresherrestore="onRestore" @refresherabort="onAbort"></scroll-view> -->
    </view>
</template>

<script>
    export default {
        data() {
            return {
				tabBars: [{
						name: "待上门",
						id: "daishangmen"
					},
					{
						name: "待结算",
						id: "daijiesuan"
					},
					{
						name: "已结算",
						id: "yijiesuan"
					},
					{
						name: "已取消",
						id: "yiquxiao"
					},
				],
				newslist:[
					{list:1},
					{list:1},
					{list:1},
					{list:1},
				],
                triggered: false,
				tabIndex: 0
            }
        },
        onLoad() {
            this._freshing = false;
            setTimeout(() => {
                this.triggered = true;
            }, 1000)
        },
        methods: {
            onPulling(e) {
                console.log("onpulling", e);
            },
            onRefresh() {
                if (this._freshing) return;
                this._freshing = true;
                setTimeout(() => {
                    this.triggered = false;
                    this._freshing = false;
                }, 3000)
            },
            onRestore() {
                this.triggered = 'restore'; // 需要重置
                console.log("onRestore");
            },
            onAbort() {
                console.log("onAbort");
            },
			tabtap(index){
				this.tabIndex = index;
			},
			tabChange(e){
				this.tabIndex = this.tabIndex = e.detail.current;
			}
        }
    }
</script>

<style>

</style>
