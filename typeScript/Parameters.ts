// Parameters<T>
// 获取函数的参数类型

type MyParameter<T> = T extends (...args: infer P) => void ? P : never

//test
const fn = (a: number, b: string) => {}
type P = MyParameter<typeof fn>