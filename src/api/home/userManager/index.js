import request from "../../../request";
//获取用户列表
export function getUserList(params, options) {
  return request({
    url: "/users/list",
    method: "GET",
    data: params,
    ...options,
  });
}

// 删除用户
export function deleteUser(params, options) {
  return request({
    url: "/users/delete",
    method: "POST",
    data: params,
    ...options,
  });
}

// 用户创建和删除
export function userOperate(params, options) {
  return request({
    url: "/users/operate",
    method: "POST",
    data: params,
    ...options,
  });
}
// 用户权限列表
export function getPermissionList(params, options) {
  return request({
    url: "/users/getPermissionList",
    method: "GET",
    mock: true,
    data: params,
    ...options,
  });
}
