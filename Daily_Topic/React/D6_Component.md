### Component

React 组件可以分为函数式组件和类式组件

1. 组件与与常规的类和函数有什么区别？

   > 组件本质上就是函数和类，但是组件又承载了渲染视图的的 UI 和更新视图的 setState, useState 等方法。React 在底层逻辑上会像正常实例化类和正常执行函数那样处理的组件
   > React 在底层逻辑上会像正常实例化类和正常执行函数那样处理的组件
   > 函数和类所具有的特性组件也是有的

2. 类和函数组件被实例化的时机

- 在 React 调和渲染 fiber 节点的时候，如果发现 fiber tag 是 ClassComponent = 1，则按照类组件逻辑处理，
- 如果是 FunctionComponent = 0 则按照函数组件逻辑处理。当然 React 也提供了一些内置的组件，比如说 Suspense 、Profiler 等

### 类式组件

react 处理 Component 的逻辑是在类组件执行构造函数的时候会在实例上绑定 props 和 context,初始化置空 ref 属性。
在原型链上绑定 setState 和 forceUpdate 方法。

```js
function Component(props, content, updater) {
  this.props = props;
  this.content = content;
  this.refs = empty;
	this.updater = updater || ReactNoopUpdateQueue; //上面所属的updater 对象
}
//在Component原型上绑定setState方法
Component.proptotype.setState = function(partialState, callback){
	this.updater.enqueueSetState(this, partialState, callback, 'setState');
}
//在Component原型上绑定forceUpdate方法
Component.prototype.forceUpdate = function(callback){
	this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
}
```

```js
//类组件的各个部分的功能
class Index extends React.Component {
  constructor(...arg) {
    super(...arg); /* 执行 react 底层 Component 函数 */
  }
  state = {}; /* state */
  static number = 1; /* 内置静态属性 */
  handleClick = () =>
    console.log(111); /* 方法： 箭头函数方法直接绑定在this实例上 */
  componentDidMount() {
    /* 生命周期 */
    console.log(Index.number, Index.number1); // 打印 1 , 2
  }
  render() {
    /* 渲染函数 */
    return (
      <div style={{ marginTop: "50px" }} onClick={this.handerClick}>
        hello,React!
      </div>
    );
  }
}
Index.number1 = 2; /* 外置静态属性 */
Index.prototype.handleClick = () =>
  console.log(222); /* 方法: 绑定在 Index 原型链的 方法*/
```

### 函数组件

自 ReactV16.8 跟新以来， 对函数组件的功能有很多强化，我们可以利用函数组件做类式组件做的任何事，在某种程度上可以说完全替代了类式组件。

但是有一点，不要给函数组件的原型上绑定属性和方法，这完全是没有用的。因为 React 对函数组件是直接调用的而不是经过 New 的。

### 函数组件了类式组件的区别

```js
对于类组件来说，底层只需要实例化一次，实例中保存了组件的 state 等状态。对于每一次更新只需要调用 render 方法以及对应的生命周期就可以了。
但是在函数组件中，每一次更新都是一次新的函数执行，一次函数组件的更新，里面的变量会重新声明.
为了能让函数组件可以保存一些状态，执行一些副作用钩子，
React Hooks 应运而生，它可以帮助记录 React 中组件的状态，处理一些额外的副作用
```
