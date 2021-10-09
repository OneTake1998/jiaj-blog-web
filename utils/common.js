/**
 * @desc 防抖函数
 * @param {需要防抖的函数} func
 * @param {延迟时间} wait
 * @param {是否立即执行} immediate
 */
 export function debounce(func, wait, immediate) {
    let timeout
    
    return function(...args) {
      let context = this
      if (timeout) clearTimeout(timeout)
  
      if (immediate) {
        let callNow = !timeout
        timeout = setTimeout(function() {
          timeout = null
        }, wait)
        if (callNow) func.apply(context, args)
      } else {
        timeout = setTimeout(function() {
          func.apply(context, args)
        }, wait)
      }
    }
  }
  