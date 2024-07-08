//构造函数继承
//介绍：通过使用call或apply方法，我们可以在子类中执行父类型构造函数，从而实现继承
//优点：父类属性值是引用数据也不会被所有子类实例共享
//缺点：子类不能继承父类的prototype上的属性


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
  Parent.call(this)
}
Child.prototype.b = "我是子类prototype上的属性"
var child1 = new Child()
var child2 = new Child()
console.log("child1与child2是否相等", child1.color === child2.color)

// 改变实例1的color
child1.color.pop()
console.log(child1.color,child2.color)
console.log("child1的原型", child1.b)