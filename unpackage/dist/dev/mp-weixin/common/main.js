(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],[
/*!******************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/main.js ***!
  \******************************************/
/*! no static exports found */function(e,o,t){"use strict";(function(e,o){t(/*! uni-pages */4);var n=u(t(/*! vue */2)),c=u(t(/*! ./App */5)),r=u(t(/*! uview-ui */11));function u(e){return e&&e.__esModule?e:{default:e}}function i(e,o){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);o&&(n=n.filter((function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable}))),t.push.apply(t,n)}return t}function l(e){for(var o=1;o<arguments.length;o++){var t=null!=arguments[o]?arguments[o]:{};o%2?i(Object(t),!0).forEach((function(o){a(e,o,t[o])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(t,o))}))}return e}function a(e,o,t){return o in e?Object.defineProperty(e,o,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[o]=t,e}n.default.prototype.checklogin=function(){var o=this;e.checkSession({success:function(t){"checkSession:ok"==t.errMsg&&(console.log(t),console.log("登录暂未过期"),o.user_uid=e.getStorageSync("user_uid"),console.log("uid的值:"+o.user_uid),e.login({success:function(o){var t=o.code;e.request({url:"https://applet.51tiaoyin.com/public/applet/index",dataType:JSON,method:"GET",header:"application/x-www-form-urlencoded",data:{code:t},success:function(o){var t=JSON.parse(o.data),n=t.data.phone;console.log("手机号码"+n),e.setStorageSync("phone",n)}})},fail:function(e){console.log(e)}}))},fail:function(o){e.showModal({cancelText:"取消",confirmText:"确定",title:"登录已过期,请重新登录",success:function(o){o.confirm&&e.showLoading({mask:!0,title:"登录中..."}),e.login({provider:"weixin",success:function(o){console.log(o),e.request({url:"https://applet.51tiaoyin.com/public/applet/",method:"GET",data:{code:o.code},success:function(o){console.log(o),(o.code=300)&&(e.showToast({title:"未登录"}),e.reLaunch({url:"../login/login"})),(o.code=200)&&(e.showToast({title:"请授权登录"}),e.reLaunch({url:"../login/login"}))}})}})}})}})},n.default.use(r.default),n.default.config.productionTip=!1,c.default.mpType="app";var s=new n.default(l({},c.default));o(s).$mount()}).call(this,t(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1)["default"],t(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1)["createApp"])},,,,
/*!******************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/App.vue ***!
  \******************************************/
/*! no static exports found */,function(e,o,t){"use strict";t.r(o);var n=t(/*! ./App.vue?vue&type=script&lang=js& */6);for(var c in n)"default"!==c&&function(e){t.d(o,e,(function(){return n[e]}))}(c);t(/*! ./App.vue?vue&type=style&index=0&lang=scss& */8);var r,u,i,l,a=t(/*! ../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */10),s=Object(a["default"])(n["default"],r,u,!1,null,null,null,!1,i,l);s.options.__file="App.vue",o["default"]=s.exports},
/*!*******************************************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/App.vue?vue&type=script&lang=js& ***!
  \*******************************************************************/
/*! no static exports found */function(e,o,t){"use strict";t.r(o);var n=t(/*! -!../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=script&lang=js& */7),c=t.n(n);for(var r in n)"default"!==r&&function(e){t.d(o,e,(function(){return n[e]}))}(r);o["default"]=c.a},
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/xiaoma/项目/sdyj-dispatch/App.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(e,o,t){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var n={onLaunch:function(){console.log("App Launch")},onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide")}};o.default=n},
/*!****************************************************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/App.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************************/
/*! no static exports found */function(e,o,t){"use strict";t.r(o);var n=t(/*! -!../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=style&index=0&lang=scss& */9),c=t.n(n);for(var r in n)"default"!==r&&function(e){t.d(o,e,(function(){return n[e]}))}(r);o["default"]=c.a},
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/xiaoma/项目/sdyj-dispatch/App.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(e,o,t){}],[[0,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/main.js.map