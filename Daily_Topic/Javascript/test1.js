// const root = {
//   key: "A1",
//   children: [
//     {
//       key: "B1",
//       children: [
//         {
//           key: "C1",
//           children: [],
//         },
//         {
//           key: "C2",
//           children: [],
//         },
//       ],
//     },
//     {
//       key: "B2",
//       children: [
//         {
//           key: "C3",
//           children: [],
//         },
//         {
//           key: "C4",
//           children: [],
//         },
//       ],
//     },
//   ],
// }
// const walk = (dom) => {
//   console.log(dom.key)
//   dom.children.forEach((child) => walk(child))
// }
// walk(root)

// function deepClone(target, map = new WeakMap()) {
//   if (target === null) return target
//   if (typeof target !== "object") return target
//   if (target instanceof Date) return new Date(target)
//   if (target instanceof RegExp) return new RegExp(target)
//   if (map.get(target)) return map.get(target)
//   let cloneObj = new target.constructor()
//   map.set(target, cloneObj)
//   for (let k in target) {
//     if (target.hasOwnProperty(k)) {
//       cloneObj[k] = deepClone(target[k], map)
//     }
//   }
//   return cloneObj
// }

// let obj = { name: 1, address: { x: 100 } }
// // obj.o = obj // 对象存在循环引用的情况
// let d = deepClone(obj)
// // obj.address.x = 200
// console.log(d)

// function myInstanceOf(left, right) {
//   let proto = Object.getPrototypeOf(left)
//   let prototype = right.prototype

//   while (true) {
//     if (!proto) return false
//     if (proto === prototype) return true
//     proto = Object.getPrototypeOf(proto)
//   }
// }

// console.log(myInstanceOf(2, Number))
// console.log(myInstanceOf("lqy", String))
// console.log(myInstanceOf(12, String))

// const [a, b] = [1, 2, 3]
// console.log("a", a)
// console.log("b", b)

// const { name, age } = { name: "lqy", age: 22 }
// console.log("name", name)
// console.log("age", age)

// let oldPush = Array.prototype.push

// function push(...args) {
//   console.log(this)
//   console.log("数据更新")
//   oldPush.call(this, ...args)
// }

// const arr = [1, 2, 3]
// push.call(arr, 4, 5)
// console.log(arr)

// const p1 = {
//   name: "lqy",
// }
// const p2 = p1

// console.log(Object.is(p1, p2))

//防抖
// function debouncd(func, content) {
//   let timer
//   retrun function() {
//     const that = this
//     let args = arguments
//     if(timer) clearTimeout(timer)
//     timer = setTimeout(() => {
//       func.apply(that,args)
//     }, content)
//   }
// }

// 节流
// function throttle(func, content) {
//   let timer
//   return function () {
//     let _this = this
//     let args = arguments
//     if (!timer) {
//       timer = setTimeout(() => {
//         timer = null
//         func.apply(_this, args)
//       }, content)
//     }
//   }
// }

// const arr = [1, 2, 3, [4, [5, [6]]]]
// const flatten = (arr) => {
//   return arr.reduce((pre, crr) => {
//     return pre.concat(Array.isArray(crr) ? flatten(crr) : crr)
//   }, [])
// }

// let result = flatten(arr)
// console.log(result)

//递归

// let result = []
// const flatten = (arr) => {
//   for (let i = 0; i < arr.length; i++) {
//     if (Array.isArray(arr[i])) {
//       flatten(arr[i])
//     } else {
//       result.push(arr[i])
//     }
//   }
// }
// flatten(arr)
// console.log(result)

//手写call
// const p = { name: "lqy" }

// Function.prototype.call2 = function (context, ...args) {
//   // if (typeof this !== "function") {
//   //   throw new TypeError("Type Error")
//   // }
//   const content = context || window
//   const fn = Symbol("fn")
//   content.fn = this

//   const res = eval(`content.fn(...args)`)
//   delete content.fn
//   return res
// }

// const test = (args) => {
//   console.log(this, args)
// }
// test.call2(p, 1, 2, 3)

// Function.prototype.call = function (content = window, ...args) {
//   if (typeof this !== "function") {
//     throw new TypeError("类型错误")
//   }
//   const fn = Symbol("fn")
//   content[fn] = this
//   const res = content[fn](...args)
//   delete content[fn]
//   return res
// }
// new的操作
// function Person(name, age) {
//   this.name = name
//   this.age = age
// }

// function myNew(ori, ...args) {
//   const obj = Object.create(ori.prototype)
//   const res = ori.apply(obj, args)

//   const isObject = typeof res === "object" && res !== null
//   const isFunction = typeof res === "function"
//   return isObject || isFunction ? res : obj
// }

// const p = myNew(Person, "lqy", 22)
// console.log(p)

//instanceOf
//用于判断构造函数是否出现在某个某个实例的原型链上
// const myInstanceOf = (left, right) => {
//   if (typeof left !== "object") return false
//   const proto = Object.getPrototypeOf(left)
//   while (true) {
//     if (proto === null) return false
//     if (proto === right.prototype) return true
//     proto = Object.getPrototypeOf(proto)
//   }
// }

// console.log(myInstanceOf({ a: 1 }, Object))

//浅拷贝 手写实现
// const shallowClone = (target) => {
//   if (typeof target === "object" && target !== null) {
//     const result = Array.isArray(target) ? [] : {}
//     for (let key in target) {
//       if (target.hasOwnProperty(key)) {
//         result[key] = target[key]
//       }
//     }
//     return result
//   } else {
//     return target
//   }
// }

// new
// const muNew = (content, ...args) => {
//   const obj = Object.create(content.prototype)
//   const res = content.apply(obj, args)

//   const isObject = typeof res === "object" && res !== null
//   const isFunction = typeof res === "Function"

//   return isObject || isFunction ? res : obj
// }

//bind
// Function.prototype.bind2 = function (context) {
//   if (typeof this !== "function") {
//     throw new Error(
//       "Function.prototype.bind - what is trying to be bound is not callable"
//     )
//   }
//   console.log(this)
//   var self = this
//   var args = Array.prototype.slice.call(arguments, 1)
//   console.log(arguments)
//   console.log(args)
//   var fNOP = function () {}

//   var fbound = function () {
//     self.apply(
//       this instanceof self ? this : context,
//       args.concat(Array.prototype.slice.call(arguments))
//     )
//   }

//   fNOP.prototype = this.prototype
//   fbound.prototype = new fNOP()

//   return fbound
// }
// const p = {
//   name: "lqy",
// }

// function test(args) {
//   console.log(this, args)
// }

// test.bind2(p)(123)

//字符串分割
// let str = "iloveyoulqy"
// console.log(str.split(""))
// console.log(str.join(" "))

var arr = [{ a: 1 }, {}]
arr.forEach(function (item, idx) {
  item.b = idx
});

console.log(arr)