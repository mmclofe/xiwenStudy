Promise.myAny= function(iterable) {
  let resolve = null, reject = null;
  const p = new Promise(function(res, rej) {
    resolve = res
    reject = rej
  })
  let i = 0
  let rejLen = 0
  let result = []
  for(const item of iterable) {
    const index = i
    i++
    Promise.resolve(item).then(res => {
      resolve(res)
    },rej => {
      rejLen++;
      result[index] = rej
      if(rejLen === i){
        const resultObj = new AggregateError(result,"All promises were rejected")
        reject(resultObj)
      }
    })
  }
  if(i === 0){
    resolve([])
  }
  return p
}


// test
const promise1 = Promise.reject(0);
const promise2 = new Promise((resolve,reject) => setTimeout(reject, 100, 'quick'));
const promise3 = new Promise((resolve,reject) => setTimeout(reject, 500, 'slow'));
const result = Promise.myAny([promise1, promise2, promise3])
result.then(res => {
  console.log("success",res)
}, err => {
  console.log("err",err)
})