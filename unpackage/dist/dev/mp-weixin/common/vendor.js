(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          // eslint-disable-next-line no-sparse-arrays
          ret.push(handler.apply(handlerCtx, (Array.isArray(params) ? params : []).concat([,,,,,,,,,, event])));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 11:
/*!****************************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/uview-ui/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _mixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mixin.js */ 12));



var _request = _interopRequireDefault(__webpack_require__(/*! ./libs/request */ 13));




















var _queryParams = _interopRequireDefault(__webpack_require__(/*! ./libs/function/queryParams.js */ 17));

var _route = _interopRequireDefault(__webpack_require__(/*! ./libs/function/route.js */ 18));

var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFormat.js */ 19));

var _timeFrom = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFrom.js */ 20));

var _colorGradient = _interopRequireDefault(__webpack_require__(/*! ./libs/function/colorGradient.js */ 21));

var _guid = _interopRequireDefault(__webpack_require__(/*! ./libs/function/guid.js */ 22));

var _color = _interopRequireDefault(__webpack_require__(/*! ./libs/function/color.js */ 23));

var _type2icon = _interopRequireDefault(__webpack_require__(/*! ./libs/function/type2icon.js */ 24));

var _randomArray = _interopRequireDefault(__webpack_require__(/*! ./libs/function/randomArray.js */ 25));

var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepClone.js */ 15));

var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepMerge.js */ 14));

var _addUnit = _interopRequireDefault(__webpack_require__(/*! ./libs/function/addUnit.js */ 26));


var _test = _interopRequireDefault(__webpack_require__(/*! ./libs/function/test.js */ 16));

var _random = _interopRequireDefault(__webpack_require__(/*! ./libs/function/random.js */ 27));

var _trim = _interopRequireDefault(__webpack_require__(/*! ./libs/function/trim.js */ 28));

var _toast = _interopRequireDefault(__webpack_require__(/*! ./libs/function/toast.js */ 29));

var _getParent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/getParent.js */ 30));

var _$parent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/$parent.js */ 31));



var _sys = __webpack_require__(/*! ./libs/function/sys.js */ 32);

var _debounce = _interopRequireDefault(__webpack_require__(/*! ./libs/function/debounce.js */ 33));

var _throttle = _interopRequireDefault(__webpack_require__(/*! ./libs/function/throttle.js */ 34));



var _config = _interopRequireDefault(__webpack_require__(/*! ./libs/config/config.js */ 35));

var _zIndex = _interopRequireDefault(__webpack_require__(/*! ./libs/config/zIndex.js */ 36));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // 引入全局mixin
// 引入关于是否mixin集成小程序分享的配置
// import wxshare from './libs/mixin/mpShare.js'
// 全局挂载引入http相关请求拦截插件
function wranning(str) {// 开发环境进行信息输出,主要是一些报错信息
  // 这个环境的来由是在程序编写时候,点击hx编辑器运行调试代码的时候,详见:
  // 	https://uniapp.dcloud.io/frame?id=%e5%bc%80%e5%8f%91%e7%8e%af%e5%a2%83%e5%92%8c%e7%94%9f%e4%ba%a7%e7%8e%af%e5%a2%83
  if (true) {console.warn(str);}} // 尝试判断在根目录的/store中是否有$u.mixin.js，此文件uView默认为需要挂在到全局的vuex的state变量
// HX2.6.11版本,放到try中,控制台依然会警告,暂时不用此方式，
// let vuexStore = {};
// try {
// 	vuexStore = require("@/store/$u.mixin.js");
// } catch (e) {
// 	//TODO handle the exception
// }
// post类型对象参数转为get类型url参数
var $u = { queryParams: _queryParams.default, route: _route.default, timeFormat: _timeFormat.default, date: _timeFormat.default, // 另名date
  timeFrom: _timeFrom.default, colorGradient: _colorGradient.default.colorGradient, guid: _guid.default, color: _color.default, sys: _sys.sys, os: _sys.os, type2icon: _type2icon.default, randomArray: _randomArray.default, wranning: wranning, get: _request.default.get, post: _request.default.post,
  put: _request.default.put,
  'delete': _request.default.delete,
  hexToRgb: _colorGradient.default.hexToRgb,
  rgbToHex: _colorGradient.default.rgbToHex,
  test: _test.default,
  random: _random.default,
  deepClone: _deepClone.default,
  deepMerge: _deepMerge.default,
  getParent: _getParent.default,
  $parent: _$parent.default,
  addUnit: _addUnit.default,
  trim: _trim.default,
  type: ['primary', 'success', 'error', 'warning', 'info'],
  http: _request.default,
  toast: _toast.default,
  config: _config.default, // uView配置信息相关，比如版本号
  zIndex: _zIndex.default,
  debounce: _debounce.default,
  throttle: _throttle.default };


var install = function install(Vue) {
  Vue.mixin(_mixin.default);
  if (Vue.prototype.openShare) {
    Vue.mixin(mpShare);
  }
  // Vue.mixin(vuexStore);
  // 时间格式化，同时两个名称，date和timeFormat
  Vue.filter('timeFormat', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  Vue.filter('date', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  // 将多久以前的方法，注入到全局过滤器
  Vue.filter('timeFrom', function (timestamp, format) {
    return (0, _timeFrom.default)(timestamp, format);
  });
  Vue.prototype.$u = $u;
};var _default =

{
  install: install };exports.default = _default;

/***/ }),

/***/ 12:
/*!***************************************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/uview-ui/libs/mixin/mixin.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {module.exports = {
  data: function data() {
    return {};
  },
  onLoad: function onLoad() {
    // getRect挂载到$u上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
    this.$u.getRect = this.$uGetRect;
  },
  methods: {
    // 查询节点信息
    // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
    // 解决办法为在组件根部再套一个没有任何作用的view元素
    $uGetRect: function $uGetRect(selector, all) {var _this = this;
      return new Promise(function (resolve) {
        uni.createSelectorQuery().
        in(_this)[all ? 'selectAll' : 'select'](selector).
        boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).
        exec();
      });
    } },

  onReachBottom: function onReachBottom() {
    uni.$emit('uOnReachBottom');
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 13:
/*!*****************************************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/uview-ui/libs/request/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ../function/deepMerge */ 14));
var _test = _interopRequireDefault(__webpack_require__(/*! ../function/test */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var
Request = /*#__PURE__*/function () {_createClass(Request, [{ key: "setConfig",
    // 设置全局默认配置
    value: function setConfig(customConfig) {
      // 深度合并对象，否则会造成对象深层属性丢失
      this.config = (0, _deepMerge.default)(this.config, customConfig);
    }

    // 主要请求部分
  }, { key: "request", value: function request() {var _this = this;var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // 检查请求拦截
      if (this.interceptor.request && typeof this.interceptor.request === 'function') {
        var tmpConfig = {};
        var interceptorRequest = this.interceptor.request(options);
        if (interceptorRequest === false) {
          // 返回一个处于pending状态中的Promise，来取消原promise，避免进入then()回调
          return new Promise(function () {});
        }
        this.options = interceptorRequest;
      }
      options.dataType = options.dataType || this.config.dataType;
      options.responseType = options.responseType || this.config.responseType;
      options.url = options.url || '';
      options.params = options.params || {};
      options.header = Object.assign(this.config.header, options.header);
      options.method = options.method || this.config.method;

      return new Promise(function (resolve, reject) {
        options.complete = function (response) {
          // 请求返回后，隐藏loading(如果请求返回快的话，可能会没有loading)
          uni.hideLoading();
          // 清除定时器，如果请求回来了，就无需loading
          clearTimeout(_this.config.timer);
          _this.config.timer = null;
          // 判断用户对拦截返回数据的要求，如果originalData为true，返回所有的数据(response)到拦截器，否则只返回response.data
          if (_this.config.originalData) {
            // 判断是否存在拦截器
            if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
              var resInterceptors = _this.interceptor.response(response);
              // 如果拦截器不返回false，就将拦截器返回的内容给this.$u.post的then回调
              if (resInterceptors !== false) {
                resolve(resInterceptors);
              } else {
                // 如果拦截器返回false，意味着拦截器定义者认为返回有问题，直接接入catch回调
                reject(response);
              }
            } else {
              // 如果要求返回原始数据，就算没有拦截器，也返回最原始的数据
              resolve(response);
            }
          } else {
            if (response.statusCode == 200) {
              if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
                var _resInterceptors = _this.interceptor.response(response.data);
                if (_resInterceptors !== false) {
                  resolve(_resInterceptors);
                } else {
                  reject(response.data);
                }
              } else {
                // 如果不是返回原始数据(originalData=false)，且没有拦截器的情况下，返回纯数据给then回调
                resolve(response.data);
              }
            } else {
              // 不返回原始数据的情况下，服务器状态码不为200，modal弹框提示
              // if(response.errMsg) {
              // 	uni.showModal({
              // 		title: response.errMsg
              // 	});
              // }
              reject(response);
            }
          }
        };

        // 判断用户传递的URL是否/开头,如果不是,加上/，这里使用了uView的test.js验证库的url()方法
        options.url = _test.default.url(options.url) ? options.url : _this.config.baseUrl + (options.url.indexOf('/') == 0 ?
        options.url : '/' + options.url);

        // 是否显示loading
        // 加一个是否已有timer定时器的判断，否则有两个同时请求的时候，后者会清除前者的定时器id
        // 而没有清除前者的定时器，导致前者超时，一直显示loading
        if (_this.config.showLoading && !_this.config.timer) {
          _this.config.timer = setTimeout(function () {
            uni.showLoading({
              title: _this.config.loadingText,
              mask: _this.config.loadingMask });

            _this.config.timer = null;
          }, _this.config.loadingTime);
        }
        uni.request(options);
      });
      // .catch(res => {
      // 	// 如果返回reject()，不让其进入this.$u.post().then().catch()后面的catct()
      // 	// 因为很多人都会忘了写后面的catch()，导致报错捕获不到catch
      // 	return new Promise(()=>{});
      // })
    } }]);

  function Request() {var _this2 = this;_classCallCheck(this, Request);
    this.config = {
      baseUrl: '', // 请求的根域名
      // 默认的请求头
      header: {},
      method: 'POST',
      // 设置为json，返回后uni.request会对数据进行一次JSON.parse
      dataType: 'json',
      // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
      responseType: 'text',
      showLoading: true, // 是否显示请求中的loading
      loadingText: '请求中...',
      loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
      timer: null, // 定时器
      originalData: false, // 是否在拦截器中返回服务端的原始数据，见文档说明
      loadingMask: true // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    };

    // 拦截器
    this.interceptor = {
      // 请求前的拦截
      request: null,
      // 请求后的拦截
      response: null };


    // get请求
    this.get = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        method: 'GET',
        url: url,
        header: header,
        data: data });

    };

    // post请求
    this.post = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'POST',
        header: header,
        data: data });

    };

    // put请求，不支持支付宝小程序(HX2.6.15)
    this.put = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'PUT',
        header: header,
        data: data });

    };

    // delete请求，不支持支付宝和头条小程序(HX2.6.15)
    this.delete = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'DELETE',
        header: header,
        data: data });

    };
  }return Request;}();var _default =

new Request();exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 14:
/*!**********************************************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/uview-ui/libs/function/deepMerge.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./deepClone */ 15));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// JS对象深度合并
function deepMerge() {var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  target = (0, _deepClone.default)(target);
  if (typeof target !== 'object' || typeof source !== 'object') return false;
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) continue;
    if (prop in target) {
      if (typeof target[prop] !== 'object') {
        target[prop] = source[prop];
      } else {
        if (typeof source[prop] !== 'object') {
          target[prop] = source[prop];
        } else {
          if (target[prop].concat && source[prop].concat) {
            target[prop] = target[prop].concat(source[prop]);
          } else {
            target[prop] = deepMerge(target[prop], source[prop]);
          }
        }
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}var _default =

deepMerge;exports.default = _default;

/***/ }),

/***/ 15:
/*!**********************************************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/uview-ui/libs/function/deepClone.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

// 深度克隆
function deepClone(obj) {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if (typeof obj !== "object" && typeof obj !== 'function') {
    //原始类型直接返回
    return obj;
  }
  var o = isArray(obj) ? [] : {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}var _default =

deepClone;exports.default = _default;

/***/ }),

/***/ 16:
/*!*****************************************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/uview-ui/libs/function/test.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 验证电子邮箱格式
                                                                                                      */
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}

/**
   * 验证手机格式
   */
function mobile(value) {
  return /^1[23456789]\d{9}$/.test(value);
}

/**
   * 验证URL格式
   */
function url(value) {
  return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.
  test(value);
}

/**
   * 验证日期格式
   */
function date(value) {
  return !/Invalid|NaN/.test(new Date(value).toString());
}

/**
   * 验证ISO类型的日期格式
   */
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}

/**
   * 验证十进制数字
   */
function number(value) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
}

/**
   * 验证整数
   */
function digits(value) {
  return /^\d+$/.test(value);
}

/**
   * 验证身份证号码
   */
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
  value);
}

/**
   * 是否车牌号
   */
function carNo(value) {
  // 新能源车牌
  var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 旧车牌
  var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  } else if (value.length === 8) {
    return xreg.test(value);
  } else {
    return false;
  }
}

/**
   * 金额,只允许2位小数
   */
function amount(value) {
  //金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}

/**
   * 中文
   */
function chinese(value) {
  var reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}

/**
   * 只能输入字母
   */
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}

/**
   * 只能是字母或者数字
   */
function enOrNum(value) {
  //英文或者数字
  var reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}

/**
   * 验证是否包含某个值
   */
function contains(value, param) {
  return value.indexOf(param) >= 0;
}

/**
   * 验证一个值范围[min, max]
   */
function range(value, param) {
  return value >= param[0] && value <= param[1];
}

/**
   * 验证一个长度范围[min, max]
   */
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}

/**
   * 是否固定电话
   */
function landline(value) {
  var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}

/**
   * 判断是否为空
   */
function empty(value) {
  switch (typeof value) {
    case 'undefined':
      return true;
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
      break;
    case 'boolean':
      if (!value) return true;
      break;
    case 'number':
      if (0 === value || isNaN(value)) return true;
      break;
    case 'object':
      if (null === value || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;}

  return false;
}

/**
   * 是否json字符串
   */
function jsonString(value) {
  if (typeof value == 'string') {
    try {
      var obj = JSON.parse(value);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
}


/**
   * 是否数组
   */
function array(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === "[object Array]";
  }
}

/**
   * 是否对象
   */
function object(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
   * 是否短信验证码
   */
function code(value) {var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
  return new RegExp("^\\d{".concat(len, "}$")).test(value);
}var _default =


{
  email: email,
  mobile: mobile,
  url: url,
  date: date,
  dateISO: dateISO,
  number: number,
  digits: digits,
  idCard: idCard,
  carNo: carNo,
  amount: amount,
  chinese: chinese,
  letter: letter,
  enOrNum: enOrNum,
  contains: contains,
  range: range,
  rangeLength: rangeLength,
  empty: empty,
  isEmpty: empty,
  jsonString: jsonString,
  landline: landline,
  object: object,
  array: array,
  code: code };exports.default = _default;

/***/ }),

/***/ 17:
/*!************************************************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/uview-ui/libs/function/queryParams.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 对象转url参数
                                                                                                      * @param {*} data,对象
                                                                                                      * @param {*} isPrefix,是否自动加上"?"
                                                                                                      */
function queryParams() {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var isPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var arrayFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'brackets';
  var prefix = isPrefix ? '?' : '';
  var _result = [];
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';var _loop = function _loop(
  key) {
    var value = data[key];
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      return "continue";
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (var i = 0; i < value.length; i++) {
            _result.push(key + '[' + i + ']=' + value[i]);
          }
          break;
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });
          break;
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach(function (_value) {
            _result.push(key + '=' + _value);
          });
          break;
        case 'comma':
          // 结果: ids=1,2,3
          var commaStr = "";
          value.forEach(function (_value) {
            commaStr += (commaStr ? "," : "") + _value;
          });
          _result.push(key + '=' + commaStr);
          break;
        default:
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });}

    } else {
      _result.push(key + '=' + value);
    }};for (var key in data) {var _ret = _loop(key);if (_ret === "continue") continue;
  }
  return _result.length ? prefix + _result.join('&') : '';
}var _default =

queryParams;exports.default = _default;

/***/ }),

/***/ 18:
/*!******************************************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/uview-ui/libs/function/route.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _queryParams = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/queryParams.js */ 17));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
/**
                                                                                                                                                                                                                                                                                            * 路由跳转
                                                                                                                                                                                                                                                                                            * 注意:本方法没有对跳转的回调函数进行封装
                                                                                                                                                                                                                                                                                            */
function route() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var config = {
    type: 'navigateTo',
    url: '',
    delta: 1, // navigateBack页面后退时,回退的层数
    params: {}, // 传递的参数
    animationType: 'pop-in', // 窗口动画,只在APP有效
    animationDuration: 300 // 窗口动画持续时间,单位毫秒,只在APP有效
  };
  config = Object.assign(config, options);
  // 如果url没有"/"开头，添加上，因为uni的路由跳转需要"/"开头
  if (config.url[0] != '/') config.url = '/' + config.url;
  // 判断是否有传递显式的参数,Object.keys转为数组并判断长度,switchTab类型时不能携带参数
  if (Object.keys(config.params).length && config.type != 'switchTab') {
    // 判断用户传递的url中，是否带有参数
    // 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
    // 如果有url中有get参数，转换后无需带上"?"
    var query = '';
    if (/.*\/.*\?.*=.*/.test(config.url)) {
      // object对象转为get类型的参数
      query = (0, _queryParams.default)(config.params, false);
      // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
      config.url += "&" + query;
    } else {
      query = (0, _queryParams.default)(config.params);
      config.url += query;
    }
  }
  // 简写形式，把url和参数拼接起来
  if (typeof options === 'string' && typeof params == 'object') {
    var _query = '';
    if (/.*\/.*\?.*=.*/.test(options)) {
      // object对象转为get类型的参数
      _query = (0, _queryParams.default)(params, false);
      // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
      options += "&" + _query;
    } else {
      _query = (0, _queryParams.default)(params);
      options += _query;
    }
  }
  // 判断是否一个字符串，如果是，直接跳转(简写法)
  // 如果是中情形，默认第二个参数为对象形式的参数
  if (typeof options === 'string') {
    if (options[0] != '/') options = '/' + options;
    return uni.navigateTo({
      url: options });

  }
  // navigateTo类型的跳转
  if (config.type == 'navigateTo' || config.type == 'to') {
    return uni.navigateTo({
      url: config.url,
      animationType: config.animationType,
      animationDuration: config.animationDuration });

  }
  if (config.type == 'redirectTo' || config.type == 'redirect') {
    return uni.redirectTo({
      url: config.url });

  }
  if (config.type == 'switchTab' || config.type == 'tab') {
    return uni.switchTab({
      url: config.url });

  }
  if (config.type == 'reLaunch') {
    return uni.reLaunch({
      url: config.url });

  }
  if (config.type == 'navigateBack' || config.type == 'back') {
    return uni.navigateBack({
      delta: parseInt(config.delta ? config.delta : this.delta) });

  }
}var _default =

route;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 19:
/*!***********************************************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/uview-ui/libs/function/timeFormat.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // padStart 的 polyfill，因为某些机型或情况，还无法支持es7的padStart，比如电脑版的微信小程序
// 所以这里做一个兼容polyfill的兼容处理
if (!String.prototype.padStart) {
  // 为了方便表示这里 fillString 用了ES6 的默认参数，不影响理解
  String.prototype.padStart = function (maxLength) {var fillString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
    if (Object.prototype.toString.call(fillString) !== "[object String]") throw new TypeError(
    'fillString must be String');
    var str = this;
    // 返回 String(str) 这里是为了使返回的值是字符串字面量，在控制台中更符合直觉
    if (str.length >= maxLength) return String(str);

    var fillLength = maxLength - str.length,
    times = Math.ceil(fillLength / fillString.length);
    while (times >>= 1) {
      fillString += fillString;
      if (times === 1) {
        fillString += fillString;
      }
    }
    return fillString.slice(0, fillLength) + str;
  };
}

function timeFormat() {var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 其他更多是格式化有如下:
  // yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
  timestamp = parseInt(timestamp);
  // 如果为null,则格式化当前时间
  if (!timestamp) timestamp = Number(new Date());
  // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
  if (timestamp.toString().length == 10) timestamp *= 1000;
  var date = new Date(timestamp);
  var ret;
  var opt = {
    "y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "h+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "s+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (var k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    };
  };
  return fmt;
}var _default =

timeFormat;exports.default = _default;

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var rawBindings = vm.__secret_vfa_state__ && vm.__secret_vfa_state__.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }
  
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!*********************************************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/uview-ui/libs/function/timeFrom.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/timeFormat.js */ 19));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                                                          * 时间戳转为多久之前
                                                                                                                                                                                                                                                                                          * @param String timestamp 时间戳
                                                                                                                                                                                                                                                                                          * @param String | Boolean format 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
                                                                                                                                                                                                                                                                                          * 如果为布尔值false，无论什么时间，都返回多久以前的格式
                                                                                                                                                                                                                                                                                          */
function timeFrom() {var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  if (timestamp == null) timestamp = Number(new Date());
  timestamp = parseInt(timestamp);
  // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
  if (timestamp.toString().length == 10) timestamp *= 1000;
  var timer = new Date().getTime() - timestamp;
  timer = parseInt(timer / 1000);
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  var tips = '';
  switch (true) {
    case timer < 300:
      tips = '刚刚';
      break;
    case timer >= 300 && timer < 3600:
      tips = parseInt(timer / 60) + '分钟前';
      break;
    case timer >= 3600 && timer < 86400:
      tips = parseInt(timer / 3600) + '小时前';
      break;
    case timer >= 86400 && timer < 2592000:
      tips = parseInt(timer / 86400) + '天前';
      break;
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = parseInt(timer / (86400 * 30)) + '个月前';
        } else {
          tips = parseInt(timer / (86400 * 365)) + '年前';
        }
      } else {
        tips = (0, _timeFormat.default)(timestamp, format);
      }}

  return tips;
}var _default =

timeFrom;exports.default = _default;

/***/ }),

/***/ 21:
/*!**************************************************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/uview-ui/libs/function/colorGradient.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 求两个颜色之间的渐变值
                                                                                                      * @param {string} startColor 开始的颜色
                                                                                                      * @param {string} endColor 结束的颜色
                                                                                                      * @param {number} step 颜色等分的份额
                                                                                                      * */
function colorGradient() {var startColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgb(0, 0, 0)';var endColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb(255, 255, 255)';var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var startRGB = hexToRgb(startColor, false); //转换为rgb数组模式
  var startR = startRGB[0];
  var startG = startRGB[1];
  var startB = startRGB[2];

  var endRGB = hexToRgb(endColor, false);
  var endR = endRGB[0];
  var endG = endRGB[1];
  var endB = endRGB[2];

  var sR = (endR - startR) / step; //总差值
  var sG = (endG - startG) / step;
  var sB = (endB - startB) / step;
  var colorArr = [];
  for (var i = 0; i < step; i++) {
    //计算每一步的hex值 
    var hex = rgbToHex('rgb(' + Math.round(sR * i + startR) + ',' + Math.round(sG * i + startG) + ',' + Math.round(sB *
    i + startB) + ')');
    colorArr.push(hex);
  }
  return colorArr;
}

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
function hexToRgb(sColor) {var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  sColor = sColor.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var _i = 1; _i < 7; _i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(_i, _i + 2)));
    }
    if (!str) {
      return sColorChange;
    } else {
      return "rgb(".concat(sColorChange[0], ",").concat(sColorChange[1], ",").concat(sColorChange[2], ")");
    }
  } else if (/^(rgb|RGB)/.test(sColor)) {
    var arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    return arr.map(function (val) {return Number(val);});
  } else {
    return sColor;
  }
};

// 将rgb表示方式转换为hex表示方式
function rgbToHex(rgb) {
  var _this = rgb;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      hex = String(hex).length == 1 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  } else if (reg.test(_this)) {
    var aNum = _this.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return _this;
    } else if (aNum.length === 3) {
      var numHex = "#";
      for (var _i2 = 0; _i2 < aNum.length; _i2 += 1) {
        numHex += aNum[_i2] + aNum[_i2];
      }
      return numHex;
    }
  } else {
    return _this;
  }
}var _default =

{
  colorGradient: colorGradient,
  hexToRgb: hexToRgb,
  rgbToHex: rgbToHex };exports.default = _default;

/***/ }),

/***/ 22:
/*!*****************************************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/uview-ui/libs/function/guid.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 本算法来源于简书开源代码，详见：https://www.jianshu.com/p/fdbf293d0a85
                                                                                                      * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier) 
                                                                                                      * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
                                                                                                      * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
                                                                                                      * v-for的时候,推荐使用后端返回的id而不是循环的index
                                                                                                      * @param {Number} len uuid的长度
                                                                                                      * @param {Boolean} firstU 将返回的首字母置为"u"
                                                                                                      * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
                                                                                                      */
function guid() {var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;var firstU = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  radix = radix || chars.length;

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (var i = 0; i < len; i++) {uuid[i] = chars[0 | Math.random() * radix];}
  } else {
    var r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (var _i = 0; _i < 36; _i++) {
      if (!uuid[_i]) {
        r = 0 | Math.random() * 16;
        uuid[_i] = chars[_i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift();
    return 'u' + uuid.join('');
  } else {
    return uuid.join('');
  }
}var _default =

guid;exports.default = _default;

/***/ }),

/***/ 23:
/*!******************************************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/uview-ui/libs/function/color.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 为了让用户能够自定义主题，会逐步弃用此文件，各颜色通过css提供
// 为了给某些特殊场景使用和向后兼容，无需删除此文件(2020-06-20)
var color = {
  primary: "#2979ff",
  primaryDark: "#2b85e4",
  primaryDisabled: "#a0cfff",
  primaryLight: "#ecf5ff",
  bgColor: "#f3f4f6",

  info: "#909399",
  infoDark: "#82848a",
  infoDisabled: "#c8c9cc",
  infoLight: "#f4f4f5",

  warning: "#ff9900",
  warningDark: "#f29100",
  warningDisabled: "#fcbd71",
  warningLight: "#fdf6ec",

  error: "#fa3534",
  errorDark: "#dd6161",
  errorDisabled: "#fab6b6",
  errorLight: "#fef0f0",

  success: "#19be6b",
  successDark: "#18b566",
  successDisabled: "#71d5a1",
  successLight: "#dbf1e1",

  mainColor: "#303133",
  contentColor: "#606266",
  tipsColor: "#909399",
  lightColor: "#c0c4cc",
  borderColor: "#e4e7ed" };var _default =


color;exports.default = _default;

/***/ }),

/***/ 24:
/*!**********************************************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/uview-ui/libs/function/type2icon.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 根据主题type值,获取对应的图标
                                                                                                      * @param String type 主题名称,primary|info|error|warning|success
                                                                                                      * @param String fill 是否使用fill填充实体的图标  
                                                                                                      */
function type2icon() {var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'success';var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // 如果非预置值,默认为success
  if (['primary', 'info', 'error', 'warning', 'success'].indexOf(type) == -1) type = 'success';
  var iconName = '';
  // 目前(2019-12-12),info和primary使用同一个图标
  switch (type) {
    case 'primary':
      iconName = 'info-circle';
      break;
    case 'info':
      iconName = 'info-circle';
      break;
    case 'error':
      iconName = 'close-circle';
      break;
    case 'warning':
      iconName = 'error-circle';
      break;
    case 'success':
      iconName = 'checkmark-circle';
      break;
    default:
      iconName = 'checkmark-circle';}

  // 是否是实体类型,加上-fill,在icon组件库中,实体的类名是后面加-fill的
  if (fill) iconName += '-fill';
  return iconName;
}var _default =

type2icon;exports.default = _default;

/***/ }),

/***/ 242:
/*!****************************************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/uview-ui/libs/util/emitter.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 递归使用 call 方式this指向
                                                                                                      * @param componentName // 需要找的组件的名称
                                                                                                      * @param eventName // 事件名称
                                                                                                      * @param params // 需要传递的参数
                                                                                                      */
function _broadcast(componentName, eventName, params) {
  // 循环子节点找到名称一样的子节点 否则 递归 当前子节点
  this.$children.map(function (child) {
    if (componentName === child.$options.name) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      _broadcast.apply(child, [componentName, eventName].concat(params));
    }
  });
}var _default =
{
  methods: {
    /**
              * 派发 (向上查找) (一个)
              * @param componentName // 需要找的组件的名称
              * @param eventName // 事件名称
              * @param params // 需要传递的参数
              */
    dispatch: function dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root; //$parent 找到最近的父节点 $root 根节点
      var name = parent.$options.name; // 获取当前组件实例的name
      // 如果当前有节点 && 当前没名称 且 当前名称等于需要传进来的名称的时候就去查找当前的节点
      // 循环出当前名称的一样的组件实例
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.name;
        }
      }
      // 有节点表示当前找到了name一样的实例
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    /**
        * 广播 (向下查找) (广播多个)
        * @param componentName // 需要找的组件的名称
        * @param eventName // 事件名称
        * @param params // 需要传递的参数
        */
    broadcast: function broadcast(componentName, eventName, params) {
      _broadcast.call(this, componentName, eventName, params);
    } } };exports.default = _default;

/***/ }),

/***/ 243:
/*!************************************************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/uview-ui/libs/util/async-validator.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/* eslint no-console:0 */
var formatRegExp = /%[sdj%]/g;
var warning = function warning() {}; // don't print warning message when in production env or node runtime

if (typeof process !== 'undefined' && Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}) && "development" !== 'production' && typeof window !==
'undefined' && typeof document !== 'undefined') {
  warning = function warning(type, errors) {
    if (typeof console !== 'undefined' && console.warn) {
      if (errors.every(function (e) {
        return typeof e === 'string';
      })) {
        console.warn(type, errors);
      }
    }
  };
}

function convertFieldsError(errors) {
  if (!errors || !errors.length) return null;
  var fields = {};
  errors.forEach(function (error) {
    var field = error.field;
    fields[field] = fields[field] || [];
    fields[field].push(error);
  });
  return fields;
}

function format() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var i = 1;
  var f = args[0];
  var len = args.length;

  if (typeof f === 'function') {
    return f.apply(null, args.slice(1));
  }

  if (typeof f === 'string') {
    var str = String(f).replace(formatRegExp, function (x) {
      if (x === '%%') {
        return '%';
      }

      if (i >= len) {
        return x;
      }

      switch (x) {
        case '%s':
          return String(args[i++]);

        case '%d':
          return Number(args[i++]);

        case '%j':
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return '[Circular]';
          }

          break;

        default:
          return x;}

    });

    for (var arg = args[i]; i < len; arg = args[++i]) {
      str += " " + arg;
    }

    return str;
  }

  return f;
}

function isNativeStringType(type) {
  return type === 'string' || type === 'url' || type === 'hex' || type === 'email' || type === 'pattern';
}

function isEmptyValue(value, type) {
  if (value === undefined || value === null) {
    return true;
  }

  if (type === 'array' && Array.isArray(value) && !value.length) {
    return true;
  }

  if (isNativeStringType(type) && typeof value === 'string' && !value) {
    return true;
  }

  return false;
}

function asyncParallelArray(arr, func, callback) {
  var results = [];
  var total = 0;
  var arrLength = arr.length;

  function count(errors) {
    results.push.apply(results, errors);
    total++;

    if (total === arrLength) {
      callback(results);
    }
  }

  arr.forEach(function (a) {
    func(a, count);
  });
}

function asyncSerialArray(arr, func, callback) {
  var index = 0;
  var arrLength = arr.length;

  function next(errors) {
    if (errors && errors.length) {
      callback(errors);
      return;
    }

    var original = index;
    index = index + 1;

    if (original < arrLength) {
      func(arr[original], next);
    } else {
      callback([]);
    }
  }

  next([]);
}

function flattenObjArr(objArr) {
  var ret = [];
  Object.keys(objArr).forEach(function (k) {
    ret.push.apply(ret, objArr[k]);
  });
  return ret;
}

function asyncMap(objArr, option, func, callback) {
  if (option.first) {
    var _pending = new Promise(function (resolve, reject) {
      var next = function next(errors) {
        callback(errors);
        return errors.length ? reject({
          errors: errors,
          fields: convertFieldsError(errors) }) :
        resolve();
      };

      var flattenArr = flattenObjArr(objArr);
      asyncSerialArray(flattenArr, func, next);
    });

    _pending["catch"](function (e) {
      return e;
    });

    return _pending;
  }

  var firstFields = option.firstFields || [];

  if (firstFields === true) {
    firstFields = Object.keys(objArr);
  }

  var objArrKeys = Object.keys(objArr);
  var objArrLength = objArrKeys.length;
  var total = 0;
  var results = [];
  var pending = new Promise(function (resolve, reject) {
    var next = function next(errors) {
      results.push.apply(results, errors);
      total++;

      if (total === objArrLength) {
        callback(results);
        return results.length ? reject({
          errors: results,
          fields: convertFieldsError(results) }) :
        resolve();
      }
    };

    if (!objArrKeys.length) {
      callback(results);
      resolve();
    }

    objArrKeys.forEach(function (key) {
      var arr = objArr[key];

      if (firstFields.indexOf(key) !== -1) {
        asyncSerialArray(arr, func, next);
      } else {
        asyncParallelArray(arr, func, next);
      }
    });
  });
  pending["catch"](function (e) {
    return e;
  });
  return pending;
}

function complementError(rule) {
  return function (oe) {
    if (oe && oe.message) {
      oe.field = oe.field || rule.fullField;
      return oe;
    }

    return {
      message: typeof oe === 'function' ? oe() : oe,
      field: oe.field || rule.fullField };

  };
}

function deepMerge(target, source) {
  if (source) {
    for (var s in source) {
      if (source.hasOwnProperty(s)) {
        var value = source[s];

        if (typeof value === 'object' && typeof target[s] === 'object') {
          target[s] = _extends({}, target[s], {}, value);
        } else {
          target[s] = value;
        }
      }
    }
  }

  return target;
}

/**
   *  Rule for validating required fields.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function required(rule, value, source, errors, options, type) {
  if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value, type || rule.type))) {
    errors.push(format(options.messages.required, rule.fullField));
  }
}

/**
   *  Rule for validating whitespace.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function whitespace(rule, value, source, errors, options) {
  if (/^\s+$/.test(value) || value === '') {
    errors.push(format(options.messages.whitespace, rule.fullField));
  }
}

/* eslint max-len:0 */

var pattern = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  url: new RegExp(
  "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
  'i'),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i };

var types = {
  integer: function integer(value) {
    return types.number(value) && parseInt(value, 10) === value;
  },
  "float": function _float(value) {
    return types.number(value) && !types.integer(value);
  },
  array: function array(value) {
    return Array.isArray(value);
  },
  regexp: function regexp(value) {
    if (value instanceof RegExp) {
      return true;
    }

    try {
      return !!new RegExp(value);
    } catch (e) {
      return false;
    }
  },
  date: function date(value) {
    return typeof value.getTime === 'function' && typeof value.getMonth === 'function' && typeof value.getYear ===
    'function';
  },
  number: function number(value) {
    if (isNaN(value)) {
      return false;
    }

    // 修改源码，将字符串数值先转为数值
    return typeof +value === 'number';
  },
  object: function object(value) {
    return typeof value === 'object' && !types.array(value);
  },
  method: function method(value) {
    return typeof value === 'function';
  },
  email: function email(value) {
    return typeof value === 'string' && !!value.match(pattern.email) && value.length < 255;
  },
  url: function url(value) {
    return typeof value === 'string' && !!value.match(pattern.url);
  },
  hex: function hex(value) {
    return typeof value === 'string' && !!value.match(pattern.hex);
  } };

/**
        *  Rule for validating the type of a value.
        *
        *  @param rule The validation rule.
        *  @param value The value of the field on the source object.
        *  @param source The source object being validated.
        *  @param errors An array of errors that this rule may add
        *  validation errors to.
        *  @param options The validation options.
        *  @param options.messages The validation messages.
        */

function type(rule, value, source, errors, options) {
  if (rule.required && value === undefined) {
    required(rule, value, source, errors, options);
    return;
  }

  var custom = ['integer', 'float', 'array', 'regexp', 'object', 'method', 'email', 'number', 'date', 'url', 'hex'];
  var ruleType = rule.type;

  if (custom.indexOf(ruleType) > -1) {
    if (!types[ruleType](value)) {
      errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
    } // straight typeof check

  } else if (ruleType && typeof value !== rule.type) {
    errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
  }
}

/**
   *  Rule for validating minimum and maximum allowed values.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function range(rule, value, source, errors, options) {
  var len = typeof rule.len === 'number';
  var min = typeof rule.min === 'number';
  var max = typeof rule.max === 'number'; // 正则匹配码点范围从U+010000一直到U+10FFFF的文字（补充平面Supplementary Plane）

  var spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  var val = value;
  var key = null;
  var num = typeof value === 'number';
  var str = typeof value === 'string';
  var arr = Array.isArray(value);

  if (num) {
    key = 'number';
  } else if (str) {
    key = 'string';
  } else if (arr) {
    key = 'array';
  } // if the value is not of a supported type for range validation
  // the validation rule rule should use the
  // type property to also test for a particular type


  if (!key) {
    return false;
  }

  if (arr) {
    val = value.length;
  }

  if (str) {
    // 处理码点大于U+010000的文字length属性不准确的bug，如"𠮷𠮷𠮷".lenght !== 3
    val = value.replace(spRegexp, '_').length;
  }

  if (len) {
    if (val !== rule.len) {
      errors.push(format(options.messages[key].len, rule.fullField, rule.len));
    }
  } else if (min && !max && val < rule.min) {
    errors.push(format(options.messages[key].min, rule.fullField, rule.min));
  } else if (max && !min && val > rule.max) {
    errors.push(format(options.messages[key].max, rule.fullField, rule.max));
  } else if (min && max && (val < rule.min || val > rule.max)) {
    errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
  }
}

var ENUM = 'enum';
/**
                    *  Rule for validating a value exists in an enumerable list.
                    *
                    *  @param rule The validation rule.
                    *  @param value The value of the field on the source object.
                    *  @param source The source object being validated.
                    *  @param errors An array of errors that this rule may add
                    *  validation errors to.
                    *  @param options The validation options.
                    *  @param options.messages The validation messages.
                    */

function enumerable(rule, value, source, errors, options) {
  rule[ENUM] = Array.isArray(rule[ENUM]) ? rule[ENUM] : [];

  if (rule[ENUM].indexOf(value) === -1) {
    errors.push(format(options.messages[ENUM], rule.fullField, rule[ENUM].join(', ')));
  }
}

/**
   *  Rule for validating a regular expression pattern.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function pattern$1(rule, value, source, errors, options) {
  if (rule.pattern) {
    if (rule.pattern instanceof RegExp) {
      // if a RegExp instance is passed, reset `lastIndex` in case its `global`
      // flag is accidentally set to `true`, which in a validation scenario
      // is not necessary and the result might be misleading
      rule.pattern.lastIndex = 0;

      if (!rule.pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    } else if (typeof rule.pattern === 'string') {
      var _pattern = new RegExp(rule.pattern);

      if (!_pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    }
  }
}

var rules = {
  required: required,
  whitespace: whitespace,
  type: type,
  range: range,
  "enum": enumerable,
  pattern: pattern$1 };


/**
                         *  Performs validation for string types.
                         *
                         *  @param rule The validation rule.
                         *  @param value The value of the field on the source object.
                         *  @param callback The callback function.
                         *  @param source The source object being validated.
                         *  @param options The validation options.
                         *  @param options.messages The validation messages.
                         */

function string(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, 'string');

    if (!isEmptyValue(value, 'string')) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
      rules.pattern(rule, value, source, errors, options);

      if (rule.whitespace === true) {
        rules.whitespace(rule, value, source, errors, options);
      }
    }
  }

  callback(errors);
}

/**
   *  Validates a function.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function method(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a number.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function number(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (value === '') {
      value = undefined;
    }

    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a boolean.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function _boolean(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates the regular expression type.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function regexp(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value)) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a number is an integer.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function integer(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a number is a floating point number.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function floatFn(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates an array.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function array(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'array') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, 'array');

    if (!isEmptyValue(value, 'array')) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates an object.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function object(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

var ENUM$1 = 'enum';
/**
                      *  Validates an enumerable list.
                      *
                      *  @param rule The validation rule.
                      *  @param value The value of the field on the source object.
                      *  @param callback The callback function.
                      *  @param source The source object being validated.
                      *  @param options The validation options.
                      *  @param options.messages The validation messages.
                      */

function enumerable$1(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules[ENUM$1](rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a regular expression pattern.
   *
   *  Performs validation when a rule only contains
   *  a pattern property but is not declared as a string type.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function pattern$2(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value, 'string')) {
      rules.pattern(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

function date(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value)) {
      var dateObject;

      if (typeof value === 'number') {
        dateObject = new Date(value);
      } else {
        dateObject = value;
      }

      rules.type(rule, dateObject, source, errors, options);

      if (dateObject) {
        rules.range(rule, dateObject.getTime(), source, errors, options);
      }
    }
  }

  callback(errors);
}

function required$1(rule, value, callback, source, options) {
  var errors = [];
  var type = Array.isArray(value) ? 'array' : typeof value;
  rules.required(rule, value, source, errors, options, type);
  callback(errors);
}

function type$1(rule, value, callback, source, options) {
  var ruleType = rule.type;
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, ruleType) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, ruleType);

    if (!isEmptyValue(value, ruleType)) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Performs validation for any type.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function any(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);
  }

  callback(errors);
}

var validators = {
  string: string,
  method: method,
  number: number,
  "boolean": _boolean,
  regexp: regexp,
  integer: integer,
  "float": floatFn,
  array: array,
  object: object,
  "enum": enumerable$1,
  pattern: pattern$2,
  date: date,
  url: type$1,
  hex: type$1,
  email: type$1,
  required: required$1,
  any: any };


function newMessages() {
  return {
    "default": 'Validation error on field %s',
    required: '%s is required',
    "enum": '%s must be one of %s',
    whitespace: '%s cannot be empty',
    date: {
      format: '%s date %s is invalid for format %s',
      parse: '%s date could not be parsed, %s is invalid ',
      invalid: '%s date %s is invalid' },

    types: {
      string: '%s is not a %s',
      method: '%s is not a %s (function)',
      array: '%s is not an %s',
      object: '%s is not an %s',
      number: '%s is not a %s',
      date: '%s is not a %s',
      "boolean": '%s is not a %s',
      integer: '%s is not an %s',
      "float": '%s is not a %s',
      regexp: '%s is not a valid %s',
      email: '%s is not a valid %s',
      url: '%s is not a valid %s',
      hex: '%s is not a valid %s' },

    string: {
      len: '%s must be exactly %s characters',
      min: '%s must be at least %s characters',
      max: '%s cannot be longer than %s characters',
      range: '%s must be between %s and %s characters' },

    number: {
      len: '%s must equal %s',
      min: '%s cannot be less than %s',
      max: '%s cannot be greater than %s',
      range: '%s must be between %s and %s' },

    array: {
      len: '%s must be exactly %s in length',
      min: '%s cannot be less than %s in length',
      max: '%s cannot be greater than %s in length',
      range: '%s must be between %s and %s in length' },

    pattern: {
      mismatch: '%s value %s does not match pattern %s' },

    clone: function clone() {
      var cloned = JSON.parse(JSON.stringify(this));
      cloned.clone = this.clone;
      return cloned;
    } };

}
var messages = newMessages();

/**
                               *  Encapsulates a validation schema.
                               *
                               *  @param descriptor An object declaring validation rules
                               *  for this schema.
                               */

function Schema(descriptor) {
  this.rules = null;
  this._messages = messages;
  this.define(descriptor);
}

Schema.prototype = {
  messages: function messages(_messages) {
    if (_messages) {
      this._messages = deepMerge(newMessages(), _messages);
    }

    return this._messages;
  },
  define: function define(rules) {
    if (!rules) {
      throw new Error('Cannot configure a schema with no rules');
    }

    if (typeof rules !== 'object' || Array.isArray(rules)) {
      throw new Error('Rules must be an object');
    }

    this.rules = {};
    var z;
    var item;

    for (z in rules) {
      if (rules.hasOwnProperty(z)) {
        item = rules[z];
        this.rules[z] = Array.isArray(item) ? item : [item];
      }
    }
  },
  validate: function validate(source_, o, oc) {
    var _this = this;

    if (o === void 0) {
      o = {};
    }

    if (oc === void 0) {
      oc = function oc() {};
    }

    var source = source_;
    var options = o;
    var callback = oc;

    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    if (!this.rules || Object.keys(this.rules).length === 0) {
      if (callback) {
        callback();
      }

      return Promise.resolve();
    }

    function complete(results) {
      var i;
      var errors = [];
      var fields = {};

      function add(e) {
        if (Array.isArray(e)) {
          var _errors;

          errors = (_errors = errors).concat.apply(_errors, e);
        } else {
          errors.push(e);
        }
      }

      for (i = 0; i < results.length; i++) {
        add(results[i]);
      }

      if (!errors.length) {
        errors = null;
        fields = null;
      } else {
        fields = convertFieldsError(errors);
      }

      callback(errors, fields);
    }

    if (options.messages) {
      var messages$1 = this.messages();

      if (messages$1 === messages) {
        messages$1 = newMessages();
      }

      deepMerge(messages$1, options.messages);
      options.messages = messages$1;
    } else {
      options.messages = this.messages();
    }

    var arr;
    var value;
    var series = {};
    var keys = options.keys || Object.keys(this.rules);
    keys.forEach(function (z) {
      arr = _this.rules[z];
      value = source[z];
      arr.forEach(function (r) {
        var rule = r;

        if (typeof rule.transform === 'function') {
          if (source === source_) {
            source = _extends({}, source);
          }

          value = source[z] = rule.transform(value);
        }

        if (typeof rule === 'function') {
          rule = {
            validator: rule };

        } else {
          rule = _extends({}, rule);
        }

        rule.validator = _this.getValidationMethod(rule);
        rule.field = z;
        rule.fullField = rule.fullField || z;
        rule.type = _this.getType(rule);

        if (!rule.validator) {
          return;
        }

        series[z] = series[z] || [];
        series[z].push({
          rule: rule,
          value: value,
          source: source,
          field: z });

      });
    });
    var errorFields = {};
    return asyncMap(series, options, function (data, doIt) {
      var rule = data.rule;
      var deep = (rule.type === 'object' || rule.type === 'array') && (typeof rule.fields === 'object' || typeof rule.defaultField ===
      'object');
      deep = deep && (rule.required || !rule.required && data.value);
      rule.field = data.field;

      function addFullfield(key, schema) {
        return _extends({}, schema, {
          fullField: rule.fullField + "." + key });

      }

      function cb(e) {
        if (e === void 0) {
          e = [];
        }

        var errors = e;

        if (!Array.isArray(errors)) {
          errors = [errors];
        }

        if (!options.suppressWarning && errors.length) {
          Schema.warning('async-validator:', errors);
        }

        if (errors.length && rule.message) {
          errors = [].concat(rule.message);
        }

        errors = errors.map(complementError(rule));

        if (options.first && errors.length) {
          errorFields[rule.field] = 1;
          return doIt(errors);
        }

        if (!deep) {
          doIt(errors);
        } else {
          // if rule is required but the target object
          // does not exist fail at the rule level and don't
          // go deeper
          if (rule.required && !data.value) {
            if (rule.message) {
              errors = [].concat(rule.message).map(complementError(rule));
            } else if (options.error) {
              errors = [options.error(rule, format(options.messages.required, rule.field))];
            } else {
              errors = [];
            }

            return doIt(errors);
          }

          var fieldsSchema = {};

          if (rule.defaultField) {
            for (var k in data.value) {
              if (data.value.hasOwnProperty(k)) {
                fieldsSchema[k] = rule.defaultField;
              }
            }
          }

          fieldsSchema = _extends({}, fieldsSchema, {}, data.rule.fields);

          for (var f in fieldsSchema) {
            if (fieldsSchema.hasOwnProperty(f)) {
              var fieldSchema = Array.isArray(fieldsSchema[f]) ? fieldsSchema[f] : [fieldsSchema[f]];
              fieldsSchema[f] = fieldSchema.map(addFullfield.bind(null, f));
            }
          }

          var schema = new Schema(fieldsSchema);
          schema.messages(options.messages);

          if (data.rule.options) {
            data.rule.options.messages = options.messages;
            data.rule.options.error = options.error;
          }

          schema.validate(data.value, data.rule.options || options, function (errs) {
            var finalErrors = [];

            if (errors && errors.length) {
              finalErrors.push.apply(finalErrors, errors);
            }

            if (errs && errs.length) {
              finalErrors.push.apply(finalErrors, errs);
            }

            doIt(finalErrors.length ? finalErrors : null);
          });
        }
      }

      var res;

      if (rule.asyncValidator) {
        res = rule.asyncValidator(rule, data.value, cb, data.source, options);
      } else if (rule.validator) {
        res = rule.validator(rule, data.value, cb, data.source, options);

        if (res === true) {
          cb();
        } else if (res === false) {
          cb(rule.message || rule.field + " fails");
        } else if (res instanceof Array) {
          cb(res);
        } else if (res instanceof Error) {
          cb(res.message);
        }
      }

      if (res && res.then) {
        res.then(function () {
          return cb();
        }, function (e) {
          return cb(e);
        });
      }
    }, function (results) {
      complete(results);
    });
  },
  getType: function getType(rule) {
    if (rule.type === undefined && rule.pattern instanceof RegExp) {
      rule.type = 'pattern';
    }

    if (typeof rule.validator !== 'function' && rule.type && !validators.hasOwnProperty(rule.type)) {
      throw new Error(format('Unknown rule type %s', rule.type));
    }

    return rule.type || 'string';
  },
  getValidationMethod: function getValidationMethod(rule) {
    if (typeof rule.validator === 'function') {
      return rule.validator;
    }

    var keys = Object.keys(rule);
    var messageIndex = keys.indexOf('message');

    if (messageIndex !== -1) {
      keys.splice(messageIndex, 1);
    }

    if (keys.length === 1 && keys[0] === 'required') {
      return validators.required;
    }

    return validators[this.getType(rule)] || false;
  } };


Schema.register = function register(type, validator) {
  if (typeof validator !== 'function') {
    throw new Error('Cannot register a validator by type, validator is not a function');
  }

  validators[type] = validator;
};

Schema.warning = warning;
Schema.messages = messages;var _default =

Schema;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../谷歌下载/HBuilderX/plugins/uniapp-cli/node_modules/node-libs-browser/mock/process.js */ 244)))

/***/ }),

/***/ 244:
/*!********************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/process.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    setTimeout(function () {
        fn.apply(null, args);
    }, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__(/*! path */ 245);
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),

/***/ 245:
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node-libs-browser/mock/process.js */ 244)))

/***/ }),

/***/ 25:
/*!************************************************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/uview-ui/libs/function/randomArray.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 打乱数组
function randomArray() {var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
  return array.sort(function () {return Math.random() - 0.5;});
}var _default =

randomArray;exports.default = _default;

/***/ }),

/***/ 26:
/*!********************************************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/uview-ui/libs/function/addUnit.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = addUnit;var _test = _interopRequireDefault(__webpack_require__(/*! ./test.js */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// 添加单位，如果有rpx，%，px等单位结尾或者值为auto，直接返回，否则加上rpx单位结尾
function addUnit() {var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rpx';
  value = String(value);
  // 用uView内置验证规则中的number判断是否为数值
  return _test.default.number(value) ? "".concat(value).concat(unit) : value;
}

/***/ }),

/***/ 27:
/*!*******************************************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/uview-ui/libs/function/random.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    var gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  } else {
    return 0;
  }
}var _default =

random;exports.default = _default;

/***/ }),

/***/ 28:
/*!*****************************************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/uview-ui/libs/function/trim.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function trim(str) {var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, "");
  } else if (pos == "left") {
    return str.replace(/^\s*/, '');
  } else if (pos == 'right') {
    return str.replace(/(\s*$)/g, "");
  } else if (pos == 'all') {
    return str.replace(/\s+/g, "");
  } else {
    return str;
  }
}var _default =

trim;exports.default = _default;

/***/ }),

/***/ 29:
/*!******************************************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/uview-ui/libs/function/toast.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function toast(title) {var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  uni.showToast({
    title: title,
    icon: 'none',
    duration: duration });

}var _default =

toast;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 30:
/*!**********************************************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/uview-ui/libs/function/getParent.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = getParent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
function getParent(name, keys) {
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {var _ret = function () {
        var data = {};
        // 判断keys是否数组，如果传过来的是一个数组，那么直接使用数组元素值当做键值去父组件寻找
        if (Array.isArray(keys)) {
          keys.map(function (val) {
            data[val] = parent[val] ? parent[val] : '';
          });
        } else {
          // 历遍传过来的对象参数
          for (var i in keys) {
            // 如果子组件有此值则用，无此值则用父组件的值
            // 判断是否空数组，如果是，则用父组件的值，否则用子组件的值
            if (Array.isArray(keys[i])) {
              if (keys[i].length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else if (keys[i].constructor === Object) {
              // 判断是否对象，如果是对象，且有属性，那么使用子组件的值，否则使用父组件的值
              if (Object.keys(keys[i]).length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else {
              // 只要子组件有传值，即使是false值，也是“传值”了，也需要覆盖父组件的同名参数
              data[i] = keys[i] || keys[i] === false ? keys[i] : parent[i];
            }
          }
        }
        return { v: data };}();if (typeof _ret === "object") return _ret.v;
    }
  }

  return {};
}

/***/ }),

/***/ 302:
/*!*********************************************************************************************!*\
  !*** ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator/index.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 303);

/***/ }),

/***/ 303:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 304);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 304:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 31:
/*!********************************************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/uview-ui/libs/function/$parent.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = $parent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
// 这里默认值等于undefined有它的含义，因为最顶层元素(组件)的$parent就是undefined，意味着不传name
// 值(默认为undefined)，就是查找最顶层的$parent
function $parent() {var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options && parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {
      return parent;
    }
  }
  return false;
}

/***/ }),

/***/ 32:
/*!****************************************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/uview-ui/libs/function/sys.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.os = os;exports.sys = sys;function os() {
  return uni.getSystemInfoSync().platform;
};

function sys() {
  return uni.getSystemInfoSync();
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 33:
/*!*********************************************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/uview-ui/libs/function/debounce.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timeout = null;

/**
                                                                                                                         * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
                                                                                                                         * 
                                                                                                                         * @param {Function} func 要执行的回调函数 
                                                                                                                         * @param {Number} wait 延时的时间
                                                                                                                         * @param {Boolean} immediate 是否立即执行 
                                                                                                                         * @return null
                                                                                                                         */
function debounce(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout);
  // 立即执行，此类情况一般用不到
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
    }, wait);
    if (callNow) typeof func === 'function' && func();
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(function () {
      typeof func === 'function' && func();
    }, wait);
  }
}var _default =

debounce;exports.default = _default;

/***/ }),

/***/ 34:
/*!*********************************************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/uview-ui/libs/function/throttle.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timer, flag;
/**
                                                                                                                      * 节流原理：在一定时间内，只能触发一次
                                                                                                                      * 
                                                                                                                      * @param {Function} func 要执行的回调函数 
                                                                                                                      * @param {Number} wait 延时的时间
                                                                                                                      * @param {Boolean} immediate 是否立即执行
                                                                                                                      * @return null
                                                                                                                      */
function throttle(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (immediate) {
    if (!flag) {
      flag = true;
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === 'function' && func();
      timer = setTimeout(function () {
        flag = false;
      }, wait);
    }
  } else {
    if (!flag) {
      flag = true;
      // 如果是非立即执行，则在wait毫秒内的结束处执行
      timer = setTimeout(function () {
        flag = false;
        typeof func === 'function' && func();
      }, wait);
    }

  }
};var _default =
throttle;exports.default = _default;

/***/ }),

/***/ 35:
/*!*****************************************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/uview-ui/libs/config/config.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 此版本发布于2020-08-25
var version = '1.6.5';var _default =

{
  v: version,
  version: version,
  // 主题名称
  type: [
  'primary',
  'success',
  'info',
  'error',
  'warning'] };exports.default = _default;

/***/ }),

/***/ 36:
/*!*****************************************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/uview-ui/libs/config/zIndex.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // uniapp在H5中各API的z-index值如下：
/**
 * actionsheet: 999
 * modal: 999
 * navigate: 998
 * tabbar: 998
 * toast: 999
 */var _default =

{
  toast: 10090,
  noNetwork: 10080,
  // popup包含popup，actionsheet，keyboard，picker的值
  popup: 10075,
  mask: 10070,
  navbar: 980,
  topTips: 975,
  sticky: 970,
  indexListSticky: 965 };exports.default = _default;

/***/ }),

/***/ 4:
/*!*********************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/pages.json ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 43:
/*!****************************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/common/mock.mp.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
  * better-mock v0.2.6 (mock.mp.js)
  * (c) 2019-2020 lavyun@163.com
  * Released under the MIT License.
  */

(function (global, factory) {
   true ? module.exports = factory() :
  undefined;
})(this, function () {'use strict';

  var constant = {
    GUID: 1,
    RE_KEY: /(.+)\|(?:\+(\d+)|([\+\-]?\d+-?[\+\-]?\d*)?(?:\.(\d+-?\d*))?)/,
    RE_RANGE: /([\+\-]?\d+)-?([\+\-]?\d+)?/,
    RE_PLACEHOLDER: /\\*@([^@#%&()\?\s]+)(?:\((.*?)\))?/g };


  /* type-coverage:ignore-next-line */
  var _type = function type(value) {
    return isDef(value) ?
    Object.prototype.toString.call(value).match(/\[object (\w+)\]/)[1].toLowerCase() :
    String(value);
  };
  var isDef = function isDef(value) {
    return value !== undefined && value !== null;
  };
  var isString = function isString(value) {
    return _type(value) === 'string';
  };
  var isNumber = function isNumber(value) {
    return _type(value) === 'number';
  };
  var isObject = function isObject(value) {
    return _type(value) === 'object';
  };
  var isArray = function isArray(value) {
    return _type(value) === 'array';
  };
  var isRegExp = function isRegExp(value) {
    return _type(value) === 'regexp';
  };
  var isFunction = function isFunction(value) {
    return _type(value) === 'function';
  };
  var keys = function keys(obj) {
    var keys = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  var values = function values(obj) {
    var values = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        values.push(obj[key]);
      }
    }
    return values;
  };
  /**
      * Mock.heredoc(fn)
      * 以直观、安全的方式书写（多行）HTML 模板。
      * http://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
      */
  var heredoc = function heredoc(fn) {
    // 1. 移除起始的 function(){ /*!
    // 2. 移除末尾的 */ }
    // 3. 移除起始和末尾的空格
    return fn.
    toString().
    replace(/^[^\/]+\/\*!?/, '').
    replace(/\*\/[^\/]+$/, '').
    replace(/^[\s\xA0]+/, '').
    replace(/[\s\xA0]+$/, ''); // .trim()
  };
  var noop = function noop() {};
  var assert = function assert(condition, error) {
    if (!condition) {
      throw new Error('[better-mock] ' + error);
    }
  };
  /**
      * 创建一个自定义事件，兼容 IE
      * @param type 一个字符串，表示事件名称。
      * @param bubbles 一个布尔值，表示该事件能否冒泡。
      * @param cancelable 一个布尔值，表示该事件是否可以取消。
      * @param detail 一个任意类型，传递给事件的自定义数据。
      */
  var createCustomEvent = function createCustomEvent(type, bubbles, cancelable, detail) {
    if (bubbles === void 0) {bubbles = false;}
    if (cancelable === void 0) {cancelable = false;}
    try {
      return new CustomEvent(type, { bubbles: bubbles, cancelable: cancelable, detail: detail });
    }
    catch (e) {
      var event_1 = document.createEvent('CustomEvent');
      event_1.initCustomEvent(type, bubbles, cancelable, detail);
      return event_1;
    }
  };

  var Util = /*#__PURE__*/Object.freeze({
    type: _type,
    isDef: isDef,
    isString: isString,
    isNumber: isNumber,
    isObject: isObject,
    isArray: isArray,
    isRegExp: isRegExp,
    isFunction: isFunction,
    keys: keys,
    values: values,
    heredoc: heredoc,
    noop: noop,
    assert: assert,
    createCustomEvent: createCustomEvent });


  /*! *****************************************************************************
                                             Copyright (c) Microsoft Corporation. All rights reserved.
                                             Licensed under the Apache License, Version 2.0 (the "License"); you may not use
                                             this file except in compliance with the License. You may obtain a copy of the
                                             License at http://www.apache.org/licenses/LICENSE-2.0
                                               THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
                                             KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
                                             WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
                                             MERCHANTABLITY OR NON-INFRINGEMENT.
                                               See the Apache Version 2.0 License for specific language governing permissions
                                             and limitations under the License.
                                             ***************************************************************************** */



  var _assign = function __assign() {
    _assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];}
      }
      return t;
    };
    return _assign.apply(this, arguments);
  };

  function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) {s += arguments[i].length;}
    for (var r = Array(s), k = 0, i = 0; i < il; i++) {
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
        r[k] = a[j];}}
    return r;
  }

  var MAX_NATURE_NUMBER = 9007199254740992;
  var MIN_NATURE_NUMBER = -9007199254740992;
  // 返回一个随机的布尔值。
  var _boolean = function _boolean(min, max, current) {
    if (min === void 0) {min = 1;}
    if (max === void 0) {max = 1;}
    if (isDef(current)) {
      if (isDef(min)) {
        min = !isNaN(min) ? parseInt(min.toString(), 10) : 1;
      }
      if (isDef(max)) {
        max = !isNaN(max) ? parseInt(max.toString(), 10) : 1;
      }
      return Math.random() > 1.0 / (min + max) * min ? !current : current;
    }
    return Math.random() >= 0.5;
  };
  var bool = _boolean;
  // 返回一个随机的自然数（大于等于 0 的整数）。
  var natural = function natural(min, max) {
    if (min === void 0) {min = 0;}
    if (max === void 0) {max = MAX_NATURE_NUMBER;}
    min = parseInt(min.toString(), 10);
    max = parseInt(max.toString(), 10);
    return Math.round(Math.random() * (max - min)) + min;
  };
  // 返回一个随机的整数。
  var integer = function integer(min, max) {
    if (min === void 0) {min = MIN_NATURE_NUMBER;}
    if (max === void 0) {max = MAX_NATURE_NUMBER;}
    min = parseInt(min.toString(), 10);
    max = parseInt(max.toString(), 10);
    return Math.round(Math.random() * (max - min)) + min;
  };
  var _int = integer;
  // 返回一个随机的浮点数。
  var _float = function _float(min, max, dmin, dmax) {
    dmin = isDef(dmin) ? dmin : 0;
    dmin = Math.max(Math.min(dmin, 17), 0);
    dmax = isDef(dmax) ? dmax : 17;
    dmax = Math.max(Math.min(dmax, 17), 0);
    var ret = integer(min, max) + '.';
    for (var i = 0, dcount = natural(dmin, dmax); i < dcount; i++) {
      // 最后一位不能为 0：如果最后一位为 0，会被 JS 引擎忽略掉。
      var num = i < dcount - 1 ? character('number') : character('123456789');
      ret += num;
    }
    return parseFloat(ret);
  };
  // 返回一个随机字符。
  var character = function character(pool) {
    if (pool === void 0) {pool = '';}
    var lower = 'abcdefghijklmnopqrstuvwxyz';
    var upper = lower.toUpperCase();
    var number = '0123456789';
    var symbol = '!@#$%^&*()[]';
    var pools = {
      lower: lower,
      upper: upper,
      number: number,
      symbol: symbol,
      alpha: lower + upper };

    if (!pool) {
      pool = lower + upper + number + symbol;
    } else
    {
      pool = pools[pool.toLowerCase()] || pool;
    }
    return pool.charAt(natural(0, pool.length - 1));
  };
  var _char = character;
  // 返回一个随机字符串。
  var string = function string(pool, min, max) {
    var len;
    switch (arguments.length) {
      case 0: // ()
        len = natural(3, 7);
        break;
      case 1: // ( length )
        len = pool;
        pool = undefined;
        break;
      case 2:
        // ( pool, length )
        if (typeof arguments[0] === 'string') {
          len = min;
        } else
        {
          // ( min, max )
          len = natural(pool, min);
          pool = undefined;
        }
        break;
      case 3:
        len = natural(min, max);
        break;}

    var text = '';
    for (var i = 0; i < len; i++) {
      text += character(pool);
    }
    return text;
  };
  var str = string;
  // 返回一个整型数组。
  var range = function range(start, stop, step) {
    if (step === void 0) {step = 1;}
    // range( stop )
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    start = +start;
    stop = +stop;
    step = +step;
    var idx = 0;
    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var range = new Array(len);
    while (idx < len) {
      range[idx++] = start;
      start += step;
    }
    return range;
  };

  var basic = /*#__PURE__*/Object.freeze({
    boolean: _boolean,
    bool: bool,
    natural: natural,
    integer: integer,
    int: _int,
    float: _float,
    character: character,
    char: _char,
    string: string,
    str: str,
    range: range });


  // Date
  var _padZero = function _padZero(value) {
    return value < 10 ? '0' + value : value.toString();
  };
  var patternLetters = {
    yyyy: 'getFullYear',
    yy: function yy(date) {
      return date.getFullYear().toString().slice(2);
    },
    y: 'yy',
    MM: function MM(date) {
      return _padZero(date.getMonth() + 1);
    },
    M: function M(date) {
      return (date.getMonth() + 1).toString();
    },
    dd: function dd(date) {
      return _padZero(date.getDate());
    },
    d: 'getDate',
    HH: function HH(date) {
      return _padZero(date.getHours());
    },
    H: 'getHours',
    hh: function hh(date) {
      return _padZero(date.getHours() % 12);
    },
    h: function h(date) {
      return (date.getHours() % 12).toString();
    },
    mm: function mm(date) {
      return _padZero(date.getMinutes());
    },
    m: 'getMinutes',
    ss: function ss(date) {
      return _padZero(date.getSeconds());
    },
    s: 'getSeconds',
    SS: function SS(date) {
      var ms = date.getMilliseconds();
      return ms < 10 && '00' + ms || ms < 100 && '0' + ms || ms.toString();
    },
    S: 'getMilliseconds',
    A: function A(date) {
      return date.getHours() < 12 ? 'AM' : 'PM';
    },
    a: function a(date) {
      return date.getHours() < 12 ? 'am' : 'pm';
    },
    T: 'getTime' };

  var _createFormatRE = function _createFormatRE() {
    var re = keys(patternLetters);
    return '(' + re.join('|') + ')';
  };
  var _formatDate = function _formatDate(date, format) {
    var formatRE = new RegExp(_createFormatRE(), 'g');
    return format.replace(formatRE, function createNewSubString($0, flag) {
      return typeof patternLetters[flag] === 'function' ?
      patternLetters[flag](date) :
      patternLetters[flag] in patternLetters ?
      createNewSubString($0, patternLetters[flag]) :
      date[patternLetters[flag]]();
    });
  };
  // 生成一个随机的 Date 对象。
  var _randomDate = function _randomDate(min, max) {
    if (min === void 0) {min = new Date(0);}
    if (max === void 0) {max = new Date();}
    var randomTS = Math.random() * (max.getTime() - min.getTime());
    return new Date(randomTS);
  };
  // 返回一个随机的日期字符串。
  var date = function date(format) {
    if (format === void 0) {format = 'yyyy-MM-dd';}
    return _formatDate(_randomDate(), format);
  };
  // 返回一个随机的时间字符串。
  var time = function time(format) {
    if (format === void 0) {format = 'HH:mm:ss';}
    return _formatDate(_randomDate(), format);
  };
  // 返回一个随机的日期和时间字符串。
  var datetime = function datetime(format) {
    if (format === void 0) {format = 'yyyy-MM-dd HH:mm:ss';}
    return _formatDate(_randomDate(), format);
  };
  // 返回一个随机的时间戳
  var timestamp = function timestamp() {
    return Number(_formatDate(_randomDate(), 'T'));
  };
  // 返回当前的日期和时间字符串。
  var now = function now(unit, format) {
    // now(unit) now(format)
    if (arguments.length === 1) {
      // now(format)
      if (!/year|month|day|hour|minute|second|week/.test(unit)) {
        format = unit;
        unit = '';
      }
    }
    unit = (unit || '').toLowerCase();
    format = format || 'yyyy-MM-dd HH:mm:ss';
    var date = new Date();
    // 参考自 http://momentjs.cn/docs/#/manipulating/start-of/
    switch (unit) {
      case 'year':
        date.setMonth(0);
        break;
      case 'month':
        date.setDate(1);
        break;
      case 'week':
        date.setDate(date.getDate() - date.getDay());
        break;
      case 'day':
        date.setHours(0);
        break;
      case 'hour':
        date.setMinutes(0);
        break;
      case 'minute':
        date.setSeconds(0);
        break;
      case 'second':
        date.setMilliseconds(0);}

    return _formatDate(date, format);
  };

  var date$1 = /*#__PURE__*/Object.freeze({
    date: date,
    time: time,
    datetime: datetime,
    timestamp: timestamp,
    now: now });


  // 把字符串的第一个字母转换为大写。
  var capitalize = function capitalize(word) {
    word = word + '';
    return word.charAt(0).toUpperCase() + word.substr(1);
  };
  // 把字符串转换为大写。
  var upper = function upper(str) {
    return (str + '').toUpperCase();
  };
  // 把字符串转换为小写。
  var lower = function lower(str) {
    return (str + '').toLowerCase();
  };
  // 从数组中随机选取一个元素，并返回。
  var pick = function pick(arr, min, max) {
    // pick( item1, item2 ... )
    if (!isArray(arr)) {
      arr = [].slice.call(arguments);
      min = 1;
      max = 1;
    } else
    {
      // pick( [ item1, item2 ... ] )
      if (!isDef(min)) {
        min = 1;
      }
      // pick( [ item1, item2 ... ], count )
      if (!isDef(max)) {
        max = min;
      }
    }
    if (min === 1 && max === 1) {
      return arr[natural(0, arr.length - 1)];
    }
    // pick( [ item1, item2 ... ], min, max )
    return shuffle(arr, min, max);
  };
  // 从map中随机选择一个
  var pickMap = function pickMap(map) {
    return pick(values(map));
  };
  // 打乱数组中元素的顺序，并返回。
  var shuffle = function shuffle(arr, min, max) {
    arr = arr || [];
    var old = arr.slice(0);
    var result = [];
    var index = 0;
    var length = old.length;
    for (var i = 0; i < length; i++) {
      index = natural(0, old.length - 1);
      result.push(old[index]);
      old.splice(index, 1);
    }
    switch (arguments.length) {
      case 0:
      case 1:
        return result;
      case 2:
        max = min;
      // falls through
      case 3:
        min = parseInt(min.toString(), 10);
        max = parseInt(max.toString(), 10);
        return result.slice(0, natural(min, max));}

  };

  var helper = /*#__PURE__*/Object.freeze({
    capitalize: capitalize,
    upper: upper,
    lower: lower,
    pick: pick,
    pickMap: pickMap,
    shuffle: shuffle });


  // image
  // 常见图片尺寸
  var imageSize = [
  '150x100', '300x200', '400x300', '600x450', '800x600',
  '100x150', '200x300', '300x400', '450x600', '600x800',
  '100x100', '200x200', '300x300', '450x450', '600x600'];

  /**
                                                           * 随机生成一个图片，使用：https://dummyimage.com/，例如：
                                                           * https://dummyimage.com/600x400/cc00cc/470047.png&text=hello
                                                           * @param size 图片大小
                                                           * @param background 背景色
                                                           * @param foreground 文字颜色
                                                           * @param format 图片格式
                                                           * @param text 文字
                                                           */
  var image = function image(size, background, foreground, format, text) {
    // Random.image( size, background, foreground, text )
    if (arguments.length === 4) {
      text = format;
      format = undefined;
    }
    // Random.image( size, background, text )
    if (arguments.length === 3) {
      text = foreground;
      foreground = undefined;
    }
    // Random.image( size, text )
    if (arguments.length === 2) {
      text = background;
      background = undefined;
    }
    // Random.image()
    size = size || pick(imageSize);
    if (background && ~background.indexOf('#')) {
      background = background.slice(1);
    }
    if (foreground && ~foreground.indexOf('#')) {
      foreground = foreground.slice(1);
    }
    return 'https://dummyimage.com/' +
    size + (
    background ? '/' + background : '') + (
    foreground ? '/' + foreground : '') + (
    format ? '.' + format : '') + (
    text ? '&text=' + encodeURIComponent(text) : '');
  };
  var img = image;
  /**
                    * 生成一个随机的base64图片
                    * @param size 图片宽高
                    * @param text 图片上的文字
                    */
  var dataImage = function dataImage(size, text) {
    size = size || pick(imageSize);
    var background = pick([
    '#171515', '#e47911', '#183693', '#720e9e', '#c4302b', '#dd4814',
    '#00acee', '#0071c5', '#3d9ae8', '#ec6231', '#003580', '#e51937']);

    var sizes = size.split('x');
    var width = parseInt(sizes[0], 10);
    var height = parseInt(sizes[1], 10);
    assert(isNumber(width) && isNumber(height), 'Invalid size, expected INTxINT, e.g. 300x400');
    {
      // 小程序无法直接生成 base64 图片，返回空字符串
      return '';
    }
  };

  var image$1 = /*#__PURE__*/Object.freeze({
    image: image,
    img: img,
    dataImage: dataImage });


  // 颜色空间RGB与HSV(HSL)的转换
  var hsv2rgb = function hsv2rgb(hsv) {
    var h = hsv[0] / 60;
    var s = hsv[1] / 100;
    var v = hsv[2] / 100;
    var hi = Math.floor(h) % 6;
    var f = h - Math.floor(h);
    var p = 255 * v * (1 - s);
    var q = 255 * v * (1 - s * f);
    var t = 255 * v * (1 - s * (1 - f));
    v = 255 * v;
    switch (hi) {
      case 0:
        return [v, t, p];
      case 1:
        return [q, v, p];
      case 2:
        return [p, v, t];
      case 3:
        return [p, q, v];
      case 4:
        return [t, p, v];
      case 5:
        return [v, p, q];}

  };
  var hsv2hsl = function hsv2hsl(hsv) {
    var h = hsv[0],s = hsv[1] / 100,v = hsv[2] / 100,sl,l;
    l = (2 - s) * v;
    sl = s * v;
    sl /= l <= 1 ? l : 2 - l;
    l /= 2;
    return [h, sl * 100, l * 100];
  };
  // http://www.140byt.es/keywords/color
  var rgb2hex = function rgb2hex(a, // red, as a number from 0 to 255
  b, // green, as a number from 0 to 255
  c // blue, as a number from 0 to 255
  ) {
    return "#" + ((256 + a << 8 | b) << 8 | c).toString(16).slice(1);
  };

  // 颜色相关
  var colorMap = {
    navy: '#001F3F',
    blue: '#0074D9',
    aqua: '#7FDBFF',
    teal: '#39CCCC',
    olive: '#3D9970',
    green: '#2ECC40',
    lime: '#01FF70',
    yellow: '#FFDC00',
    orange: '#FF851B',
    red: '#FF4136',
    maroon: '#85144B',
    fuchsia: '#F012BE',
    purple: '#B10DC9',
    silver: '#DDDDDD',
    gray: '#AAAAAA',
    black: '#111111',
    white: '#FFFFFF' };

  // 随机生成一个有吸引力的颜色，格式为 '#RRGGBB'。
  var color = function color(name) {
    if (name === void 0) {name = '';}
    if (name && colorMap[name]) {
      return colorMap[name];
    }
    return hex();
  };
  // #DAC0DE
  var hex = function hex() {
    var hsv = _goldenRatioColor();
    var rgb = hsv2rgb(hsv);
    return rgb2hex(rgb[0], rgb[1], rgb[2]);
  };
  // rgb(128,255,255)
  var rgb = function rgb() {
    var hsv = _goldenRatioColor();
    var rgb = hsv2rgb(hsv);
    return 'rgb(' +
    parseInt(rgb[0].toString(), 10) + ', ' +
    parseInt(rgb[1].toString(), 10) + ', ' +
    parseInt(rgb[2].toString(), 10) + ')';
  };
  // rgba(128,255,255,0.3)
  var rgba = function rgba() {
    var hsv = _goldenRatioColor();
    var rgb = hsv2rgb(hsv);
    return 'rgba(' +
    parseInt(rgb[0].toString(), 10) + ', ' +
    parseInt(rgb[1].toString(), 10) + ', ' +
    parseInt(rgb[2].toString(), 10) + ', ' +
    Math.random().toFixed(2) + ')';
  };
  // hsl(300,80%,90%)
  var hsl = function hsl() {
    var hsv = _goldenRatioColor();
    var hsl = hsv2hsl(hsv);
    return 'hsl(' +
    parseInt(hsl[0], 10) + ', ' +
    parseInt(hsl[1], 10) + ', ' +
    parseInt(hsl[2], 10) + ')';
  };
  // http://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
  // https://github.com/devongovett/color-generator/blob/master/index.js
  // 随机生成一个有吸引力的颜色。
  var _hue = 0;
  var _goldenRatioColor = function _goldenRatioColor(saturation, value) {
    var _goldenRatio = 0.618033988749895;
    _hue = _hue || Math.random();
    _hue += _goldenRatio;
    _hue %= 1;
    if (typeof saturation !== "number")
    saturation = 0.5;
    if (typeof value !== "number")
    value = 0.95;
    return [
    _hue * 360,
    saturation * 100,
    value * 100];

  };

  var color$1 = /*#__PURE__*/Object.freeze({
    color: color,
    hex: hex,
    rgb: rgb,
    rgba: rgba,
    hsl: hsl });


  var _range = function _range(defaultMin, defaultMax, min, max) {
    return !isDef(min) ?
    natural(defaultMin, defaultMax) :
    !isDef(max) ?
    min :
    natural(parseInt(min.toString(), 10), parseInt(max.toString(), 10)); // ( min, max )
  };
  // 随机生成一段文本。
  var paragraph = function paragraph(min, max) {
    var len = _range(3, 7, min, max);
    var result = [];
    for (var i = 0; i < len; i++) {
      result.push(sentence());
    }
    return result.join(' ');
  };
  var cparagraph = function cparagraph(min, max) {
    var len = _range(3, 7, min, max);
    var result = [];
    for (var i = 0; i < len; i++) {
      result.push(csentence());
    }
    return result.join('');
  };
  // 随机生成一个句子，第一个单词的首字母大写。
  var sentence = function sentence(min, max) {
    var len = _range(12, 18, min, max);
    var result = [];
    for (var i = 0; i < len; i++) {
      result.push(word());
    }
    return capitalize(result.join(' ')) + '.';
  };
  // 随机生成一个中文句子。
  var csentence = function csentence(min, max) {
    var len = _range(12, 18, min, max);
    var result = [];
    for (var i = 0; i < len; i++) {
      result.push(cword());
    }
    return result.join('') + '。';
  };
  // 随机生成一个单词。
  var word = function word(min, max) {
    var len = _range(3, 10, min, max);
    var result = '';
    for (var i = 0; i < len; i++) {
      result += character('lower');
    }
    return result;
  };
  // 随机生成一个或多个汉字。
  var cword = function cword(pool, min, max) {
    if (pool === void 0) {pool = '';}
    // 最常用的 500 个汉字 http://baike.baidu.com/view/568436.htm
    var DICT_HANZI = '的一是在不了有和人这中大为上个国我以要他时来用们生到作地于出就分对成会可主发年动同工也能下过子说产种面而方后多定行学法所民得经十三之进着等部度家电力里如水化高自二理起小物现实加量都两体制机当使点从业本去把性好应开它合还因由其些然前外天政四日那社义事平形相全表间样与关各重新线内数正心反你明看原又么利比或但质气第向道命此变条只没结解问意建月公无系军很情者最立代想已通并提直题党程展五果料象员革位入常文总次品式活设及管特件长求老头基资边流路级少图山统接知较将组见计别她手角期根论运农指几九区强放决西被干做必战先回则任取据处队南给色光门即保治北造百规热领七海口东导器压志世金增争济阶油思术极交受联什认六共权收证改清己美再采转更单风切打白教速花带安场身车例真务具万每目至达走积示议声报斗完类八离华名确才科张信马节话米整空元况今集温传土许步群广石记需段研界拉林律叫且究观越织装影算低持音众书布复容儿须际商非验连断深难近矿千周委素技备半办青省列习响约支般史感劳便团往酸历市克何除消构府称太准精值号率族维划选标写存候毛亲快效斯院查江型眼王按格养易置派层片始却专状育厂京识适属圆包火住调满县局照参红细引听该铁价严龙飞';
    var len;
    switch (arguments.length) {
      case 0: // ()
        pool = DICT_HANZI;
        len = 1;
        break;
      case 1: // ( pool )
        if (typeof arguments[0] === 'string') {
          len = 1;
        } else
        {
          // ( length )
          len = pool;
          pool = DICT_HANZI;
        }
        break;
      case 2:
        // ( pool, length )
        if (typeof arguments[0] === 'string') {
          len = min;
        } else
        {
          // ( min, max )
          len = natural(parseInt(pool, 10), min);
          pool = DICT_HANZI;
        }
        break;
      case 3:
        len = natural(min, max);
        break;}

    var result = '';
    for (var i = 0; i < len; i++) {
      result += pool.charAt(natural(0, pool.length - 1));
    }
    return result;
  };
  // 随机生成一句标题，其中每个单词的首字母大写。
  var title = function title(min, max) {
    var len = _range(3, 7, min, max);
    var result = [];
    for (var i = 0; i < len; i++) {
      result.push(capitalize(word()));
    }
    return result.join(' ');
  };
  // 随机生成一句中文标题。
  var ctitle = function ctitle(min, max) {
    var len = _range(3, 7, min, max);
    var result = [];
    for (var i = 0; i < len; i++) {
      result.push(cword());
    }
    return result.join('');
  };

  var text = /*#__PURE__*/Object.freeze({
    paragraph: paragraph,
    cparagraph: cparagraph,
    sentence: sentence,
    csentence: csentence,
    word: word,
    cword: cword,
    title: title,
    ctitle: ctitle });


  // 随机生成一个常见的英文名。
  var first = function first() {
    var male = [
    "James", "John", "Robert", "Michael", "William",
    "David", "Richard", "Charles", "Joseph", "Thomas",
    "Christopher", "Daniel", "Paul", "Mark", "Donald",
    "George", "Kenneth", "Steven", "Edward", "Brian",
    "Ronald", "Anthony", "Kevin", "Jason", "Matthew",
    "Gary", "Timothy", "Jose", "Larry", "Jeffrey",
    "Frank", "Scott", "Eric"];

    var female = [
    "Mary", "Patricia", "Linda", "Barbara", "Elizabeth",
    "Jennifer", "Maria", "Susan", "Margaret", "Dorothy",
    "Lisa", "Nancy", "Karen", "Betty", "Helen",
    "Sandra", "Donna", "Carol", "Ruth", "Sharon",
    "Michelle", "Laura", "Sarah", "Kimberly", "Deborah",
    "Jessica", "Shirley", "Cynthia", "Angela", "Melissa",
    "Brenda", "Amy", "Anna"];

    return pick(__spreadArrays(male, female));
  };
  // 随机生成一个常见的英文姓。
  var last = function last() {
    var names = [
    "Smith", "Johnson", "Williams", "Brown", "Jones",
    "Miller", "Davis", "Garcia", "Rodriguez", "Wilson",
    "Martinez", "Anderson", "Taylor", "Thomas", "Hernandez",
    "Moore", "Martin", "Jackson", "Thompson", "White",
    "Lopez", "Lee", "Gonzalez", "Harris", "Clark",
    "Lewis", "Robinson", "Walker", "Perez", "Hall",
    "Young", "Allen"];

    return pick(names);
  };
  // 随机生成一个常见的英文姓名。
  var name = function name(middle) {
    if (middle === void 0) {middle = false;}
    return first() + ' ' + (middle ? first() + ' ' : '') + last();
  };
  // 随机生成一个常见的中文姓。
  // [世界常用姓氏排行](http://baike.baidu.com/view/1719115.htm)
  // [玄派网 - 网络小说创作辅助平台](http://xuanpai.sinaapp.com/)
  var cfirst = function cfirst() {
    var names = [
    "王", "李", "张", "刘", "陈", "杨", "赵", "黄",
    "周", "吴", "徐", "孙", "胡", "朱", "高", "林",
    "何", "郭", "马", "罗", "梁", "宋", "郑", "谢",
    "韩", "唐", "冯", "于", "董", "萧", "程", "曹",
    "袁", "邓", "许", "傅", "沈", "曾", "彭", "吕",
    "苏", "卢", "蒋", "蔡", "贾", "丁", "魏", "薛",
    "叶", "阎", "余", "潘", "杜", "戴", "夏", "锺",
    "汪", "田", "任", "姜", "范", "方", "石", "姚",
    "谭", "廖", "邹", "熊", "金", "陆", "郝", "孔",
    "白", "崔", "康", "毛", "邱", "秦", "江", "史",
    "顾", "侯", "邵", "孟", "龙", "万", "段", "雷",
    "钱", "汤", "尹", "黎", "易", "常", "武", "乔",
    "贺", "赖", "龚", "文"];

    return pick(names);
  };
  // 随机生成一个常见的中文名。
  // [中国最常见名字前50名_三九算命网](http://www.name999.net/xingming/xingshi/20131004/48.html)
  var clast = function clast() {
    var names = [
    "伟", "芳", "娜", "秀英", "敏", "静", "丽", "强",
    "磊", "军", "洋", "勇", "艳", "杰", "娟", "涛",
    "明", "超", "秀兰", "霞", "平", "刚", "桂英"];

    return pick(names);
  };
  // 随机生成一个常见的中文姓名。
  var cname = function cname() {
    return cfirst() + clast();
  };

  var name$1 = /*#__PURE__*/Object.freeze({
    first: first,
    last: last,
    name: name,
    cfirst: cfirst,
    clast: clast,
    cname: cname });


  // 随机生成一个 URL。
  var url = function url(_protocol, host) {
    if (_protocol === void 0) {_protocol = protocol();}
    if (host === void 0) {host = domain();}
    return _protocol + "://" + host + "/" + word();
  };
  // 随机生成一个 URL 协议。
  var protocol = function protocol() {
    // 协议簇
    var protocols = [
    'http', 'ftp', 'gopher', 'mailto', 'mid', 'cid', 'news', 'nntp',
    'prospero', 'telnet', 'rlogin', 'tn3270', 'wais'];

    return pick(protocols);
  };
  // 随机生成一个域名。
  var domain = function domain(_tld) {
    if (_tld === void 0) {_tld = tld();}
    return word() + '.' + _tld;
  };
  // 随机生成一个顶级域名。
  // [域名后缀大全](http://www.163ns.com/zixun/post/4417.html)
  var tld = function tld() {
    var tlds = (
    // 域名后缀
    'com net org edu gov int mil cn ' +
    // 国内域名
    'com.cn net.cn gov.cn org.cn ' +
    // 中文国内域名
    '中国 中国互联.公司 中国互联.网络 ' +
    // 新国际域名
    'tel biz cc tv info name hk mobi asia cd travel pro museum coop aero ' +
    // 世界各国域名后缀
    'ad ae af ag ai al am an ao aq ar as at au aw az ba bb bd be bf bg bh bi bj bm bn bo br bs bt bv bw by bz ca cc cf cg ch ci ck cl cm cn co cq cr cu cv cx cy cz de dj dk dm do dz ec ee eg eh es et ev fi fj fk fm fo fr ga gb gd ge gf gh gi gl gm gn gp gr gt gu gw gy hk hm hn hr ht hu id ie il in io iq ir is it jm jo jp ke kg kh ki km kn kp kr kw ky kz la lb lc li lk lr ls lt lu lv ly ma mc md mg mh ml mm mn mo mp mq mr ms mt mv mw mx my mz na nc ne nf ng ni nl no np nr nt nu nz om qa pa pe pf pg ph pk pl pm pn pr pt pw py re ro ru rw sa sb sc sd se sg sh si sj sk sl sm sn so sr st su sy sz tc td tf tg th tj tk tm tn to tp tr tt tv tw tz ua ug uk us uy va vc ve vg vn vu wf ws ye yu za zm zr zw').split(' ');
    return pick(tlds);
  };
  // 随机生成一个邮件地址。
  var email = function email(_domain) {
    if (_domain === void 0) {_domain = domain();}
    return character('lower') + '.' + word() + '@' + _domain;
  };
  // 随机生成一个 IP 地址。
  var ip = function ip() {
    return natural(0, 255) + '.' +
    natural(0, 255) + '.' +
    natural(0, 255) + '.' +
    natural(0, 255);
  };

  var web = /*#__PURE__*/Object.freeze({
    url: url,
    protocol: protocol,
    domain: domain,
    tld: tld,
    email: email,
    ip: ip });


  var location = {
    "110000": {
      code: "110000",
      name: "北京市",
      cities: {
        "110000": {
          code: "110000",
          name: "北京市",
          districts: {
            "110101": "东城区",
            "110102": "西城区",
            "110105": "朝阳区",
            "110106": "丰台区",
            "110107": "石景山区",
            "110108": "海淀区",
            "110109": "门头沟区",
            "110111": "房山区",
            "110112": "通州区",
            "110113": "顺义区",
            "110114": "昌平区",
            "110115": "大兴区",
            "110116": "怀柔区",
            "110117": "平谷区",
            "110118": "密云区",
            "110119": "延庆区" } } } },




    "120000": {
      code: "120000",
      name: "天津市",
      cities: {
        "120000": {
          code: "120000",
          name: "天津市",
          districts: {
            "120101": "和平区",
            "120102": "河东区",
            "120103": "河西区",
            "120104": "南开区",
            "120105": "河北区",
            "120106": "红桥区",
            "120110": "东丽区",
            "120111": "西青区",
            "120112": "津南区",
            "120113": "北辰区",
            "120114": "武清区",
            "120115": "宝坻区",
            "120116": "滨海新区",
            "120117": "宁河区",
            "120118": "静海区",
            "120119": "蓟州区" } } } },




    "130000": {
      code: "130000",
      name: "河北省",
      cities: {
        "130100": {
          code: "130100",
          name: "石家庄市",
          districts: {
            "130102": "长安区",
            "130104": "桥西区",
            "130105": "新华区",
            "130107": "井陉矿区",
            "130108": "裕华区",
            "130109": "藁城区",
            "130110": "鹿泉区",
            "130111": "栾城区",
            "130121": "井陉县",
            "130123": "正定县",
            "130125": "行唐县",
            "130126": "灵寿县",
            "130127": "高邑县",
            "130128": "深泽县",
            "130129": "赞皇县",
            "130130": "无极县",
            "130131": "平山县",
            "130132": "元氏县",
            "130133": "赵县",
            "130181": "辛集市",
            "130183": "晋州市",
            "130184": "新乐市" } },


        "130200": {
          code: "130200",
          name: "唐山市",
          districts: {
            "130202": "路南区",
            "130203": "路北区",
            "130204": "古冶区",
            "130205": "开平区",
            "130207": "丰南区",
            "130208": "丰润区",
            "130209": "曹妃甸区",
            "130224": "滦南县",
            "130225": "乐亭县",
            "130227": "迁西县",
            "130229": "玉田县",
            "130281": "遵化市",
            "130283": "迁安市",
            "130284": "滦州市" } },


        "130300": {
          code: "130300",
          name: "秦皇岛市",
          districts: {
            "130302": "海港区",
            "130303": "山海关区",
            "130304": "北戴河区",
            "130306": "抚宁区",
            "130321": "青龙满族自治县",
            "130322": "昌黎县",
            "130324": "卢龙县" } },


        "130400": {
          code: "130400",
          name: "邯郸市",
          districts: {
            "130402": "邯山区",
            "130403": "丛台区",
            "130404": "复兴区",
            "130406": "峰峰矿区",
            "130407": "肥乡区",
            "130408": "永年区",
            "130423": "临漳县",
            "130424": "成安县",
            "130425": "大名县",
            "130426": "涉县",
            "130427": "磁县",
            "130430": "邱县",
            "130431": "鸡泽县",
            "130432": "广平县",
            "130433": "馆陶县",
            "130434": "魏县",
            "130435": "曲周县",
            "130481": "武安市" } },


        "130500": {
          code: "130500",
          name: "邢台市",
          districts: {
            "130502": "桥东区",
            "130503": "桥西区",
            "130521": "邢台县",
            "130522": "临城县",
            "130523": "内丘县",
            "130524": "柏乡县",
            "130525": "隆尧县",
            "130526": "任县",
            "130527": "南和县",
            "130528": "宁晋县",
            "130529": "巨鹿县",
            "130530": "新河县",
            "130531": "广宗县",
            "130532": "平乡县",
            "130533": "威县",
            "130534": "清河县",
            "130535": "临西县",
            "130581": "南宫市",
            "130582": "沙河市" } },


        "130600": {
          code: "130600",
          name: "保定市",
          districts: {
            "130602": "竞秀区",
            "130606": "莲池区",
            "130607": "满城区",
            "130608": "清苑区",
            "130609": "徐水区",
            "130623": "涞水县",
            "130624": "阜平县",
            "130626": "定兴县",
            "130627": "唐县",
            "130628": "高阳县",
            "130629": "容城县",
            "130630": "涞源县",
            "130631": "望都县",
            "130632": "安新县",
            "130633": "易县",
            "130634": "曲阳县",
            "130635": "蠡县",
            "130636": "顺平县",
            "130637": "博野县",
            "130638": "雄县",
            "130681": "涿州市",
            "130682": "定州市",
            "130683": "安国市",
            "130684": "高碑店市" } },


        "130700": {
          code: "130700",
          name: "张家口市",
          districts: {
            "130702": "桥东区",
            "130703": "桥西区",
            "130705": "宣化区",
            "130706": "下花园区",
            "130708": "万全区",
            "130709": "崇礼区",
            "130722": "张北县",
            "130723": "康保县",
            "130724": "沽源县",
            "130725": "尚义县",
            "130726": "蔚县",
            "130727": "阳原县",
            "130728": "怀安县",
            "130730": "怀来县",
            "130731": "涿鹿县",
            "130732": "赤城县" } },


        "130800": {
          code: "130800",
          name: "承德市",
          districts: {
            "130802": "双桥区",
            "130803": "双滦区",
            "130804": "鹰手营子矿区",
            "130821": "承德县",
            "130822": "兴隆县",
            "130824": "滦平县",
            "130825": "隆化县",
            "130826": "丰宁满族自治县",
            "130827": "宽城满族自治县",
            "130828": "围场满族蒙古族自治县",
            "130881": "平泉市" } },


        "130900": {
          code: "130900",
          name: "沧州市",
          districts: {
            "130902": "新华区",
            "130903": "运河区",
            "130921": "沧县",
            "130922": "青县",
            "130923": "东光县",
            "130924": "海兴县",
            "130925": "盐山县",
            "130926": "肃宁县",
            "130927": "南皮县",
            "130928": "吴桥县",
            "130929": "献县",
            "130930": "孟村回族自治县",
            "130981": "泊头市",
            "130982": "任丘市",
            "130983": "黄骅市",
            "130984": "河间市" } },


        "131000": {
          code: "131000",
          name: "廊坊市",
          districts: {
            "131002": "安次区",
            "131003": "广阳区",
            "131022": "固安县",
            "131023": "永清县",
            "131024": "香河县",
            "131025": "大城县",
            "131026": "文安县",
            "131028": "大厂回族自治县",
            "131081": "霸州市",
            "131082": "三河市" } },


        "131100": {
          code: "131100",
          name: "衡水市",
          districts: {
            "131102": "桃城区",
            "131103": "冀州区",
            "131121": "枣强县",
            "131122": "武邑县",
            "131123": "武强县",
            "131124": "饶阳县",
            "131125": "安平县",
            "131126": "故城县",
            "131127": "景县",
            "131128": "阜城县",
            "131182": "深州市" } } } },




    "140000": {
      code: "140000",
      name: "山西省",
      cities: {
        "140100": {
          code: "140100",
          name: "太原市",
          districts: {
            "140105": "小店区",
            "140106": "迎泽区",
            "140107": "杏花岭区",
            "140108": "尖草坪区",
            "140109": "万柏林区",
            "140110": "晋源区",
            "140121": "清徐县",
            "140122": "阳曲县",
            "140123": "娄烦县",
            "140181": "古交市" } },


        "140200": {
          code: "140200",
          name: "大同市",
          districts: {
            "140212": "新荣区",
            "140213": "平城区",
            "140214": "云冈区",
            "140215": "云州区",
            "140221": "阳高县",
            "140222": "天镇县",
            "140223": "广灵县",
            "140224": "灵丘县",
            "140225": "浑源县",
            "140226": "左云县" } },


        "140300": {
          code: "140300",
          name: "阳泉市",
          districts: {
            "140302": "城区",
            "140303": "矿区",
            "140311": "郊区",
            "140321": "平定县",
            "140322": "盂县" } },


        "140400": {
          code: "140400",
          name: "长治市",
          districts: {
            "140403": "潞州区",
            "140404": "上党区",
            "140405": "屯留区",
            "140406": "潞城区",
            "140423": "襄垣县",
            "140425": "平顺县",
            "140426": "黎城县",
            "140427": "壶关县",
            "140428": "长子县",
            "140429": "武乡县",
            "140430": "沁县",
            "140431": "沁源县" } },


        "140500": {
          code: "140500",
          name: "晋城市",
          districts: {
            "140502": "城区",
            "140521": "沁水县",
            "140522": "阳城县",
            "140524": "陵川县",
            "140525": "泽州县",
            "140581": "高平市" } },


        "140600": {
          code: "140600",
          name: "朔州市",
          districts: {
            "140602": "朔城区",
            "140603": "平鲁区",
            "140621": "山阴县",
            "140622": "应县",
            "140623": "右玉县",
            "140681": "怀仁市" } },


        "140700": {
          code: "140700",
          name: "晋中市",
          districts: {
            "140702": "榆次区",
            "140721": "榆社县",
            "140722": "左权县",
            "140723": "和顺县",
            "140724": "昔阳县",
            "140725": "寿阳县",
            "140726": "太谷县",
            "140727": "祁县",
            "140728": "平遥县",
            "140729": "灵石县",
            "140781": "介休市" } },


        "140800": {
          code: "140800",
          name: "运城市",
          districts: {
            "140802": "盐湖区",
            "140821": "临猗县",
            "140822": "万荣县",
            "140823": "闻喜县",
            "140824": "稷山县",
            "140825": "新绛县",
            "140826": "绛县",
            "140827": "垣曲县",
            "140828": "夏县",
            "140829": "平陆县",
            "140830": "芮城县",
            "140881": "永济市",
            "140882": "河津市" } },


        "140900": {
          code: "140900",
          name: "忻州市",
          districts: {
            "140902": "忻府区",
            "140921": "定襄县",
            "140922": "五台县",
            "140923": "代县",
            "140924": "繁峙县",
            "140925": "宁武县",
            "140926": "静乐县",
            "140927": "神池县",
            "140928": "五寨县",
            "140929": "岢岚县",
            "140930": "河曲县",
            "140931": "保德县",
            "140932": "偏关县",
            "140981": "原平市" } },


        "141000": {
          code: "141000",
          name: "临汾市",
          districts: {
            "141002": "尧都区",
            "141021": "曲沃县",
            "141022": "翼城县",
            "141023": "襄汾县",
            "141024": "洪洞县",
            "141025": "古县",
            "141026": "安泽县",
            "141027": "浮山县",
            "141028": "吉县",
            "141029": "乡宁县",
            "141030": "大宁县",
            "141031": "隰县",
            "141032": "永和县",
            "141033": "蒲县",
            "141034": "汾西县",
            "141081": "侯马市",
            "141082": "霍州市" } },


        "141100": {
          code: "141100",
          name: "吕梁市",
          districts: {
            "141102": "离石区",
            "141121": "文水县",
            "141122": "交城县",
            "141123": "兴县",
            "141124": "临县",
            "141125": "柳林县",
            "141126": "石楼县",
            "141127": "岚县",
            "141128": "方山县",
            "141129": "中阳县",
            "141130": "交口县",
            "141181": "孝义市",
            "141182": "汾阳市" } } } },




    "150000": {
      code: "150000",
      name: "内蒙古自治区",
      cities: {
        "150100": {
          code: "150100",
          name: "呼和浩特市",
          districts: {
            "150102": "新城区",
            "150103": "回民区",
            "150104": "玉泉区",
            "150105": "赛罕区",
            "150121": "土默特左旗",
            "150122": "托克托县",
            "150123": "和林格尔县",
            "150124": "清水河县",
            "150125": "武川县" } },


        "150200": {
          code: "150200",
          name: "包头市",
          districts: {
            "150202": "东河区",
            "150203": "昆都仑区",
            "150204": "青山区",
            "150205": "石拐区",
            "150206": "白云鄂博矿区",
            "150207": "九原区",
            "150221": "土默特右旗",
            "150222": "固阳县",
            "150223": "达尔罕茂明安联合旗" } },


        "150300": {
          code: "150300",
          name: "乌海市",
          districts: {
            "150302": "海勃湾区",
            "150303": "海南区",
            "150304": "乌达区" } },


        "150400": {
          code: "150400",
          name: "赤峰市",
          districts: {
            "150402": "红山区",
            "150403": "元宝山区",
            "150404": "松山区",
            "150421": "阿鲁科尔沁旗",
            "150422": "巴林左旗",
            "150423": "巴林右旗",
            "150424": "林西县",
            "150425": "克什克腾旗",
            "150426": "翁牛特旗",
            "150428": "喀喇沁旗",
            "150429": "宁城县",
            "150430": "敖汉旗" } },


        "150500": {
          code: "150500",
          name: "通辽市",
          districts: {
            "150502": "科尔沁区",
            "150521": "科尔沁左翼中旗",
            "150522": "科尔沁左翼后旗",
            "150523": "开鲁县",
            "150524": "库伦旗",
            "150525": "奈曼旗",
            "150526": "扎鲁特旗",
            "150581": "霍林郭勒市" } },


        "150600": {
          code: "150600",
          name: "鄂尔多斯市",
          districts: {
            "150602": "东胜区",
            "150603": "康巴什区",
            "150621": "达拉特旗",
            "150622": "准格尔旗",
            "150623": "鄂托克前旗",
            "150624": "鄂托克旗",
            "150625": "杭锦旗",
            "150626": "乌审旗",
            "150627": "伊金霍洛旗" } },


        "150700": {
          code: "150700",
          name: "呼伦贝尔市",
          districts: {
            "150702": "海拉尔区",
            "150703": "扎赉诺尔区",
            "150721": "阿荣旗",
            "150722": "莫力达瓦达斡尔族自治旗",
            "150723": "鄂伦春自治旗",
            "150724": "鄂温克族自治旗",
            "150725": "陈巴尔虎旗",
            "150726": "新巴尔虎左旗",
            "150727": "新巴尔虎右旗",
            "150781": "满洲里市",
            "150782": "牙克石市",
            "150783": "扎兰屯市",
            "150784": "额尔古纳市",
            "150785": "根河市" } },


        "150800": {
          code: "150800",
          name: "巴彦淖尔市",
          districts: {
            "150802": "临河区",
            "150821": "五原县",
            "150822": "磴口县",
            "150823": "乌拉特前旗",
            "150824": "乌拉特中旗",
            "150825": "乌拉特后旗",
            "150826": "杭锦后旗" } },


        "150900": {
          code: "150900",
          name: "乌兰察布市",
          districts: {
            "150902": "集宁区",
            "150921": "卓资县",
            "150922": "化德县",
            "150923": "商都县",
            "150924": "兴和县",
            "150925": "凉城县",
            "150926": "察哈尔右翼前旗",
            "150927": "察哈尔右翼中旗",
            "150928": "察哈尔右翼后旗",
            "150929": "四子王旗",
            "150981": "丰镇市" } },


        "152200": {
          code: "152200",
          name: "兴安盟",
          districts: {
            "152201": "乌兰浩特市",
            "152202": "阿尔山市",
            "152221": "科尔沁右翼前旗",
            "152222": "科尔沁右翼中旗",
            "152223": "扎赉特旗",
            "152224": "突泉县" } },


        "152500": {
          code: "152500",
          name: "锡林郭勒盟",
          districts: {
            "152501": "二连浩特市",
            "152502": "锡林浩特市",
            "152522": "阿巴嘎旗",
            "152523": "苏尼特左旗",
            "152524": "苏尼特右旗",
            "152525": "东乌珠穆沁旗",
            "152526": "西乌珠穆沁旗",
            "152527": "太仆寺旗",
            "152528": "镶黄旗",
            "152529": "正镶白旗",
            "152530": "正蓝旗",
            "152531": "多伦县" } },


        "152900": {
          code: "152900",
          name: "阿拉善盟",
          districts: {
            "152921": "阿拉善左旗",
            "152922": "阿拉善右旗",
            "152923": "额济纳旗" } } } },




    "210000": {
      code: "210000",
      name: "辽宁省",
      cities: {
        "210100": {
          code: "210100",
          name: "沈阳市",
          districts: {
            "210102": "和平区",
            "210103": "沈河区",
            "210104": "大东区",
            "210105": "皇姑区",
            "210106": "铁西区",
            "210111": "苏家屯区",
            "210112": "浑南区",
            "210113": "沈北新区",
            "210114": "于洪区",
            "210115": "辽中区",
            "210123": "康平县",
            "210124": "法库县",
            "210181": "新民市" } },


        "210200": {
          code: "210200",
          name: "大连市",
          districts: {
            "210202": "中山区",
            "210203": "西岗区",
            "210204": "沙河口区",
            "210211": "甘井子区",
            "210212": "旅顺口区",
            "210213": "金州区",
            "210214": "普兰店区",
            "210224": "长海县",
            "210281": "瓦房店市",
            "210283": "庄河市" } },


        "210300": {
          code: "210300",
          name: "鞍山市",
          districts: {
            "210302": "铁东区",
            "210303": "铁西区",
            "210304": "立山区",
            "210311": "千山区",
            "210321": "台安县",
            "210323": "岫岩满族自治县",
            "210381": "海城市" } },


        "210400": {
          code: "210400",
          name: "抚顺市",
          districts: {
            "210402": "新抚区",
            "210403": "东洲区",
            "210404": "望花区",
            "210411": "顺城区",
            "210421": "抚顺县",
            "210422": "新宾满族自治县",
            "210423": "清原满族自治县" } },


        "210500": {
          code: "210500",
          name: "本溪市",
          districts: {
            "210502": "平山区",
            "210503": "溪湖区",
            "210504": "明山区",
            "210505": "南芬区",
            "210521": "本溪满族自治县",
            "210522": "桓仁满族自治县" } },


        "210600": {
          code: "210600",
          name: "丹东市",
          districts: {
            "210602": "元宝区",
            "210603": "振兴区",
            "210604": "振安区",
            "210624": "宽甸满族自治县",
            "210681": "东港市",
            "210682": "凤城市" } },


        "210700": {
          code: "210700",
          name: "锦州市",
          districts: {
            "210702": "古塔区",
            "210703": "凌河区",
            "210711": "太和区",
            "210726": "黑山县",
            "210727": "义县",
            "210781": "凌海市",
            "210782": "北镇市" } },


        "210800": {
          code: "210800",
          name: "营口市",
          districts: {
            "210802": "站前区",
            "210803": "西市区",
            "210804": "鲅鱼圈区",
            "210811": "老边区",
            "210881": "盖州市",
            "210882": "大石桥市" } },


        "210900": {
          code: "210900",
          name: "阜新市",
          districts: {
            "210902": "海州区",
            "210903": "新邱区",
            "210904": "太平区",
            "210905": "清河门区",
            "210911": "细河区",
            "210921": "阜新蒙古族自治县",
            "210922": "彰武县" } },


        "211000": {
          code: "211000",
          name: "辽阳市",
          districts: {
            "211002": "白塔区",
            "211003": "文圣区",
            "211004": "宏伟区",
            "211005": "弓长岭区",
            "211011": "太子河区",
            "211021": "辽阳县",
            "211081": "灯塔市" } },


        "211100": {
          code: "211100",
          name: "盘锦市",
          districts: {
            "211102": "双台子区",
            "211103": "兴隆台区",
            "211104": "大洼区",
            "211122": "盘山县" } },


        "211200": {
          code: "211200",
          name: "铁岭市",
          districts: {
            "211202": "银州区",
            "211204": "清河区",
            "211221": "铁岭县",
            "211223": "西丰县",
            "211224": "昌图县",
            "211281": "调兵山市",
            "211282": "开原市" } },


        "211300": {
          code: "211300",
          name: "朝阳市",
          districts: {
            "211302": "双塔区",
            "211303": "龙城区",
            "211321": "朝阳县",
            "211322": "建平县",
            "211324": "喀喇沁左翼蒙古族自治县",
            "211381": "北票市",
            "211382": "凌源市" } },


        "211400": {
          code: "211400",
          name: "葫芦岛市",
          districts: {
            "211402": "连山区",
            "211403": "龙港区",
            "211404": "南票区",
            "211421": "绥中县",
            "211422": "建昌县",
            "211481": "兴城市" } } } },




    "220000": {
      code: "220000",
      name: "吉林省",
      cities: {
        "220100": {
          code: "220100",
          name: "长春市",
          districts: {
            "220102": "南关区",
            "220103": "宽城区",
            "220104": "朝阳区",
            "220105": "二道区",
            "220106": "绿园区",
            "220112": "双阳区",
            "220113": "九台区",
            "220122": "农安县",
            "220182": "榆树市",
            "220183": "德惠市" } },


        "220200": {
          code: "220200",
          name: "吉林市",
          districts: {
            "220202": "昌邑区",
            "220203": "龙潭区",
            "220204": "船营区",
            "220211": "丰满区",
            "220221": "永吉县",
            "220281": "蛟河市",
            "220282": "桦甸市",
            "220283": "舒兰市",
            "220284": "磐石市" } },


        "220300": {
          code: "220300",
          name: "四平市",
          districts: {
            "220302": "铁西区",
            "220303": "铁东区",
            "220322": "梨树县",
            "220323": "伊通满族自治县",
            "220381": "公主岭市",
            "220382": "双辽市" } },


        "220400": {
          code: "220400",
          name: "辽源市",
          districts: {
            "220402": "龙山区",
            "220403": "西安区",
            "220421": "东丰县",
            "220422": "东辽县" } },


        "220500": {
          code: "220500",
          name: "通化市",
          districts: {
            "220502": "东昌区",
            "220503": "二道江区",
            "220521": "通化县",
            "220523": "辉南县",
            "220524": "柳河县",
            "220581": "梅河口市",
            "220582": "集安市" } },


        "220600": {
          code: "220600",
          name: "白山市",
          districts: {
            "220602": "浑江区",
            "220605": "江源区",
            "220621": "抚松县",
            "220622": "靖宇县",
            "220623": "长白朝鲜族自治县",
            "220681": "临江市" } },


        "220700": {
          code: "220700",
          name: "松原市",
          districts: {
            "220702": "宁江区",
            "220721": "前郭尔罗斯蒙古族自治县",
            "220722": "长岭县",
            "220723": "乾安县",
            "220781": "扶余市" } },


        "220800": {
          code: "220800",
          name: "白城市",
          districts: {
            "220802": "洮北区",
            "220821": "镇赉县",
            "220822": "通榆县",
            "220881": "洮南市",
            "220882": "大安市" } },


        "222400": {
          code: "222400",
          name: "延边朝鲜族自治州",
          districts: {
            "222401": "延吉市",
            "222402": "图们市",
            "222403": "敦化市",
            "222404": "珲春市",
            "222405": "龙井市",
            "222406": "和龙市",
            "222424": "汪清县",
            "222426": "安图县" } } } },




    "230000": {
      code: "230000",
      name: "黑龙江省",
      cities: {
        "230100": {
          code: "230100",
          name: "哈尔滨市",
          districts: {
            "230102": "道里区",
            "230103": "南岗区",
            "230104": "道外区",
            "230108": "平房区",
            "230109": "松北区",
            "230110": "香坊区",
            "230111": "呼兰区",
            "230112": "阿城区",
            "230113": "双城区",
            "230123": "依兰县",
            "230124": "方正县",
            "230125": "宾县",
            "230126": "巴彦县",
            "230127": "木兰县",
            "230128": "通河县",
            "230129": "延寿县",
            "230183": "尚志市",
            "230184": "五常市" } },


        "230200": {
          code: "230200",
          name: "齐齐哈尔市",
          districts: {
            "230202": "龙沙区",
            "230203": "建华区",
            "230204": "铁锋区",
            "230205": "昂昂溪区",
            "230206": "富拉尔基区",
            "230207": "碾子山区",
            "230208": "梅里斯达斡尔族区",
            "230221": "龙江县",
            "230223": "依安县",
            "230224": "泰来县",
            "230225": "甘南县",
            "230227": "富裕县",
            "230229": "克山县",
            "230230": "克东县",
            "230231": "拜泉县",
            "230281": "讷河市" } },


        "230300": {
          code: "230300",
          name: "鸡西市",
          districts: {
            "230302": "鸡冠区",
            "230303": "恒山区",
            "230304": "滴道区",
            "230305": "梨树区",
            "230306": "城子河区",
            "230307": "麻山区",
            "230321": "鸡东县",
            "230381": "虎林市",
            "230382": "密山市" } },


        "230400": {
          code: "230400",
          name: "鹤岗市",
          districts: {
            "230402": "向阳区",
            "230403": "工农区",
            "230404": "南山区",
            "230405": "兴安区",
            "230406": "东山区",
            "230407": "兴山区",
            "230421": "萝北县",
            "230422": "绥滨县" } },


        "230500": {
          code: "230500",
          name: "双鸭山市",
          districts: {
            "230502": "尖山区",
            "230503": "岭东区",
            "230505": "四方台区",
            "230506": "宝山区",
            "230521": "集贤县",
            "230522": "友谊县",
            "230523": "宝清县",
            "230524": "饶河县" } },


        "230600": {
          code: "230600",
          name: "大庆市",
          districts: {
            "230602": "萨尔图区",
            "230603": "龙凤区",
            "230604": "让胡路区",
            "230605": "红岗区",
            "230606": "大同区",
            "230621": "肇州县",
            "230622": "肇源县",
            "230623": "林甸县",
            "230624": "杜尔伯特蒙古族自治县" } },


        "230700": {
          code: "230700",
          name: "伊春市",
          districts: {
            "230702": "伊春区",
            "230703": "南岔区",
            "230704": "友好区",
            "230705": "西林区",
            "230706": "翠峦区",
            "230707": "新青区",
            "230708": "美溪区",
            "230709": "金山屯区",
            "230710": "五营区",
            "230711": "乌马河区",
            "230712": "汤旺河区",
            "230713": "带岭区",
            "230714": "乌伊岭区",
            "230715": "红星区",
            "230716": "上甘岭区",
            "230722": "嘉荫县",
            "230781": "铁力市" } },


        "230800": {
          code: "230800",
          name: "佳木斯市",
          districts: {
            "230803": "向阳区",
            "230804": "前进区",
            "230805": "东风区",
            "230811": "郊区",
            "230822": "桦南县",
            "230826": "桦川县",
            "230828": "汤原县",
            "230881": "同江市",
            "230882": "富锦市",
            "230883": "抚远市" } },


        "230900": {
          code: "230900",
          name: "七台河市",
          districts: {
            "230902": "新兴区",
            "230903": "桃山区",
            "230904": "茄子河区",
            "230921": "勃利县" } },


        "231000": {
          code: "231000",
          name: "牡丹江市",
          districts: {
            "231002": "东安区",
            "231003": "阳明区",
            "231004": "爱民区",
            "231005": "西安区",
            "231025": "林口县",
            "231081": "绥芬河市",
            "231083": "海林市",
            "231084": "宁安市",
            "231085": "穆棱市",
            "231086": "东宁市" } },


        "231100": {
          code: "231100",
          name: "黑河市",
          districts: {
            "231102": "爱辉区",
            "231121": "嫩江县",
            "231123": "逊克县",
            "231124": "孙吴县",
            "231181": "北安市",
            "231182": "五大连池市" } },


        "231200": {
          code: "231200",
          name: "绥化市",
          districts: {
            "231202": "北林区",
            "231221": "望奎县",
            "231222": "兰西县",
            "231223": "青冈县",
            "231224": "庆安县",
            "231225": "明水县",
            "231226": "绥棱县",
            "231281": "安达市",
            "231282": "肇东市",
            "231283": "海伦市" } },


        "232700": {
          code: "232700",
          name: "大兴安岭地区",
          districts: {
            "232701": "漠河市",
            "232721": "呼玛县",
            "232722": "塔河县" } } } },




    "310000": {
      code: "310000",
      name: "上海市",
      cities: {
        "310000": {
          code: "310000",
          name: "上海市",
          districts: {
            "310101": "黄浦区",
            "310104": "徐汇区",
            "310105": "长宁区",
            "310106": "静安区",
            "310107": "普陀区",
            "310109": "虹口区",
            "310110": "杨浦区",
            "310112": "闵行区",
            "310113": "宝山区",
            "310114": "嘉定区",
            "310115": "浦东新区",
            "310116": "金山区",
            "310117": "松江区",
            "310118": "青浦区",
            "310120": "奉贤区",
            "310151": "崇明区" } } } },




    "320000": {
      code: "320000",
      name: "江苏省",
      cities: {
        "320100": {
          code: "320100",
          name: "南京市",
          districts: {
            "320102": "玄武区",
            "320104": "秦淮区",
            "320105": "建邺区",
            "320106": "鼓楼区",
            "320111": "浦口区",
            "320113": "栖霞区",
            "320114": "雨花台区",
            "320115": "江宁区",
            "320116": "六合区",
            "320117": "溧水区",
            "320118": "高淳区" } },


        "320200": {
          code: "320200",
          name: "无锡市",
          districts: {
            "320205": "锡山区",
            "320206": "惠山区",
            "320211": "滨湖区",
            "320213": "梁溪区",
            "320214": "新吴区",
            "320281": "江阴市",
            "320282": "宜兴市" } },


        "320300": {
          code: "320300",
          name: "徐州市",
          districts: {
            "320302": "鼓楼区",
            "320303": "云龙区",
            "320305": "贾汪区",
            "320311": "泉山区",
            "320312": "铜山区",
            "320321": "丰县",
            "320322": "沛县",
            "320324": "睢宁县",
            "320381": "新沂市",
            "320382": "邳州市" } },


        "320400": {
          code: "320400",
          name: "常州市",
          districts: {
            "320402": "天宁区",
            "320404": "钟楼区",
            "320411": "新北区",
            "320412": "武进区",
            "320413": "金坛区",
            "320481": "溧阳市" } },


        "320500": {
          code: "320500",
          name: "苏州市",
          districts: {
            "320505": "虎丘区",
            "320506": "吴中区",
            "320507": "相城区",
            "320508": "姑苏区",
            "320509": "吴江区",
            "320581": "常熟市",
            "320582": "张家港市",
            "320583": "昆山市",
            "320585": "太仓市" } },


        "320600": {
          code: "320600",
          name: "南通市",
          districts: {
            "320602": "崇川区",
            "320611": "港闸区",
            "320612": "通州区",
            "320623": "如东县",
            "320681": "启东市",
            "320682": "如皋市",
            "320684": "海门市",
            "320685": "海安市" } },


        "320700": {
          code: "320700",
          name: "连云港市",
          districts: {
            "320703": "连云区",
            "320706": "海州区",
            "320707": "赣榆区",
            "320722": "东海县",
            "320723": "灌云县",
            "320724": "灌南县" } },


        "320800": {
          code: "320800",
          name: "淮安市",
          districts: {
            "320803": "淮安区",
            "320804": "淮阴区",
            "320812": "清江浦区",
            "320813": "洪泽区",
            "320826": "涟水县",
            "320830": "盱眙县",
            "320831": "金湖县" } },


        "320900": {
          code: "320900",
          name: "盐城市",
          districts: {
            "320902": "亭湖区",
            "320903": "盐都区",
            "320904": "大丰区",
            "320921": "响水县",
            "320922": "滨海县",
            "320923": "阜宁县",
            "320924": "射阳县",
            "320925": "建湖县",
            "320981": "东台市" } },


        "321000": {
          code: "321000",
          name: "扬州市",
          districts: {
            "321002": "广陵区",
            "321003": "邗江区",
            "321012": "江都区",
            "321023": "宝应县",
            "321081": "仪征市",
            "321084": "高邮市" } },


        "321100": {
          code: "321100",
          name: "镇江市",
          districts: {
            "321102": "京口区",
            "321111": "润州区",
            "321112": "丹徒区",
            "321181": "丹阳市",
            "321182": "扬中市",
            "321183": "句容市" } },


        "321200": {
          code: "321200",
          name: "泰州市",
          districts: {
            "321202": "海陵区",
            "321203": "高港区",
            "321204": "姜堰区",
            "321281": "兴化市",
            "321282": "靖江市",
            "321283": "泰兴市" } },


        "321300": {
          code: "321300",
          name: "宿迁市",
          districts: {
            "321302": "宿城区",
            "321311": "宿豫区",
            "321322": "沭阳县",
            "321323": "泗阳县",
            "321324": "泗洪县" } } } },




    "330000": {
      code: "330000",
      name: "浙江省",
      cities: {
        "330100": {
          code: "330100",
          name: "杭州市",
          districts: {
            "330102": "上城区",
            "330103": "下城区",
            "330104": "江干区",
            "330105": "拱墅区",
            "330106": "西湖区",
            "330108": "滨江区",
            "330109": "萧山区",
            "330110": "余杭区",
            "330111": "富阳区",
            "330112": "临安区",
            "330122": "桐庐县",
            "330127": "淳安县",
            "330182": "建德市" } },


        "330200": {
          code: "330200",
          name: "宁波市",
          districts: {
            "330203": "海曙区",
            "330205": "江北区",
            "330206": "北仑区",
            "330211": "镇海区",
            "330212": "鄞州区",
            "330213": "奉化区",
            "330225": "象山县",
            "330226": "宁海县",
            "330281": "余姚市",
            "330282": "慈溪市" } },


        "330300": {
          code: "330300",
          name: "温州市",
          districts: {
            "330302": "鹿城区",
            "330303": "龙湾区",
            "330304": "瓯海区",
            "330305": "洞头区",
            "330324": "永嘉县",
            "330326": "平阳县",
            "330327": "苍南县",
            "330328": "文成县",
            "330329": "泰顺县",
            "330381": "瑞安市",
            "330382": "乐清市" } },


        "330400": {
          code: "330400",
          name: "嘉兴市",
          districts: {
            "330402": "南湖区",
            "330411": "秀洲区",
            "330421": "嘉善县",
            "330424": "海盐县",
            "330481": "海宁市",
            "330482": "平湖市",
            "330483": "桐乡市" } },


        "330500": {
          code: "330500",
          name: "湖州市",
          districts: {
            "330502": "吴兴区",
            "330503": "南浔区",
            "330521": "德清县",
            "330522": "长兴县",
            "330523": "安吉县" } },


        "330600": {
          code: "330600",
          name: "绍兴市",
          districts: {
            "330602": "越城区",
            "330603": "柯桥区",
            "330604": "上虞区",
            "330624": "新昌县",
            "330681": "诸暨市",
            "330683": "嵊州市" } },


        "330700": {
          code: "330700",
          name: "金华市",
          districts: {
            "330702": "婺城区",
            "330703": "金东区",
            "330723": "武义县",
            "330726": "浦江县",
            "330727": "磐安县",
            "330781": "兰溪市",
            "330782": "义乌市",
            "330783": "东阳市",
            "330784": "永康市" } },


        "330800": {
          code: "330800",
          name: "衢州市",
          districts: {
            "330802": "柯城区",
            "330803": "衢江区",
            "330822": "常山县",
            "330824": "开化县",
            "330825": "龙游县",
            "330881": "江山市" } },


        "330900": {
          code: "330900",
          name: "舟山市",
          districts: {
            "330902": "定海区",
            "330903": "普陀区",
            "330921": "岱山县",
            "330922": "嵊泗县" } },


        "331000": {
          code: "331000",
          name: "台州市",
          districts: {
            "331002": "椒江区",
            "331003": "黄岩区",
            "331004": "路桥区",
            "331022": "三门县",
            "331023": "天台县",
            "331024": "仙居县",
            "331081": "温岭市",
            "331082": "临海市",
            "331083": "玉环市" } },


        "331100": {
          code: "331100",
          name: "丽水市",
          districts: {
            "331102": "莲都区",
            "331121": "青田县",
            "331122": "缙云县",
            "331123": "遂昌县",
            "331124": "松阳县",
            "331125": "云和县",
            "331126": "庆元县",
            "331127": "景宁畲族自治县",
            "331181": "龙泉市" } } } },




    "340000": {
      code: "340000",
      name: "安徽省",
      cities: {
        "340100": {
          code: "340100",
          name: "合肥市",
          districts: {
            "340102": "瑶海区",
            "340103": "庐阳区",
            "340104": "蜀山区",
            "340111": "包河区",
            "340121": "长丰县",
            "340122": "肥东县",
            "340123": "肥西县",
            "340124": "庐江县",
            "340181": "巢湖市" } },


        "340200": {
          code: "340200",
          name: "芜湖市",
          districts: {
            "340202": "镜湖区",
            "340203": "弋江区",
            "340207": "鸠江区",
            "340208": "三山区",
            "340221": "芜湖县",
            "340222": "繁昌县",
            "340223": "南陵县",
            "340225": "无为县" } },


        "340300": {
          code: "340300",
          name: "蚌埠市",
          districts: {
            "340302": "龙子湖区",
            "340303": "蚌山区",
            "340304": "禹会区",
            "340311": "淮上区",
            "340321": "怀远县",
            "340322": "五河县",
            "340323": "固镇县" } },


        "340400": {
          code: "340400",
          name: "淮南市",
          districts: {
            "340402": "大通区",
            "340403": "田家庵区",
            "340404": "谢家集区",
            "340405": "八公山区",
            "340406": "潘集区",
            "340421": "凤台县",
            "340422": "寿县" } },


        "340500": {
          code: "340500",
          name: "马鞍山市",
          districts: {
            "340503": "花山区",
            "340504": "雨山区",
            "340506": "博望区",
            "340521": "当涂县",
            "340522": "含山县",
            "340523": "和县" } },


        "340600": {
          code: "340600",
          name: "淮北市",
          districts: {
            "340602": "杜集区",
            "340603": "相山区",
            "340604": "烈山区",
            "340621": "濉溪县" } },


        "340700": {
          code: "340700",
          name: "铜陵市",
          districts: {
            "340705": "铜官区",
            "340706": "义安区",
            "340711": "郊区",
            "340722": "枞阳县" } },


        "340800": {
          code: "340800",
          name: "安庆市",
          districts: {
            "340802": "迎江区",
            "340803": "大观区",
            "340811": "宜秀区",
            "340822": "怀宁县",
            "340825": "太湖县",
            "340826": "宿松县",
            "340827": "望江县",
            "340828": "岳西县",
            "340881": "桐城市",
            "340882": "潜山市" } },


        "341000": {
          code: "341000",
          name: "黄山市",
          districts: {
            "341002": "屯溪区",
            "341003": "黄山区",
            "341004": "徽州区",
            "341021": "歙县",
            "341022": "休宁县",
            "341023": "黟县",
            "341024": "祁门县" } },


        "341100": {
          code: "341100",
          name: "滁州市",
          districts: {
            "341102": "琅琊区",
            "341103": "南谯区",
            "341122": "来安县",
            "341124": "全椒县",
            "341125": "定远县",
            "341126": "凤阳县",
            "341181": "天长市",
            "341182": "明光市" } },


        "341200": {
          code: "341200",
          name: "阜阳市",
          districts: {
            "341202": "颍州区",
            "341203": "颍东区",
            "341204": "颍泉区",
            "341221": "临泉县",
            "341222": "太和县",
            "341225": "阜南县",
            "341226": "颍上县",
            "341282": "界首市" } },


        "341300": {
          code: "341300",
          name: "宿州市",
          districts: {
            "341302": "埇桥区",
            "341321": "砀山县",
            "341322": "萧县",
            "341323": "灵璧县",
            "341324": "泗县" } },


        "341500": {
          code: "341500",
          name: "六安市",
          districts: {
            "341502": "金安区",
            "341503": "裕安区",
            "341504": "叶集区",
            "341522": "霍邱县",
            "341523": "舒城县",
            "341524": "金寨县",
            "341525": "霍山县" } },


        "341600": {
          code: "341600",
          name: "亳州市",
          districts: {
            "341602": "谯城区",
            "341621": "涡阳县",
            "341622": "蒙城县",
            "341623": "利辛县" } },


        "341700": {
          code: "341700",
          name: "池州市",
          districts: {
            "341702": "贵池区",
            "341721": "东至县",
            "341722": "石台县",
            "341723": "青阳县" } },


        "341800": {
          code: "341800",
          name: "宣城市",
          districts: {
            "341802": "宣州区",
            "341821": "郎溪县",
            "341822": "广德县",
            "341823": "泾县",
            "341824": "绩溪县",
            "341825": "旌德县",
            "341881": "宁国市" } } } },




    "350000": {
      code: "350000",
      name: "福建省",
      cities: {
        "350100": {
          code: "350100",
          name: "福州市",
          districts: {
            "350102": "鼓楼区",
            "350103": "台江区",
            "350104": "仓山区",
            "350105": "马尾区",
            "350111": "晋安区",
            "350112": "长乐区",
            "350121": "闽侯县",
            "350122": "连江县",
            "350123": "罗源县",
            "350124": "闽清县",
            "350125": "永泰县",
            "350128": "平潭县",
            "350181": "福清市" } },


        "350200": {
          code: "350200",
          name: "厦门市",
          districts: {
            "350203": "思明区",
            "350205": "海沧区",
            "350206": "湖里区",
            "350211": "集美区",
            "350212": "同安区",
            "350213": "翔安区" } },


        "350300": {
          code: "350300",
          name: "莆田市",
          districts: {
            "350302": "城厢区",
            "350303": "涵江区",
            "350304": "荔城区",
            "350305": "秀屿区",
            "350322": "仙游县" } },


        "350400": {
          code: "350400",
          name: "三明市",
          districts: {
            "350402": "梅列区",
            "350403": "三元区",
            "350421": "明溪县",
            "350423": "清流县",
            "350424": "宁化县",
            "350425": "大田县",
            "350426": "尤溪县",
            "350427": "沙县",
            "350428": "将乐县",
            "350429": "泰宁县",
            "350430": "建宁县",
            "350481": "永安市" } },


        "350500": {
          code: "350500",
          name: "泉州市",
          districts: {
            "350502": "鲤城区",
            "350503": "丰泽区",
            "350504": "洛江区",
            "350505": "泉港区",
            "350521": "惠安县",
            "350524": "安溪县",
            "350525": "永春县",
            "350526": "德化县",
            "350527": "金门县",
            "350581": "石狮市",
            "350582": "晋江市",
            "350583": "南安市" } },


        "350600": {
          code: "350600",
          name: "漳州市",
          districts: {
            "350602": "芗城区",
            "350603": "龙文区",
            "350622": "云霄县",
            "350623": "漳浦县",
            "350624": "诏安县",
            "350625": "长泰县",
            "350626": "东山县",
            "350627": "南靖县",
            "350628": "平和县",
            "350629": "华安县",
            "350681": "龙海市" } },


        "350700": {
          code: "350700",
          name: "南平市",
          districts: {
            "350702": "延平区",
            "350703": "建阳区",
            "350721": "顺昌县",
            "350722": "浦城县",
            "350723": "光泽县",
            "350724": "松溪县",
            "350725": "政和县",
            "350781": "邵武市",
            "350782": "武夷山市",
            "350783": "建瓯市" } },


        "350800": {
          code: "350800",
          name: "龙岩市",
          districts: {
            "350802": "新罗区",
            "350803": "永定区",
            "350821": "长汀县",
            "350823": "上杭县",
            "350824": "武平县",
            "350825": "连城县",
            "350881": "漳平市" } },


        "350900": {
          code: "350900",
          name: "宁德市",
          districts: {
            "350902": "蕉城区",
            "350921": "霞浦县",
            "350922": "古田县",
            "350923": "屏南县",
            "350924": "寿宁县",
            "350925": "周宁县",
            "350926": "柘荣县",
            "350981": "福安市",
            "350982": "福鼎市" } } } },




    "360000": {
      code: "360000",
      name: "江西省",
      cities: {
        "360100": {
          code: "360100",
          name: "南昌市",
          districts: {
            "360102": "东湖区",
            "360103": "西湖区",
            "360104": "青云谱区",
            "360105": "湾里区",
            "360111": "青山湖区",
            "360112": "新建区",
            "360121": "南昌县",
            "360123": "安义县",
            "360124": "进贤县" } },


        "360200": {
          code: "360200",
          name: "景德镇市",
          districts: {
            "360202": "昌江区",
            "360203": "珠山区",
            "360222": "浮梁县",
            "360281": "乐平市" } },


        "360300": {
          code: "360300",
          name: "萍乡市",
          districts: {
            "360302": "安源区",
            "360313": "湘东区",
            "360321": "莲花县",
            "360322": "上栗县",
            "360323": "芦溪县" } },


        "360400": {
          code: "360400",
          name: "九江市",
          districts: {
            "360402": "濂溪区",
            "360403": "浔阳区",
            "360404": "柴桑区",
            "360423": "武宁县",
            "360424": "修水县",
            "360425": "永修县",
            "360426": "德安县",
            "360428": "都昌县",
            "360429": "湖口县",
            "360430": "彭泽县",
            "360481": "瑞昌市",
            "360482": "共青城市",
            "360483": "庐山市" } },


        "360500": {
          code: "360500",
          name: "新余市",
          districts: {
            "360502": "渝水区",
            "360521": "分宜县" } },


        "360600": {
          code: "360600",
          name: "鹰潭市",
          districts: {
            "360602": "月湖区",
            "360603": "余江区",
            "360681": "贵溪市" } },


        "360700": {
          code: "360700",
          name: "赣州市",
          districts: {
            "360702": "章贡区",
            "360703": "南康区",
            "360704": "赣县区",
            "360722": "信丰县",
            "360723": "大余县",
            "360724": "上犹县",
            "360725": "崇义县",
            "360726": "安远县",
            "360727": "龙南县",
            "360728": "定南县",
            "360729": "全南县",
            "360730": "宁都县",
            "360731": "于都县",
            "360732": "兴国县",
            "360733": "会昌县",
            "360734": "寻乌县",
            "360735": "石城县",
            "360781": "瑞金市" } },


        "360800": {
          code: "360800",
          name: "吉安市",
          districts: {
            "360802": "吉州区",
            "360803": "青原区",
            "360821": "吉安县",
            "360822": "吉水县",
            "360823": "峡江县",
            "360824": "新干县",
            "360825": "永丰县",
            "360826": "泰和县",
            "360827": "遂川县",
            "360828": "万安县",
            "360829": "安福县",
            "360830": "永新县",
            "360881": "井冈山市" } },


        "360900": {
          code: "360900",
          name: "宜春市",
          districts: {
            "360902": "袁州区",
            "360921": "奉新县",
            "360922": "万载县",
            "360923": "上高县",
            "360924": "宜丰县",
            "360925": "靖安县",
            "360926": "铜鼓县",
            "360981": "丰城市",
            "360982": "樟树市",
            "360983": "高安市" } },


        "361000": {
          code: "361000",
          name: "抚州市",
          districts: {
            "361002": "临川区",
            "361003": "东乡区",
            "361021": "南城县",
            "361022": "黎川县",
            "361023": "南丰县",
            "361024": "崇仁县",
            "361025": "乐安县",
            "361026": "宜黄县",
            "361027": "金溪县",
            "361028": "资溪县",
            "361030": "广昌县" } },


        "361100": {
          code: "361100",
          name: "上饶市",
          districts: {
            "361102": "信州区",
            "361103": "广丰区",
            "361121": "上饶县",
            "361123": "玉山县",
            "361124": "铅山县",
            "361125": "横峰县",
            "361126": "弋阳县",
            "361127": "余干县",
            "361128": "鄱阳县",
            "361129": "万年县",
            "361130": "婺源县",
            "361181": "德兴市" } } } },




    "370000": {
      code: "370000",
      name: "山东省",
      cities: {
        "370100": {
          code: "370100",
          name: "济南市",
          districts: {
            "370102": "历下区",
            "370103": "市中区",
            "370104": "槐荫区",
            "370105": "天桥区",
            "370112": "历城区",
            "370113": "长清区",
            "370114": "章丘区",
            "370115": "济阳区",
            "370116": "莱芜区",
            "370117": "钢城区",
            "370124": "平阴县",
            "370126": "商河县" } },


        "370200": {
          code: "370200",
          name: "青岛市",
          districts: {
            "370202": "市南区",
            "370203": "市北区",
            "370211": "黄岛区",
            "370212": "崂山区",
            "370213": "李沧区",
            "370214": "城阳区",
            "370215": "即墨区",
            "370281": "胶州市",
            "370283": "平度市",
            "370285": "莱西市" } },


        "370300": {
          code: "370300",
          name: "淄博市",
          districts: {
            "370302": "淄川区",
            "370303": "张店区",
            "370304": "博山区",
            "370305": "临淄区",
            "370306": "周村区",
            "370321": "桓台县",
            "370322": "高青县",
            "370323": "沂源县" } },


        "370400": {
          code: "370400",
          name: "枣庄市",
          districts: {
            "370402": "市中区",
            "370403": "薛城区",
            "370404": "峄城区",
            "370405": "台儿庄区",
            "370406": "山亭区",
            "370481": "滕州市" } },


        "370500": {
          code: "370500",
          name: "东营市",
          districts: {
            "370502": "东营区",
            "370503": "河口区",
            "370505": "垦利区",
            "370522": "利津县",
            "370523": "广饶县" } },


        "370600": {
          code: "370600",
          name: "烟台市",
          districts: {
            "370602": "芝罘区",
            "370611": "福山区",
            "370612": "牟平区",
            "370613": "莱山区",
            "370614": "蓬莱区",
            "370681": "龙口市",
            "370682": "莱阳市",
            "370683": "莱州市",
            "370684": "蓬莱市",
            "370685": "招远市",
            "370686": "栖霞市",
            "370687": "海阳市" } },


        "370700": {
          code: "370700",
          name: "潍坊市",
          districts: {
            "370702": "潍城区",
            "370703": "寒亭区",
            "370704": "坊子区",
            "370705": "奎文区",
            "370724": "临朐县",
            "370725": "昌乐县",
            "370781": "青州市",
            "370782": "诸城市",
            "370783": "寿光市",
            "370784": "安丘市",
            "370785": "高密市",
            "370786": "昌邑市" } },


        "370800": {
          code: "370800",
          name: "济宁市",
          districts: {
            "370811": "任城区",
            "370812": "兖州区",
            "370826": "微山县",
            "370827": "鱼台县",
            "370828": "金乡县",
            "370829": "嘉祥县",
            "370830": "汶上县",
            "370831": "泗水县",
            "370832": "梁山县",
            "370881": "曲阜市",
            "370883": "邹城市" } },


        "370900": {
          code: "370900",
          name: "泰安市",
          districts: {
            "370902": "泰山区",
            "370911": "岱岳区",
            "370921": "宁阳县",
            "370923": "东平县",
            "370982": "新泰市",
            "370983": "肥城市" } },


        "371000": {
          code: "371000",
          name: "威海市",
          districts: {
            "371002": "环翠区",
            "371003": "文登区",
            "371082": "荣成市",
            "371083": "乳山市" } },


        "371100": {
          code: "371100",
          name: "日照市",
          districts: {
            "371102": "东港区",
            "371103": "岚山区",
            "371121": "五莲县",
            "371122": "莒县" } },


        "371300": {
          code: "371300",
          name: "临沂市",
          districts: {
            "371302": "兰山区",
            "371311": "罗庄区",
            "371312": "河东区",
            "371321": "沂南县",
            "371322": "郯城县",
            "371323": "沂水县",
            "371324": "兰陵县",
            "371325": "费县",
            "371326": "平邑县",
            "371327": "莒南县",
            "371328": "蒙阴县",
            "371329": "临沭县" } },


        "371400": {
          code: "371400",
          name: "德州市",
          districts: {
            "371402": "德城区",
            "371403": "陵城区",
            "371422": "宁津县",
            "371423": "庆云县",
            "371424": "临邑县",
            "371425": "齐河县",
            "371426": "平原县",
            "371427": "夏津县",
            "371428": "武城县",
            "371481": "乐陵市",
            "371482": "禹城市" } },


        "371500": {
          code: "371500",
          name: "聊城市",
          districts: {
            "371502": "东昌府区",
            "371521": "阳谷县",
            "371522": "莘县",
            "371523": "茌平县",
            "371524": "东阿县",
            "371525": "冠县",
            "371526": "高唐县",
            "371581": "临清市" } },


        "371600": {
          code: "371600",
          name: "滨州市",
          districts: {
            "371602": "滨城区",
            "371603": "沾化区",
            "371621": "惠民县",
            "371622": "阳信县",
            "371623": "无棣县",
            "371625": "博兴县",
            "371681": "邹平市" } },


        "371700": {
          code: "371700",
          name: "菏泽市",
          districts: {
            "371702": "牡丹区",
            "371703": "定陶区",
            "371721": "曹县",
            "371722": "单县",
            "371723": "成武县",
            "371724": "巨野县",
            "371725": "郓城县",
            "371726": "鄄城县",
            "371728": "东明县" } } } },




    "410000": {
      code: "410000",
      name: "河南省",
      cities: {
        "410100": {
          code: "410100",
          name: "郑州市",
          districts: {
            "410102": "中原区",
            "410103": "二七区",
            "410104": "管城回族区",
            "410105": "金水区",
            "410106": "上街区",
            "410108": "惠济区",
            "410122": "中牟县",
            "410181": "巩义市",
            "410182": "荥阳市",
            "410183": "新密市",
            "410184": "新郑市",
            "410185": "登封市" } },


        "410200": {
          code: "410200",
          name: "开封市",
          districts: {
            "410202": "龙亭区",
            "410203": "顺河回族区",
            "410204": "鼓楼区",
            "410205": "禹王台区",
            "410212": "祥符区",
            "410221": "杞县",
            "410222": "通许县",
            "410223": "尉氏县",
            "410225": "兰考县" } },


        "410300": {
          code: "410300",
          name: "洛阳市",
          districts: {
            "410302": "老城区",
            "410303": "西工区",
            "410304": "瀍河回族区",
            "410305": "涧西区",
            "410306": "吉利区",
            "410311": "洛龙区",
            "410322": "孟津县",
            "410323": "新安县",
            "410324": "栾川县",
            "410325": "嵩县",
            "410326": "汝阳县",
            "410327": "宜阳县",
            "410328": "洛宁县",
            "410329": "伊川县",
            "410381": "偃师市" } },


        "410400": {
          code: "410400",
          name: "平顶山市",
          districts: {
            "410402": "新华区",
            "410403": "卫东区",
            "410404": "石龙区",
            "410411": "湛河区",
            "410421": "宝丰县",
            "410422": "叶县",
            "410423": "鲁山县",
            "410425": "郏县",
            "410481": "舞钢市",
            "410482": "汝州市" } },


        "410500": {
          code: "410500",
          name: "安阳市",
          districts: {
            "410502": "文峰区",
            "410503": "北关区",
            "410505": "殷都区",
            "410506": "龙安区",
            "410522": "安阳县",
            "410523": "汤阴县",
            "410526": "滑县",
            "410527": "内黄县",
            "410581": "林州市" } },


        "410600": {
          code: "410600",
          name: "鹤壁市",
          districts: {
            "410602": "鹤山区",
            "410603": "山城区",
            "410611": "淇滨区",
            "410621": "浚县",
            "410622": "淇县" } },


        "410700": {
          code: "410700",
          name: "新乡市",
          districts: {
            "410702": "红旗区",
            "410703": "卫滨区",
            "410704": "凤泉区",
            "410711": "牧野区",
            "410721": "新乡县",
            "410724": "获嘉县",
            "410725": "原阳县",
            "410726": "延津县",
            "410727": "封丘县",
            "410728": "长垣县",
            "410781": "卫辉市",
            "410782": "辉县市" } },


        "410800": {
          code: "410800",
          name: "焦作市",
          districts: {
            "410802": "解放区",
            "410803": "中站区",
            "410804": "马村区",
            "410811": "山阳区",
            "410821": "修武县",
            "410822": "博爱县",
            "410823": "武陟县",
            "410825": "温县",
            "410882": "沁阳市",
            "410883": "孟州市" } },


        "410900": {
          code: "410900",
          name: "濮阳市",
          districts: {
            "410902": "华龙区",
            "410922": "清丰县",
            "410923": "南乐县",
            "410926": "范县",
            "410927": "台前县",
            "410928": "濮阳县" } },


        "411000": {
          code: "411000",
          name: "许昌市",
          districts: {
            "411002": "魏都区",
            "411003": "建安区",
            "411024": "鄢陵县",
            "411025": "襄城县",
            "411081": "禹州市",
            "411082": "长葛市" } },


        "411100": {
          code: "411100",
          name: "漯河市",
          districts: {
            "411102": "源汇区",
            "411103": "郾城区",
            "411104": "召陵区",
            "411121": "舞阳县",
            "411122": "临颍县" } },


        "411200": {
          code: "411200",
          name: "三门峡市",
          districts: {
            "411202": "湖滨区",
            "411203": "陕州区",
            "411221": "渑池县",
            "411224": "卢氏县",
            "411281": "义马市",
            "411282": "灵宝市" } },


        "411300": {
          code: "411300",
          name: "南阳市",
          districts: {
            "411302": "宛城区",
            "411303": "卧龙区",
            "411321": "南召县",
            "411322": "方城县",
            "411323": "西峡县",
            "411324": "镇平县",
            "411325": "内乡县",
            "411326": "淅川县",
            "411327": "社旗县",
            "411328": "唐河县",
            "411329": "新野县",
            "411330": "桐柏县",
            "411381": "邓州市" } },


        "411400": {
          code: "411400",
          name: "商丘市",
          districts: {
            "411402": "梁园区",
            "411403": "睢阳区",
            "411421": "民权县",
            "411422": "睢县",
            "411423": "宁陵县",
            "411424": "柘城县",
            "411425": "虞城县",
            "411426": "夏邑县",
            "411481": "永城市" } },


        "411500": {
          code: "411500",
          name: "信阳市",
          districts: {
            "411502": "浉河区",
            "411503": "平桥区",
            "411521": "罗山县",
            "411522": "光山县",
            "411523": "新县",
            "411524": "商城县",
            "411525": "固始县",
            "411526": "潢川县",
            "411527": "淮滨县",
            "411528": "息县" } },


        "411600": {
          code: "411600",
          name: "周口市",
          districts: {
            "411602": "川汇区",
            "411621": "扶沟县",
            "411622": "西华县",
            "411623": "商水县",
            "411624": "沈丘县",
            "411625": "郸城县",
            "411626": "淮阳县",
            "411627": "太康县",
            "411628": "鹿邑县",
            "411681": "项城市" } },


        "411700": {
          code: "411700",
          name: "驻马店市",
          districts: {
            "411702": "驿城区",
            "411721": "西平县",
            "411722": "上蔡县",
            "411723": "平舆县",
            "411724": "正阳县",
            "411725": "确山县",
            "411726": "泌阳县",
            "411727": "汝南县",
            "411728": "遂平县",
            "411729": "新蔡县" } } } },




    "420000": {
      code: "420000",
      name: "湖北省",
      cities: {
        "420100": {
          code: "420100",
          name: "武汉市",
          districts: {
            "420102": "江岸区",
            "420103": "江汉区",
            "420104": "硚口区",
            "420105": "汉阳区",
            "420106": "武昌区",
            "420107": "青山区",
            "420111": "洪山区",
            "420112": "东西湖区",
            "420113": "汉南区",
            "420114": "蔡甸区",
            "420115": "江夏区",
            "420116": "黄陂区",
            "420117": "新洲区" } },


        "420200": {
          code: "420200",
          name: "黄石市",
          districts: {
            "420202": "黄石港区",
            "420203": "西塞山区",
            "420204": "下陆区",
            "420205": "铁山区",
            "420222": "阳新县",
            "420281": "大冶市" } },


        "420300": {
          code: "420300",
          name: "十堰市",
          districts: {
            "420302": "茅箭区",
            "420303": "张湾区",
            "420304": "郧阳区",
            "420322": "郧西县",
            "420323": "竹山县",
            "420324": "竹溪县",
            "420325": "房县",
            "420381": "丹江口市" } },


        "420500": {
          code: "420500",
          name: "宜昌市",
          districts: {
            "420502": "西陵区",
            "420503": "伍家岗区",
            "420504": "点军区",
            "420505": "猇亭区",
            "420506": "夷陵区",
            "420525": "远安县",
            "420526": "兴山县",
            "420527": "秭归县",
            "420528": "长阳土家族自治县",
            "420529": "五峰土家族自治县",
            "420581": "宜都市",
            "420582": "当阳市",
            "420583": "枝江市" } },


        "420600": {
          code: "420600",
          name: "襄阳市",
          districts: {
            "420602": "襄城区",
            "420606": "樊城区",
            "420607": "襄州区",
            "420624": "南漳县",
            "420625": "谷城县",
            "420626": "保康县",
            "420682": "老河口市",
            "420683": "枣阳市",
            "420684": "宜城市" } },


        "420700": {
          code: "420700",
          name: "鄂州市",
          districts: {
            "420702": "梁子湖区",
            "420703": "华容区",
            "420704": "鄂城区" } },


        "420800": {
          code: "420800",
          name: "荆门市",
          districts: {
            "420802": "东宝区",
            "420804": "掇刀区",
            "420822": "沙洋县",
            "420881": "钟祥市",
            "420882": "京山市" } },


        "420900": {
          code: "420900",
          name: "孝感市",
          districts: {
            "420902": "孝南区",
            "420921": "孝昌县",
            "420922": "大悟县",
            "420923": "云梦县",
            "420981": "应城市",
            "420982": "安陆市",
            "420984": "汉川市" } },


        "421000": {
          code: "421000",
          name: "荆州市",
          districts: {
            "421002": "沙市区",
            "421003": "荆州区",
            "421022": "公安县",
            "421023": "监利县",
            "421024": "江陵县",
            "421081": "石首市",
            "421083": "洪湖市",
            "421087": "松滋市" } },


        "421100": {
          code: "421100",
          name: "黄冈市",
          districts: {
            "421102": "黄州区",
            "421121": "团风县",
            "421122": "红安县",
            "421123": "罗田县",
            "421124": "英山县",
            "421125": "浠水县",
            "421126": "蕲春县",
            "421127": "黄梅县",
            "421181": "麻城市",
            "421182": "武穴市" } },


        "421200": {
          code: "421200",
          name: "咸宁市",
          districts: {
            "421202": "咸安区",
            "421221": "嘉鱼县",
            "421222": "通城县",
            "421223": "崇阳县",
            "421224": "通山县",
            "421281": "赤壁市" } },


        "421300": {
          code: "421300",
          name: "随州市",
          districts: {
            "421303": "曾都区",
            "421321": "随县",
            "421381": "广水市" } },


        "422800": {
          code: "422800",
          name: "恩施土家族苗族自治州",
          districts: {
            "422801": "恩施市",
            "422802": "利川市",
            "422822": "建始县",
            "422823": "巴东县",
            "422825": "宣恩县",
            "422826": "咸丰县",
            "422827": "来凤县",
            "422828": "鹤峰县" } } } },




    "430000": {
      code: "430000",
      name: "湖南省",
      cities: {
        "430100": {
          code: "430100",
          name: "长沙市",
          districts: {
            "430102": "芙蓉区",
            "430103": "天心区",
            "430104": "岳麓区",
            "430105": "开福区",
            "430111": "雨花区",
            "430112": "望城区",
            "430121": "长沙县",
            "430181": "浏阳市",
            "430182": "宁乡市" } },


        "430200": {
          code: "430200",
          name: "株洲市",
          districts: {
            "430202": "荷塘区",
            "430203": "芦淞区",
            "430204": "石峰区",
            "430211": "天元区",
            "430212": "渌口区",
            "430223": "攸县",
            "430224": "茶陵县",
            "430225": "炎陵县",
            "430281": "醴陵市" } },


        "430300": {
          code: "430300",
          name: "湘潭市",
          districts: {
            "430302": "雨湖区",
            "430304": "岳塘区",
            "430321": "湘潭县",
            "430381": "湘乡市",
            "430382": "韶山市" } },


        "430400": {
          code: "430400",
          name: "衡阳市",
          districts: {
            "430405": "珠晖区",
            "430406": "雁峰区",
            "430407": "石鼓区",
            "430408": "蒸湘区",
            "430412": "南岳区",
            "430421": "衡阳县",
            "430422": "衡南县",
            "430423": "衡山县",
            "430424": "衡东县",
            "430426": "祁东县",
            "430481": "耒阳市",
            "430482": "常宁市" } },


        "430500": {
          code: "430500",
          name: "邵阳市",
          districts: {
            "430502": "双清区",
            "430503": "大祥区",
            "430511": "北塔区",
            "430521": "邵东县",
            "430522": "新邵县",
            "430523": "邵阳县",
            "430524": "隆回县",
            "430525": "洞口县",
            "430527": "绥宁县",
            "430528": "新宁县",
            "430529": "城步苗族自治县",
            "430581": "武冈市" } },


        "430600": {
          code: "430600",
          name: "岳阳市",
          districts: {
            "430602": "岳阳楼区",
            "430603": "云溪区",
            "430611": "君山区",
            "430621": "岳阳县",
            "430623": "华容县",
            "430624": "湘阴县",
            "430626": "平江县",
            "430681": "汨罗市",
            "430682": "临湘市" } },


        "430700": {
          code: "430700",
          name: "常德市",
          districts: {
            "430702": "武陵区",
            "430703": "鼎城区",
            "430721": "安乡县",
            "430722": "汉寿县",
            "430723": "澧县",
            "430724": "临澧县",
            "430725": "桃源县",
            "430726": "石门县",
            "430781": "津市市" } },


        "430800": {
          code: "430800",
          name: "张家界市",
          districts: {
            "430802": "永定区",
            "430811": "武陵源区",
            "430821": "慈利县",
            "430822": "桑植县" } },


        "430900": {
          code: "430900",
          name: "益阳市",
          districts: {
            "430902": "资阳区",
            "430903": "赫山区",
            "430921": "南县",
            "430922": "桃江县",
            "430923": "安化县",
            "430981": "沅江市" } },


        "431000": {
          code: "431000",
          name: "郴州市",
          districts: {
            "431002": "北湖区",
            "431003": "苏仙区",
            "431021": "桂阳县",
            "431022": "宜章县",
            "431023": "永兴县",
            "431024": "嘉禾县",
            "431025": "临武县",
            "431026": "汝城县",
            "431027": "桂东县",
            "431028": "安仁县",
            "431081": "资兴市" } },


        "431100": {
          code: "431100",
          name: "永州市",
          districts: {
            "431102": "零陵区",
            "431103": "冷水滩区",
            "431121": "祁阳县",
            "431122": "东安县",
            "431123": "双牌县",
            "431124": "道县",
            "431125": "江永县",
            "431126": "宁远县",
            "431127": "蓝山县",
            "431128": "新田县",
            "431129": "江华瑶族自治县" } },


        "431200": {
          code: "431200",
          name: "怀化市",
          districts: {
            "431202": "鹤城区",
            "431221": "中方县",
            "431222": "沅陵县",
            "431223": "辰溪县",
            "431224": "溆浦县",
            "431225": "会同县",
            "431226": "麻阳苗族自治县",
            "431227": "新晃侗族自治县",
            "431228": "芷江侗族自治县",
            "431229": "靖州苗族侗族自治县",
            "431230": "通道侗族自治县",
            "431281": "洪江市" } },


        "431300": {
          code: "431300",
          name: "娄底市",
          districts: {
            "431302": "娄星区",
            "431321": "双峰县",
            "431322": "新化县",
            "431381": "冷水江市",
            "431382": "涟源市" } },


        "433100": {
          code: "433100",
          name: "湘西土家族苗族自治州",
          districts: {
            "433101": "吉首市",
            "433122": "泸溪县",
            "433123": "凤凰县",
            "433124": "花垣县",
            "433125": "保靖县",
            "433126": "古丈县",
            "433127": "永顺县",
            "433130": "龙山县" } } } },




    "440000": {
      code: "440000",
      name: "广东省",
      cities: {
        "440100": {
          code: "440100",
          name: "广州市",
          districts: {
            "440103": "荔湾区",
            "440104": "越秀区",
            "440105": "海珠区",
            "440106": "天河区",
            "440111": "白云区",
            "440112": "黄埔区",
            "440113": "番禺区",
            "440114": "花都区",
            "440115": "南沙区",
            "440117": "从化区",
            "440118": "增城区" } },


        "440200": {
          code: "440200",
          name: "韶关市",
          districts: {
            "440203": "武江区",
            "440204": "浈江区",
            "440205": "曲江区",
            "440222": "始兴县",
            "440224": "仁化县",
            "440229": "翁源县",
            "440232": "乳源瑶族自治县",
            "440233": "新丰县",
            "440281": "乐昌市",
            "440282": "南雄市" } },


        "440300": {
          code: "440300",
          name: "深圳市",
          districts: {
            "440303": "罗湖区",
            "440304": "福田区",
            "440305": "南山区",
            "440306": "宝安区",
            "440307": "龙岗区",
            "440308": "盐田区",
            "440309": "龙华区",
            "440310": "坪山区",
            "440311": "光明区" } },


        "440400": {
          code: "440400",
          name: "珠海市",
          districts: {
            "440402": "香洲区",
            "440403": "斗门区",
            "440404": "金湾区" } },


        "440500": {
          code: "440500",
          name: "汕头市",
          districts: {
            "440507": "龙湖区",
            "440511": "金平区",
            "440512": "濠江区",
            "440513": "潮阳区",
            "440514": "潮南区",
            "440515": "澄海区",
            "440523": "南澳县" } },


        "440600": {
          code: "440600",
          name: "佛山市",
          districts: {
            "440604": "禅城区",
            "440605": "南海区",
            "440606": "顺德区",
            "440607": "三水区",
            "440608": "高明区" } },


        "440700": {
          code: "440700",
          name: "江门市",
          districts: {
            "440703": "蓬江区",
            "440704": "江海区",
            "440705": "新会区",
            "440781": "台山市",
            "440783": "开平市",
            "440784": "鹤山市",
            "440785": "恩平市" } },


        "440800": {
          code: "440800",
          name: "湛江市",
          districts: {
            "440802": "赤坎区",
            "440803": "霞山区",
            "440804": "坡头区",
            "440811": "麻章区",
            "440823": "遂溪县",
            "440825": "徐闻县",
            "440881": "廉江市",
            "440882": "雷州市",
            "440883": "吴川市" } },


        "440900": {
          code: "440900",
          name: "茂名市",
          districts: {
            "440902": "茂南区",
            "440904": "电白区",
            "440981": "高州市",
            "440982": "化州市",
            "440983": "信宜市" } },


        "441200": {
          code: "441200",
          name: "肇庆市",
          districts: {
            "441202": "端州区",
            "441203": "鼎湖区",
            "441204": "高要区",
            "441223": "广宁县",
            "441224": "怀集县",
            "441225": "封开县",
            "441226": "德庆县",
            "441284": "四会市" } },


        "441300": {
          code: "441300",
          name: "惠州市",
          districts: {
            "441302": "惠城区",
            "441303": "惠阳区",
            "441322": "博罗县",
            "441323": "惠东县",
            "441324": "龙门县" } },


        "441400": {
          code: "441400",
          name: "梅州市",
          districts: {
            "441402": "梅江区",
            "441403": "梅县区",
            "441422": "大埔县",
            "441423": "丰顺县",
            "441424": "五华县",
            "441426": "平远县",
            "441427": "蕉岭县",
            "441481": "兴宁市" } },


        "441500": {
          code: "441500",
          name: "汕尾市",
          districts: {
            "441502": "城区",
            "441521": "海丰县",
            "441523": "陆河县",
            "441581": "陆丰市" } },


        "441600": {
          code: "441600",
          name: "河源市",
          districts: {
            "441602": "源城区",
            "441621": "紫金县",
            "441622": "龙川县",
            "441623": "连平县",
            "441624": "和平县",
            "441625": "东源县" } },


        "441700": {
          code: "441700",
          name: "阳江市",
          districts: {
            "441702": "江城区",
            "441704": "阳东区",
            "441721": "阳西县",
            "441781": "阳春市" } },


        "441800": {
          code: "441800",
          name: "清远市",
          districts: {
            "441802": "清城区",
            "441803": "清新区",
            "441821": "佛冈县",
            "441823": "阳山县",
            "441825": "连山壮族瑶族自治县",
            "441826": "连南瑶族自治县",
            "441881": "英德市",
            "441882": "连州市" } },


        "441900": {
          code: "441900",
          name: "东莞市",
          districts: {} },


        "442000": {
          code: "442000",
          name: "中山市",
          districts: {} },


        "445100": {
          code: "445100",
          name: "潮州市",
          districts: {
            "445102": "湘桥区",
            "445103": "潮安区",
            "445122": "饶平县" } },


        "445200": {
          code: "445200",
          name: "揭阳市",
          districts: {
            "445202": "榕城区",
            "445203": "揭东区",
            "445222": "揭西县",
            "445224": "惠来县",
            "445281": "普宁市" } },


        "445300": {
          code: "445300",
          name: "云浮市",
          districts: {
            "445302": "云城区",
            "445303": "云安区",
            "445321": "新兴县",
            "445322": "郁南县",
            "445381": "罗定市" } } } },




    "450000": {
      code: "450000",
      name: "广西壮族自治区",
      cities: {
        "450100": {
          code: "450100",
          name: "南宁市",
          districts: {
            "450102": "兴宁区",
            "450103": "青秀区",
            "450105": "江南区",
            "450107": "西乡塘区",
            "450108": "良庆区",
            "450109": "邕宁区",
            "450110": "武鸣区",
            "450123": "隆安县",
            "450124": "马山县",
            "450125": "上林县",
            "450126": "宾阳县",
            "450127": "横县" } },


        "450200": {
          code: "450200",
          name: "柳州市",
          districts: {
            "450202": "城中区",
            "450203": "鱼峰区",
            "450204": "柳南区",
            "450205": "柳北区",
            "450206": "柳江区",
            "450222": "柳城县",
            "450223": "鹿寨县",
            "450224": "融安县",
            "450225": "融水苗族自治县",
            "450226": "三江侗族自治县" } },


        "450300": {
          code: "450300",
          name: "桂林市",
          districts: {
            "450302": "秀峰区",
            "450303": "叠彩区",
            "450304": "象山区",
            "450305": "七星区",
            "450311": "雁山区",
            "450312": "临桂区",
            "450321": "阳朔县",
            "450323": "灵川县",
            "450324": "全州县",
            "450325": "兴安县",
            "450326": "永福县",
            "450327": "灌阳县",
            "450328": "龙胜各族自治县",
            "450329": "资源县",
            "450330": "平乐县",
            "450332": "恭城瑶族自治县",
            "450381": "荔浦市" } },


        "450400": {
          code: "450400",
          name: "梧州市",
          districts: {
            "450403": "万秀区",
            "450405": "长洲区",
            "450406": "龙圩区",
            "450421": "苍梧县",
            "450422": "藤县",
            "450423": "蒙山县",
            "450481": "岑溪市" } },


        "450500": {
          code: "450500",
          name: "北海市",
          districts: {
            "450502": "海城区",
            "450503": "银海区",
            "450512": "铁山港区",
            "450521": "合浦县" } },


        "450600": {
          code: "450600",
          name: "防城港市",
          districts: {
            "450602": "港口区",
            "450603": "防城区",
            "450621": "上思县",
            "450681": "东兴市" } },


        "450700": {
          code: "450700",
          name: "钦州市",
          districts: {
            "450702": "钦南区",
            "450703": "钦北区",
            "450721": "灵山县",
            "450722": "浦北县" } },


        "450800": {
          code: "450800",
          name: "贵港市",
          districts: {
            "450802": "港北区",
            "450803": "港南区",
            "450804": "覃塘区",
            "450821": "平南县",
            "450881": "桂平市" } },


        "450900": {
          code: "450900",
          name: "玉林市",
          districts: {
            "450902": "玉州区",
            "450903": "福绵区",
            "450921": "容县",
            "450922": "陆川县",
            "450923": "博白县",
            "450924": "兴业县",
            "450981": "北流市" } },


        "451000": {
          code: "451000",
          name: "百色市",
          districts: {
            "451002": "右江区",
            "451021": "田阳县",
            "451022": "田东县",
            "451023": "平果县",
            "451024": "德保县",
            "451026": "那坡县",
            "451027": "凌云县",
            "451028": "乐业县",
            "451029": "田林县",
            "451030": "西林县",
            "451031": "隆林各族自治县",
            "451081": "靖西市" } },


        "451100": {
          code: "451100",
          name: "贺州市",
          districts: {
            "451102": "八步区",
            "451103": "平桂区",
            "451121": "昭平县",
            "451122": "钟山县",
            "451123": "富川瑶族自治县" } },


        "451200": {
          code: "451200",
          name: "河池市",
          districts: {
            "451202": "金城江区",
            "451203": "宜州区",
            "451221": "南丹县",
            "451222": "天峨县",
            "451223": "凤山县",
            "451224": "东兰县",
            "451225": "罗城仫佬族自治县",
            "451226": "环江毛南族自治县",
            "451227": "巴马瑶族自治县",
            "451228": "都安瑶族自治县",
            "451229": "大化瑶族自治县" } },


        "451300": {
          code: "451300",
          name: "来宾市",
          districts: {
            "451302": "兴宾区",
            "451321": "忻城县",
            "451322": "象州县",
            "451323": "武宣县",
            "451324": "金秀瑶族自治县",
            "451381": "合山市" } },


        "451400": {
          code: "451400",
          name: "崇左市",
          districts: {
            "451402": "江州区",
            "451421": "扶绥县",
            "451422": "宁明县",
            "451423": "龙州县",
            "451424": "大新县",
            "451425": "天等县",
            "451481": "凭祥市" } } } },




    "460000": {
      code: "460000",
      name: "海南省",
      cities: {
        "460100": {
          code: "460100",
          name: "海口市",
          districts: {
            "460105": "秀英区",
            "460106": "龙华区",
            "460107": "琼山区",
            "460108": "美兰区" } },


        "460200": {
          code: "460200",
          name: "三亚市",
          districts: {
            "460202": "海棠区",
            "460203": "吉阳区",
            "460204": "天涯区",
            "460205": "崖州区" } },


        "460300": {
          code: "460300",
          name: "三沙市",
          districts: {
            "460321": "西沙群岛",
            "460322": "南沙群岛",
            "460323": "中沙群岛的岛礁及其海域",
            "460324": "永乐群岛" } },


        "460400": {
          code: "460400",
          name: "儋州市",
          districts: {} } } },




    "500000": {
      code: "500000",
      name: "重庆市",
      cities: {
        "500000": {
          code: "500000",
          name: "重庆市",
          districts: {
            "500101": "万州区",
            "500102": "涪陵区",
            "500103": "渝中区",
            "500104": "大渡口区",
            "500105": "江北区",
            "500106": "沙坪坝区",
            "500107": "九龙坡区",
            "500108": "南岸区",
            "500109": "北碚区",
            "500110": "綦江区",
            "500111": "大足区",
            "500112": "渝北区",
            "500113": "巴南区",
            "500114": "黔江区",
            "500115": "长寿区",
            "500116": "江津区",
            "500117": "合川区",
            "500118": "永川区",
            "500119": "南川区",
            "500120": "璧山区",
            "500151": "铜梁区",
            "500152": "潼南区",
            "500153": "荣昌区",
            "500154": "开州区",
            "500155": "梁平区",
            "500156": "武隆区",
            "500229": "城口县",
            "500230": "丰都县",
            "500231": "垫江县",
            "500233": "忠县",
            "500235": "云阳县",
            "500236": "奉节县",
            "500237": "巫山县",
            "500238": "巫溪县",
            "500240": "石柱土家族自治县",
            "500241": "秀山土家族苗族自治县",
            "500242": "酉阳土家族苗族自治县",
            "500243": "彭水苗族土家族自治县" } } } },




    "510000": {
      code: "510000",
      name: "四川省",
      cities: {
        "510100": {
          code: "510100",
          name: "成都市",
          districts: {
            "510104": "锦江区",
            "510105": "青羊区",
            "510106": "金牛区",
            "510107": "武侯区",
            "510108": "成华区",
            "510112": "龙泉驿区",
            "510113": "青白江区",
            "510114": "新都区",
            "510115": "温江区",
            "510116": "双流区",
            "510117": "郫都区",
            "510121": "金堂县",
            "510129": "大邑县",
            "510131": "蒲江县",
            "510132": "新津县",
            "510181": "都江堰市",
            "510182": "彭州市",
            "510183": "邛崃市",
            "510184": "崇州市",
            "510185": "简阳市" } },


        "510300": {
          code: "510300",
          name: "自贡市",
          districts: {
            "510302": "自流井区",
            "510303": "贡井区",
            "510304": "大安区",
            "510311": "沿滩区",
            "510321": "荣县",
            "510322": "富顺县" } },


        "510400": {
          code: "510400",
          name: "攀枝花市",
          districts: {
            "510402": "东区",
            "510403": "西区",
            "510411": "仁和区",
            "510421": "米易县",
            "510422": "盐边县" } },


        "510500": {
          code: "510500",
          name: "泸州市",
          districts: {
            "510502": "江阳区",
            "510503": "纳溪区",
            "510504": "龙马潭区",
            "510521": "泸县",
            "510522": "合江县",
            "510524": "叙永县",
            "510525": "古蔺县" } },


        "510600": {
          code: "510600",
          name: "德阳市",
          districts: {
            "510603": "旌阳区",
            "510604": "罗江区",
            "510623": "中江县",
            "510681": "广汉市",
            "510682": "什邡市",
            "510683": "绵竹市" } },


        "510700": {
          code: "510700",
          name: "绵阳市",
          districts: {
            "510703": "涪城区",
            "510704": "游仙区",
            "510705": "安州区",
            "510722": "三台县",
            "510723": "盐亭县",
            "510725": "梓潼县",
            "510726": "北川羌族自治县",
            "510727": "平武县",
            "510781": "江油市" } },


        "510800": {
          code: "510800",
          name: "广元市",
          districts: {
            "510802": "利州区",
            "510811": "昭化区",
            "510812": "朝天区",
            "510821": "旺苍县",
            "510822": "青川县",
            "510823": "剑阁县",
            "510824": "苍溪县" } },


        "510900": {
          code: "510900",
          name: "遂宁市",
          districts: {
            "510903": "船山区",
            "510904": "安居区",
            "510921": "蓬溪县",
            "510922": "射洪县",
            "510923": "大英县" } },


        "511000": {
          code: "511000",
          name: "内江市",
          districts: {
            "511002": "市中区",
            "511011": "东兴区",
            "511024": "威远县",
            "511025": "资中县",
            "511083": "隆昌市" } },


        "511100": {
          code: "511100",
          name: "乐山市",
          districts: {
            "511102": "市中区",
            "511111": "沙湾区",
            "511112": "五通桥区",
            "511113": "金口河区",
            "511123": "犍为县",
            "511124": "井研县",
            "511126": "夹江县",
            "511129": "沐川县",
            "511132": "峨边彝族自治县",
            "511133": "马边彝族自治县",
            "511181": "峨眉山市" } },


        "511300": {
          code: "511300",
          name: "南充市",
          districts: {
            "511302": "顺庆区",
            "511303": "高坪区",
            "511304": "嘉陵区",
            "511321": "南部县",
            "511322": "营山县",
            "511323": "蓬安县",
            "511324": "仪陇县",
            "511325": "西充县",
            "511381": "阆中市" } },


        "511400": {
          code: "511400",
          name: "眉山市",
          districts: {
            "511402": "东坡区",
            "511403": "彭山区",
            "511421": "仁寿县",
            "511423": "洪雅县",
            "511424": "丹棱县",
            "511425": "青神县" } },


        "511500": {
          code: "511500",
          name: "宜宾市",
          districts: {
            "511502": "翠屏区",
            "511503": "南溪区",
            "511504": "叙州区",
            "511523": "江安县",
            "511524": "长宁县",
            "511525": "高县",
            "511526": "珙县",
            "511527": "筠连县",
            "511528": "兴文县",
            "511529": "屏山县" } },


        "511600": {
          code: "511600",
          name: "广安市",
          districts: {
            "511602": "广安区",
            "511603": "前锋区",
            "511621": "岳池县",
            "511622": "武胜县",
            "511623": "邻水县",
            "511681": "华蓥市" } },


        "511700": {
          code: "511700",
          name: "达州市",
          districts: {
            "511702": "通川区",
            "511703": "达川区",
            "511722": "宣汉县",
            "511723": "开江县",
            "511724": "大竹县",
            "511725": "渠县",
            "511781": "万源市" } },


        "511800": {
          code: "511800",
          name: "雅安市",
          districts: {
            "511802": "雨城区",
            "511803": "名山区",
            "511822": "荥经县",
            "511823": "汉源县",
            "511824": "石棉县",
            "511825": "天全县",
            "511826": "芦山县",
            "511827": "宝兴县" } },


        "511900": {
          code: "511900",
          name: "巴中市",
          districts: {
            "511902": "巴州区",
            "511903": "恩阳区",
            "511921": "通江县",
            "511922": "南江县",
            "511923": "平昌县" } },


        "512000": {
          code: "512000",
          name: "资阳市",
          districts: {
            "512002": "雁江区",
            "512021": "安岳县",
            "512022": "乐至县" } },


        "513200": {
          code: "513200",
          name: "阿坝藏族羌族自治州",
          districts: {
            "513201": "马尔康市",
            "513221": "汶川县",
            "513222": "理县",
            "513223": "茂县",
            "513224": "松潘县",
            "513225": "九寨沟县",
            "513226": "金川县",
            "513227": "小金县",
            "513228": "黑水县",
            "513230": "壤塘县",
            "513231": "阿坝县",
            "513232": "若尔盖县",
            "513233": "红原县" } },


        "513300": {
          code: "513300",
          name: "甘孜藏族自治州",
          districts: {
            "513301": "康定市",
            "513322": "泸定县",
            "513323": "丹巴县",
            "513324": "九龙县",
            "513325": "雅江县",
            "513326": "道孚县",
            "513327": "炉霍县",
            "513328": "甘孜县",
            "513329": "新龙县",
            "513330": "德格县",
            "513331": "白玉县",
            "513332": "石渠县",
            "513333": "色达县",
            "513334": "理塘县",
            "513335": "巴塘县",
            "513336": "乡城县",
            "513337": "稻城县",
            "513338": "得荣县" } },


        "513400": {
          code: "513400",
          name: "凉山彝族自治州",
          districts: {
            "513401": "西昌市",
            "513422": "木里藏族自治县",
            "513423": "盐源县",
            "513424": "德昌县",
            "513425": "会理县",
            "513426": "会东县",
            "513427": "宁南县",
            "513428": "普格县",
            "513429": "布拖县",
            "513430": "金阳县",
            "513431": "昭觉县",
            "513432": "喜德县",
            "513433": "冕宁县",
            "513434": "越西县",
            "513435": "甘洛县",
            "513436": "美姑县",
            "513437": "雷波县" } } } },




    "520000": {
      code: "520000",
      name: "贵州省",
      cities: {
        "520100": {
          code: "520100",
          name: "贵阳市",
          districts: {
            "520102": "南明区",
            "520103": "云岩区",
            "520111": "花溪区",
            "520112": "乌当区",
            "520113": "白云区",
            "520115": "观山湖区",
            "520121": "开阳县",
            "520122": "息烽县",
            "520123": "修文县",
            "520181": "清镇市" } },


        "520200": {
          code: "520200",
          name: "六盘水市",
          districts: {
            "520201": "钟山区",
            "520203": "六枝特区",
            "520221": "水城县",
            "520281": "盘州市" } },


        "520300": {
          code: "520300",
          name: "遵义市",
          districts: {
            "520302": "红花岗区",
            "520303": "汇川区",
            "520304": "播州区",
            "520322": "桐梓县",
            "520323": "绥阳县",
            "520324": "正安县",
            "520325": "道真仡佬族苗族自治县",
            "520326": "务川仡佬族苗族自治县",
            "520327": "凤冈县",
            "520328": "湄潭县",
            "520329": "余庆县",
            "520330": "习水县",
            "520381": "赤水市",
            "520382": "仁怀市" } },


        "520400": {
          code: "520400",
          name: "安顺市",
          districts: {
            "520402": "西秀区",
            "520403": "平坝区",
            "520422": "普定县",
            "520423": "镇宁布依族苗族自治县",
            "520424": "关岭布依族苗族自治县",
            "520425": "紫云苗族布依族自治县" } },


        "520500": {
          code: "520500",
          name: "毕节市",
          districts: {
            "520502": "七星关区",
            "520521": "大方县",
            "520522": "黔西县",
            "520523": "金沙县",
            "520524": "织金县",
            "520525": "纳雍县",
            "520526": "威宁彝族回族苗族自治县",
            "520527": "赫章县" } },


        "520600": {
          code: "520600",
          name: "铜仁市",
          districts: {
            "520602": "碧江区",
            "520603": "万山区",
            "520621": "江口县",
            "520622": "玉屏侗族自治县",
            "520623": "石阡县",
            "520624": "思南县",
            "520625": "印江土家族苗族自治县",
            "520626": "德江县",
            "520627": "沿河土家族自治县",
            "520628": "松桃苗族自治县" } },


        "522300": {
          code: "522300",
          name: "黔西南布依族苗族自治州",
          districts: {
            "522301": "兴义市",
            "522302": "兴仁市",
            "522323": "普安县",
            "522324": "晴隆县",
            "522325": "贞丰县",
            "522326": "望谟县",
            "522327": "册亨县",
            "522328": "安龙县" } },


        "522600": {
          code: "522600",
          name: "黔东南苗族侗族自治州",
          districts: {
            "522601": "凯里市",
            "522622": "黄平县",
            "522623": "施秉县",
            "522624": "三穗县",
            "522625": "镇远县",
            "522626": "岑巩县",
            "522627": "天柱县",
            "522628": "锦屏县",
            "522629": "剑河县",
            "522630": "台江县",
            "522631": "黎平县",
            "522632": "榕江县",
            "522633": "从江县",
            "522634": "雷山县",
            "522635": "麻江县",
            "522636": "丹寨县" } },


        "522700": {
          code: "522700",
          name: "黔南布依族苗族自治州",
          districts: {
            "522701": "都匀市",
            "522702": "福泉市",
            "522722": "荔波县",
            "522723": "贵定县",
            "522725": "瓮安县",
            "522726": "独山县",
            "522727": "平塘县",
            "522728": "罗甸县",
            "522729": "长顺县",
            "522730": "龙里县",
            "522731": "惠水县",
            "522732": "三都水族自治县" } } } },




    "530000": {
      code: "530000",
      name: "云南省",
      cities: {
        "530100": {
          code: "530100",
          name: "昆明市",
          districts: {
            "530102": "五华区",
            "530103": "盘龙区",
            "530111": "官渡区",
            "530112": "西山区",
            "530113": "东川区",
            "530114": "呈贡区",
            "530115": "晋宁区",
            "530124": "富民县",
            "530125": "宜良县",
            "530126": "石林彝族自治县",
            "530127": "嵩明县",
            "530128": "禄劝彝族苗族自治县",
            "530129": "寻甸回族彝族自治县",
            "530181": "安宁市" } },


        "530300": {
          code: "530300",
          name: "曲靖市",
          districts: {
            "530302": "麒麟区",
            "530303": "沾益区",
            "530304": "马龙区",
            "530322": "陆良县",
            "530323": "师宗县",
            "530324": "罗平县",
            "530325": "富源县",
            "530326": "会泽县",
            "530381": "宣威市" } },


        "530400": {
          code: "530400",
          name: "玉溪市",
          districts: {
            "530402": "红塔区",
            "530403": "江川区",
            "530422": "澄江县",
            "530423": "通海县",
            "530424": "华宁县",
            "530425": "易门县",
            "530426": "峨山彝族自治县",
            "530427": "新平彝族傣族自治县",
            "530428": "元江哈尼族彝族傣族自治县" } },


        "530500": {
          code: "530500",
          name: "保山市",
          districts: {
            "530502": "隆阳区",
            "530521": "施甸县",
            "530523": "龙陵县",
            "530524": "昌宁县",
            "530581": "腾冲市" } },


        "530600": {
          code: "530600",
          name: "昭通市",
          districts: {
            "530602": "昭阳区",
            "530621": "鲁甸县",
            "530622": "巧家县",
            "530623": "盐津县",
            "530624": "大关县",
            "530625": "永善县",
            "530626": "绥江县",
            "530627": "镇雄县",
            "530628": "彝良县",
            "530629": "威信县",
            "530681": "水富市" } },


        "530700": {
          code: "530700",
          name: "丽江市",
          districts: {
            "530702": "古城区",
            "530721": "玉龙纳西族自治县",
            "530722": "永胜县",
            "530723": "华坪县",
            "530724": "宁蒗彝族自治县" } },


        "530800": {
          code: "530800",
          name: "普洱市",
          districts: {
            "530802": "思茅区",
            "530821": "宁洱哈尼族彝族自治县",
            "530822": "墨江哈尼族自治县",
            "530823": "景东彝族自治县",
            "530824": "景谷傣族彝族自治县",
            "530825": "镇沅彝族哈尼族拉祜族自治县",
            "530826": "江城哈尼族彝族自治县",
            "530827": "孟连傣族拉祜族佤族自治县",
            "530828": "澜沧拉祜族自治县",
            "530829": "西盟佤族自治县" } },


        "530900": {
          code: "530900",
          name: "临沧市",
          districts: {
            "530902": "临翔区",
            "530921": "凤庆县",
            "530922": "云县",
            "530923": "永德县",
            "530924": "镇康县",
            "530925": "双江拉祜族佤族布朗族傣族自治县",
            "530926": "耿马傣族佤族自治县",
            "530927": "沧源佤族自治县" } },


        "532300": {
          code: "532300",
          name: "楚雄彝族自治州",
          districts: {
            "532301": "楚雄市",
            "532322": "双柏县",
            "532323": "牟定县",
            "532324": "南华县",
            "532325": "姚安县",
            "532326": "大姚县",
            "532327": "永仁县",
            "532328": "元谋县",
            "532329": "武定县",
            "532331": "禄丰县" } },


        "532500": {
          code: "532500",
          name: "红河哈尼族彝族自治州",
          districts: {
            "532501": "个旧市",
            "532502": "开远市",
            "532503": "蒙自市",
            "532504": "弥勒市",
            "532523": "屏边苗族自治县",
            "532524": "建水县",
            "532525": "石屏县",
            "532527": "泸西县",
            "532528": "元阳县",
            "532529": "红河县",
            "532530": "金平苗族瑶族傣族自治县",
            "532531": "绿春县",
            "532532": "河口瑶族自治县" } },


        "532600": {
          code: "532600",
          name: "文山壮族苗族自治州",
          districts: {
            "532601": "文山市",
            "532622": "砚山县",
            "532623": "西畴县",
            "532624": "麻栗坡县",
            "532625": "马关县",
            "532626": "丘北县",
            "532627": "广南县",
            "532628": "富宁县" } },


        "532800": {
          code: "532800",
          name: "西双版纳傣族自治州",
          districts: {
            "532801": "景洪市",
            "532822": "勐海县",
            "532823": "勐腊县" } },


        "532900": {
          code: "532900",
          name: "大理白族自治州",
          districts: {
            "532901": "大理市",
            "532922": "漾濞彝族自治县",
            "532923": "祥云县",
            "532924": "宾川县",
            "532925": "弥渡县",
            "532926": "南涧彝族自治县",
            "532927": "巍山彝族回族自治县",
            "532928": "永平县",
            "532929": "云龙县",
            "532930": "洱源县",
            "532931": "剑川县",
            "532932": "鹤庆县" } },


        "533100": {
          code: "533100",
          name: "德宏傣族景颇族自治州",
          districts: {
            "533102": "瑞丽市",
            "533103": "芒市",
            "533122": "梁河县",
            "533123": "盈江县",
            "533124": "陇川县" } },


        "533300": {
          code: "533300",
          name: "怒江傈僳族自治州",
          districts: {
            "533301": "泸水市",
            "533323": "福贡县",
            "533324": "贡山独龙族怒族自治县",
            "533325": "兰坪白族普米族自治县" } },


        "533400": {
          code: "533400",
          name: "迪庆藏族自治州",
          districts: {
            "533401": "香格里拉市",
            "533422": "德钦县",
            "533423": "维西傈僳族自治县" } } } },




    "540000": {
      code: "540000",
      name: "西藏自治区",
      cities: {
        "540100": {
          code: "540100",
          name: "拉萨市",
          districts: {
            "540102": "城关区",
            "540103": "堆龙德庆区",
            "540104": "达孜区",
            "540121": "林周县",
            "540122": "当雄县",
            "540123": "尼木县",
            "540124": "曲水县",
            "540127": "墨竹工卡县" } },


        "540200": {
          code: "540200",
          name: "日喀则市",
          districts: {
            "540202": "桑珠孜区",
            "540221": "南木林县",
            "540222": "江孜县",
            "540223": "定日县",
            "540224": "萨迦县",
            "540225": "拉孜县",
            "540226": "昂仁县",
            "540227": "谢通门县",
            "540228": "白朗县",
            "540229": "仁布县",
            "540230": "康马县",
            "540231": "定结县",
            "540232": "仲巴县",
            "540233": "亚东县",
            "540234": "吉隆县",
            "540235": "聂拉木县",
            "540236": "萨嘎县",
            "540237": "岗巴县" } },


        "540300": {
          code: "540300",
          name: "昌都市",
          districts: {
            "540302": "卡若区",
            "540321": "江达县",
            "540322": "贡觉县",
            "540323": "类乌齐县",
            "540324": "丁青县",
            "540325": "察雅县",
            "540326": "八宿县",
            "540327": "左贡县",
            "540328": "芒康县",
            "540329": "洛隆县",
            "540330": "边坝县" } },


        "540400": {
          code: "540400",
          name: "林芝市",
          districts: {
            "540402": "巴宜区",
            "540421": "工布江达县",
            "540422": "米林县",
            "540423": "墨脱县",
            "540424": "波密县",
            "540425": "察隅县",
            "540426": "朗县" } },


        "540500": {
          code: "540500",
          name: "山南市",
          districts: {
            "540502": "乃东区",
            "540521": "扎囊县",
            "540522": "贡嘎县",
            "540523": "桑日县",
            "540524": "琼结县",
            "540525": "曲松县",
            "540526": "措美县",
            "540527": "洛扎县",
            "540528": "加查县",
            "540529": "隆子县",
            "540530": "错那县",
            "540531": "浪卡子县" } },


        "540600": {
          code: "540600",
          name: "那曲市",
          districts: {
            "540602": "色尼区",
            "540621": "嘉黎县",
            "540622": "比如县",
            "540623": "聂荣县",
            "540624": "安多县",
            "540625": "申扎县",
            "540626": "索县",
            "540627": "班戈县",
            "540628": "巴青县",
            "540629": "尼玛县",
            "540630": "双湖县" } },


        "542500": {
          code: "542500",
          name: "阿里地区",
          districts: {
            "542521": "普兰县",
            "542522": "札达县",
            "542523": "噶尔县",
            "542524": "日土县",
            "542525": "革吉县",
            "542526": "改则县",
            "542527": "措勤县" } } } },




    "610000": {
      code: "610000",
      name: "陕西省",
      cities: {
        "610100": {
          code: "610100",
          name: "西安市",
          districts: {
            "610102": "新城区",
            "610103": "碑林区",
            "610104": "莲湖区",
            "610111": "灞桥区",
            "610112": "未央区",
            "610113": "雁塔区",
            "610114": "阎良区",
            "610115": "临潼区",
            "610116": "长安区",
            "610117": "高陵区",
            "610118": "鄠邑区",
            "610122": "蓝田县",
            "610124": "周至县" } },


        "610200": {
          code: "610200",
          name: "铜川市",
          districts: {
            "610202": "王益区",
            "610203": "印台区",
            "610204": "耀州区",
            "610222": "宜君县" } },


        "610300": {
          code: "610300",
          name: "宝鸡市",
          districts: {
            "610302": "渭滨区",
            "610303": "金台区",
            "610304": "陈仓区",
            "610322": "凤翔县",
            "610323": "岐山县",
            "610324": "扶风县",
            "610326": "眉县",
            "610327": "陇县",
            "610328": "千阳县",
            "610329": "麟游县",
            "610330": "凤县",
            "610331": "太白县" } },


        "610400": {
          code: "610400",
          name: "咸阳市",
          districts: {
            "610402": "秦都区",
            "610403": "杨陵区",
            "610404": "渭城区",
            "610422": "三原县",
            "610423": "泾阳县",
            "610424": "乾县",
            "610425": "礼泉县",
            "610426": "永寿县",
            "610428": "长武县",
            "610429": "旬邑县",
            "610430": "淳化县",
            "610431": "武功县",
            "610481": "兴平市",
            "610482": "彬州市" } },


        "610500": {
          code: "610500",
          name: "渭南市",
          districts: {
            "610502": "临渭区",
            "610503": "华州区",
            "610522": "潼关县",
            "610523": "大荔县",
            "610524": "合阳县",
            "610525": "澄城县",
            "610526": "蒲城县",
            "610527": "白水县",
            "610528": "富平县",
            "610581": "韩城市",
            "610582": "华阴市" } },


        "610600": {
          code: "610600",
          name: "延安市",
          districts: {
            "610602": "宝塔区",
            "610603": "安塞区",
            "610621": "延长县",
            "610622": "延川县",
            "610623": "子长县",
            "610625": "志丹县",
            "610626": "吴起县",
            "610627": "甘泉县",
            "610628": "富县",
            "610629": "洛川县",
            "610630": "宜川县",
            "610631": "黄龙县",
            "610632": "黄陵县" } },


        "610700": {
          code: "610700",
          name: "汉中市",
          districts: {
            "610702": "汉台区",
            "610703": "南郑区",
            "610722": "城固县",
            "610723": "洋县",
            "610724": "西乡县",
            "610725": "勉县",
            "610726": "宁强县",
            "610727": "略阳县",
            "610728": "镇巴县",
            "610729": "留坝县",
            "610730": "佛坪县" } },


        "610800": {
          code: "610800",
          name: "榆林市",
          districts: {
            "610802": "榆阳区",
            "610803": "横山区",
            "610822": "府谷县",
            "610824": "靖边县",
            "610825": "定边县",
            "610826": "绥德县",
            "610827": "米脂县",
            "610828": "佳县",
            "610829": "吴堡县",
            "610830": "清涧县",
            "610831": "子洲县",
            "610881": "神木市" } },


        "610900": {
          code: "610900",
          name: "安康市",
          districts: {
            "610902": "汉滨区",
            "610921": "汉阴县",
            "610922": "石泉县",
            "610923": "宁陕县",
            "610924": "紫阳县",
            "610925": "岚皋县",
            "610926": "平利县",
            "610927": "镇坪县",
            "610928": "旬阳县",
            "610929": "白河县" } },


        "611000": {
          code: "611000",
          name: "商洛市",
          districts: {
            "611002": "商州区",
            "611021": "洛南县",
            "611022": "丹凤县",
            "611023": "商南县",
            "611024": "山阳县",
            "611025": "镇安县",
            "611026": "柞水县" } } } },




    "620000": {
      code: "620000",
      name: "甘肃省",
      cities: {
        "620100": {
          code: "620100",
          name: "兰州市",
          districts: {
            "620102": "城关区",
            "620103": "七里河区",
            "620104": "西固区",
            "620105": "安宁区",
            "620111": "红古区",
            "620121": "永登县",
            "620122": "皋兰县",
            "620123": "榆中县" } },


        "620200": {
          code: "620200",
          name: "嘉峪关市",
          districts: {} },


        "620300": {
          code: "620300",
          name: "金昌市",
          districts: {
            "620302": "金川区",
            "620321": "永昌县" } },


        "620400": {
          code: "620400",
          name: "白银市",
          districts: {
            "620402": "白银区",
            "620403": "平川区",
            "620421": "靖远县",
            "620422": "会宁县",
            "620423": "景泰县" } },


        "620500": {
          code: "620500",
          name: "天水市",
          districts: {
            "620502": "秦州区",
            "620503": "麦积区",
            "620521": "清水县",
            "620522": "秦安县",
            "620523": "甘谷县",
            "620524": "武山县",
            "620525": "张家川回族自治县" } },


        "620600": {
          code: "620600",
          name: "武威市",
          districts: {
            "620602": "凉州区",
            "620621": "民勤县",
            "620622": "古浪县",
            "620623": "天祝藏族自治县" } },


        "620700": {
          code: "620700",
          name: "张掖市",
          districts: {
            "620702": "甘州区",
            "620721": "肃南裕固族自治县",
            "620722": "民乐县",
            "620723": "临泽县",
            "620724": "高台县",
            "620725": "山丹县" } },


        "620800": {
          code: "620800",
          name: "平凉市",
          districts: {
            "620802": "崆峒区",
            "620821": "泾川县",
            "620822": "灵台县",
            "620823": "崇信县",
            "620825": "庄浪县",
            "620826": "静宁县",
            "620881": "华亭市" } },


        "620900": {
          code: "620900",
          name: "酒泉市",
          districts: {
            "620902": "肃州区",
            "620921": "金塔县",
            "620922": "瓜州县",
            "620923": "肃北蒙古族自治县",
            "620924": "阿克塞哈萨克族自治县",
            "620981": "玉门市",
            "620982": "敦煌市" } },


        "621000": {
          code: "621000",
          name: "庆阳市",
          districts: {
            "621002": "西峰区",
            "621021": "庆城县",
            "621022": "环县",
            "621023": "华池县",
            "621024": "合水县",
            "621025": "正宁县",
            "621026": "宁县",
            "621027": "镇原县" } },


        "621100": {
          code: "621100",
          name: "定西市",
          districts: {
            "621102": "安定区",
            "621121": "通渭县",
            "621122": "陇西县",
            "621123": "渭源县",
            "621124": "临洮县",
            "621125": "漳县",
            "621126": "岷县" } },


        "621200": {
          code: "621200",
          name: "陇南市",
          districts: {
            "621202": "武都区",
            "621221": "成县",
            "621222": "文县",
            "621223": "宕昌县",
            "621224": "康县",
            "621225": "西和县",
            "621226": "礼县",
            "621227": "徽县",
            "621228": "两当县" } },


        "622900": {
          code: "622900",
          name: "临夏回族自治州",
          districts: {
            "622901": "临夏市",
            "622921": "临夏县",
            "622922": "康乐县",
            "622923": "永靖县",
            "622924": "广河县",
            "622925": "和政县",
            "622926": "东乡族自治县",
            "622927": "积石山保安族东乡族撒拉族自治县" } },


        "623000": {
          code: "623000",
          name: "甘南藏族自治州",
          districts: {
            "623001": "合作市",
            "623021": "临潭县",
            "623022": "卓尼县",
            "623023": "舟曲县",
            "623024": "迭部县",
            "623025": "玛曲县",
            "623026": "碌曲县",
            "623027": "夏河县" } } } },




    "630000": {
      code: "630000",
      name: "青海省",
      cities: {
        "630100": {
          code: "630100",
          name: "西宁市",
          districts: {
            "630102": "城东区",
            "630103": "城中区",
            "630104": "城西区",
            "630105": "城北区",
            "630121": "大通回族土族自治县",
            "630122": "湟中县",
            "630123": "湟源县" } },


        "630200": {
          code: "630200",
          name: "海东市",
          districts: {
            "630202": "乐都区",
            "630203": "平安区",
            "630222": "民和回族土族自治县",
            "630223": "互助土族自治县",
            "630224": "化隆回族自治县",
            "630225": "循化撒拉族自治县" } },


        "632200": {
          code: "632200",
          name: "海北藏族自治州",
          districts: {
            "632221": "门源回族自治县",
            "632222": "祁连县",
            "632223": "海晏县",
            "632224": "刚察县" } },


        "632300": {
          code: "632300",
          name: "黄南藏族自治州",
          districts: {
            "632321": "同仁县",
            "632322": "尖扎县",
            "632323": "泽库县",
            "632324": "河南蒙古族自治县" } },


        "632500": {
          code: "632500",
          name: "海南藏族自治州",
          districts: {
            "632521": "共和县",
            "632522": "同德县",
            "632523": "贵德县",
            "632524": "兴海县",
            "632525": "贵南县" } },


        "632600": {
          code: "632600",
          name: "果洛藏族自治州",
          districts: {
            "632621": "玛沁县",
            "632622": "班玛县",
            "632623": "甘德县",
            "632624": "达日县",
            "632625": "久治县",
            "632626": "玛多县" } },


        "632700": {
          code: "632700",
          name: "玉树藏族自治州",
          districts: {
            "632701": "玉树市",
            "632722": "杂多县",
            "632723": "称多县",
            "632724": "治多县",
            "632725": "囊谦县",
            "632726": "曲麻莱县" } },


        "632800": {
          code: "632800",
          name: "海西蒙古族藏族自治州",
          districts: {
            "632801": "格尔木市",
            "632802": "德令哈市",
            "632803": "茫崖市",
            "632821": "乌兰县",
            "632822": "都兰县",
            "632823": "天峻县" } } } },




    "640000": {
      code: "640000",
      name: "宁夏回族自治区",
      cities: {
        "640100": {
          code: "640100",
          name: "银川市",
          districts: {
            "640104": "兴庆区",
            "640105": "西夏区",
            "640106": "金凤区",
            "640121": "永宁县",
            "640122": "贺兰县",
            "640181": "灵武市" } },


        "640200": {
          code: "640200",
          name: "石嘴山市",
          districts: {
            "640202": "大武口区",
            "640205": "惠农区",
            "640221": "平罗县" } },


        "640300": {
          code: "640300",
          name: "吴忠市",
          districts: {
            "640302": "利通区",
            "640303": "红寺堡区",
            "640323": "盐池县",
            "640324": "同心县",
            "640381": "青铜峡市" } },


        "640400": {
          code: "640400",
          name: "固原市",
          districts: {
            "640402": "原州区",
            "640422": "西吉县",
            "640423": "隆德县",
            "640424": "泾源县",
            "640425": "彭阳县" } },


        "640500": {
          code: "640500",
          name: "中卫市",
          districts: {
            "640502": "沙坡头区",
            "640521": "中宁县",
            "640522": "海原县" } } } },




    "650000": {
      code: "650000",
      name: "新疆维吾尔自治区",
      cities: {
        "650100": {
          code: "650100",
          name: "乌鲁木齐市",
          districts: {
            "650102": "天山区",
            "650103": "沙依巴克区",
            "650104": "新市区",
            "650105": "水磨沟区",
            "650106": "头屯河区",
            "650107": "达坂城区",
            "650109": "米东区",
            "650121": "乌鲁木齐县" } },


        "650200": {
          code: "650200",
          name: "克拉玛依市",
          districts: {
            "650202": "独山子区",
            "650203": "克拉玛依区",
            "650204": "白碱滩区",
            "650205": "乌尔禾区" } },


        "650400": {
          code: "650400",
          name: "吐鲁番市",
          districts: {
            "650402": "高昌区",
            "650421": "鄯善县",
            "650422": "托克逊县" } },


        "650500": {
          code: "650500",
          name: "哈密市",
          districts: {
            "650502": "伊州区",
            "650521": "巴里坤哈萨克自治县",
            "650522": "伊吾县" } },


        "652300": {
          code: "652300",
          name: "昌吉回族自治州",
          districts: {
            "652301": "昌吉市",
            "652302": "阜康市",
            "652323": "呼图壁县",
            "652324": "玛纳斯县",
            "652325": "奇台县",
            "652327": "吉木萨尔县",
            "652328": "木垒哈萨克自治县" } },


        "652700": {
          code: "652700",
          name: "博尔塔拉蒙古自治州",
          districts: {
            "652701": "博乐市",
            "652702": "阿拉山口市",
            "652722": "精河县",
            "652723": "温泉县" } },


        "652800": {
          code: "652800",
          name: "巴音郭楞蒙古自治州",
          districts: {
            "652801": "库尔勒市",
            "652822": "轮台县",
            "652823": "尉犁县",
            "652824": "若羌县",
            "652825": "且末县",
            "652826": "焉耆回族自治县",
            "652827": "和静县",
            "652828": "和硕县",
            "652829": "博湖县" } },


        "652900": {
          code: "652900",
          name: "阿克苏地区",
          districts: {
            "652901": "阿克苏市",
            "652922": "温宿县",
            "652923": "库车县",
            "652924": "沙雅县",
            "652925": "新和县",
            "652926": "拜城县",
            "652927": "乌什县",
            "652928": "阿瓦提县",
            "652929": "柯坪县" } },


        "653000": {
          code: "653000",
          name: "克孜勒苏柯尔克孜自治州",
          districts: {
            "653001": "阿图什市",
            "653022": "阿克陶县",
            "653023": "阿合奇县",
            "653024": "乌恰县" } },


        "653100": {
          code: "653100",
          name: "喀什地区",
          districts: {
            "653101": "喀什市",
            "653121": "疏附县",
            "653122": "疏勒县",
            "653123": "英吉沙县",
            "653124": "泽普县",
            "653125": "莎车县",
            "653126": "叶城县",
            "653127": "麦盖提县",
            "653128": "岳普湖县",
            "653129": "伽师县",
            "653130": "巴楚县",
            "653131": "塔什库尔干塔吉克自治县" } },


        "653200": {
          code: "653200",
          name: "和田地区",
          districts: {
            "653201": "和田市",
            "653221": "和田县",
            "653222": "墨玉县",
            "653223": "皮山县",
            "653224": "洛浦县",
            "653225": "策勒县",
            "653226": "于田县",
            "653227": "民丰县" } },


        "654000": {
          code: "654000",
          name: "伊犁哈萨克自治州",
          districts: {
            "654002": "伊宁市",
            "654003": "奎屯市",
            "654004": "霍尔果斯市",
            "654021": "伊宁县",
            "654022": "察布查尔锡伯自治县",
            "654023": "霍城县",
            "654024": "巩留县",
            "654025": "新源县",
            "654026": "昭苏县",
            "654027": "特克斯县",
            "654028": "尼勒克县" } },


        "654200": {
          code: "654200",
          name: "塔城地区",
          districts: {
            "654201": "塔城市",
            "654202": "乌苏市",
            "654221": "额敏县",
            "654223": "沙湾县",
            "654224": "托里县",
            "654225": "裕民县",
            "654226": "和布克赛尔蒙古自治县" } },


        "654300": {
          code: "654300",
          name: "阿勒泰地区",
          districts: {
            "654301": "阿勒泰市",
            "654321": "布尔津县",
            "654322": "富蕴县",
            "654323": "福海县",
            "654324": "哈巴河县",
            "654325": "青河县",
            "654326": "吉木乃县" } } } },




    "810000": {
      code: "810000",
      name: "香港特别行政区",
      cities: {
        "810000": {
          code: "810000",
          name: "香港特别行政区",
          districts: {
            "810101": "中西区",
            "810102": "湾仔区",
            "810103": "东区",
            "810104": "南区",
            "810105": "油尖旺区",
            "810106": "深水埗区",
            "810107": "九龙城区",
            "810108": "黄大仙区",
            "810109": "观塘区",
            "810110": "北区",
            "810111": "大埔区",
            "810112": "沙田区",
            "810113": "西贡区",
            "810114": "荃湾区",
            "810115": "屯门区",
            "810116": "元朗区",
            "810117": "葵青区",
            "810118": "离岛区" } } } },




    "820000": {
      code: "820000",
      name: "澳门特别行政区",
      cities: {
        "820000": {
          code: "820000",
          name: "澳门特别行政区",
          districts: {
            "820101": "花地玛堂区",
            "820102": "圣安多尼堂区",
            "820103": "大堂区",
            "820104": "望德堂区",
            "820105": "风顺堂区",
            "820106": "嘉模堂区",
            "820107": "圣方济各堂区",
            "820108": "路氹城",
            "820109": "澳门新城" } } } },




    "830000": {
      code: "830000",
      name: "台湾省",
      cities: {
        "830100": {
          code: "830100",
          name: "台北市",
          districts: {
            "830101": "中正区",
            "830102": "大同区",
            "830103": "中山区",
            "830104": "万华区",
            "830105": "信义区",
            "830106": "松山区",
            "830107": "大安区",
            "830108": "南港区",
            "830109": "北投区",
            "830110": "内湖区",
            "830111": "士林区",
            "830112": "文山区" } },


        "830200": {
          code: "830200",
          name: "新北市",
          districts: {
            "830201": "板桥区",
            "830202": "土城区",
            "830203": "新庄区",
            "830204": "新店区",
            "830205": "深坑区",
            "830206": "石碇区",
            "830207": "坪林区",
            "830208": "乌来区",
            "830209": "五股区",
            "830210": "八里区",
            "830211": "林口区",
            "830212": "淡水区",
            "830213": "中和区",
            "830214": "永和区",
            "830215": "三重区",
            "830216": "芦洲区",
            "830217": "泰山区",
            "830218": "树林区",
            "830219": "莺歌区",
            "830220": "三峡区",
            "830221": "汐止区",
            "830222": "金山区",
            "830223": "万里区",
            "830224": "三芝区",
            "830225": "石门区",
            "830226": "瑞芳区",
            "830227": "贡寮区",
            "830228": "双溪区",
            "830229": "平溪区" } },


        "830300": {
          code: "830300",
          name: "桃园市",
          districts: {
            "830301": "桃园区",
            "830302": "中坜区",
            "830303": "平镇区",
            "830304": "八德区",
            "830305": "杨梅区",
            "830306": "芦竹区",
            "830307": "大溪区",
            "830308": "龙潭区",
            "830309": "龟山区",
            "830310": "大园区",
            "830311": "观音区",
            "830312": "新屋区",
            "830313": "复兴区" } },


        "830400": {
          code: "830400",
          name: "台中市",
          districts: {
            "830401": "中区",
            "830402": "东区",
            "830403": "西区",
            "830404": "南区",
            "830405": "北区",
            "830406": "西屯区",
            "830407": "南屯区",
            "830408": "北屯区",
            "830409": "丰原区",
            "830410": "大里区",
            "830411": "太平区",
            "830412": "东势区",
            "830413": "大甲区",
            "830414": "清水区",
            "830415": "沙鹿区",
            "830416": "梧栖区",
            "830417": "后里区",
            "830418": "神冈区",
            "830419": "潭子区",
            "830420": "大雅区",
            "830421": "新小区",
            "830422": "石冈区",
            "830423": "外埔区",
            "830424": "大安区",
            "830425": "乌日区",
            "830426": "大肚区",
            "830427": "龙井区",
            "830428": "雾峰区",
            "830429": "和平区" } },


        "830500": {
          code: "830500",
          name: "台南市",
          districts: {
            "830501": "中西区",
            "830502": "东区",
            "830503": "南区",
            "830504": "北区",
            "830505": "安平区",
            "830506": "安南区",
            "830507": "永康区",
            "830508": "归仁区",
            "830509": "新化区",
            "830510": "左镇区",
            "830511": "玉井区",
            "830512": "楠西区",
            "830513": "南化区",
            "830514": "仁德区",
            "830515": "关庙区",
            "830516": "龙崎区",
            "830517": "官田区",
            "830518": "麻豆区",
            "830519": "佳里区",
            "830520": "西港区",
            "830521": "七股区",
            "830522": "将军区",
            "830523": "学甲区",
            "830524": "北门区",
            "830525": "新营区",
            "830526": "后壁区",
            "830527": "白河区",
            "830528": "东山区",
            "830529": "六甲区",
            "830530": "下营区",
            "830531": "柳营区",
            "830532": "盐水区",
            "830533": "善化区",
            "830534": "大内区",
            "830535": "山上区",
            "830536": "新市区",
            "830537": "安定区" } },


        "830600": {
          code: "830600",
          name: "高雄市",
          districts: {
            "830601": "楠梓区",
            "830602": "左营区",
            "830603": "鼓山区",
            "830604": "三民区",
            "830605": "盐埕区",
            "830606": "前金区",
            "830607": "新兴区",
            "830608": "苓雅区",
            "830609": "前镇区",
            "830610": "旗津区",
            "830611": "小港区",
            "830612": "凤山区",
            "830613": "大寮区",
            "830614": "鸟松区",
            "830615": "林园区",
            "830616": "仁武区",
            "830617": "大树区",
            "830618": "大社区",
            "830619": "冈山区",
            "830620": "路竹区",
            "830621": "桥头区",
            "830622": "梓官区",
            "830623": "弥陀区",
            "830624": "永安区",
            "830625": "燕巢区",
            "830626": "阿莲区",
            "830627": "茄萣区",
            "830628": "湖内区",
            "830629": "旗山区",
            "830630": "美浓区",
            "830631": "内门区",
            "830632": "杉林区",
            "830633": "甲仙区",
            "830634": "六龟区",
            "830635": "茂林区",
            "830636": "桃源区",
            "830637": "那玛夏区" } },


        "830700": {
          code: "830700",
          name: "基隆市",
          districts: {
            "830701": "中正区",
            "830702": "七堵区",
            "830703": "暖暖区",
            "830704": "仁爱区",
            "830705": "中山区",
            "830706": "安乐区",
            "830707": "信义区" } },


        "830800": {
          code: "830800",
          name: "新竹市",
          districts: {
            "830801": "东区",
            "830802": "北区",
            "830803": "香山区" } },


        "830900": {
          code: "830900",
          name: "嘉义市",
          districts: {
            "830901": "东区",
            "830902": "西区" } } } } };






  var REGION = ['东北', '华北', '华东', '华中', '华南', '西南', '西北'];
  var areas = location;
  // 随机生成一个大区。
  var region = function region() {
    return pick(REGION);
  };
  // 随机生成一个（中国）省（或直辖市、自治区、特别行政区）。
  var province = function province() {
    return pickMap(areas).name;
  };
  /**
      * 随机生成一个（中国）市。
      * @param prefix 是否有省前缀
      */
  var city = function city(prefix) {
    if (prefix === void 0) {prefix = false;}
    var province = pickMap(areas);
    var city = pickMap(province.cities);
    return prefix ? [province.name, city.name].join(' ') : city.name;
  };
  /**
      * 随机生成一个（中国）县。
      * @param prefix 是否有省/市前缀
      */
  var county = function county(prefix) {
    if (prefix === void 0) {prefix = false;}
    // 直筒子市，无区县
    // https://baike.baidu.com/item/%E7%9B%B4%E7%AD%92%E5%AD%90%E5%B8%82
    var specialCity = ['460400', '441900', '442000', '620200'];
    var province = pickMap(areas);
    var city = pickMap(province.cities);
    if (specialCity.indexOf(city.code) !== -1) {
      return county(prefix);
    }
    var district = pickMap(city.districts) || '-';
    return prefix ? [province.name, city.name, district].join(' ') : district;
  };
  /**
      * 随机生成一个邮政编码（默认6位数字）。
      * @param len
      */
  var zip = function zip(len) {
    if (len === void 0) {len = 6;}
    var zip = '';
    for (var i = 0; i < len; i++) {
      zip += natural(0, 9);
    }
    return zip;
  };

  var address = /*#__PURE__*/Object.freeze({
    region: region,
    province: province,
    city: city,
    county: county,
    zip: zip });


  // Miscellaneous
  var areas$1 = location;
  // 随机生成一个 guid
  // http://www.broofa.com/2008/09/javascript-uuid-function/
  var guid = function guid() {
    var pool = 'abcdefABCDEF1234567890';
    return string(pool, 8) + '-' + string(pool, 4) + '-' + string(pool, 4) + '-' + string(pool, 4) + '-' + string(pool, 12);
  };
  var uuid = guid;
  // 随机生成一个 18 位身份证。
  // http://baike.baidu.com/view/1697.htm#4
  // [身份证](http://baike.baidu.com/view/1697.htm#4)
  // 地址码 6 + 出生日期码 8 + 顺序码 3 + 校验码 1
  // [《中华人民共和国行政区划代码》国家标准(GB/T2260)](http://zhidao.baidu.com/question/1954561.html)
  var id = function id() {
    var _id;
    var _sum = 0;
    var rank = ['7', '9', '10', '5', '8', '4', '2', '1', '6', '3', '7', '9', '10', '5', '8', '4', '2'];
    var last = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    // 直筒子市，无区县
    // https://baike.baidu.com/item/%E7%9B%B4%E7%AD%92%E5%AD%90%E5%B8%82
    var specialCity = ['460400', '441900', '442000', '620200'];
    var province = pickMap(areas$1);
    var city = pickMap(province.cities);
    if (specialCity.indexOf(city.code) !== -1) {
      return id();
    }
    var districts = city.districts;
    var district = pick(keys(districts));
    _id = district + date('yyyyMMdd') + string('number', 3);
    for (var i = 0; i < _id.length; i++) {
      _sum += _id[i] * Number(rank[i]);
    }
    _id += last[_sum % 11];
    return _id;
  };
  // 生成一个全局的自增整数。
  // 类似自增主键（auto increment primary key）。
  var key = 0;
  var increment = function increment(step) {
    return key += Number(step) || 1; // step?
  };
  var inc = increment;
  /**
                        * 随机生成一个版本号
                        * @param depth 版本号的层级，默认为3
                        */
  var version = function version(depth) {
    if (depth === void 0) {depth = 3;}
    var numbers = [];
    for (var i = 0; i < depth; i++) {
      numbers.push(natural(0, 10));
    }
    return numbers.join('.');
  };
  // 随机生成一个中国手机号
  var phone = function phone() {
    var segments = [
    // 移动号段
    '134', '135', '136', '137', '138', '139', '147', '150', '151', '152', '157', '158', '159', '165', '172', '178', '182', '183', '184', '187', '188',
    // 联通号段
    '130', '131', '132', '145', '155', '156', '171', '175', '176', '185', '186',
    // 电信号段
    '133', '149', '153', '173', '174', '177', '180', '181', '189', '191'];

    return pick(segments) + string('number', 8);
  };

  var misc = /*#__PURE__*/Object.freeze({
    guid: guid,
    uuid: uuid,
    id: id,
    increment: increment,
    inc: inc,
    version: version,
    phone: phone });


  var Random = _assign(_assign(_assign(_assign(_assign(_assign(_assign(_assign(_assign(_assign({}, basic), date$1), image$1), color$1), text), name$1), web), address), helper), misc);

  // 解析数据模板（属性名部分）。
  var parse = function parse(name) {
    name = name === undefined ? '' : name + '';
    var parameters = name.match(constant.RE_KEY);
    // name|min-max, name|count
    var range = parameters && parameters[3] && parameters[3].match(constant.RE_RANGE);
    var min = range && range[1] && parseInt(range[1], 10);
    var max = range && range[2] && parseInt(range[2], 10);
    // 如果是 min-max, 返回 min-max 之间的一个数
    // 如果是 count, 返回 count
    var count = range ?
    range[2] ?
    Random.integer(Number(min), Number(max)) :
    parseInt(range[1], 10) :
    undefined;
    var decimal = parameters && parameters[4] && parameters[4].match(constant.RE_RANGE);
    var dmin = decimal && decimal[1] && parseInt(decimal[1], 10);
    var dmax = decimal && decimal[2] && parseInt(decimal[2], 10);
    // int || dmin-dmax
    var dcount = decimal ?
    decimal[2] ?
    Random.integer(Number(dmin), Number(dmax)) :
    parseInt(decimal[1], 10) :
    undefined;
    var result = {
      // 1 name, 2 inc, 3 range, 4 decimal
      parameters: parameters,
      // 1 min, 2 max
      range: range,
      min: min,
      max: max,
      count: count,
      decimal: decimal,
      dmin: dmin,
      dmax: dmax,
      dcount: dcount };

    for (var r in result) {
      if (result[r] != undefined) {
        return result;
      }
    }
    return {};
  };

  // ## RegExp Handler
  // ASCII printable code chart
  var LOWER = ascii(97, 122);
  var UPPER = ascii(65, 90);
  var NUMBER = ascii(48, 57);
  var OTHER = ascii(32, 47) + ascii(58, 64) + ascii(91, 96) + ascii(123, 126); // 排除 95 _ ascii(91, 94) + ascii(96, 96)
  var PRINTABLE = ascii(32, 126);
  var SPACE = " \f\n\r\t\x0B\xA0\u2028\u2029";
  var CHARACTER_CLASSES = {
    '\\w': LOWER + UPPER + NUMBER + '_',
    '\\W': OTHER.replace('_', ''), '\\s': SPACE, '\\S': function () {
      var result = PRINTABLE;
      for (var i = 0; i < SPACE.length; i++) {
        result = result.replace(SPACE[i], '');
      }
      return result;
    }(), '\\d': NUMBER, '\\D': LOWER + UPPER + OTHER };

  function ascii(from, to) {
    var result = '';
    for (var i = from; i <= to; i++) {
      result += String.fromCharCode(i);
    }
    return result;
  }
  var handler = {
    // var ast = RegExpParser.parse(regexp.source)
    gen: function gen(node, result, cache) {
      cache = cache || {
        guid: 1 };

      return handler[node.type] ? handler[node.type](node, result, cache) : handler.token(node);
    },
    token: function token(node) {
      switch (node.type) {
        case 'start':
        case 'end':
          return '';
        case 'any-character':
          return Random.character();
        case 'backspace':
          return '';
        case 'word-boundary': // TODO
          return '';
        case 'non-word-boundary': // TODO
          break;
        case 'digit':
          return Random.pick(NUMBER.split(''));
        case 'non-digit':
          return Random.pick((LOWER + UPPER + OTHER).split(''));
        case 'form-feed':
          break;
        case 'line-feed':
          return node.body || node.text;
        case 'carriage-return':
          break;
        case 'white-space':
          return Random.pick(SPACE.split(''));
        case 'non-white-space':
          return Random.pick((LOWER + UPPER + NUMBER).split(''));
        case 'tab':
          break;
        case 'vertical-tab':
          break;
        case 'word': // \w [a-zA-Z0-9]
          return Random.pick((LOWER + UPPER + NUMBER).split(''));
        case 'non-word': // \W [^a-zA-Z0-9]
          return Random.pick(OTHER.replace('_', '').split(''));
        case 'null-character':
          break;}

      return node.body || node.text;
    },
    // {
    //   type: 'alternate',
    //   offset: 0,
    //   text: '',
    //   left: {
    //     boyd: []
    //   },
    //   right: {
    //     boyd: []
    //   }
    // }
    alternate: function alternate(node, result, cache) {
      // node.left/right {}
      return handler.gen(Random.boolean() ? node.left : node.right, result, cache);
    },
    // {
    //   type: 'match',
    //   offset: 0,
    //   text: '',
    //   body: []
    // }
    match: function match(node, result, cache) {
      result = '';
      // node.body []
      for (var i = 0; i < node.body.length; i++) {
        result += handler.gen(node.body[i], result, cache);
      }
      return result;
    },
    // ()
    'capture-group': function captureGroup(node, result, cache) {
      // node.body {}
      result = handler.gen(node.body, result, cache);
      cache[cache.guid++] = result;
      return result;
    },
    // (?:...)
    'non-capture-group': function nonCaptureGroup(node, result, cache) {
      // node.body {}
      return handler.gen(node.body, result, cache);
    },
    // (?=p)
    'positive-lookahead': function positiveLookahead(node, result, cache) {
      // node.body
      return handler.gen(node.body, result, cache);
    },
    // (?!p)
    'negative-lookahead': function negativeLookahead() {
      // node.body
      return '';
    },
    // {
    //   type: 'quantified',
    //   offset: 3,
    //   text: 'c*',
    //   body: {
    //     type: 'literal',
    //     offset: 3,
    //     text: 'c',
    //     body: 'c',
    //     escaped: false
    //   },
    //   quantifier: {
    //     type: 'quantifier',
    //     offset: 4,
    //     text: '*',
    //     min: 0,
    //     max: Infinity,
    //     greedy: true
    //   }
    // }
    quantified: function quantified(node, result, cache) {
      result = '';
      // node.quantifier {}
      var count = handler.quantifier(node.quantifier);
      // node.body {}
      for (var i = 0; i < count; i++) {
        result += handler.gen(node.body, result, cache);
      }
      return result;
    },
    // quantifier: {
    //   type: 'quantifier',
    //   offset: 4,
    //   text: '*',
    //   min: 0,
    //   max: Infinity,
    //   greedy: true
    // }
    quantifier: function quantifier(node) {
      var min = Math.max(node.min, 0);
      var max = isFinite(node.max) ? node.max : min + Random.integer(3, 7);
      return Random.integer(min, max);
    },
    charset: function charset(node, result, cache) {
      // node.invert
      if (node.invert) {
        return handler['invert-charset'](node, result, cache);
      }
      // node.body []
      var literal = Random.pick(node.body);
      return handler.gen(literal, result, cache);
    },
    'invert-charset': function invertCharset(node, result, cache) {
      var pool = PRINTABLE;
      var item;
      for (var i = 0; i < node.body.length; i++) {
        item = node.body[i];
        switch (item.type) {
          case 'literal':
            pool = pool.replace(item.body, '');
            break;
          case 'range':
            var min = handler.gen(item.start, result, cache).charCodeAt();
            var max = handler.gen(item.end, result, cache).charCodeAt();
            for (var ii = min; ii <= max; ii++) {
              pool = pool.replace(String.fromCharCode(ii), '');
            }
          /* falls through */
          default:
            var characters = CHARACTER_CLASSES[item.text];
            if (characters) {
              for (var iii = 0; iii <= characters.length; iii++) {
                pool = pool.replace(characters[iii], '');
              }
            }}

      }
      return Random.pick(pool.split(''));
    },
    range: function range(node, result, cache) {
      // node.start, node.end
      var min = handler.gen(node.start, result, cache).charCodeAt();
      var max = handler.gen(node.end, result, cache).charCodeAt();
      return String.fromCharCode(Random.integer(min, max));
    },
    literal: function literal(node) {
      return node.escaped ? node.body : node.text;
    },
    // Unicode \u
    unicode: function unicode(node) {
      return String.fromCharCode(parseInt(node.code, 16));
    },
    // 十六进制 \xFF
    hex: function hex(node) {
      return String.fromCharCode(parseInt(node.code, 16));
    },
    octal: function octal(node) {
      return String.fromCharCode(parseInt(node.code, 8));
    },
    // 反向引用
    'back-reference': function backReference(node, result, cache) {
      return cache[node.code] || '';
    },
    // http://en.wikipedia.org/wiki/C0_and_C1_control_codes
    CONTROL_CHARACTER_MAP: function () {
      var CONTROL_CHARACTER = '@ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ \\ ] ^ _'.split(' ');
      var CONTROL_CHARACTER_UNICODE = "\0 \x01 \x02 \x03 \x04 \x05 \x06 \x07 \b \t \n \x0B \f \r \x0E \x0F \x10 \x11 \x12 \x13 \x14 \x15 \x16 \x17 \x18 \x19 \x1A \x1B \x1C \x1D \x1E \x1F".split(' ');
      var map = {};
      for (var i = 0; i < CONTROL_CHARACTER.length; i++) {
        map[CONTROL_CHARACTER[i]] = CONTROL_CHARACTER_UNICODE[i];
      }
      return map;
    }(),
    'control-character': function controlCharacter(node) {
      return this.CONTROL_CHARACTER_MAP[node.code];
    } };


  // https://github.com/nuysoft/regexp
  // forked from https://github.com/ForbesLindesay/regexp
  function Token(n) {
    this.type = n, this.offset = Token.offset(), this.text = Token.text();
  }

  function Alternate(n, l) {
    Token.call(this, 'alternate'), this.left = n, this.right = l;
  }

  function Match(n) {
    Token.call(this, 'match'), this.body = n.filter(Boolean);
  }

  function Group(n, l) {
    Token.call(this, n), this.body = l;
  }

  function CaptureGroup(n) {
    Group.call(this, 'capture-group'), this.index = cgs[this.offset] || (cgs[this.offset] = index++),
    this.body = n;
  }

  function Quantified(n, l) {
    Token.call(this, 'quantified'), this.body = n, this.quantifier = l;
  }

  function Quantifier(n, l) {
    Token.call(this, 'quantifier'), this.min = n, this.max = l, this.greedy = !0;
  }

  function CharSet(n, l) {
    Token.call(this, 'charset'), this.invert = n, this.body = l;
  }

  function CharacterRange(n, l) {
    Token.call(this, 'range'), this.start = n, this.end = l;
  }

  function Literal(n) {
    Token.call(this, 'literal'), this.body = n, this.escaped = this.body != this.text;
  }

  function Unicode(n) {
    Token.call(this, 'unicode'), this.code = n.toUpperCase();
  }

  function Hex(n) {
    Token.call(this, 'hex'), this.code = n.toUpperCase();
  }

  function Octal(n) {
    Token.call(this, 'octal'), this.code = n.toUpperCase();
  }

  function BackReference(n) {
    Token.call(this, 'back-reference'), this.code = n.toUpperCase();
  }

  function ControlCharacter(n) {
    Token.call(this, 'control-character'), this.code = n.toUpperCase();
  }

  var parser = function () {
    function n(n, l) {
      function u() {
        this.constructor = n;
      }

      u.prototype = l.prototype, n.prototype = new u();
    }

    function l(n, l, u, t, r) {
      function e(n, l) {
        function u(n) {
          function l(n) {
            return n.charCodeAt(0).toString(16).toUpperCase();
          }

          return n.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\x08/g, '\\b').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\f/g, '\\f').replace(/\r/g, '\\r').replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (n) {
            return '\\x0' + l(n);
          }).replace(/[\x10-\x1F\x80-\xFF]/g, function (n) {
            return '\\x' + l(n);
          }).replace(/[\u0180-\u0FFF]/g, function (n) {
            return "\\u0" + l(n);
          }).replace(/[\u1080-\uFFFF]/g, function (n) {
            return "\\u" + l(n);
          });
        }

        var t, r;
        switch (n.length) {
          case 0:
            t = 'end of input';
            break;

          case 1:
            t = n[0];
            break;

          default:
            t = n.slice(0, -1).join(', ') + ' or ' + n[n.length - 1];}

        return r = l ? '"' + u(l) + '"' : 'end of input', 'Expected ' + t + ' but ' + r + ' found.';
      }

      this.expected = n, this.found = l, this.offset = u, this.line = t, this.column = r,
      this.name = 'SyntaxError', this.message = e(n, l);
    }

    function u(n) {
      function u() {
        return n.substring(Lt, qt);
      }

      function t() {
        return Lt;
      }

      function r(l) {
        function u(l, u, t) {
          var r, e;
          for (r = u; t > r; r++) {e = n.charAt(r), '\n' === e ? (l.seenCR || l.line++, l.column = 1,
            l.seenCR = !1) : '\r' === e || "\u2028" === e || "\u2029" === e ? (l.line++, l.column = 1,
            l.seenCR = !0) : (l.column++, l.seenCR = !1);}
        }

        return Mt !== l && (Mt > l && (Mt = 0, Dt = {
          line: 1,
          column: 1,
          seenCR: !1 }),
        u(Dt, Mt, l), Mt = l), Dt;
      }

      function e(n) {
        Ht > qt || (qt > Ht && (Ht = qt, Ot = []), Ot.push(n));
      }

      function o(n) {
        var l = 0;
        for (n.sort(); l < n.length;) {n[l - 1] === n[l] ? n.splice(l, 1) : l++;}
      }

      function c() {
        var l, u, t, r, o;
        return l = qt, u = i(), null !== u ? (t = qt, 124 === n.charCodeAt(qt) ? (r = fl,
        qt++) : (r = null, 0 === Wt && e(sl)), null !== r ? (o = c(), null !== o ? (r = [r, o],
        t = r) : (qt = t, t = il)) : (qt = t, t = il), null === t && (t = al), null !== t ? (Lt = l,
        u = hl(u, t), null === u ? (qt = l, l = u) : l = u) : (qt = l, l = il)) : (qt = l,
        l = il), l;
      }

      function i() {
        var n, l, u, t, r;
        if (n = qt, l = f(), null === l && (l = al), null !== l) {if (u = qt, Wt++, t = d(),
          Wt--, null === t ? u = al : (qt = u, u = il), null !== u) {
            for (t = [], r = h(), null === r && (r = a()); null !== r;) {t.push(r), r = h(),
              null === r && (r = a());}
            null !== t ? (r = s(), null === r && (r = al), null !== r ? (Lt = n, l = dl(l, t, r),
            null === l ? (qt = n, n = l) : n = l) : (qt = n, n = il)) : (qt = n, n = il);
          } else qt = n, n = il;} else qt = n, n = il;
        return n;
      }

      function a() {
        var n;
        return n = x(), null === n && (n = Q(), null === n && (n = B())), n;
      }

      function f() {
        var l, u;
        return l = qt, 94 === n.charCodeAt(qt) ? (u = pl, qt++) : (u = null, 0 === Wt && e(vl)),
        null !== u && (Lt = l, u = wl()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function s() {
        var l, u;
        return l = qt, 36 === n.charCodeAt(qt) ? (u = Al, qt++) : (u = null, 0 === Wt && e(Cl)),
        null !== u && (Lt = l, u = gl()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function h() {
        var n, l, u;
        return n = qt, l = a(), null !== l ? (u = d(), null !== u ? (Lt = n, l = bl(l, u),
        null === l ? (qt = n, n = l) : n = l) : (qt = n, n = il)) : (qt = n, n = il), n;
      }

      function d() {
        var n, l, u;
        return Wt++, n = qt, l = p(), null !== l ? (u = k(), null === u && (u = al), null !== u ? (Lt = n,
        l = Tl(l, u), null === l ? (qt = n, n = l) : n = l) : (qt = n, n = il)) : (qt = n,
        n = il), Wt--, null === n && (l = null, 0 === Wt && e(kl)), n;
      }

      function p() {
        var n;
        return n = v(), null === n && (n = w(), null === n && (n = A(), null === n && (n = C(),
        null === n && (n = g(), null === n && (n = b()))))), n;
      }

      function v() {
        var l, u, t, r, o, c;
        return l = qt, 123 === n.charCodeAt(qt) ? (u = xl, qt++) : (u = null, 0 === Wt && e(yl)),
        null !== u ? (t = T(), null !== t ? (44 === n.charCodeAt(qt) ? (r = ml, qt++) : (r = null,
        0 === Wt && e(Rl)), null !== r ? (o = T(), null !== o ? (125 === n.charCodeAt(qt) ? (c = Fl,
        qt++) : (c = null, 0 === Wt && e(Ql)), null !== c ? (Lt = l, u = Sl(t, o), null === u ? (qt = l,
        l = u) : l = u) : (qt = l, l = il)) : (qt = l, l = il)) : (qt = l, l = il)) : (qt = l,
        l = il)) : (qt = l, l = il), l;
      }

      function w() {
        var l, u, t, r;
        return l = qt, 123 === n.charCodeAt(qt) ? (u = xl, qt++) : (u = null, 0 === Wt && e(yl)),
        null !== u ? (t = T(), null !== t ? (n.substr(qt, 2) === Ul ? (r = Ul, qt += 2) : (r = null,
        0 === Wt && e(El)), null !== r ? (Lt = l, u = Gl(t), null === u ? (qt = l, l = u) : l = u) : (qt = l,
        l = il)) : (qt = l, l = il)) : (qt = l, l = il), l;
      }

      function A() {
        var l, u, t, r;
        return l = qt, 123 === n.charCodeAt(qt) ? (u = xl, qt++) : (u = null, 0 === Wt && e(yl)),
        null !== u ? (t = T(), null !== t ? (125 === n.charCodeAt(qt) ? (r = Fl, qt++) : (r = null,
        0 === Wt && e(Ql)), null !== r ? (Lt = l, u = Bl(t), null === u ? (qt = l, l = u) : l = u) : (qt = l,
        l = il)) : (qt = l, l = il)) : (qt = l, l = il), l;
      }

      function C() {
        var l, u;
        return l = qt, 43 === n.charCodeAt(qt) ? (u = jl, qt++) : (u = null, 0 === Wt && e($l)),
        null !== u && (Lt = l, u = ql()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function g() {
        var l, u;
        return l = qt, 42 === n.charCodeAt(qt) ? (u = Ll, qt++) : (u = null, 0 === Wt && e(Ml)),
        null !== u && (Lt = l, u = Dl()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function b() {
        var l, u;
        return l = qt, 63 === n.charCodeAt(qt) ? (u = Hl, qt++) : (u = null, 0 === Wt && e(Ol)),
        null !== u && (Lt = l, u = Wl()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function k() {
        var l;
        return 63 === n.charCodeAt(qt) ? (l = Hl, qt++) : (l = null, 0 === Wt && e(Ol)),
        l;
      }

      function T() {
        var l, u, t;
        if (l = qt, u = [], zl.test(n.charAt(qt)) ? (t = n.charAt(qt), qt++) : (t = null,
        0 === Wt && e(Il)), null !== t) for (; null !== t;) {u.push(t), zl.test(n.charAt(qt)) ? (t = n.charAt(qt),
          qt++) : (t = null, 0 === Wt && e(Il));} else u = il;
        return null !== u && (Lt = l, u = Jl(u)), null === u ? (qt = l, l = u) : l = u,
        l;
      }

      function x() {
        var l, u, t, r;
        return l = qt, 40 === n.charCodeAt(qt) ? (u = Kl, qt++) : (u = null, 0 === Wt && e(Nl)),
        null !== u ? (t = R(), null === t && (t = F(), null === t && (t = m(), null === t && (t = y()))),
        null !== t ? (41 === n.charCodeAt(qt) ? (r = Pl, qt++) : (r = null, 0 === Wt && e(Vl)),
        null !== r ? (Lt = l, u = Xl(t), null === u ? (qt = l, l = u) : l = u) : (qt = l,
        l = il)) : (qt = l, l = il)) : (qt = l, l = il), l;
      }

      function y() {
        var n, l;
        return n = qt, l = c(), null !== l && (Lt = n, l = Yl(l)), null === l ? (qt = n,
        n = l) : n = l, n;
      }

      function m() {
        var l, u, t;
        return l = qt, n.substr(qt, 2) === Zl ? (u = Zl, qt += 2) : (u = null, 0 === Wt && e(_l)),
        null !== u ? (t = c(), null !== t ? (Lt = l, u = nu(t), null === u ? (qt = l, l = u) : l = u) : (qt = l,
        l = il)) : (qt = l, l = il), l;
      }

      function R() {
        var l, u, t;
        return l = qt, n.substr(qt, 2) === lu ? (u = lu, qt += 2) : (u = null, 0 === Wt && e(uu)),
        null !== u ? (t = c(), null !== t ? (Lt = l, u = tu(t), null === u ? (qt = l, l = u) : l = u) : (qt = l,
        l = il)) : (qt = l, l = il), l;
      }

      function F() {
        var l, u, t;
        return l = qt, n.substr(qt, 2) === ru ? (u = ru, qt += 2) : (u = null, 0 === Wt && e(eu)),
        null !== u ? (t = c(), null !== t ? (Lt = l, u = ou(t), null === u ? (qt = l, l = u) : l = u) : (qt = l,
        l = il)) : (qt = l, l = il), l;
      }

      function Q() {
        var l, u, t, r, o;
        if (Wt++, l = qt, 91 === n.charCodeAt(qt) ? (u = iu, qt++) : (u = null, 0 === Wt && e(au)),
        null !== u) {if (94 === n.charCodeAt(qt) ? (t = pl, qt++) : (t = null, 0 === Wt && e(vl)),
          null === t && (t = al), null !== t) {
            for (r = [], o = S(), null === o && (o = U()); null !== o;) {r.push(o), o = S(),
              null === o && (o = U());}
            null !== r ? (93 === n.charCodeAt(qt) ? (o = fu, qt++) : (o = null, 0 === Wt && e(su)),
            null !== o ? (Lt = l, u = hu(t, r), null === u ? (qt = l, l = u) : l = u) : (qt = l,
            l = il)) : (qt = l, l = il);
          } else qt = l, l = il;} else qt = l, l = il;
        return Wt--, null === l && (u = null, 0 === Wt && e(cu)), l;
      }

      function S() {
        var l, u, t, r;
        return Wt++, l = qt, u = U(), null !== u ? (45 === n.charCodeAt(qt) ? (t = pu, qt++) : (t = null,
        0 === Wt && e(vu)), null !== t ? (r = U(), null !== r ? (Lt = l, u = wu(u, r), null === u ? (qt = l,
        l = u) : l = u) : (qt = l, l = il)) : (qt = l, l = il)) : (qt = l, l = il), Wt--,
        null === l && (u = null, 0 === Wt && e(du)), l;
      }

      function U() {
        var n;
        return Wt++, n = G(), null === n && (n = E()), Wt--, null === n && 0 === Wt && e(Au),
        n;
      }

      function E() {
        var l, u;
        return l = qt, Cu.test(n.charAt(qt)) ? (u = n.charAt(qt), qt++) : (u = null, 0 === Wt && e(gu)),
        null !== u && (Lt = l, u = bu(u)), null === u ? (qt = l, l = u) : l = u, l;
      }

      function G() {
        var n;
        return n = L(), null === n && (n = Y(), null === n && (n = H(), null === n && (n = O(),
        null === n && (n = W(), null === n && (n = z(), null === n && (n = I(), null === n && (n = J(),
        null === n && (n = K(), null === n && (n = N(), null === n && (n = P(), null === n && (n = V(),
        null === n && (n = X(), null === n && (n = _(), null === n && (n = nl(), null === n && (n = ll(),
        null === n && (n = ul(), null === n && (n = tl()))))))))))))))))), n;
      }

      function B() {
        var n;
        return n = j(), null === n && (n = q(), null === n && (n = $())), n;
      }

      function j() {
        var l, u;
        return l = qt, 46 === n.charCodeAt(qt) ? (u = ku, qt++) : (u = null, 0 === Wt && e(Tu)),
        null !== u && (Lt = l, u = xu()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function $() {
        var l, u;
        return Wt++, l = qt, mu.test(n.charAt(qt)) ? (u = n.charAt(qt), qt++) : (u = null,
        0 === Wt && e(Ru)), null !== u && (Lt = l, u = bu(u)), null === u ? (qt = l, l = u) : l = u,
        Wt--, null === l && (u = null, 0 === Wt && e(yu)), l;
      }

      function q() {
        var n;
        return n = M(), null === n && (n = D(), null === n && (n = Y(), null === n && (n = H(),
        null === n && (n = O(), null === n && (n = W(), null === n && (n = z(), null === n && (n = I(),
        null === n && (n = J(), null === n && (n = K(), null === n && (n = N(), null === n && (n = P(),
        null === n && (n = V(), null === n && (n = X(), null === n && (n = Z(), null === n && (n = _(),
        null === n && (n = nl(), null === n && (n = ll(), null === n && (n = ul(), null === n && (n = tl()))))))))))))))))))),
        n;
      }

      function L() {
        var l, u;
        return l = qt, n.substr(qt, 2) === Fu ? (u = Fu, qt += 2) : (u = null, 0 === Wt && e(Qu)),
        null !== u && (Lt = l, u = Su()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function M() {
        var l, u;
        return l = qt, n.substr(qt, 2) === Fu ? (u = Fu, qt += 2) : (u = null, 0 === Wt && e(Qu)),
        null !== u && (Lt = l, u = Uu()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function D() {
        var l, u;
        return l = qt, n.substr(qt, 2) === Eu ? (u = Eu, qt += 2) : (u = null, 0 === Wt && e(Gu)),
        null !== u && (Lt = l, u = Bu()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function H() {
        var l, u;
        return l = qt, n.substr(qt, 2) === ju ? (u = ju, qt += 2) : (u = null, 0 === Wt && e($u)),
        null !== u && (Lt = l, u = qu()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function O() {
        var l, u;
        return l = qt, n.substr(qt, 2) === Lu ? (u = Lu, qt += 2) : (u = null, 0 === Wt && e(Mu)),
        null !== u && (Lt = l, u = Du()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function W() {
        var l, u;
        return l = qt, n.substr(qt, 2) === Hu ? (u = Hu, qt += 2) : (u = null, 0 === Wt && e(Ou)),
        null !== u && (Lt = l, u = Wu()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function z() {
        var l, u;
        return l = qt, n.substr(qt, 2) === zu ? (u = zu, qt += 2) : (u = null, 0 === Wt && e(Iu)),
        null !== u && (Lt = l, u = Ju()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function I() {
        var l, u;
        return l = qt, n.substr(qt, 2) === Ku ? (u = Ku, qt += 2) : (u = null, 0 === Wt && e(Nu)),
        null !== u && (Lt = l, u = Pu()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function J() {
        var l, u;
        return l = qt, n.substr(qt, 2) === Vu ? (u = Vu, qt += 2) : (u = null, 0 === Wt && e(Xu)),
        null !== u && (Lt = l, u = Yu()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function K() {
        var l, u;
        return l = qt, n.substr(qt, 2) === Zu ? (u = Zu, qt += 2) : (u = null, 0 === Wt && e(_u)),
        null !== u && (Lt = l, u = nt()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function N() {
        var l, u;
        return l = qt, n.substr(qt, 2) === lt ? (u = lt, qt += 2) : (u = null, 0 === Wt && e(ut)),
        null !== u && (Lt = l, u = tt()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function P() {
        var l, u;
        return l = qt, n.substr(qt, 2) === rt ? (u = rt, qt += 2) : (u = null, 0 === Wt && e(et)),
        null !== u && (Lt = l, u = ot()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function V() {
        var l, u;
        return l = qt, n.substr(qt, 2) === ct ? (u = ct, qt += 2) : (u = null, 0 === Wt && e(it)),
        null !== u && (Lt = l, u = at()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function X() {
        var l, u;
        return l = qt, n.substr(qt, 2) === ft ? (u = ft, qt += 2) : (u = null, 0 === Wt && e(st)),
        null !== u && (Lt = l, u = ht()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function Y() {
        var l, u, t;
        return l = qt, n.substr(qt, 2) === dt ? (u = dt, qt += 2) : (u = null, 0 === Wt && e(pt)),
        null !== u ? (n.length > qt ? (t = n.charAt(qt), qt++) : (t = null, 0 === Wt && e(vt)),
        null !== t ? (Lt = l, u = wt(t), null === u ? (qt = l, l = u) : l = u) : (qt = l,
        l = il)) : (qt = l, l = il), l;
      }

      function Z() {
        var l, u, t;
        return l = qt, 92 === n.charCodeAt(qt) ? (u = At, qt++) : (u = null, 0 === Wt && e(Ct)),
        null !== u ? (gt.test(n.charAt(qt)) ? (t = n.charAt(qt), qt++) : (t = null, 0 === Wt && e(bt)),
        null !== t ? (Lt = l, u = kt(t), null === u ? (qt = l, l = u) : l = u) : (qt = l,
        l = il)) : (qt = l, l = il), l;
      }

      function _() {
        var l, u, t, r;
        if (l = qt, n.substr(qt, 2) === Tt ? (u = Tt, qt += 2) : (u = null, 0 === Wt && e(xt)),
        null !== u) {
          if (t = [], yt.test(n.charAt(qt)) ? (r = n.charAt(qt), qt++) : (r = null, 0 === Wt && e(mt)),
          null !== r) for (; null !== r;) {t.push(r), yt.test(n.charAt(qt)) ? (r = n.charAt(qt),
            qt++) : (r = null, 0 === Wt && e(mt));} else t = il;
          null !== t ? (Lt = l, u = Rt(t), null === u ? (qt = l, l = u) : l = u) : (qt = l,
          l = il);
        } else qt = l, l = il;
        return l;
      }

      function nl() {
        var l, u, t, r;
        if (l = qt, n.substr(qt, 2) === Ft ? (u = Ft, qt += 2) : (u = null, 0 === Wt && e(Qt)),
        null !== u) {
          if (t = [], St.test(n.charAt(qt)) ? (r = n.charAt(qt), qt++) : (r = null, 0 === Wt && e(Ut)),
          null !== r) for (; null !== r;) {t.push(r), St.test(n.charAt(qt)) ? (r = n.charAt(qt),
            qt++) : (r = null, 0 === Wt && e(Ut));} else t = il;
          null !== t ? (Lt = l, u = Et(t), null === u ? (qt = l, l = u) : l = u) : (qt = l,
          l = il);
        } else qt = l, l = il;
        return l;
      }

      function ll() {
        var l, u, t, r;
        if (l = qt, n.substr(qt, 2) === Gt ? (u = Gt, qt += 2) : (u = null, 0 === Wt && e(Bt)),
        null !== u) {
          if (t = [], St.test(n.charAt(qt)) ? (r = n.charAt(qt), qt++) : (r = null, 0 === Wt && e(Ut)),
          null !== r) for (; null !== r;) {t.push(r), St.test(n.charAt(qt)) ? (r = n.charAt(qt),
            qt++) : (r = null, 0 === Wt && e(Ut));} else t = il;
          null !== t ? (Lt = l, u = jt(t), null === u ? (qt = l, l = u) : l = u) : (qt = l,
          l = il);
        } else qt = l, l = il;
        return l;
      }

      function ul() {
        var l, u;
        return l = qt, n.substr(qt, 2) === Tt ? (u = Tt, qt += 2) : (u = null, 0 === Wt && e(xt)),
        null !== u && (Lt = l, u = $t()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function tl() {
        var l, u, t;
        return l = qt, 92 === n.charCodeAt(qt) ? (u = At, qt++) : (u = null, 0 === Wt && e(Ct)),
        null !== u ? (n.length > qt ? (t = n.charAt(qt), qt++) : (t = null, 0 === Wt && e(vt)),
        null !== t ? (Lt = l, u = bu(t), null === u ? (qt = l, l = u) : l = u) : (qt = l,
        l = il)) : (qt = l, l = il), l;
      }

      var rl,el = arguments.length > 1 ? arguments[1] : {},ol = {
        regexp: c },
      cl = c,il = null,al = '',fl = '|',sl = '"|"',hl = function hl(n, l) {
        return l ? new Alternate(n, l[1]) : n;
      },dl = function dl(n, l, u) {
        return new Match([n].concat(l).concat([u]));
      },pl = '^',vl = '"^"',wl = function wl() {
        return new Token('start');
      },Al = '$',Cl = '"$"',gl = function gl() {
        return new Token('end');
      },bl = function bl(n, l) {
        return new Quantified(n, l);
      },kl = 'Quantifier',Tl = function Tl(n, l) {
        return l && (n.greedy = !1), n;
      },xl = '{',yl = '"{"',ml = ',',Rl = '","',Fl = '}',Ql = '"}"',Sl = function Sl(n, l) {
        return new Quantifier(n, l);
      },Ul = ',}',El = '",}"',Gl = function Gl(n) {
        return new Quantifier(n, 1 / 0);
      },Bl = function Bl(n) {
        return new Quantifier(n, n);
      },jl = '+',$l = '"+"',ql = function ql() {
        return new Quantifier(1, 1 / 0);
      },Ll = '*',Ml = '"*"',Dl = function Dl() {
        return new Quantifier(0, 1 / 0);
      },Hl = '?',Ol = '"?"',Wl = function Wl() {
        return new Quantifier(0, 1);
      },zl = /^[0-9]/,Il = '[0-9]',Jl = function Jl(n) {
        return +n.join('');
      },Kl = '(',Nl = '"("',Pl = ')',Vl = '")"',Xl = function Xl(n) {
        return n;
      },Yl = function Yl(n) {
        return new CaptureGroup(n);
      },Zl = '?:',_l = '"?:"',nu = function nu(n) {
        return new Group('non-capture-group', n);
      },lu = '?=',uu = '"?="',tu = function tu(n) {
        return new Group('positive-lookahead', n);
      },ru = '?!',eu = '"?!"',ou = function ou(n) {
        return new Group('negative-lookahead', n);
      },cu = 'CharacterSet',iu = '[',au = '"["',fu = ']',su = '"]"',hu = function hu(n, l) {
        return new CharSet(!!n, l);
      },du = 'CharacterRange',pu = '-',vu = '"-"',wu = function wu(n, l) {
        return new CharacterRange(n, l);
      },Au = 'Character',Cu = /^[^\\\]]/,gu = '[^\\\\\\]]',bu = function bu(n) {
        return new Literal(n);
      },ku = '.',Tu = '"."',xu = function xu() {
        return new Token('any-character');
      },yu = 'Literal',mu = /^[^|\\\/.[()?+*$\^]/,Ru = '[^|\\\\\\/.[()?+*$\\^]',Fu = '\\b',Qu = '"\\\\b"',
      Su = function Su() {
        return new Token('backspace');
      },Uu = function Uu() {
        return new Token('word-boundary');
      },Eu = '\\B',Gu = '"\\\\B"',Bu = function Bu() {
        return new Token('non-word-boundary');
      },ju = '\\d',$u = '"\\\\d"',qu = function qu() {
        return new Token('digit');
      },Lu = '\\D',Mu = '"\\\\D"',Du = function Du() {
        return new Token('non-digit');
      },Hu = '\\f',Ou = '"\\\\f"',Wu = function Wu() {
        return new Token('form-feed');
      },zu = '\\n',Iu = '"\\\\n"',Ju = function Ju() {
        return new Token('line-feed');
      },Ku = '\\r',Nu = '"\\\\r"',Pu = function Pu() {
        return new Token('carriage-return');
      },Vu = '\\s',Xu = '"\\\\s"',Yu = function Yu() {
        return new Token('white-space');
      },Zu = '\\S',_u = '"\\\\S"',nt = function nt() {
        return new Token('non-white-space');
      },lt = '\\t',ut = '"\\\\t"',tt = function tt() {
        return new Token('tab');
      },rt = '\\v',et = '"\\\\v"',ot = function ot() {
        return new Token('vertical-tab');
      },ct = '\\w',it = '"\\\\w"',at = function at() {
        return new Token('word');
      },ft = '\\W',st = '"\\\\W"',ht = function ht() {
        return new Token('non-word');
      },dt = '\\c',pt = '"\\\\c"',vt = 'any character',wt = function wt(n) {
        return new ControlCharacter(n);
      },At = '\\',Ct = '"\\\\"',gt = /^[1-9]/,bt = '[1-9]',kt = function kt(n) {
        return new BackReference(n);
      },Tt = '\\0',xt = '"\\\\0"',yt = /^[0-7]/,mt = '[0-7]',Rt = function Rt(n) {
        return new Octal(n.join(''));
      },Ft = '\\x',Qt = '"\\\\x"',St = /^[0-9a-fA-F]/,Ut = '[0-9a-fA-F]',Et = function Et(n) {
        return new Hex(n.join(''));
      },Gt = "\\u",Bt = "\"\\\\u\"",jt = function jt(n) {
        return new Unicode(n.join(''));
      },$t = function $t() {
        return new Token('null-character');
      },qt = 0,Lt = 0,Mt = 0,Dt = {
        line: 1,
        column: 1,
        seenCR: !1 },
      Ht = 0,Ot = [],Wt = 0;
      if ('startRule' in el) {
        if (!(el.startRule in ol)) throw new Error('Can\'t start parsing from rule "' + el.startRule + '".');
        cl = ol[el.startRule];
      }
      if (Token.offset = t, Token.text = u, rl = cl(), null !== rl && qt === n.length) return rl;
      throw o(Ot), Lt = Math.max(qt, Ht), new l(Ot, Lt < n.length ? n.charAt(Lt) : null, Lt, r(Lt).line, r(Lt).column);
    }

    return n(l, Error), {
      SyntaxError: l,
      parse: u };

  }(),index = 1,cgs = {};

  var RE = {
    Parser: parser,
    Handler: handler };


  // 处理数据模板。
  var handler$1 = {
    // template        属性值（即数据模板）
    // name            属性名
    // context         数据上下文，生成后的数据
    // templateContext 模板上下文，
    //
    // Handle.gen(template, name, options)
    // context
    //     currentContext, templateCurrentContext,
    //     path, templatePath
    //     root, templateRoot
    gen: function gen(template, name, context) {
      name = name === undefined ? '' : name.toString();
      context = context || {};
      context = {
        // 当前访问路径，只有属性名，不包括生成规则
        path: context.path || [constant.GUID],
        templatePath: context.templatePath || [constant.GUID++],
        currentContext: context.currentContext,
        templateCurrentContext: context.templateCurrentContext || template,
        root: context.root || context.currentContext,
        templateRoot: context.templateRoot || context.templateCurrentContext || template };

      var rule = parse(name);
      var type$1 = _type(template);
      var data;
      if (handler$1[type$1]) {
        data = handler$1[type$1]({
          type: type$1,
          template: template,
          name: name,
          rule: rule,
          context: context,
          parsedName: name ? name.replace(constant.RE_KEY, '$1') : name });

        if (!context.root) {
          context.root = data;
        }
        return data;
      }
      return template;
    },
    array: function array(options) {
      var result = [];
      // 'name|1': []
      // 'name|count': []
      // 'name|min-max': []
      if (options.template.length === 0)
      return result;
      // 'arr': [{ 'email': '@EMAIL' }, { 'email': '@EMAIL' }]
      if (!options.rule.parameters) {
        for (var i = 0; i < options.template.length; i++) {
          options.context.path.push(i);
          options.context.templatePath.push(i);
          result.push(handler$1.gen(options.template[i], i, {
            path: options.context.path,
            templatePath: options.context.templatePath,
            currentContext: result,
            templateCurrentContext: options.template,
            root: options.context.root || result,
            templateRoot: options.context.templateRoot || options.template }));

          options.context.path.pop();
          options.context.templatePath.pop();
        }
      } else
      {
        // 'method|1': ['GET', 'POST', 'HEAD', 'DELETE']
        if (options.rule.min === 1 && options.rule.max === undefined) {
          // fix Mock.js#17
          options.context.path.push(options.name);
          options.context.templatePath.push(options.name);
          result = Random.pick(handler$1.gen(options.template, undefined, {
            path: options.context.path,
            templatePath: options.context.templatePath,
            currentContext: result,
            templateCurrentContext: options.template,
            root: options.context.root || result,
            templateRoot: options.context.templateRoot || options.template }));

          options.context.path.pop();
          options.context.templatePath.pop();
        } else
        {
          // 'data|+1': [{}, {}]
          if (options.rule.parameters[2]) {
            options.template.__order_index = options.template.__order_index || 0;
            options.context.path.push(options.name);
            options.context.templatePath.push(options.name);
            result = handler$1.gen(options.template, undefined, {
              path: options.context.path,
              templatePath: options.context.templatePath,
              currentContext: result,
              templateCurrentContext: options.template,
              root: options.context.root || result,
              templateRoot: options.context.templateRoot || options.template })[
            options.template.__order_index % options.template.length];
            options.template.__order_index += +options.rule.parameters[2];
            options.context.path.pop();
            options.context.templatePath.pop();
          } else
          if (options.rule.count) {
            // 'data|1-10': [{}]
            for (var i = 0; i < options.rule.count; i++) {
              // 'data|1-10': [{}, {}]
              for (var ii = 0; ii < options.template.length; ii++) {
                options.context.path.push(result.length);
                options.context.templatePath.push(ii);
                result.push(handler$1.gen(options.template[ii], result.length, {
                  path: options.context.path,
                  templatePath: options.context.templatePath,
                  currentContext: result,
                  templateCurrentContext: options.template,
                  root: options.context.root || result,
                  templateRoot: options.context.templateRoot || options.template }));

                options.context.path.pop();
                options.context.templatePath.pop();
              }
            }
          }
        }
      }
      return result;
    },
    object: function object(options) {
      var result = {};
      var keys$1;
      var fnKeys;
      var key;
      var parsedKey;
      var inc;
      var i;
      // 'obj|min-max': {}
      if (options.rule.min != undefined) {
        keys$1 = keys(options.template);
        keys$1 = Random.shuffle(keys$1);
        keys$1 = keys$1.slice(0, options.rule.count);
        for (i = 0; i < keys$1.length; i++) {
          key = keys$1[i];
          parsedKey = key.replace(constant.RE_KEY, '$1');
          options.context.path.push(parsedKey);
          options.context.templatePath.push(key);
          result[parsedKey] = handler$1.gen(options.template[key], key, {
            path: options.context.path,
            templatePath: options.context.templatePath,
            currentContext: result,
            templateCurrentContext: options.template,
            root: options.context.root || result,
            templateRoot: options.context.templateRoot || options.template });

          options.context.path.pop();
          options.context.templatePath.pop();
        }
      } else
      {
        // 'obj': {}
        keys$1 = [];
        fnKeys = []; // Mock.js#25 改变了非函数属性的顺序，查找起来不方便
        for (key in options.template) {
          var target = typeof options.template[key] === 'function' ? fnKeys : keys$1;
          target.push(key);
        }
        keys$1 = keys$1.concat(fnKeys);
        for (i = 0; i < keys$1.length; i++) {
          key = keys$1[i];
          parsedKey = key.replace(constant.RE_KEY, '$1');
          options.context.path.push(parsedKey);
          options.context.templatePath.push(key);
          result[parsedKey] = handler$1.gen(options.template[key], key, {
            path: options.context.path,
            templatePath: options.context.templatePath,
            currentContext: result,
            templateCurrentContext: options.template,
            root: options.context.root || result,
            templateRoot: options.context.templateRoot || options.template });

          options.context.path.pop();
          options.context.templatePath.pop();
          // 'id|+1': 1
          inc = key.match(constant.RE_KEY);
          if (inc && inc[2] && _type(options.template[key]) === 'number') {
            options.template[key] += parseInt(inc[2], 10);
          }
        }
      }
      return result;
    },
    number: function number(options) {
      var result;
      var parts;
      if (options.rule.decimal) {
        // float
        options.template += '';
        parts = options.template.split('.');
        // 'float1|.1-10': 10,
        // 'float2|1-100.1-10': 1,
        // 'float3|999.1-10': 1,
        // 'float4|.3-10': 123.123,
        parts[0] = options.rule.range ? options.rule.count : parts[0];
        parts[1] = (parts[1] || '').slice(0, options.rule.dcount);
        while (parts[1].length < options.rule.dcount) {
          // 最后一位不能为 0：如果最后一位为 0，会被 JS 引擎忽略掉。
          parts[1] += parts[1].length < options.rule.dcount - 1 ?
          Random.character('number') :
          Random.character('123456789');
        }
        result = parseFloat(parts.join('.'));
      } else
      {
        // integer
        // 'grade1|1-100': 1,
        result = options.rule.range && !options.rule.parameters[2] ? options.rule.count : options.template;
      }
      return result;
    },
    boolean: function boolean(options) {
      // 'prop|multiple': false, 当前值是相反值的概率倍数
      // 'prop|probability-probability': false, 当前值与相反值的概率
      var result = options.rule.parameters ?
      Random.bool(Number(options.rule.min), Number(options.rule.max), options.template) :
      options.template;
      return result;
    },
    string: function string(options) {
      var source = '';
      var result = '';
      var match;
      var lastIndex = 0;
      if (options.template.length) {
        // 'foo': '★',
        if (options.rule.count === undefined) {
          source += options.template;
        } else
        {
          // 'star|1-5': '★',
          for (var i = 0; i < options.rule.count; i++) {
            source += options.template;
          }
        }
        // 'email|1-10': '@EMAIL, ',
        constant.RE_PLACEHOLDER.exec('');
        while (match = constant.RE_PLACEHOLDER.exec(source)) {
          var index = match.index;
          var input = match[0];
          if (index >= lastIndex) {
            // 遇到转义斜杠，不需要解析占位符
            if (/^\\/.test(input)) {
              result += source.slice(lastIndex, index) + input.slice(1);
              lastIndex = index + input.length;
              continue;
            }
            var replaced = handler$1.placeholder(input, options.context.currentContext, options.context.templateCurrentContext, options);
            // 只有一个占位符，并且没有其他字符，例如：'name': '@EMAIL'
            if (index === 0 && input.length === source.length) {
              result = replaced;
            } else
            {
              result += source.slice(lastIndex, index) + replaced;
            }
            lastIndex = index + input.length;
          }
        }
        if (lastIndex < source.length) {
          result += source.slice(lastIndex);
        }
      } else
      {
        // 'ASCII|1-10': '',
        // 'ASCII': '',
        result = options.rule.range ? Random.string(options.rule.count) : options.template;
      }
      return result;
    },
    function: function _function(options) {
      // ( context, options )
      return options.template.call(options.context.currentContext, options);
    },
    regexp: function regexp(options) {
      var source = '';
      // 'name': /regexp/,
      if (options.rule.count === undefined) {
        source += options.template.source; // regexp.source
      } else
      {
        // 'name|1-5': /regexp/,
        for (var i = 0; i < options.rule.count; i++) {
          source += options.template.source;
        }
      }
      return RE.Handler.gen(RE.Parser.parse(source));
    },
    _all: function _all() {
      var re = {};
      for (var key in Random) {
        re[key.toLowerCase()] = key;
      }
      return re;
    },
    // 处理占位符，转换为最终值
    placeholder: function placeholder(_placeholder, obj, templateContext, options) {
      // 1 key, 2 params
      // regexp init
      constant.RE_PLACEHOLDER.exec('');
      var parts = constant.RE_PLACEHOLDER.exec(_placeholder);
      var key = parts && parts[1];
      var lkey = key && key.toLowerCase();
      var okey = handler$1._all()[lkey];
      var paramsInput = parts && parts[2] || '';
      var pathParts = handler$1.splitPathToArray(key);
      var params = [];
      // 解析占位符的参数
      try {
        // 1. 尝试保持参数的类型
        // #24 [Window Firefox 30.0 引用 占位符 抛错](https://github.com/nuysoft/Mock/issues/24)
        // [BX9056: 各浏览器下 window.eval 方法的执行上下文存在差异](http://www.w3help.org/zh-cn/causes/BX9056)
        // 应该属于 Window Firefox 30.0 的 BUG
        params = eval('(function(){ return [].splice.call(arguments, 0 ) })(' + paramsInput + ')');
      }
      catch (error) {
        // 2. 如果失败，先使用 `[]` 包裹，用 JSON.parse 尝试解析
        try {
          var paramsString = paramsInput.replace(/'/g, '"');
          params = JSON.parse("[" + paramsString + "]");
        }
        catch (e) {
          // 3. 逗号 split 方案兜底
          params = paramsInput.split(/,\s*/);
        }
      }
      // 占位符优先引用数据模板中的属性
      // { first: '@EMAIL', full: '@first' } =>  { first: 'dsa@163.com', full: 'dsa@163.com' }
      if (obj && key in obj) {
        return obj[key];
      }
      // 绝对路径 or 相对路径
      if (key.charAt(0) === '/' || pathParts.length > 1) {
        return handler$1.getValueByKeyPath(key, options);
      }
      // 递归引用数据模板中的属性
      // fix Mock.js#15 避免自己依赖自己)
      if (templateContext && typeof templateContext === 'object' && key in templateContext && _placeholder !== templateContext[key]) {
        // 先计算被引用的属性值
        templateContext[key] = handler$1.gen(templateContext[key], key, {
          currentContext: obj, templateCurrentContext: templateContext });

        return templateContext[key];
      }
      // 如果未找到，则原样返回
      if (!(key in Random) && !(lkey in Random) && !(okey in Random)) {
        return _placeholder;
      }
      // 递归解析参数中的占位符
      for (var i = 0; i < params.length; i++) {
        constant.RE_PLACEHOLDER.exec('');
        if (constant.RE_PLACEHOLDER.test(params[i])) {
          params[i] = handler$1.placeholder(params[i], obj, templateContext, options);
        }
      }
      var handle = Random[key] || Random[lkey] || Random[okey];
      if (isFunction(handle)) {
        // 执行占位符方法（大多数情况）
        handle.options = options;
        var ret = handle.apply(Random, params);
        // 因为是在字符串中，所以默认为空字符串。
        if (ret === undefined) {
          ret = '';
        }
        delete handle.options;
        return ret;
      }
      return '';
    },
    getValueByKeyPath: function getValueByKeyPath(key, options) {
      var originalKey = key;
      var keyPathParts = handler$1.splitPathToArray(key);
      var absolutePathParts = [];
      // 绝对路径
      if (key.charAt(0) === '/') {
        absolutePathParts = [options.context.path[0]].concat(handler$1.normalizePath(keyPathParts));
      } else
      {
        // 相对路径
        if (keyPathParts.length > 1) {
          absolutePathParts = options.context.path.slice(0);
          absolutePathParts.pop();
          absolutePathParts = handler$1.normalizePath(absolutePathParts.concat(keyPathParts));
        }
      }
      try {
        key = keyPathParts[keyPathParts.length - 1];
        var currentContext = options.context.root;
        var templateCurrentContext = options.context.templateRoot;
        for (var i = 1; i < absolutePathParts.length - 1; i++) {
          currentContext = currentContext[absolutePathParts[i]];
          templateCurrentContext = templateCurrentContext[absolutePathParts[i]];
        }
        // 引用的值已经计算好
        if (currentContext && key in currentContext) {
          return currentContext[key];
        }
        // 尚未计算，递归引用数据模板中的属性
        // fix #15 避免自己依赖自己
        if (templateCurrentContext &&
        typeof templateCurrentContext === 'object' &&
        key in templateCurrentContext &&
        originalKey !== templateCurrentContext[key]) {
          // 先计算被引用的属性值
          templateCurrentContext[key] = handler$1.gen(templateCurrentContext[key], key, {
            currentContext: currentContext,
            templateCurrentContext: templateCurrentContext });

          return templateCurrentContext[key];
        }
      }
      catch (e) {}
      return '@' + keyPathParts.join('/');
    },
    // https://github.com/kissyteam/kissy/blob/master/src/path/src/path.js
    normalizePath: function normalizePath(pathParts) {
      var newPathParts = [];
      for (var i = 0; i < pathParts.length; i++) {
        switch (pathParts[i]) {
          case '..':
            newPathParts.pop();
            break;
          case '.':
            break;
          default:
            newPathParts.push(pathParts[i]);}

      }
      return newPathParts;
    },
    splitPathToArray: function splitPathToArray(path) {
      return path.split(/\/+/).filter(function (_) {return _;});
    } };


  // 把 Mock.js 风格的数据模板转换成 JSON Schema。
  function toJSONSchema(template, name, path) {
    path = path || [];
    var result = {
      name: typeof name === 'string' ? name.replace(constant.RE_KEY, '$1') : name,
      template: template,
      type: _type(template),
      rule: parse(name),
      path: path.slice(0) };

    result.path.push(name === undefined ? 'ROOT' : result.name);
    if (isArray(template)) {
      result.items = [];
      template.forEach(function (item, index) {
        result.items.push(toJSONSchema(item, index, result.path));
      });
    } else
    if (isObject(template)) {
      result.properties = [];
      for (var key in template) {
        result.properties.push(toJSONSchema(template[key], key, result.path));
      }
    }
    return result;
  }

  // ## valid(template, data)
  var Diff = {
    diff: function diff(schema, data, name) {
      var result = [];
      // 先检测名称 name 和类型 type，如果匹配，才有必要继续检测
      if (Diff.name(schema, data, name, result) && Diff.type(schema, data, name, result)) {
        Diff.value(schema, data, name, result);
        Diff.properties(schema, data, name, result);
        Diff.items(schema, data, name, result);
      }
      return result;
    },
    /* jshint unused:false */
    name: function name(schema, _data, _name2, result) {
      var length = result.length;
      Assert.equal('name', schema.path, _name2 + '', schema.name + '', result);
      return result.length === length;
    },
    type: function type(schema, data, _name, result) {
      var length = result.length;
      if (isString(schema.template)) {
        // 跳过含有『占位符』的属性值，因为『占位符』返回值的类型可能和模板不一致，例如 '@int' 会返回一个整形值
        if (schema.template.match(constant.RE_PLACEHOLDER)) {
          return true;
        }
      } else
      if (isArray(schema.template)) {
        if (schema.rule.parameters) {
          // name|count: array
          if (schema.rule.min !== undefined && schema.rule.max === undefined) {
            // 跳过 name|1: array，因为最终值的类型（很可能）不是数组，也不一定与 `array` 中的类型一致
            if (schema.rule.count === 1) {
              return true;
            }
          }
          // 跳过 name|+inc: array
          if (schema.rule.parameters[2]) {
            return true;
          }
        }
      } else
      if (isFunction(schema.template)) {
        // 跳过 `'name': function`，因为函数可以返回任何类型的值。
        return true;
      }
      Assert.equal('type', schema.path, _type(data), schema.type, result);
      return result.length === length;
    },
    value: function value(schema, data, name, result) {
      var length = result.length;
      var rule = schema.rule;
      var templateType = schema.type;
      if (templateType === 'object' || templateType === 'array' || templateType === 'function') {
        return true;
      }
      // 无生成规则
      if (!rule.parameters) {
        if (isRegExp(schema.template)) {
          Assert.match('value', schema.path, data, schema.template, result);
          return result.length === length;
        }
        if (isString(schema.template)) {
          // 同样跳过含有『占位符』的属性值，因为『占位符』的返回值会通常会与模板不一致
          if (schema.template.match(constant.RE_PLACEHOLDER)) {
            return result.length === length;
          }
        }
        Assert.equal('value', schema.path, data, schema.template, result);
        return result.length === length;
      }
      // 有生成规则
      var actualRepeatCount;
      if (isNumber(schema.template)) {
        var parts = (data + '').split('.');
        var intPart = Number(parts[0]);
        var floatPart = parts[1];
        // 整数部分
        // |min-max
        if (rule.min !== undefined && rule.max !== undefined) {
          Assert.greaterThanOrEqualTo('value', schema.path, intPart, Math.min(Number(rule.min), Number(rule.max)), result);
          // , 'numeric instance is lower than the required minimum (minimum: {expected}, found: {actual})')
          Assert.lessThanOrEqualTo('value', schema.path, intPart, Math.max(Number(rule.min), Number(rule.max)), result);
        }
        // |count
        if (rule.min !== undefined && rule.max === undefined) {
          Assert.equal('value', schema.path, intPart, Number(rule.min), result, '[value] ' + name);
        }
        // 小数部分
        if (rule.decimal) {
          // |dmin-dmax
          if (rule.dmin !== undefined && rule.dmax !== undefined) {
            Assert.greaterThanOrEqualTo('value', schema.path, floatPart.length, Number(rule.dmin), result);
            Assert.lessThanOrEqualTo('value', schema.path, floatPart.length, Number(rule.dmax), result);
          }
          // |dcount
          if (rule.dmin !== undefined && rule.dmax === undefined) {
            Assert.equal('value', schema.path, floatPart.length, Number(rule.dmin), result);
          }
        }
      } else
      if (isString(schema.template)) {
        // 'aaa'.match(/a/g)
        actualRepeatCount = data.match(new RegExp(schema.template, 'g'));
        actualRepeatCount = actualRepeatCount ? actualRepeatCount.length : 0;
        // |min-max
        if (rule.min !== undefined && rule.max !== undefined) {
          Assert.greaterThanOrEqualTo('repeat count', schema.path, actualRepeatCount, Number(rule.min), result);
          Assert.lessThanOrEqualTo('repeat count', schema.path, actualRepeatCount, Number(rule.max), result);
        }
        // |count
        if (rule.min !== undefined && rule.max === undefined) {
          Assert.equal('repeat count', schema.path, actualRepeatCount, rule.min, result);
        }
      } else
      if (isRegExp(schema.template)) {
        actualRepeatCount = data.match(new RegExp(schema.template.source.replace(/^\^|\$$/g, ''), 'g'));
        actualRepeatCount = actualRepeatCount ? actualRepeatCount.length : 0;
        // |min-max
        if (rule.min !== undefined && rule.max !== undefined) {
          Assert.greaterThanOrEqualTo('repeat count', schema.path, actualRepeatCount, Number(rule.min), result);
          Assert.lessThanOrEqualTo('repeat count', schema.path, actualRepeatCount, Number(rule.max), result);
        }
        // |count
        if (rule.min !== undefined && rule.max === undefined) {
          Assert.equal('repeat count', schema.path, actualRepeatCount, rule.min, result);
        }
      }
      return result.length === length;
    },
    properties: function properties(schema, data, _name, result) {
      var length = result.length;
      var rule = schema.rule;
      var keys$1 = keys(data);
      if (!schema.properties) {
        return;
      }
      // 无生成规则
      if (!schema.rule.parameters) {
        Assert.equal('properties length', schema.path, keys$1.length, schema.properties.length, result);
      } else
      {
        // 有生成规则
        // |min-max
        if (rule.min !== undefined && rule.max !== undefined) {
          Assert.greaterThanOrEqualTo('properties length', schema.path, keys$1.length, Math.min(Number(rule.min), Number(rule.max)), result);
          Assert.lessThanOrEqualTo('properties length', schema.path, keys$1.length, Math.max(Number(rule.min), Number(rule.max)), result);
        }
        // |count
        if (rule.min !== undefined && rule.max === undefined) {
          // |1, |>1
          if (rule.count !== 1) {
            Assert.equal('properties length', schema.path, keys$1.length, Number(rule.min), result);
          }
        }
      }
      if (result.length !== length) {
        return false;
      }
      var _loop_1 = function _loop_1(i) {
        var property;
        schema.properties.forEach(function (item) {
          if (item.name === keys$1[i]) {
            property = item;
          }
        });
        property = property || schema.properties[i];
        result.push.apply(result, Diff.diff(property, data[keys$1[i]], keys$1[i]));
      };
      for (var i = 0; i < keys$1.length; i++) {
        _loop_1(i);
      }
      return result.length === length;
    },
    items: function items(schema, data, _name, result) {
      var length = result.length;
      if (!schema.items) {
        return;
      }
      var rule = schema.rule;
      // 无生成规则
      if (!schema.rule.parameters) {
        Assert.equal('items length', schema.path, data.length, schema.items.length, result);
      } else
      {
        // 有生成规则
        // |min-max
        if (rule.min !== undefined && rule.max !== undefined) {
          Assert.greaterThanOrEqualTo('items', schema.path, data.length, Math.min(Number(rule.min), Number(rule.max)) * schema.items.length, result, '[{utype}] array is too short: {path} must have at least {expected} elements but instance has {actual} elements');
          Assert.lessThanOrEqualTo('items', schema.path, data.length, Math.max(Number(rule.min), Number(rule.max)) * schema.items.length, result, '[{utype}] array is too long: {path} must have at most {expected} elements but instance has {actual} elements');
        }
        // |count
        if (rule.min !== undefined && rule.max === undefined) {
          // |1, |>1
          if (rule.count === 1) {
            return result.length === length;
          } else
          {
            Assert.equal('items length', schema.path, data.length, Number(rule.min) * schema.items.length, result);
          }
        }
        // |+inc
        if (rule.parameters && rule.parameters[2]) {
          return result.length === length;
        }
      }
      if (result.length !== length) {
        return false;
      }
      for (var i = 0; i < data.length; i++) {
        result.push.apply(result, Diff.diff(schema.items[i % schema.items.length], data[i], i % schema.items.length));
      }
      return result.length === length;
    } };

  // 完善、友好的提示信息
  //
  // Equal, not equal to, greater than, less than, greater than or equal to, less than or equal to
  // 路径 验证类型 描述
  //
  // Expect path.name is less than or equal to expected, but path.name is actual.
  //
  //   Expect path.name is less than or equal to expected, but path.name is actual.
  //   Expect path.name is greater than or equal to expected, but path.name is actual.
  var Assert = {
    message: function message(item) {
      if (item.message) {
        return item.message;
      }
      var upperType = item.type.toUpperCase();
      var lowerType = item.type.toLowerCase();
      var path = isArray(item.path) && item.path.join('.') || item.path;
      var action = item.action;
      var expected = item.expected;
      var actual = item.actual;
      return "[" + upperType + "] Expect " + path + "'" + lowerType + " " + action + " " + expected + ", but is " + actual;
    },
    equal: function equal(type, path, actual, expected, result, message) {
      if (actual === expected) {
        return true;
      }
      // 正则模板 === 字符串最终值
      if (type === 'type' && expected === 'regexp' && actual === 'string') {
        return true;
      }
      result.push(Assert.createDiffResult(type, path, actual, expected, message, 'is equal to'));
      return false;
    },
    // actual matches expected
    match: function match(type, path, actual, expected, result, message) {
      if (expected.test(actual)) {
        return true;
      }
      result.push(Assert.createDiffResult(type, path, actual, expected, message, 'matches'));
      return false;
    },
    greaterThanOrEqualTo: function greaterThanOrEqualTo(type, path, actual, expected, result, message) {
      if (actual >= expected) {
        return true;
      }
      result.push(Assert.createDiffResult(type, path, actual, expected, message, 'is greater than or equal to'));
      return false;
    },
    lessThanOrEqualTo: function lessThanOrEqualTo(type, path, actual, expected, result, message) {
      if (actual <= expected) {
        return true;
      }
      result.push(Assert.createDiffResult(type, path, actual, expected, message, 'is less than or equal to'));
      return false;
    },
    createDiffResult: function createDiffResult(type, path, actual, expected, message, action) {
      var item = {
        path: path,
        type: type,
        actual: actual,
        expected: expected,
        action: action,
        message: message };

      item.message = Assert.message(item);
      return item;
    } };

  var valid = function valid(template, data) {
    var schema = toJSONSchema(template);
    return Diff.diff(schema, data);
  };
  valid.Diff = Diff;
  valid.Assert = Assert;

  function rgx(str, loose) {
    if (str instanceof RegExp) return { keys: false, pattern: str };
    var c,o,tmp,ext,keys = [],pattern = '',arr = str.split('/');
    arr[0] || arr.shift();

    while (tmp = arr.shift()) {
      c = tmp[0];
      if (c === '*') {
        keys.push('wild');
        pattern += '/(.*)';
      } else if (c === ':') {
        o = tmp.indexOf('?', 1);
        ext = tmp.indexOf('.', 1);
        keys.push(tmp.substring(1, !!~o ? o : !!~ext ? ext : tmp.length));
        pattern += !!~o && !~ext ? '(?:/([^/]+?))?' : '/([^/]+?)';
        if (!!~ext) pattern += (!!~o ? '?' : '') + '\\' + tmp.substring(ext);
      } else {
        pattern += '/' + tmp;
      }
    }

    return {
      keys: keys,
      pattern: new RegExp('^' + pattern + (loose ? '(?=$|\/)' : '\/?$'), 'i') };

  }

  var IMocked = /** @class */function () {
    function IMocked() {
      this._mocked = {};
    }
    IMocked.prototype.set = function (key, value) {
      this._mocked[key] = value;
    };
    IMocked.prototype.getMocked = function () {
      return this._mocked;
    };
    // 查找与请求参数匹配的数据模板：URL，Type
    IMocked.prototype.find = function (url, type) {
      var mockedItems = Object.values(this._mocked);
      for (var i = 0; i < mockedItems.length; i++) {
        var item = mockedItems[i];
        var urlMatched = this._matchUrl(item.rurl, url);
        var typeMatched = this._matchType(item.rtype, type);
        if (!item.rtype && urlMatched) {
          return item;
        }
        if (urlMatched && typeMatched) {
          return item;
        }
      }
    };
    /**
        * 数据模板转换成 mock 数据
        * @param item 发请求时匹配到的 mock 数据源
        * @param options 包含请求头，请求体，请求方法等
        */
    IMocked.prototype.convert = function (item, options) {
      return isFunction(item.template) ? item.template(options) : handler$1.gen(item.template);
    };
    IMocked.prototype._matchUrl = function (expected, actual) {
      if (isString(expected)) {
        if (expected === actual) {
          return true;
        }
        // expected: /hello/world
        // actual: /hello/world?type=1
        if (actual.indexOf(expected) === 0 && actual[expected.length] === '?') {
          return true;
        }
        if (expected.indexOf('/') === 0) {
          return rgx(expected).pattern.test(actual);
        }
      }
      if (isRegExp(expected)) {
        return expected.test(actual);
      }
      return false;
    };
    IMocked.prototype._matchType = function (expected, actual) {
      if (isString(expected) || isRegExp(expected)) {
        return new RegExp(expected, 'i').test(actual);
      }
      return false;
    };
    return IMocked;
  }();
  var mocked = new IMocked();

  var Setting = /** @class */function () {
    function Setting() {
      this._setting = {
        timeout: '10-100' };

    }
    Setting.prototype.setup = function (setting) {
      Object.assign(this._setting, setting);
    };
    Setting.prototype.parseTimeout = function (timeout) {
      if (timeout === void 0) {timeout = this._setting.timeout;}
      if (typeof timeout === 'number') {
        return timeout;
      }
      if (typeof timeout === 'string' && timeout.indexOf('-') === -1) {
        return parseInt(timeout, 10);
      }
      if (typeof timeout === 'string' && timeout.indexOf('-') !== -1) {
        var tmp = timeout.split('-');
        var min = parseInt(tmp[0], 10);
        var max = parseInt(tmp[1], 10);
        return Math.round(Math.random() * (max - min)) + min;
      }
      return 0;
    };
    return Setting;
  }();
  var setting = new Setting();

  // 获取小程序平台标识
  function getMpPlatform() {
    var global;
    var name;
    if (typeof wx !== 'undefined') {
      global = wx;
      name = 'wx';
    } else
    if (typeof my !== 'undefined') {
      global = my;
      name = 'my';
    } else
    if (typeof tt !== 'undefined') {
      global = tt;
      name = 'tt';
    } else
    if (typeof swan !== 'undefined') {
      global = swan;
      name = 'swan';
    }
    assert(global && name, 'Invalid mini-program platform, just work in "wx", "my", "tt" or "swan"!');
    return { global: global, name: name };
  }
  var platform = getMpPlatform();
  var platformName = platform.name;
  var platformRequest = platform.global.request;
  function MockRequest(opts) {
    var options = {
      url: opts.url,
      type: opts.method || 'GET',
      body: opts.data || null,
      headers: opts.header || opts.headers || {} };

    // 查找与请求参数匹配的数据模板
    var item = mocked.find(options.url, options.type);
    // 如果未找到匹配的数据模板，则采用原生 request 发送请求。
    if (!item) {
      return platformRequest(opts);
    }
    // 找到了匹配的数据模板，拦截 fetch 请求
    var responseData = mocked.convert(item, options);
    var successOptions;
    if (platformName === 'my') {
      successOptions = {
        status: 200,
        data: responseData,
        headers: {} };

    } else
    {
      successOptions = {
        statusCode: 200,
        data: responseData,
        header: {} };

    }
    if (isFunction(opts.success) || isFunction(opts.complete)) {
      setTimeout(function () {
        isFunction(opts.success) && opts.success(successOptions);
        isFunction(opts.complete) && opts.complete(successOptions);
      }, setting.parseTimeout());
    }
  }
  // 覆盖原生的 request 方法
  function overrideRequest() {
    if (!platform.global.request.__MOCK__) {
      // 小程序 API 做了 setter 限制，不能直接复制
      Object.defineProperty(platform.global, 'request', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: MockRequest });

      platform.global.request.__MOCK__ = true;
    }
  }

  // For mini-program
  var Mock = {
    Handler: handler$1,
    Random: Random,
    Util: Util,
    RE: RE,
    toJSONSchema: toJSONSchema,
    valid: valid,
    mock: mock,
    setup: setting.setup.bind(setting),
    _mocked: mocked.getMocked(),
    version: '0.2.6' };

  // 根据数据模板生成模拟数据。
  function mock(rurl, rtype, template) {
    assert(arguments.length, 'The mock function needs to pass at least one parameter!');
    // Mock.mock(template)
    if (arguments.length === 1) {
      return handler$1.gen(rurl);
    }
    // Mock.mock(url, template)
    if (arguments.length === 2) {
      template = rtype;
      rtype = undefined;
    }
    overrideRequest();
    var key = String(rurl) + String(rtype);
    mocked.set(key, { rurl: rurl, rtype: rtype, template: template });
    return Mock;
  }

  return Mock;

});

/***/ }),

/***/ 44:
/*!**************************************************!*\
  !*** D:/xiaoma/项目/sdyj-dispatch/libs/bmap-wx.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * @file 微信小程序JSAPI
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * @author 崔健 cuijian03@baidu.com 2017.01.10
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * @update 邓淑芳 623996689@qq.com 2019.07.03
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * 百度地图微信小程序API类
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * @class
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   */var
BMapWX = /*#__PURE__*/function () {"use strict";

  /**
                                                  * 百度地图微信小程序API类
                                                  *
                                                  * @constructor
                                                  */
  function BMapWX(param) {_classCallCheck(this, BMapWX);
    this.ak = param["ak"];
  }

  /**
     * 使用微信接口进行定位
     *
     * @param {string} type 坐标类型
     * @param {Function} success 成功执行
     * @param {Function} fail 失败执行
     * @param {Function} complete 完成后执行
     */_createClass(BMapWX, [{ key: "getWXLocation", value: function getWXLocation(
    type, success, fail, complete) {
      type = type || 'gcj02',
      success = success || function () {};
      fail = fail || function () {};
      complete = complete || function () {};
      wx.getLocation({
        type: type,
        success: success,
        fail: fail,
        complete: complete });

    }

    /**
       * POI周边检索
       *
       * @param {Object} param 检索配置
       * 参数对象结构可以参考
       * http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-placeapi
       */ }, { key: "search", value: function search(
    param) {
      var that = this;
      param = param || {};
      var searchparam = {
        query: param["query"] || '生活服务$美食&酒店',
        scope: param["scope"] || 1,
        filter: param["filter"] || '',
        coord_type: param["coord_type"] || 2,
        page_size: param["page_size"] || 10,
        page_num: param["page_num"] || 0,
        output: param["output"] || 'json',
        ak: that.ak,
        sn: param["sn"] || '',
        timestamp: param["timestamp"] || '',
        radius: param["radius"] || 2000,
        ret_coordtype: 'gcj02ll' };

      var otherparam = {
        iconPath: param["iconPath"],
        iconTapPath: param["iconTapPath"],
        width: param["width"],
        height: param["height"],
        alpha: param["alpha"] || 1,
        success: param["success"] || function () {},
        fail: param["fail"] || function () {} };

      var type = 'gcj02';
      var locationsuccess = function locationsuccess(result) {
        searchparam["location"] = result["latitude"] + ',' + result["longitude"];
        wx.request({
          url: 'https://api.map.baidu.com/place/v2/search',
          data: searchparam,
          header: {
            "content-type": "application/json" },

          method: 'GET',
          success: function success(data) {
            var res = data["data"];
            if (res["status"] === 0) {
              var poiArr = res["results"];
              // outputRes 包含两个对象，
              // originalData为百度接口返回的原始数据
              // wxMarkerData为小程序规范的marker格式
              var outputRes = {};
              outputRes["originalData"] = res;
              outputRes["wxMarkerData"] = [];
              for (var i = 0; i < poiArr.length; i++) {
                outputRes["wxMarkerData"][i] = {
                  id: i,
                  latitude: poiArr[i]["location"]["lat"],
                  longitude: poiArr[i]["location"]["lng"],
                  title: poiArr[i]["name"],
                  iconPath: otherparam["iconPath"],
                  iconTapPath: otherparam["iconTapPath"],
                  address: poiArr[i]["address"],
                  telephone: poiArr[i]["telephone"],
                  alpha: otherparam["alpha"],
                  width: otherparam["width"],
                  height: otherparam["height"] };

              }
              otherparam.success(outputRes);
            } else {
              otherparam.fail({
                errMsg: res["message"],
                statusCode: res["status"] });

            }
          },
          fail: function fail(data) {
            otherparam.fail(data);
          } });

      };
      var locationfail = function locationfail(result) {
        otherparam.fail(result);
      };
      var locationcomplete = function locationcomplete(result) {
      };
      if (!param["location"]) {
        that.getWXLocation(type, locationsuccess, locationfail, locationcomplete);
      } else {
        var longitude = param.location.split(',')[1];
        var latitude = param.location.split(',')[0];
        var errMsg = 'input location';
        var res = {
          errMsg: errMsg,
          latitude: latitude,
          longitude: longitude };

        locationsuccess(res);
      }
    }

    /**
       * sug模糊检索
       *
       * @param {Object} param 检索配置
       * 参数对象结构可以参考
       * http://lbsyun.baidu.com/index.php?title=webapi/place-suggestion-api
       */ }, { key: "suggestion", value: function suggestion(
    param) {
      var that = this;
      param = param || {};
      var suggestionparam = {
        query: param["query"] || '',
        region: param["region"] || '全国',
        city_limit: param["city_limit"] || false,
        output: param["output"] || 'json',
        ak: that.ak,
        sn: param["sn"] || '',
        timestamp: param["timestamp"] || '',
        ret_coordtype: 'gcj02ll' };

      var otherparam = {
        success: param["success"] || function () {},
        fail: param["fail"] || function () {} };

      wx.request({
        url: 'https://api.map.baidu.com/place/v2/suggestion',
        data: suggestionparam,
        header: {
          "content-type": "application/json" },

        method: 'GET',
        success: function success(data) {
          var res = data["data"];
          if (res["status"] === 0) {
            otherparam.success(res);
          } else {
            otherparam.fail({
              errMsg: res["message"],
              statusCode: res["status"] });

          }
        },
        fail: function fail(data) {
          otherparam.fail(data);
        } });

    }

    /**
       * rgc检索（逆地理编码：经纬度->地点描述）
       * 
       * @param {Object} param 检索配置
       * 参数对象结构可以参考
       * https://lbs.baidu.com/index.php?title=webapi/guide/webservice-geocoding-abroad
       * 
       */ }, { key: "regeocoding", value: function regeocoding(
    param) {
      var that = this;
      param = param || {};
      var regeocodingparam = {
        coordtype: param["coordtype"] || 'gcj02ll',
        ret_coordtype: 'gcj02ll',
        radius: param["radius"] || 1000,
        ak: that.ak,
        sn: param["sn"] || '',
        output: param["output"] || 'json',
        callback: param["callback"] || function () {},
        extensions_poi: param["extensions_poi"] || 1,
        extensions_road: param["extensions_road"] || false,
        extensions_town: param["extensions_town"] || false,
        language: param["language"] || 'zh-CN',
        language_auto: param["language_auto"] || 0 };

      var otherparam = {
        iconPath: param["iconPath"],
        iconTapPath: param["iconTapPath"],
        width: param["width"],
        height: param["height"],
        alpha: param["alpha"] || 1,
        success: param["success"] || function () {},
        fail: param["fail"] || function () {} };

      var type = 'gcj02';
      var locationsuccess = function locationsuccess(result) {
        regeocodingparam["location"] = result["latitude"] + ',' + result["longitude"];
        wx.request({
          url: 'https://api.map.baidu.com/reverse_geocoding/v3',
          data: regeocodingparam,
          header: {
            "content-type": "application/json" },

          method: 'GET',
          success: function success(data) {
            var res = data["data"];
            if (res["status"] === 0) {
              var poiObj = res["result"];
              // outputRes 包含两个对象：
              // originalData为百度接口返回的原始数据
              // wxMarkerData为小程序规范的marker格式
              var outputRes = {};
              outputRes["originalData"] = res;
              outputRes["wxMarkerData"] = [];
              outputRes["wxMarkerData"][0] = {
                id: 0,
                latitude: result["latitude"],
                longitude: result["longitude"],
                address: poiObj["formatted_address"],
                iconPath: otherparam["iconPath"],
                iconTapPath: otherparam["iconTapPath"],
                desc: poiObj["sematic_description"],
                business: poiObj["business"],
                alpha: otherparam["alpha"],
                width: otherparam["width"],
                height: otherparam["height"] };

              otherparam.success(outputRes);
            } else {
              otherparam.fail({
                errMsg: res["message"],
                statusCode: res["status"] });

            }
          },
          fail: function fail(data) {
            otherparam.fail(data);
          } });

      };
      var locationfail = function locationfail(result) {
        otherparam.fail(result);
      };
      var locationcomplete = function locationcomplete(result) {
      };
      if (!param["location"]) {
        that.getWXLocation(type, locationsuccess, locationfail, locationcomplete);
      } else {
        var longitude = param.location.split(',')[1];
        var latitude = param.location.split(',')[0];
        var errMsg = 'input location';
        var res = {
          errMsg: errMsg,
          latitude: latitude,
          longitude: longitude };

        locationsuccess(res);
      }
    }

    /**
       * gc检索（地理编码：地点->经纬度）
       *
       * @param {Object} param 检索配置
       * 参数对象结构可以参考
       * https://lbs.baidu.com/index.php?title=webapi/guide/webservice-geocoding
       * 
       */ }, { key: "geocoding", value: function geocoding(
    param) {
      var that = this;
      param = param || {};
      var geocodingparam = {
        address: param["address"] || '',
        city: param["city"] || '',
        ret_coordtype: param["coordtype"] || 'gcj02ll',
        ak: that.ak,
        sn: param["sn"] || '',
        output: param["output"] || 'json',
        callback: param["callback"] || function () {} };

      var otherparam = {
        iconPath: param["iconPath"],
        iconTapPath: param["iconTapPath"],
        width: param["width"],
        height: param["height"],
        alpha: param["alpha"] || 1,
        success: param["success"] || function () {},
        fail: param["fail"] || function () {} };

      if (param["address"]) {
        wx.request({
          url: 'https://api.map.baidu.com/geocoding/v3',
          data: geocodingparam,
          header: {
            "content-type": "application/json" },

          method: 'GET',
          success: function success(data) {
            var res = data["data"];
            if (res["status"] === 0) {
              var poiObj = res["result"];
              // outputRes 包含两个对象：
              // originalData为百度接口返回的原始数据
              // wxMarkerData为小程序规范的marker格式
              var outputRes = res;
              outputRes["originalData"] = res;
              outputRes["wxMarkerData"] = [];
              outputRes["wxMarkerData"][0] = {
                id: 0,
                latitude: poiObj["location"]["lat"],
                longitude: poiObj["location"]["lng"],
                iconPath: otherparam["iconPath"],
                iconTapPath: otherparam["iconTapPath"],
                alpha: otherparam["alpha"],
                width: otherparam["width"],
                height: otherparam["height"] };

              otherparam.success(outputRes);
            } else {
              otherparam.fail({
                errMsg: res["message"],
                statusCode: res["status"] });

            }
          },
          fail: function fail(data) {
            otherparam.fail(data);
          } });

      } else {
        var errMsg = 'input address!';
        var res = {
          errMsg: errMsg };

        otherparam.fail(res);
      }
    }

    /**
       * 天气检索
       *
       * @param {Object} param 检索配置
       */ }, { key: "weather", value: function weather(
    param) {
      var that = this;
      param = param || {};
      var weatherparam = {
        coord_type: param["coord_type"] || 'gcj02',
        output: param["output"] || 'json',
        ak: that.ak,
        sn: param["sn"] || '',
        timestamp: param["timestamp"] || '' };

      var otherparam = {
        success: param["success"] || function () {},
        fail: param["fail"] || function () {} };

      var type = 'gcj02';
      var locationsuccess = function locationsuccess(result) {
        weatherparam["location"] = result["longitude"] + ',' + result["latitude"];
        wx.request({
          url: 'https://api.map.baidu.com/telematics/v3/weather',
          data: weatherparam,
          header: {
            "content-type": "application/json" },

          method: 'GET',
          success: function success(data) {
            var res = data["data"];
            if (res["error"] === 0 && res["status"] === 'success') {
              var weatherArr = res["results"];
              // outputRes 包含两个对象，
              // originalData为百度接口返回的原始数据
              // wxMarkerData为小程序规范的marker格式
              var outputRes = {};
              outputRes["originalData"] = res;
              outputRes["currentWeather"] = [];
              outputRes["currentWeather"][0] = {
                currentCity: weatherArr[0]["currentCity"],
                pm25: weatherArr[0]["pm25"],
                date: weatherArr[0]["weather_data"][0]["date"],
                temperature: weatherArr[0]["weather_data"][0]["temperature"],
                weatherDesc: weatherArr[0]["weather_data"][0]["weather"],
                wind: weatherArr[0]["weather_data"][0]["wind"] };

              otherparam.success(outputRes);
            } else {
              otherparam.fail({
                errMsg: res["message"],
                statusCode: res["status"] });

            }
          },
          fail: function fail(data) {
            otherparam.fail(data);
          } });

      };
      var locationfail = function locationfail(result) {
        otherparam.fail(result);
      };
      var locationcomplete = function locationcomplete(result) {
      };
      if (!param["location"]) {
        that.getWXLocation(type, locationsuccess, locationfail, locationcomplete);
      } else {
        var longitude = param.location.split(',')[0];
        var latitude = param.location.split(',')[1];
        var errMsg = 'input location';
        var res = {
          errMsg: errMsg,
          latitude: latitude,
          longitude: longitude };

        locationsuccess(res);
      }
    } }]);return BMapWX;}();


module.exports.BMapWX = BMapWX;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map