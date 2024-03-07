Promise.myAllSettled = function(iterable) {
  let resolve = null, reject = null;
  const p = new Promise(function(res, rej) {
    resolve = res
    reject = rej
  })
  let i = 0
  let resLen = 0
  let rejLen = 0
  let result = []
  for(const item of iterable) {
    const index = i
    i++
    Promise.resolve(item).then(value => {
      resLen++;
      result[index] = {
        status:"fulfilled",
        value
      }
      resLen === i && resolve(result)
    },reason => {
      rejLen++;
      result[index] = {
        status:"rejected",
        reason
      }
      rejLen === i && resolve(result)
    })
  }
  if(i === 0){
    resolve([])
  }
  return p
}

// test 
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("呀屎啦你")
  },2000)
})
const myPromise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("不吃")
  },1000)
})
const result = Promise.allSettled([myPromise,myPromise1])
result.then(res => {
  console.log("success",res)
}, err => {
  console.log("err",err)
})