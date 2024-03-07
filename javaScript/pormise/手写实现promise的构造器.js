const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise{
  #state = PENDING;
  #result = undefined;
  constructor(executor){
    // 定义resolve方法和reject方法不能放在外面原型上，那样方法内部的this指向有问题，this指向应指向MyPromise内部
    const resolve = (data) => {
      this.#changeState(FULFILLED, data)
    }
    const reject = (data) => {
      this.#changeState(REJECTED, data)
    }
    try {// promise方法里面throw一个错误直接reject处理错误信息
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
    console.log(this.#state,this.#result)
  }
}

const p = new MyPromise((resolve,reject) => {
  resolve(1213)
})
