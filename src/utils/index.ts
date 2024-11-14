/**
 * Check if an element has a class
 * @param {HTMLElement} ele
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass (ele: HTMLElement, cls: string) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} ele
 * @param {string} cls
 */
export function addClass (ele: HTMLElement, cls: string) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} ele
 * @param {string} cls
 */
export function removeClass (ele: HTMLElement, cls: string) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

/**
 * 判断是否是外部链接
 *
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal (path: string) {
  const isExternal = /^(https?:|http?:|mailto:|tel:)/.test(path)
  return isExternal
}

/**
 * 格式化时间
 *
 * @param {string} isoTime
 * @return {String}
 */
export function formatTime (isoTime:string) {
  const date = new Date(isoTime)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 月份从0开始，需要加1
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

/**
 * 格式化时间
 *
 * @param {string} isoTime
 * @return {String}
 */
export function formattedTimeDisplay (isoTime:string) {
  const now = new Date()
  const pastTime = new Date(isoTime)
  const timeDifference = (now - pastTime) / 1000 / 60 // 计算时间差（分钟）

  if (timeDifference > 0 && timeDifference < 5) {
    return '刚刚'
  } else if (timeDifference < 30) {
    return `${Math.floor(timeDifference)} 分钟前`
  } else {
    // 格式化原始时间为可读格式
    const year = pastTime.getFullYear()
    const month = String(pastTime.getMonth() + 1).padStart(2, '0')
    const day = String(pastTime.getDate()).padStart(2, '0')
    const hours = String(pastTime.getHours()).padStart(2, '0')
    const minutes = String(pastTime.getMinutes()).padStart(2, '0')
    const seconds = String(pastTime.getSeconds()).padStart(2, '0')
    return `${year}-${month}-${day} ${hours}:${minutes}`
  }
}
