Promise.myAll = function(iterable){
  return new Promise((resolve, reject) => {
    let i = 0
    let resLen = 0
    let resultArr = []
    for (const item of iterable){
      const index = i
      i++
      const promiseItem = Promise.resolve(item)
      promiseItem.then((res)=>{
        resLen++
        // 注意点返回值其元素顺序与传入的 promise 一致
        // resultArr.push(res)  // 这样不行，顺序是错的
        resultArr[index] = res
        if(resLen === i){
          resolve(resultArr)
        }
      },reject)// 如果给定的 iterable 中的任意 promise 被拒绝。拒绝原因是第一个拒绝的 promise 的拒绝原因。
    }
    if(i === 0){// 如果传入的 iterable 为空。
      resolve([])
    }
  })
}
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("吃屎吧")
  },2000)
})
const result = Promise.myAll([1,myPromise,2])
result.then(res => {
  console.log(res)
}, err => {
  console.log(err)
})