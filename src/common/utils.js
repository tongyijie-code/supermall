export function debounce(func, delay=200) {
  let timer = null
  return function (...args) {
    if (timer) clearInterval(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    },delay)
  }
}
