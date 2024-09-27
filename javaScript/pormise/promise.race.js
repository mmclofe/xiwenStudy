Promise.myRace= function(iterable) {
  let resolve = null, reject = null;
  const p = new Promise(function(res, rej) {
    resolve = res
    reject = rej
  })
  let i = 0
  for(const item of iterable) {
    i++
    Promise.resolve(item).then(resolve,reject)
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
const result = Promise.myRace([])
result.then(res => {
  console.log("success",res)
}, err => {
  console.log("err",err)
})
