// 判断对象是否为初始化
export const isInitialState = (obj:Object) => {
  if (typeof obj === 'string') {
    return obj === ''
  } else if (typeof obj === 'number') {
    return obj === 0
  } else if (Array.isArray(obj)) {
    return obj.length === 0
  } else if (obj && typeof obj === 'object') {
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && !isInitialState(obj[key])) {
        return false
      }
    }
    return true
  }
  return false
}
