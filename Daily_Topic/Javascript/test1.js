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

let oldPush = Array.prototype.push

function push(...args) {
  console.log(this)
  console.log("数据更新")
  oldPush.call(this, ...args)
}

const arr = [1, 2, 3]
push.call(arr, 4, 5)
console.log(arr)
