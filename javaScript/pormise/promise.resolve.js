function isPromiseLike(value){
  return value && typeof value.then === 'function'
}

Promise.resolve = function(value) {
  if(value instanceof Promise) return value // 如果Value是一个官方Promise直接返回
  if(isPromiseLike(value)){
    return new Promise((resolve, reject) => {// 如果该值是一个 thenable 对象，Promise.resolve() 将调用其 then() 方法及其两个回调函数
      value.then(resolve, reject)
    })
  }
  return new Promise((resolve, reject) =>{// 否则返回的 Promise 将会以该值兑现。
    resolve(value)
  })
}