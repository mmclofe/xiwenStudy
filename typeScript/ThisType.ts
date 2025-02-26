// ThisType<Type>
// This utility does not return a transformed type. Instead, it serves as a marker for a contextual this type. 
// Note that the noImplicitThis flag must be enabled to use this utility.
// ThisType<Type> 用于标记上下文的this类型，注意必须开启noImplicitThis标志才能使用
interface MyThisType<T>{
} 

// test
type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>; // Type of 'this' in methods is D & M
};
 
function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {};
  let methods: object = desc.methods || {};
  return { ...data, ...methods } as D & M;
}
 
let obj = makeObject({
  data: { x: 0, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx; // Strongly typed this
      this.y += dy; // Strongly typed this
    },
  },
});
 
obj.x = 10;
obj.y = 20;
obj.moveBy(5, 5);