### state

首先,state 是一个对象，用来保存一些组件生命周期中可能会变化的信息， 我们应该一直保持 state 尽可能的简单。并最小化有状态组件的数量。

state 类似于 props,但是它是私有的并且完全被组件控制。在它的所有者组件传递它之前，任何其他组件都无法访问它

```js
class User extends React.Component {
  state = { maessage: "Hello!!!" }
  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
      </div>
    )
  }
}
```

> state 的更新是同步的还是异步的？

### 类组件中的 state

#### setState

在类组件中，setState 是更新视图渲染视图的主要方式. 将组件的 state 的改变排入队列， 并通知 react 要使用更新之后的 state 来重新渲染组件和组件的子组件

setState 不是立即更新组件，React 会延迟调用它，若是想在调用 setState()之后立即读取`this.state()`可能会出现隐患。为了解决隐患，我们要使用`componentDidUpdate`或者`setState`的回调函数。

#### 基本用法：

> setState(obj, callback):<br> 第一个参数：若 obj 是一个对象，就是传入 state 的值。若 obj 是一个函数，则返回值是新的 state 值。<br> 第二个参数: 第二个参数可以接收更新之后最新的 state 值，可以做一些依赖于 state 值的副操作。

```js
//第一个参数为函数
this.setState((state, props) => {
  return { name: 1 }
})

//第一个参数为对象
this.setState({ name: 1 }, () => {
  console.log(name) //会返回最新的name值
})
```

#### 触发 setState 之后的操作

- 首先会产生当前更新的优先级
- 接下来 react 会跟根据 fibreRoot 向下调和子节点，对比更新 lane, 对比将要发生更新的地方，找到更新的组件。合并 state, 然后触发 render,得到新的 ui 视图。完成 render 阶段
- 在 commit 阶段，替换真实 DOM, 完成更新流程
- 同时在 commit 阶段会执行 setState 的 callback 函数.可以获取最新的 state 值。

#### 如何限制 setState 更新视图？

- `purComponent`可以对 props 和 state 进行浅比较， 若是没有发生变化，则不会更新视图<br>
- `shouldComponentUpDate`生命周期可以对比 state 前后的变化，若需要跟新则返回 true,否则就返回 false。默认是会返回 true 的。<br>

> shouldComponentUpDate(nextProps, nextState)：根据他的返回值判断组件的状态是否受最新的 state 或者 props 的影响

### setState 的原理

对于类组件，在类组件实例化的过程中绑定了`Updater`对象，调用`setState`实质上是`React`在底层调用`Updater`的`enqueueSetState`

```js
//在类组件中
Component.prototype.setState = function (state,callback ) => {
	this.updater.enqueueSetState(this,state, callback, 'setState')
}
```

enqueueSetState 作用实际很简单，就是创建一个 update ，然后放入当前 fiber 对象的待更新队列中，最后开启调度更新，

- React 是如何实现批量更新的？

在 batchedEventUpdates 方法中。在 React 事件执行之前通过 `isBatchingEventUpdates=true` 打开开关，开启事件批量更新，当该事件结束，再通过 `isBatchingEventUpdates = false`; 关闭开关，然后在 `scheduleUpdateOnFiber` 中根据这个开关来确定是否进行批量更新

在 batchedEventUpdates 方法中，

在同步操作的时候是采用批量更新的，在异步操作的时候是采用同步执行的。在异步环境下会打破批量更新模式。利用`unstable_batchedUpdates`可以手动开启批量更新。

在实际工作中，unstable_batchedUpdates 可以用于 Ajax 数据交互之后，合并多次 setState，或者是多次 useState 。原因很简单，所有的数据交互都是在异步环境下，如果没有批量更新处理，一次数据交互多次改变 state 会促使视图多次渲染

- 如何更新优先级？ React-dom 提供了 flushSync ，flushSync 可以将回调函数中的更新任务，放在一个较高的优先级中
- React 同一级别的跟新的优先关系是： flushSync 中的 setState > 正常执行上下文中 setState > setTimeout > Promise 中的 setState。

### 函数组件中的 state

### useState

#### 基本用法：

> const [state, dispatch] = useState(initDate)<br> state: 视图渲染的数据源<br> dispatch:更改 state,是一个推动推进函数组件渲染的函数<br> initDate: 初始化数据，有两种形式： 1.一种是非函数，作为 state 的初始值，2，是函数，返回值作为 useState 的初始值

```js
//intiDate为非函数,将0作为count的初始值
const [count, setCount] = useState(0)

//initDate为函数, 返回值作为useState的初始值
const [count, setCount] = useState(() => {
  return Math.rendom()
})
```

```js
//dispatch的形式
1. 非函数: 作为新的值，赋予给state,作为下一次的渲染使用
const [ number , setNumbsr ] = React.useState(0)
/* 一个点击事件 */
const handleClick=()=>{
   setNumber(1)
   setNumber(2)
   setNumber(3)
}

2. 函数： 如果 dispatch 的参数为一个函数，这里可以称它为reducer，reducer 参数，是上一次返回最新的 state，返回值作为新的 state
const [ number , setNumbsr ] = React.useState(0)
const handleClick=()=>{
   setNumber((state)=> state + 1)  // state - > 0 + 1 = 1
   setNumber(8)  // state - > 8
   setNumber((state)=> state + 1)  // state - > 8 + 1 = 9
}
```

dispatch 的更新特点：

> 在函数组件中，dispatch 的效果个类组件是一样的，但是有一点要注意，就是当调用改变 state 的 dispatch 时，在本次的函数执行上下文中是拿不到最新的 state 值的。

```js
const [number, setNumber] = React.useState(0)
const handleClick = () => {
  ReactDOM.flushSync(() => {
    setNumber(2)
    console.log(number)
  })
  setNumber(1)
  console.log(number)
  setTimeout(() => {
    setNumber(3)
    console.log(number)
  })
}
// 0 0 0
```

原因是因为函数组件的执行就是函数的执行，在函数的一次执行过程中函数内部的变量重新声明，所有改变的 state，只有在下一次函数组件执行时才会被跟新。

useState 是有浅比较的规则，根据对比的结构再决定是否更新组件视图。若是想改变的化可以利用浅拷贝重新`dispatch({...state})`

#### 监听 state

在类组件中可以通过 componentDidUpdate 或者 setState 的第二个参数 callback 检测监听 state

在函数组件中就需要 useEffect，将 state 的依赖项作为 useEffect 的第二个参数，但是要注意 useEffect 初始化会默认执行一次。

### 类组件中的 setState 和函数组件中的 useState 的异同？

- 相同点：
  - 首先从原理角度出发，setState 和 useState 更新视图，底层都调用了 scheduleUpdateOnFiber 方法，而且事件驱动情况下都有批量更新规则
- 不同点：
  - setState 有专门监听 state 的回调函数，可以获得最新的 state，useState 则需要 useEffect 来执行 state 变化引起的副作用
  - setState 在底层上主要是将新 state 和旧的 stste 进行合并，但是 useState 则更加倾向于重新赋值。
  - 在不是 pureComponent 的状态下，setState 不会进行浅比较，只要调用了 setState,就会执行更新，但是 useState 会根据浅比较的结果再决定是否要更新组件视图。
