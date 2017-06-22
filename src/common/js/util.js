// 获取样式
function getStyle(obj, attr) {
  if (obj.currentStyle) {
    // 非标准浏览器
    return obj.currentStyle[attr];
  } else {
    // 标准浏览器
    return getComputedStyle(obj)[attr];
  }
}
// 格式化时间
function formatDate(date) {
  date = new Date(date);
  let Y = date.getFullYear();
  let M = addZero(date.getMonth() + 1);
  let D = addZero(date.getDate());
  let h = addZero(date.getHours());
  let m = addZero(date.getMinutes());
  return Y + '-' + M + '-' + D + ' ' + h + ':' + m;
}
// 小于10的数字补0操作
function addZero(num) {
  return num < 10 ? '0' + num : '' + num;
}

export {getStyle, formatDate};
