import request from "../../request";

export function login(params, options) {
  return request({
    url: "/users/login",
    method: "POST",
    data: params,
    ...options,
  });
}
