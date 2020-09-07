import Vue from 'vue'
import App from './App'

// 引入uivew-ui
import uView from "uview-ui";

// 定义一个全局的请求地址
// Vue.prototype.apiServer = 'http://0608.cc/'
//定义全局的检查函数
	Vue.prototype.checklogin= function(){
			uni.checkSession({
					success: (res) => {
						if (res.errMsg == 'checkSession:ok') {
							console.log(res);
							console.log('登录暂未过期');
							this.user_uid = uni.getStorageSync('user_uid');//uid写在检查函数里面，
							console.log("uid的值:"+this.user_uid);
							uni.login({
								success(res) {
									let code = res.code;
									uni.request({
										url:"https://applet.51tiaoyin.com/public/applet/index",
										dataType:JSON,
										method:"GET",
										header:"application/x-www-form-urlencoded",
										data:{
											code:code
										},
										success(res) {
											// console.log(res);
											const data = JSON.parse(res.data);
											// console.log(data);
											let phone = data.data.phone;
											console.log(phone);
											uni.setStorageSync("phone",phone);	
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
								uni.login({
									provider: 'weixin',
									success: (res) => {
										console.log(res);
										uni.request({
											url: "https://applet.51tiaoyin.com/public/applet/",
											method: "GET",
											data: {
												"code": res.code
											},
											success(res) {
												console.log(res);
												if (res.code = 300) {
													uni.showToast({
														title: "未登录",
													})
													uni.reLaunch({
														url: "../login/login"
													})
												}
												//用户已登录
												if (res.code = 200) {
													uni.showToast({
														title: "请授权登录",
													})
													uni.reLaunch({
														url: "../login/login"
													})
												}
											}
										})
									}
								})
							}
						});
					},
				})
	}
Vue.use(uView);

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
