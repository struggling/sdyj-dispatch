<template>
<view class="kehu">
	<button open-type="contact" type="default" @contact = "contact" style="width: 100upx; height: 100upx;"></button>
</view>
</template>
<script>
	import Calendar from '../../components/mobile-calendar-simple/Calendar.vue'
	export default {
		data(){
			return {//日期均为yyyy-mm-dd或者yyyy/mm/dd格式
				startDate:'',
				endDate:'',
				betweenStart:'',
				betweenEnd:'',
			}
		},
		methods:{
			//获取回调的日期数据
			getDate(date){
				console.log(date)
			},
			contact(res){
				console.log(res)
			}
		},
		components:{
			Calendar
		}
	}
</script>
<style></style>