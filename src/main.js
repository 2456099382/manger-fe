import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);

import router from "./router";
app.use(router);

import store from "./store";
app.use(store);

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
app.use(ElementPlus, { locale: zhCn });

import storage from "./utils/storage.js";
app.config.globalProperties.$storage = storage;

import request from "./request/index.js";
app.config.globalProperties.$request = request;

app.mount("#app");
