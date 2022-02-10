// 定义常量
const PENDING = "pending"
const FULFILLED = "fulfilled"
const REJECTED = "rejected"

class MyPormise {
  constructor(executor) {
    executor(this.resolve, this.reject)
  }
  //使用箭头函数使this指向实例对象， 在react类组件中也是
  //更改成功

  //存储状态的变量， 初始值为pending
  status = PENDING

  // 成功之后的值
  value = null
  // 失败之后的原因
  reason = null

  // 更改失败
  reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED
      this.reason = reason
      //判断是否有失败回调，有的话就调用
      // this.onRejectedCallback && this.onRejectedCallback(reason)
      while (this.onRejectedCallback.length) {
        this.onRejectedCallback.shift()(reason)
      }
      u
    }
  }

  //更改成功的状态
  resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED
      this.value = value
      //判断是否又成功回调，又的话就调用
      // this.onFulfilledCallback && this.onFulfilledCallback(value)
      while (this.onFulfilledCallback.length) {
        this.onFulfilledCallback.shift()(value)
      }
    }
  }

  // then
  then(onFulfilled, onRejected) {
    const promise2 = new MyPormise((resolve, reject) => {
      if (this.status === FULFILLED) {
        const x = onFulfilled(this.value)
        resolvePermison(x, resolve, reject)
      } else if (this.status === REJECTED) {
        onRejected(this.reason)
      } else if (this.status === PENDING) {
        //不知道pending之后的状态，先将成功和失败回调存储起来
        this.onFulfilledCallback.push(onFulfilled)
        this.onRejectedCallback.push(onRejected)
      }
    })
    return promise2
  }
  // console.log('---------------------------------------------------');
  //以上只是简单的完成了promise，但是还没有解决异步操作的问题
  //异步的状态为pending，但是在then中并没有判定

  // 存储成功回调函数
  // onFulfilledCallback = null
  onFulfilledCallback = []
  // 存储失败回调函数
  // onRejectedCallback = null
  onRejectedCallback = []
}
function resolvePermison(x, resolve, reject) {
  if (x instanceof MyPormise) {
    x.then(resolve, reject)
  } else {
    resolve(x)
  }
}

module.exports = MyPormise
