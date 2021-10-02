/**
 * 封装axios
 */
import axios from "axios";
import { ElMessage } from "element-plus";
import config from "../config";

const TOKEN_INVALID = "Token 认证失败，请重新登录";
const NETWORK_ERROR = "网络异常，请稍后再试";
// 创建axios实例对象，添加全局配置
const service = axios.create({
  baseURL: config.baseURL,
  timeout: 300000,
});

// 请求拦截
service.interceptors.request.use((config) => {
  const headers = req.headers;
  if (!headers.Authorization) headers.Authorization = "Bear Jack";

  return config;
});

// 响应拦截
service.interceptors.response.use((res) => {
  const { code, data, msg } = res.data;
  if (code === 200) {
    return data;
  } else if (code === 40001) {
    ElMessage.error(TOKEN_INVALID);
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

  return service(options);
}

export default request;
