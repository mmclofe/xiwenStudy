// Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的方法(可以直接调用对象的基本操作)。这些方法与 proxy handler (en-US) 的方法相同。Reflect 不是一个函数对象，因此它是不可构造的。

// const obj = {}
// obj.a = 1// 调用对象的[SET]
// Reflect.set(obj, 'a', 2)// 调用对象的[SET]
// obj.a // [GET]

// const obj = {
//   a:1,
//   b:2,
//   get c(){// getter的语法糖
//     return this.a + this.b;
//   }
// }
// // console.log(obj.c)
// const arr = {a:3,b:4}
// console.log(Reflect.get(obj, 'c', arr)) // get方法内部的this指向obj


const obj = {
  a:1,
  b:2,
  get c(){// getter的语法糖
    return this.a + this.b;
  }
}
const proxy = new Proxy(obj,{
  get(target,key){
    console.log('read',key)
    // return target[key]// 读C的时候 c的getter函数里面的this指向obj，读obj的a和b属性不会触发代理对象的get方法
    return Reflect.get(target, key, proxy)// 读C的时候 c的getter函数里面的this指向proxy对象，读proxy的a和b属性触发代理对象的get方法
  }
})
proxy.c