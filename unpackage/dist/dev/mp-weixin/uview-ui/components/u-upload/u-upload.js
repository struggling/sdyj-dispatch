(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uview-ui/components/u-upload/u-upload"],{444:
/*!****************************************************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/uview-ui/components/u-upload/u-upload.vue ***!
  \****************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";n.r(t);var i=n(/*! ./u-upload.vue?vue&type=template&id=0d33af60&scoped=true& */445),r=n(/*! ./u-upload.vue?vue&type=script&lang=js& */447);for(var o in r)"default"!==o&&function(e){n.d(t,e,(function(){return r[e]}))}(o);n(/*! ./u-upload.vue?vue&type=style&index=0&id=0d33af60&lang=scss&scoped=true& */449);var s,u=n(/*! ../../../../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */13),a=Object(u["default"])(r["default"],i["render"],i["staticRenderFns"],!1,null,"0d33af60",null,!1,i["components"],s);a.options.__file="uview-ui/components/u-upload/u-upload.vue",t["default"]=a.exports},445:
/*!***********************************************************************************************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/uview-ui/components/u-upload/u-upload.vue?vue&type=template&id=0d33af60&scoped=true& ***!
  \***********************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(e,t,n){"use strict";n.r(t);var i=n(/*! -!../../../../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./u-upload.vue?vue&type=template&id=0d33af60&scoped=true& */446);n.d(t,"render",(function(){return i["render"]})),n.d(t,"staticRenderFns",(function(){return i["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return i["recyclableRender"]})),n.d(t,"components",(function(){return i["components"]}))},446:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/xiaoma/项目/sdyj-dispatch/uview-ui/components/u-upload/u-upload.vue?vue&type=template&id=0d33af60&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(e,t,n){"use strict";n.r(t),n.d(t,"render",(function(){return r})),n.d(t,"staticRenderFns",(function(){return s})),n.d(t,"recyclableRender",(function(){return o})),n.d(t,"components",(function(){return i}));var i={uIcon:function(){return n.e(/*! import() | uview-ui/components/u-icon/u-icon */"uview-ui/components/u-icon/u-icon").then(n.bind(null,/*! @/uview-ui/components/u-icon/u-icon.vue */409))},uLineProgress:function(){return n.e(/*! import() | uview-ui/components/u-line-progress/u-line-progress */"uview-ui/components/u-line-progress/u-line-progress").then(n.bind(null,/*! @/uview-ui/components/u-line-progress/u-line-progress.vue */528))}},r=function(){var e=this,t=e.$createElement,n=(e._self._c,e.showUploadList?e.$u.addUnit(e.width):null),i=e.showUploadList?e.$u.addUnit(e.height):null,r=!e.disabled&&e.maxCount>e.lists.length&&!e.customBtn?e.$u.addUnit(e.width):null,o=!e.disabled&&e.maxCount>e.lists.length&&!e.customBtn?e.$u.addUnit(e.height):null;e.$mp.data=Object.assign({},{$root:{g0:n,g1:i,g2:r,g3:o}})},o=!1,s=[];r._withStripped=!0},447:
/*!*****************************************************************************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/uview-ui/components/u-upload/u-upload.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";n.r(t);var i=n(/*! -!../../../../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./u-upload.vue?vue&type=script&lang=js& */448),r=n.n(i);for(var o in i)"default"!==o&&function(e){n.d(t,e,(function(){return i[e]}))}(o);t["default"]=r.a},448:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/xiaoma/项目/sdyj-dispatch/uview-ui/components/u-upload/u-upload.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=r(n(/*! ./node_modules/@babel/runtime/regenerator */4));function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t,n,i,r,o,s){try{var u=e[o](s),a=u.value}catch(l){return void n(l)}u.done?t(a):Promise.resolve(a).then(i,r)}function s(e){return function(){var t=this,n=arguments;return new Promise((function(i,r){var s=e.apply(t,n);function u(e){o(s,i,r,u,a,"next",e)}function a(e){o(s,i,r,u,a,"throw",e)}u(void 0)}))}}var u={name:"u-upload",props:{showUploadList:{type:Boolean,default:!0},action:{type:String,default:""},maxCount:{type:[String,Number],default:52},showProgress:{type:Boolean,default:!0},disabled:{type:Boolean,default:!1},imageMode:{type:String,default:"aspectFill"},header:{type:Object,default:function(){return{}}},formData:{type:Object,default:function(){return{}}},name:{type:String,default:"file"},sizeType:{type:Array,default:function(){return["original","compressed"]}},sourceType:{type:Array,default:function(){return["album","camera"]}},previewFullImage:{type:Boolean,default:!0},multiple:{type:Boolean,default:!0},deletable:{type:Boolean,default:!0},maxSize:{type:[String,Number],default:Number.MAX_VALUE},fileList:{type:Array,default:function(){return[]}},uploadText:{type:String,default:"选择图片"},autoUpload:{type:Boolean,default:!0},showTips:{type:Boolean,default:!0},customBtn:{type:Boolean,default:!1},width:{type:[String,Number],default:200},height:{type:[String,Number],default:200},delBgColor:{type:String,default:"#fa3534"},delColor:{type:String,default:"#ffffff"},delIcon:{type:String,default:"close"},toJson:{type:Boolean,default:!0},beforeUpload:{type:Function,default:null},limitType:{type:Array,default:function(){return["png","jpg","jpeg","webp","gif"]}},index:{type:[Number,String],default:""}},mounted:function(){},data:function(){return{lists:[],isInCount:!0,uploading:!1}},watch:{fileList:{immediate:!0,handler:function(e){var t=this;e.map((function(e){var n=t.lists.some((function(t){return t.url==e.url}));!n&&t.lists.push({url:e.url,error:!1,progress:100})}))}},lists:function(e){this.$emit("on-list-change",e,this.index)}},methods:{clear:function(){this.lists=[]},reUpload:function(){this.uploadFile()},selectFile:function(){var t=this;if(!this.disabled){this.name;var n=this.maxCount,i=this.multiple,r=this.maxSize,o=this.sizeType,s=this.lists,u=(this.camera,this.compressed,this.maxDuration,this.sourceType),a=null,l=n-s.length;a=new Promise((function(t,n){e.chooseImage({count:i?l>9?9:l:1,sourceType:u,sizeType:o,success:t,fail:n})})),a.then((function(e){var o=t.lists.length;e.tempFiles.map((function(e,o){if(t.checkFileExt(e)&&(i||!(o>=1)))if(e.size>r)t.$emit("on-oversize",e,t.lists,t.index),t.showToast("超出允许的文件大小");else{if(n<=s.length)return t.$emit("on-exceed",e,t.lists,t.index),void t.showToast("超出最大允许的文件个数");s.push({url:e.path,progress:0,error:!1,file:e})}})),t.$emit("on-choose-complete",t.lists,t.index),t.autoUpload&&t.uploadFile(o)})).catch((function(e){}))}},showToast:function(t){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];(this.showTips||n)&&e.showToast({title:t,icon:"none"})},upload:function(){this.uploadFile()},retry:function(t){this.lists[t].progress=0,this.lists[t].error=!1,this.lists[t].response=null,e.showLoading({title:"重新上传"}),this.uploadFile(t)},uploadFile:function(){var t=arguments,n=this;return s(i.default.mark((function r(){var o,s,u;return i.default.wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(o=t.length>0&&void 0!==t[0]?t[0]:0,!n.disabled){i.next=3;break}return i.abrupt("return");case 3:if(!n.uploading){i.next=5;break}return i.abrupt("return");case 5:if(!(o>=n.lists.length)){i.next=8;break}return n.$emit("on-uploaded",n.lists,n.index),i.abrupt("return");case 8:if(100!=n.lists[o].progress){i.next=11;break}return 0==n.autoUpload&&n.uploadFile(o+1),i.abrupt("return");case 11:if(!n.beforeUpload||"function"!==typeof n.beforeUpload){i.next=20;break}if(s=n.beforeUpload.bind(n.$u.$parent.call(n))(o,n.lists),!s||"function"!==typeof s.then){i.next=18;break}return i.next=16,s.then((function(e){})).catch((function(e){return n.uploadFile(o+1)}));case 16:i.next=20;break;case 18:if(!1!==s){i.next=20;break}return i.abrupt("return",n.uploadFile(o+1));case 20:if(n.action){i.next=23;break}return n.showToast("请配置上传地址",!0),i.abrupt("return");case 23:n.lists[o].error=!1,n.uploading=!0,u=e.uploadFile({url:n.action,filePath:n.lists[o].url,name:n.name,formData:n.formData,header:n.header,success:function(e){var t=n.toJson&&n.$u.test.jsonString(e.data)?JSON.parse(e.data):e.data;[200,201,204].includes(e.statusCode)?(n.lists[o].response=t,n.lists[o].progress=100,n.lists[o].error=!1,n.$emit("on-success",t,o,n.lists,n.index)):n.uploadError(o,t)},fail:function(e){n.uploadError(o,e)},complete:function(t){e.hideLoading(),n.uploading=!1,n.uploadFile(o+1),n.$emit("on-change",t,o,n.lists,n.index)}}),u.onProgressUpdate((function(e){e.progress>0&&(n.lists[o].progress=e.progress,n.$emit("on-progress",e,o,n.lists,n.index))}));case 27:case"end":return i.stop()}}),r)})))()},uploadError:function(e,t){this.lists[e].progress=0,this.lists[e].error=!0,this.lists[e].response=null,this.$emit("on-error",t,e,this.lists,this.index),this.showToast("上传失败，请重试")},deleteItem:function(t){var n=this;e.showModal({title:"提示",content:"您确定要删除此项吗？",success:function(e){e.confirm&&(n.lists[t].process<100&&n.lists[t].process>0&&"undefined"!=typeof n.lists[t].uploadTask&&n.lists[t].uploadTask.abort(),n.lists.splice(t,1),n.$forceUpdate(),n.$emit("on-remove",t,n.lists,n.index),n.showToast("移除成功"))}})},remove:function(e){e>=0&&e<this.lists.length&&(this.lists.splice(e,1),this.$emit("on-list-change",this.lists,this.index))},doPreviewImage:function(t,n){var i=this;if(this.previewFullImage){var r=this.lists.map((function(e){return e.url||e.path}));e.previewImage({urls:r,current:t,success:function(){i.$emit("on-preview",t,i.lists,i.index)},fail:function(){e.showToast({title:"预览图片失败",icon:"none"})}})}},checkFileExt:function(e){var t=!1,n="",i=/.+\./;return n=e.path.replace(i,"").toLowerCase(),t=this.limitType.some((function(e){return e.toLowerCase()===n})),t||this.showToast("不允许选择".concat(n,"格式的文件")),t}}};t.default=u}).call(this,n(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1)["default"])},449:
/*!**************************************************************************************************************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/uview-ui/components/u-upload/u-upload.vue?vue&type=style&index=0&id=0d33af60&lang=scss&scoped=true& ***!
  \**************************************************************************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";n.r(t);var i=n(/*! -!../../../../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./u-upload.vue?vue&type=style&index=0&id=0d33af60&lang=scss&scoped=true& */450),r=n.n(i);for(var o in i)"default"!==o&&function(e){n.d(t,e,(function(){return i[e]}))}(o);t["default"]=r.a},450:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/xiaoma/项目/sdyj-dispatch/uview-ui/components/u-upload/u-upload.vue?vue&type=style&index=0&id=0d33af60&lang=scss&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(e,t,n){}}]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/uview-ui/components/u-upload/u-upload.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uview-ui/components/u-upload/u-upload-create-component',
    {
        'uview-ui/components/u-upload/u-upload-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(444))
        })
    },
    [['uview-ui/components/u-upload/u-upload-create-component']]
]);
