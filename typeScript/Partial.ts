// Partial<Type>
// Constructs a type with all properties of Type set to optional. 
// This utility will return a type that represents all subsets of a given type.
// Partial<Type> 会可把定义好的对象（包含 必选+可选项）类型全部转化为可选项

type MyPartial<T> = {
  [P in keyof T]?: T[P];
}