const handler = {
  get: function (obj, prop, receiver) {
    console.log("读取",receiver)
    return prop in obj ? obj[prop] : "没有该属性";
  },
  set: function (obj, prop, value, receiver) {
    if(obj[prop] !== value){
      console.log("改变")
      obj[prop] = value
    }
    return true // 设置成功
  }
};

const p = new Proxy({}, handler);
p.a = 1;
console.log(p.a)