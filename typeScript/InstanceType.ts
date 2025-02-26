// InstanceType<Type>
// Constructs a type consisting of the instance type of a constructor function in Type.
// InstanceType<Type> 会从Type中选取构造函数的实例类型，返回一个新的类型

type MyInstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;

// test
class C {
  x = 0;
  y = 0;
}
 
type T8 = MyInstanceType<typeof C>;
type T7 = MyInstanceType<never>;