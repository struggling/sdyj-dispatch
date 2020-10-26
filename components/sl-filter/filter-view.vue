<template>

	<view>
		<view style="padding: 0px 0px;">
			<view class="filter-content" v-for="(item, index) in menuList" :key="index" v-if="menuIndex == index">
				<view v-if="item.isSort">
					<!-- <view class="filter-content-list">
						<view v-for="(detailItem,idx) in selectDetailList" :key="idx" :class="detailItem.isSelected?'filter-content-list-item-active':'filter-content-list-item-default'"
						 :style="{'color': detailItem.isSelected?themeColor:'#666666'}" @tap="sortTap(idx,selectDetailList,item.key)">
							<text>{{detailItem.title}}</text>
						</view>
					</view> -->
				</view>
				<view v-else>
					<block v-if="index == 1">
						<view class="">
							<view class="content" style="height: 1200upx !important;">
								<!-- <view class="signed theme" @tap="Sign">签到</view> -->
								<calendar
										:ref="'calendar'"
										mode="range"
										max-date="2050-01-01" 
										active-bg-color="#41b6ff" 
										active-color="#ffffff" 
										range-color="#ffffff"
										range-bg-color="#9bc7ff" @change="change">
								</calendar>
								<!-- <u-calendar class="calendar" :ref="'calendar'" v-model="show" :mode="mode" @change="change" max-date="2050-01-01" ></u-calendar> -->
							    <!-- <view class="change">选中日期：{{curDate}}</view> -->
								<view class="moon">
									<block v-for="(items,indexs) in moonlist" :key="indexs">
										<view :class="[sw,tabIndex==indexs?moonactive:'']" @tap="changemoon(indexs)">{{items.value}}</view>
									</block>
									<!-- <view class="xw">下午</view>
									<view class="xw">下午</view> -->
								</view>
								<view class="filter-content-footer">
									<!-- <view class="filter-content-footer-item" style="color: #777777; background-color: #FFFFFF;" @tap="resetClick(selectDetailList,item.key)">
										<text>重置</text>
									</view> -->
									<view class="filter-content-footer-item" :style="{'color': '#FFFFFF', 'background-color': themeColor}" @tap="changetype">
										<text>确定</text>
									</view>
								</view>
							</view>
						</view>
					</block>
					<block v-if="index == 2">
						<view class="filter-content-title" v-if="item.detailTitle && item.detailTitle.length">
							<text>{{item.detailTitle}}</text>
						</view>
						<view class="filter-content-detail">
							<text v-for="(detailItem,idx) in selectDetailList" :key="idx" class='filter-content-detail-item-default' :style="{'background':detailItem.isSelected?'#dbe4f9':'#EEEEEE','color':detailItem.isSelected?'#0080FF':'#666666'}"
							 @tap="itemTap(idx,selectDetailList,item.isMutiple,item.key)">
								{{detailItem.title}}
							</text>
						</view>
						<view class="filter-content-footer">
							<view class="filter-content-footer-item" :style="{'color': '#FFFFFF', 'background-color': themeColor}" @tap="suretype(idx)">
								<text>确定</text>
							</view>
						</view>
					</block>
					<block v-if="index == 0">
						<view class="filter-content-title" v-if="item.detailTitle && item.detailTitle.length">
							<text>{{item.detailTitle}}</text>
						</view>
						<view class="filter-content-detail">
							<text v-for="(detailItem,idx) in selectDetailList" :key="idx" class='filter-content-detail-item-default' :style="{'background':detailItem.isSelected?'#dbe4f9':'#EEEEEE','color':detailItem.isSelected?'#0080FF':'#666666'}"
							 @tap="itemTap(idx,selectDetailList,item.isMutiple,item.key)">
								{{detailItem.title}}
							</text>
						</view>
						<view class="filter-content-footer">

							<view class="filter-content-footer-item" :style="{'color': '#FFFFFF', 'background-color': themeColor}" @tap="sureClick">
								<text>确定</text>
							</view>
						</view>
					</block>
					
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import RenCalendar from '@/components/ren-calendar/ren-calendar.vue';
	import calendar from "../../uview-ui/components/u-calendar/u-calendar.vue"
	export default {
		components:{
			RenCalendar,
			calendar,
		},
		
		data() {
			return {
				sw:"sw",
				moonactive:"moonactive",
				moonlist:[
					{value:"重置"},
					{value:"上午"},
					{value:"下午"}
				],
				idx:0,
				moon:0,
				curDate:"",
				startDate:'',
				endDate:"",
				tabIndex:0,
				markDays:[],
				selectArr: [],
				result: {},
				menuIndex: 0,
				selectDetailList: [],
				independenceObj: {},
				selectedKey: '',
				cacheSelectedObj: {},
				defaultSelectedTitleObj: {}
			};
		},
		props: {
			themeColor: {
				type: String,
				default () {
					return '#D1372C'
				}
			},
			menuList: {
				type: Array,
				default () {
					return []
				}
			},
			independence: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			
			selectedTitleObj() {
				let obj = {}
				for (let i = 0; i < this.menuList.length; i++) {
					let item = this.menuList[i];
					obj[item.key] = item.title;
				}
				return obj;
			},
			defaultSelectedObj() { // 保存初始状态
			// console.log(this.menuList,"菜单列表");
				return this.getSelectedObj()
			},
			selectedObj: {
				get() {
					return this.getSelectedObj()
				},
				set(newObj) {
					return newObj;
				}

			}
		},
		methods: {
			//选择上下午
			changemoon(index){
				console.log(index);
				this.tabIndex = index;
				this.moon = index;
			},
			//日历
			onDayClick(data){
			    this.curDate = data.date;
				console.log( this.curDate,"选中的日期");
				uni.setStorageSync("curDate",this.curDate);
			},
			//审核或者未审核
			suretype(status){
				this.$emit("checkmoon");
				let str = uni.getStorageSync("type");
				let town = uni.getStorageSync("town");
				let uid = uni.getStorageSync("uid");
				this.$emit("qiehuan",status);
				this.$myRequest({
					url:'work/already',
					data:{
						"town":town ,
						"uid":uid ,
						"genre": str,
						"status":status
					},
					methods:"POST"
					
				}).then(res=>{
				// 	console.log(res);
				// const data = JSON.parse(res.data);
					if(res.data.code == 200){
						console.log(res.data.msg);
						console.log("审核状态");	
						let beenlist = res.data.data;
						uni.$emit("updatebeenlist",{data:beenlist})		
					}else if(res.data.code == 300){
						console.log(res.data.msg);
						uni.showToast({
							title:"暂无相关订单"
						})
					}else{
						console.log(res.data.msg)
					}
				})
			},
			changetype(){
				this.$emit("checkmoon");
				
				console.log(this.$refs.calendar,"子组件");
				let str = uni.getStorageSync("type");
				let endDate = this.$refs.calendar[0].endDate;
				let startDate = this.$refs.calendar[0].startDate;
				let objdate = [startDate,endDate];
				this.$emit("qiehuansjijian",objdate);
				// let startDate = uni.getStorageSync("startDate");
				// let endDate = uni.getStorageSync("endDate");
				let town = uni.getStorageSync("town");	
				let uid = uni.getStorageSync("uid");
				// let orderlist = uni.getStorageSync("orderlist");
				// let orderlist = uni.getStorageSync("orderlist");
				// let date ="";
				if(endDate ==""){
					endDate = "2050-1-1";
				}
				console.log(startDate,"开始时间");
				
				this.$myRequest({
					url:'work/stay',
					data:{
						"town":town ,
						"genre": str,
						"uid":uid ,
						"start_time":startDate,
						"end_time":endDate,
						"noon":this.moon,
						"duration":"",
						
					},
					methods:"POST"
					
				}).then(res=>{
				// 	console.log(res);
				// const data = JSON.parse(res.data);
					if(res.data.code == 200){
						console.log(res.data.msg);
						// this.mescroll.endSuccess();
						let orderlist = res.data.data;
						console.log(orderlist,"改变数据");
						uni.$emit("updateorderlist",{data:orderlist})
									
					}else if(res.data.code == 300){
						console.log(res.data.msg);
						uni.showToast({
							title:"暂无相关订单"
						})
						// this.mescroll.endSuccess();
					}else{
						console.log(res.data.msg)
					}
				})
			},
			getSelectedObj() {
				let obj = {}
				for (let i = 0; i < this.menuList.length; i++) {
					let item = this.menuList[i];
					if (!this.independence && item.defaultSelectedIndex != null && item.defaultSelectedIndex.toString().length > 0) { // 处理并列菜单默认值

						if (item.isMutiple) {
							obj[item.key] = [];
							item.detailList[0].isSelected = false;
							if (!Array.isArray(item.defaultSelectedIndex)) { // 如果默认值不是数组
								item.defaultSelectedIndex = [item.defaultSelectedIndex];
							}
							for (let j = 0; j < item.defaultSelectedIndex.length; j++) { // 将默认选中的值放入selectedObj
								item.detailList[item.defaultSelectedIndex[j]].isSelected = true;
								obj[item.key].push(item.detailList[item.defaultSelectedIndex[j]].value)
							}

						} else {
							obj[item.key] = item.detailList[item.defaultSelectedIndex].value;
							this.selectedTitleObj[item.key] = item.detailList[item.defaultSelectedIndex].title;
							this.defaultSelectedTitleObj[item.key] = item.detailList[item.defaultSelectedIndex].title;
							item.detailList[0].isSelected = false;
							item.detailList[item.defaultSelectedIndex].isSelected = true;
						}
					} else {
						if (item.isMutiple) {
							obj[item.key] = [];
						} else {
							obj[item.key] = '';
						}
					}
				}
				this.result = obj;
				return obj;
			},
			// 重置所有选项，包括默认选项，并更新result
			resetAllSelect(callback) {
				let titles = [];
				for (let i = 0; i < this.menuList.length; i++) {
					this.resetSelected(this.menuList[i].detailList,this.menuList[i].key);
					titles[this.menuList[i].key] = this.menuList[i].title;
				}
				let obj = {
					'result': this.result,
					'titles': titles,
					'isReset': true
				}
				this.$emit("confirm", obj);
				callback(this.result);
			},
			// 重置选项为设置的默认值，并更新result
			resetSelectToDefault(callback) {
				for (let i = 0; i < this.menuList.length; i++) {
					this.selectDetailList = this.menuList[i].detailList;

					if (this.menuList[i].defaultSelectedIndex) {
						if (Array.isArray(this.menuList[i].defaultSelectedIndex)) { // 把所有默认的为false的点为true
							for (let j = 0; j < this.menuList[i].defaultSelectedIndex.length; j++) {
								if (this.selectDetailList[this.menuList[i].defaultSelectedIndex[j]].isSelected == false) {
									this.itemTap(this.menuList[i].defaultSelectedIndex[j], this.selectDetailList, this.menuList[i].isMutiple, this
										.menuList[i].key)
								}
							}
						} else {
							this.itemTap(this.menuList[i].defaultSelectedIndex, this.selectDetailList, this.menuList[i].isMutiple, this.menuList[
								i].key)
						}

						// 获取非默认项的下标
						let unDefaultSelectedIndexArr = this.getUnDefaultSelectedIndex(this.menuList[i])
						// 把所有不是默认的为true的点为false
						for (let j = 0; j < unDefaultSelectedIndexArr.length; j++) {
							if (this.selectDetailList[unDefaultSelectedIndexArr[j]].isSelected == true) {
								this.itemTap(unDefaultSelectedIndexArr[j], this.selectDetailList, this.menuList[i].isMutiple, this
										.menuList[i].key)
							}
						}
					}


				}

				this.selectedObj = this.defaultSelectedObj;
				this.result = this.defaultSelectedObj;
				let obj = {
					'result': this.result,
					'titles': this.defaultSelectedTitleObj,
					'isReset': true
				}
				this.$emit("confirm", obj);
				callback(this.result)
			},
			getUnDefaultSelectedIndex(menuListItem) { // 获取非默认项
				let tempDefault = menuListItem.defaultSelectedIndex;
				if (!Array.isArray(tempDefault)) {
					tempDefault = [tempDefault];
				}
				// 获取所有项的下标 组成新的数组
				let all = [];
				for (let i = 0; i < menuListItem.detailList.length; i++) {
					all.push(i)
				}
				// 将默认选中的数组与所有项的数组的不同值合并为一个新数组
				var unDefaultSelectedIndex = tempDefault.filter(function(v) {
					return !(all.indexOf(v) > -1)
				}).concat(all.filter(function(v) {
					return !(tempDefault.indexOf(v) > -1)
				}));
				return unDefaultSelectedIndex;
			},
			resetMenuList(val) {
				// this.menuList = val;
				this.$emit('update:menuList', val)
			},
			menuTabClick(index) {
				this.menuIndex = index;
				this.selectDetailList = this.menuList[index].detailList;
				this.selectedKey = this.menuList[index].key;
				// 如果是独立菜单
				if (this.independence && !this.menuList[index].isSort) {
					if (JSON.stringify(this.independenceObj) == '{}') {
						this.initIndependenceObj(index);
					} else {
						for (let key in this.independenceObj) {
							if (key != this.selectedKey) {
								this.initIndependenceObj(index);
								this.resetSelected(this.menuList[index].detailList, this.selectedKey);
							}
						}
					}

				}
				if (this.independence && this.menuList[index].isSort) {

					this.independenceObj = {};


				}
				if (this.independence) {
					let idx = this.menuList[index].defaultSelectedIndex;
					if (idx != null && idx.toString().length > 0) { // 处理独立菜单默认值
						if (this.menuList[index].isMutiple) {
							for (let i = 0; i < idx.length; i++) {
								if (this.menuList[index].detailList[idx[i]].isSelected == false) {
									this.itemTap(idx[i], this.menuList[index].detailList, true, this.selectedKey);
								}

							}
						} else {
							if (this.menuList[index].detailList[idx].isSelected == false) {

								this.itemTap(idx, this.menuList[index].detailList, false, this.selectedKey);

							}
						}

					}
				}


				// #ifdef H5
				this.selectedObj = this.selectedObj;
				this.$forceUpdate();
				// #endif
			},
			initIndependenceObj(index) {
				this.independenceObj = {};
				if (this.menuList[index].isMutiple) {
					this.independenceObj[this.selectedKey] = [];
				} else {
					this.independenceObj[this.selectedKey] = '';
				}
			},
			itemTap(index, list, isMutiple, key) {
				this.idx = index;
				if (isMutiple == true) {
					list[index].isSelected = !list[index].isSelected;
					if (index == 0) {
						this.resetSelected(list, key)
						if (!this.independence) {
							this.selectedTitleObj[key] = list[index].title;
						}
					} else {
						list[0].isSelected = false
						if (list[index].isSelected) {
							if (this.independence) {
								this.independenceObj[this.selectedKey].push(list[index].value);
							} else {
								this.selectedObj[key].push(list[index].value);
							}
						} else {
							list[index].isSelected = false;
							if (this.independence) {
								var idx = this.independenceObj[this.selectedKey].indexOf(list[index].value);
								this.independenceObj[this.selectedKey].splice(idx, 1);
							} else {
								var idx = this.selectedObj[key].indexOf(list[index].value);
								this.selectedObj[key].splice(idx, 1);
							}

						}
						if (this.independence) {
							this.result = this.independenceObj;
						} else {
							this.result = this.selectedObj;
						}

					}
				} else {
					if (index == 0) {
						this.resetSelected(list, key)
						if (!this.independence) {
							this.selectedTitleObj[key] = list[index].title;
						}
					} else {
						list[0].isSelected = false
						if (this.independence) {
							this.independenceObj[this.selectedKey] = list[index].value;
							this.result = this.independenceObj;
						} else {
							this.selectedObj[key] = list[index].value;
							this.result = this.selectedObj;
							this.selectedTitleObj[key] = list[index].title;
						}

						for (let i = 0; i < list.length; i++) {
							if (index == i) {
								list[i].isSelected = true
							} else {
								list[i].isSelected = false
							}
						}
					}
				}
				// #ifdef H5
				this.$forceUpdate();
				// #endif
			},
			resetSelected(list, key) {
				if (typeof this.result[key] == 'object') {
					this.result[key] = [];
					this.selectedTitleObj[key] = list[0].title;
				} else {
					this.result[key] = '';
					this.selectedTitleObj[key] = list[0].title;
				}
				for (let i = 0; i < list.length; i++) {
					if (i == 0) {
						list[i].isSelected = true;
					} else {
						list[i].isSelected = false;
					}
				}
				// #ifdef H5
				this.$forceUpdate();
				// #endif
			},
			sortTap(index, list, key) {
				if (this.independence) {
					this.independenceObj[this.selectedKey] = list[index].value;
					this.result = this.independenceObj;
				} else {
					this.selectedObj[key] = list[index].value;
					this.result = this.selectedObj;
					this.selectedTitleObj[key] = list[index].title;
				}

				for (let i = 0; i < list.length; i++) {
					if (index == i) {
						list[i].isSelected = true;
					} else {
						list[i].isSelected = false;
					}
				}
				let obj = {
					'result': this.result,
					'titles': this.selectedTitleObj,
					'isReset': false
				}
				this.$emit("confirm", obj);
			},
			sureClick() {
				let obj = {
					'result': this.result,
					'titles': this.selectedTitleObj,
					'isReset': false
				}
				this.$emit("confirm", obj);
			},
			resetClick(list, key) {
				this.resetSelected(list, key)
			}
		}
	}
</script>

<style>
	.moonactive{
		color: #ffffff;
		background: #48C0FF !important;
	}
	.moon{
		display: flex;
		justify-content: space-between;
		margin-top: 30upx;
		margin-bottom: 30upx;
		margin-left: 30rpx;
		margin-right: 30rpx;
	}
	.moon .sw{
		width: 214upx;
		height: 80upx;
		text-align: center;
		line-height: 80upx;
		background: #d4d2d2;
		border-radius: 4upx;
	}
	.moon .xw{
		width: 300upx;
		height: 80upx;
		background: #666666;
		border-radius: 4upx;
		text-align: center;
		line-height: 80upx;
	}
	.filter-content {
		background-color: #F6F7F8;
	}

	.filter-content-title {
		border-bottom: #EEEEEE 1px solid;
		padding: 10px 15px;
		font-size: 13px;
		color: #999999;
	}

	.filter-content-detail {
		padding: 5px 15px;
	}

	.filter-content-detail-item-active {
		background-color: #D1372C;
		color: #FFFFFF;
		padding: 5px 15px;
		border-radius: 20px;
		margin-right: 10px;
		margin-top: 10px;
		display: inline-block;
		font-size: 14px;
	}

	.filter-content-detail-item-default {
		    background-color: #FFFFFF;
		    color: #666666;
		    /* padding: 5px 15px; */
		    /* -webkit-border-radius: 20px; */
		    /* border-radius: 4rpx; */
		    /* margin-right: 40rpx; */
		    /* margin-top: 10px; */
		    display: inline-block;
		    font-size: 14px;
		    /* width: 200rpx; */
		    /* height: 80rpx; */
		    line-height: 80rpx;
		    text-align: center;
		    background: #EEEEEE;
		    border-radius: 4rpx;
		    /* padding: 40rpx; */
		    padding-left: 40rpx;
		    padding-right: 40rpx;
		    margin-right: 40rpx;
			margin-top: 20rpx;
	}

	.filter-content-footer {
		    display: -webkit-box;
		    display: -webkit-flex;
		    display: flex;
		    -webkit-box-pack: justify;
		    -webkit-justify-content: space-between;
		    justify-content: space-between;
		    width: 100%;
		    height: 74px;
		    margin-top: 10px;
	}

	.filter-content-footer-item {
		    width: 100%;
		    height: 80rpx;
		    display: -webkit-box;
		    display: -webkit-flex;
		    display: flex;
		    -webkit-box-pack: center;
		    -webkit-justify-content: center;
		    justify-content: center;
		    -webkit-box-align: center;
		    -webkit-align-items: center;
		    align-items: center;
		    font-size: 16px;
		    margin: 30rpx;
			
			background: linear-gradient(132deg, #48C0FF 0%, #0F80FF 100%);
	}

	.filter-content-list {

		padding: 5px 15px;
	}

	.filter-content-list-item-default {
		color: #666666;
		width: 100%;
		padding: 10px 0px;
	}

	.filter-content-list-item-default text {
		width: 90%;
		font-size: 14px;
		display: inline-block;
	}

	.filter-content-list-item-active {
		color: #D1372C;
		width: 100%;
		padding: 10px 0px;
	}

	.filter-content-list-item-active text {
		font-size: 14px;
		width: 90%;
		display: inline-block;
	}

	.filter-content-list-item-active:after {
		content: '✓';
	}
</style>
