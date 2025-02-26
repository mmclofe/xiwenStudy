// ThisParameterType<Type>
// Extracts the type of the this parameter for a function type, 
// or unknown if the function type has no this parameter.
// ThisParameterType<Type> 提取一个函数类型显式定义的this参数，如果没有显式定义的this参数，则返回unknown。
// 这里有如下几个需要注意的点：
// this参数只能叫this，且必须在参数列表的第一个位置
// this必须是显式定义的
// 这个this参数在函数实际被调用的时候不存在，不需要显式作为参数传入，而是通过call、apply或者是bind等方法指定
type MyThisParameterType<T> = T extends (this: infer U, ...args: never) => any ? U : unknown;

// test
function toHex(this: Number) {
  return this.toString(16);
}
function numberToString(n: MyThisParameterType<typeof toHex>) {
  return toHex.apply(n);
}