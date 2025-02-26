// ConstructorParameters<Type>
// Constructs a tuple or array type from the types of a constructor function type. 
// It produces a tuple type with all the parameter types (or the type never if Type is not a function).
// ConstructorParameters 可以用来获取构造函数的构造参数
type MyConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer P) => any ? P : never;

// test
type T0 = MyConstructorParameters<ErrorConstructor>;