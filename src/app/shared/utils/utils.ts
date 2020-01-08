/**
 * 序列化 JSON，同时转义，删除两边空格
 */
export function serialize(obj = {}) {
  const arr = [];
  for (const k of Object.keys(obj)) {
    arr.push(
      `${k}=${encodeURIComponent(
        typeof obj[k] === 'string'
          ? String.prototype.trim.call(obj[k])
          : obj[k] === null
          ? ''
          : obj[k]
      )}`
    );
  }
  return arr.join('&');
}

/**
 * 删除 null | undefined | ''
 */
export function delEmptyKey(obj: {}) {
  const objCpy = {};
  if (obj === null || obj === undefined || obj === '') {
    return objCpy;
  }
  for (const key in obj) {
    if (obj[key] !== null && typeof obj[key] === 'object') {
      objCpy[key] = this.delEmptyKey(obj[key]);
    } else if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
      objCpy[key] = obj[key];
    }
  }
  return objCpy;
}

/**
 * 判断是否是空对象
 */
export function isEmptyObject(obj: {}) {
  let name: any;
  // tslint:disable-next-line: forin
  for (name in obj) {
    return false;
  }
  return true;
}

/**
 * 判断是否是合法的日期对象
 */
export function isValidDate(date: Date) {
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * 将对象转为字符串
 */
export function obj2Str(obj: any) {
  const p = {};
  for (const key of Object.keys(obj)) {
    if (obj[key] || obj[key] === 0) {
      if (obj[key].toString() !== '') {
        // 空数组排除
        p[key] = obj[key].toString();
      }
    }
  }
  return p;
}

/**
 * 去除字符串回车换行空白并转换成数组
 */
export function str2arr(str: string) {
  return str.replace(/[\r\n\s]/g, '').split(',');
}

/**
 * 获取滚动条的宽度
 */
export function getScrollbarWidth() {
  const scrollDiv = document.createElement('div');
  scrollDiv.style.cssText =
    'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);

  return scrollbarWidth;
}
