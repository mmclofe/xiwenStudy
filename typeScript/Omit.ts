// Omit<Type, Keys>
// Constructs a type by picking all properties from Type and then removing Keys (string literal or union of string literals). 
// The opposite of Pick.
// Omit<Type, Keys> 会从Type中剔除已定义对象中自己不需要的一部分形成新的定义类型。

type MyOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K >>

// test 
interface Todo { 
  title: string 
  description: string 
  completed: boolean 
} 

type TodoPreview = MyOmit<Todo, 'description'>