
Promise.reject = function(value){
  return new Promise((resolve, reject) =>{// 返回一个已拒绝（rejected）的 Promise 对象，拒绝原因为给定的参数。
    reject(value)
  })
}