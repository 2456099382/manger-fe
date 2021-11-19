/**
 * 封装axios
 */
import axios from "axios";
import { ElMessage } from "element-plus";
import storage from "@/utils/storage.js";
import config from "../config";
import router from "../router/index.js";
import store from "../store/index.js";
import { filterObject } from "../utils/filter";
const TOKEN_INVALID = "Token 认证失败，请重新登录";
const NETWORK_ERROR = "网络异常，请稍后再试";
// 创建axios实例对象，添加全局配置
const service = axios.create({
  baseURL: config.baseApi,
  timeout: 300000,
});
// 请求拦截
service.interceptors.request.use((config) => {
  const headers = config.headers;
  if (!headers.Authorization)
    headers.Authorization = `Bearer ${storage.getItem("accessToken")}`;

  if (config.method.toUpperCase() == "GET") {
    config.params = filterObject(config.params);
  }

  if (config.method.toUpperCase() == "POST") {
    config.data = filterObject(config.data);
  }
  return config;
});

// 响应拦截
service.interceptors.response.use((res) => {
  const { code, data, msg } = res.data;
  // 请求成功
  if (code === 200) {
    if (msg) {
      ElMessage.success(msg);
    }
    return data;
  } else if (code === 50001) {
    ElMessage.error(TOKEN_INVALID);
    router.replace({ path: "/login" });
    store.commit("setUserInfo", "");
    store.commit("setAccessToken", "");
    return Promise.reject(TOKEN_INVALID);
  } else {
    ElMessage.error(msg || NETWORK_ERROR);
    return Promise.reject(NETWORK_ERROR);
  }
});

function request(options) {
  options.method = options.method || "get";
  if (options.method.toLowerCase() === "get") {
    options.params = options.data;
  }

  if (config.env === "prod") {
    service.defaults.baseURL = config.baseApi;
  } else {
    service.defaults.baseURL = config.mock ? config.mockApi : config.baseApi;
  }
  if (options.mock !== undefined) {
    options.mock
      ? (service.defaults.baseURL = config.mockApi)
      : (service.defaults.baseURL = config.baseApi);
  }

  return service(options);
}

["get", "post", "put", "delete"].forEach((item) => {
  request[item] = (url, data, config) => {
    return request({
      url,
      data,
      method: item,
      ...config,
    });
  };
});

export default request;
