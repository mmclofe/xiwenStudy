const handler = {
  get: function (obj, prop, receiver) {
    console.log("读取",obj,prop,receiver)
    return prop in obj ? obj[prop] : "没有该属性";
  },
  set: function (obj, prop, value, receiver) {
    if(obj[prop] !== value){
      console.log("改变",obj, prop)
      obj[prop] = value
    }
    return true // 设置成功
  }
};
const a = { b:"1",c:{d:"2",e:"3"}}
const p = new Proxy(a, handler);
// proxy不能深层代理
// console.log(p.c.d)
p.c.d = 3