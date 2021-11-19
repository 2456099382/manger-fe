import request from "@/request";
export function menuOperator(params, options) {
  return request({
    url: "/menu/operate",
    method: "POST",
    data: params,
    ...options,
  });
}

export function getMenuList(params, options) {
  return request({
    url: "/menu/list",
    method: "GET",
    data: params,
    ...options,
  });
}
