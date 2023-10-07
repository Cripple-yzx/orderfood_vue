// 引入函数 defineStore()
import { defineStore } from "pinia";
// 通过函数 defineStore()，创建 store
// defineStore("store 的 id",配置，将需要有 pinia 维护的数据，以接口函数（钩子函数）的形式返回
export const useCartStore = defineStore("store", {
  //和 Vue 组件中的 data()类似
  state() {
    return {
      menuList: [],
    };
  },
  getters: {},
  actions: {},
});
