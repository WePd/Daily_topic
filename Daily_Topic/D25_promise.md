### promise

ES6新增的引用类型promise，可以通过new操作符来实例化

#### promise基础

1. promise状态
- 待定`(pendig): promise`的初始状态
- 兑现`(fulfilled, 也可以用resolved)` 
- 拒绝`(rejected)`

promise的状态是私有的，不能直接通过JS检测到。这主要是为了避免根据读取到的期约状态，以同步方式处理期约对象。另外，期约的状态也不能被外部JavaScript代码修改。这与不能读取该状态的原因是一样的：期约故意将异步行为封装起来，从而隔离外部的同步代码

`promise`的用途：
- 抽象的表示一个异步操作， promise的状态代表期约是否完成
- 期约封装的异步操作会实际生成某个值，而程序期待期约状态改变时可以访问这个值

为了支持这两种用法， 只要promise的状态切换为`resolved`,就会有一个内部的私有值；若是切换为`rejected`，就会有一私有的内部理由。 在`promise`执行到某个状态的时候，相应的异步代码会收到这个值。


#### 通过执行函数控制promise的状态
promise的状态是私有的，所以内部操作是在`promise`的执行器函数中执行的。
控制期约状态转换是通过调用它的两个参数实现的， 
- `resolve()` 会把状态切换为resolved
- `reject()` 会把状态切换为rejected,同时调用它也会抛出错误

**有个地方要注意，执行器函数是同步执行的** ，但是可以通过setTimeout可以推迟切换状态
无论是调用resolve()还是reject()中的那个被调用， 状态转换都是不可撤销的
```js
let p2 = new Promise((reslove, reject) => {
  resolve()
  reject()// 是不会起作用的
})

setTimeout(console.log, 0, p2) //Promise <resolved>
```