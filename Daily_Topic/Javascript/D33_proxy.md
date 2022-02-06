### Proxy

字面理解是代理的意思 `console.log(typeof Proxy)` 结果为 function，是定义在 window 上的全局变量

proxy 在作为构造函数的时候接受两个参数：

- 为要代理的对象 object ------> object
- 代理对象时需要的行为 handle------> object

```js
const proxy = new Proxy(object, handle)
```

#### get 方法

```js
var person = {
  name: "ll",
}
var proxy = new Proxy(person, {
  get: function (target, propKey) {
    if (propKey in target) {
      return target[propKey]
    } else {
      throw new ReferenceError(`Prop name ${propKey} does not exist.`)
    }
  },
})
proxy.name // "lll"
proxy.age // 报错
```

#### set 方法

set 方法接受四个参数：target, propKey, value, receiver，分别表示要代理的目标对象、对象上的属性、属性对应的值以及代理对象。
