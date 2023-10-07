"use strict";

var _vue = require("vue");

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("./store"));

var _elementPlus = _interopRequireDefault(require("element-plus"));

require("element-plus/dist/index.css");

var _particles = _interopRequireDefault(require("particles.vue3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//粒子库
(0, _vue.createApp)(_App["default"]).use(_particles["default"]).use(_elementPlus["default"]).use(_store["default"]).use(_router["default"]).mount('#app');