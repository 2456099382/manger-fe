export function filterObject(obj) {
  let a = {};
  for (let key in obj) {
    if (obj[key] != "") {
      a[key] = obj[key];
    } else if (obj[key] === 0 || obj[key] === false) {
      a[key] = obj[key];
    }
  }
  return a;
}
