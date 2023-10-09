(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_pages_icons_boxicons_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Footer.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Footer.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Footer Component
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Horizontal-navbar.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Horizontal-navbar.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _horizontal_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./horizontal-menu */ "./resources/js/components/horizontal-menu.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");



/**
 * Horiontal-navbar component
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      menuItems: _horizontal_menu__WEBPACK_IMPORTED_MODULE_0__.menuItems
    };
  },
  computed: (0,vuex__WEBPACK_IMPORTED_MODULE_1__.mapState)(["layout"]),
  props: {
    type: {
      type: String,
      required: true
    },
    width: {
      type: String,
      required: true
    },
    menu: {
      type: String,
      required: true
    }
  },
  watch: {
    type: {
      immediate: true,
      handler: function handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "dark":
              document.body.setAttribute("data-topbar-color", "dark");
              break;
            case "light":
              document.body.setAttribute("data-topbar-color", "light");
              break;
            default:
              document.body.setAttribute("data-topbar-color", "dark");
              break;
          }
        }
      }
    },
    width: {
      immediate: true,
      handler: function handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "boxed":
              document.body.setAttribute("data-layout-width", "boxed");
              break;
            case "fluid":
              document.body.setAttribute("data-layout-mode", "horizontal");
              document.body.removeAttribute("data-layout-width");
              break;
            default:
              document.body.setAttribute("data-layout-mode", "fluid");
              break;
          }
        }
      }
    },
    menu: {
      immediate: true,
      handler: function handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "fixed":
              document.body.setAttribute("data-layout-menu-position", "fixed");
              break;
            case "scrollable":
              document.body.setAttribute("data-layout-menu-position", "scrollable");
              break;
            default:
              document.body.setAttribute("data-layout-menu-position", "fixed");
              break;
          }
        }
      }
    }
  },
  mounted: function mounted() {
    var _this = this;
    this.activateParentDropdown();
    this.$router.afterEach(function (routeTo, routeFrom) {
      _this.activateParentDropdown();
    });
  },
  methods: {
    activateParentDropdown: function activateParentDropdown() {
      var resetParent = function resetParent(el) {
        var parent = el.parentElement;
        if (parent) {
          parent.classList.remove("active");
          var parent2 = parent.parentElement;
          if (parent2) {
            parent2.classList.remove("active");
            var parent3 = parent2.parentElement;
            parent3.classList.remove("show");
            if (parent3) {
              parent3.classList.remove("active");
              var parent4 = parent3.parentElement;
              if (parent4) {
                parent4.classList.remove("active");
                var parent5 = parent4.parentElement;
                if (parent5) {
                  parent5.classList.remove("active");
                }
              }
            }
          }
        }
      };
      var links = document.getElementsByClassName("side-nav-link-ref");
      var matchingMenuItem = null;
      for (var _i = 0; _i < links.length; _i++) {
        // reset menu
        resetParent(links[_i]);
      }
      for (var i = 0; i < links.length; i++) {
        if (window.location.pathname === links[i].pathname) {
          matchingMenuItem = links[i];
          break;
        }
      }
      if (matchingMenuItem) {
        matchingMenuItem.classList.add("active");
        var parent = matchingMenuItem.parentElement;
        if (parent) {
          parent.classList.add("active");
          var parent2 = parent.parentElement;
          if (parent2) {
            parent2.classList.add("active");
            var parent3 = parent2.parentElement;
            if (parent3) {
              parent3.classList.add("active");
              var parent4 = parent3.parentElement;
              if (parent4) {
                parent4.classList.add("active");
                var parent5 = parent4.parentElement;
                if (parent5) {
                  parent5.classList.add("active");
                }
              }
            }
          }
        }
      }
    },
    /**
     * Returns true or false if given menu item has child or not
     * @param item menuItem
     */
    hasItems: function hasItems(item) {
      return item.subItems !== undefined ? item.subItems.length > 0 : false;
    },
    /**
     * Menu clicked show the submenu
     */
    onMenuClick: function onMenuClick(event) {
      event.preventDefault();
      var nextEl = event.target.nextSibling;
      var isHorizontal = document.getElementById("wrapper").hasAttribute("layout");
      if (isHorizontal) {
        nextEl.parentElement.classList.add("show");
        nextEl.nextSibling.classList.add("show");
      } else {
        if (nextEl && nextEl.classList && !nextEl.classList.contains("show")) {
          var parentEl = event.target.parentNode;
          if (parentEl) {
            parentEl.classList.remove("show");
          }
          nextEl.classList.add("show");
        } else if (nextEl && nextEl.classList) {
          nextEl.classList.remove("show");
        }
      }
      return false;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Page-header.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Page-header.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _state_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../state/helpers */ "./resources/js/state/helpers.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


/**
 * Page-header component
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {},
  computed: _objectSpread({}, _state_helpers__WEBPACK_IMPORTED_MODULE_0__.layoutComputed)
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Rightbar.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Rightbar.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _state_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../state/helpers */ "./resources/js/state/helpers.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


/**
 * Right-sidebar component
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      config: {
        handler: this.handleRightBarClick,
        middleware: this.middleware,
        events: ["click"]
      },
      checked: false,
      layout: this.$store ? this.$store.state.layout.layoutType : {} || {},
      width: this.$store ? this.$store.state.layout.layoutWidth : {} || {},
      topbar: this.$store ? this.$store.state.layout.topbar : {} || {},
      sidebarType: this.$store ? this.$store.state.layout.leftSidebarType : {} || {},
      sidebarSize: this.$store ? this.$store.state.layout.leftSidebarSize : {} || {},
      menu: this.$store ? this.$store.state.layout.menuPosition : {} || {}
    };
  },
  methods: _objectSpread(_objectSpread({}, _state_helpers__WEBPACK_IMPORTED_MODULE_0__.layoutMethods), {}, {
    handleRightBarClick: function handleRightBarClick(e, el) {
      this.$parent.hideRightSidebar();
    },
    middleware: function middleware(event, el) {
      return !event.target.classList.contains("toggle-right");
    },
    changeLayout: function changeLayout(layout) {
      this.$store.dispatch("layout/changeLayoutType", {
        layoutType: layout
      });
    },
    changeWidth: function changeWidth(width) {
      this.$store.dispatch("layout/changeLayoutWidth", {
        layoutWidth: width
      });
    },
    changeTopbartype: function changeTopbartype(value) {
      this.$store.dispatch("layout/changeTopbar", {
        topbar: value
      });
    },
    changeType: function changeType(type) {
      this.$store.dispatch("layout/changeLeftSidebarType", {
        leftSidebarType: type
      });
    },
    changeSize: function changeSize(size) {
      this.$store.dispatch("layout/changeLeftSidebarSize", {
        leftSidebarSize: size
      });
    },
    changemenuPosition: function changemenuPosition(position) {
      this.$store.dispatch("layout/changeMenuPosition", {
        menuPosition: position
      });
    },
    enableInfo: function enableInfo() {
      if (this.checked) document.body.setAttribute("data-sidebar-showuser", "true");else document.body.removeAttribute("data-sidebar-showuser");
    },
    reset: function reset() {
      this.width = "fluid";
      this.menu = "fixed";
      this.sidebarType = "light";
      this.sidebarSize = "default";
      this.topbar = "dark";
      this.checked = false;
    }
  })
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Sidebar.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Sidebar.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menu */ "./resources/js/components/menu.js");



/**
 * Sidebar component
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      menuItems: _menu__WEBPACK_IMPORTED_MODULE_0__.menuItems
    };
  },
  props: {
    type: {
      type: String,
      required: true
    },
    width: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: true
    },
    menu: {
      type: String,
      required: true
    },
    topbar: {
      type: String,
      required: true
    }
  },
  computed: (0,vuex__WEBPACK_IMPORTED_MODULE_1__.mapState)(["layout"]),
  watch: {
    type: {
      immediate: true,
      handler: function handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "dark":
              document.body.setAttribute("data-sidebar-color", "dark");
              break;
            case "light":
              document.body.setAttribute("data-sidebar-color", "light");
              break;
            case "brand":
              document.body.setAttribute("data-sidebar-color", "brand");
              break;
            case "gradient":
              document.body.setAttribute("data-sidebar-color", "gradient");
              break;
            default:
              document.body.setAttribute("data-sidebar-color", "light");
              break;
          }
        }
      }
    },
    width: {
      immediate: true,
      handler: function handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "boxed":
              document.body.setAttribute("data-layout-width", "boxed");
              document.body.setAttribute("data-sidebar-size", "condensed");
              break;
            case "fluid":
              document.body.setAttribute("data-layout-width", "fluid");
              document.body.removeAttribute("data-sidebar-size");
              document.body.removeAttribute("data-layout-width");
              break;
            default:
              document.body.setAttribute("data-layout-mode", "fluid");
              break;
          }
        }
      }
    },
    size: {
      immediate: true,
      handler: function handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "default":
              document.body.setAttribute("data-sidebar-size", "default");
              break;
            case "condensed":
              document.body.setAttribute("data-sidebar-size", "condensed");
              break;
            case "compact":
              document.body.setAttribute("data-sidebar-size", "compact");
              break;
            default:
              document.body.setAttribute("data-sidebar-size", "default");
              break;
          }
        }
      }
    },
    menu: {
      immediate: true,
      handler: function handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "fixed":
              document.body.setAttribute("data-layout-menu-position", "fixed");
              break;
            case "scrollable":
              document.body.setAttribute("data-layout-menu-position", "scrollable");
              break;
            default:
              document.body.setAttribute("data-layout-menu-position", "fixed");
              break;
          }
        }
      }
    },
    topbar: {
      immediate: true,
      handler: function handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "dark":
              document.body.setAttribute("data-topbar-color", "dark");
              break;
            case "light":
              document.body.setAttribute("data-topbar-color", "light");
              break;
            default:
              document.body.setAttribute("data-topbar-color", "dark");
              break;
          }
        }
      }
    }
  },
  mounted: function mounted() {
    var _this = this;
    this._activateMenuDropdown();
    this.$router.afterEach(function (routeTo, routeFrom) {
      _this._activateMenuDropdown();
    });
  },
  methods: {
    /** 
     * Returns true or false if given menu item has child or not
     * @param item menuItem
     */
    hasItems: function hasItems(item) {
      return item.subItems !== undefined ? item.subItems.length > 0 : false;
    },
    _activateMenuDropdown: function _activateMenuDropdown() {
      var resetParent = function resetParent(el) {
        el.classList.remove("active");
        var parent = el.parentElement;
        if (parent) {
          parent.classList.remove("menuitem-active");
          var parent2 = parent.parentElement;
          if (parent2) {
            var parent3 = parent2.parentElement;
            if (parent3) {
              parent3.classList.remove("show");
              var parent4 = parent3.parentElement;
              if (parent4) {
                parent4.classList.remove("menuitem-active");
              }
            }
          }
        }
      };
      var links = document.getElementsByClassName("side-nav-link-ref");
      var matchingMenuItem = null;
      var paths = [];
      for (var _i = 0; _i < links.length; _i++) {
        // reset menu
        resetParent(links[_i]);
      }
      for (var i = 0; i < links.length; i++) {
        paths.push(links[i]["pathname"]);
      }
      var itemIndex = paths.indexOf(window.location.pathname);
      if (itemIndex === -1) {
        var strIndex = window.location.pathname.lastIndexOf("/");
        var item = window.location.pathname.substr(0, strIndex).toString();
        matchingMenuItem = links[paths.indexOf(item)];
      } else {
        matchingMenuItem = links[itemIndex];
      }
      if (matchingMenuItem) {
        matchingMenuItem.classList.add("active");
        var parent = matchingMenuItem.parentElement;

        /**
         * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
         * We should come up with non hard coded approach
         */
        if (parent) {
          parent.classList.add("menuitem-active");
          var parent2 = parent.parentElement;
          if (parent2) {
            var parent3 = parent2.parentElement;
            if (parent3) {
              parent3.classList.add("show");
              var parent4 = parent3.parentElement;
              if (parent4) {
                parent4.classList.add("menuitem-active");
              }
            }
          }
        }
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Topbar.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Topbar.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _api_adminAxios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/adminAxios */ "./resources/js/api/adminAxios.js");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../router */ "./resources/js/router/index.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



/**
 * Topbar component
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      languages: [{
        flag: "/assets/images/us.jpg",
        language: "en",
        title: "English"
      }, {
        flag: "/assets/images/arabic.png",
        language: "ar",
        title: "Arabic"
      }],
      current_language: this.$i18n.locale,
      text: null,
      flag: null,
      value: null
    };
  },
  mounted: function mounted() {
    var _this = this;
    this.value = this.languages.find(function (x) {
      return x.language === _this.$i18n.locale;
    });
    this.text = this.value.title;
    this.flag = this.value.flag;
  },
  methods: {
    /**
     * Toggle menu
     */
    toggleMenu: function toggleMenu() {
      this.$parent.toggleMenu();
    },
    /**
     * Full screen
     */
    initFullScreen: function initFullScreen() {
      document.body.classList.toggle("fullscreen-enable");
      if (!document.fullscreenElement && /* alternative standard method */
      !document.mozFullScreenElement && !document.webkitFullscreenElement) {
        // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    },
    /**
     * Toggle rightbar
     */
    toggleRightSidebar: function toggleRightSidebar() {
      this.$parent.toggleRightSidebar();
    },
    /**
     * Set languages
     */
    setLanguage: function setLanguage(locale, country, flag) {
      this.$i18n.locale = locale;
      this.current_language = locale;
      this.text = country;
      this.flag = flag;
      localStorage.setItem("lang", locale);
      if (locale == 'ar') {
        document.body.style.textAlign = 'right';
        document.body.classList.add('rtl');
        document.querySelector('html').style.direction = 'rtl';
        document.querySelector('html').setAttribute('lang', locale || 'ar');
        var style_dashboard = document.getElementById('style_dashboard');
        style_dashboard.setAttribute('href', window.location.origin + "/css/custom.css");
      } else {
        document.body.style.textAlign = 'left';
        document.body.classList.remove('rtl');
        document.querySelector('html').style.direction = 'ltr';
        document.querySelector('html').setAttribute('lang', locale || 'ar');
        var _style_dashboard = document.getElementById('style_dashboard');
        _style_dashboard.setAttribute('href', '');
      }
    },
    /**
     * Horizontal-toggle menu
     */
    horizonalmenu: function horizonalmenu() {
      var element = document.getElementById("topnav-menu-content");
      element.classList.toggle("show");
    },
    /**
     *  Logout Dashboard
     */
    logout: function logout() {
      var _this2 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _api_adminAxios__WEBPACK_IMPORTED_MODULE_0__["default"].post("/auth/logout").then(function (res) {
                  _this2.$store.commit('auth/logoutToken');
                  return _this2.$router.push({
                    name: 'login'
                  });
                })["catch"](function (err) {
                  _this2.$store.commit('auth/logoutToken');
                  return _this2.$router.push({
                    name: 'login'
                  });
                })["finally"](function () {});
              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Two-column-sidebar.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Two-column-sidebar.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      activetab: 1
    };
  },
  props: {
    type: {
      type: String,
      required: true
    },
    width: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: true
    },
    menu: {
      type: String,
      required: true
    },
    topbar: {
      type: String,
      required: true
    }
  },
  watch: {
    type: {
      immediate: true,
      handler: function handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "dark":
              document.body.setAttribute("data-sidebar-color", "dark");
              break;
            case "light":
              document.body.setAttribute("data-sidebar-color", "light");
              break;
            case "brand":
              document.body.setAttribute("data-sidebar-color", "brand");
              break;
            case "gradient":
              document.body.setAttribute("data-sidebar-color", "gradient");
              break;
            default:
              document.body.setAttribute("data-sidebar-color", "light");
              break;
          }
        }
      }
    },
    width: {
      immediate: true,
      handler: function handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "boxed":
              document.body.setAttribute("data-layout-width", "boxed");
              document.body.setAttribute("data-sidebar-size", "condensed");
              break;
            case "fluid":
              document.body.setAttribute("data-layout-width", "fluid");
              document.body.removeAttribute("data-sidebar-size");
              document.body.removeAttribute("data-layout-width");
              break;
            default:
              document.body.setAttribute("data-layout-mode", "fluid");
              break;
          }
        }
      }
    },
    size: {
      immediate: true,
      handler: function handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "default":
              document.body.setAttribute("data-sidebar-size", "default");
              break;
            case "condensed":
              document.body.setAttribute("data-sidebar-size", "condensed");
              break;
            case "compact":
              document.body.setAttribute("data-sidebar-size", "compact");
              break;
            default:
              document.body.setAttribute("data-sidebar-size", "default");
              break;
          }
        }
      }
    },
    menu: {
      immediate: true,
      handler: function handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "fixed":
              document.body.setAttribute("data-layout-menu-position", "fixed");
              break;
            case "scrollable":
              document.body.setAttribute("data-layout-menu-position", "scrollable");
              break;
            default:
              document.body.setAttribute("data-layout-menu-position", "fixed");
              break;
          }
        }
      }
    },
    topbar: {
      immediate: true,
      handler: function handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "dark":
              document.body.setAttribute("data-topbar-color", "dark");
              break;
            case "light":
              document.body.setAttribute("data-topbar-color", "light");
              break;
            default:
              document.body.setAttribute("data-topbar-color", "dark");
              break;
          }
        }
      }
    }
  },
  mounted: function mounted() {
    var _this = this;
    this._activateMenuDropdown();
    this.$router.afterEach(function (routeTo, routeFrom) {
      _this._activateMenuDropdown();
    });
  },
  methods: {
    /**
     * Returns true or false if given menu item has child or not
     * @param item menuItem
     */
    hasItems: function hasItems(item) {
      return item.subItems !== undefined ? item.subItems.length > 0 : false;
    },
    _activateMenuDropdown: function _activateMenuDropdown() {
      var resetParent = function resetParent(el) {
        el.classList.remove("active");
        var parent = el.parentElement;
        if (parent) {
          parent.classList.remove("menuitem-active");
          var parent2 = parent.parentElement;
          if (parent2) {
            var parent3 = parent2.parentElement;
            if (parent3) {
              parent3.classList.remove("show");
              var parent4 = parent3.parentElement;
              if (parent4) {
                parent4.classList.remove("menuitem-active");
              }
            }
          }
        }
      };
      var links = document.getElementsByClassName("side-nav-link-ref");
      var matchingMenuItem = null;
      var paths = [];
      for (var _i = 0; _i < links.length; _i++) {
        // reset menu
        resetParent(links[_i]);
      }
      for (var i = 0; i < links.length; i++) {
        paths.push(links[i]["pathname"]);
      }
      var itemIndex = paths.indexOf(window.location.pathname);
      if (itemIndex === -1) {
        var strIndex = window.location.pathname.lastIndexOf("/");
        var item = window.location.pathname.substr(0, strIndex).toString();
        matchingMenuItem = links[paths.indexOf(item)];
      } else {
        matchingMenuItem = links[itemIndex];
      }
      if (matchingMenuItem) {
        matchingMenuItem.classList.add("active");
        var parent = matchingMenuItem.parentElement;

        /**
         * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
         * We should come up with non hard coded approach
         */
        if (parent) {
          parent.classList.add("menuitem-active");
          var parent2 = parent.parentElement;
          if (parent2) {
            var parent3 = parent2.parentElement;
            if (parent3) {
              parent3.classList.add("show");
              var parent4 = parent3.parentElement;
              if (parent4) {
                parent4.classList.add("menuitem-active");
              }
            }
          }
        }
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/layouts/detached.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/layouts/detached.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _state_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../state/helpers */ "./resources/js/state/helpers.js");
/* harmony import */ var _components_Sidebar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Sidebar */ "./resources/js/components/Sidebar.vue");
/* harmony import */ var _components_Topbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Topbar */ "./resources/js/components/Topbar.vue");
/* harmony import */ var _components_Rightbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Rightbar */ "./resources/js/components/Rightbar.vue");
/* harmony import */ var _components_Footer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/Footer */ "./resources/js/components/Footer.vue");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }






/**
 * Detached layout
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {};
  },
  components: {
    Sidebar: _components_Sidebar__WEBPACK_IMPORTED_MODULE_1__["default"],
    Topbar: _components_Topbar__WEBPACK_IMPORTED_MODULE_2__["default"],
    Rightbar: _components_Rightbar__WEBPACK_IMPORTED_MODULE_3__["default"],
    Footer: _components_Footer__WEBPACK_IMPORTED_MODULE_4__["default"]
  },
  computed: _objectSpread({}, _state_helpers__WEBPACK_IMPORTED_MODULE_0__.layoutComputed),
  methods: {
    toggleRightSidebar: function toggleRightSidebar() {
      document.body.classList.toggle("right-bar-enabled");
    },
    hideRightSidebar: function hideRightSidebar() {
      document.body.classList.remove("right-bar-enabled");
    },
    toggleMenu: function toggleMenu() {
      this.isMenuCondensed = !this.isMenuCondensed;
      if (this.isMenuCondensed) document.body.setAttribute("data-sidebar-size", "condensed");else document.body.removeAttribute("data-sidebar-size", "condensed");
      if (window.screen.width >= 992) {
        this.$router.afterEach(function (routeTo, routeFrom) {
          document.body.classList.remove("sidebar-enable");
        });
      } else {
        document.body.setAttribute("data-sidebar-size", "default");
        document.body.classList.toggle("sidebar-enable");
        this.$router.afterEach(function (routeTo, routeFrom) {
          document.body.classList.remove("sidebar-enable");
        });
      }
    }
  },
  mounted: function mounted() {
    document.body.setAttribute("data-layout-mode", "detached");
    document.body.setAttribute("data-sidebar-showuser", "true");
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/layouts/horizontal.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/layouts/horizontal.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _state_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../state/helpers */ "./resources/js/state/helpers.js");
/* harmony import */ var _components_Topbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Topbar */ "./resources/js/components/Topbar.vue");
/* harmony import */ var _components_Horizontal_navbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Horizontal-navbar */ "./resources/js/components/Horizontal-navbar.vue");
/* harmony import */ var _components_Rightbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Rightbar */ "./resources/js/components/Rightbar.vue");
/* harmony import */ var _components_Footer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/Footer */ "./resources/js/components/Footer.vue");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }






/**
 * Horizontal layout
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {};
  },
  components: {
    Topbar: _components_Topbar__WEBPACK_IMPORTED_MODULE_1__["default"],
    HorizontalNavbar: _components_Horizontal_navbar__WEBPACK_IMPORTED_MODULE_2__["default"],
    Rightbar: _components_Rightbar__WEBPACK_IMPORTED_MODULE_3__["default"],
    Footer: _components_Footer__WEBPACK_IMPORTED_MODULE_4__["default"]
  },
  computed: _objectSpread({}, _state_helpers__WEBPACK_IMPORTED_MODULE_0__.layoutComputed),
  mounted: function mounted() {
    document.body.setAttribute("data-layout-mode", "horizontal");
  },
  methods: {
    toggleRightSidebar: function toggleRightSidebar() {
      document.body.classList.toggle("right-bar-enabled");
    },
    hideRightSidebar: function hideRightSidebar() {
      document.body.classList.remove("right-bar-enabled");
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/layouts/main.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/layouts/main.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _state_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../state/helpers */ "./resources/js/state/helpers.js");
/* harmony import */ var _vertical__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vertical */ "./resources/js/views/layouts/vertical.vue");
/* harmony import */ var _horizontal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./horizontal */ "./resources/js/views/layouts/horizontal.vue");
/* harmony import */ var _detached__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./detached */ "./resources/js/views/layouts/detached.vue");
/* harmony import */ var _two_column__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./two-column */ "./resources/js/views/layouts/two-column.vue");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }






/**
 * Main layout
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    Vertical: _vertical__WEBPACK_IMPORTED_MODULE_1__["default"],
    Horizontal: _horizontal__WEBPACK_IMPORTED_MODULE_2__["default"],
    Detached: _detached__WEBPACK_IMPORTED_MODULE_3__["default"],
    TwoColumn: _two_column__WEBPACK_IMPORTED_MODULE_4__["default"]
  },
  data: function data() {
    return {};
  },
  computed: _objectSpread({}, _state_helpers__WEBPACK_IMPORTED_MODULE_0__.layoutComputed)
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/layouts/two-column.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/layouts/two-column.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _state_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../state/helpers */ "./resources/js/state/helpers.js");
/* harmony import */ var _components_Two_column_sidebar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Two-column-sidebar */ "./resources/js/components/Two-column-sidebar.vue");
/* harmony import */ var _components_Topbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Topbar */ "./resources/js/components/Topbar.vue");
/* harmony import */ var _components_Rightbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Rightbar */ "./resources/js/components/Rightbar.vue");
/* harmony import */ var _components_Footer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/Footer */ "./resources/js/components/Footer.vue");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }






/**
 * Two-column layout
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    TwoColumnSidebar: _components_Two_column_sidebar__WEBPACK_IMPORTED_MODULE_1__["default"],
    Topbar: _components_Topbar__WEBPACK_IMPORTED_MODULE_2__["default"],
    Rightbar: _components_Rightbar__WEBPACK_IMPORTED_MODULE_3__["default"],
    Footer: _components_Footer__WEBPACK_IMPORTED_MODULE_4__["default"]
  },
  data: function data() {
    return {
      isMenuCondensed: false
    };
  },
  computed: _objectSpread({}, _state_helpers__WEBPACK_IMPORTED_MODULE_0__.layoutComputed),
  methods: {
    toggleRightSidebar: function toggleRightSidebar() {
      document.body.classList.toggle("right-bar-enabled");
    },
    hideRightSidebar: function hideRightSidebar() {
      document.body.classList.remove("right-bar-enabled");
    },
    toggleMenu: function toggleMenu() {
      this.isMenuCondensed = !this.isMenuCondensed;
      if (this.isMenuCondensed) document.body.setAttribute("data-sidebar-size", "condensed");else document.body.removeAttribute("data-sidebar-size", "condensed");
      if (window.screen.width >= 992) {
        this.$router.afterEach(function (routeTo, routeFrom) {
          document.body.classList.remove("sidebar-enable");
        });
      } else {
        document.body.setAttribute("data-sidebar-size", "default");
        document.body.classList.toggle("sidebar-enable");
        this.$router.afterEach(function (routeTo, routeFrom) {
          document.body.classList.remove("sidebar-enable");
        });
      }
    }
  },
  mounted: function mounted() {
    document.body.setAttribute("data-layout-mode", "two-column");
    document.body.setAttribute("data-topbar-color", "light");
    document.body.removeAttribute("data-sidebar-showuser");
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/layouts/vertical.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/layouts/vertical.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _state_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../state/helpers */ "./resources/js/state/helpers.js");
/* harmony import */ var _components_Sidebar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Sidebar */ "./resources/js/components/Sidebar.vue");
/* harmony import */ var _components_Topbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Topbar */ "./resources/js/components/Topbar.vue");
/* harmony import */ var _components_Rightbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Rightbar */ "./resources/js/components/Rightbar.vue");
/* harmony import */ var _components_Footer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/Footer */ "./resources/js/components/Footer.vue");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }






/**
 * Vertical layout
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    Sidebar: _components_Sidebar__WEBPACK_IMPORTED_MODULE_1__["default"],
    Topbar: _components_Topbar__WEBPACK_IMPORTED_MODULE_2__["default"],
    Rightbar: _components_Rightbar__WEBPACK_IMPORTED_MODULE_3__["default"],
    Footer: _components_Footer__WEBPACK_IMPORTED_MODULE_4__["default"]
  },
  data: function data() {
    return {
      isMenuCondensed: false
    };
  },
  computed: _objectSpread({}, _state_helpers__WEBPACK_IMPORTED_MODULE_0__.layoutComputed),
  mounted: function mounted() {
    document.body.removeAttribute("data-layout-mode");
    document.body.removeAttribute("data-sidebar-showuser");
  },
  methods: {
    toggleRightSidebar: function toggleRightSidebar() {
      document.body.classList.toggle("right-bar-enabled");
    },
    hideRightSidebar: function hideRightSidebar() {
      document.body.classList.remove("right-bar-enabled");
    },
    toggleMenu: function toggleMenu() {
      this.isMenuCondensed = !this.isMenuCondensed;
      if (this.isMenuCondensed) document.body.setAttribute("data-sidebar-size", "condensed");else document.body.removeAttribute("data-sidebar-size", "condensed");
      if (window.screen.width >= 992) {
        this.$router.afterEach(function (routeTo, routeFrom) {
          document.body.classList.remove("sidebar-enable");
        });
      } else {
        document.body.setAttribute("data-sidebar-size", "default");
        document.body.classList.toggle("sidebar-enable");
        this.$router.afterEach(function (routeTo, routeFrom) {
          document.body.classList.remove("sidebar-enable");
        });
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/pages/icons/boxicons.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/pages/icons/boxicons.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _layouts_main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../layouts/main */ "./resources/js/views/layouts/main.vue");
/* harmony import */ var _components_Page_header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/Page-header */ "./resources/js/components/Page-header.vue");



/**
 * Boxicons Component
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  page: {
    title: "Boxicons",
    meta: [{
      name: "description",
      content: 'kdjsd'
    }]
  },
  components: {
    Layout: _layouts_main__WEBPACK_IMPORTED_MODULE_0__["default"],
    PageHeader: _components_Page_header__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data: function data() {
    return {
      title: 'Boxicons',
      items: [{
        text: 'Minton',
        href: '/'
      }, {
        text: 'Icons',
        href: '/'
      }, {
        text: 'Boxicons',
        active: true
      }]
    };
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Footer.vue?vue&type=template&id=61a7c374&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Footer.vue?vue&type=template&id=61a7c374&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("footer", {
    staticClass: "footer"
  }, [_c("div", {
    staticClass: "container-fluid"
  }, [_c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-md-6"
  }, [_vm._v("\n                " + _vm._s(new Date().getFullYear()) + " ©  " + _vm._s(_vm.$t("general.AllRightsReservedTo")) + " "), _c("a", {
    staticClass: "link-footer",
    attrs: {
      href: "#"
    }
  }, [_vm._v(_vm._s(_vm.$t("general.Alshamel")) + " - " + _vm._s(_vm.env("MIX_VERSION")))])])])])]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Horizontal-navbar.vue?vue&type=template&id=cea5fb04&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Horizontal-navbar.vue?vue&type=template&id=cea5fb04& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", [_c("div", {
    staticClass: "topnav"
  }, [_c("div", {
    staticClass: "container-fluid"
  }, [_c("nav", {
    staticClass: "navbar navbar-light navbar-expand-lg topnav-menu"
  }, [_c("div", {
    staticClass: "collapse navbar-collapse",
    attrs: {
      id: "topnav-menu-content"
    }
  }, [_c("ul", {
    staticClass: "navbar-nav"
  }, _vm._l(_vm.menuItems, function (item, index) {
    return _c("li", {
      key: index,
      staticClass: "nav-item dropdown"
    }, [!item.subItems ? _c("router-link", {
      staticClass: "nav-link dropdown-toggle arrow-none side-nav-link-ref",
      attrs: {
        tag: "a",
        to: item.link
      }
    }, [_c("i", {
      "class": "".concat(item.icon, " mr-1")
    }), _vm._v("\n                                " + _vm._s(_vm.$t(item.label)) + "\n                            ")]) : _vm._e(), _vm._v(" "), item.subItems ? _c("a", {
      staticClass: "nav-link dropdown-toggle arrow-none",
      attrs: {
        href: "javascript: void(0);",
        id: "topnav-components",
        role: "button"
      },
      on: {
        click: _vm.onMenuClick
      }
    }, [_c("i", {
      "class": "".concat(item.icon, " mr-1")
    }), _vm._v("\n                                " + _vm._s(_vm.$t(item.label)) + "\n                                "), _c("div", {
      staticClass: "arrow-down"
    })]) : _vm._e(), _vm._v(" "), _vm.hasItems(item) ? _c("div", {
      staticClass: "dropdown-menu row",
      attrs: {
        "aria-labelledby": "topnav-dashboard"
      }
    }, [_vm._l(item.subItems, function (subitem, index) {
      return [!_vm.hasItems(subitem) ? _c("router-link", {
        key: index,
        staticClass: "col dropdown-item side-nav-link-ref",
        attrs: {
          to: subitem.link
        }
      }, [_vm._v(_vm._s(_vm.$t(subitem.label)))]) : _vm._e(), _vm._v(" "), _vm.hasItems(subitem) ? _c("div", {
        key: index,
        staticClass: "dropdown"
      }, [_c("a", {
        staticClass: "dropdown-item dropdown-toggle",
        attrs: {
          href: "javascript: void(0);"
        },
        on: {
          click: _vm.onMenuClick
        }
      }, [_vm._v("\n                                            " + _vm._s(_vm.$t(subitem.label)) + "\n                                            "), _c("div", {
        staticClass: "arrow-down"
      })]), _vm._v(" "), _c("div", {
        staticClass: "dropdown-menu"
      }, _vm._l(subitem.subItems, function (subSubitem, index) {
        return _c("router-link", {
          key: index,
          staticClass: "dropdown-item side-nav-link-ref",
          attrs: {
            to: subSubitem.link
          }
        }, [_vm._v(_vm._s(_vm.$t(subSubitem.label)))]);
      }), 1)]) : _vm._e()];
    })], 2) : _vm._e()], 1);
  }), 0)])])])])]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Page-header.vue?vue&type=template&id=7182f8f0&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Page-header.vue?vue&type=template&id=7182f8f0& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-12"
  }, [_c("div", {
    staticClass: "page-title-box",
    "class": {
      "page-title-box-alt": _vm.layoutType !== "vertical" && _vm.layoutType !== "two-column"
    }
  })])]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Rightbar.vue?vue&type=template&id=1c913662&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Rightbar.vue?vue&type=template&id=1c913662& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", [_c("div", {
    directives: [{
      name: "click-outside",
      rawName: "v-click-outside",
      value: _vm.config,
      expression: "config"
    }],
    staticClass: "right-bar"
  }, [_c("simplebar", {
    staticClass: "h-100"
  }, [_c("b-tabs", {
    staticClass: "nav-bordered",
    attrs: {
      "content-class": "pt-0",
      justified: ""
    }
  }, [_c("b-tab", {
    scopedSlots: _vm._u([{
      key: "title",
      fn: function fn() {
        return [_c("i", {
          staticClass: "mdi mdi-message-text-outline d-block font-22 my-1"
        })];
      },
      proxy: true
    }])
  }, [_vm._v(" "), _c("form", {
    staticClass: "search-bar p-3"
  }, [_c("div", {
    staticClass: "position-relative"
  }, [_c("input", {
    staticClass: "form-control",
    attrs: {
      type: "text",
      placeholder: "Search..."
    }
  }), _vm._v(" "), _c("span", {
    staticClass: "mdi mdi-magnify"
  })])]), _vm._v(" "), _c("h6", {
    staticClass: "font-weight-medium px-3 mt-2 text-uppercase"
  }, [_vm._v("\n            Group Chats\n          ")]), _vm._v(" "), _c("div", {
    staticClass: "p-2"
  }, [_c("a", {
    staticClass: "text-reset notification-item pl-3 mb-2 d-block",
    attrs: {
      href: "javascript: void(0);"
    }
  }, [_c("i", {
    staticClass: "mdi mdi-checkbox-blank-circle-outline mr-1 text-success"
  }), _vm._v(" "), _c("span", {
    staticClass: "mb-0 mt-1"
  }, [_vm._v("App Development")])]), _vm._v(" "), _c("a", {
    staticClass: "text-reset notification-item pl-3 mb-2 d-block",
    attrs: {
      href: "javascript: void(0);"
    }
  }, [_c("i", {
    staticClass: "mdi mdi-checkbox-blank-circle-outline mr-1 text-warning"
  }), _vm._v(" "), _c("span", {
    staticClass: "mb-0 mt-1"
  }, [_vm._v("Office Work")])]), _vm._v(" "), _c("a", {
    staticClass: "text-reset notification-item pl-3 mb-2 d-block",
    attrs: {
      href: "javascript: void(0);"
    }
  }, [_c("i", {
    staticClass: "mdi mdi-checkbox-blank-circle-outline mr-1 text-danger"
  }), _vm._v(" "), _c("span", {
    staticClass: "mb-0 mt-1"
  }, [_vm._v("Personal Group")])]), _vm._v(" "), _c("a", {
    staticClass: "text-reset notification-item pl-3 d-block",
    attrs: {
      href: "javascript: void(0);"
    }
  }, [_c("i", {
    staticClass: "mdi mdi-checkbox-blank-circle-outline mr-1"
  }), _vm._v(" "), _c("span", {
    staticClass: "mb-0 mt-1"
  }, [_vm._v("Freelance")])])]), _vm._v(" "), _c("h6", {
    staticClass: "font-weight-medium px-3 mt-3 text-uppercase"
  }, [_vm._v("\n            Favourites\n            "), _c("a", {
    staticClass: "font-18 text-danger",
    attrs: {
      href: "javascript: void(0);"
    }
  }, [_c("i", {
    staticClass: "float-right mdi mdi-plus-circle"
  })])]), _vm._v(" "), _c("div", {
    staticClass: "p-2"
  }, [_c("a", {
    staticClass: "text-reset notification-item",
    attrs: {
      href: "javascript: void(0);"
    }
  }, [_c("div", {
    staticClass: "media"
  }, [_c("div", {
    staticClass: "position-relative mr-2"
  }, [_c("span", {
    staticClass: "user-status"
  }), _vm._v(" "), _c("img", {
    staticClass: "rounded-circle avatar-sm",
    attrs: {
      src: __webpack_require__(/*! ../assets/images/users/avatar-10.jpg */ "./resources/js/assets/images/users/avatar-10.jpg"),
      alt: "user-pic"
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "media-body overflow-hidden"
  }, [_c("h6", {
    staticClass: "mt-0 mb-1 font-14"
  }, [_vm._v("Andrew Mackie")]), _vm._v(" "), _c("div", {
    staticClass: "font-13 text-muted"
  }, [_c("p", {
    staticClass: "mb-0 text-truncate"
  }, [_vm._v("\n                      It will seem like simplified English.\n                    ")])])])])]), _vm._v(" "), _c("a", {
    staticClass: "text-reset notification-item",
    attrs: {
      href: "javascript: void(0);"
    }
  }, [_c("div", {
    staticClass: "media"
  }, [_c("div", {
    staticClass: "position-relative mr-2"
  }, [_c("span", {
    staticClass: "user-status"
  }), _vm._v(" "), _c("img", {
    staticClass: "rounded-circle avatar-sm",
    attrs: {
      src: __webpack_require__(/*! ../assets/images/users/avatar-1.jpg */ "./resources/js/assets/images/users/avatar-1.jpg"),
      alt: "user-pic"
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "media-body overflow-hidden"
  }, [_c("h6", {
    staticClass: "mt-0 mb-1 font-14"
  }, [_vm._v("Rory Dalyell")]), _vm._v(" "), _c("div", {
    staticClass: "font-13 text-muted"
  }, [_c("p", {
    staticClass: "mb-0 text-truncate"
  }, [_vm._v("\n                      To an English person, it will seem like simplified\n                    ")])])])])]), _vm._v(" "), _c("a", {
    staticClass: "text-reset notification-item",
    attrs: {
      href: "javascript: void(0);"
    }
  }, [_c("div", {
    staticClass: "media"
  }, [_c("div", {
    staticClass: "position-relative mr-2"
  }, [_c("span", {
    staticClass: "user-status busy"
  }), _vm._v(" "), _c("img", {
    staticClass: "rounded-circle avatar-sm",
    attrs: {
      src: __webpack_require__(/*! ../assets/images/users/avatar-9.jpg */ "./resources/js/assets/images/users/avatar-9.jpg"),
      alt: "user-pic"
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "media-body overflow-hidden"
  }, [_c("h6", {
    staticClass: "mt-0 mb-1 font-14"
  }, [_vm._v("Jaxon Dunhill")]), _vm._v(" "), _c("div", {
    staticClass: "font-13 text-muted"
  }, [_c("p", {
    staticClass: "mb-0 text-truncate"
  }, [_vm._v("\n                      To achieve this, it would be necessary.\n                    ")])])])])])]), _vm._v(" "), _c("h6", {
    staticClass: "font-weight-medium px-3 mt-3 text-uppercase"
  }, [_vm._v("\n            Other Chats\n            "), _c("a", {
    staticClass: "font-18 text-danger",
    attrs: {
      href: "javascript: void(0);"
    }
  }, [_c("i", {
    staticClass: "float-right mdi mdi-plus-circle"
  })])]), _vm._v(" "), _c("div", {
    staticClass: "p-2 pb-4"
  }, [_c("a", {
    staticClass: "text-reset notification-item",
    attrs: {
      href: "javascript: void(0);"
    }
  }, [_c("div", {
    staticClass: "media"
  }, [_c("div", {
    staticClass: "position-relative mr-2"
  }, [_c("span", {
    staticClass: "user-status online"
  }), _vm._v(" "), _c("img", {
    staticClass: "rounded-circle avatar-sm",
    attrs: {
      src: __webpack_require__(/*! ../assets/images/users/avatar-2.jpg */ "./resources/js/assets/images/users/avatar-2.jpg"),
      alt: "user-pic"
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "media-body overflow-hidden"
  }, [_c("h6", {
    staticClass: "mt-0 mb-1 font-14"
  }, [_vm._v("Jackson Therry")]), _vm._v(" "), _c("div", {
    staticClass: "font-13 text-muted"
  }, [_c("p", {
    staticClass: "mb-0 text-truncate"
  }, [_vm._v("\n                      Everyone realizes why a new common language.\n                    ")])])])])]), _vm._v(" "), _c("a", {
    staticClass: "text-reset notification-item",
    attrs: {
      href: "javascript: void(0);"
    }
  }, [_c("div", {
    staticClass: "media"
  }, [_c("div", {
    staticClass: "position-relative mr-2"
  }, [_c("span", {
    staticClass: "user-status away"
  }), _vm._v(" "), _c("img", {
    staticClass: "rounded-circle avatar-sm",
    attrs: {
      src: __webpack_require__(/*! ../assets/images/users/avatar-4.jpg */ "./resources/js/assets/images/users/avatar-4.jpg"),
      alt: "user-pic"
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "media-body overflow-hidden"
  }, [_c("h6", {
    staticClass: "mt-0 mb-1 font-14"
  }, [_vm._v("Charles Deakin")]), _vm._v(" "), _c("div", {
    staticClass: "font-13 text-muted"
  }, [_c("p", {
    staticClass: "mb-0 text-truncate"
  }, [_vm._v("\n                      The languages only differ in their grammar.\n                    ")])])])])]), _vm._v(" "), _c("a", {
    staticClass: "text-reset notification-item",
    attrs: {
      href: "javascript: void(0);"
    }
  }, [_c("div", {
    staticClass: "media"
  }, [_c("div", {
    staticClass: "position-relative mr-2"
  }, [_c("span", {
    staticClass: "user-status online"
  }), _vm._v(" "), _c("img", {
    staticClass: "rounded-circle avatar-sm",
    attrs: {
      src: __webpack_require__(/*! ../assets/images/users/avatar-5.jpg */ "./resources/js/assets/images/users/avatar-5.jpg"),
      alt: "user-pic"
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "media-body overflow-hidden"
  }, [_c("h6", {
    staticClass: "mt-0 mb-1 font-14"
  }, [_vm._v("Ryan Salting")]), _vm._v(" "), _c("div", {
    staticClass: "font-13 text-muted"
  }, [_c("p", {
    staticClass: "mb-0 text-truncate"
  }, [_vm._v("\n                      If several languages coalesce the grammar of the\n                      resulting.\n                    ")])])])])]), _vm._v(" "), _c("a", {
    staticClass: "text-reset notification-item",
    attrs: {
      href: "javascript: void(0);"
    }
  }, [_c("div", {
    staticClass: "media"
  }, [_c("div", {
    staticClass: "position-relative mr-2"
  }, [_c("span", {
    staticClass: "user-status online"
  }), _vm._v(" "), _c("img", {
    staticClass: "rounded-circle avatar-sm",
    attrs: {
      src: __webpack_require__(/*! ../assets/images/users/avatar-6.jpg */ "./resources/js/assets/images/users/avatar-6.jpg"),
      alt: "user-pic"
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "media-body overflow-hidden"
  }, [_c("h6", {
    staticClass: "mt-0 mb-1 font-14"
  }, [_vm._v("Sean Howse")]), _vm._v(" "), _c("div", {
    staticClass: "font-13 text-muted"
  }, [_c("p", {
    staticClass: "mb-0 text-truncate"
  }, [_vm._v("\n                      It will seem like simplified English.\n                    ")])])])])]), _vm._v(" "), _c("a", {
    staticClass: "text-reset notification-item",
    attrs: {
      href: "javascript: void(0);"
    }
  }, [_c("div", {
    staticClass: "media"
  }, [_c("div", {
    staticClass: "position-relative mr-2"
  }, [_c("span", {
    staticClass: "user-status busy"
  }), _vm._v(" "), _c("img", {
    staticClass: "rounded-circle avatar-sm",
    attrs: {
      src: __webpack_require__(/*! ../assets/images/users/avatar-7.jpg */ "./resources/js/assets/images/users/avatar-7.jpg"),
      alt: "user-pic"
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "media-body overflow-hidden"
  }, [_c("h6", {
    staticClass: "mt-0 mb-1 font-14"
  }, [_vm._v("Dean Coward")]), _vm._v(" "), _c("div", {
    staticClass: "font-13 text-muted"
  }, [_c("p", {
    staticClass: "mb-0 text-truncate"
  }, [_vm._v("\n                      The new common language will be more simple.\n                    ")])])])])]), _vm._v(" "), _c("a", {
    staticClass: "text-reset notification-item",
    attrs: {
      href: "javascript: void(0);"
    }
  }, [_c("div", {
    staticClass: "media"
  }, [_c("div", {
    staticClass: "position-relative mr-2"
  }, [_c("span", {
    staticClass: "user-status away"
  }), _vm._v(" "), _c("img", {
    staticClass: "rounded-circle avatar-sm",
    attrs: {
      src: __webpack_require__(/*! ../assets/images/users/avatar-8.jpg */ "./resources/js/assets/images/users/avatar-8.jpg"),
      alt: "user-pic"
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "media-body overflow-hidden"
  }, [_c("h6", {
    staticClass: "mt-0 mb-1 font-14"
  }, [_vm._v("Hayley East")]), _vm._v(" "), _c("div", {
    staticClass: "font-13 text-muted"
  }, [_c("p", {
    staticClass: "mb-0 text-truncate"
  }, [_vm._v("\n                      One could refuse to pay expensive translators.\n                    ")])])])])]), _vm._v(" "), _c("div", {
    staticClass: "text-center mt-3"
  }, [_c("a", {
    staticClass: "btn btn-sm btn-white",
    attrs: {
      href: "javascript:void(0);"
    }
  }, [_c("i", {
    staticClass: "mdi mdi-spin mdi-loading mr-2"
  }), _vm._v("\n                Load more\n              ")])])])]), _vm._v(" "), _c("b-tab", {
    scopedSlots: _vm._u([{
      key: "title",
      fn: function fn() {
        return [_c("i", {
          staticClass: "mdi mdi-format-list-checkbox d-block font-22 my-1"
        })];
      },
      proxy: true
    }])
  }, [_vm._v(" "), _c("h6", {
    staticClass: "font-weight-medium p-3 m-0 text-uppercase"
  }, [_vm._v("\n            Working Tasks\n          ")]), _vm._v(" "), _c("div", {
    staticClass: "px-2"
  }, [_c("a", {
    staticClass: "text-reset item-hovered d-block p-2",
    attrs: {
      href: "javascript: void(0);"
    }
  }, [_c("p", {
    staticClass: "text-muted mb-0"
  }, [_vm._v("\n                App Development"), _c("span", {
    staticClass: "float-right"
  }, [_vm._v("75%")])]), _vm._v(" "), _c("div", {
    staticClass: "progress mt-2",
    staticStyle: {
      height: "4px"
    }
  }, [_c("div", {
    staticClass: "progress-bar bg-success",
    staticStyle: {
      width: "75%"
    },
    attrs: {
      role: "progressbar",
      "aria-valuenow": "75",
      "aria-valuemin": "0",
      "aria-valuemax": "100"
    }
  })])]), _vm._v(" "), _c("a", {
    staticClass: "text-reset item-hovered d-block p-2",
    attrs: {
      href: "javascript: void(0);"
    }
  }, [_c("p", {
    staticClass: "text-muted mb-0"
  }, [_vm._v("\n                Database Repair"), _c("span", {
    staticClass: "float-right"
  }, [_vm._v("37%")])]), _vm._v(" "), _c("div", {
    staticClass: "progress mt-2",
    staticStyle: {
      height: "4px"
    }
  }, [_c("div", {
    staticClass: "progress-bar bg-info",
    staticStyle: {
      width: "37%"
    },
    attrs: {
      role: "progressbar",
      "aria-valuenow": "37",
      "aria-valuemin": "0",
      "aria-valuemax": "100"
    }
  })])]), _vm._v(" "), _c("a", {
    staticClass: "text-reset item-hovered d-block p-2",
    attrs: {
      href: "javascript: void(0);"
    }
  }, [_c("p", {
    staticClass: "text-muted mb-0"
  }, [_vm._v("\n                Backup Create"), _c("span", {
    staticClass: "float-right"
  }, [_vm._v("52%")])]), _vm._v(" "), _c("div", {
    staticClass: "progress mt-2",
    staticStyle: {
      height: "4px"
    }
  }, [_c("div", {
    staticClass: "progress-bar bg-warning",
    staticStyle: {
      width: "52%"
    },
    attrs: {
      role: "progressbar",
      "aria-valuenow": "52",
      "aria-valuemin": "0",
      "aria-valuemax": "100"
    }
  })])])]), _vm._v(" "), _c("h6", {
    staticClass: "font-weight-medium px-3 mb-0 mt-4 text-uppercase"
  }, [_vm._v("\n            Upcoming Tasks\n          ")]), _vm._v(" "), _c("div", {
    staticClass: "p-2"
  }, [_c("a", {
    staticClass: "text-reset item-hovered d-block p-2",
    attrs: {
      href: "javascript: void(0);"
    }
  }, [_c("p", {
    staticClass: "text-muted mb-0"
  }, [_vm._v("\n                Sales Reporting"), _c("span", {
    staticClass: "float-right"
  }, [_vm._v("12%")])]), _vm._v(" "), _c("div", {
    staticClass: "progress mt-2",
    staticStyle: {
      height: "4px"
    }
  }, [_c("div", {
    staticClass: "progress-bar bg-danger",
    staticStyle: {
      width: "12%"
    },
    attrs: {
      role: "progressbar",
      "aria-valuenow": "12",
      "aria-valuemin": "0",
      "aria-valuemax": "100"
    }
  })])]), _vm._v(" "), _c("a", {
    staticClass: "text-reset item-hovered d-block p-2",
    attrs: {
      href: "javascript: void(0);"
    }
  }, [_c("p", {
    staticClass: "text-muted mb-0"
  }, [_vm._v("\n                Redesign Website"), _c("span", {
    staticClass: "float-right"
  }, [_vm._v("67%")])]), _vm._v(" "), _c("div", {
    staticClass: "progress mt-2",
    staticStyle: {
      height: "4px"
    }
  }, [_c("div", {
    staticClass: "progress-bar bg-primary",
    staticStyle: {
      width: "67%"
    },
    attrs: {
      role: "progressbar",
      "aria-valuenow": "67",
      "aria-valuemin": "0",
      "aria-valuemax": "100"
    }
  })])]), _vm._v(" "), _c("a", {
    staticClass: "text-reset item-hovered d-block p-2",
    attrs: {
      href: "javascript: void(0);"
    }
  }, [_c("p", {
    staticClass: "text-muted mb-0"
  }, [_vm._v("\n                New Admin Design"), _c("span", {
    staticClass: "float-right"
  }, [_vm._v("84%")])]), _vm._v(" "), _c("div", {
    staticClass: "progress mt-2",
    staticStyle: {
      height: "4px"
    }
  }, [_c("div", {
    staticClass: "progress-bar bg-success",
    staticStyle: {
      width: "84%"
    },
    attrs: {
      role: "progressbar",
      "aria-valuenow": "84",
      "aria-valuemin": "0",
      "aria-valuemax": "100"
    }
  })])])]), _vm._v(" "), _c("div", {
    staticClass: "p-3 mt-2"
  }, [_c("a", {
    staticClass: "btn btn-success btn-block waves-effect waves-light",
    attrs: {
      href: "javascript: void(0);"
    }
  }, [_vm._v("Create Task")])])]), _vm._v(" "), _c("b-tab", {
    attrs: {
      active: ""
    },
    scopedSlots: _vm._u([{
      key: "title",
      fn: function fn() {
        return [_c("i", {
          staticClass: "mdi mdi-cog-outline d-block font-22 my-1"
        })];
      },
      proxy: true
    }])
  }, [_vm._v(" "), _c("h6", {
    staticClass: "font-weight-medium px-3 m-0 py-2 font-13 text-uppercase bg-light"
  }, [_c("span", {
    staticClass: "d-block py-1"
  }, [_vm._v("Theme Settings")])]), _vm._v(" "), _c("div", {
    staticClass: "p-3"
  }, [_c("div", {
    staticClass: "alert alert-warning",
    attrs: {
      role: "alert"
    }
  }, [_c("strong", [_vm._v("Customize ")]), _vm._v(" the overall color scheme, sidebar\n              menu, etc.\n            ")]), _vm._v(" "), _c("h6", {
    staticClass: "font-weight-medium font-14 mt-4 mb-2 pb-1"
  }, [_vm._v("Layout")]), _vm._v(" "), _c("b-form-radio-group", {
    attrs: {
      stacked: ""
    },
    on: {
      input: function input($event) {
        return _vm.changeLayout($event);
      }
    },
    model: {
      value: _vm.layout,
      callback: function callback($$v) {
        _vm.layout = $$v;
      },
      expression: "layout"
    }
  }, [_c("b-form-radio", {
    staticClass: "mb-1",
    attrs: {
      value: "vertical"
    }
  }, [_vm._v("Vertical")]), _vm._v(" "), _c("b-form-radio", {
    staticClass: "mb-1",
    attrs: {
      value: "horizontal"
    }
  }, [_vm._v("Horizontal")]), _vm._v(" "), _c("b-form-radio", {
    staticClass: "mb-1",
    attrs: {
      value: "detached"
    }
  }, [_vm._v("Detached")]), _vm._v(" "), _c("b-form-radio", {
    staticClass: "mb-1",
    attrs: {
      value: "two-column"
    }
  }, [_vm._v("Two Column")])], 1), _vm._v(" "), _c("h6", {
    staticClass: "font-weight-medium font-14 mt-4 mb-2 pb-1"
  }, [_vm._v("Width")]), _vm._v(" "), _c("b-form-radio-group", {
    attrs: {
      stacked: ""
    },
    on: {
      input: function input($event) {
        return _vm.changeWidth($event);
      }
    },
    model: {
      value: _vm.width,
      callback: function callback($$v) {
        _vm.width = $$v;
      },
      expression: "width"
    }
  }, [_c("b-form-radio", {
    staticClass: "mb-1",
    attrs: {
      value: "fluid"
    }
  }, [_vm._v("Fluid")]), _vm._v(" "), _c("b-form-radio", {
    attrs: {
      value: "boxed"
    }
  }, [_vm._v("Boxed")])], 1), _vm._v(" "), _c("h6", {
    staticClass: "font-weight-medium font-14 mt-4 mb-2 pb-1"
  }, [_vm._v("Topbar")]), _vm._v(" "), _c("b-form-radio-group", {
    attrs: {
      stacked: ""
    },
    on: {
      input: function input($event) {
        return _vm.changeTopbartype($event);
      }
    },
    model: {
      value: _vm.topbar,
      callback: function callback($$v) {
        _vm.topbar = $$v;
      },
      expression: "topbar"
    }
  }, [_c("b-form-radio", {
    staticClass: "mb-1",
    attrs: {
      value: "dark"
    }
  }, [_vm._v("Dark")]), _vm._v(" "), _c("b-form-radio", {
    staticClass: "mb-1",
    attrs: {
      value: "light"
    }
  }, [_vm._v("Light")])], 1), _vm._v(" "), _c("h6", {
    staticClass: "font-weight-medium font-14 mt-4 mb-2 pb-1"
  }, [_vm._v("\n              Menus Positon "), _c("small", [_vm._v("(Leftsidebar and Topbar)")])]), _vm._v(" "), _c("b-form-radio-group", {
    attrs: {
      stacked: ""
    },
    on: {
      input: function input($event) {
        return _vm.changemenuPosition($event);
      }
    },
    model: {
      value: _vm.menu,
      callback: function callback($$v) {
        _vm.menu = $$v;
      },
      expression: "menu"
    }
  }, [_c("b-form-radio", {
    staticClass: "mb-1",
    attrs: {
      value: "fixed"
    }
  }, [_vm._v("Fixed")]), _vm._v(" "), _c("b-form-radio", {
    staticClass: "mb-1",
    attrs: {
      value: "scrollable"
    }
  }, [_vm._v("Scrollable")])], 1), _vm._v(" "), _vm.layout !== "horizontal" ? _c("div", [_c("h6", {
    staticClass: "font-weight-medium font-14 mt-4 mb-2 pb-1"
  }, [_vm._v("\n                Left Sidebar Color\n              ")]), _vm._v(" "), _c("b-form-radio-group", {
    attrs: {
      stacked: ""
    },
    on: {
      input: function input($event) {
        return _vm.changeType($event);
      }
    },
    model: {
      value: _vm.sidebarType,
      callback: function callback($$v) {
        _vm.sidebarType = $$v;
      },
      expression: "sidebarType"
    }
  }, [_c("b-form-radio", {
    staticClass: "mb-1",
    attrs: {
      value: "dark"
    }
  }, [_vm._v("Dark")]), _vm._v(" "), _c("b-form-radio", {
    staticClass: "mb-1",
    attrs: {
      value: "light"
    }
  }, [_vm._v("Light")]), _vm._v(" "), _c("b-form-radio", {
    staticClass: "mb-1",
    attrs: {
      value: "brand"
    }
  }, [_vm._v("Brand")]), _vm._v(" "), _c("b-form-radio", {
    staticClass: "mb-1",
    attrs: {
      value: "gradient"
    }
  }, [_vm._v("Gradient")])], 1), _vm._v(" "), _c("h6", {
    staticClass: "font-weight-medium font-14 mt-4 mb-2 pb-1"
  }, [_vm._v("\n                Left Sidebar Size\n              ")]), _vm._v(" "), _c("b-form-radio-group", {
    attrs: {
      stacked: ""
    },
    on: {
      input: function input($event) {
        return _vm.changeSize($event);
      }
    },
    model: {
      value: _vm.sidebarSize,
      callback: function callback($$v) {
        _vm.sidebarSize = $$v;
      },
      expression: "sidebarSize"
    }
  }, [_c("b-form-radio", {
    staticClass: "mb-1",
    attrs: {
      value: "default"
    }
  }, [_vm._v("Default")]), _vm._v(" "), _c("b-form-radio", {
    staticClass: "mb-1",
    attrs: {
      value: "condensed"
    }
  }, [_vm._v("Condensed "), _c("small", [_vm._v("(Extra Small size)")])]), _vm._v(" "), _c("b-form-radio", {
    staticClass: "mb-1",
    attrs: {
      value: "compact"
    }
  }, [_vm._v("Compact "), _c("small", [_vm._v("(Small size)")])])], 1)], 1) : _vm._e(), _vm._v(" "), _c("h6", {
    staticClass: "font-weight-medium font-14 mt-4 mb-2 pb-1"
  }, [_vm._v("\n              Sidebar User Info\n            ")]), _vm._v(" "), _c("b-form-checkbox", {
    attrs: {
      name: "check-button",
      "switch": ""
    },
    on: {
      input: function input($event) {
        return _vm.enableInfo();
      }
    },
    model: {
      value: _vm.checked,
      callback: function callback($$v) {
        _vm.checked = $$v;
      },
      expression: "checked"
    }
  }, [_vm._v("\n              Enable\n            ")]), _vm._v(" "), _c("button", {
    staticClass: "btn btn-primary btn-block mt-4",
    attrs: {
      id: "resetBtn"
    },
    on: {
      click: function click($event) {
        return _vm.reset();
      }
    }
  }, [_vm._v("\n              Reset to Default\n            ")]), _vm._v(" "), _c("a", {
    staticClass: "btn btn-danger btn-block mt-2",
    attrs: {
      href: "https://wrapbootstrap.com/theme/minton-admin-dashboard-landing-template-WB0858DB6?ref=themesbrand",
      target: "_blank"
    }
  }, [_c("i", {
    staticClass: "mdi mdi-basket mr-1"
  }), _vm._v(" Purchase Now")])], 1)])], 1)], 1)], 1), _vm._v(" "), _c("div", {
    staticClass: "rightbar-overlay"
  })]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Sidebar.vue?vue&type=template&id=81fbb27e&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Sidebar.vue?vue&type=template&id=81fbb27e&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "left-side-menu"
  }, [_c("div", {
    staticClass: "logo-box"
  }, [_c("router-link", {
    staticClass: "logo logo-dark text-center",
    attrs: {
      to: "/"
    }
  }, [_c("span", {
    staticClass: "logo-sm"
  }, [_c("img", {
    attrs: {
      src: "/images/shamel-logo-006.png",
      alt: "",
      height: "24"
    }
  })]), _vm._v(" "), _c("span", {
    staticClass: "logo-lg"
  }, [_c("img", {
    attrs: {
      src: "/images/shamel-logo-006.png",
      alt: "",
      height: "24"
    }
  })])]), _vm._v(" "), _c("router-link", {
    staticClass: "logo logo-light text-center",
    attrs: {
      to: "/"
    }
  }, [_c("span", {
    staticClass: "logo-sm"
  }, [_c("img", {
    attrs: {
      src: "/images/shamel-logo-006.png",
      alt: "",
      height: "24"
    }
  })]), _vm._v(" "), _c("span", {
    staticClass: "logo-lg"
  }, [_c("img", {
    attrs: {
      src: "/images/shamel-logo-006.png",
      alt: "",
      height: "24"
    }
  })])])], 1), _vm._v(" "), _c("simplebar", {
    staticClass: "h-100",
    attrs: {
      "data-simplebar": ""
    }
  }, [_c("div", {
    staticClass: "user-box text-center"
  }, [_c("img", {
    staticClass: "rounded-circle avatar-md",
    attrs: {
      src: __webpack_require__(/*! ../assets/images/users/avatar-1.jpg */ "./resources/js/assets/images/users/avatar-1.jpg"),
      alt: "user-img",
      title: "Mat Helme"
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "dropdown"
  }, [_c("a", {
    staticClass: "text-reset dropdown-toggle h5 mt-2 mb-1 d-block",
    attrs: {
      href: "javascript: void(0);",
      "data-toggle": "dropdown"
    }
  }, [_vm._v("Nik Patel")]), _vm._v(" "), _c("div", {
    staticClass: "dropdown-menu user-pro-dropdown"
  }, [_c("a", {
    staticClass: "dropdown-item notify-item",
    attrs: {
      href: "javascript:void(0);"
    }
  }, [_c("i", {
    staticClass: "fe-user mr-1"
  }), _vm._v(" "), _c("span", [_vm._v("My Account")])]), _vm._v(" "), _c("a", {
    staticClass: "dropdown-item notify-item",
    attrs: {
      href: "javascript:void(0);"
    }
  }, [_c("i", {
    staticClass: "fe-settings mr-1"
  }), _vm._v(" "), _c("span", [_vm._v("Settings")])]), _vm._v(" "), _c("a", {
    staticClass: "dropdown-item notify-item",
    attrs: {
      href: "javascript:void(0);"
    }
  }, [_c("i", {
    staticClass: "fe-lock mr-1"
  }), _vm._v(" "), _c("span", [_vm._v("Lock Screen")])]), _vm._v(" "), _c("a", {
    staticClass: "dropdown-item notify-item",
    attrs: {
      href: "javascript:void(0);"
    }
  }, [_c("i", {
    staticClass: "fe-log-out mr-1"
  }), _vm._v(" "), _c("span", [_vm._v("Logout")])])])]), _vm._v(" "), _c("p", {
    staticClass: "text-reset"
  }, [_vm._v("Admin Head")])]), _vm._v(" "), _c("div", {
    attrs: {
      id: "sidebar-menu"
    }
  }, [_c("ul", {
    staticClass: "list-unstyled",
    attrs: {
      id: "side-menu"
    }
  }, [_vm._l(_vm.menuItems, function (item) {
    return [item.isTitle ? _c("li", {
      key: item.id,
      staticClass: "menu-title"
    }, [_vm._v(_vm._s(_vm.$t(item.label)))]) : _vm._e(), _vm._v(" "), !item.isTitle && !item.isLayout ? _c("li", {
      key: item.id
    }, [_vm.hasItems(item) ? _c("a", {
      "class": {
        "has-arrow": !item.badge,
        "has-dropdown": item.badge
      },
      attrs: {
        href: "javascript:void(0);"
      },
      on: {
        click: function click($event) {
          item.isMenuCollapsed = !item.isMenuCollapsed;
        }
      }
    }, [item.icon ? _c("i", {
      "class": "".concat(item.icon)
    }) : _vm._e(), _vm._v(" "), _c("span", [_vm._v(_vm._s(_vm.$t(item.label)))]), _vm._v(" "), !item.badge ? _c("span", {
      staticClass: "menu-arrow"
    }) : _vm._e(), _vm._v(" "), item.badge ? _c("span", {
      "class": "badge badge-pill badge-".concat(item.badge.variant, " float-right")
    }, [_vm._v(_vm._s(_vm.$t(item.badge.text)))]) : _vm._e()]) : _vm._e(), _vm._v(" "), !_vm.hasItems(item) ? _c("router-link", {
      staticClass: "side-nav-link-ref",
      attrs: {
        to: item.link
      }
    }, [item.icon ? _c("i", {
      "class": "".concat(item.icon)
    }) : _vm._e(), _vm._v(" "), _c("span", [_vm._v(_vm._s(_vm.$t(item.label)))]), _vm._v(" "), item.badge ? _c("span", {
      "class": "badge badge-pill badge-".concat(item.badge.variant, " float-right")
    }, [_vm._v(_vm._s(_vm.$t(item.badge.text)))]) : _vm._e()]) : _vm._e(), _vm._v(" "), _c("div", {
      staticClass: "collapse",
      "class": {
        show: item.isMenuCollapsed
      },
      attrs: {
        id: "sidebarTasks"
      }
    }, [_vm.hasItems(item) ? _c("ul", {
      staticClass: "sub-menu nav-second-level",
      attrs: {
        "aria-expanded": "false"
      }
    }, _vm._l(item.subItems, function (subitem, index) {
      return _c("li", {
        key: index
      }, [!_vm.hasItems(subitem) ? _c("router-link", {
        staticClass: "side-nav-link-ref",
        attrs: {
          to: subitem.link
        }
      }, [_vm._v(_vm._s(_vm.$t(subitem.label)))]) : _vm._e(), _vm._v(" "), _vm.hasItems(subitem) ? _c("a", {
        staticClass: "side-nav-link-a-ref has-arrow",
        attrs: {
          href: "javascript:void(0);"
        },
        on: {
          click: function click($event) {
            subitem.isMenuCollapsed = !subitem.isMenuCollapsed;
          }
        }
      }, [_vm._v(_vm._s(_vm.$t(subitem.label)) + "\n                                        "), _c("span", {
        staticClass: "menu-arrow"
      })]) : _vm._e(), _vm._v(" "), _c("div", {
        staticClass: "collapse",
        "class": {
          show: subitem.isMenuCollapsed
        }
      }, [_vm.hasItems(subitem) ? _c("ul", {
        staticClass: "sub-menu",
        attrs: {
          "aria-expanded": "false"
        }
      }, _vm._l(subitem.subItems, function (subSubitem, index) {
        return _c("li", {
          key: index
        }, [_c("router-link", {
          staticClass: "side-nav-link-ref",
          attrs: {
            to: subSubitem.link
          }
        }, [_vm._v(_vm._s(_vm.$t(subSubitem.label)))])], 1);
      }), 0) : _vm._e()])], 1);
    }), 0) : _vm._e()])], 1) : _vm._e()];
  })], 2)]), _vm._v(" "), _c("div", {
    staticClass: "clearfix"
  })])], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Topbar.vue?vue&type=template&id=57e4246e&":
/*!************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Topbar.vue?vue&type=template&id=57e4246e& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "navbar-custom"
  }, [_c("div", {
    staticClass: "container-fluid"
  }, [_c("ul", {
    staticClass: "list-unstyled topnav-menu float-right mb-0"
  }, [_c("li", {
    staticClass: "dropdown d-none d-lg-inline-block"
  }, [_c("a", {
    staticClass: "nav-link dropdown-toggle arrow-none waves-effect waves-light",
    attrs: {
      "data-toggle": "fullscreen",
      href: "#"
    },
    on: {
      click: _vm.initFullScreen
    }
  }, [_c("i", {
    staticClass: "fe-maximize noti-icon"
  })])]), _vm._v(" "), _c("b-nav-item-dropdown", {
    staticClass: "d-none d-lg-inline-block",
    attrs: {
      variant: "white",
      right: "",
      "toggle-class": "header-item"
    },
    scopedSlots: _vm._u([{
      key: "button-content",
      fn: function fn() {
        return [_c("img", {
          attrs: {
            src: _vm.flag,
            alt: "Header Language",
            height: "16"
          }
        }), _vm._v("\n            " + _vm._s(_vm.text) + "\n          ")];
      },
      proxy: true
    }])
  }, [_vm._v(" "), _vm._l(_vm.languages, function (entry, i) {
    return _c("b-dropdown-item", {
      key: "Lang".concat(i),
      staticClass: "notify-item",
      attrs: {
        value: entry,
        "link-class": {
          active: entry.language === _vm.current_language
        }
      },
      on: {
        click: function click($event) {
          return _vm.setLanguage(entry.language, entry.title, entry.flag);
        }
      }
    }, [_c("img", {
      staticClass: "mr-1",
      attrs: {
        src: "".concat(entry.flag),
        alt: "user-image",
        height: "12"
      }
    }), _vm._v(" "), _c("span", {
      staticClass: "align-middle"
    }, [_vm._v(_vm._s(entry.title))])]);
  })], 2), _vm._v(" "), _c("b-nav-item-dropdown", {
    staticClass: "notification-list",
    attrs: {
      right: "",
      "menu-class": "dropdown-lg"
    }
  }, [_c("a", {
    staticClass: "dropdown-item noti-title",
    attrs: {
      href: "#"
    }
  }, [_c("h5", {
    staticClass: "m-0"
  }, [_c("span", {
    staticClass: "float-right"
  }, [_c("a", {
    staticClass: "text-dark",
    attrs: {
      href: ""
    }
  }, [_c("small", [_vm._v(_vm._s(_vm.$t("navbar.dropdown.notification.subtext")))])])]), _vm._v("\n              " + _vm._s(_vm.$t("navbar.dropdown.notification.text")) + "\n            ")])]), _vm._v(" "), _c("simplebar", {
    staticStyle: {
      "max-height": "230px"
    }
  }, [_c("a", {
    staticClass: "dropdown-item notify-item active",
    attrs: {
      href: "javascript:void(0);"
    }
  }, [_c("div", {
    staticClass: "notify-icon bg-soft-primary text-primary"
  }, [_c("i", {
    staticClass: "mdi mdi-comment-account-outline"
  })]), _vm._v(" "), _c("p", {
    staticClass: "notify-details"
  }, [_vm._v("\n                " + _vm._s(_vm.$t("navbar.dropdown.notification.1.title")) + "\n                "), _c("small", {
    staticClass: "text-muted"
  }, [_vm._v(_vm._s(_vm.$t("navbar.dropdown.notification.1.text")))])])]), _vm._v(" "), _c("a", {
    staticClass: "dropdown-item notify-item",
    attrs: {
      href: "javascript:void(0);"
    }
  }, [_c("div", {
    staticClass: "notify-icon"
  }, [_c("img", {
    staticClass: "img-fluid rounded-circle",
    attrs: {
      src: __webpack_require__(/*! ../assets/images/users/avatar-2.jpg */ "./resources/js/assets/images/users/avatar-2.jpg"),
      alt: ""
    }
  })]), _vm._v(" "), _c("p", {
    staticClass: "notify-details"
  }, [_vm._v("\n                " + _vm._s(_vm.$t("navbar.dropdown.notification.2.title")) + "\n              ")]), _vm._v(" "), _c("p", {
    staticClass: "text-muted mb-0 user-msg"
  }, [_c("small", [_vm._v(_vm._s(_vm.$t("navbar.dropdown.notification.2.text")))])])]), _vm._v(" "), _c("a", {
    staticClass: "dropdown-item notify-item",
    attrs: {
      href: "javascript:void(0);"
    }
  }, [_c("div", {
    staticClass: "notify-icon"
  }, [_c("img", {
    staticClass: "img-fluid rounded-circle",
    attrs: {
      src: __webpack_require__(/*! ../assets/images/users/avatar-4.jpg */ "./resources/js/assets/images/users/avatar-4.jpg"),
      alt: ""
    }
  })]), _vm._v(" "), _c("p", {
    staticClass: "notify-details"
  }, [_vm._v("\n                " + _vm._s(_vm.$t("navbar.dropdown.notification.3.title")) + "\n              ")]), _vm._v(" "), _c("p", {
    staticClass: "text-muted mb-0 user-msg"
  }, [_c("small", [_vm._v(_vm._s(_vm.$t("navbar.dropdown.notification.3.text")))])])]), _vm._v(" "), _c("a", {
    staticClass: "dropdown-item notify-item",
    attrs: {
      href: "javascript:void(0);"
    }
  }, [_c("div", {
    staticClass: "notify-icon bg-soft-warning text-warning"
  }, [_c("i", {
    staticClass: "mdi mdi-account-plus"
  })]), _vm._v(" "), _c("p", {
    staticClass: "notify-details"
  }, [_vm._v("\n                " + _vm._s(_vm.$t("navbar.dropdown.notification.4.title")) + "\n                "), _c("small", {
    staticClass: "text-muted"
  }, [_vm._v(_vm._s(_vm.$t("navbar.dropdown.notification.4.text")))])])]), _vm._v(" "), _c("a", {
    staticClass: "dropdown-item notify-item",
    attrs: {
      href: "javascript:void(0);"
    }
  }, [_c("div", {
    staticClass: "notify-icon bg-info"
  }, [_c("i", {
    staticClass: "mdi mdi-comment-account-outline"
  })]), _vm._v(" "), _c("p", {
    staticClass: "notify-details"
  }, [_vm._v("\n                " + _vm._s(_vm.$t("navbar.dropdown.notification.5.title")) + "\n                "), _c("small", {
    staticClass: "text-muted"
  }, [_vm._v(_vm._s(_vm.$t("navbar.dropdown.notification.5.text")))])])]), _vm._v(" "), _c("a", {
    staticClass: "dropdown-item notify-item",
    attrs: {
      href: "javascript:void(0);"
    }
  }, [_c("div", {
    staticClass: "notify-icon bg-secondary"
  }, [_c("i", {
    staticClass: "mdi mdi-heart"
  })]), _vm._v(" "), _c("p", {
    staticClass: "notify-details"
  }, [_vm._v("\n                " + _vm._s(_vm.$t("navbar.dropdown.notification.6.title")) + "\n                "), _c("small", {
    staticClass: "text-muted"
  }, [_vm._v(_vm._s(_vm.$t("navbar.dropdown.notification.6.text")))])])])]), _vm._v(" "), _c("a", {
    staticClass: "dropdown-item text-center text-primary notify-item notify-all",
    attrs: {
      href: "javascript:void(0);"
    }
  }, [_vm._v("\n            " + _vm._s(_vm.$t("navbar.dropdown.notification.button")) + "\n            "), _c("i", {
    staticClass: "fi-arrow-right"
  })])], 1), _vm._v(" "), _c("b-nav-item-dropdown", {
    staticClass: "notification-list topbar-dropdown",
    attrs: {
      right: "",
      "menu-class": "profile-dropdown",
      "toggle-class": "p-0"
    }
  }, [_c("template", {
    staticClass: "nav-link dropdown-toggle",
    slot: "button-content"
  }, [_c("div", {
    staticClass: "nav-user mr-0"
  }, [_c("img", {
    staticClass: "rounded-circle",
    attrs: {
      src: __webpack_require__(/*! ../assets/images/users/avatar-1.jpg */ "./resources/js/assets/images/users/avatar-1.jpg"),
      alt: "user-image"
    }
  }), _vm._v(" "), _c("span", {
    staticClass: "pro-user-name ml-1"
  }, [_vm._v("\n                " + _vm._s(_vm.$store.getters["auth/admin"].name) + "\n                "), _c("i", {
    staticClass: "mdi mdi-chevron-down"
  })])])]), _vm._v(" "), _c("b-dropdown-divider"), _vm._v(" "), _c("a", {
    staticClass: "dropdown-item",
    attrs: {
      href: "javascript:void(0)"
    },
    on: {
      click: function click($event) {
        $event.preventDefault();
        return _vm.logout.apply(null, arguments);
      }
    }
  }, [_c("i", {
    staticClass: "fe-log-out mr-1"
  }), _vm._v(" "), _c("span", [_vm._v(_vm._s(_vm.$t("navbar.dropdown.name.list.logout")))])])], 2)], 1), _vm._v(" "), _c("div", {
    staticClass: "logo-box"
  }, [_c("router-link", {
    staticClass: "logo logo-dark text-center",
    attrs: {
      to: "/"
    }
  }, [_c("span", {
    staticClass: "logo-sm"
  }, [_c("img", {
    attrs: {
      src: __webpack_require__(/*! ../assets/images/logo-sm-dark.png */ "./resources/js/assets/images/logo-sm-dark.png"),
      alt: "",
      height: "24"
    }
  })]), _vm._v(" "), _c("span", {
    staticClass: "logo-lg"
  }, [_c("img", {
    attrs: {
      src: __webpack_require__(/*! ../assets/images/logo-dark.png */ "./resources/js/assets/images/logo-dark.png"),
      alt: "",
      height: "20"
    }
  })])]), _vm._v(" "), _c("router-link", {
    staticClass: "logo logo-light text-center",
    attrs: {
      to: "/"
    }
  }, [_c("span", {
    staticClass: "logo-sm"
  }, [_c("img", {
    attrs: {
      src: __webpack_require__(/*! ../assets/images/logo-sm.png */ "./resources/js/assets/images/logo-sm.png"),
      alt: "",
      height: "24"
    }
  })]), _vm._v(" "), _c("span", {
    staticClass: "logo-lg"
  }, [_c("img", {
    attrs: {
      src: __webpack_require__(/*! ../assets/images/logo-light.png */ "./resources/js/assets/images/logo-light.png"),
      alt: "",
      height: "20"
    }
  })])])], 1), _vm._v(" "), _c("ul", {
    staticClass: "list-unstyled topnav-menu topnav-menu-left m-0"
  }, [_c("li", [_c("button", {
    staticClass: "button-menu-mobile waves-effect waves-light",
    on: {
      click: _vm.toggleMenu
    }
  }, [_c("i", {
    staticClass: "fe-menu"
  })])]), _vm._v(" "), _c("li", [_c("a", {
    staticClass: "navbar-toggle nav-link",
    attrs: {
      "data-toggle": "collapse",
      "data-target": "#topnav-menu-content"
    },
    on: {
      click: function click($event) {
        return _vm.horizonalmenu();
      }
    }
  }, [_vm._m(0)])])]), _vm._v(" "), _c("div", {
    staticClass: "clearfix"
  })])]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "lines"
  }, [_c("span"), _vm._v(" "), _c("span"), _vm._v(" "), _c("span")]);
}];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Two-column-sidebar.vue?vue&type=template&id=174b4c31&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Two-column-sidebar.vue?vue&type=template&id=174b4c31& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "left-side-menu"
  }, [_c("div", {
    staticClass: "h-100"
  }, [_c("div", {
    staticClass: "sidebar-content"
  }, [_c("simplebar", {
    staticClass: "sidebar-icon-menu h-100",
    attrs: {
      "data-simplebar": ""
    }
  }, [_c("a", {
    staticClass: "logo",
    attrs: {
      href: "/"
    }
  }, [_c("span", [_c("img", {
    attrs: {
      src: __webpack_require__(/*! ../assets/images/logo-sm.png */ "./resources/js/assets/images/logo-sm.png"),
      alt: "",
      height: "28"
    }
  })])]), _vm._v(" "), _c("nav", {
    staticClass: "nav flex-column",
    attrs: {
      id: "two-col-sidenav-main"
    }
  }, [_c("a", {
    staticClass: "nav-link",
    "class": [_vm.activetab === 1 ? "active" : ""],
    attrs: {
      href: "javascript: void(0);",
      "data-toggle": "tooltip",
      "data-placement": "right",
      title: "Dashboard",
      "data-trigger": "hover"
    },
    on: {
      click: function click($event) {
        _vm.activetab = 1;
      }
    }
  }, [_c("i", {
    staticClass: "ri-dashboard-line"
  })]), _vm._v(" "), _c("a", {
    staticClass: "nav-link",
    "class": [_vm.activetab === 2 ? "active" : ""],
    attrs: {
      href: "javascript: void(0);",
      "data-toggle": "tooltip",
      "data-placement": "right",
      title: "Apps",
      "data-trigger": "hover"
    },
    on: {
      click: function click($event) {
        _vm.activetab = 2;
      }
    }
  }, [_c("i", {
    staticClass: "ri-apps-2-line"
  })]), _vm._v(" "), _c("a", {
    staticClass: "nav-link",
    "class": [_vm.activetab === 3 ? "active" : ""],
    attrs: {
      href: "javascript: void(0);",
      "data-toggle": "tooltip",
      "data-placement": "right",
      title: "Pages",
      "data-trigger": "hover"
    },
    on: {
      click: function click($event) {
        _vm.activetab = 3;
      }
    }
  }, [_c("i", {
    staticClass: "ri-pages-line"
  })]), _vm._v(" "), _c("a", {
    staticClass: "nav-link",
    "class": [_vm.activetab === 4 ? "active" : ""],
    attrs: {
      href: "javascript: void(0);",
      "data-toggle": "tooltip",
      "data-placement": "right",
      title: "UI Elements",
      "data-trigger": "hover"
    },
    on: {
      click: function click($event) {
        _vm.activetab = 4;
      }
    }
  }, [_c("i", {
    staticClass: "ri-pencil-ruler-2-line"
  })]), _vm._v(" "), _c("a", {
    staticClass: "nav-link",
    "class": [_vm.activetab === 5 ? "active" : ""],
    attrs: {
      href: "javascript: void(0);",
      "data-toggle": "tooltip",
      "data-placement": "right",
      title: "Components",
      "data-trigger": "hover"
    },
    on: {
      click: function click($event) {
        _vm.activetab = 5;
      }
    }
  }, [_c("i", {
    staticClass: "ri-stack-line"
  })]), _vm._v(" "), _c("router-link", {
    staticClass: "nav-link",
    attrs: {
      to: "/widgets"
    }
  }, [_c("i", {
    staticClass: "ri-honour-line align-middle"
  })])], 1)]), _vm._v(" "), _c("div", {
    staticClass: "sidebar-main-menu"
  }, [_c("simplebar", {
    staticClass: "h-100",
    attrs: {
      id: "two-col-menu",
      "data-simplebar": ""
    }
  }, [_vm.activetab === 1 ? _c("div", {
    staticClass: "twocolumn-menu-item d-block",
    attrs: {
      id: "dashboard"
    }
  }, [_c("div", {
    staticClass: "title-box"
  }, [_c("h5", {
    staticClass: "menu-title"
  }, [_vm._v("Dashboards")]), _vm._v(" "), _c("ul", {
    staticClass: "nav flex-column"
  }, [_c("li", {
    staticClass: "nav-item"
  }, [_c("router-link", {
    staticClass: "nav-link side-nav-link-ref",
    attrs: {
      to: {
        name: "home"
      }
    }
  }, [_vm._v("\n                                        Sales\n                                    ")])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("router-link", {
    staticClass: "nav-link side-nav-link-ref",
    attrs: _defineProperty({
      to: {
        name: "crm-dashboard"
      }
    }, "to", "/dashboard/crm")
  }, [_vm._v("\n                                        CRM\n                                    ")])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("router-link", {
    staticClass: "nav-link side-nav-link-ref",
    attrs: _defineProperty({
      to: "/dashboard/analytics"
    }, "to", {
      name: "analytics-dashboard"
    })
  }, [_vm._v("\n                                        Analytics\n                                    ")])], 1)])])]) : _vm._e(), _vm._v(" "), _vm.activetab === 2 ? _c("div", {
    staticClass: "twocolumn-menu-item d-block",
    attrs: {
      id: "apps"
    }
  }, [_c("h5", {
    staticClass: "menu-title"
  }, [_vm._v("Apps")]), _vm._v(" "), _c("ul", {
    staticClass: "nav flex-column"
  }, [_c("li", {
    staticClass: "nav-item"
  }, [_c("router-link", {
    staticClass: "nav-link side-nav-link-ref",
    attrs: {
      to: {
        name: "calendar"
      }
    }
  }, [_vm._v("\n                                    Calendar\n                                ")])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("router-link", {
    staticClass: "nav-link side-nav-link-ref",
    attrs: {
      to: {
        name: "chat"
      }
    }
  }, [_vm._v("\n                                    Chat\n                                ")])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("a", {
    directives: [{
      name: "b-toggle",
      rawName: "v-b-toggle.sidebarEcommerce",
      modifiers: {
        sidebarEcommerce: true
      }
    }],
    staticClass: "nav-link",
    attrs: {
      href: "javascript: void(0);",
      "data-toggle": "collapse"
    }
  }, [_c("span", [_vm._v("Ecommerce")]), _vm._v(" "), _c("span", {
    staticClass: "menu-arrow"
  })]), _vm._v(" "), _c("b-collapse", {
    attrs: {
      id: "sidebarEcommerce"
    }
  }, [_c("ul", {
    staticClass: "nav-second-level"
  }, [_c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: {
      to: {
        name: "products"
      }
    }
  }, [_vm._v("\n                                                Products List\n                                            ")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: {
      to: {
        name: "products-grid"
      }
    }
  }, [_vm._v("\n                                                Products Grid\n                                            ")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: {
      to: {
        name: "product-detail"
      }
    }
  }, [_vm._v("\n                                                Product Detail\n                                            ")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: {
      to: {
        name: "product-create"
      }
    }
  }, [_vm._v("\n                                                Create Product\n                                            ")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: {
      to: {
        name: "customers"
      }
    }
  }, [_vm._v("\n                                                Customers\n                                            ")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: {
      to: {
        name: "orders"
      }
    }
  }, [_vm._v("\n                                                Orders\n                                            ")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: {
      to: {
        name: "order-detail"
      }
    }
  }, [_vm._v("\n                                                Order Detail\n                                            ")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: {
      to: {
        name: "sellers"
      }
    }
  }, [_vm._v("\n                                                Sellers\n                                            ")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: {
      to: {
        name: "cart"
      }
    }
  }, [_vm._v("\n                                                Shopping Cart\n                                            ")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: {
      to: {
        name: "checkout"
      }
    }
  }, [_vm._v("\n                                                Checkout\n                                            ")])], 1)])])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("a", {
    directives: [{
      name: "b-toggle",
      rawName: "v-b-toggle.sidebarEmail",
      modifiers: {
        sidebarEmail: true
      }
    }],
    staticClass: "nav-link",
    attrs: {
      href: "#sidebarEmail",
      "data-toggle": "collapse"
    }
  }, [_c("span", [_vm._v("Email")]), _vm._v(" "), _c("span", {
    staticClass: "menu-arrow"
  })]), _vm._v(" "), _c("b-collapse", {
    attrs: {
      id: "sidebarEmail"
    }
  }, [_c("ul", {
    staticClass: "nav-second-level"
  }, [_c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: {
      to: {
        name: "email-inbox"
      }
    }
  }, [_vm._v("\n                                                Inbox\n                                            ")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: {
      to: {
        name: "reademail"
      }
    }
  }, [_vm._v("\n                                                Read Email\n                                            ")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: _defineProperty({
      to: "/email/templates"
    }, "to", {
      name: "email-templates"
    })
  }, [_vm._v("\n                                                Email Templates\n                                            ")])], 1)])])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("router-link", {
    staticClass: "nav-link side-nav-link-ref",
    attrs: _defineProperty({
      to: "companies"
    }, "to", {
      name: ""
    })
  }, [_vm._v("\n                                    Companies\n                                ")])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("a", {
    directives: [{
      name: "b-toggle",
      rawName: "v-b-toggle.sidebarTasks",
      modifiers: {
        sidebarTasks: true
      }
    }],
    staticClass: "nav-link",
    attrs: {
      href: "#sidebarTasks",
      "data-toggle": "collapse"
    }
  }, [_c("span", [_vm._v("Tasks")]), _vm._v(" "), _c("span", {
    staticClass: "menu-arrow"
  })]), _vm._v(" "), _c("b-collapse", {
    attrs: {
      id: "sidebarTasks"
    }
  }, [_c("ul", {
    staticClass: "nav-second-level"
  }, [_c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: {
      to: {
        name: "task-list"
      }
    }
  }, [_vm._v("\n                                                List\n                                            ")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: {
      to: {
        name: "task-detail"
      }
    }
  }, [_vm._v("\n                                                Details\n                                            ")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: {
      to: {
        name: "kanban-board"
      }
    }
  }, [_vm._v("\n                                                Kanban Board\n                                            ")])], 1)])])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("a", {
    directives: [{
      name: "b-toggle",
      rawName: "v-b-toggle.sidebarContacts",
      modifiers: {
        sidebarContacts: true
      }
    }],
    staticClass: "nav-link",
    attrs: {
      href: "javascript: void(0);",
      "data-toggle": "collapse"
    }
  }, [_c("span", [_vm._v("Contacts")]), _vm._v(" "), _c("span", {
    staticClass: "menu-arrow"
  })]), _vm._v(" "), _c("b-collapse", {
    attrs: {
      id: "sidebarContacts"
    }
  }, [_c("ul", {
    staticClass: "nav-second-level"
  }, [_c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: {
      to: {
        name: "contacts-list"
      }
    }
  }, [_vm._v("\n                                                Members List\n                                            ")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: {
      to: {
        name: "contacts-profile"
      }
    }
  }, [_vm._v("\n                                                Profile\n                                            ")])], 1)])])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("router-link", {
    staticClass: "nav-link side-nav-link-ref",
    attrs: {
      to: {
        name: "file-manager"
      }
    }
  }, [_vm._v("\n                                    File Manager\n                                ")])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("router-link", {
    staticClass: "nav-link side-nav-link-ref",
    attrs: {
      to: {
        name: "tickets"
      }
    }
  }, [_vm._v("\n                                    Tickets\n                                ")])], 1)])]) : _vm._e(), _vm._v(" "), _vm.activetab === 3 ? _c("div", {
    staticClass: "twocolumn-menu-item d-block",
    attrs: {
      id: "pages"
    }
  }, [_c("div", {
    staticClass: "title-box"
  }, [_c("h5", {
    staticClass: "menu-title"
  }, [_vm._v("Pages")]), _vm._v(" "), _c("ul", {
    staticClass: "nav flex-column"
  }, [_c("li", {
    staticClass: "nav-item"
  }, [_c("router-link", {
    staticClass: "nav-link side-nav-link-ref",
    attrs: {
      to: {
        name: "extras-starter"
      }
    }
  }, [_vm._v("Starter")])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("router-link", {
    staticClass: "nav-link side-nav-link-ref",
    attrs: {
      to: {
        name: "extras-timeline"
      }
    }
  }, [_vm._v("Timeline")])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("router-link", {
    staticClass: "nav-link side-nav-link-ref",
    attrs: {
      to: {
        name: "extras-sitemap"
      }
    }
  }, [_vm._v("Sitemap")])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("router-link", {
    staticClass: "nav-link side-nav-link-ref",
    attrs: {
      to: {
        name: "extras-invoice"
      }
    }
  }, [_vm._v("Invoice")])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("router-link", {
    staticClass: "nav-link side-nav-link-ref",
    attrs: {
      to: {
        name: "extras-faqs"
      }
    }
  }, [_vm._v("FAQs")])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("router-link", {
    staticClass: "nav-link side-nav-link-ref",
    attrs: {
      to: {
        name: "extras-search-results"
      }
    }
  }, [_vm._v("Search Results")])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("router-link", {
    staticClass: "nav-link side-nav-link-ref",
    attrs: {
      to: {
        name: "extras-pricing"
      }
    }
  }, [_vm._v("Pricing")])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("router-link", {
    staticClass: "nav-link side-nav-link-ref",
    attrs: {
      to: {
        name: "extras-maintenance"
      }
    }
  }, [_vm._v("Maintenance")])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("router-link", {
    staticClass: "nav-link side-nav-link-ref",
    attrs: {
      to: {
        name: "extras-coming-soon"
      }
    }
  }, [_vm._v("Coming Soon")])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("router-link", {
    staticClass: "nav-link side-nav-link-ref",
    attrs: {
      to: {
        name: "extras-lightbox"
      }
    }
  }, [_vm._v("Lightbox")])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("a", {
    directives: [{
      name: "b-toggle",
      rawName: "v-b-toggle.sidebarAuth",
      modifiers: {
        sidebarAuth: true
      }
    }],
    staticClass: "nav-link",
    attrs: {
      href: "javascript: void(0);",
      "data-toggle": "collapse"
    }
  }, [_c("span", [_vm._v("Auth Pages")]), _vm._v(" "), _c("span", {
    staticClass: "menu-arrow"
  })]), _vm._v(" "), _c("b-collapse", {
    staticClass: "collapse",
    attrs: {
      id: "sidebarAuth"
    }
  }, [_c("ul", {
    staticClass: "nav-second-level"
  }, [_c("li", [_c("router-link", {
    attrs: {
      to: {
        name: "auth-login-1"
      }
    }
  }, [_vm._v("Log In")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    attrs: {
      to: {
        name: "auth-login-2"
      }
    }
  }, [_vm._v("Log In 2")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    attrs: {
      to: {
        name: "auth-register-1"
      }
    }
  }, [_vm._v("Register")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    attrs: {
      to: {
        name: "auth-register-2"
      }
    }
  }, [_vm._v("Register 2")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    attrs: {
      to: {
        name: "auth-signin-signup"
      }
    }
  }, [_vm._v("Signin - Signup")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    attrs: {
      to: {
        name: "auth-signin-signup-2"
      }
    }
  }, [_vm._v("Signin - Signup 2")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    attrs: {
      to: {
        name: "auth-recoverpwd"
      }
    }
  }, [_vm._v("Recover Password")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    attrs: {
      to: {
        name: "auth-recoverpwd-2"
      }
    }
  }, [_vm._v("Recover Password 2")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    attrs: {
      to: {
        name: "auth-lock-screen"
      }
    }
  }, [_vm._v("Lock Screen")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    attrs: {
      to: {
        name: "auth-lock-screen-2"
      }
    }
  }, [_vm._v("Lock Screen 2")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    attrs: {
      to: {
        name: "auth-logout-1"
      }
    }
  }, [_vm._v("Logout")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    attrs: {
      to: {
        name: "auth-logout-2"
      }
    }
  }, [_vm._v("Logout 2")])], 1)])])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("a", {
    directives: [{
      name: "b-toggle",
      rawName: "v-b-toggle.sidebarErrors",
      modifiers: {
        sidebarErrors: true
      }
    }],
    staticClass: "nav-link",
    attrs: {
      href: "javascript: void(0);",
      "data-toggle": "collapse"
    }
  }, [_vm._v("\n                                        Error Pages\n                                        "), _c("span", {
    staticClass: "menu-arrow"
  })]), _vm._v(" "), _c("b-collapse", {
    attrs: {
      id: "sidebarErrors"
    }
  }, [_c("ul", {
    staticClass: "nav-second-level"
  }, [_c("li", [_c("router-link", {
    attrs: {
      to: {
        name: "error-404"
      }
    }
  }, [_vm._v("Error 404")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    attrs: {
      to: {
        name: "error-404-alt"
      }
    }
  }, [_vm._v("Error 404-alt")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    attrs: {
      to: {
        name: "error-500"
      }
    }
  }, [_vm._v("Error 500")])], 1)])])], 1)])])]) : _vm._e(), _vm._v(" "), _vm.activetab === 4 ? _c("div", {
    staticClass: "twocolumn-menu-item d-block",
    attrs: {
      id: "uielements"
    }
  }, [_c("div", {
    staticClass: "title-box"
  }, [_c("h5", {
    staticClass: "menu-title"
  }, [_vm._v("UI Elements")]), _vm._v(" "), _c("ul", {
    staticClass: "nav flex-column"
  }, [_c("li", {
    staticClass: "nav-item"
  }, [_c("router-link", {
    staticClass: "nav-link side-nav-link-ref",
    attrs: {
      to: {
        name: "ui-avatars"
      }
    }
  }, [_vm._v("Avatars")])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("router-link", {
    staticClass: "nav-link side-nav-link-ref",
    attrs: {
      to: {
        name: "ui-buttons"
      }
    }
  }, [_vm._v("Buttons")])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("router-link", {
    staticClass: "nav-link side-nav-link-ref",
    attrs: {
      to: {
        name: "ui-cards"
      }
    }
  }, [_vm._v("Cards")])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("router-link", {
    staticClass: "nav-link side-nav-link-ref",
    attrs: {
      to: {
        name: "ui-carousel"
      }
    }
  }, [_vm._v("Carousel")])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("router-link", {
    staticClass: "nav-link side-nav-link-ref",
    attrs: {
      to: {
        name: "ui-dropdowns"
      }
    }
  }, [_vm._v("Dropdowns")])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("router-link", {
    staticClass: "nav-link side-nav-link-ref",
    attrs: {
      to: {
        name: "ui-video"
      }
    }
  }, [_vm._v("Embed Video")])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("router-link", {
    staticClass: "nav-link side-nav-link-ref",
    attrs: {
      to: {
        name: "ui-general"
      }
    }
  }, [_vm._v("General UI")])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("router-link", {
    staticClass: "nav-link side-nav-link-ref",
    attrs: {
      to: {
        name: "ui-grid"
      }
    }
  }, [_vm._v("Grid")])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("router-link", {
    staticClass: "nav-link side-nav-link-ref",
    attrs: {
      to: {
        name: "ui-images"
      }
    }
  }, [_vm._v("Images")])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("router-link", {
    staticClass: "nav-link side-nav-link-ref",
    attrs: {
      to: {
        name: "ui-list-group"
      }
    }
  }, [_vm._v("List Group")])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("router-link", {
    staticClass: "nav-link side-nav-link-ref",
    attrs: {
      to: {
        name: "ui-modals"
      }
    }
  }, [_vm._v("Modals")])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("router-link", {
    staticClass: "nav-link side-nav-link-ref",
    attrs: {
      to: {
        name: "ui-notifications"
      }
    }
  }, [_vm._v("Notifications")])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("router-link", {
    staticClass: "nav-link side-nav-link-ref",
    attrs: {
      to: {
        name: "ui-portlets"
      }
    }
  }, [_vm._v("Portlets")])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("router-link", {
    staticClass: "nav-link side-nav-link-ref",
    attrs: {
      to: {
        name: "ui-progress"
      }
    }
  }, [_vm._v("Progress")])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("router-link", {
    staticClass: "nav-link side-nav-link-ref",
    attrs: {
      to: {
        name: "ui-ribbons"
      }
    }
  }, [_vm._v("Ribbons")])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("router-link", {
    staticClass: "nav-link side-nav-link-ref",
    attrs: {
      to: {
        name: "ui-spinners"
      }
    }
  }, [_vm._v("Spinners")])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("router-link", {
    staticClass: "nav-link side-nav-link-ref",
    attrs: {
      to: {
        name: "ui-tabs-accordions"
      }
    }
  }, [_vm._v("Tabs & Accordions")])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("router-link", {
    staticClass: "nav-link side-nav-link-ref",
    attrs: {
      to: {
        name: "ui-tooltips-popovers"
      }
    }
  }, [_vm._v("Tooltips & Popovers")])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("router-link", {
    staticClass: "nav-link side-nav-link-ref",
    attrs: {
      to: {
        name: "ui-typography"
      }
    }
  }, [_vm._v("Typography")])], 1)])])]) : _vm._e(), _vm._v(" "), _vm.activetab === 5 ? _c("div", {
    staticClass: "twocolumn-menu-item d-block",
    attrs: {
      id: "components"
    }
  }, [_c("div", {
    staticClass: "title-box"
  }, [_c("h5", {
    staticClass: "menu-title"
  }, [_vm._v("Components")]), _vm._v(" "), _c("ul", {
    staticClass: "nav flex-column"
  }, [_c("li", {
    staticClass: "nav-item"
  }, [_c("a", {
    directives: [{
      name: "b-toggle",
      rawName: "v-b-toggle.sidebarExtendedui",
      modifiers: {
        sidebarExtendedui: true
      }
    }],
    staticClass: "nav-link",
    attrs: {
      href: "javascript: void(0);",
      "data-toggle": "collapse"
    }
  }, [_c("span", {
    staticClass: "badge badge-info float-right"
  }, [_vm._v("Hot")]), _vm._v(" "), _c("span", [_vm._v("Extended UI")])]), _vm._v(" "), _c("b-collapse", {
    attrs: {
      id: "sidebarExtendedui"
    }
  }, [_c("ul", {
    staticClass: "nav-second-level"
  }, [_c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: {
      to: {
        name: "rangeslider"
      }
    }
  }, [_vm._v("Range Slider")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: {
      to: {
        name: "sweet-alert"
      }
    }
  }, [_vm._v("Sweet Alert")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: {
      to: {
        name: "tour"
      }
    }
  }, [_vm._v("Tour Page")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: {
      to: {
        name: "scrollspy"
      }
    }
  }, [_vm._v("Scrollspy")])], 1)])])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("a", {
    directives: [{
      name: "b-toggle",
      rawName: "v-b-toggle.sidebarIcons",
      modifiers: {
        sidebarIcons: true
      }
    }],
    staticClass: "nav-link",
    attrs: {
      href: "javascript: void(0);",
      "data-toggle": "collapse"
    }
  }, [_c("span", [_vm._v("Icons")]), _vm._v(" "), _c("span", {
    staticClass: "menu-arrow"
  })]), _vm._v(" "), _c("b-collapse", {
    attrs: {
      id: "sidebarIcons"
    }
  }, [_c("ul", {
    staticClass: "nav-second-level"
  }, [_c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: {
      to: {
        name: "feather"
      }
    }
  }, [_vm._v("Feather")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: {
      to: {
        name: "remix"
      }
    }
  }, [_vm._v("Remix")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: {
      to: {
        name: "boxicons"
      }
    }
  }, [_vm._v("Boxicons")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: {
      to: {
        name: "mdi"
      }
    }
  }, [_vm._v("Material Design")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: {
      to: {
        name: "font-awesome"
      }
    }
  }, [_vm._v("Font Awesome 5")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: {
      to: {
        name: "weather"
      }
    }
  }, [_vm._v("Weather")])], 1)])])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("a", {
    directives: [{
      name: "b-toggle",
      rawName: "v-b-toggle.sidebarForms",
      modifiers: {
        sidebarForms: true
      }
    }],
    staticClass: "nav-link",
    attrs: {
      href: "javascript: void(0);",
      "data-toggle": "collapse"
    }
  }, [_c("span", [_vm._v("Forms")]), _vm._v(" "), _c("span", {
    staticClass: "menu-arrow"
  })]), _vm._v(" "), _c("b-collapse", {
    attrs: {
      id: "sidebarForms"
    }
  }, [_c("ul", {
    staticClass: "nav-second-level"
  }, [_c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: {
      to: {
        name: "elements"
      }
    }
  }, [_vm._v("\n                                                    General Elements\n                                                ")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: {
      to: {
        name: "advanced-form"
      }
    }
  }, [_vm._v("\n                                                    Advanced\n                                                ")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: {
      to: {
        name: "validation"
      }
    }
  }, [_vm._v("\n                                                    Validation\n                                                ")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: {
      to: {
        name: "wizard"
      }
    }
  }, [_vm._v("\n                                                    Wizard\n                                                ")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: {
      to: {
        name: "mask"
      }
    }
  }, [_vm._v("\n                                                    Masks\n                                                ")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: {
      to: {
        name: "quill"
      }
    }
  }, [_vm._v("\n                                                    Quill Editor\n                                                ")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: _defineProperty({
      to: "/forms/file-uploads"
    }, "to", {
      name: "file-uploads"
    })
  }, [_vm._v("\n                                                    File Uploads\n                                                ")])], 1)])])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("a", {
    directives: [{
      name: "b-toggle",
      rawName: "v-b-toggle.sidebarTables",
      modifiers: {
        sidebarTables: true
      }
    }],
    staticClass: "nav-link",
    attrs: {
      href: "javascript: void(0);",
      "data-toggle": "collapse"
    }
  }, [_c("span", [_vm._v("Tables")]), _vm._v(" "), _c("span", {
    staticClass: "menu-arrow"
  })]), _vm._v(" "), _c("b-collapse", {
    attrs: {
      id: "sidebarTables"
    }
  }, [_c("ul", {
    staticClass: "nav-second-level"
  }, [_c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: {
      to: {
        name: "basic"
      }
    }
  }, [_vm._v("\n                                                    Basic Tables\n                                                ")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: {
      to: {
        name: "advanced"
      }
    }
  }, [_vm._v("\n                                                    Advanced Tables\n                                                ")])], 1)])])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("a", {
    directives: [{
      name: "b-toggle",
      rawName: "v-b-toggle.sidebarCharts",
      modifiers: {
        sidebarCharts: true
      }
    }],
    staticClass: "nav-link",
    attrs: {
      href: "javascript: void(0);",
      "data-toggle": "collapse"
    }
  }, [_c("span", [_vm._v("Charts")]), _vm._v(" "), _c("span", {
    staticClass: "menu-arrow"
  })]), _vm._v(" "), _c("b-collapse", {
    attrs: {
      id: "sidebarCharts"
    }
  }, [_c("ul", {
    staticClass: "nav-second-level"
  }, [_c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: {
      to: {
        name: "charts-apex"
      }
    }
  }, [_vm._v("\n                                                    Apex Charts\n                                                ")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: {
      to: {
        name: "charts-chartjs"
      }
    }
  }, [_vm._v("\n                                                    Chartjs Charts\n                                                ")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: {
      to: {
        name: "charts-c3"
      }
    }
  }, [_vm._v("\n                                                    C3 Charts\n                                                ")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: {
      to: {
        name: "charts-chartist"
      }
    }
  }, [_vm._v("\n                                                    Chartist Charts\n                                                ")])], 1), _vm._v(" "), _c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: {
      to: {
        name: "charts-knob"
      }
    }
  }, [_vm._v("\n                                                    Knob Charts\n                                                ")])], 1)])])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("a", {
    directives: [{
      name: "b-toggle",
      rawName: "v-b-toggle.sidebarMaps",
      modifiers: {
        sidebarMaps: true
      }
    }],
    staticClass: "nav-link",
    attrs: {
      href: "javascript: void(0);",
      "data-toggle": "collapse"
    }
  }, [_c("span", [_vm._v("Maps")]), _vm._v(" "), _c("span", {
    staticClass: "menu-arrow"
  })]), _vm._v(" "), _c("b-collapse", {
    attrs: {
      id: "sidebarMaps"
    }
  }, [_c("ul", {
    staticClass: "nav-second-level"
  }, [_c("li", [_c("router-link", {
    staticClass: "side-nav-link-ref",
    attrs: {
      to: {
        name: "maps-google"
      }
    }
  }, [_vm._v("\n                                                    Google Maps\n                                                ")])], 1)])])], 1), _vm._v(" "), _c("li", {
    staticClass: "nav-item"
  }, [_c("a", {
    directives: [{
      name: "b-toggle",
      rawName: "v-b-toggle.sidebarMultilevel",
      modifiers: {
        sidebarMultilevel: true
      }
    }],
    staticClass: "nav-link",
    attrs: {
      href: "javascript: void(0);",
      "data-toggle": "collapse"
    }
  }, [_c("span", [_vm._v("Multi Level")]), _vm._v(" "), _c("span", {
    staticClass: "menu-arrow"
  })]), _vm._v(" "), _c("b-collapse", {
    staticClass: "collapse",
    attrs: {
      id: "sidebarMultilevel"
    }
  }, [_c("ul", {
    staticClass: "nav-second-level"
  }, [_c("li", [_c("a", {
    directives: [{
      name: "b-toggle",
      rawName: "v-b-toggle.sidebarMultilevel2",
      modifiers: {
        sidebarMultilevel2: true
      }
    }],
    attrs: {
      href: "javascript: void(0);",
      "data-toggle": "collapse"
    }
  }, [_vm._v("\n                                                    Second Level\n                                                    "), _c("span", {
    staticClass: "menu-arrow"
  })]), _vm._v(" "), _c("b-collapse", {
    attrs: {
      id: "sidebarMultilevel2"
    }
  }, [_c("ul", {
    staticClass: "nav-second-level"
  }, [_c("li", [_c("a", {
    attrs: {
      href: "javascript: void(0);"
    }
  }, [_vm._v("Item 1")])]), _vm._v(" "), _c("li", [_c("a", {
    attrs: {
      href: "javascript: void(0);"
    }
  }, [_vm._v("Item 2")])])])])], 1), _vm._v(" "), _c("li", [_c("a", {
    attrs: {
      href: "#sidebarMultilevel3",
      "data-toggle": "collapse"
    }
  }, [_vm._v("Second Level 1")])])])])], 1)])])]) : _vm._e()])], 1), _vm._v(" "), _c("div", {
    staticClass: "clearfix"
  })], 1)])]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/layouts/detached.vue?vue&type=template&id=7032c937&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/layouts/detached.vue?vue&type=template&id=7032c937& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    attrs: {
      id: "wrapper"
    }
  }, [_c("Sidebar", {
    attrs: {
      type: _vm.leftSidebarType,
      width: _vm.layoutWidth,
      size: _vm.leftSidebarSize,
      menu: _vm.menuPosition,
      topbar: _vm.topbar
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "content-page"
  }, [_c("div", {
    staticClass: "content"
  }, [_c("Topbar"), _vm._v(" "), _c("div", {
    staticClass: "container-fluid"
  }, [_vm._t("default")], 2)], 1), _vm._v(" "), _c("Footer")], 1), _vm._v(" "), _c("Rightbar")], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/layouts/horizontal.vue?vue&type=template&id=29c46cae&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/layouts/horizontal.vue?vue&type=template&id=29c46cae& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    attrs: {
      id: "wrapper"
    }
  }, [_c("Topbar"), _vm._v(" "), _c("HorizontalNavbar", {
    attrs: {
      type: _vm.topbar,
      width: _vm.layoutWidth,
      menu: _vm.menuPosition
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "content-page"
  }, [_c("div", {
    staticClass: "content"
  }, [_c("div", {
    staticClass: "container-fluid"
  }, [_vm._t("default")], 2)]), _vm._v(" "), _c("Footer")], 1), _vm._v(" "), _c("Rightbar")], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/layouts/main.vue?vue&type=template&id=de3c3304&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/layouts/main.vue?vue&type=template&id=de3c3304& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", [_c("Vertical", [_vm._t("default")], 2)], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/layouts/two-column.vue?vue&type=template&id=ffe4ac08&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/layouts/two-column.vue?vue&type=template&id=ffe4ac08& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    attrs: {
      id: "wrapper"
    }
  }, [_c("Topbar"), _vm._v(" "), _c("TwoColumnSidebar", {
    attrs: {
      type: _vm.leftSidebarType,
      width: _vm.layoutWidth,
      size: _vm.leftSidebarSize,
      menu: _vm.menuPosition,
      topbar: _vm.topbar
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "content-page"
  }, [_c("div", {
    staticClass: "content"
  }, [_c("div", {
    staticClass: "container-fluid"
  }, [_vm._t("default")], 2)]), _vm._v(" "), _c("Footer")], 1), _vm._v(" "), _c("Rightbar")], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/layouts/vertical.vue?vue&type=template&id=7397033b&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/layouts/vertical.vue?vue&type=template&id=7397033b& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    attrs: {
      id: "wrapper"
    }
  }, [_c("Sidebar", {
    attrs: {
      type: _vm.leftSidebarType,
      width: _vm.layoutWidth,
      size: _vm.leftSidebarSize,
      menu: _vm.menuPosition,
      topbar: _vm.topbar
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "content-page"
  }, [_c("div", {
    staticClass: "content"
  }, [_c("Topbar"), _vm._v(" "), _c("div", {
    staticClass: "container-fluid"
  }, [_vm._t("default")], 2)], 1), _vm._v(" "), _c("Footer")], 1), _vm._v(" "), _c("Rightbar")], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/pages/icons/boxicons.vue?vue&type=template&id=060cd72e&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/pages/icons/boxicons.vue?vue&type=template&id=060cd72e& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("Layout", [_c("PageHeader", {
    attrs: {
      title: _vm.title,
      items: _vm.items
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-12"
  }, [_c("div", {
    staticClass: "card"
  }, [_c("div", {
    staticClass: "card-body"
  }, [_c("h4", {
    staticClass: "header-title"
  }, [_vm._v("Examples")]), _vm._v(" "), _c("p", {
    staticClass: "sub-header"
  }, [_vm._v("Use class "), _c("code", [_vm._v('<i class="bx bx-**"></i>')])]), _vm._v(" "), _c("h5", [_vm._v("Regular")]), _vm._v(" "), _c("div", {
    staticClass: "row icons-list-demo"
  }, [_c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-sticker"
  }), _vm._v(" bx bx-sticker\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-shield-quarter"
  }), _vm._v(" bx bx-shield-quarter\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-upside-down"
  }), _vm._v(" bx bx-upside-down\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-laugh"
  }), _vm._v(" bx bx-laugh\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-meh-blank"
  }), _vm._v(" bx bx-meh-blank\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-happy-beaming"
  }), _vm._v(" bx bx-happy-beaming\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-shocked"
  }), _vm._v(" bx bx-shocked\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-sleepy"
  }), _vm._v(" bx bx-sleepy\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-confused"
  }), _vm._v(" bx bx-confused\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-wink-smile"
  }), _vm._v(" bx bx-wink-smile\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-dizzy"
  }), _vm._v(" bx bx-dizzy\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-happy-heart-eyes"
  }), _vm._v(" bx bx-happy-heart-eyes\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-angry"
  }), _vm._v(" bx bx-angry\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-smile"
  }), _vm._v(" bx bx-smile\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-tired"
  }), _vm._v(" bx bx-tired\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-cool"
  }), _vm._v(" bx bx-cool\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-happy-alt"
  }), _vm._v(" bx bx-happy-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-wink-tongue"
  }), _vm._v(" bx bx-wink-tongue\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-meh-alt"
  }), _vm._v(" bx bx-meh-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-food-menu"
  }), _vm._v(" bx bx-food-menu\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-food-tag"
  }), _vm._v(" bx bx-food-tag\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-female-sign"
  }), _vm._v(" bx bx-female-sign\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-male-sign"
  }), _vm._v(" bx bx-male-sign\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-female"
  }), _vm._v(" bx bx-female\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-male"
  }), _vm._v(" bx bx-male\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-clinic"
  }), _vm._v(" bx bx-clinic\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-health"
  }), _vm._v(" bx bx-health\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-shekel"
  }), _vm._v(" bx bx-shekel\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-yen"
  }), _vm._v(" bx bx-yen\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-won"
  }), _vm._v(" bx bx-won\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-pound"
  }), _vm._v(" bx bx-pound\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-euro"
  }), _vm._v(" bx bx-euro\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-rupee"
  }), _vm._v(" bx bx-rupee\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-ruble"
  }), _vm._v(" bx bx-ruble\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-lira"
  }), _vm._v(" bx bx-lira\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-bitcoin"
  }), _vm._v(" bx bx-bitcoin\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-tone"
  }), _vm._v(" bx bx-tone\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-bolt-circle"
  }), _vm._v(" bx bx-bolt-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-cake"
  }), _vm._v(" bx bx-cake\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-spa"
  }), _vm._v(" bx bx-spa\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-dish"
  }), _vm._v(" bx bx-dish\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-fridge"
  }), _vm._v(" bx bx-fridge\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-image-add"
  }), _vm._v(" bx bx-image-add\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-image-alt"
  }), _vm._v(" bx bx-image-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-space-bar"
  }), _vm._v(" bx bx-space-bar\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-alarm-add"
  }), _vm._v(" bx bx-alarm-add\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-archive-out"
  }), _vm._v(" bx bx-archive-out\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-archive-in"
  }), _vm._v(" bx bx-archive-in\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-add-to-queue"
  }), _vm._v(" bx bx-add-to-queue\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-border-radius"
  }), _vm._v(" bx bx-border-radius\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-check-shield"
  }), _vm._v(" bx bx-check-shield\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-label"
  }), _vm._v(" bx bx-label\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-file-find"
  }), _vm._v(" bx bx-file-find\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-face"
  }), _vm._v(" bx bx-face\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-extension"
  }), _vm._v(" bx bx-extension\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-exit"
  }), _vm._v(" bx bx-exit\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-conversation"
  }), _vm._v(" bx bx-conversation\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-sort-z-a"
  }), _vm._v(" bx bx-sort-z-a\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-sort-a-z"
  }), _vm._v(" bx bx-sort-a-z\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-printer"
  }), _vm._v(" bx bx-printer\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-radio"
  }), _vm._v(" bx bx-radio\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-customize"
  }), _vm._v(" bx bx-customize\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-brush-alt"
  }), _vm._v(" bx bx-brush-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-briefcase-alt-2"
  }), _vm._v(" bx bx-briefcase-alt-2\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-time-five"
  }), _vm._v(" bx bx-time-five\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-pie-chart-alt-2"
  }), _vm._v(" bx bx-pie-chart-alt-2\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-gas-pump"
  }), _vm._v(" bx bx-gas-pump\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-mobile-vibration"
  }), _vm._v(" bx bx-mobile-vibration\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-mobile-landscape"
  }), _vm._v(" bx bx-mobile-landscape\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-border-all"
  }), _vm._v(" bx bx-border-all\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-border-bottom"
  }), _vm._v(" bx bx-border-bottom\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-border-top"
  }), _vm._v(" bx bx-border-top\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-border-left"
  }), _vm._v(" bx bx-border-left\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-border-right"
  }), _vm._v(" bx bx-border-right\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-dialpad-alt"
  }), _vm._v(" bx bx-dialpad-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-filter-alt"
  }), _vm._v(" bx bx-filter-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-brightness"
  }), _vm._v(" bx bx-brightness\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-brightness-half"
  }), _vm._v(" bx bx-brightness-half\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-wifi-off"
  }), _vm._v(" bx bx-wifi-off\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-credit-card-alt"
  }), _vm._v(" bx bx-credit-card-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-band-aid"
  }), _vm._v(" bx bx-band-aid\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-hive"
  }), _vm._v(" bx bx-hive\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-map-pin"
  }), _vm._v(" bx bx-map-pin\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-line-chart"
  }), _vm._v(" bx bx-line-chart\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-receipt"
  }), _vm._v(" bx bx-receipt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-purchase-tag-alt"
  }), _vm._v(" bx bx-purchase-tag-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-basket"
  }), _vm._v(" bx bx-basket\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-palette"
  }), _vm._v(" bx bx-palette\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-no-entry"
  }), _vm._v(" bx bx-no-entry\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-message-alt-dots"
  }), _vm._v(" bx bx-message-alt-dots\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-message-alt"
  }), _vm._v(" bx bx-message-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-check-square"
  }), _vm._v(" bx bx-check-square\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-log-out-circle"
  }), _vm._v(" bx bx-log-out-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-log-in-circle"
  }), _vm._v(" bx bx-log-in-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-doughnut-chart"
  }), _vm._v(" bx bx-doughnut-chart\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-building-house"
  }), _vm._v(" bx bx-building-house\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-accessibility"
  }), _vm._v(" bx bx-accessibility\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-user-voice"
  }), _vm._v(" bx bx-user-voice\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-cuboid"
  }), _vm._v(" bx bx-cuboid\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-cube-alt"
  }), _vm._v(" bx bx-cube-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-polygon"
  }), _vm._v(" bx bx-polygon\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-square-rounded"
  }), _vm._v(" bx bx-square-rounded\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-square"
  }), _vm._v(" bx bx-square\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-error-alt"
  }), _vm._v(" bx bx-error-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-shield-alt-2"
  }), _vm._v(" bx bx-shield-alt-2\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-paint-roll"
  }), _vm._v(" bx bx-paint-roll\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-droplet"
  }), _vm._v(" bx bx-droplet\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-street-view"
  }), _vm._v(" bx bx-street-view\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-plus-medical"
  }), _vm._v(" bx bx-plus-medical\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-search-alt-2"
  }), _vm._v(" bx bx-search-alt-2\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-bowling-ball"
  }), _vm._v(" bx bx-bowling-ball\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-dna"
  }), _vm._v(" bx bx-dna\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-cycling"
  }), _vm._v(" bx bx-cycling\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-shape-circle"
  }), _vm._v(" bx bx-shape-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-down-arrow-alt"
  }), _vm._v(" bx bx-down-arrow-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-up-arrow-alt"
  }), _vm._v(" bx bx-up-arrow-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-right-arrow-alt"
  }), _vm._v(" bx bx-right-arrow-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-left-arrow-alt"
  }), _vm._v(" bx bx-left-arrow-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-lock-open-alt"
  }), _vm._v(" bx bx-lock-open-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-lock-alt"
  }), _vm._v(" bx bx-lock-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-cylinder"
  }), _vm._v(" bx bx-cylinder\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-pyramid"
  }), _vm._v(" bx bx-pyramid\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-comment-dots"
  }), _vm._v(" bx bx-comment-dots\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-comment"
  }), _vm._v(" bx bx-comment\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-landscape"
  }), _vm._v(" bx bx-landscape\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-book-open"
  }), _vm._v(" bx bx-book-open\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-transfer-alt"
  }), _vm._v(" bx bx-transfer-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-copy-alt"
  }), _vm._v(" bx bx-copy-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-run"
  }), _vm._v(" bx bx-run\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-user-pin"
  }), _vm._v(" bx bx-user-pin\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-grid"
  }), _vm._v(" bx bx-grid\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-code-alt"
  }), _vm._v(" bx bx-code-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-mail-send"
  }), _vm._v(" bx bx-mail-send\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-ghost"
  }), _vm._v(" bx bx-ghost\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-shape-triangle"
  }), _vm._v(" bx bx-shape-triangle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-shape-square"
  }), _vm._v(" bx bx-shape-square\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-video-recording"
  }), _vm._v(" bx bx-video-recording\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-notepad"
  }), _vm._v(" bx bx-notepad\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-bug-alt"
  }), _vm._v(" bx bx-bug-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-mouse-alt"
  }), _vm._v(" bx bx-mouse-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-edit-alt"
  }), _vm._v(" bx bx-edit-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-chat"
  }), _vm._v(" bx bx-chat\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-book-content"
  }), _vm._v(" bx bx-book-content\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-message-square-dots"
  }), _vm._v(" bx bx-message-square-dots\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-message-square"
  }), _vm._v(" bx bx-message-square\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-slideshow"
  }), _vm._v(" bx bx-slideshow\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-wallet-alt"
  }), _vm._v(" bx bx-wallet-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-memory-card"
  }), _vm._v(" bx bx-memory-card\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-message-rounded-dots"
  }), _vm._v(" bx bx-message-rounded-dots\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-message-dots"
  }), _vm._v(" bx bx-message-dots\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-bar-chart-alt-2"
  }), _vm._v(" bx bx-bar-chart-alt-2\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-store-alt"
  }), _vm._v(" bx bx-store-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-buildings"
  }), _vm._v(" bx bx-buildings\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-home-circle"
  }), _vm._v(" bx bx-home-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-money"
  }), _vm._v(" bx bx-money\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-walk"
  }), _vm._v(" bx bx-walk\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-repeat"
  }), _vm._v(" bx bx-repeat\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-font-family"
  }), _vm._v(" bx bx-font-family\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-joystick-button"
  }), _vm._v(" bx bx-joystick-button\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-paint"
  }), _vm._v(" bx bx-paint\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-unlink"
  }), _vm._v(" bx bx-unlink\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-brush"
  }), _vm._v(" bx bx-brush\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-rotate-left"
  }), _vm._v(" bx bx-rotate-left\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-badge-check"
  }), _vm._v(" bx bx-badge-check\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-show-alt"
  }), _vm._v(" bx bx-show-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-caret-down"
  }), _vm._v(" bx bx-caret-down\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-caret-right"
  }), _vm._v(" bx bx-caret-right\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-caret-up"
  }), _vm._v(" bx bx-caret-up\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-caret-left"
  }), _vm._v(" bx bx-caret-left\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-calendar-event"
  }), _vm._v(" bx bx-calendar-event\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-magnet"
  }), _vm._v(" bx bx-magnet\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-rewind-circle"
  }), _vm._v(" bx bx-rewind-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-card"
  }), _vm._v(" bx bx-card\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-help-circle"
  }), _vm._v(" bx bx-help-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-test-tube"
  }), _vm._v(" bx bx-test-tube\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-note"
  }), _vm._v(" bx bx-note\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-sort-down"
  }), _vm._v(" bx bx-sort-down\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-sort-up"
  }), _vm._v(" bx bx-sort-up\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-id-card"
  }), _vm._v(" bx bx-id-card\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-badge"
  }), _vm._v(" bx bx-badge\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-grid-small"
  }), _vm._v(" bx bx-grid-small\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-grid-vertical"
  }), _vm._v(" bx bx-grid-vertical\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-grid-horizontal"
  }), _vm._v(" bx bx-grid-horizontal\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-move-vertical"
  }), _vm._v(" bx bx-move-vertical\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-move-horizontal"
  }), _vm._v(" bx bx-move-horizontal\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-stats"
  }), _vm._v(" bx bx-stats\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-equalizer"
  }), _vm._v(" bx bx-equalizer\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-disc"
  }), _vm._v(" bx bx-disc\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-analyse"
  }), _vm._v(" bx bx-analyse\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-search-alt"
  }), _vm._v(" bx bx-search-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-dollar-circle"
  }), _vm._v(" bx bx-dollar-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-football"
  }), _vm._v(" bx bx-football\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-ball"
  }), _vm._v(" bx bx-ball\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-circle"
  }), _vm._v(" bx bx-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-transfer"
  }), _vm._v(" bx bx-transfer\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-fingerprint"
  }), _vm._v(" bx bx-fingerprint\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-font-color"
  }), _vm._v(" bx bx-font-color\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-highlight"
  }), _vm._v(" bx bx-highlight\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-file-blank"
  }), _vm._v(" bx bx-file-blank\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-strikethrough"
  }), _vm._v(" bx bx-strikethrough\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-photo-album"
  }), _vm._v(" bx bx-photo-album\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-code-block"
  }), _vm._v(" bx bx-code-block\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-font-size"
  }), _vm._v(" bx bx-font-size\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-handicap"
  }), _vm._v(" bx bx-handicap\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-dialpad"
  }), _vm._v(" bx bx-dialpad\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-wind"
  }), _vm._v(" bx bx-wind\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-water"
  }), _vm._v(" bx bx-water\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-swim"
  }), _vm._v(" bx bx-swim\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-restaurant"
  }), _vm._v(" bx bx-restaurant\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-box"
  }), _vm._v(" bx bx-box\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-menu-alt-right"
  }), _vm._v(" bx bx-menu-alt-right\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-menu-alt-left"
  }), _vm._v(" bx bx-menu-alt-left\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-video-plus"
  }), _vm._v(" bx bx-video-plus\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-list-ol"
  }), _vm._v(" bx bx-list-ol\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-planet"
  }), _vm._v(" bx bx-planet\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-hotel"
  }), _vm._v(" bx bx-hotel\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-movie"
  }), _vm._v(" bx bx-movie\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-taxi"
  }), _vm._v(" bx bx-taxi\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-train"
  }), _vm._v(" bx bx-train\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-bath"
  }), _vm._v(" bx bx-bath\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-bed"
  }), _vm._v(" bx bx-bed\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-area"
  }), _vm._v(" bx bx-area\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-bot"
  }), _vm._v(" bx bx-bot\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-dumbbell"
  }), _vm._v(" bx bx-dumbbell\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-check-double"
  }), _vm._v(" bx bx-check-double\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-bus"
  }), _vm._v(" bx bx-bus\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-check-circle"
  }), _vm._v(" bx bx-check-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-rocket"
  }), _vm._v(" bx bx-rocket\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-certification"
  }), _vm._v(" bx bx-certification\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-slider-alt"
  }), _vm._v(" bx bx-slider-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-sad"
  }), _vm._v(" bx bx-sad\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-meh"
  }), _vm._v(" bx bx-meh\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-happy"
  }), _vm._v(" bx bx-happy\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-cart-alt"
  }), _vm._v(" bx bx-cart-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-car"
  }), _vm._v(" bx bx-car\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-loader-alt"
  }), _vm._v(" bx bx-loader-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-loader-circle"
  }), _vm._v(" bx bx-loader-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-wrench"
  }), _vm._v(" bx bx-wrench\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-alarm-off"
  }), _vm._v(" bx bx-alarm-off\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-layout"
  }), _vm._v(" bx bx-layout\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-dock-left"
  }), _vm._v(" bx bx-dock-left\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-dock-top"
  }), _vm._v(" bx bx-dock-top\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-dock-right"
  }), _vm._v(" bx bx-dock-right\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-dock-bottom"
  }), _vm._v(" bx bx-dock-bottom\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-dock-bottom"
  }), _vm._v(" bx bx-dock-bottom\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-world"
  }), _vm._v(" bx bx-world\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-selection"
  }), _vm._v(" bx bx-selection\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-paper-plane"
  }), _vm._v(" bx bx-paper-plane\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-slider"
  }), _vm._v(" bx bx-slider\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-loader"
  }), _vm._v(" bx bx-loader\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-chalkboard"
  }), _vm._v(" bx bx-chalkboard\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-trash-alt"
  }), _vm._v(" bx bx-trash-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-grid-alt"
  }), _vm._v(" bx bx-grid-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-command"
  }), _vm._v(" bx bx-command\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-window-close"
  }), _vm._v(" bx bx-window-close\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-notification-off"
  }), _vm._v(" bx bx-notification-off\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-plug"
  }), _vm._v(" bx bx-plug\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-infinite"
  }), _vm._v(" bx bx-infinite\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-carousel"
  }), _vm._v(" bx bx-carousel\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-hourglass"
  }), _vm._v(" bx bx-hourglass\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-briefcase-alt"
  }), _vm._v(" bx bx-briefcase-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-wallet"
  }), _vm._v(" bx bx-wallet\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-station"
  }), _vm._v(" bx bx-station\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-collection"
  }), _vm._v(" bx bx-collection\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-tv"
  }), _vm._v(" bx bx-tv\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-closet"
  }), _vm._v(" bx bx-closet\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-paperclip"
  }), _vm._v(" bx bx-paperclip\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-expand"
  }), _vm._v(" bx bx-expand\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-pen"
  }), _vm._v(" bx bx-pen\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-purchase-tag"
  }), _vm._v(" bx bx-purchase-tag\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-images"
  }), _vm._v(" bx bx-images\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-pie-chart-alt"
  }), _vm._v(" bx bx-pie-chart-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-news"
  }), _vm._v(" bx bx-news\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-downvote"
  }), _vm._v(" bx bx-downvote\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-upvote"
  }), _vm._v(" bx bx-upvote\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-globe-alt"
  }), _vm._v(" bx bx-globe-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-store"
  }), _vm._v(" bx bx-store\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-hdd"
  }), _vm._v(" bx bx-hdd\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-skip-previous-circle"
  }), _vm._v(" bx bx-skip-previous-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-skip-next-circle"
  }), _vm._v(" bx bx-skip-next-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-chip"
  }), _vm._v(" bx bx-chip\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-cast"
  }), _vm._v(" bx bx-cast\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-body"
  }), _vm._v(" bx bx-body\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-phone-outgoing"
  }), _vm._v(" bx bx-phone-outgoing\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-phone-incoming"
  }), _vm._v(" bx bx-phone-incoming\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-collapse"
  }), _vm._v(" bx bx-collapse\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-rename"
  }), _vm._v(" bx bx-rename\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-rotate-right"
  }), _vm._v(" bx bx-rotate-right\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-horizontal-center"
  }), _vm._v(" bx bx-horizontal-center\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-ruler"
  }), _vm._v(" bx bx-ruler\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-import"
  }), _vm._v(" bx bx-import\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-calendar-alt"
  }), _vm._v(" bx bx-calendar-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-battery"
  }), _vm._v(" bx bx-battery\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-server"
  }), _vm._v(" bx bx-server\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-task"
  }), _vm._v(" bx bx-task\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-folder-open"
  }), _vm._v(" bx bx-folder-open\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-film"
  }), _vm._v(" bx bx-film\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-aperture"
  }), _vm._v(" bx bx-aperture\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-phone-call"
  }), _vm._v(" bx bx-phone-call\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-up-arrow"
  }), _vm._v(" bx bx-up-arrow\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-undo"
  }), _vm._v(" bx bx-undo\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-timer"
  }), _vm._v(" bx bx-timer\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-support"
  }), _vm._v(" bx bx-support\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-subdirectory-right"
  }), _vm._v(" bx bx-subdirectory-right\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-right-arrow"
  }), _vm._v(" bx bx-\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-"
  }), _vm._v(" bx bx-right-arrow\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-revision"
  }), _vm._v(" bx bx-revision\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-repost"
  }), _vm._v(" bx bx-repost\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-reply"
  }), _vm._v(" bx bx-reply\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-reply-all"
  }), _vm._v(" bx bx-reply-all\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-redo"
  }), _vm._v(" bx bx-redo\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-radar"
  }), _vm._v(" bx bx-radar\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-poll"
  }), _vm._v(" bx bx-poll\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-list-check"
  }), _vm._v(" bx bx-list-check\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-like"
  }), _vm._v(" bx bx-like\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-left-arrow"
  }), _vm._v(" bx bx-left-arrow\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-joystick-alt"
  }), _vm._v(" bx bx-joystick-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-history"
  }), _vm._v(" bx bx-history\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-flag"
  }), _vm._v(" bx bx-flag\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-first-aid"
  }), _vm._v(" bx bx-first-aid\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-export"
  }), _vm._v(" bx bx-export\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-down-arrow"
  }), _vm._v(" bx bx-down-arrow\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-dislike"
  }), _vm._v(" bx bx-dislike\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-crown"
  }), _vm._v(" bx bx-crown\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-barcode"
  }), _vm._v(" bx bx-barcode\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-user"
  }), _vm._v(" bx bx-user\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-user-x"
  }), _vm._v(" bx bx-user-x\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-user-plus"
  }), _vm._v(" bx bx-user-plus\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-user-minus"
  }), _vm._v(" bx bx-user-minus\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-user-circle"
  }), _vm._v(" bx bx-user-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-user-check"
  }), _vm._v(" bx bx-user-check\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-underline"
  }), _vm._v(" bx bx-underline\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-trophy"
  }), _vm._v(" bx bx-trophy\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-trash"
  }), _vm._v(" bx bx-trash\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-text"
  }), _vm._v(" bx bx-text\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-sun"
  }), _vm._v(" bx bx-sun\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-star"
  }), _vm._v(" bx bx-star\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-sort"
  }), _vm._v(" bx bx-sort\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-shuffle"
  }), _vm._v(" bx bx-shuffle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-shopping-bag"
  }), _vm._v(" bx bx-shopping-bag\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-shield"
  }), _vm._v(" bx bx-shield\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-shield-alt"
  }), _vm._v(" bx bx-shield-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-share"
  }), _vm._v(" bx bx-share\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-share-alt"
  }), _vm._v(" bx bx-share-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-select-multiple"
  }), _vm._v(" bx bx-select-multiple\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-screenshot"
  }), _vm._v(" bx bx-screenshot\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-save"
  }), _vm._v(" bx bx-save\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-pulse"
  }), _vm._v(" bx bx-pulse\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-power-off"
  }), _vm._v(" bx bx-power-off\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-plus"
  }), _vm._v(" bx bx-plus\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-pin"
  }), _vm._v(" bx bx-pin\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-pencil"
  }), _vm._v(" bx bx-pencil\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-pin"
  }), _vm._v(" bx bx-pin\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-pencil"
  }), _vm._v(" bx bx-pencil\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-paste"
  }), _vm._v(" bx bx-paste\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-paragraph"
  }), _vm._v(" bx bx-paragraph\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-package"
  }), _vm._v(" bx bx-package\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-notification"
  }), _vm._v(" bx bx-notification\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-music"
  }), _vm._v(" bx bx-music\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-move"
  }), _vm._v(" bx bx-move\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-mouse"
  }), _vm._v(" bx bx-mouse\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-minus"
  }), _vm._v(" bx bx-minus\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-microphone-off"
  }), _vm._v(" bx bx-microphone-off\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-log-out"
  }), _vm._v(" bx bx-log-out\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-log-in"
  }), _vm._v(" bx bx-log-in\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-link-external"
  }), _vm._v(" bx bx-link-external\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-joystick"
  }), _vm._v(" bx bx-joystick\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-italic"
  }), _vm._v(" bx bx-italic\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-home-alt"
  }), _vm._v(" bx bx-home-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-heading"
  }), _vm._v(" bx bx-heading\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-hash"
  }), _vm._v(" bx bx-hash\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-group"
  }), _vm._v(" bx bx-group\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-git-repo-forked"
  }), _vm._v(" bx bx-git-repo-forked\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-git-pull-request"
  }), _vm._v(" bx bx-git-pull-request\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-git-merge"
  }), _vm._v(" bx bx-git-merge\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-git-compare"
  }), _vm._v(" bx bx-git-compare\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-git-commit"
  }), _vm._v(" bx bx-git-commit\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-git-branch"
  }), _vm._v(" bx bx-git-branch\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-font"
  }), _vm._v(" bx bx-font\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-filter"
  }), _vm._v(" bx bx-filter\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-file"
  }), _vm._v(" bx bx-file\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-edit"
  }), _vm._v(" bx bx-edit\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-diamond"
  }), _vm._v(" bx bx-diamond\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-detail"
  }), _vm._v(" bx bx-detail\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-cut"
  }), _vm._v(" bx bx-cut\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-cube"
  }), _vm._v(" bx bx-cube\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-crop"
  }), _vm._v(" bx bx-crop\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-credit-card"
  }), _vm._v(" bx bx-credit-card\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-columns"
  }), _vm._v(" bx bx-columns\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-cog"
  }), _vm._v(" bx bx-cog\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-cloud-snow"
  }), _vm._v(" bx bx-cloud-snow\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-cloud-rain"
  }), _vm._v(" bx bx-cloud-rain\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-cloud-lightning"
  }), _vm._v(" bx bx-cloud-lightning\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-cloud-light-rain"
  }), _vm._v(" bx bx-cloud-light-rain\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-cloud-drizzle"
  }), _vm._v(" bx bx-cloud-drizzle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-check"
  }), _vm._v(" bx bx-check\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-cart"
  }), _vm._v(" bx bx-cart\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-calculator"
  }), _vm._v(" bx bx-calculator\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-bold"
  }), _vm._v(" bx bx-bold\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-award"
  }), _vm._v(" bx bx-award\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-anchor"
  }), _vm._v(" bx bx-anchor\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-album"
  }), _vm._v(" bx bx-album\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-adjust"
  }), _vm._v(" bx bx-adjust\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-x"
  }), _vm._v(" bx bx-x\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-table"
  }), _vm._v(" bx bx-table\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-duplicate"
  }), _vm._v(" bx bx-duplicate\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-windows"
  }), _vm._v(" bx bx-windows\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-window"
  }), _vm._v(" bx bx-window\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-window-open"
  }), _vm._v(" bx bx-window-open\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-wifi"
  }), _vm._v(" bx bx-wifi\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-voicemail"
  }), _vm._v(" bx bx-voicemail\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-video-off"
  }), _vm._v(" bx bx-video-off\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-usb"
  }), _vm._v(" bx bx-usb\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-upload"
  }), _vm._v(" bx bx-upload\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-alarm"
  }), _vm._v(" bx bx-alarm\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-tennis-ball"
  }), _vm._v(" bx bx-tennis-ball\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-target-lock"
  }), _vm._v(" bx bx-target-lock\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-tag"
  }), _vm._v(" bx bx-tag\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-tab"
  }), _vm._v(" bx bx-tab\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-spreadsheet"
  }), _vm._v(" bx bx-spreadsheet\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-sitemap"
  }), _vm._v(" bx bx-sitemap\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-sidebar"
  }), _vm._v(" bx bx-sidebar\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-send"
  }), _vm._v(" bx bx-send\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-pie-chart"
  }), _vm._v(" bx bx-pie-chart\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-phone"
  }), _vm._v(" bx bx-phone\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-navigation"
  }), _vm._v(" bx bx-navigation\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-mobile"
  }), _vm._v(" bx bx-mobile\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-mobile-alt"
  }), _vm._v(" bx bx-mobile-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-message"
  }), _vm._v(" bx bx-message\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-message-rounded"
  }), _vm._v(" bx bx-message-rounded\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-map"
  }), _vm._v(" bx bx-map\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-map-alt"
  }), _vm._v(" bx bx-map-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-lock"
  }), _vm._v(" bx bx-lock\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-lock-open"
  }), _vm._v(" bx bx-lock-open\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-list-minus"
  }), _vm._v(" bx bx-list-minus\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-list-ul"
  }), _vm._v(" bx bx-list-ul\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-list-plus"
  }), _vm._v(" bx bx-list-plus\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-link"
  }), _vm._v(" bx bx-link\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-link-alt"
  }), _vm._v(" bx bx-link-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-layer"
  }), _vm._v(" bx bx-layer\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-laptop"
  }), _vm._v(" bx bx-laptop\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-home"
  }), _vm._v(" bx bx-home\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-heart"
  }), _vm._v(" bx bx-heart\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-headphone"
  }), _vm._v(" bx bx-headphone\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-devices"
  }), _vm._v(" bx bx-devices\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-globe"
  }), _vm._v(" bx bx-globe\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-gift"
  }), _vm._v(" bx bx-gift\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-envelope"
  }), _vm._v(" bx bx-envelope\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-download"
  }), _vm._v(" bx bx-download\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-dots-vertical"
  }), _vm._v(" bx bx-dots-vertical\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-dots-vertical-rounded"
  }), _vm._v(" bx bx-dots-vertical-rounded\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-dots-horizontal"
  }), _vm._v(" bx bx-dots-horizontal\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-dots-horizontal-rounded"
  }), _vm._v(" bx bx-dots-horizontal-rounded\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-dollar"
  }), _vm._v(" bx bx-dollar\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-directions"
  }), _vm._v(" bx bx-directions\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-desktop"
  }), _vm._v(" bx bx-desktop\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-data"
  }), _vm._v(" bx bx-data\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-compass"
  }), _vm._v(" bx bx-compass\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-crosshair"
  }), _vm._v(" bx bx-crosshair\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-terminal"
  }), _vm._v(" bx bx-terminal\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-cloud"
  }), _vm._v(" bx bx-cloud\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-cloud-upload"
  }), _vm._v(" bx bx-cloud-upload\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-cloud-download"
  }), _vm._v(" bx bx-cloud-download\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-chart"
  }), _vm._v(" bx bx-chart\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-calendar"
  }), _vm._v(" bx bx-calendar\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-calendar-x"
  }), _vm._v(" bx bx-calendar-x\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-calendar-minus"
  }), _vm._v(" bx bx-calendar-minus\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-calendar-check"
  }), _vm._v(" bx bx-calendar-check\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-calendar-plus"
  }), _vm._v(" bx bx-calendar-plus\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-buoy"
  }), _vm._v(" bx bx-buoy\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-bulb"
  }), _vm._v(" bx bx-bulb\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-bluetooth"
  }), _vm._v(" bx bx-bluetooth\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-bug"
  }), _vm._v(" bx bx-bug\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-building"
  }), _vm._v(" bx bx-building\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-broadcast"
  }), _vm._v(" bx bx-broadcast\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-briefcase"
  }), _vm._v(" bx bx-briefcase\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-bookmark-plus"
  }), _vm._v(" bx bx-bookmark-plus\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-bookmark-minus"
  }), _vm._v(" bx bx-bookmark-minus\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-"
  }), _vm._v(" bx bx-\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-book"
  }), _vm._v(" bx bx-book\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-book-bookmark"
  }), _vm._v(" bx bx-book-bookmark\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-block"
  }), _vm._v(" bx bx-block\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-basketball"
  }), _vm._v(" bx bx-basketball\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-bar-chart"
  }), _vm._v(" bx bx-bar-chart\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-bar-chart-square"
  }), _vm._v(" bx bx-bar-chart-square\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-bar-chart-alt"
  }), _vm._v(" bx bx-bar-chart-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-at"
  }), _vm._v(" bx bx-at\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-archive"
  }), _vm._v(" bx bx-archive\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-zoom-out"
  }), _vm._v(" bx bx-zoom-out\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-zoom-in"
  }), _vm._v(" bx bx-zoom-in\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-x-circle"
  }), _vm._v(" bx bx-x-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-volume"
  }), _vm._v(" bx bx-volume\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-volume-mute"
  }), _vm._v(" bx bx-volume-mute\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-volume-low"
  }), _vm._v(" bx bx-volume-low\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-volume-full"
  }), _vm._v(" bx bx-volume-full\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-video"
  }), _vm._v(" bx bx-video\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-vertical-center"
  }), _vm._v(" bx bx-vertical-center\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-up-arrow-circle"
  }), _vm._v(" bx bx-up-arrow-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-trending-up"
  }), _vm._v(" bx bx-trending-up\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-trending-down"
  }), _vm._v(" bx bx-trending-down\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-toggle-right"
  }), _vm._v(" bx bx-toggle-right\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-toggle-left"
  }), _vm._v(" bx bx-toggle-left\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-time"
  }), _vm._v(" bx bx-time\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-sync"
  }), _vm._v(" bx bx-sync\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-stopwatch"
  }), _vm._v(" bx bx-stopwatch\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-stop"
  }), _vm._v(" bx bx-stop\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-stop-circle"
  }), _vm._v(" bx bx-stop-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-skip-previous"
  }), _vm._v(" bx bx-skip-previous\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-skip-next"
  }), _vm._v(" bx bx-skip-next\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-show"
  }), _vm._v(" bx bx-show\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-search"
  }), _vm._v(" bx bx-search\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-rss"
  }), _vm._v(" bx bx-rss\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-right-top-arrow-circle"
  }), _vm._v(" bx bx-right-top-arrow-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-right-indent"
  }), _vm._v(" bx bx-right-indent\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-right-down-arrow-circle"
  }), _vm._v(" bx bx-right-down-arrow-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-right-arrow-circle"
  }), _vm._v(" bx bx-right-arrow-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-reset"
  }), _vm._v(" bx bx-reset\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-rewind"
  }), _vm._v(" bx bx-rewind\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-rectangle"
  }), _vm._v(" bx bx-rectangle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-radio-circle"
  }), _vm._v(" bx bx-radio-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-radio-circle-marked"
  }), _vm._v(" bx bx-radio-circle-marked\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-question-mark"
  }), _vm._v(" bx bx-question-mark\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-plus-circle"
  }), _vm._v(" bx bx-plus-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-play"
  }), _vm._v(" bx bx-play\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-play-circle"
  }), _vm._v(" bx bx-play-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-pause"
  }), _vm._v(" bx bx-pause\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-pause-circle"
  }), _vm._v(" bx bx-pause-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-moon"
  }), _vm._v(" bx bx-moon\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-minus-circle"
  }), _vm._v(" bx bx-minus-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-microphone"
  }), _vm._v(" bx bx-microphone\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-menu"
  }), _vm._v(" bx bx-menu\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-left-top-arrow-circle"
  }), _vm._v(" bx bx-left-top-arrow-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-left-indent"
  }), _vm._v(" bx bx-left-indent\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-left-down-arrow-circle"
  }), _vm._v(" bx bx-left-down-arrow-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-left-arrow-circle"
  }), _vm._v(" bx bx-left-arrow-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-last-page"
  }), _vm._v(" bx bx-last-page\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-key"
  }), _vm._v(" bx bx-key\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-align-justify"
  }), _vm._v(" bx bx-align-justify\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-info-circle"
  }), _vm._v(" bx bx-info-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-image"
  }), _vm._v(" bx bx-image\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-hide"
  }), _vm._v(" bx bx-hide\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-fullscreen"
  }), _vm._v(" bx bx-fullscreen\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-folder"
  }), _vm._v(" bx bx-folder\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-folder-plus"
  }), _vm._v(" bx bx-folder-plus\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-folder-minus"
  }), _vm._v(" bx bx-folder-minus\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-first-page"
  }), _vm._v(" bx bx-first-page\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-fast-forward"
  }), _vm._v(" bx bx-fast-forward\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-fast-forward-circle"
  }), _vm._v(" bx bx-fast-forward-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-exit-fullscreen"
  }), _vm._v(" bx bx-exit-fullscreen\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-error"
  }), _vm._v(" bx bx-error\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-error-circle"
  }), _vm._v(" bx bx-error-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-down-arrow-circle"
  }), _vm._v(" bx bx-down-arrow-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-copyright"
  }), _vm._v(" bx bx-copyright\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-copy"
  }), _vm._v(" bx bx-copy\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-coffee"
  }), _vm._v(" bx bx-coffee\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-code"
  }), _vm._v(" bx bx-code\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-code-curly"
  }), _vm._v(" bx bx-code-curly\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-clipboard"
  }), _vm._v(" bx bx-clipboard\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-chevrons-left"
  }), _vm._v(" bx bx-chevrons-left\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-chevrons-right"
  }), _vm._v(" bx bx-chevrons-right\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-chevrons-up"
  }), _vm._v(" bx bx-chevrons-up\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-chevrons-down"
  }), _vm._v(" bx bx-chevrons-down\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-chevron-right"
  }), _vm._v(" bx bx-chevron-right\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-chevron-left"
  }), _vm._v(" bx bx-chevron-left\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-chevron-up"
  }), _vm._v(" bx bx-chevron-up\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-chevron-down"
  }), _vm._v(" bx bx-chevron-down\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-checkbox-square"
  }), _vm._v(" bx bx-checkbox-square\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-checkbox"
  }), _vm._v(" bx bx-checkbox\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-checkbox-checked"
  }), _vm._v(" bx bx-checkbox-checked\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-captions"
  }), _vm._v(" bx bx-captions\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-camera"
  }), _vm._v(" bx bx-camera\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-camera-off"
  }), _vm._v(" bx bx-camera-off\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-bullseye"
  }), _vm._v(" bx bx-bullseye\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-bookmarks"
  }), _vm._v(" bx bx-bookmarks\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-bookmark"
  }), _vm._v(" bx bx-bookmark\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-bell"
  }), _vm._v(" bx bx-bell\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-bell-plus"
  }), _vm._v(" bx bx-bell-plus\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-bell-off"
  }), _vm._v(" bx bx-bell-off\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-bell-minus"
  }), _vm._v(" bx bx-bell-minus\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-arrow-back"
  }), _vm._v(" bx bx-arrow-back\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-align-right"
  }), _vm._v(" bx bx-align-right\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-align-middle"
  }), _vm._v(" bx bx-align-middle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bx-align-left"
  }), _vm._v(" bx bx-align-left\n                        ")])]), _vm._v(" "), _c("h5", {
    staticClass: "mt-5"
  }, [_vm._v("Solid Icons")]), _vm._v(" "), _c("div", {
    staticClass: "row icons-list-demo"
  }, [_c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-wink-tongue"
  }), _vm._v(" bx bxs-wink-tongue\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-upside-down"
  }), _vm._v(" bx bxs-upside-down\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-happy-alt"
  }), _vm._v(" bx bxs-happy-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-laugh"
  }), _vm._v(" bx bxs-laugh\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-meh-blank"
  }), _vm._v(" bx bxs-meh-blank\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-cool"
  }), _vm._v(" bx bxs-cool\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-tired"
  }), _vm._v(" bx bxs-tired\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-happy-beaming"
  }), _vm._v(" bx bxs-happy-beaming\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-shocked"
  }), _vm._v(" bx bxs-shocked\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-happy"
  }), _vm._v(" bx bxs-happy\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-sad"
  }), _vm._v(" bx bxs-sad\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-sleepy"
  }), _vm._v(" bx bxs-sleepy\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-confused"
  }), _vm._v(" bx bxs-confused\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-meh-alt"
  }), _vm._v(" bx bxs-meh-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-meh"
  }), _vm._v(" bx bxs-meh\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-smile"
  }), _vm._v(" bx bxs-smile\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-wink-smile"
  }), _vm._v(" bx bxs-wink-smile\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-dizzy"
  }), _vm._v(" bx bxs-dizzy\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-happy-heart-eyes"
  }), _vm._v(" bx bxs-happy-heart-eyes\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-angry"
  }), _vm._v(" bx bxs-angry\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-business"
  }), _vm._v(" bx bxs-business\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-camera-plus"
  }), _vm._v(" bx bxs-camera-plus\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-food-menu"
  }), _vm._v(" bx bxs-food-menu\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-offer"
  }), _vm._v(" bx bxs-offer\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-clinic"
  }), _vm._v(" bx bxs-clinic\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-hand-left"
  }), _vm._v(" bx bxs-hand-left\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-hand-down"
  }), _vm._v(" bx bxs-hand-down\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-hand-right"
  }), _vm._v(" bx bxs-hand-right\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-hand-up"
  }), _vm._v(" bx bxs-hand-up\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-baby-carriage"
  }), _vm._v(" bx bxs-baby-carriage\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-caret-left-circle"
  }), _vm._v(" bx bxs-caret-left-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-caret-right-circle"
  }), _vm._v(" bx bxs-caret-right-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-caret-down-circle"
  }), _vm._v(" bx bxs-caret-down-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-caret-up-circle"
  }), _vm._v(" bx bxs-caret-up-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-tone"
  }), _vm._v(" bx bxs-tone\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-bolt-circle"
  }), _vm._v(" bx bxs-bolt-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-city"
  }), _vm._v(" bx bxs-city\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-cake"
  }), _vm._v(" bx bxs-cake\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-spa"
  }), _vm._v(" bx bxs-spa\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-dish"
  }), _vm._v(" bx bxs-dish\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-fridge"
  }), _vm._v(" bx bxs-fridge\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-image-add"
  }), _vm._v(" bx bxs-image-add\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-alarm-add"
  }), _vm._v(" bx bxs-alarm-add\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-archive-out"
  }), _vm._v(" bx bxs-archive-out\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-archive-in"
  }), _vm._v(" bx bxs-archive-in\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-add-to-queue"
  }), _vm._v(" bx bxs-add-to-queue\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-check-shield"
  }), _vm._v(" bx bxs-check-shield\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-label"
  }), _vm._v(" bx bxs-label\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-face"
  }), _vm._v(" bx bxs-face\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-file-find"
  }), _vm._v(" bx bxs-file-find\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-extension"
  }), _vm._v(" bx bxs-extension\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-exit"
  }), _vm._v(" bx bxs-exit\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-brush-alt"
  }), _vm._v(" bx bxs-brush-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-layout"
  }), _vm._v(" bx bxs-layout\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-quote-alt-right"
  }), _vm._v(" bx bxs-quote-alt-right\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-quote-alt-left"
  }), _vm._v(" bx bxs-quote-alt-left\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-mobile-vibration"
  }), _vm._v(" bx bxs-mobile-vibration\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-fast-forward-circle"
  }), _vm._v(" bx bxs-fast-forward-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-rewind-circle"
  }), _vm._v(" bx bxs-rewind-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-carousel"
  }), _vm._v(" bx bxs-carousel\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-customize"
  }), _vm._v(" bx bxs-customize\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-calendar-event"
  }), _vm._v(" bx bxs-calendar-event\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-calendar-check"
  }), _vm._v(" bx bxs-calendar-check\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-calendar-x"
  }), _vm._v(" bx bxs-calendar-x\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-calendar-minus"
  }), _vm._v(" bx bxs-calendar-minus\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-calendar-plus"
  }), _vm._v(" bx bxs-calendar-plus\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-calendar-alt"
  }), _vm._v(" bx bxs-calendar-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-calendar"
  }), _vm._v(" bx bxs-calendar\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-briefcase-alt-2"
  }), _vm._v(" bx bxs-briefcase-alt-2\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-bookmark-minus"
  }), _vm._v(" bx bxs-bookmark-minus\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-bookmarks"
  }), _vm._v(" bx bxs-bookmarks\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-time-five"
  }), _vm._v(" bx bxs-time-five\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-pie-chart-alt-2"
  }), _vm._v(" bx bxs-pie-chart-alt-2\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-time"
  }), _vm._v(" bx bxs-time\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-timer"
  }), _vm._v(" bx bxs-timer\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-stopwatch"
  }), _vm._v(" bx bxs-stopwatch\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-compass"
  }), _vm._v(" bx bxs-compass\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-user-check"
  }), _vm._v(" bx bxs-user-check\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-user-x"
  }), _vm._v(" bx bxs-user-x\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-grid"
  }), _vm._v(" bx bxs-grid\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-zoom-out"
  }), _vm._v(" bx bxs-zoom-out\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-zoom-in"
  }), _vm._v(" bx bxs-zoom-in\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-search"
  }), _vm._v(" bx bxs-search\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-bell-minus"
  }), _vm._v(" bx bxs-bell-minus\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-bell-plus"
  }), _vm._v(" bx bxs-bell-plus\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-folder-minus"
  }), _vm._v(" bx bxs-folder-minus\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-mobile"
  }), _vm._v(" bx bxs-mobile\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-data"
  }), _vm._v(" bx bxs-data\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-skip-next-circle"
  }), _vm._v(" bx bxs-skip-next-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-skip-previous-circle"
  }), _vm._v(" bx bxs-skip-previous-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-chalkboard"
  }), _vm._v(" bx bxs-chalkboard\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-school"
  }), _vm._v(" bx bxs-school\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-institution"
  }), _vm._v(" bx bxs-institution\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-left-down-arrow-circle"
  }), _vm._v(" bx bxs-left-down-arrow-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-left-top-arrow-circle"
  }), _vm._v(" bx bxs-left-top-arrow-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-right-down-arrow-circle"
  }), _vm._v(" bx bxs-right-down-arrow-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-right-top-arrow-circle"
  }), _vm._v(" bx bxs-right-top-arrow-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-down-arrow"
  }), _vm._v(" bx bxs-down-arrow\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-up-arrow"
  }), _vm._v(" bx bxs-up-arrow\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-left-arrow"
  }), _vm._v(" bx bxs-left-arrow\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-right-arrow"
  }), _vm._v(" bx bxs-right-arrow\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-rectangle"
  }), _vm._v(" bx bxs-rectangle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-brightness"
  }), _vm._v(" bx bxs-brightness\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-brightness-half"
  }), _vm._v(" bx bxs-brightness-half\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-paint"
  }), _vm._v(" bx bxs-paint\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-credit-card"
  }), _vm._v(" bx bxs-credit-card\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-credit-card-alt"
  }), _vm._v(" bx bxs-credit-card-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-band-aid"
  }), _vm._v(" bx bxs-band-aid\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-map-pin"
  }), _vm._v(" bx bxs-map-pin\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-receipt"
  }), _vm._v(" bx bxs-receipt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-purchase-tag-alt"
  }), _vm._v(" bx bxs-purchase-tag-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-basket"
  }), _vm._v(" bx bxs-basket\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-palette"
  }), _vm._v(" bx bxs-palette\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-plane-alt"
  }), _vm._v(" bx bxs-plane-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-component"
  }), _vm._v(" bx bxs-component\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-traffic-barrier"
  }), _vm._v(" bx bxs-traffic-barrier\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-no-entry"
  }), _vm._v(" bx bxs-no-entry\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-message-alt-dots"
  }), _vm._v(" bx bxs-message-alt-dots\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-message-alt"
  }), _vm._v(" bx bxs-message-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-check-square"
  }), _vm._v(" bx bxs-check-square\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-notification-off"
  }), _vm._v(" bx bxs-notification-off\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-notification"
  }), _vm._v(" bx bxs-notification\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-log-out"
  }), _vm._v(" bx bxs-log-out\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-log-in"
  }), _vm._v(" bx bxs-log-in\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-log-out-circle"
  }), _vm._v(" bx bxs-log-out-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-log-in-circle"
  }), _vm._v(" bx bxs-log-in-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-circle"
  }), _vm._v(" bx bxs-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-doughnut-chart"
  }), _vm._v(" bx bxs-doughnut-chart\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-building-house"
  }), _vm._v(" bx bxs-building-house\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-comment-error"
  }), _vm._v(" bx bxs-comment-error\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-user-voice"
  }), _vm._v(" bx bxs-user-voice\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-cuboid"
  }), _vm._v(" bx bxs-cuboid\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-cube-alt"
  }), _vm._v(" bx bxs-cube-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-polygon"
  }), _vm._v(" bx bxs-polygon\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-square-rounded"
  }), _vm._v(" bx bxs-square-rounded\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-square"
  }), _vm._v(" bx bxs-square\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-error-alt"
  }), _vm._v(" bx bxs-error-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-shield-alt-2"
  }), _vm._v(" bx bxs-shield-alt-2\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-paint-roll"
  }), _vm._v(" bx bxs-paint-roll\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-comment-add"
  }), _vm._v(" bx bxs-comment-add\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-droplet-half"
  }), _vm._v(" bx bxs-droplet-half\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-search-alt-2"
  }), _vm._v(" bx bxs-search-alt-2\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-bowling-ball"
  }), _vm._v(" bx bxs-bowling-ball\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-hourglass-bottom"
  }), _vm._v(" bx bxs-hourglass-bottom\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-hourglass-top"
  }), _vm._v(" bx bxs-hourglass-top\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-lock-open-alt"
  }), _vm._v(" bx bxs-lock-open-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-lock-alt"
  }), _vm._v(" bx bxs-lock-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-graduation"
  }), _vm._v(" bx bxs-graduation\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-vial"
  }), _vm._v(" bx bxs-vial\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-cylinder"
  }), _vm._v(" bx bxs-cylinder\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-pyramid"
  }), _vm._v(" bx bxs-pyramid\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-wine"
  }), _vm._v(" bx bxs-wine\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-comment-detail"
  }), _vm._v(" bx bxs-comment-detail\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-comment-dots"
  }), _vm._v(" bx bxs-comment-dots\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-comment"
  }), _vm._v(" bx bxs-comment\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-traffic"
  }), _vm._v(" bx bxs-traffic\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-landscape"
  }), _vm._v(" bx bxs-landscape\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-adjust-alt"
  }), _vm._v(" bx bxs-adjust-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-id-card"
  }), _vm._v(" bx bxs-id-card\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-parking"
  }), _vm._v(" bx bxs-parking\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-plane-land"
  }), _vm._v(" bx bxs-plane-land\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-plane-take-off"
  }), _vm._v(" bx bxs-plane-take-off\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-analyse"
  }), _vm._v(" bx bxs-analyse\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-file-gif"
  }), _vm._v(" bx bxs-file-gif\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-file-jpg"
  }), _vm._v(" bx bxs-file-jpg\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-file-png"
  }), _vm._v(" bx bxs-file-png\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-file-txt"
  }), _vm._v(" bx bxs-file-txt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-file-md"
  }), _vm._v(" bx bxs-file-md\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-file-json"
  }), _vm._v(" bx bxs-file-json\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-file-js"
  }), _vm._v(" bx bxs-file-js\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-file-css"
  }), _vm._v(" bx bxs-file-css\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-file-html"
  }), _vm._v(" bx bxs-file-html\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-copy-alt"
  }), _vm._v(" bx bxs-copy-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-file-doc"
  }), _vm._v(" bx bxs-file-doc\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-user-pin"
  }), _vm._v(" bx bxs-user-pin\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-quote-single-right"
  }), _vm._v(" bx bxs-quote-single-right\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-quote-single-left"
  }), _vm._v(" bx bxs-quote-single-left\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-ghost"
  }), _vm._v(" bx bxs-ghost\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-direction-left"
  }), _vm._v(" bx bxs-direction-left\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-video-recording"
  }), _vm._v(" bx bxs-video-recording\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-notepad"
  }), _vm._v(" bx bxs-notepad\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-bug-alt"
  }), _vm._v(" bx bxs-bug-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-mouse-alt"
  }), _vm._v(" bx bxs-mouse-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-edit-alt"
  }), _vm._v(" bx bxs-edit-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-chat"
  }), _vm._v(" bx bxs-chat\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-book-content"
  }), _vm._v(" bx bxs-book-content\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-message-square-dots"
  }), _vm._v(" bx bxs-message-square-dots\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-message-square"
  }), _vm._v(" bx bxs-message-square\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-slideshow"
  }), _vm._v(" bx bxs-slideshow\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-bank"
  }), _vm._v(" bx bxs-bank\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-wallet-alt"
  }), _vm._v(" bx bxs-wallet-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-memory-card"
  }), _vm._v(" bx bxs-memory-card\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-devices"
  }), _vm._v(" bx bxs-devices\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-message-rounded-dots"
  }), _vm._v(" bx bxs-message-rounded-dots\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-message-dots"
  }), _vm._v(" bx bxs-message-dots\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-bar-chart-alt-2"
  }), _vm._v(" bx bxs-bar-chart-alt-2\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-store-alt"
  }), _vm._v(" bx bxs-store-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-buildings"
  }), _vm._v(" bx bxs-buildings\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-home-circle"
  }), _vm._v(" bx bxs-home-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-file-pdf"
  }), _vm._v(" bx bxs-file-pdf\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-yin-yang"
  }), _vm._v(" bx bxs-yin-yang\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-ship"
  }), _vm._v(" bx bxs-ship\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-factory"
  }), _vm._v(" bx bxs-factory\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-tree"
  }), _vm._v(" bx bxs-tree\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-plane"
  }), _vm._v(" bx bxs-plane\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-user-rectangle"
  }), _vm._v(" bx bxs-user-rectangle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-eyedropper"
  }), _vm._v(" bx bxs-eyedroppers\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-cloud-lightning"
  }), _vm._v(" bx bxs-cloud-lightning\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-cloud-rain"
  }), _vm._v(" bx bxs-cloud-rain\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-eraser"
  }), _vm._v(" bx bxs-eraser\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-magic-wand"
  }), _vm._v(" bx bxs-magic-wand\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-hotel"
  }), _vm._v(" bx bxs-hotel\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-color-fill"
  }), _vm._v(" bx bxs-color-fill\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-capsule"
  }), _vm._v(" bx bxs-capsule\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-flask"
  }), _vm._v(" bx bxs-flask\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-joystick-button"
  }), _vm._v(" bx bxs-joystick-button\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-direction-right"
  }), _vm._v(" bx bxs-direction-right\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-directions"
  }), _vm._v(" bx bxs-directions\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-megaphone"
  }), _vm._v(" bx bxs-megaphone\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-keyboard"
  }), _vm._v(" bx bxs-keyboard\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-brush"
  }), _vm._v(" bx bxs-brush\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-coffee-alt"
  }), _vm._v(" bx bxs-coffee-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-badge-check"
  }), _vm._v(" bx bxs-badge-check\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-landmark"
  }), _vm._v(" bx bxs-landmark\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-gas-pump"
  }), _vm._v(" bx bxs-gas-pump\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-user-badge"
  }), _vm._v(" bx bxs-user-badge\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-right-arrow-square"
  }), _vm._v(" bx bxs-right-arrow-square\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-down-arrow-square"
  }), _vm._v(" bx bxs-down-arrow-square\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-up-arrow-square"
  }), _vm._v(" bx bxs-up-arrow-square\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-left-arrow-square"
  }), _vm._v(" bx bxs-left-arrow-square\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-ambulance"
  }), _vm._v(" bx bxs-ambulance\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-magnet"
  }), _vm._v(" bx bxs-magnet\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-card"
  }), _vm._v(" bx bxs-card\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-help-circle"
  }), _vm._v(" bx bxs-help-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-note"
  }), _vm._v(" bx bxs-note\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-badge"
  }), _vm._v(" bx bxs-badge\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-flame"
  }), _vm._v(" bx bxs-flame\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-disc"
  }), _vm._v(" bx bxs-disc\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-minus-square"
  }), _vm._v(" bx bxs-minus-square\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-plus-square"
  }), _vm._v(" bx bxs-plus-square\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-x-square"
  }), _vm._v(" bx bxs-x-square\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs- microphone-alt"
  }), _vm._v(" bx bxs-microphone-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-image-alt"
  }), _vm._v(" bx bxs-image-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-skull"
  }), _vm._v(" bx bxs-skull\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-dollar-circle"
  }), _vm._v(" bx bxs-dollar-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-film"
  }), _vm._v(" bx bxs-film\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-ball"
  }), _vm._v(" bx bxs-ball\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-edit"
  }), _vm._v(" bx bxs-edit\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-file-blank"
  }), _vm._v(" bx bxs-file-blank\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-bell-ring"
  }), _vm._v(" bx bxs-bell-ring\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-photo-album"
  }), _vm._v(" bx bxs-photo-album\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-key"
  }), _vm._v(" bx bxs-key\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-video-plus"
  }), _vm._v(" bx bxs-video-plus\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-box"
  }), _vm._v(" bx bxs-box\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-planet"
  }), _vm._v(" bx bxs-planet\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-movie"
  }), _vm._v(" bx bxs-movie\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-taxi"
  }), _vm._v(" bx bxs-taxi\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-train"
  }), _vm._v(" bx bxs-train\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-bath"
  }), _vm._v(" bx bxs-bath\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-bed"
  }), _vm._v(" bx bxs-bed\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-area"
  }), _vm._v(" bx bxs-area\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-bot"
  }), _vm._v(" bx bxs-bot\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-bus"
  }), _vm._v(" bx bxs-bus\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-star-half"
  }), _vm._v(" bx bxs-star-half\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-checkbox-checked"
  }), _vm._v(" bx bxs-checkbox-checked\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-checkbox"
  }), _vm._v(" bx bxs-checkbox\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-check-circle"
  }), _vm._v(" bx bxs-check-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-rocket"
  }), _vm._v(" bx bxs-rocket\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-certification"
  }), _vm._v(" bx bxs-certification\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-file-plus"
  }), _vm._v(" bx bxs-file-plus\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-dashboard"
  }), _vm._v(" bx bxs-dashboard\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-conversation"
  }), _vm._v(" bx bxs-conversation\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-battery-low"
  }), _vm._v(" bx bxs-battery-low\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-folder-open"
  }), _vm._v(" bx bxs-folder-open\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-zap"
  }), _vm._v(" bx bxs-zap\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-x-circle"
  }), _vm._v(" bx bxs-x-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-wrench"
  }), _vm._v(" bx bxs-wrench\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-widget"
  }), _vm._v(" bx bxs-widget\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-watch"
  }), _vm._v(" bx bxs-watch\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-watch-alt"
  }), _vm._v(" bx bxs-watch-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-wallet"
  }), _vm._v(" bx bxs-wallet\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-volume"
  }), _vm._v(" bx bxs-volume\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-volume-mute"
  }), _vm._v(" bx bxs-volume-mute\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-volume-low"
  }), _vm._v(" bx bxs-volume-low\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-volume-full"
  }), _vm._v(" bx bxs-volume-full\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-videos"
  }), _vm._v(" bx bxs-videos\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-video"
  }), _vm._v(" bx bxs-video\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-video-off"
  }), _vm._v(" bx bxs-video-off\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-user"
  }), _vm._v(" bx bxs-user\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-user-plus"
  }), _vm._v(" bx bxs-user-plus\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-user-minus"
  }), _vm._v(" bx bxs-user-minus\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-user-detail"
  }), _vm._v(" bx bxs-user-detail\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-user-circle"
  }), _vm._v(" bx bxs-user-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-upvote"
  }), _vm._v(" bx bxs-upvote\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-up-arrow-circle"
  }), _vm._v(" bx bxs-up-arrow-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-truck"
  }), _vm._v(" bx bxs-truck\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-trophy"
  }), _vm._v(" bx bxs-trophy\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-trash"
  }), _vm._v(" bx bxs-trash\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-trash-alt"
  }), _vm._v(" bx bxs-trash-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-torch"
  }), _vm._v(" bx bxs-torch\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-toggle-right"
  }), _vm._v(" bx bxs-toggle-right\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-to-top"
  }), _vm._v(" bx bxs-to-top\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-terminal"
  }), _vm._v(" bx bxs-terminal\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-tennis-ball"
  }), _vm._v(" bx bxs-tennis-ball\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-tag"
  }), _vm._v(" bx bxs-tag\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-tag-x"
  }), _vm._v(" bx bxs-tag-x\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-t-shirt"
  }), _vm._v(" bx bxs-t-shirt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-sun"
  }), _vm._v(" bx bxs-sun\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-store"
  }), _vm._v(" bx bxs-store\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-star"
  }), _vm._v(" bx bxs-star\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-spreadsheet"
  }), _vm._v(" bx bxs-spreadsheet\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-show"
  }), _vm._v(" bx bxs-show\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-shopping-bag"
  }), _vm._v(" bx bxs-shopping-bag\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-shopping-bag-alt"
  }), _vm._v(" bx bxs-shopping-bag-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-shield"
  }), _vm._v(" bx bxs-shield\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-share"
  }), _vm._v(" bx bxs-share\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-share-alt"
  }), _vm._v(" bx bxs-share-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-server"
  }), _vm._v(" bx bxs-server\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-send"
  }), _vm._v(" bx bxs-send\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-select-multiple"
  }), _vm._v(" bx bxs-select-multiple\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-sort-alt"
  }), _vm._v(" bx bxs-sort-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-save"
  }), _vm._v(" bx bxs-save\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-ruler"
  }), _vm._v(" bx bxs-ruler\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-right-arrow-circle"
  }), _vm._v(" bx bxs-right-arrow-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-report"
  }), _vm._v(" bx bxs-report\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-rename"
  }), _vm._v(" bx bxs-rename\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-radio"
  }), _vm._v(" bx bxs-radio\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-quote-right"
  }), _vm._v(" bx bxs-quote-right\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-quote-left"
  }), _vm._v(" bx bxs-quote-left\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-purchase-tag"
  }), _vm._v(" bx bxs-purchase-tag\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-printer"
  }), _vm._v(" bx bxs-printer\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-plus-circle"
  }), _vm._v(" bx bxs-plus-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-plug"
  }), _vm._v(" bx bxs-plug\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-playlist"
  }), _vm._v(" bx bxs-playlist\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-pin"
  }), _vm._v(" bx bxs-pin\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-pie-chart"
  }), _vm._v(" bx bxs-pie-chart\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-pie-chart-alt"
  }), _vm._v(" bx bxs-pie-chart-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-phone"
  }), _vm._v(" bx bxs-phone\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-phone-outgoing"
  }), _vm._v(" bx bxs-phone-outgoing\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-phone-incoming"
  }), _vm._v(" bx bxs-phone-incoming\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-phone-call"
  }), _vm._v(" bx bxs-phone-call\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-pencil"
  }), _vm._v(" bx bxs-pencil\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-pen"
  }), _vm._v(" bx bxs-pen\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-paste"
  }), _vm._v(" bx bxs-paste\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-paper-plane"
  }), _vm._v(" bx bxs-paper-plane\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-package"
  }), _vm._v(" bx bxs-package\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-news"
  }), _vm._v(" bx bxs-news\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-navigation"
  }), _vm._v(" bx bxs-navigation\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-music"
  }), _vm._v(" bx bxs-music\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-mouse"
  }), _vm._v(" bx bxs-mouse\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-moon"
  }), _vm._v(" bx bxs-moon\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-minus-circle"
  }), _vm._v(" bx bxs-minus-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-microphone"
  }), _vm._v(" bx bxs-microphone\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-microphone-off"
  }), _vm._v(" bx bxs-microphone-off\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-message"
  }), _vm._v(" bx bxs-message\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-message-rounded"
  }), _vm._v(" bx bxs-message-rounded\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-map"
  }), _vm._v(" bx bxs-map\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-map-alt"
  }), _vm._v(" bx bxs-map-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-lock"
  }), _vm._v(" bx bxs-lock\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-lock-open"
  }), _vm._v(" bx bxs-lock-open\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-like"
  }), _vm._v(" bx bxs-like\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-left-arrow-circle"
  }), _vm._v(" bx bxs-left-arrow-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-layer"
  }), _vm._v(" bx bxs-layer\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-joystick"
  }), _vm._v(" bx bxs-joystick\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-joystick-alt"
  }), _vm._v(" bx bxs-joystick-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-info-circle"
  }), _vm._v(" bx bxs-info-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-inbox"
  }), _vm._v(" bx bxs-inbox\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-image"
  }), _vm._v(" bx bxs-image\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-hourglass"
  }), _vm._v(" bx bxs-hourglass\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-hot"
  }), _vm._v(" bx bxs-hot\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-home"
  }), _vm._v(" bx bxs-home\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-hide"
  }), _vm._v(" bx bxs-hide\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-heart"
  }), _vm._v(" bx bxs-heart\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-hdd"
  }), _vm._v(" bx bxs-hdd\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-group"
  }), _vm._v(" bx bxs-group\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-grid-alt"
  }), _vm._v(" bx bxs-grid-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-gift"
  }), _vm._v(" bx bxs-gift\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-flag"
  }), _vm._v(" bx bxs-flag\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-flag-alt"
  }), _vm._v(" bx bxs-flag-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-first-aid"
  }), _vm._v(" bx bxs-first-aid\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-filter-alt"
  }), _vm._v(" bx bxs-filter-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-file"
  }), _vm._v(" bx bxs-file\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-file"
  }), _vm._v(" bx bxs-file\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-file-image"
  }), _vm._v(" bx bxs-file-image\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-error"
  }), _vm._v(" bx bxs-error\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-error-circle"
  }), _vm._v(" bx bxs-error-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-envelope"
  }), _vm._v(" bx bxs-envelope\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-eject"
  }), _vm._v(" bx bxs-eject\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-duplicate"
  }), _vm._v(" bx bxs-duplicate\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-droplet"
  }), _vm._v(" bx bxs-droplet\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-drink"
  }), _vm._v(" bx bxs-drink\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-downvote"
  }), _vm._v(" bx bxs-downvote\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-download"
  }), _vm._v(" bx bxs-download\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-down-arrow-circle"
  }), _vm._v(" bx bxs-down-arrow-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-dock-top"
  }), _vm._v(" bx bxs-dock-top\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-dock-right"
  }), _vm._v(" bx bxs-dock-right\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-dock-left"
  }), _vm._v(" bx bxs-dock-left\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-dock-bottom"
  }), _vm._v(" bx bxs-dock-bottom\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-dislike"
  }), _vm._v(" bx bxs-dislike\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-discount"
  }), _vm._v(" bx bxs-discount\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-detail"
  }), _vm._v(" bx bxs-detail\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-cube"
  }), _vm._v(" bx bxs-cube\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-crown"
  }), _vm._v(" bx bxs-crown\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-coupon"
  }), _vm._v(" bx bxs-coupon\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-copy"
  }), _vm._v(" bx bxs-copy\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-contact"
  }), _vm._v(" bx bxs-contact\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-collection"
  }), _vm._v(" bx bxs-collection\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-cog"
  }), _vm._v(" bx bxs-cog\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-coffee"
  }), _vm._v(" bx bxs-coffee\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-cloud"
  }), _vm._v(" bx bxs-cloud\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-cloud-upload"
  }), _vm._v(" bx bxs-cloud-upload\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-cloud-download"
  }), _vm._v(" bx bxs-cloud-download\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-chip"
  }), _vm._v(" bx bxs-chip\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-chart"
  }), _vm._v(" bx bxs-chart\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-cart"
  }), _vm._v(" bx bxs-cart\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-cart-alt"
  }), _vm._v(" bx bxs-cart-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-car"
  }), _vm._v(" bx bxs-car\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-captions"
  }), _vm._v(" bx bxs-captions\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-calculator"
  }), _vm._v(" bx bxs-calculator\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-buoy"
  }), _vm._v(" bx bxs-buoy\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-bulb"
  }), _vm._v(" bx bxs-bulb\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-building"
  }), _vm._v(" bx bxs-building\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-bug"
  }), _vm._v(" bx bxs-bug\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-briefcase-alt"
  }), _vm._v(" bx bxs-briefcase-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-briefcase"
  }), _vm._v(" bx bxs-briefcase\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-bookmark-star"
  }), _vm._v(" bx bxs-bookmark-star\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-book-open"
  }), _vm._v(" bx bxs-book-open\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-bookmark-plus"
  }), _vm._v(" bx bxs-bookmark-plus\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-bookmark"
  }), _vm._v(" bx bxs-bookmark\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-book"
  }), _vm._v(" bx bxs-book\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-bolt"
  }), _vm._v(" bx bxs-bolt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-bell-off"
  }), _vm._v(" bx bxs-bell-off\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-bell"
  }), _vm._v(" bx bxs-bell\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-battery-full"
  }), _vm._v(" bx bxs-battery-full\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-battery-charging"
  }), _vm._v(" bx bxs-battery-charging\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-battery"
  }), _vm._v(" bx bxs-battery\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-barcode"
  }), _vm._v(" bx bxs-barcode\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-bar-chart-square"
  }), _vm._v(" bx bxs-bar-chart-square\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-award"
  }), _vm._v(" bx bxs-award\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-folder-plus"
  }), _vm._v(" bx bxs-folder-plus\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-folder"
  }), _vm._v(" bx bxs-folder\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-camera-off"
  }), _vm._v(" bx bxs-camera-off\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-camera"
  }), _vm._v(" bx bxs-camera\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-archive"
  }), _vm._v(" bx bxs-archive\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-album"
  }), _vm._v(" bx bxs-album\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-alarm-off"
  }), _vm._v(" bx bxs-alarm-off\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-alarm"
  }), _vm._v(" bx bxs-alarm\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxs-adjust"
  }), _vm._v(" bx bxs-adjust\n                        ")])]), _vm._v(" "), _c("h4", {
    staticClass: "mt-5"
  }, [_vm._v("Logos")]), _vm._v(" "), _c("div", {
    staticClass: "row icons-list-demo"
  }, [_c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-redbubble"
  }), _vm._v(" bx bxl-redbubble\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-patreon"
  }), _vm._v(" bx bxl-patreon\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-gitlab"
  }), _vm._v(" bx bxl-gitlab\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-etsy"
  }), _vm._v(" bx bxl-etsy\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-figma"
  }), _vm._v(" bx bxl-figma\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-audible"
  }), _vm._v(" bx bxl-audible\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-algolia"
  }), _vm._v(" bx bxl-algolia\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-adobe"
  }), _vm._v(" bx bxl-adobe\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-pinterest-alt"
  }), _vm._v(" bx bxl-pinterest-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-imdb"
  }), _vm._v(" bx bxl-imdb\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-jquery"
  }), _vm._v(" bx bxl-jquery\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-facebook-circle"
  }), _vm._v(" bx bxl-facebook-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-instagram-alt"
  }), _vm._v(" bx bxl-instagram-alt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-flickr-square"
  }), _vm._v(" bx bxl-flickr-square\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-whatsapp-square"
  }), _vm._v(" bx bxl-whatsapp-square\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-squarespace"
  }), _vm._v(" bx bxl-squarespace\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-medium-old"
  }), _vm._v(" bx bxl-medium-old\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-mailchimp"
  }), _vm._v(" bx bxl-mailchimp\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-wix"
  }), _vm._v(" bx bxl-wix\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-trello"
  }), _vm._v(" bx bxl-trello\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-spotify"
  }), _vm._v(" bx bxl-spotify\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-soundcloud"
  }), _vm._v(" bx bxl-soundcloud\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-snapchat"
  }), _vm._v(" bx bxl-snapchat\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-less"
  }), _vm._v(" bx bxl-less\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-flickr"
  }), _vm._v(" bx bxl-flickr\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-shopify"
  }), _vm._v(" bx bxl-shopify\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-jsfiddle"
  }), _vm._v(" bx bxl-jsfiddle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-css3"
  }), _vm._v(" bx bxl-css3\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-microsoft"
  }), _vm._v(" bx bxl-microsoft\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-yahoo"
  }), _vm._v(" bx bxl-yahoo\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-bootstrap"
  }), _vm._v(" bx bxl-bootstrap\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-redux"
  }), _vm._v(" bx bxl-redux\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-mastercard"
  }), _vm._v(" bx bxl-mastercard\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-visa"
  }), _vm._v(" bx bxl-visa\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-baidu"
  }), _vm._v(" bx bxl-baidu\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-chrome"
  }), _vm._v(" bx bxl-chrome\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-dailymotion"
  }), _vm._v(" bx bxl-dailymotion\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-joomla"
  }), _vm._v(" bx bxl-joomla\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-internet-explorer"
  }), _vm._v(" bx bxl-internet-explorer\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-paypal"
  }), _vm._v(" bx bxl-paypal\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-edge"
  }), _vm._v(" bx bxl-edge\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-stripe"
  }), _vm._v(" bx bxl-stripe\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-telegram"
  }), _vm._v(" bx bxl-telegram\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-wordpress"
  }), _vm._v(" bx bxl-wordpress\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-periscope"
  }), _vm._v(" bx bxl-periscope\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-react"
  }), _vm._v(" bx bxl-react\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-bing"
  }), _vm._v(" bx bxl-bing\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-vuejs"
  }), _vm._v(" bx bxl-vuejs\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-kickstarter"
  }), _vm._v(" bx bxl-kickstarter\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-nodejs"
  }), _vm._v(" bx bxl-nodejs\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-javascript"
  }), _vm._v(" bx bxl-javascript\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-firefox"
  }), _vm._v(" bx bxl-firefox\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-stack-overflow"
  }), _vm._v(" bx bxl-stack-overflow\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-magento"
  }), _vm._v(" bx bxl-magento\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-product-hunt"
  }), _vm._v(" bx bxl-product-hunt\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-html5"
  }), _vm._v(" bx bxl-html5\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-git"
  }), _vm._v(" bx bxl-git\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-quora"
  }), _vm._v(" bx bxl-quora\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-yelp"
  }), _vm._v(" bx bxl-yelp\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-airbnb"
  }), _vm._v(" bx bxl-airbnb\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-opera"
  }), _vm._v(" bx bxl-opera\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-invision"
  }), _vm._v(" bx bxl-invision\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-foursquare"
  }), _vm._v(" bx bxl-foursquare\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-sass"
  }), _vm._v(" bx bxl-sass\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-wikipedia"
  }), _vm._v(" bx bxl-wikipedia\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-unsplash"
  }), _vm._v(" bx bxl-unsplash\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-digg"
  }), _vm._v(" bx bxl-digg\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-amazon"
  }), _vm._v(" bx bxl-amazon\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-ebay"
  }), _vm._v(" bx bxl-ebay\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-drupal"
  }), _vm._v(" bx bxl-drupal\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-dropbox"
  }), _vm._v(" bx bxl-dropbox\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-discourse"
  }), _vm._v(" bx bxl-discourse\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-deviantart"
  }), _vm._v(" bx bxl-deviantart\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-digitalocean"
  }), _vm._v(" bx bxl-digitalocean\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-creative-commons"
  }), _vm._v(" bx bxl-creative-commons\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-codepen"
  }), _vm._v(" bx bxl-codepen\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-angular"
  }), _vm._v(" bx bxl-angular\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-messenger"
  }), _vm._v(" bx bxl-messenger\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-pocket"
  }), _vm._v(" bx bxl-pocket\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-vk"
  }), _vm._v(" bx bxl-vk\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-windows"
  }), _vm._v(" bx bxl-windows\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-play-store"
  }), _vm._v(" bx bxl-play-store\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-android"
  }), _vm._v(" bx bxl-android\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-apple"
  }), _vm._v(" bx bxl-apple\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-blogger"
  }), _vm._v(" bx bxl-blogger\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-pinterest"
  }), _vm._v(" bx bxl-pinterest\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-reddit"
  }), _vm._v(" bx bxl-reddit\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-discord"
  }), _vm._v(" bx bxl-discord\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-twitch"
  }), _vm._v(" bx bxl-twitch\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-slack"
  }), _vm._v(" bx bxl-slack\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-slack-old"
  }), _vm._v(" bx bxl-slack-old\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-skype"
  }), _vm._v(" bx bxl-skype\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-medium-square"
  }), _vm._v(" bx bxl-medium-square\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-medium"
  }), _vm._v(" bx bxl-medium\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-linkedin-square"
  }), _vm._v(" bx bxl-linkedin-square\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-google-plus-circle"
  }), _vm._v(" bx bxl-google-plus-circle\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-google-plus"
  }), _vm._v(" bx bxl-google-plus\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-facebook-square"
  }), _vm._v(" bx bxl-facebook-square\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-bitcoin"
  }), _vm._v(" bx bxl-bitcoin\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-linkedin"
  }), _vm._v(" bx bxl-linkedin\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-vimeo"
  }), _vm._v(" bx bxl-vimeo\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-dribbble"
  }), _vm._v(" bx bxl-dribbble\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-behance"
  }), _vm._v(" bx bxl-behance\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-tumblr"
  }), _vm._v(" bx bxl-tumblr\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-whatsapp"
  }), _vm._v(" bx bxl-whatsapp\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-youtube"
  }), _vm._v(" bx bxl-youtube\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-twitter"
  }), _vm._v(" bx bxl-twitter\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-instagram"
  }), _vm._v(" bx bxl-instagram\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-google"
  }), _vm._v(" bx bxl-google\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-github"
  }), _vm._v(" bx bxl-github\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "col-xl-3 col-lg-4 col-sm-6"
  }, [_c("i", {
    staticClass: "bx bxl-facebook"
  }), _vm._v(" bx bxl-facebook\n                        ")])])])])])])], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/components/horizontal-menu.js":
/*!****************************************************!*\
  !*** ./resources/js/components/horizontal-menu.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "menuItems": () => (/* binding */ menuItems)
/* harmony export */ });
var menuItems = [{
  id: 1,
  label: 'menuitems.dashboard.text',
  icon: 'ri-dashboard-line',
  subItems: [{
    id: 2,
    label: 'menuitems.dashboard.list.sales',
    link: '/'
  }, {
    id: 3,
    label: 'menuitems.dashboard.list.crm',
    link: '/dashboard/crm'
  }, {
    id: 4,
    label: 'menuitems.dashboard.list.analytics',
    link: '/dashboard/analytics'
  }]
}, {
  id: 5,
  label: 'menuitems.apps.text',
  icon: 'ri-apps-2-line',
  subItems: [{
    id: 7,
    label: 'menuitems.calendar.text',
    icon: 'ri-calendar-2-line',
    link: '/apps/calendar'
  }, {
    id: 8,
    label: "menuitems.chat.text",
    icon: "ri-message-2-line",
    link: '/apps/chat'
  }, {
    id: 9,
    label: "menuitems.ecommerce.text",
    icon: "ri-shopping-cart-2-line",
    subItems: [{
      id: 10,
      label: "menuitems.ecommerce.list.products",
      link: "/ecommerce/products"
    }, {
      id: 11,
      label: "menuitems.ecommerce.list.productsgrid",
      link: "/ecommerce/products-grid"
    }, {
      id: 12,
      label: 'menuitems.ecommerce.list.productdetail',
      link: '/ecommerce/product-detail/1'
    }, {
      id: 13,
      label: 'menuitems.ecommerce.list.createproduct',
      link: '/ecommerce/product-create'
    }, {
      id: 14,
      label: "menuitems.ecommerce.list.customers",
      link: "/ecommerce/customers"
    }, {
      id: 15,
      label: "menuitems.ecommerce.list.orders",
      link: "/ecommerce/orders"
    }, {
      id: 16,
      label: "menuitems.ecommerce.list.orderdetail",
      link: "/ecommerce/order-detail"
    }, {
      id: 17,
      label: "menuitems.ecommerce.list.sellers",
      link: "/ecommerce/sellers"
    }, {
      id: 18,
      label: "menuitems.ecommerce.list.cart",
      link: "/ecommerce/cart"
    }, {
      id: 19,
      label: "menuitems.ecommerce.list.checkout",
      link: "/ecommerce/checkout"
    }]
  }, {
    id: 20,
    label: 'menuitems.email.text',
    icon: 'ri-mail-line',
    subItems: [{
      id: 21,
      label: 'menuitems.email.list.inbox',
      link: '/email/inbox'
    }, {
      id: 22,
      label: 'menuitems.email.list.reademail',
      link: '/email/reademail/1'
    }, {
      id: 23,
      label: 'menuitems.email.list.template',
      link: '/email/templates'
    }]
  }, {
    id: 24,
    label: 'menuitems.companies.text',
    icon: 'ri-building-4-line',
    link: '/apps/companies'
  }, {
    id: 25,
    label: 'menuitems.tasks.text',
    icon: 'ri-task-line',
    subItems: [{
      id: 26,
      label: 'menuitems.tasks.list.list',
      link: '/task/list'
    }, {
      id: 27,
      label: 'menuitems.tasks.list.detail',
      link: '/task/detail'
    }, {
      id: 28,
      label: 'menuitems.tasks.list.kanban',
      link: '/task/kanban'
    }]
  }, {
    id: 29,
    label: 'menuitems.contacts.text',
    icon: 'ri-profile-line',
    subItems: [{
      id: 30,
      label: 'menuitems.contacts.list.members',
      link: '/contacts/list'
    }, {
      id: 31,
      label: 'menuitems.contacts.list.profile',
      link: '/contacts/profile'
    }]
  }, {
    id: 32,
    label: 'menuitems.filemanager.text',
    icon: 'ri-folders-line',
    link: '/apps/file-manager'
  }, {
    id: 33,
    label: 'menuitems.ticket.text',
    icon: 'ri-customer-service-2-line',
    link: '/apps/tickets'
  }]
}, {
  id: 34,
  label: 'menuitems.ui.text',
  icon: 'ri-pencil-ruler-2-line',
  subItems: [{
    id: 35,
    label: 'menuitems.ui.list.avatars',
    link: '/ui/avatars'
  }, {
    id: 36,
    label: 'menuitems.ui.list.buttons',
    link: '/ui/buttons'
  }, {
    id: 37,
    label: 'menuitems.ui.list.cards',
    link: '/ui/cards'
  }, {
    id: 38,
    label: 'menuitems.ui.list.carousel',
    link: '/ui/carousel'
  }, {
    id: 39,
    label: 'menuitems.ui.list.dropdowns',
    link: '/ui/dropdowns'
  }, {
    id: 40,
    label: 'menuitems.ui.list.video',
    link: '/ui/video'
  }, {
    id: 41,
    label: 'menuitems.ui.list.general',
    link: '/ui/general'
  }, {
    id: 42,
    label: 'menuitems.ui.list.grid',
    link: '/ui/grid'
  }, {
    id: 43,
    label: 'menuitems.ui.list.images',
    link: '/ui/images'
  }, {
    id: 44,
    label: 'menuitems.ui.list.listgroup',
    link: '/ui/list-group'
  }, {
    id: 45,
    label: 'menuitems.ui.list.modals',
    link: '/ui/modals'
  }, {
    id: 46,
    label: 'menuitems.ui.list.notifications',
    link: '/ui/notifications'
  }, {
    id: 47,
    label: 'menuitems.ui.list.portlet',
    link: '/ui/portlets'
  }, {
    id: 48,
    label: 'menuitems.ui.list.progress',
    link: '/ui/progress'
  }, {
    id: 49,
    label: 'menuitems.ui.list.ribbons',
    link: '/ui/ribbons'
  }, {
    id: 50,
    label: 'menuitems.ui.list.spinners',
    link: '/ui/spinners'
  }, {
    id: 51,
    label: 'menuitems.ui.list.tabs',
    link: '/ui/tabs-accordions'
  }, {
    id: 52,
    label: 'menuitems.ui.list.tooltip',
    link: '/ui/tooltips-popovers'
  }, {
    id: 53,
    label: 'menuitems.ui.list.typography',
    link: '/ui/typography'
  }]
}, {
  id: 54,
  label: 'menuitems.components.text',
  icon: 'ri-stack-line',
  subItems: [{
    id: 55,
    label: 'menuitems.extendedui.text',
    icon: 'ri-stack-line',
    subItems: [{
      id: 56,
      label: 'menuitems.extendedui.list.rangeslider',
      link: '/extended/rangeslider'
    }, {
      id: 57,
      label: 'menuitems.extendedui.list.sweetalert',
      link: '/extended/sweet-alert'
    }, {
      id: 58,
      label: 'menuitems.extendedui.list.tour',
      link: '/extended/tour'
    }, {
      id: 59,
      label: 'menuitems.extendedui.list.scrollspy',
      link: '/extended/scrollspy'
    }]
  }, {
    id: 60,
    label: 'menuitems.widgets.text',
    icon: 'ri-honour-line',
    link: '/widgets'
  }, {
    id: 61,
    label: 'menuitems.forms.text',
    icon: 'ri-eraser-line',
    subItems: [{
      id: 62,
      label: 'menuitems.forms.list.elements',
      link: '/forms/elements'
    }, {
      id: 63,
      label: 'menuitems.forms.list.advanced',
      link: '/forms/advanced'
    }, {
      id: 64,
      label: 'menuitems.forms.list.validation',
      link: '/forms/validation'
    }, {
      id: 65,
      label: 'menuitems.forms.list.wizard',
      link: '/forms/wizard'
    }, {
      id: 66,
      label: 'menuitems.forms.list.mask',
      link: '/forms/mask'
    }, {
      id: 67,
      label: 'menuitems.forms.list.editor',
      link: '/forms/quill'
    }, {
      id: 68,
      label: 'menuitems.forms.list.fileupload',
      link: '/forms/file-uploads'
    }]
  }, {
    id: 69,
    label: 'menuitems.charts.text',
    icon: 'ri-bar-chart-line',
    subItems: [{
      id: 70,
      label: 'menuitems.charts.list.apex',
      link: '/charts/apex'
    }, {
      id: 71,
      label: 'menuitems.charts.list.chartjs',
      link: '/charts/chartjs'
    }, {
      id: 72,
      label: 'menuitems.charts.list.c3',
      link: '/charts/c3'
    }, {
      id: 73,
      label: 'menuitems.charts.list.chartist',
      link: '/charts/chartist'
    }, {
      id: 74,
      label: 'menuitems.charts.list.knob',
      link: '/charts/knob'
    }]
  }, {
    id: 75,
    label: 'menuitems.tables.text',
    icon: 'ri-table-line',
    subItems: [{
      id: 76,
      label: 'menuitems.tables.list.basic',
      link: '/tables/basic'
    }, {
      id: 77,
      label: 'menuitems.tables.list.advanced',
      link: '/tables/advanced'
    }]
  }, {
    id: 78,
    label: 'menuitems.icons.text',
    icon: 'ri-markup-line',
    subItems: [{
      id: 79,
      label: 'menuitems.icons.list.feather',
      link: '/icons/feather'
    }, {
      id: 80,
      label: 'menuitems.icons.list.remix',
      link: '/icons/remix'
    }, {
      id: 81,
      label: 'menuitems.icons.list.boxicons',
      link: '/icons/boxicons'
    }, {
      id: 82,
      label: 'menuitems.icons.list.materialdesign',
      link: '/icons/mdi'
    }, {
      id: 83,
      label: 'menuitems.icons.list.fontawesome',
      link: '/icons/font-awesome'
    }, {
      id: 84,
      label: 'menuitems.icons.list.weather',
      link: '/icons/weather'
    }]
  }, {
    id: 85,
    label: 'menuitems.maps.text',
    icon: 'ri-map-pin-line',
    subItems: [{
      id: 86,
      label: 'menuitems.maps.list.googlemap',
      link: '/maps/google'
    }]
  }]
}, {
  id: 87,
  label: 'menuitems.pages.text',
  icon: 'ri-pages-line',
  subItems: [{
    id: 88,
    label: 'menuitems.authstyle.text',
    subItems: [{
      id: 89,
      label: 'menuitems.auth.list.login',
      link: '/auth/login-1'
    }, {
      id: 90,
      label: 'menuitems.auth.list.register',
      link: '/auth/register-1'
    }, {
      id: 91,
      label: 'menuitems.auth.list.signin-signup',
      link: '/auth/signin-signup'
    }, {
      id: 92,
      label: 'menuitems.auth.list.recoverpwd',
      link: '/auth/recoverpwd'
    }, {
      id: 93,
      label: 'menuitems.auth.list.lock-screen',
      link: '/auth/lock-screen'
    }, {
      id: 94,
      label: 'menuitems.auth.list.logout',
      link: '/auth/logout-1'
    }, {
      id: 95,
      label: 'menuitems.auth.list.confirm-mail',
      link: '/auth/confirm-mail'
    }]
  }, {
    id: 96,
    label: 'menuitems.authstyle2.text',
    subItems: [{
      id: 97,
      label: 'menuitems.auth.list.login-2',
      link: '/auth/login-2'
    }, {
      id: 98,
      label: 'menuitems.auth.list.register-2',
      link: '/auth/register-2'
    }, {
      id: 99,
      label: 'menuitems.auth.list.signin-signup-2',
      link: '/auth/signin-signup-2'
    }, {
      id: 100,
      label: 'menuitems.auth.list.recoverpwd-2',
      link: '/auth/recoverpwd-2'
    }, {
      id: 101,
      label: 'menuitems.auth.list.lock-screen-2',
      link: '/auth/lock-screen-2'
    }, {
      id: 102,
      label: 'menuitems.auth.list.logout-2',
      link: '/auth/logout-2'
    }, {
      id: 103,
      label: 'menuitems.auth.list.confirm-mail',
      link: '/auth/confirm-mail-2'
    }]
  }, {
    id: 104,
    label: 'menuitems.errors.text',
    subItems: [{
      id: 105,
      label: 'menuitems.extrapages.list.error404',
      link: '/error/404'
    }, {
      id: 106,
      label: 'menuitems.extrapages.list.error404-alt',
      link: '/error/404-alt'
    }, {
      id: 107,
      label: 'menuitems.extrapages.list.error500',
      link: '/error/500'
    }]
  }, {
    id: 108,
    label: 'menuitems.utility.text',
    subItems: [{
      id: 109,
      label: 'menuitems.extrapages.list.starter',
      link: '/extras/starter'
    }, {
      id: 110,
      label: 'menuitems.extrapages.list.timeline',
      link: '/extras/timeline'
    }, {
      id: 111,
      label: 'menuitems.extrapages.list.sitemap',
      link: '/extras/sitemap'
    }, {
      id: 112,
      label: 'menuitems.extrapages.list.invoice',
      link: '/extras/invoice'
    }, {
      id: 113,
      label: 'menuitems.extrapages.list.faqs',
      link: '/extras/faqs'
    }, {
      id: 114,
      label: 'menuitems.extrapages.list.search-results',
      link: '/extras/search-results'
    }, {
      id: 115,
      label: 'menuitems.extrapages.list.pricing',
      link: '/extras/pricing'
    }, {
      id: 116,
      label: 'menuitems.extrapages.list.maintenance',
      link: '/extras/maintenance'
    }, {
      id: 117,
      label: 'menuitems.extrapages.list.comingsoon',
      link: '/extras/coming-soon'
    }, {
      id: 118,
      label: 'menuitems.extrapages.list.lightbox',
      link: '/extras/lightbox'
    }]
  }]
}];

/***/ }),

/***/ "./resources/js/components/menu.js":
/*!*****************************************!*\
  !*** ./resources/js/components/menu.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "menuItems": () => (/* binding */ menuItems)
/* harmony export */ });
var menuItems = [{
  id: 1,
  label: "menuitems.navigation.text",
  isTitle: true
}, {
  id: 2,
  label: 'menuitems.partner.text',
  icon: 'far fa-user-circle',
  link: '/partner'
}, {
  id: 3,
  label: 'menuitems.company.text',
  icon: 'ri-building-4-line',
  link: '/company'
}, {
  id: 4,
  label: 'menuitems.module.text',
  icon: 'fab fa-medium-m',
  link: '/module'
},
// {
//     id: 3220,
//     label: 'general.folder',
//     icon: 'ri-stack-line',
//     link: '/folder'
// },
// {
//     id: 3330,
//     label: 'general.menu',
//     icon: 'ri-stack-line',
//     link: '/menus'
// },
// {
//     id: 3220,
//     label: 'general.subMenu',
//     icon: 'ri-stack-line',
//     link: '/sub-menu'
// },
{
  id: 112206,
  label: 'general.screens',
  icon: 'fe-monitor',
  link: '/screens'
}, {
  id: 7,
  label: 'menuitems.DocumentType.text',
  icon: 'ri-stack-line',
  link: '/document-types'
}, {
  id: 4874387,
  label: 'menuitems.Workflow.text',
  icon: 'ri-hotel-line',
  link: '/company-module'
}
// {
//     id: 6,
//     label: 'menuitems.HotFields.text',
//     icon: 'ri-table-line',
//     link: '/hot-fields'
// },

// {
//     id: 3220,
//     label: 'general.menuTree',
//     icon: 'ri-stack-line',
//     link: '/menu-tree'
// },
// {
//     id: 112205,
//     label: 'menuitems.buttons.text',
//     icon: 'ri-markup-line',
//     link: '/buttons'
// },
// {
//     id: 8,
//     label: 'menuitems.Workflow.text',
//     icon: 'ri-share-line',
//     link: '/workflows'
// },
// {
//     id: 1115,
//     label: "menuitems.dashboard.text",
//     icon: "ri-dashboard-line",
//     badge: {
//         variant: "success",
//         text: "menuitems.dashboard.badge"
//     },
//     isMenuCollapsed: false,
//     subItems: [
//         {
//             id: 1114,
//             label: 'menuitems.dashboard.list.sales',
//             link: '/'
//         },
//         {
//             id: 1113,
//             label: 'menuitems.dashboard.list.crm',
//             link: '/dashboard/crm'
//         },
//         {
//             id: 1115,
//             label: 'menuitems.dashboard.list.analytics',
//             link: '/dashboard/analytics'
//         },
//     ]
// },
// {
//     id: 1114,
//     label: "menuitems.apps.text",
//     isTitle: true
// },
// {
//     id: 11113,
//     label: "menuitems.chat.text",
//     icon: "ri-message-2-line",
//     link: '/apps/chat'
// },
// {
//     id: 1112,
//     label: "menuitems.ecommerce.text",
//     icon: "ri-shopping-cart-2-line",
//     badge: {
//         variant: "danger",
//         text: "menuitems.ecommerce.badge"
//     },
//     isMenuCollapsed: false,
//     subItems: [
//         {
//             id: 1111,
//             label: "menuitems.ecommerce.list.products",
//             link: "/ecommerce/products"
//         },
//         {
//             id: 1110,
//             label: "menuitems.ecommerce.list.productsgrid",
//             link: "/ecommerce/products-grid"
//         },
//         {
//             id: 1109,
//             label: 'menuitems.ecommerce.list.productdetail',
//             link: '/ecommerce/product-detail/1'
//         },
//         {
//             id: 1108,
//             label: 'menuitems.ecommerce.list.createproduct',
//             link: '/ecommerce/product-create'
//         },
//         {
//             id: 1107,
//             label: "menuitems.ecommerce.list.customers",
//             link: "/ecommerce/customers"
//         },
//         {
//             id: 1106,
//             label: "menuitems.ecommerce.list.orders",
//             link: "/ecommerce/orders"
//         },
//         {
//             id: 1105,
//             label: "menuitems.ecommerce.list.orderdetail",
//             link: "/ecommerce/order-detail"
//         },
//         {
//             id: 1104,
//             label: "menuitems.ecommerce.list.sellers",
//             link: "/ecommerce/sellers"
//         },
//         {
//             id: 1103,
//             label: "menuitems.ecommerce.list.cart",
//             link: "/ecommerce/cart"
//         },
//         {
//             id: 1102,
//             label: "menuitems.ecommerce.list.checkout",
//             link: "/ecommerce/checkout"
//         }
//     ]
// },
// {
//     id: 1101,
//     label: 'menuitems.calendar.text',
//     icon: 'ri-calendar-2-line',
//     link: '/apps/calendar'
// },
// {
//     id: 1100,
//     label: 'menuitems.email.text',
//     icon: 'ri-mail-line',
//     isMenuCollapsed: false,
//     subItems: [
//         {
//             id: 1099,
//             label: 'menuitems.email.list.inbox',
//             link: '/email/inbox'
//         },
//         {
//             id: 1098,
//             label: 'menuitems.email.list.reademail',
//             link: '/email/reademail/1'
//         },
//         {
//             id: 1097,
//             label: 'menuitems.email.list.template',
//             link: '/email/templates'
//         }
//     ]
// },
// {
//     id: 1096,
//     label: 'menuitems.companies.text',
//     icon: 'ri-building-4-line',
//     link: '/apps/companies'
// },
// {
//     id: 1095,
//     label: 'menuitems.tasks.text',
//     icon: 'ri-task-line',
//     isMenuCollapsed: false,
//     subItems: [
//         {
//             id: 1093,
//             label: 'menuitems.tasks.list.list',
//             link: '/task/list'
//         },
//         {
//             id: 1092,
//             label: 'menuitems.tasks.list.detail',
//             link: '/task/detail'
//         },
//         {
//             id: 1091,
//             label: 'menuitems.tasks.list.kanban',
//             link: '/task/kanban'
//         }
//     ]
// },
// {
//     id: 1090,
//     label: 'menuitems.ticket.text',
//     icon: 'ri-customer-service-2-line',
//     link: '/apps/tickets'
// },
// {
//     id: 1089,
//     label: 'menuitems.contacts.text',
//     icon: 'ri-profile-line',
//     isMenuCollapsed: false,
//     subItems: [
//         {
//             id: 1088,
//             label: 'menuitems.contacts.list.members',
//             link: '/contacts/list'
//         },
//         {
//             id: 1087,
//             label: 'menuitems.contacts.list.profile',
//             link: '/contacts/profile'
//         }
//     ]
// },
// {
//     id: 1086,
//     label: 'menuitems.filemanager.text',
//     icon: 'ri-folders-line',
//     link: '/apps/file-manager'
// },
// {
//     id: 1085,
//     label: "menuitems.custom.text",
//     isTitle: true
// },
// {
//     id: 1084,
//     label: 'menuitems.auth.text',
//     icon: 'ri-shield-user-line',
//     isMenuCollapsed: false,
//     subItems: [
//         {
//             id: 1083,
//             label: 'menuitems.auth.list.login',
//             link: '/auth/login-1'
//         },
//         {
//             id: 1082,
//             label: 'menuitems.auth.list.login-2',
//             link: '/auth/login-2'
//         },
//         {
//             id: 1081,
//             label: 'menuitems.auth.list.register',
//             link: '/auth/register-1'
//         },
//         {
//             id: 1080,
//             label: 'menuitems.auth.list.register-2',
//             link: '/auth/register-2'
//         },
//         {
//             id: 1079,
//             label: 'menuitems.auth.list.signin-signup',
//             link: '/auth/signin-signup'
//         },
//         {
//             id: 1078,
//             label: 'menuitems.auth.list.signin-signup-2',
//             link: '/auth/signin-signup-2'
//         },
//         {
//             id: 1077,
//             label: 'menuitems.auth.list.recoverpwd',
//             link: '/auth/recoverpwd'
//         },
//         {
//             id: 1076,
//             label: 'menuitems.auth.list.recoverpwd-2',
//             link: '/auth/recoverpwd-2'
//         },
//         {
//             id: 1075,
//             label: 'menuitems.auth.list.lock-screen',
//             link: '/auth/lock-screen'
//         },
//         {
//             id: 1074,
//             label: 'menuitems.auth.list.lock-screen-2',
//             link: '/auth/lock-screen-2'
//         },
//         {
//             id: 1073,
//             label: 'menuitems.auth.list.logout',
//             link: '/auth/logout-1'
//         },
//         {
//             id: 1072,
//             label: 'menuitems.auth.list.logout-2',
//             link: '/auth/logout-2'
//         },
//         {
//             id: 1072,
//             label: 'menuitems.auth.list.confirm-mail',
//             link: '/auth/confirm-mail'
//         },
//         {
//             id: 1072,
//             label: 'menuitems.auth.list.confirm-mail-2',
//             link: '/auth/confirm-mail-2'
//         },
//     ]
// },
// {
//     id: 1071,
//     label: 'menuitems.extrapages.text',
//     icon: 'ri-pages-line',
//     isMenuCollapsed: false,
//     subItems: [
//         {
//             id: 1070,
//             label: 'menuitems.extrapages.list.starter',
//             link: '/extras/starter'
//         },
//         {
//             id: 1069,
//             label: 'menuitems.extrapages.list.timeline',
//             link: '/extras/timeline'
//         },
//         {
//             id: 1068,
//             label: 'menuitems.extrapages.list.sitemap',
//             link: '/extras/sitemap'
//         },
//         {
//             id: 1067,
//             label: 'menuitems.extrapages.list.invoice',
//             link: '/extras/invoice'
//         },
//         {
//             id: 1066,
//             label: 'menuitems.extrapages.list.faqs',
//             link: '/extras/faqs'
//         },
//         {
//             id: 1065,
//             label: 'menuitems.extrapages.list.search-results',
//             link: '/extras/search-results'
//         },
//         {
//             id: 1064,
//             label: 'menuitems.extrapages.list.pricing',
//             link: '/extras/pricing'
//         },
//         {
//             id: 1063,
//             label: 'menuitems.extrapages.list.maintenance',
//             link: '/extras/maintenance'
//         },
//         {
//             id: 1062,
//             label: 'menuitems.extrapages.list.comingsoon',
//             link: '/extras/coming-soon'
//         },
//         {
//             id: 1061,
//             label: 'menuitems.extrapages.list.lightbox',
//             link: '/extras/lightbox'
//         },
//         {
//             id: 1060,
//             label: 'menuitems.extrapages.list.error404',
//             link: '/error/404'
//         },
//         {
//             id: 1059,
//             label: 'menuitems.extrapages.list.error404-alt',
//             link: '/error/404-alt'
//         },
//         {
//             id: 1058,
//             label: 'menuitems.extrapages.list.error500',
//             link: '/error/500'
//         }
//     ]
// },
// {
//     id: 1057,
//     label: "menuitems.components.text",
//     isTitle: true
// },
// {
//     id: 1056,
//     label: 'menuitems.ui.text',
//     icon: 'ri-pencil-ruler-2-line',
//     isMenuCollapsed: false,
//     subItems: [
//         {
//             id: 1055,
//             label: 'menuitems.ui.list.avatars',
//             link: '/ui/avatars'
//         },
//         {
//             id: 1054,
//             label: 'menuitems.ui.list.buttons',
//             link: '/ui/buttons'
//         },
//         {
//             id: 1053,
//             label: 'menuitems.ui.list.cards',
//             link: '/ui/cards'
//         },
//         {
//             id: 1052,
//             label: 'menuitems.ui.list.carousel',
//             link: '/ui/carousel'
//         },
//         {
//             id: 1051,
//             label: 'menuitems.ui.list.dropdowns',
//             link: '/ui/dropdowns'
//         },
//         {
//             id: 1050,
//             label: 'menuitems.ui.list.video',
//             link: '/ui/video'
//         },
//         {
//             id: 1049,
//             label: 'menuitems.ui.list.general',
//             link: '/ui/general'
//         },
//         {
//             id: 1048,
//             label: 'menuitems.ui.list.grid',
//             link: '/ui/grid'
//         },
//         {
//             id: 1047,
//             label: 'menuitems.ui.list.images',
//             link: '/ui/images'
//         },
//         {
//             id: 1046,
//             label: 'menuitems.ui.list.listgroup',
//             link: '/ui/list-group'
//         },
//         {
//             id: 1045,
//             label: 'menuitems.ui.list.modals',
//             link: '/ui/modals'
//         },
//         {
//             id: 1044,
//             label: 'menuitems.ui.list.notifications',
//             link: '/ui/notifications'
//         },
//         {
//             id: 1043,
//             label: 'menuitems.ui.list.portlet',
//             link: '/ui/portlets'
//         },
//         {
//             id: 1042,
//             label: 'menuitems.ui.list.progress',
//             link: '/ui/progress'
//         },
//         {
//             id: 1041,
//             label: 'menuitems.ui.list.ribbons',
//             link: '/ui/ribbons'
//         },
//         {
//             id: 1040,
//             label: 'menuitems.ui.list.spinners',
//             link: '/ui/spinners'
//         },
//         {
//             id: 1039,
//             label: 'menuitems.ui.list.tabs',
//             link: '/ui/tabs-accordions'
//         },
//         {
//             id: 1038,
//             label: 'menuitems.ui.list.tooltip',
//             link: '/ui/tooltips-popovers'
//         },
//         {
//             id: 1037,
//             label: 'menuitems.ui.list.typography',
//             link: '/ui/typography'
//         }
//     ]
// },
// {
//     id: 1036,
//     label: 'menuitems.extendedui.text',
//     icon: 'ri-stack-line',
//     badge: {
//         variant: "primary",
//         text: "menuitems.extendedui.badge"
//     },
//     isMenuCollapsed: false,
//     subItems: [
//         {
//             id: 1035,
//             label: 'menuitems.extendedui.list.rangeslider',
//             link: '/extended/rangeslider'
//         },
//         {
//             id: 1034,
//             label: 'menuitems.extendedui.list.sweetalert',
//             link: '/extended/sweet-alert'
//         },
//         {
//             id: 1033,
//             label: 'menuitems.extendedui.list.tour',
//             link: '/extended/tour'
//         },
//         {
//             id: 1032,
//             label: 'menuitems.extendedui.list.scrollspy',
//             link: '/extended/scrollspy'
//         },
//     ]
// },
// {
//     id: 1031,
//     label: 'menuitems.widgets.text',
//     icon: 'ri-honour-line',
//     link: '/widgets'
// },
// {
//     id: 1024,
//     label: 'menuitems.icons.text',
//     icon: 'ri-markup-line',
//     isMenuCollapsed: false,
//     subItems: [
//         {
//             id: 1025,
//             label: 'menuitems.icons.list.feather',
//             link: '/icons/feather'
//         },
//         {
//             id: 1026,
//             label: 'menuitems.icons.list.remix',
//             link: '/icons/remix'
//         },
//         {
//             id: 1027,
//             label: 'menuitems.icons.list.boxicons',
//             link: '/icons/boxicons'
//         },
//         {
//             id: 1028,
//             label: 'menuitems.icons.list.materialdesign',
//             link: '/icons/mdi'
//         },
//         {
//             id: 1029,
//             label: 'menuitems.icons.list.fontawesome',
//             link: '/icons/font-awesome'
//         },
//         {
//             id: 1030,
//             label: 'menuitems.icons.list.weather',
//             link: '/icons/weather'
//         }
//     ]
// },
// {
//     id: 1023,
//     label: 'menuitems.forms.text',
//     icon: 'ri-eraser-line',
//     isMenuCollapsed: false,
//     subItems: [
//         {
//             id: 1022,
//             label: 'menuitems.forms.list.elements',
//             link: '/forms/elements'
//         },
//         {
//             id: 1021,
//             label: 'menuitems.forms.list.advanced',
//             link: '/forms/advanced'
//         },
//         {
//             id: 1020,
//             label: 'menuitems.forms.list.validation',
//             link: '/forms/validation'
//         },
//         {
//             id: 1019,
//             label: 'menuitems.forms.list.wizard',
//             link: '/forms/wizard'
//         },
//         {
//             id: 1018,
//             label: 'menuitems.forms.list.mask',
//             link: '/forms/mask'
//         },
//         {
//             id: 1017,
//             label: 'menuitems.forms.list.editor',
//             link: '/forms/quill'
//         },
//         {
//             id: 1016,
//             label: 'menuitems.forms.list.fileupload',
//             link: '/forms/file-uploads'
//         }
//     ]
// },
// {
//     id: 1015,
//     label: 'menuitems.tables.text',
//     icon: 'ri-table-line',
//     isMenuCollapsed: false,
//     subItems: [
//         {
//             id: 1014,
//             label: 'menuitems.tables.list.basic',
//             link: '/tables/basic'
//         },
//         {
//             id: 1013,
//             label: 'menuitems.tables.list.advanced',
//             link: '/tables/advanced'
//         },
//     ]
// },
// {
//     id: 1012,
//     label: 'menuitems.charts.text',
//     icon: 'ri-bar-chart-line',
//     isMenuCollapsed: false,
//     subItems: [
//         {
//             id: 1007,
//             label: 'menuitems.charts.list.apex',
//             link: '/charts/apex'
//         },
//         {
//             id: 1008,
//             label: 'menuitems.charts.list.chartjs',
//             link: '/charts/chartjs'
//         },
//         {
//             id: 1009,
//             label: 'menuitems.charts.list.c3',
//             link: '/charts/c3'
//         },
//         {
//             id: 1010,
//             label: 'menuitems.charts.list.chartist',
//             link: '/charts/chartist'
//         },
//         {
//             id: 1011,
//             label: 'menuitems.charts.list.knob',
//             link: '/charts/knob'
//         }
//     ]
// },
// {
//     id: 1006,
//     label: 'menuitems.maps.text',
//     icon: 'ri-map-pin-line',
//     isMenuCollapsed: false,
//     subItems: [
//         {
//             id: 1005,
//             label: 'menuitems.maps.list.googlemap',
//             link: '/maps/google'
//         }
//     ]
// },
// {
//     id: 1004,
//     label: "menuitems.multilevel.text",
//     icon: "ri-share-line",
//     isMenuCollapsed: false,
//     subItems: [
//         {
//             id: 1003,
//             label: "menuitems.multilevel.list.level1.1",
//             link: "javascript: void(0);",
//         },
//         {
//             id: 1002,
//             label: "menuitems.multilevel.list.level1.2",
//             isMenuCollapsed: false,
//             subItems: [
//                 {
//                     id: 1001,
//                     label: "menuitems.multilevel.list.level1.level2.1",
//                     link: "javascript: void(0);"
//                 },
//                 {
//                     id: 1000,
//                     label: "menuitems.multilevel.list.level1.level2.2",
//                     link: "javascript: void(0);"
//                 }
//             ]
//         }
//     ]
// }
];

/***/ }),

/***/ "./resources/js/state/helpers.js":
/*!***************************************!*\
  !*** ./resources/js/state/helpers.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "authComputed": () => (/* binding */ authComputed),
/* harmony export */   "authFackMethods": () => (/* binding */ authFackMethods),
/* harmony export */   "authMethods": () => (/* binding */ authMethods),
/* harmony export */   "layoutComputed": () => (/* binding */ layoutComputed),
/* harmony export */   "layoutMethods": () => (/* binding */ layoutMethods),
/* harmony export */   "notificationMethods": () => (/* binding */ notificationMethods)
/* harmony export */ });
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var authComputed = _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_0__.mapState)('auth', {
  currentUser: function currentUser(state) {
    return state.currentUser;
  }
})), (0,vuex__WEBPACK_IMPORTED_MODULE_0__.mapGetters)('auth', ['loggedIn']));
var layoutComputed = _objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_0__.mapState)('layout', {
  layoutType: function layoutType(state) {
    return state.layoutType;
  },
  leftSidebarType: function leftSidebarType(state) {
    return state.leftSidebarType;
  },
  layoutWidth: function layoutWidth(state) {
    return state.layoutWidth;
  },
  leftSidebarSize: function leftSidebarSize(state) {
    return state.leftSidebarSize;
  },
  menuPosition: function menuPosition(state) {
    return state.menuPosition;
  },
  topbar: function topbar(state) {
    return state.topbar;
  },
  loader: function loader(state) {
    return state.loader;
  }
}));
var authMethods = (0,vuex__WEBPACK_IMPORTED_MODULE_0__.mapActions)('auth', ['logIn', 'logOut', 'register', 'resetPassword']);
var layoutMethods = (0,vuex__WEBPACK_IMPORTED_MODULE_0__.mapActions)('layout', ['changeLayoutType', 'changeLayoutWidth', 'changeLeftSidebarType', 'changeLeftSidebarSize', 'changeTopbar', 'changeLoaderValue', 'changeMenuPosition']);
var authFackMethods = (0,vuex__WEBPACK_IMPORTED_MODULE_0__.mapActions)('authfack', ['login', 'registeruser', 'logout']);
var notificationMethods = (0,vuex__WEBPACK_IMPORTED_MODULE_0__.mapActions)('notification', ['success', 'error', 'clear']);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Footer.vue?vue&type=style&index=0&id=61a7c374&scoped=true&lang=css&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Footer.vue?vue&type=style&index=0&id=61a7c374&scoped=true&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.link-footer[data-v-61a7c374]{\n    color: black;\n    font-weight: bold;\n}\n.link-footer[data-v-61a7c374]:hover{\n    color: rgb(0, 163, 244);\n    font-weight: bold;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Page-header.vue?vue&type=style&index=0&id=7182f8f0&lang=css&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Page-header.vue?vue&type=style&index=0&id=7182f8f0&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.page-title-box {\n    margin: 0 !important;\n    padding: 0 !important;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Sidebar.vue?vue&type=style&index=0&id=81fbb27e&scoped=true&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Sidebar.vue?vue&type=style&index=0&id=81fbb27e&scoped=true&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.logo-lg img[data-v-81fbb27e] {\n  width: 70px;\n  height: 45px;\n}\n.logo-sm img[data-v-81fbb27e] {\n  width: 70px;\n  height: 45px;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/layouts/vertical.vue?vue&type=style&index=0&id=7397033b&lang=css&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/layouts/vertical.vue?vue&type=style&index=0&id=7397033b&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.container-fluid {\n    padding: unset;\n    margin: unset;\n}\n.content-page {\n    padding: 70px 0 65px !important;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./resources/js/assets/images/logo-dark.png":
/*!**************************************************!*\
  !*** ./resources/js/assets/images/logo-dark.png ***!
  \**************************************************/
/***/ ((module) => {

module.exports = "/images/logo-dark.png?f85dba6d884d32a2f6b6c5404bb19748";

/***/ }),

/***/ "./resources/js/assets/images/logo-light.png":
/*!***************************************************!*\
  !*** ./resources/js/assets/images/logo-light.png ***!
  \***************************************************/
/***/ ((module) => {

module.exports = "/images/logo-light.png?3f7305d328f1b7c3f96726eaf20a45d3";

/***/ }),

/***/ "./resources/js/assets/images/logo-sm-dark.png":
/*!*****************************************************!*\
  !*** ./resources/js/assets/images/logo-sm-dark.png ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = "/images/logo-sm-dark.png?3acb546899038322f9b0bf5fc0f038ba";

/***/ }),

/***/ "./resources/js/assets/images/logo-sm.png":
/*!************************************************!*\
  !*** ./resources/js/assets/images/logo-sm.png ***!
  \************************************************/
/***/ ((module) => {

module.exports = "/images/logo-sm.png?d0b4aaf8358a778085086603d32d666e";

/***/ }),

/***/ "./resources/js/assets/images/users/avatar-1.jpg":
/*!*******************************************************!*\
  !*** ./resources/js/assets/images/users/avatar-1.jpg ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = "/images/avatar-1.jpg?cefbe3d21660cf096fd067ef2dc5b773";

/***/ }),

/***/ "./resources/js/assets/images/users/avatar-10.jpg":
/*!********************************************************!*\
  !*** ./resources/js/assets/images/users/avatar-10.jpg ***!
  \********************************************************/
/***/ ((module) => {

module.exports = "/images/avatar-10.jpg?36fcf292e489198725b24e95176ced89";

/***/ }),

/***/ "./resources/js/assets/images/users/avatar-2.jpg":
/*!*******************************************************!*\
  !*** ./resources/js/assets/images/users/avatar-2.jpg ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = "/images/avatar-2.jpg?d8247dbf6a9e498e033f445ef6992b64";

/***/ }),

/***/ "./resources/js/assets/images/users/avatar-4.jpg":
/*!*******************************************************!*\
  !*** ./resources/js/assets/images/users/avatar-4.jpg ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = "/images/avatar-4.jpg?a2e1eb529e4e11f36fb1765321c57ec0";

/***/ }),

/***/ "./resources/js/assets/images/users/avatar-5.jpg":
/*!*******************************************************!*\
  !*** ./resources/js/assets/images/users/avatar-5.jpg ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = "/images/avatar-5.jpg?59af67849fd28e58abe9dfc634772192";

/***/ }),

/***/ "./resources/js/assets/images/users/avatar-6.jpg":
/*!*******************************************************!*\
  !*** ./resources/js/assets/images/users/avatar-6.jpg ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = "/images/avatar-6.jpg?d98a113b0a21674ffd70a754735b7ecc";

/***/ }),

/***/ "./resources/js/assets/images/users/avatar-7.jpg":
/*!*******************************************************!*\
  !*** ./resources/js/assets/images/users/avatar-7.jpg ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = "/images/avatar-7.jpg?3fec102cae56f3caa3f62758767a5763";

/***/ }),

/***/ "./resources/js/assets/images/users/avatar-8.jpg":
/*!*******************************************************!*\
  !*** ./resources/js/assets/images/users/avatar-8.jpg ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = "/images/avatar-8.jpg?40b8158c02ea476b9c54cac14387b8cb";

/***/ }),

/***/ "./resources/js/assets/images/users/avatar-9.jpg":
/*!*******************************************************!*\
  !*** ./resources/js/assets/images/users/avatar-9.jpg ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = "/images/avatar-9.jpg?effcd89f3d82672513777065799fcfec";

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Footer.vue?vue&type=style&index=0&id=61a7c374&scoped=true&lang=css&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Footer.vue?vue&type=style&index=0&id=61a7c374&scoped=true&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Footer_vue_vue_type_style_index_0_id_61a7c374_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Footer.vue?vue&type=style&index=0&id=61a7c374&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Footer.vue?vue&type=style&index=0&id=61a7c374&scoped=true&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Footer_vue_vue_type_style_index_0_id_61a7c374_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Footer_vue_vue_type_style_index_0_id_61a7c374_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Page-header.vue?vue&type=style&index=0&id=7182f8f0&lang=css&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Page-header.vue?vue&type=style&index=0&id=7182f8f0&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Page_header_vue_vue_type_style_index_0_id_7182f8f0_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Page-header.vue?vue&type=style&index=0&id=7182f8f0&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Page-header.vue?vue&type=style&index=0&id=7182f8f0&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Page_header_vue_vue_type_style_index_0_id_7182f8f0_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Page_header_vue_vue_type_style_index_0_id_7182f8f0_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Sidebar.vue?vue&type=style&index=0&id=81fbb27e&scoped=true&lang=css&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Sidebar.vue?vue&type=style&index=0&id=81fbb27e&scoped=true&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_style_index_0_id_81fbb27e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Sidebar.vue?vue&type=style&index=0&id=81fbb27e&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Sidebar.vue?vue&type=style&index=0&id=81fbb27e&scoped=true&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_style_index_0_id_81fbb27e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_style_index_0_id_81fbb27e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/layouts/vertical.vue?vue&type=style&index=0&id=7397033b&lang=css&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/layouts/vertical.vue?vue&type=style&index=0&id=7397033b&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_vertical_vue_vue_type_style_index_0_id_7397033b_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./vertical.vue?vue&type=style&index=0&id=7397033b&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/layouts/vertical.vue?vue&type=style&index=0&id=7397033b&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_vertical_vue_vue_type_style_index_0_id_7397033b_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_vertical_vue_vue_type_style_index_0_id_7397033b_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/Footer.vue":
/*!********************************************!*\
  !*** ./resources/js/components/Footer.vue ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Footer_vue_vue_type_template_id_61a7c374_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Footer.vue?vue&type=template&id=61a7c374&scoped=true& */ "./resources/js/components/Footer.vue?vue&type=template&id=61a7c374&scoped=true&");
/* harmony import */ var _Footer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Footer.vue?vue&type=script&lang=js& */ "./resources/js/components/Footer.vue?vue&type=script&lang=js&");
/* harmony import */ var _Footer_vue_vue_type_style_index_0_id_61a7c374_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Footer.vue?vue&type=style&index=0&id=61a7c374&scoped=true&lang=css& */ "./resources/js/components/Footer.vue?vue&type=style&index=0&id=61a7c374&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Footer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Footer_vue_vue_type_template_id_61a7c374_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _Footer_vue_vue_type_template_id_61a7c374_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "61a7c374",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Footer.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/Horizontal-navbar.vue":
/*!*******************************************************!*\
  !*** ./resources/js/components/Horizontal-navbar.vue ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Horizontal_navbar_vue_vue_type_template_id_cea5fb04___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Horizontal-navbar.vue?vue&type=template&id=cea5fb04& */ "./resources/js/components/Horizontal-navbar.vue?vue&type=template&id=cea5fb04&");
/* harmony import */ var _Horizontal_navbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Horizontal-navbar.vue?vue&type=script&lang=js& */ "./resources/js/components/Horizontal-navbar.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Horizontal_navbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Horizontal_navbar_vue_vue_type_template_id_cea5fb04___WEBPACK_IMPORTED_MODULE_0__.render,
  _Horizontal_navbar_vue_vue_type_template_id_cea5fb04___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Horizontal-navbar.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/Page-header.vue":
/*!*************************************************!*\
  !*** ./resources/js/components/Page-header.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Page_header_vue_vue_type_template_id_7182f8f0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Page-header.vue?vue&type=template&id=7182f8f0& */ "./resources/js/components/Page-header.vue?vue&type=template&id=7182f8f0&");
/* harmony import */ var _Page_header_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Page-header.vue?vue&type=script&lang=js& */ "./resources/js/components/Page-header.vue?vue&type=script&lang=js&");
/* harmony import */ var _Page_header_vue_vue_type_style_index_0_id_7182f8f0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Page-header.vue?vue&type=style&index=0&id=7182f8f0&lang=css& */ "./resources/js/components/Page-header.vue?vue&type=style&index=0&id=7182f8f0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Page_header_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Page_header_vue_vue_type_template_id_7182f8f0___WEBPACK_IMPORTED_MODULE_0__.render,
  _Page_header_vue_vue_type_template_id_7182f8f0___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Page-header.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/Rightbar.vue":
/*!**********************************************!*\
  !*** ./resources/js/components/Rightbar.vue ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Rightbar_vue_vue_type_template_id_1c913662___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Rightbar.vue?vue&type=template&id=1c913662& */ "./resources/js/components/Rightbar.vue?vue&type=template&id=1c913662&");
/* harmony import */ var _Rightbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Rightbar.vue?vue&type=script&lang=js& */ "./resources/js/components/Rightbar.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Rightbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Rightbar_vue_vue_type_template_id_1c913662___WEBPACK_IMPORTED_MODULE_0__.render,
  _Rightbar_vue_vue_type_template_id_1c913662___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Rightbar.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/Sidebar.vue":
/*!*********************************************!*\
  !*** ./resources/js/components/Sidebar.vue ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Sidebar_vue_vue_type_template_id_81fbb27e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sidebar.vue?vue&type=template&id=81fbb27e&scoped=true& */ "./resources/js/components/Sidebar.vue?vue&type=template&id=81fbb27e&scoped=true&");
/* harmony import */ var _Sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Sidebar.vue?vue&type=script&lang=js& */ "./resources/js/components/Sidebar.vue?vue&type=script&lang=js&");
/* harmony import */ var _Sidebar_vue_vue_type_style_index_0_id_81fbb27e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Sidebar.vue?vue&type=style&index=0&id=81fbb27e&scoped=true&lang=css& */ "./resources/js/components/Sidebar.vue?vue&type=style&index=0&id=81fbb27e&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Sidebar_vue_vue_type_template_id_81fbb27e_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _Sidebar_vue_vue_type_template_id_81fbb27e_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "81fbb27e",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Sidebar.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/Topbar.vue":
/*!********************************************!*\
  !*** ./resources/js/components/Topbar.vue ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Topbar_vue_vue_type_template_id_57e4246e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Topbar.vue?vue&type=template&id=57e4246e& */ "./resources/js/components/Topbar.vue?vue&type=template&id=57e4246e&");
/* harmony import */ var _Topbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Topbar.vue?vue&type=script&lang=js& */ "./resources/js/components/Topbar.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Topbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Topbar_vue_vue_type_template_id_57e4246e___WEBPACK_IMPORTED_MODULE_0__.render,
  _Topbar_vue_vue_type_template_id_57e4246e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Topbar.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/Two-column-sidebar.vue":
/*!********************************************************!*\
  !*** ./resources/js/components/Two-column-sidebar.vue ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Two_column_sidebar_vue_vue_type_template_id_174b4c31___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Two-column-sidebar.vue?vue&type=template&id=174b4c31& */ "./resources/js/components/Two-column-sidebar.vue?vue&type=template&id=174b4c31&");
/* harmony import */ var _Two_column_sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Two-column-sidebar.vue?vue&type=script&lang=js& */ "./resources/js/components/Two-column-sidebar.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Two_column_sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Two_column_sidebar_vue_vue_type_template_id_174b4c31___WEBPACK_IMPORTED_MODULE_0__.render,
  _Two_column_sidebar_vue_vue_type_template_id_174b4c31___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Two-column-sidebar.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/layouts/detached.vue":
/*!*************************************************!*\
  !*** ./resources/js/views/layouts/detached.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _detached_vue_vue_type_template_id_7032c937___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./detached.vue?vue&type=template&id=7032c937& */ "./resources/js/views/layouts/detached.vue?vue&type=template&id=7032c937&");
/* harmony import */ var _detached_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./detached.vue?vue&type=script&lang=js& */ "./resources/js/views/layouts/detached.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _detached_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _detached_vue_vue_type_template_id_7032c937___WEBPACK_IMPORTED_MODULE_0__.render,
  _detached_vue_vue_type_template_id_7032c937___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/layouts/detached.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/layouts/horizontal.vue":
/*!***************************************************!*\
  !*** ./resources/js/views/layouts/horizontal.vue ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _horizontal_vue_vue_type_template_id_29c46cae___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./horizontal.vue?vue&type=template&id=29c46cae& */ "./resources/js/views/layouts/horizontal.vue?vue&type=template&id=29c46cae&");
/* harmony import */ var _horizontal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./horizontal.vue?vue&type=script&lang=js& */ "./resources/js/views/layouts/horizontal.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _horizontal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _horizontal_vue_vue_type_template_id_29c46cae___WEBPACK_IMPORTED_MODULE_0__.render,
  _horizontal_vue_vue_type_template_id_29c46cae___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/layouts/horizontal.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/layouts/main.vue":
/*!*********************************************!*\
  !*** ./resources/js/views/layouts/main.vue ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _main_vue_vue_type_template_id_de3c3304___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.vue?vue&type=template&id=de3c3304& */ "./resources/js/views/layouts/main.vue?vue&type=template&id=de3c3304&");
/* harmony import */ var _main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main.vue?vue&type=script&lang=js& */ "./resources/js/views/layouts/main.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _main_vue_vue_type_template_id_de3c3304___WEBPACK_IMPORTED_MODULE_0__.render,
  _main_vue_vue_type_template_id_de3c3304___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/layouts/main.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/layouts/two-column.vue":
/*!***************************************************!*\
  !*** ./resources/js/views/layouts/two-column.vue ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _two_column_vue_vue_type_template_id_ffe4ac08___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./two-column.vue?vue&type=template&id=ffe4ac08& */ "./resources/js/views/layouts/two-column.vue?vue&type=template&id=ffe4ac08&");
/* harmony import */ var _two_column_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./two-column.vue?vue&type=script&lang=js& */ "./resources/js/views/layouts/two-column.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _two_column_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _two_column_vue_vue_type_template_id_ffe4ac08___WEBPACK_IMPORTED_MODULE_0__.render,
  _two_column_vue_vue_type_template_id_ffe4ac08___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/layouts/two-column.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/layouts/vertical.vue":
/*!*************************************************!*\
  !*** ./resources/js/views/layouts/vertical.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _vertical_vue_vue_type_template_id_7397033b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vertical.vue?vue&type=template&id=7397033b& */ "./resources/js/views/layouts/vertical.vue?vue&type=template&id=7397033b&");
/* harmony import */ var _vertical_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vertical.vue?vue&type=script&lang=js& */ "./resources/js/views/layouts/vertical.vue?vue&type=script&lang=js&");
/* harmony import */ var _vertical_vue_vue_type_style_index_0_id_7397033b_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vertical.vue?vue&type=style&index=0&id=7397033b&lang=css& */ "./resources/js/views/layouts/vertical.vue?vue&type=style&index=0&id=7397033b&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _vertical_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _vertical_vue_vue_type_template_id_7397033b___WEBPACK_IMPORTED_MODULE_0__.render,
  _vertical_vue_vue_type_template_id_7397033b___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/layouts/vertical.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/pages/icons/boxicons.vue":
/*!*****************************************************!*\
  !*** ./resources/js/views/pages/icons/boxicons.vue ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _boxicons_vue_vue_type_template_id_060cd72e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./boxicons.vue?vue&type=template&id=060cd72e& */ "./resources/js/views/pages/icons/boxicons.vue?vue&type=template&id=060cd72e&");
/* harmony import */ var _boxicons_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./boxicons.vue?vue&type=script&lang=js& */ "./resources/js/views/pages/icons/boxicons.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _boxicons_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _boxicons_vue_vue_type_template_id_060cd72e___WEBPACK_IMPORTED_MODULE_0__.render,
  _boxicons_vue_vue_type_template_id_060cd72e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/pages/icons/boxicons.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/Footer.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./resources/js/components/Footer.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Footer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Footer.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Footer.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Footer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Horizontal-navbar.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/Horizontal-navbar.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Horizontal_navbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Horizontal-navbar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Horizontal-navbar.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Horizontal_navbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Page-header.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/components/Page-header.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Page_header_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Page-header.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Page-header.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Page_header_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Rightbar.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./resources/js/components/Rightbar.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Rightbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Rightbar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Rightbar.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Rightbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Sidebar.vue?vue&type=script&lang=js&":
/*!**********************************************************************!*\
  !*** ./resources/js/components/Sidebar.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Sidebar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Sidebar.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Topbar.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./resources/js/components/Topbar.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Topbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Topbar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Topbar.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Topbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Two-column-sidebar.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/Two-column-sidebar.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Two_column_sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Two-column-sidebar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Two-column-sidebar.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Two_column_sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/layouts/detached.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/views/layouts/detached.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_detached_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./detached.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/layouts/detached.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_detached_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/layouts/horizontal.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/views/layouts/horizontal.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_horizontal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./horizontal.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/layouts/horizontal.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_horizontal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/layouts/main.vue?vue&type=script&lang=js&":
/*!**********************************************************************!*\
  !*** ./resources/js/views/layouts/main.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./main.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/layouts/main.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/layouts/two-column.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/views/layouts/two-column.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_two_column_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./two-column.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/layouts/two-column.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_two_column_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/layouts/vertical.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/views/layouts/vertical.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_vertical_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./vertical.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/layouts/vertical.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_vertical_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/pages/icons/boxicons.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/js/views/pages/icons/boxicons.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_boxicons_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./boxicons.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/pages/icons/boxicons.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_boxicons_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Footer.vue?vue&type=template&id=61a7c374&scoped=true&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/Footer.vue?vue&type=template&id=61a7c374&scoped=true& ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Footer_vue_vue_type_template_id_61a7c374_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Footer_vue_vue_type_template_id_61a7c374_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Footer_vue_vue_type_template_id_61a7c374_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Footer.vue?vue&type=template&id=61a7c374&scoped=true& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Footer.vue?vue&type=template&id=61a7c374&scoped=true&");


/***/ }),

/***/ "./resources/js/components/Horizontal-navbar.vue?vue&type=template&id=cea5fb04&":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/Horizontal-navbar.vue?vue&type=template&id=cea5fb04& ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Horizontal_navbar_vue_vue_type_template_id_cea5fb04___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Horizontal_navbar_vue_vue_type_template_id_cea5fb04___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Horizontal_navbar_vue_vue_type_template_id_cea5fb04___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Horizontal-navbar.vue?vue&type=template&id=cea5fb04& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Horizontal-navbar.vue?vue&type=template&id=cea5fb04&");


/***/ }),

/***/ "./resources/js/components/Page-header.vue?vue&type=template&id=7182f8f0&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/Page-header.vue?vue&type=template&id=7182f8f0& ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Page_header_vue_vue_type_template_id_7182f8f0___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Page_header_vue_vue_type_template_id_7182f8f0___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Page_header_vue_vue_type_template_id_7182f8f0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Page-header.vue?vue&type=template&id=7182f8f0& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Page-header.vue?vue&type=template&id=7182f8f0&");


/***/ }),

/***/ "./resources/js/components/Rightbar.vue?vue&type=template&id=1c913662&":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/Rightbar.vue?vue&type=template&id=1c913662& ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Rightbar_vue_vue_type_template_id_1c913662___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Rightbar_vue_vue_type_template_id_1c913662___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Rightbar_vue_vue_type_template_id_1c913662___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Rightbar.vue?vue&type=template&id=1c913662& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Rightbar.vue?vue&type=template&id=1c913662&");


/***/ }),

/***/ "./resources/js/components/Sidebar.vue?vue&type=template&id=81fbb27e&scoped=true&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/Sidebar.vue?vue&type=template&id=81fbb27e&scoped=true& ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_template_id_81fbb27e_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_template_id_81fbb27e_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_template_id_81fbb27e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Sidebar.vue?vue&type=template&id=81fbb27e&scoped=true& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Sidebar.vue?vue&type=template&id=81fbb27e&scoped=true&");


/***/ }),

/***/ "./resources/js/components/Topbar.vue?vue&type=template&id=57e4246e&":
/*!***************************************************************************!*\
  !*** ./resources/js/components/Topbar.vue?vue&type=template&id=57e4246e& ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Topbar_vue_vue_type_template_id_57e4246e___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Topbar_vue_vue_type_template_id_57e4246e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Topbar_vue_vue_type_template_id_57e4246e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Topbar.vue?vue&type=template&id=57e4246e& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Topbar.vue?vue&type=template&id=57e4246e&");


/***/ }),

/***/ "./resources/js/components/Two-column-sidebar.vue?vue&type=template&id=174b4c31&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/Two-column-sidebar.vue?vue&type=template&id=174b4c31& ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Two_column_sidebar_vue_vue_type_template_id_174b4c31___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Two_column_sidebar_vue_vue_type_template_id_174b4c31___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Two_column_sidebar_vue_vue_type_template_id_174b4c31___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Two-column-sidebar.vue?vue&type=template&id=174b4c31& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Two-column-sidebar.vue?vue&type=template&id=174b4c31&");


/***/ }),

/***/ "./resources/js/views/layouts/detached.vue?vue&type=template&id=7032c937&":
/*!********************************************************************************!*\
  !*** ./resources/js/views/layouts/detached.vue?vue&type=template&id=7032c937& ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_detached_vue_vue_type_template_id_7032c937___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_detached_vue_vue_type_template_id_7032c937___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_detached_vue_vue_type_template_id_7032c937___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./detached.vue?vue&type=template&id=7032c937& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/layouts/detached.vue?vue&type=template&id=7032c937&");


/***/ }),

/***/ "./resources/js/views/layouts/horizontal.vue?vue&type=template&id=29c46cae&":
/*!**********************************************************************************!*\
  !*** ./resources/js/views/layouts/horizontal.vue?vue&type=template&id=29c46cae& ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_horizontal_vue_vue_type_template_id_29c46cae___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_horizontal_vue_vue_type_template_id_29c46cae___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_horizontal_vue_vue_type_template_id_29c46cae___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./horizontal.vue?vue&type=template&id=29c46cae& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/layouts/horizontal.vue?vue&type=template&id=29c46cae&");


/***/ }),

/***/ "./resources/js/views/layouts/main.vue?vue&type=template&id=de3c3304&":
/*!****************************************************************************!*\
  !*** ./resources/js/views/layouts/main.vue?vue&type=template&id=de3c3304& ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_main_vue_vue_type_template_id_de3c3304___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_main_vue_vue_type_template_id_de3c3304___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_main_vue_vue_type_template_id_de3c3304___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./main.vue?vue&type=template&id=de3c3304& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/layouts/main.vue?vue&type=template&id=de3c3304&");


/***/ }),

/***/ "./resources/js/views/layouts/two-column.vue?vue&type=template&id=ffe4ac08&":
/*!**********************************************************************************!*\
  !*** ./resources/js/views/layouts/two-column.vue?vue&type=template&id=ffe4ac08& ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_two_column_vue_vue_type_template_id_ffe4ac08___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_two_column_vue_vue_type_template_id_ffe4ac08___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_two_column_vue_vue_type_template_id_ffe4ac08___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./two-column.vue?vue&type=template&id=ffe4ac08& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/layouts/two-column.vue?vue&type=template&id=ffe4ac08&");


/***/ }),

/***/ "./resources/js/views/layouts/vertical.vue?vue&type=template&id=7397033b&":
/*!********************************************************************************!*\
  !*** ./resources/js/views/layouts/vertical.vue?vue&type=template&id=7397033b& ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_vertical_vue_vue_type_template_id_7397033b___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_vertical_vue_vue_type_template_id_7397033b___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_vertical_vue_vue_type_template_id_7397033b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./vertical.vue?vue&type=template&id=7397033b& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/layouts/vertical.vue?vue&type=template&id=7397033b&");


/***/ }),

/***/ "./resources/js/views/pages/icons/boxicons.vue?vue&type=template&id=060cd72e&":
/*!************************************************************************************!*\
  !*** ./resources/js/views/pages/icons/boxicons.vue?vue&type=template&id=060cd72e& ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_boxicons_vue_vue_type_template_id_060cd72e___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_boxicons_vue_vue_type_template_id_060cd72e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_boxicons_vue_vue_type_template_id_060cd72e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./boxicons.vue?vue&type=template&id=060cd72e& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/pages/icons/boxicons.vue?vue&type=template&id=060cd72e&");


/***/ }),

/***/ "./resources/js/components/Footer.vue?vue&type=style&index=0&id=61a7c374&scoped=true&lang=css&":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/components/Footer.vue?vue&type=style&index=0&id=61a7c374&scoped=true&lang=css& ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Footer_vue_vue_type_style_index_0_id_61a7c374_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Footer.vue?vue&type=style&index=0&id=61a7c374&scoped=true&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Footer.vue?vue&type=style&index=0&id=61a7c374&scoped=true&lang=css&");


/***/ }),

/***/ "./resources/js/components/Page-header.vue?vue&type=style&index=0&id=7182f8f0&lang=css&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/Page-header.vue?vue&type=style&index=0&id=7182f8f0&lang=css& ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Page_header_vue_vue_type_style_index_0_id_7182f8f0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Page-header.vue?vue&type=style&index=0&id=7182f8f0&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Page-header.vue?vue&type=style&index=0&id=7182f8f0&lang=css&");


/***/ }),

/***/ "./resources/js/components/Sidebar.vue?vue&type=style&index=0&id=81fbb27e&scoped=true&lang=css&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/components/Sidebar.vue?vue&type=style&index=0&id=81fbb27e&scoped=true&lang=css& ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_style_index_0_id_81fbb27e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Sidebar.vue?vue&type=style&index=0&id=81fbb27e&scoped=true&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Sidebar.vue?vue&type=style&index=0&id=81fbb27e&scoped=true&lang=css&");


/***/ }),

/***/ "./resources/js/views/layouts/vertical.vue?vue&type=style&index=0&id=7397033b&lang=css&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/views/layouts/vertical.vue?vue&type=style&index=0&id=7397033b&lang=css& ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_vertical_vue_vue_type_style_index_0_id_7397033b_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./vertical.vue?vue&type=style&index=0&id=7397033b&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/layouts/vertical.vue?vue&type=style&index=0&id=7397033b&lang=css&");


/***/ })

}]);