import request from "../../request";

export function getMenuList(params, options) {
  return request({
    url: "/menu/list",
    method: "GET",
    mock: true,
    data: params,
    ...options,
  });
}

export function getLeaveCount(params, options) {
  return request({
    url: "/leave/count",
    method: "GET",
    data: params,
    mock: false,
    ...options,
  });
}
