// 这儿处理then方法的返回值promise对象的相关逻辑，处理then的链式调用
// 注意点：1、promise的then方法传参可能不是函数，then方法返回的promise对象resolve、reject与上一个promise返回结果一样
// 2、promise的then方法传参是函数，该函数并且有返回值（不是promise对象），then方法返回的promise对象resolve、reject与函数执行过程中有没有报错有关，报错则reject错误，反之则resolve函数的返回值
// 3、promise的then方法传参是函数，该函数并且有返回值（是promise对象），then方法返回的promise对象resolve、reject与 函数返回promise对象执行结果一致
// 4、promise的then方法传参是函数执行过程中可能报错，报错则直接reject
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
  #runMicrotask(callBack){//模拟微队列，把函数放到微队列里面执行
    if(process && process.nextTick){// node环境
      process.nextTick(callBack)
    }else if(typeof queueMicrotask === 'function'){// 浏览器环境
      queueMicrotask(callBack)
    }else if(typeof MutationObserver === 'function'){// 浏览器环境
      const observer = new MutationObserver(function(){
        callBack()
      })
      const text = document.createTextNode("1")
      observer.observe(text)
      text.data = "2"
    }else{
      setTimeout(callBack,0)
    }
  }
  #isPromiseLike(value){// 判断是不是promise
    return value && typeof value.then === 'function';
  }
  // 定义改变promise状态的方法
  #changeState (state, result){
    if(this.#state !== PENDING) return
    this.#state = state;
    this.#result = result;
    this.#run()
  }
  #runOne(callBack, resolve, reject){// 公用方法，用于处理then函数的返回值
    this.#runMicrotask(() => {// then函数执行放在微队列中执行
      if(typeof callBack === 'function'){// then传入的回调是函数
        try {// 检测then传入的回调是函数执行过程中有没有报错，没有报错则resolve回调函数的结果，有报错则reject错误
          const data = callBack(this.#result)
          if(this.#isPromiseLike(data)){// then传入的回调是函数返回值是一个promise, resolve, reject的执行就跟返回的promise执行结果一样
            data.then(resolve,reject)
          }else{
            resolve(data)
          }
        } catch (error) {
          reject(error)
        }
      } else {// then传入的回调不是函数，则发生穿透，回调值跟前一个上一个promise返回结果一样
        const settled = this.#state === FULFILLED ? resolve :reject
        settled(this.#result)
      }
    })
  }
  #run(){// 公用的方法，用于then方法传参的回调函数执行
    if(this.#state === PENDING) return // 判断当前状态是pending状态，则不执行then传入的回调参数（处理异步任务）
    while(this.#handler.length){
      const {onFulfilled, onRejected, resolve, reject} = this.#handler.shift();// 每次弹出数组第一个来执行
      if(this.#state === FULFILLED){
        this.#runOne(onFulfilled, resolve, reject)
      }else if(this.#state === REJECTED){
        this.#runOne(onRejected, resolve, reject)
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
    resolve("我成功了")
  }, 0)
})
setTimeout(() => {
  console.log("我是定时任务")
},0)
p.then((res)=>{
  console.log(`成功-我是第一个then：${res}`)
  return "成功-我是第一个then的返回值"
},(rej)=>{
  console.log(`失败-我是第一个then：${rej}`)
  return "失败-我是第一个then的返回值"
}).then((res)=>{
  console.log(`成功-我是第二个then：${res}`)
},(rej)=>{
  console.log("失败-我是第二个then：",rej)
})
