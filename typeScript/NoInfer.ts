// NoInfer<Type>
// Blocks inferences to the contained type. Other than blocking inferences, 
// NoInfer<Type> is identical to Type.
// NoInfer<Type> 类型用于防止类型被自动推断。也就是说，在某些地方（通常是函数泛型等），如果不希望该处的类型被自动推断，就可以使用。


type MyNoInfer<T> =  T extends infer U ? U : never;
// test
function createStreetLight<C extends string>(
  colors: C[],
  defaultColor?: MyNoInfer<C>,
) {
  // ...
}
createStreetLight(["red", "yellow", "green"], "red");  // OK
createStreetLight(["red", "yellow", "green"], "blue");  // Error