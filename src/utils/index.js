/**
 * 格式化时间
 */
export function formatDate(d, rule) {
  let fmt = rule || "YYYY-MM-DD hh:mm:ss";
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, d.getFullYear());
  }

  const o = {
    "M+": d.getMonth() + 1,
    "D+": d.getDate(),
    "h+": d.getHours(),
    "m+": d.getMinutes(),
    "s+": d.getSeconds(),
  };

  for (let k in o) {
    const val = o[k] + "";
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, ("00" + val).substr(val.length));
    }
  }

  return fmt;
}
