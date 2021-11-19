/**
 * #环境配置
 */
const env = import.meta.env.MODE || "prod";
const EnvConfig = {
  dev: {
    baseApi: "/api",
    mockApi:
      "https://www.fastmock.site/mock/b22bbf454603a909ef0ef3bc3802e6df/api",
  },
  test: {
    baseApi: "//test.futurefe.com/api",
    mockApi:
      "https://www.fastmock.site/mock/b22bbf454603a909ef0ef3bc3802e6df/api",
  },
  prod: {
    baseApi: "//futurefe.com/api",
    mockApi: "",
  },
};

export default {
  env: "dev",
  mock: false,
  namespace: "manager",
  ...EnvConfig[env],
};
