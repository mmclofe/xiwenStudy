Function.prototype.myBind = function(ctx,...args) {
  const fn = this
  return function(...subArgs) {
    const allArgs = [...args, ...subArgs]
    if(new.target){// 通过new 操作符调用该函数时
      return new fn(...allArgs)
    }else{
      return fn.apply(ctx, allArgs);
    }
  }
}

function fn(a,b,c,d){
  console.log('fn called');
  console.log('args:',a,b,c,d);
  console.log('this',this);
  return 123
}
const newFn = fn.myBind('ctx',1,2)
console.log(new newFn(3,4))

console.log(fn(1,2,3,4))
