### 纯函数

```js
纯函数的特点：
- 没有副作用
- 相同的输入应该返回相同的输出
```

#### 函数的副作用

- 修改了任何外部变量、对象属性、数据结构
- 控制台输入输出交互
- 网络请求
- 抛出异常或者错误中止

### 受控组件和非受控组件

```js
受控组件：
非受控组件： 非受控组件的状态存储在自身，需要的时候通过ref查询DOM获取
```

### 虚拟 dom 优缺点有哪些？

```js

```

### Set WeakSet

```js
set中可以存储任何类型的唯一值，无论是原始类型还是引用数据类型
常用的方法：
- add： 尾部添加元素
- clear: 移除所有元素
- delete: 删除元素
- forEach: 为set中的每一个值调用一次callback
- has: 判断set中是否包含某个元素
WeakSet： 里面的元素只能是对象

```

### Map WeakMap

```js
Map对象中保存键值对，并且可以记住键的插入顺序，任何值都可以作为一个键或者一个值。
遍历的时候可以根据对象的插入顺序进行一个for...of循环，在每次循环后可以返回一个[key, value]形式的数组

WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的.
```

### React 配置代理 proxy

```js
方式一：在package.json中配置
"proxy":{
'/api/**': {
  "target":"http://www.baidu.com",
  "changeOrign": true
}
}

方式二：利用中间件的方式配置proxy
import {createProxyMiddleware}  = require('http-proxy-middleware')
module.export = {
  app.use(
    proxy('/api',{
      {  //api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
      target: 'http://localhost:5000', //配置转发目标地址(能返回数据的服务器地址)
      changeOrigin: true, //控制服务器接收到的请求头中host字段的值
      /*
      	changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
      	changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
      	changeOrigin默认值为false，但我们一般将changeOrigin值设为true
      */
      pathRewrite: {'^/runner': ''} //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
    }),
    })
  )
}
```

### 深拷贝

```js
function deepClone(target, map = new WeakMap()) {
  if (target === null) return target
  if (typeof target !== "object") return target
  if (target instanceof Date) return new Date(target)
  if (target instanceof RegExp) return new RegExp(target)
  if (map.get(target)) return map.get(target)
  let cloneObj = new target.constructor()
  map.set(target, cloneObj)
  console.log(map)
  for (let k in target) {
    //for in会遍历对象的原型链
    //需要hasOwnProperty来判断是否是自身的属性
    if (target.hasOwnProperty(k)) {
      cloneObj[k] = deepClone(target[k], map)
    }
  }
  return cloneObj
}

let obj = { name: 1, address: { x: 100 } }
obj.o = obj // 对象存在循环引用的情况
let d = deepClone(obj)
obj.address.x = 200
console.log(d)
```

### 浅拷贝

```js
1. es5方式
const obj = { a: 1, love: { name: "lqy", age: { hh: 12 } } }
function shallClone(item) {
  // debugger
  const result = {}
  for (const k in item) {
    result[k] = item[k]
  }
  return result
}
obj.a = 12
console.log(shallClone(obj))

2. 扩展运算符
...

3. Object.assign()

```

### 迭代器

```js
迭代器是一种接口，也可以理解为是一种标准。
任何是实现了Iterable接口的的数据结构都可以实现遍历
迭代器API使用next()在可迭代对象中遍历数据。每次成功调用next()，都会返回一个IteratorResult 对象，其中包含迭代器返回的下一个
值。若不调用next() ，则无法知道迭代器的当前位置。
返回的对象包含两个属性：
1.done是一个布尔值，表示是否还可以调用next()取得下一个值
2.values包含下一个迭代对象包含的值

最后当输出的值中done为true的时候就表示数据迭代完成了
```

### 生成器

```js
生成器的形式是一个函数，只是在函数名称前面加上了一个*，就表示他是一个生成器
只要可以定义函数的地方就可以定义生成器。
箭头函数不可以定义生成器函数

function* generatorFn() {}
console.log(g) // 调用生成器函数会产生一个生成器对象，
生成器对象一开始是处于暂停的状态

生成器对象也实现了Iterator 接口，因此具有next() 方法。调用这个方法会让生成器开始或恢复执行

console.log(g); // generatorFn {<suspended>}
console.log(g.next); // f next() { [native code] }
// 调用一次就可以到达done: true的状态
console.log(g.next()); //  { done: true, value: undefined


生成器函数可以使用`yeild`中断执行。

yield 关键字只能在生成器函数内部使用，用在其他地方会抛出错误


```

### 常用的前端设计模式

```js
1. 工厂模式
2. 单例模式
3. 观察者模式
4. 中介者模式
5. 访问者模式
6. 迭代器模式
7. 代理模式
8. 策略模式
9. 外观模式

```

### null 和 undefined 的区别

```js
首先，他们都是原始数据类型。分别对应undefined和null
undefined代表的时未定义，null代表的时空对象。
undefined不是JS中的保留字，可以作为一个变量名，但是这会带来危险


console.log(null === undefined) // false
console.log(null == undefined) // true

typeof null  // object
```

### instanceof 的原理以及实现

```js
instanceof 运算符用于判断构造函数的 prototype 属性是否出现在对象的原型链中的任何位置

function myInstanceOf(left, right) {
  let proto = Object.getPrototypeOf(left)
  let prototype = right.prototype

  while (true) {
    if (!proto) return false
    if (proto === prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
}

console.log(myInstanceOf(2, Number))
console.log(myInstanceOf("lqy", String))
console.log(myInstanceOf(12, String))
```

### Object.is() 与比较操作符 “===”、“==” 的区别

```js
== 进行判断的时候若时两边的数据类型不同，则会先强制转换数据类型然后再进行比较
=== 若是两端的数据类型不一致的时候，不会进行类型转换，直接返回false
Object.is() 一般情况下和===的规则相同，但是会处理一些特殊的情况。
```

### new 的操作

```js
1. 在内存中开辟一段空间
2. 这个新对象的__proto__特性赋值为构造函数的prototype属性
3. 将构造函数内的this指向新对象
4. 执行构造函数的代码
5. 若构造函数返回非空对象则返回该对象， 相反，返回刚刚创建的对象



const muNew = (content, ...args) => {
  const obj = Object.create(content.prototype)
  const res = content.apply(obj, args)

  const isObject = typeof res === "object" && res !== null
  const isFunction = typeof res === "Function"

  return isObject || isFunction ? res : obj
}
```

### 箭头函数与普通函数的区别

```js
1. 箭头函数没有自己的this，他的this是上下文的this
2. 箭头函数比较普通函数则更见简洁
3. 箭头函数的this指向时不会改变的,包括call apply bind都无法改变
4. 箭头函数不能作为构造函数，因为没有this
5. 箭头函数没有arguments参数
6. 箭头函数没有prototype
7. 箭头函数不能作为生成器函数，无法使用yeild关键字
```

### 解构

```js
数组解构：是以元素的位置为匹配条件来提取想要的数据结构的

const [a, b] = [1, 2, 3]
console.log("a", a) // a 1
console.log("b", b) // b 2

对象解构：是以属性的名称为匹配条件来提取想要的数据的

const { name, age } = { name: "lqy", age: 22 }
console.log("name", name)
console.log("age", age)

```

### rest 参数的理解

```js
可以把一个分离的参数序列整合成一个数组

function mutiple(...args) {
  let result = 1
  for (var val of args) {
    result *= val
  }
  return result
}
mutiple(1, 2, 3, 4) // 24
经常用于获取函数的多余参数，或者像上面这样处理函数参数个数不确定的情况。
```

### javascript 脚本延迟加载

```js
1. defer属性
脚本添加 defer 属性，这个属性会让脚本的加载与文档的解析同步解析，然后在文档解析完成后再执行这个脚本文件，这样的话就能使页面的渲染不被阻塞。
多个设置了 defer 属性的脚本按规范来说最后是顺序执行的，
2. async属性
给 js 脚本添加 async 属性，这个属性会使脚本异步加载，不会阻塞页面的解析过程，但是当脚本加载完成后立即执行 js 脚本，这个时候如果文档没有解析完成的话同样会阻塞。
多个 async 属性的脚本的执行顺序是不可预测的，一般不会按照代码的顺序依次执行
3. 动态创建 DOM 方式： 动态创建 DOM 标签的方式，可以对文档的加载事件进行监听，当文档加载完成后再动态的创建 script 标签来引入 js 脚本。
4. 使用 setTimeout 延迟方法： 设置一个定时器来延迟加载js脚本文件
5. 让 JS 最后加载： 将 js 脚本放在文档的底部，来使 js 脚本尽可能的在最后来加载执行。

```

### JavaScript 为什么要进行变量提升，它导致了什么问题？

```js

```

### for..of 和 for..in 的区别

```js
for...in 遍历对象获得的是对象的键名， for...of获取的是键值
for...in适合遍历对象， for...of适合遍历数组、类数组对象，字符串、Set、Map 以及 Generator 对象。
for...in会遍历对象的原型链
```
