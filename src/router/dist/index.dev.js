"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vueRouter = require("vue-router");

var _Home = _interopRequireDefault(require("../views/Home.vue"));

var _Login = _interopRequireDefault(require("../views/Login.vue"));

var _Notice = _interopRequireDefault(require("../views/Notice.vue"));

var _New = _interopRequireDefault(require("../views/New.vue"));

var _Menu = _interopRequireDefault(require("../views/Menu.vue"));

var _nprogress = _interopRequireDefault(require("nprogress"));

require("nprogress/nprogress.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var routes = [{
  path: '/',
  name: 'home',
  component: _Home["default"]
}, {
  path: '/login',
  name: 'login',
  component: _Login["default"]
}, {
  path: '/notice',
  name: 'notice',
  component: _Notice["default"]
}, {
  path: '/notice/:id',
  name: 'new',
  component: _New["default"]
}, {
  path: '/menu',
  name: 'menu',
  component: _Menu["default"]
}];
var router = (0, _vueRouter.createRouter)({
  history: (0, _vueRouter.createWebHashHistory)(),
  routes: routes
}); // Nprogress——页面加载的虚假进度条

router.beforeEach(function (to, from, next) {
  _nprogress["default"].start();

  next();
});
router.afterEach(function (to, from, next) {
  _nprogress["default"].done(); // next()

});
var _default = router;
exports["default"] = _default;