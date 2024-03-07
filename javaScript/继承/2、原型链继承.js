
//原型链继承
// 介绍：通过设置子类构造函数的prototype为父类的实例，利用原型链的特性来继承父类
// 优点：子类可以继承父类的所有属性（包含原型上的属性）、
// 缺点：父类引用类型的值会被所有实例共享，换而言之，一个实例改变了该属性，其他实例的该属性也会被改变

// 父类
function Parent(){
  this.name = "Parent";
  this.color = ['蓝色','绿色']
}
Parent.prototype.getName = function(){
  console.log(this.name)
  console.log(this.color)
}

// 定义子类
function Child(name){
  this.name = name;
}

// 子类继承父类
Child.prototype = new Parent();

// 初始化实例1
var childInstance1 = new Child('Child1');
// 初始化实例2
var childInstance2 = new Child('Child2');

childInstance1.color.pop()// 只改变了实例一的color
childInstance1.getName()
console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
childInstance2.getName()// 确改变了实例二的color