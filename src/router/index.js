import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import MainBox from "../views/MainBox.vue";
import Notice from "../views/Notice.vue";
import New from "../views/New.vue";
import Menu from "../views/Menu.vue";
import shopping from "../views/shopping.vue";

import NProgress from "nprogress";
import "nprogress/nprogress.css";
const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/mainbox",
    name: "mainbox",
    component: MainBox,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        component: Home,
      },

      {
        path: "/notice",
        name: "notice",
        component: Notice,
      },
      {
        path: "/notice/:id",
        name: "new",
        component: New,
      },
      {
        path: "/menu",
        name: "menu",
        component: Menu,
      },
      {
        path: "/shopping",
        name: "shopping",
        component: shopping,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
// Nprogress——页面加载的虚假进度条
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach((to, from, next) => {
  NProgress.done();
  // next()
});
export default router;
