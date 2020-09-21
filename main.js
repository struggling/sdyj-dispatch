import Vue from 'vue'
import App from './App'

import { myRequest } from './util/api.js'
Vue.prototype.$myRequest = myRequest
// 引入uivew-ui
import uView from "uview-ui";
import md5 from "./common/md5.min.js";
// 定义一个全局的请求地址
// Vue.prototype.apiServer = 'http://0608.cc/'
//定义全局的检查登录函数
	Vue.prototype.checklogin= function(){
		let that = this;
			uni.checkSession({
					success: (res) => {
						if (res.errMsg == 'checkSession:ok') {
							console.log(res);
							console.log('登录暂未过期');
							let user_uid = uni.getStorageSync('user_uid');//uid写在检查函数里面，
							// console.log("uid的值:"+user_uid);
							uni.login({
								success(res) {
									let code = res.code;
									let token = md5("code="+code+"0a88a84a25948b4f37f622b3a3ff9fc0");
									
									uni.request({
										url:"https://yigongdan.com/public/applet/index",
										dataType:JSON,
										method:"GET",
										header:"application/x-www-form-urlencoded",
										data:{
											code:code,
											token:token
										},
										success(res) {
											const data = JSON.parse(res.data);
											console.log("请求类型");
											console.log(data);
											if(data.code ==200){
												let phone = data.data.phone;
												let type  =data.data.type;
												let uid  =data.data.uid;
												let name  =data.data.name;
												let number = data.data.number;
												let cookie = data.data.session_id;
												uni.setStorageSync("phone",phone);	
												console.log("手机号码"+phone);
												uni.setStorageSync("type",type);
												console.log("服务类型"+type);
												uni.setStorageSync("uid",uid);
												console.log("uid标识"+uid);
												uni.setStorageSync("name",name);
												console.log("用户姓名"+name);
												uni.setStorageSync("number",number);
												console.log("用户编号"+number);
												uni.setStorageSync('user_name', data.data.wechat_name);
												uni.setStorageSync('user_avatar', data.data.wechat_img);
												console.log("用户姓名"+data.data.wechat_name);
												console.log("用户头像"+data.data.wechat_img);
												uni.setStorageSync("cookie",cookie);
												console.log("cookie"+cookie);
											}else if(data.code ==300){
												uni.showModal({
												    title: '提示',
												    content: '未登录',
													confirmText:"去登录",
												    success: function (res) {
												        if (res.confirm) {
												            console.log('用户点击确定');
															uni.navigateTo({
																url: '../login/login',
															});
												        } else if (res.cancel){
												            console.log('用户点击取消');
															uni.navigateTo({
																url: '../login/login',
															});
												        }
												    }
												});
											}
										}
									})
								},
								fail(res) {
									console.log(res);
								}
							})
							
						}
					},
					fail: (err) => {
						//过期的话调用接口
						uni.showModal({
							cancelText: '取消',
							confirmText: '确定',
							title: '登录已过期,请重新登录',
							success: (res) => {
								if (res.confirm) {
									uni.showLoading({
										mask: true,
										title: '登录中...'
									})
								}
								uni.reLaunch({
									url: "../login/login"
								})
								// uni.login({
								// 	provider: 'weixin',
								// 	success: (res) => {
								// 		console.log(res);
								// 		uni.request({
								// 			url: "https://applet.51tiaoyin.com/public/applet/",
								// 			method: "GET",
								// 			data: {
								// 				"code": res.code
								// 			},
								// 			success(res) {
								// 				console.log(res);
								// 				if (res.code = 300) {
								// 					uni.showToast({
								// 						title: "未登录",
								// 					})
								// 					uni.reLaunch({
								// 						url: "../login/login"
								// 					})
								// 				}
								// 				//用户已登录
								// 				if (res.code = 200) {
								// 					uni.showToast({
								// 						title: "请授权登录",
								// 					})
								// 					uni.reLaunch({
								// 						url: "../login/login"
								// 					})
								// 				}else{
								// 					uni.showToast({
								// 						title:"获取信息失败，请检查网络"
								// 					})
								// 				}
								// 			}
								// 		})
								// 	}
								// })
							}
						});
					},
				})
	};


	
//全局的分享内容
Vue.prototype.$overShare = 	{
	title: '易工单',
	path: 'pages/index/index',
	desc:"接单利器就用易工单",
	imageUrl:"",
};


//全局的apiurl
Vue.prototype.$apiUrl = 'https://yigongdan.com/public/applet/'; 

//全局的图标提示数字
Vue.prototype.$badge = 0;


//封装全局的网络请求

// import md5 from "./common/md5.min.js";

// function md5data(data){
//   for(k in data)  for(k in data)
// 	{
// 	   let token = token+md5(k+data[k]+"0a88a84a25948b4f37f622b3a3ff9fc0");
// 	}
// 	data.token = token;
// 	console.log(data);
//    return data;
// }



// Vue.prototype.$https = (url,method,data)=>{
// 	// for(k in data) 
// 	// 	{
// 	// 	   let token = token+md5(k+data[k]+"0a88a84a25948b4f37f622b3a3ff9fc0");
// 	// 	}
		
// 		Object.keys(data).forEach(function(key){
// 			console.log("参数");
// 		     console.log(key,data[key]);
// 			 let token = token+md5(key+data[key]+"0a88a84a25948b4f37f622b3a3ff9fc0");
// 			data.token = token;
		
// 		});
		
// 		console.log(data);
// 	let cookie = uni.getStorageSync("cookie")
// 	let promise = new Promise( function(resolve,reject){
// 		uni.request({
// 			url:apihost+url,
// 			header:{
// 				'content-type': 'application/x-www-form-urlencoded',
// 				'cookie':cookie//读取cookie
// 			},
// 			dataType:JSON,
// 			data:data,
// 			success(res) {
// 				console.log(res);
// 				resolve(res);
// 			},
// 			fail(res) {
// 				uni.hideLoading();
// 				reject("网络错误，请重试")
// 			}
// 		})
// 	})
// }

// 在main.js注册全局组件
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)	


Vue.use(uView);

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
