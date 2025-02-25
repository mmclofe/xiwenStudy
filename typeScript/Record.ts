// Record<Keys, Type>
// Constructs an object type whose property keys are Keys and whose property values are Type. 
// This utility can be used to map the properties of a type to another type.
// Record<Keys, Type> 构造一个对象类型，Keys 表示对象的属性键 、Type 表示对象的属性值，用于将一种类型属性映射到另一种类型

type MyRecord<Keys extends keyof any, Type> = {
  [k in Keys] : Type
}

// test
type state = "created" | "submitted" | "removed"
interface StatesInterface {
  created:string
  submitted:string
  removed:string
}
type States = MyRecord<state, StatesInterface>