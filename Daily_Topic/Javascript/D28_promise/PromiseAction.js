// 定义常量
const PENDING = "PENDING"
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
    }
  }

  //更改成功的状态
  resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED
      this.value = value
    }
  }
}
