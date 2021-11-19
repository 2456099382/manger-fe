import request from "../../../request";
//获取角色名称列表
export function getAllRoleList(params, options) {
  return request({
    url: "/roles/allList",
    method: "GET",
    mock: true,
    data: params,
    ...options,
  });
}
//获取角色列表
export function getRoleList(params, options) {
  return request({
    url: "/roles/list",
    method: "GET",
    data: params,
    ...options,
  });
}
