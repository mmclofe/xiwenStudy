// Required<Type>
// Constructs a type consisting of all properties of Type set to required. 
// The opposite of Partial.
// Required<Type> 和 Partial刚好相反,可把定义好的对象（包含 必选+可选项）类型全部转化为 必选项

type MyRequired<T> = {
  [p in keyof T]-?: T[p];
}