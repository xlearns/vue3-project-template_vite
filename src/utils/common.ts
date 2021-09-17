// 将时间戳转换为日期格式
export const formatter = (date: any) => {
  return new Date(date).toLocaleString("chinese", {
    hour12: false,
  })
}
//防抖
export const debounce = (el: any, binding: any) => {
  let [fn, event = "click", time = 300] = binding.value
  let timer: any
  el.addEventListener(event, () => {
    timer && clearTimeout(timer)
    timer = setTimeout(() => fn(), time)
  })
}
//节流
export const throttle = (el: any, binding: any) => {
  let [fn, event = "click", time = 300] = binding.value
  let timer: any, timer_end: any
  el.addEventListener(event, () => {
    if (timer) {
      clearTimeout(timer_end)
      return (timer_end = setTimeout(() => fn(), time))
    }
    fn()
    timer = setTimeout(() => (timer = null), time)
  })
}
