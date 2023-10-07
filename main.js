import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import Particles from "particles.vue3"; //粒子库
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
//引入函数 createPinia()，用于创建 Pinia 示例对象
import { createPinia } from "pinia";
//通过 createPinia()，创建 pinia 实例对象
const pinia = createPinia();

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(router);
app.use(ElementPlus);
app.use(pinia);
app.use(Particles);
app.use(store);
app.mount("#app");
