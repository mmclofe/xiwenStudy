// Readonly<Type>
// Constructs a type with all properties of Type set to readonly. 
// T meaning the properties of the constructed type cannot be reassigned.
// Readonly<Type> 会把定义好的对象（包含 必选+可选项）类型全部转化为只读

type myReadonly<T> = {
  readonly [P in keyof T]: T[P]
}