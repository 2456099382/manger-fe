import request from "../../../request";
//获取部门列表
export function getDeptList(params, options) {
  return request({
    url: "/dept/list",
    method: "GET",
    mock: true,
    data: params,
    ...options,
  });
}
