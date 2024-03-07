function _new(fn,...args) {
  // 创建一个空对象，将空对象的原型指导fn构造函数的原型
  // let obj = {};
  // obj.__proto__ = fn.prototype
  // 上面代码等价于下面的代码
  const obj = Object.create(fn.prototype);
  // 绑定this指向到新对象
  const r = fn.apply(obj,args)
  // 如果构造函数返回非原始值，则改返回值成为整个new表达式的结果，否则返回新对象
  return r && typeof r === 'object' ? r : obj
}
function test(name,age){
  this.name = name
  this.age = age
}
test.prototype.say = function(){
  return this.name + ':' + this.age
}
const instanceObj = _new(test,'希文',29)
console.log(instanceObj.say())