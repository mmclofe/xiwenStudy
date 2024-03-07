/**
 * 手写call
 * @param {*} context  
 * @param  {...any} args 
 */
Function.prototype.myCall = function(context, ...args) {
  context = context === undefined || null ? globalThis : Object(context)
  const key = Symbol()
  Object.defineProperty(context, key, {
    value:this,
    enumerable:false,
  })
  const r = context[key](...args)
  return r
}

function method(a,b){
  console.log('arg1',a,b);
  console.log(this);
  return this.c + a + b
}
const val = method.myCall({c:1},2,3)
console.log(val)