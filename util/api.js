const BASE_URL="https://sys.yigongdan.com/public/applet/"; //开发时使用本地接口，在上线时只需要修改此处接口为线上地址即可https://sys.yigongdan.com/ 
//生产环境：https://yigongdan.com/public/applet/
import md5 from "../common/md5.min.js"
export const myRequest=(options)=>{ //传入的options是一个json对象
	
	return new Promise((resolve,reject)=>{
		var str='';
		let uid = uni.getStorageSync(("uid"));
		options.data.uid = uid;
		Object.keys(options.data).forEach(function(key){				
			str +=(key+"="+options.data[key]+"&");
					'abcde'.split('').join('-')
		});
		
		str = str.substr(0,str.length-1);
		console.log("加密参数");
		console.log(str+"0a88a84a25948b4f37f622b3a3ff9fc0");
		let token = md5(str+"0a88a84a25948b4f37f622b3a3ff9fc0");
		options.data.token = token;
		console.log("参数");
		 console.log(options.data);
		let cookie = uni.getStorageSync("cookie");
		uni.showLoading({
			title:"加载中..."
		})
		
		
		uni.request({
			url:BASE_URL+options.url,
			method:options.methods||"GET",
			data:options.data || {},
			dataType:options.dataType || "json",
			header:{
				'content-type': 'application/x-www-form-urlencoded',
				'cookie':cookie//读取cookie
			},
			success: (res) => {
				console.log(res);
				uni.hideLoading();
				// const data = JSON.parse(res.data);
				// 		console.log(data.data);
				// if(res.data.status !== 0){
				// 	return uni.showToast({
				// 		title:"获取数据失败"
				// 	})
				// }
				resolve(res)
			},
			fail: (err) => {
				uni.showToast({
					icon:"none",
					title:"网络错误,请重试！",
					duration:2000
				})
				reject(err)
			}
		})
	})
}