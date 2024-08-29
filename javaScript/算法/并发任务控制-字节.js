// 完成构造函数superTask，使其实现以下代码输出
function timeout(time) {
 return new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve()
  }, time)
 })
}
class SuperTask{
  constructor(max=2){
    this.taskQueue = []// 任务队列
    this.runTaskCount = 0// 正在执行任务的个数
    this.max = max //任务队列执行的任务的最大数量
  }
  add(taskFn){
    return new Promise((resolve, reject) => {
      this.taskQueue.push({taskFn, resolve, reject})
      this.#run()
    })
  }
  #run(){
    if(this.runTaskCount < this.max && this.taskQueue.length){
      const {taskFn, resolve, reject} = this.taskQueue.shift()
      this.runTaskCount++
      // 避免不是promise对象的情况，用Promise.resolve包裹一下
      Promise.resolve(taskFn()).then(resolve, reject).finally(() =>{
        this.runTaskCount--
        this.#run()
      })
    }
  }
}

const superTask = new SuperTask()
function addTask(time,name){
  superTask.add(() => timeout(time)).then(() => {
    console.log(`任务${name}完成`)
  })
}

addTask(10000,1)// 10000ms后输出：任务1完成
addTask(5000,2)// 5000ms后输出：任务2完成
addTask(3000,3)// 8000ms后输出：任务3完成
addTask(4000,4)// 12000ms后输出：任务4完成
addTask(5000,5)// 15000ms后输出：任务5完成
