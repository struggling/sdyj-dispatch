(global.webpackJsonp=global.webpackJsonp||[]).push([["common/main"],[
/*!******************************!*\
  !*** E:/项目/速达易家派单系统/main.js ***!
  \******************************/
/*! no static exports found */function(e,o,n){"use strict";(function(e,o){n(/*! uni-pages */4);var t=u(n(/*! vue */2)),c=u(n(/*! ./App */5)),l=n(/*! ./util/api.js */503),a=u(n(/*! uview-ui */11));function u(e){return e&&e.__esModule?e:{default:e}}function r(e,o,n){return o in e?Object.defineProperty(e,o,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[o]=n,e}t.default.prototype.$myRequest=l.myRequest,t.default.prototype.checklogin=function(){e.checkSession({success:function(o){if("checkSession:ok"==o.errMsg){console.log(o),console.log("登录暂未过期");var n=e.getStorageSync("user_uid");console.log("uid的值:"+n),e.login({success:function(o){var n=o.code;e.request({url:"https://yigongdan.com/public/applet/index",dataType:JSON,method:"GET",header:"application/x-www-form-urlencoded",data:{code:n},success:function(o){var n=JSON.parse(o.data);if(console.log("请求类型"),console.log(n),200==n.code){var t=n.data.phone,c=n.data.type,l=n.data.uid,a=n.data.name,u=n.data.number;e.setStorageSync("phone",t),console.log("手机号码"+t),e.setStorageSync("type",c),console.log("服务类型"+c),e.setStorageSync("uid",l),console.log("uid标识"+l),e.setStorageSync("name",a),console.log("用户姓名"+a),e.setStorageSync("number",u),console.log("用户编号"+u),e.setStorageSync("user_name",n.data.wechat_name),e.setStorageSync("user_avatar",n.data.wechat_img),console.log("用户姓名"+n.data.wechat_name),console.log("用户头像"+n.data.wechat_img)}else 300==n.code&&e.showModal({title:"提示",content:"未登录",confirmText:"去登录",success:function(o){o.confirm?(console.log("用户点击确定"),e.navigateTo({url:"../login/login"})):o.cancel&&(console.log("用户点击取消"),e.navigateTo({url:"../login/login"}))}})}})},fail:function(e){console.log(e)}})}},fail:function(o){e.showModal({cancelText:"取消",confirmText:"确定",title:"登录已过期,请重新登录",success:function(o){o.confirm&&e.showLoading({mask:!0,title:"登录中..."}),e.reLaunch({url:"../login/login"})}})}})},t.default.prototype.$overShare={title:"易工单",path:"pages/index/index",desc:"接单利器就用易工单",imageUrl:""},t.default.prototype.$apiUrl="https://yigongdan.com/public/applet/",t.default.prototype.$badge=0;t.default.component("mescroll-body",function(){return Promise.all(/*! import() | components/mescroll-uni/mescroll-body */[n.e("common/vendor"),n.e("components/mescroll-uni/mescroll-body")]).then(n.bind(null,/*! @/components/mescroll-uni/mescroll-body.vue */164))}),t.default.component("mescroll-uni",function(){return Promise.all(/*! import() | components/mescroll-uni/mescroll-uni */[n.e("common/vendor"),n.e("components/mescroll-uni/mescroll-uni")]).then(n.bind(null,/*! @/components/mescroll-uni/mescroll-uni.vue */176))}),t.default.use(a.default),t.default.config.productionTip=!1,c.default.mpType="app",o(new t.default(function(e){for(var o=1;o<arguments.length;o++){var n=null!=arguments[o]?arguments[o]:{},t=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.forEach(function(o){r(e,o,n[o])})}return e}({},c.default))).$mount()}).call(this,n(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1).default,n(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1).createApp)},,,,
/*!******************************!*\
  !*** E:/项目/速达易家派单系统/App.vue ***!
  \******************************/
/*! no static exports found */,
/*!******************************!*\
  !*** E:/项目/速达易家派单系统/App.vue ***!
  \******************************/
/*! no static exports found */function(e,o,n){"use strict";n.r(o);var t=n(/*! ./App.vue?vue&type=script&lang=js& */6);for(var c in t)"default"!==c&&function(e){n.d(o,e,function(){return t[e]})}(c);n(/*! ./App.vue?vue&type=style&index=0&lang=scss& */8);var l=n(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */10),a=Object(l.default)(t.default,void 0,void 0,!1,null,null,null,!1,void 0,void 0);a.options.__file="E:/项目/速达易家派单系统/App.vue",o.default=a.exports},
/*!*******************************************************!*\
  !*** E:/项目/速达易家派单系统/App.vue?vue&type=script&lang=js& ***!
  \*******************************************************/
/*! no static exports found */function(e,o,n){"use strict";n.r(o);var t=n(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=script&lang=js& */7),c=n.n(t);for(var l in t)"default"!==l&&function(e){n.d(o,e,function(){return t[e]})}(l);o.default=c.a},
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/项目/速达易家派单系统/App.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(e,o,n){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var t={onLaunch:function(){console.log("App Launch")},onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide")}};o.default=t},
/*!****************************************************************!*\
  !*** E:/项目/速达易家派单系统/App.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************/
/*! no static exports found */function(e,o,n){"use strict";n.r(o);var t=n(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!./node_modules/css-loader??ref--8-oneOf-1-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=style&index=0&lang=scss& */9),c=n.n(t);for(var l in t)"default"!==l&&function(e){n.d(o,e,function(){return t[e]})}(l);o.default=c.a},
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!./node_modules/css-loader??ref--8-oneOf-1-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/项目/速达易家派单系统/App.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(e,o,n){}],[[0,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/main.js.map