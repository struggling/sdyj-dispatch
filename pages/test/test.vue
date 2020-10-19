<template>
	
    <view>
        <scroll-view style="height: 300px;" scroll-y="true" refresher-enabled="true" :refresher-triggered="triggered"
            :refresher-threshold="100" refresher-background="lightgreen" @refresherpulling="onPulling"
            @refresherrefresh="onRefresh" @refresherrestore="onRestore" @refresherabort="onAbort">
		</scroll-view>
    </view>
</template>
<script>
    export default {
        data() {
            return {
                triggered: false,
				tabIndex: 0,
				tabBars: [
					{
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
            }
        },
        onLoad() {
            this._freshing = false;
            setTimeout(() => {
                this.triggered = true;
            }, 1000)
        },
        methods: {
			tabtap(index){
				this.tabIndex = index;
			},
			tabChange(e){
				this.tabIndex = this.tabIndex = e.detail.current;
			},
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
            }
        }
    }
</script>
<style></style>