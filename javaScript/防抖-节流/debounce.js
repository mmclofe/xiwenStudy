function debounce(fn,wait=300){
  let timer = null
  return function(...args) {
    clearTimeout(timer)
    setTimeout(() => {
      fn.apply(this,args)
      timer = null
    },wait)
  }
}