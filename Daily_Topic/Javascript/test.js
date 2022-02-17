// function side(arr) {
//   arr[0] = arr[2]
// }
// function a(a, b, c) {
//   c = 10
//   console.log(arguments)
//   side(arguments)
//   console.log(a)
//   console.log(c)
//   console.log(arguments)
//   return a + b + c
// }
// console.log(a(1, 1, 1))

// var min = Math.min()
// max = Math.max()
// console.log(min, max)
// console.log(min < max)

// var a = 1
// ;(function a() {
//   a = 2
//   console.log(a)
// })()

// for (let i = 0; i < 3; i++) {
//   setTimeout(() => console.log(i), 1);
// }

// for (var i = 0; i < 3; i++) {
//   setTimeout(() => console.log(i), 1)
// }

// const person = { name: "yideng" }

// function sayHi(age) {
//   return `${this.name} is ${age}`
// }
// console.log(sayHi.call(person, 5))
// console.log(sayHi.bind(person, 5)())

// let a = {},
//   b = "0",
//   c = 0
// a[b] = "li"
// a[c] = "q"
// console.log(a[b])
// var a = 0,
//   b = 0
// function A(a) {
//   A = function (b) {
//     alert(a + b++)
//   }
//   alert(a)
// }

// A(1)
// A(2)

// let arr = [
//   { id: 1, name: "部门1", pid: 0 },
//   { id: 2, name: "部门2", pid: 1 },
//   { id: 3, name: "部门3", pid: 1 },
//   { id: 4, name: "部门4", pid: 3 },
//   { id: 5, name: "部门5", pid: 4 },
// ]

// function arrayToTree(items) {
//   //保存结果
//   const result = []
//   // 转化为map
//   const itemMap = {}

//   // 先将数组转化为map
//   for (const item of items) {
//     itemMap[item.id] = { ...item, children: [] }
//   }
//   for (const item of items) {
//     const itemTree = itemMap[item.id]
//     if (item.pid === 0) {
//       result.push(itemTree)
//     } else {
//       if (!itemMap[item.pid]) {
//         itemMap[item.pid] = {
//           children: [],
//         }
//       }
//       itemMap[item.pid].children.push(itemTree)
//     }
//   }
//   return result
// }
// console.log(arrayToTree(arr))

// const p = { name: "lll" }
// let o = Object.create(p)
// // console.log(o.prototype.hasOwnProperty("name"))
// console.log(o.name)

// let al1 = {
//   length: 4,
//   0: 0,
//   1: 1,
//   3: 3,
//   7: 4,
//   5: 5,
// }

// const result = []
// for (let item of al1) {
//   result.push(item)
// }

// console.log(result)

// const arr = [1, [2, 10, [3, [4, 8]]]]
// 扩展符
// function flant(arr) {
//   while (arr.some((item) => Array.isArray(item))) {
//     arr = [].concat(...arr)
//   }
//   return arr
// }

// reduce
// function flant(arr) {
//   return arr.reduce(
//     (pre, cur) => pre.concat(Array.isArray(cur) ? flant(cur) : cur),
//     []
//   )
// }

// console.log(flant(arr))

// class Person {
//   constructor(name, age) {
//     this.name = name
//     this.age = age
//   }
// }
// class p extends Person {
//   constructor(name, age) {
//     super(name, age)
//     this.say = function say() {
//       console.log(new.target)
//     }
//   }
// }

// const p1 = new p("lili", 12)
// console.log(p1)
// p1.say()

function createSyntheticEvent(Interface: EventInterfaceType)
{
  function SyntheticBaseEvent(
    reactName: string | null,
    reactEventType: string,
    targetInst: Fiber,
    nativeEvent: { [propName: string]: mixed },
    nativeEventTarget: null | EventTarget,) {
    this._reactName = reactName;// 事件名字
    this._targetInst = targetInst; // Fiber 节点
    this.type = reactEventType;
    this.nativeEvent = nativeEvent; // 原生事件
    this.target = nativeEventTarget;
    this.currentTarget = null;
  // 初始化 做一些赋值操作
    for (const propName in Interface) {
      if (!Interface.hasOwnProperty(propName))
      {
        continue;
      }
      const normalize = Interface[propName];
      if (normalize)
      {
        this[propName] = normalize(nativeEvent);
      } else {
        this[propName] = nativeEvent[propName];
      }
    }
    // 兼容可恶的ie
    const defaultPrevented = nativeEvent.defaultPrevented != null ? nativeEvent.defaultPrevented : nativeEvent.returnValue === false;
    if (defaultPrevented) { this.isDefaultPrevented = functionThatReturnsTrue; } else {
      this.isDefaultPrevented = functionThatReturnsFalse;
    }
    // 默认是不冒泡的， 但是react如果调用了阻止冒泡会把这个函数设为functionThatReturnsTrue
    this.isPropagationStopped = functionThatReturnsFalse;
    return this;
  }
  Object.assign(SyntheticBaseEvent.prototype, {
    preventDefault: function () {
      // 掉用的就是原生的浏览器行为
      this.defaultPrevented = true;
      const event = this.nativeEvent;
      if (!event) {
        return;
      }
      if (event.preventDefault)
      {
        event.preventDefault();
      } else if (typeof event.returnValue !== 'unknown') {
        event.returnValue = false;
      }
      this.isDefaultPrevented = functionThatReturnsTrue;
    },
    stopPropagation: function () {
      // 原生的浏览器事件 React 17
      const event = this.nativeEvent;
      if (!event) { return; }
      if (event.stopPropagation) {
        event.stopPropagation();
      } else if (typeof event.cancelBubble !== 'unknown') {
        event.cancelBubble = true;
      }      // 这就是React 自己在冒泡的时候 函数终止的条件
      this.isPropagationStopped = functionThatReturnsTrue;
    },
    // 不在使用事件池了
    persist: function () {      // Modern event system doesn't use pooling.    },    isPersistent: functionThatReturnsTrue,  });  return SyntheticBaseEvent;}
