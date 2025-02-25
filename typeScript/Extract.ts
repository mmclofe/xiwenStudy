// Extract<Type, Union>
// Constructs a type by extracting from Type those types that are assignable to Union.
// Extract<Type, Union> 会从Type中选取可以赋值给Union的成员，返回一个新的类型

type MyExtract<T, U> = T extends U ? T : never;

// test
type Result1 = MyExtract<'a' | 'b' | 'c', 'a' | 'f'>