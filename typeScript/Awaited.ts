// Awaited<Type>
// This type is meant to model operations like await in async functions, 
// and is used for the .then() method on Promises - specifically, 
// the way that they recursively unwrap Promises.
// Awaited<Type> 旨在模拟函数await中的操作async，或 s.then()上的方法——特别是它们递归解包Promise的方式。
type MyAwaited<T extends Promise<unknown>> = T extends Promise<infer U> ? 
(U extends Promise<unknown> ? MyAwaited<U> : U) : never

// test
const promise1 = Promise.resolve(Promise.resolve("1"));
type cc = MyAwaited<typeof promise1>