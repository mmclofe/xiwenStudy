// 组合继承
//介绍：通过原型链方式+构造函数方式实现继承
//优点：原型属性不会被共享；可以继承父类的原型链上的属性和方法
//缺点：继承过程中调用了两次父类，并在子类的prototype重复添加了父类的属性和方法


// 父类
function Parent(){
  this.color = ['蓝色','绿色']
  this.sayHello = function(){
    console.log("Hello")
  }
}
Parent.prototype.a = "我是父类prototype上的属性"

// 子类
function Child(){
  // 构造函数继承
  Parent.call(this)
}
// 原型链继承
Child.prototype = new Parent()
var child1 = new Child()
var child2 = new Child()
console.log("child1与child2是否相等", child1.color === child2.color)

// 改变实例1的color
child1.color.pop()
console.log(child1.color,child2.color)


// 子类实例获取父类原型上属性
console.log(child1.a,child2.a)

// 获取子类的原型，可以看到重复实例上的属性和原型上的属性重复了
console.log('子类原型上的属性：',child1.__proto__)
console.log('子类实例上的属性：',child1)