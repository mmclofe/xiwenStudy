/**
 * 手写apply
 * @param {*} context  
 * @param  {...any} args 
 */
Function.prototype.myApply = function(context) {
  context = context === undefined || null ? globalThis : Object(context)
  const key = Symbol()
  context[key] = this
  const args = arguments[1]
  let r = null
  if(args){
    r = context[key](...args)
  }else{
    r = context[key]()
  }
  delete context.key
  return r
}

function method(a,b){
  console.log('arg1',a,b);
  console.log(this);
  return this.c + a + b
}
const val = method.myApply({c:1},[1,2])
console.log(val)