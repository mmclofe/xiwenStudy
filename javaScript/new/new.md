1、创建一个空对象newInstance
2、如果构造函数的prototype是一个对象，则将newInstance的[[prototype]]指向构造函数的prototype,否则newInstance将保持为一个普通对象，其[[prototype]]为Object.prototype
3、使用给定参数执行构造函数，并将this引用指向绑定到newInstance
4、如果构造函数返回非原始值，则该返回值成为整个new表达式的结果，否则返回newInstance