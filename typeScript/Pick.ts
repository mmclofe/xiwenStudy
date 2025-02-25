// Pick<Type, Keys>
// Constructs a type by picking the set of properties Keys (string literal or union of string literals) from Type
// Pick<Type, Keys> 会从Type中选取Keys中的属性，返回一个新的类型

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
}