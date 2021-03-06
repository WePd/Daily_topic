### this 的指向问题

```js

```

### 函数柯里化

```js
柯里化的含义是让函数变得的更具体一些
function sum(a, b, c){} ----------> sum(1,2,3)
变为
sum(1)(2)(3)

与柯里化类似的是偏函数：返回一个函数，每次传入的参数不是一个
sum(1,2)(3,4)(5)

========================================================================
- 实现通用的柯里化函数
主要的实现思路是判断定义的参数个数和调用的参数的个数是否一致，在一致的情况下才会执行


```

### 跨域

```js
为什么会出现跨域问题？
出于浏览器的同源策略限制，同源也就是两个页面具有相同的协议、端口、主机。
同源策略会阻止一个域的js脚本和另一个域内容进行交互

什么是跨域？
当协议、端口、主机号其中任意一个不同就算是在不同域。不同域之间相互请求资源，就算作跨域。
跨域并不是请求发不出去，而是请求可以发出去，服务器也能响应返回数据，只是返回的数据被浏览器拦截了

怎么解决跨域？
1. jsonp: 利用script没有跨域限制的问题。 jsonp需要服务端做支持才可以
2. cors: 跨域资源共享。他是一种基于http头的机制。该机制通过允许服务器标示除了它自己以外的其它origin（域，协议和端口）只适用于简单请求，post, get
3. proxy代理：
```

### react 高阶组件

```js
高阶组件：以组件为参数，返回组件的函数。返回的组件把传入组件进行功能强化
高阶组件可以做的事：
1. 强化props，可以通过HOC,向原始组件混入一些状态
2. 渲染劫持，可以利用 HOC ，动态挂载原始组件，还可以先获取原始组件的渲染树，进行可控性修改
3. 可以配合 import 等 api ，实现动态加载组件，实现代码分割，加入 loading 效果
4. 可以通过ref来获取原始组件实例，操作实例下的属性和方法。
5. 可以对原始组件做一些事件监听，错误监控等

高阶组件的注意点：
1. 谨慎修改原型链
2. 不要再函数组件内部或类组件render函数中使用HOC
  每次render之后都会重新产生一个新的组件，react diff会判断两次不是同一个组件，那么就会卸载老组件，重新挂载新组件，老组件内部的真实DOM节点，都不会合理的复用。会造成性能的浪费。
3.
```

### redux 和 mobx 的区别

```js
共同点：
1. 都是为了状态管理混乱、无法有效同步的问题，统一维护管理应用状态
2. 某一个状态只有一个数据源
3. 操作更新的方式单一，并且可控

区别：
- 在redux中
1. action: 是一个对象， 主要包括type和payLoad属性。
2. reducer: 定义应用的状态如何响应不同的action,如何更新状态
3. store:
```

### react 中如何实现状态自动 b 保存？

```js
1. 采用手动的方式，利用react中的componentWillUnmount生命周期，通过redux保存状态。然后再通过componentDidMount生命周期进行恢复
```

### useEffect 与 useLayoutEffect 有什么区别？

```js
共同点： 两个的使用方式是一样的，基本可以直接替换
不同点： useEffect是异步执行的，他会先渲染后改变DOM，当屏幕改变的时候会出现闪屏的情况。
useLayoutEffect是再DOM改变之后就同步执行的。要避免useLayoutEffect做计算量大的耗时任务从而避免造成阻塞
一般情况下可以直接使用useEffect，若是出现问题再换用useLayoutEffect
```

### react 优化的方法

```js
- 减少渲染的节点/降低渲染的计算量
1. 不要再渲染函数中进行不必要的计算，比如不要在渲染函数中进行数组排序、数据转化、创建事件处理器等副作用
2. 减少不必要的嵌套
3. 虚拟列表： 虚拟列表只渲染当前视口可见的元素
4. 惰性渲染: 只有在必要的时候才渲染对应的节点
- 避免重复渲染
1. 简化props,复杂的props也会影响浅比较的效率
2. 不可变数据， 可以利用一些库
3. 简化state,state里面只写一些需要组件响应它的变动或者需要渲染到试图中的数据才会放到state中。
4. 不要滥用content,它是可以穿透React.memo或者shouldComponentUpdate的比对的，也就是说，一旦 Context 的 Value 变动，所有依赖该 Context 的组件会全部 forceUpdate.
5. 通过shouldComponentUpdate生命周期函数来比对 state 和 props, 确定是否要重新渲染。对于函数组件可以使用React.memo包装
6. 控制组件的纯粹性
```

### 观察者模式

```js
观察者模式是指当对象之间存在一对多的关系时，当其中一个对象的状态发生变化，所有依赖他的对象都会收到通知，者就是观察者模式

```

### 发布订阅模式

```js
基于一个事件（主题）通道，希望接收通知的对象 Subscriber 通过自定义事件订阅主题，被激活事件的对象 Publisher 通过发布主题事件的方式通知各个订阅该主题的
Subscriber 对象。
```
