function throttle(fn,wait=300){
  let timer = null
  return function(...args) {
    if(timer) {return}
    setTimeout(() => {
      fn.apply(this,args)
      timer = null
    },wait)
  }
}