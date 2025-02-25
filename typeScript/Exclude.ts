// Exclude<UnionType, ExcludedMembers>
// Constructs a type by excluding from UnionType all union members that are assignable to ExcludedMembers.
// Exclude<UnionType, ExcludedMembers> 用于处理联合类型，会从UnionType中剔除所有可以赋值给ExcludedMembers的成员

type MyExclude<T, U> = T extends U ? never : T

// test
type Result = MyExclude<'a' | 'b' | 'c', 'a'>