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
											const data = JSON.parse(res.data);
											console.log("请求类型");
											console.log(data);
											if(data.code ==200){
												let phone = data.data.phone;

												console.log("手机号码"+phone);
												uni.setStorageSync("phone",phone);	
											}else if(data.code ==300){
												uni.showModal({
												    title: '提示',
												    content: '未登录',
												    success: function (res) {
												        if (res.confirm) {
												            console.log('用户点击确定');
															uni.navigateTo({
																url: '../login/login',
																success: res => {},
																fail: () => {},
																complete: () => {}
															});
												        } else if (res.cancel) {
												            console.log('用户点击取消');
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
											},
											fail(res){
												console.log(res);
												uni.showToast({
													title: "无网络...",
												})
											}
										})
									}
								})
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
Vue.prototype.$apiUrl = 'https://applet.51tiaoyin.com/public/applet/'; 

Vue.use(uView);

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
