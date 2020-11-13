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
									console.log(res,"检查登陆1111111111111111111111111");
									let code = res.code;
									let token = md5("code="+code+"0a88a84a25948b4f37f622b3a3ff9fc0");
									myRequest({
										url:'index/index',
										data:{
											
											code:code,
										},
										methods:"GET"
									}).then(res=>{
										
										if(res.data.code == 200){
											console.log("获取登陆");
											let phone = res.data.data.phone;
											let type  =res.data.data.type;
											let uid  =res.data.data.uid;
											let name  =res.data.data.name;
											let number = res.data.data.number;
											let cookie = res.data.data.session_id;
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
											uni.setStorageSync('user_name',res.data.data.wechat_name);
											uni.setStorageSync('user_avatar',res.data.data.wechat_img);
											console.log("用户姓名"+res.data.data.wechat_name);
											console.log("用户头像"+res.data.data.wechat_img);
											uni.setStorageSync("cookie",cookie);
											console.log("cookie"+cookie);
										}else if(res.data.code == 300){
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
														// uni.navigateTo({
														// 	url: '../login/login',
														// });
											        }
											    }
											});
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
									uni.reLaunch({
										url: "../login/login"
									})
								}
								else if (res.cancel){
								    console.log('用户点击取消');
									// uni.navigateTo({
									// 	url: '../login/login',
									// });
								}
								
							}
						});
					},
				})
	};


	
//全局的分享内容

Vue.prototype.$overShare = 	{
	title: '方便快捷 精准接单',
	path: 'pages/index/index',
	desc:"便快捷、就近派单 结算迅速、完成到账 积分商城、好礼送不停 全职招募、稳定收入",
	imageUrl:"http://7n.51tiaoyin.com/%E8%83%8C%E6%99%AF%402x.png",
};
//用户昵称全局变量

//全局的apiurl
Vue.prototype.$apiUrl = 'https://sys.yigongdan.com/public/applet/'; 

//全局的图标提示数字
Vue.prototype.$badge = 0;

//全局的订阅消息通知
Vue.prototype.requestMsg =async function(){
	await this.$myRequest({
		url:'user/getTemplateid',
		data:{},
	}).then(res=>{
		console.log(res);
	// const data = JSON.parse(res.data);
		if(res.data.code == 200){
			console.log(res.data.msg);
			console.log(res.data.data);
			let template_id1 ='';
			let template_id2 ='';
			let template_id3 ='';
			template_id1 = res.data.data[0];
			template_id2 = res.data.data[1];
			template_id3 = res.data.data[2];
			wx.requestSubscribeMessage({
			  tmplIds: [template_id1,template_id2,template_id3],
			  success (res) {
				  console.log("模板");
				  console.log(res);
				   if (res[template_id1] === 'accept'&& res[template_id2] === 'accept'&& res[template_id3] === 'accept'){
				        console.log("订阅成功");
				}
			  }
			})
		}else if(res.data.code == 300){
			console.log(res.data.msg);
	
		}else{
			console.log(res.data.msg)
		}
	})
	// console.log(res.data);

}

//封装全局的网络请求

//取消全局日志打印
// if (uni.getSystemInfoSync().platform !== "devtoolss") {
// 	console.log = () => {}
// }
//全局的主题样式颜色
Vue.prototype.$background = {
	backgroundImage: "linear-gradient(90deg, #54C3F1, #eb1270)",
};
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
