// ReturnType<T>
// Constructs a type consisting of the return type of function Type.
//For overloaded functions, this will be the return type of the last signature; see Inferring Within Conditional Types.
// ReturnType<T> 会从函数类型T中选取返回值，返回一个新的类型

type MyReturnType<T extends (...args:any) => any> = T extends (...args:any) => infer R ? R : any

// test
function add(a: number, b: number): number {
  return a + b
}

type Result = MyReturnType<typeof add>