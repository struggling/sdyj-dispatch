(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],[
/*!******************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/main.js ***!
  \******************************************/
/*! no static exports found */function(e,o,n){"use strict";(function(e,o){n(/*! uni-pages */4);var t=l(n(/*! vue */2)),c=l(n(/*! ./App */5)),r=l(n(/*! uview-ui */11));function l(e){return e&&e.__esModule?e:{default:e}}function a(e,o){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);o&&(t=t.filter((function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable}))),n.push.apply(n,t)}return n}function u(e){for(var o=1;o<arguments.length;o++){var n=null!=arguments[o]?arguments[o]:{};o%2?a(Object(n),!0).forEach((function(o){i(e,o,n[o])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(n,o))}))}return e}function i(e,o,n){return o in e?Object.defineProperty(e,o,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[o]=n,e}t.default.prototype.checklogin=function(){e.checkSession({success:function(o){if("checkSession:ok"==o.errMsg){console.log(o),console.log("登录暂未过期");var n=e.getStorageSync("user_uid");console.log("uid的值:"+n),e.login({success:function(o){var n=o.code;e.request({url:"https://yigongdan.com/public/applet/index",dataType:JSON,method:"GET",header:"application/x-www-form-urlencoded",data:{code:n},success:function(o){var n=JSON.parse(o.data);if(console.log("请求类型"),console.log(n),200==n.code){var t=n.data.phone,c=n.data.type,r=n.data.uid,l=n.data.name,a=n.data.number;e.setStorageSync("phone",t),console.log("手机号码"+t),e.setStorageSync("type",c),console.log("服务类型"+c),e.setStorageSync("uid",r),console.log("uid标识"+r),e.setStorageSync("name",l),console.log("用户姓名"+l),e.setStorageSync("number",a),console.log("用户编号"+a)}else 300==n.code&&e.showModal({title:"提示",content:"未登录",confirmText:"去登录",success:function(o){o.confirm?(console.log("用户点击确定"),e.navigateTo({url:"../login/login"})):o.cancel&&(console.log("用户点击取消"),e.navigateTo({url:"../login/login"}))}})}})},fail:function(e){console.log(e)}})}},fail:function(o){e.showModal({cancelText:"取消",confirmText:"确定",title:"登录已过期,请重新登录",success:function(o){o.confirm&&e.showLoading({mask:!0,title:"登录中..."}),e.reLaunch({url:"../login/login"})}})}})},t.default.prototype.$overShare={title:"易工单",path:"pages/index/index",desc:"接单利器就用易工单",imageUrl:""},t.default.prototype.$apiUrl="https://yigongdan.com/public/applet/",t.default.prototype.$badge=0,t.default.use(r.default),t.default.config.productionTip=!1,c.default.mpType="app";var s=new t.default(u({},c.default));o(s).$mount()}).call(this,n(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1)["default"],n(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1)["createApp"])},,,,
/*!******************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/App.vue ***!
  \******************************************/
/*! no static exports found */,function(e,o,n){"use strict";n.r(o);var t=n(/*! ./App.vue?vue&type=script&lang=js& */6);for(var c in t)"default"!==c&&function(e){n.d(o,e,(function(){return t[e]}))}(c);n(/*! ./App.vue?vue&type=style&index=0&lang=scss& */8);var r,l,a,u,i=n(/*! ../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */10),s=Object(i["default"])(t["default"],r,l,!1,null,null,null,!1,a,u);s.options.__file="App.vue",o["default"]=s.exports},
/*!*******************************************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/App.vue?vue&type=script&lang=js& ***!
  \*******************************************************************/
/*! no static exports found */function(e,o,n){"use strict";n.r(o);var t=n(/*! -!../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=script&lang=js& */7),c=n.n(t);for(var r in t)"default"!==r&&function(e){n.d(o,e,(function(){return t[e]}))}(r);o["default"]=c.a},
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/xiaoma/项目/sdyj-dispatch/App.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(e,o,n){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var t={onLaunch:function(){console.log("App Launch")},onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide")}};o.default=t},
/*!****************************************************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/App.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************************/
/*! no static exports found */function(e,o,n){"use strict";n.r(o);var t=n(/*! -!../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=style&index=0&lang=scss& */9),c=n.n(t);for(var r in t)"default"!==r&&function(e){n.d(o,e,(function(){return t[e]}))}(r);o["default"]=c.a},
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/xiaoma/项目/sdyj-dispatch/App.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(e,o,n){}],[[0,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/main.js.map