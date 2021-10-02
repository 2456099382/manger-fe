import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);

import router from "./router";
app.use(router);

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
app.use(ElementPlus);

import storage from "./utils/storage.js";
app.config.globalProperties.$storage = storage;

app.mount("#app");
