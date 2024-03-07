// 寄生组合继承
// 优点：
//     1、原型属性不会被共享
//     2、可以继承父类的原型链上的属性和方法
//     3、只调用了1次父类，因此它不会在子类的prototype上添加父类的属性和方法
// 缺点： 子类的prototype上的属性和方法会丢失


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
// 将子类的原型直接设置为父类的原型，保证子类的原型跟父类的原型一样。与原型继承不同的是子类原型上没有了父类实例的属性和方法
Child.prototype = Object.create(Parent.prototype)
// 添加构造函数的指向
Child.prototype.constructor = Child
var child1 = new Child()
var child2 = new Child()
console.log("child1与child2是否相等", child1.color === child2.color)

// 改变实例1的color
child1.color.pop()
console.log(child1.color,child2.color)


// 子类实例获取父类原型上属性
console.log(child1.a,child2.a)


// 获取子类的原型和实例上的属性和方法
console.log('子类原型上的属性：',child1.__proto__)
console.log('子类实例上的属性：',child1)