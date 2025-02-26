// OmitThisParameter<Type>
// Removes the this parameter from Type. If Type has no explicitly declared this parameter, 
// the result is simply Type. Otherwise, a new function type with no this parameter is created from Type.
// Generics are erased and only the last overload signature is propagated into the new function type.
// OmitThisParameter<Type> 对于没有定义this参数类型的函数类型，直接返回这个函数类型，如果定义了this参数类型，就返回一个仅是去掉了this参数类型的新函数类型。

type MyOmitThisParameter<T> = unknown extends ThisParameterType<T> ? T : 
T extends (...args: infer A) => infer R ? (...args: A) => R : T;