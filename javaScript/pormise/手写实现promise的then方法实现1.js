// 处理then方法的执行逻辑，未处理then方法的返回值promise对象的相关逻辑，即then的链式调用
// 1、then方法肯呢个被多次调用
// 2、then方法执行机制得考虑异步情况
// 3、then方法返回一个新的promise对象

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise{
  #state = PENDING;
  #result = undefined;
  #handler = [];// 记录then方法传参数组，为什么定义数组？因为一个promise实例对象可能调用多次then方法，需要将每次调用then方法的入参回调函数记录下来
  constructor(executor){
    const resolve = (data) => {
      this.#changeState(FULFILLED, data)
    }
    const reject = (data) => {
      this.#changeState(REJECTED, data)
    }
    try {
      executor(resolve,reject)
    } catch (error) {
      reject(error)
    }
  }
  // 定义改变promise状态的方法
  #changeState (state, result){
    if(this.#state !== PENDING) return
    this.#state = state;
    this.#result = result;
    console.log(this.#state)
    this.#run()
  }
  #run(){// 公用的方法，用于then方法传参的回调函数执行
    if(this.#state === PENDING) return // 判断当前状态是pending状态，则不执行then传入的回调参数（处理异步任务）
    while(this.#handler.length){
      const {onFulfilled, onRejected, resolve, reject} = this.#handler.shift();// 每次弹出数组第一个来执行
      if(this.#state === FULFILLED){
        if(typeof onFulfilled === 'function'){
          onFulfilled(this.#result)
        }
      }else if(this.#state === REJECTED){
        if(typeof onRejected === 'function'){
          onRejected(this.#result)
        }
      }
    }
  }
  // then方法实现
  then(onFulfilled, onRejected){
    return new MyPromise((resolve,reject) => {// then方法需返回一个新的promise对象
      this.#handler.push({
        onFulfilled,
        onRejected,
        resolve,
        reject,
      })
      this.#run()
    })
  }
}

// test
const p = new MyPromise((resolve,reject) => {
  setTimeout(() => {
    reject("失败")
  }, 2000)
})
p.then((res) => {
  console.log("resolve",res)
},(rej) => {
  console.log("reject",rej)
})
p.then((res) => {
  console.log("resolve1",res)
},(rej) => {
  console.log("reject1",rej)
})

// const p1 = new Promise((resolve,reject) => {
//   resolve(1)
// })
// p1.then((res) => {
//   console.log(res)
// })