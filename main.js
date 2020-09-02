import Vue from 'vue'
import App from './App'

// 引入uivew-ui
import uView from "uview-ui";

//小程序登录授权全局函数
// 封装全局登录函数
// backpage, backtype 2个参数分别代表：
// backpage : 登录后返回的页面
// backtype : 打开页面的类型[1 : redirectTo 2 : switchTab]
// Vue.prototype.checkLogin = function( backpage, backtype ){
// 	// 同步获取本地数据（uid、随机码、用户名、头像）
// 	var user_id = uni.getStorageSync('user_id');
// 	var user_nu = uni.getStorageSync('user_nu');
// 	var user_nm = uni.getStorageSync('user_nm');
// 	var user_fa = uni.getStorageSync('user_fa');
// 	if( user_id == '' || user_nu == '' || user_fa == ''){
// 		// 使用重定向的方式跳转至登录页面
// 		uni.redirectTo({url:'../login/login?backpage='+backpage+'&backtype='+backtype});
// 		return false;
// 	}
// 	// 登录成功、已经登录返回数组 [用户 id, 用户随机码, 用户昵称, 用户表情]
// 	return [user_id, user_nu, user_nm, user_fa];
// }

Vue.use(uView);

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
