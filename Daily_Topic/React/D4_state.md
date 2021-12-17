### state

首先,state是一个对象，用来保存一些组件生命周期中可能会变化的信息， 我们应该一直保持state尽可能的简单。并最小化有状态组件的数量。


state类似于props,但是它是私有的并且完全被组件控制。在它的所有者组件传递它之前，任何其他组件都无法访问它

```js
class User extends React.Component{
  state = {maessage: 'Hello!!!'}
  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
      </div>
    )
  }


}
```

> state的更新是同步的还是异步的？


### 类组件中的state

#### setState
在类组件中，setState是更新视图渲染视图的主要方式.
将组件的state的改变排入队列， 并通知react要使用更新之后的state来重新渲染组件和组件的子组件

setState不是立即更新组件，React会延迟调用它，若是想在调用setState()之后立即读取`this.state()`可能会出现隐患。为了解决隐患，我们要使用`componentDidUpdate`或者`setState`的回调函数。

#### 基本用法： 
  > setState(obj, callback):
  > 第一个参数：若obj是一个对象，就是传入state的值。若obj是一个函数，则返回值是新的state值。
	> 第二个参数: 第二个参数可以接收更新之后最新的state值，可以做一些依赖于state值的副操作。

```js
//第一个参数为函数
this.setState((state, props) => {
	return {name: 1}
})

//第一个参数为对象
this.setState({name: 1}, () => {
	console.log(name)//会返回最新的name值
})
```

#### 触发setState之后的操作

#### 如何限制setState更新视图？
+ `purComponent`可以对props和state进行浅比较， 若是没有发生变化，则不会更新视图
+ `shouldComponentUpDate`生命周期可以对比state前后的变化，若需要跟新则返回true,否则就返回false。默认是会返回true的。

> shouldComponentUpDate(nextProps, nextState)：根据他的返回值判断组件的状态是否受最新的state或者props的影响


### setState的原理

对于类组件，在类组件实例化的过程中绑定了`Updater`对象，调用`setState`实质上是`React`在底层调用`Updater`的`enqueueSetState`



+ React是如何实现批量更新的？



### 函数组件中的state

### useState

#### 基本用法：
 > const [state, dispatch] = useState(initDate)
 > state: 视图渲染的数据源
 > dispatch:更改state,是一个推动推进函数组件渲染的函数
 > initDate: 初始化数据，有两种形式： 1.一种是非函数，作为state的初始值，2，是函数，返回值作为useState的初始值

```js
//intiDate为非函数,将0作为count的初始值
const [count, setCount] = useState(0)

//initDate为函数, 返回值作为useState的初始值
const [count, setCount] = useState(() => {
	return  Math.rendom()
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
#### 监听state
在类组件中可以通过componentDidUpdate或者setState的第二个参数callback检测监听state

在函数组件中就需要useEffect，将state的依赖项作为useEffect的第二个参数，但是要注意useEffect会默认执行一次。




### 类组件中的setState和函数组件中的useState的异同？

+ 相同点： 
	+ 首先从原理角度出发，setState和 useState 更新视图，底层都调用了 scheduleUpdateOnFiber 方法，而且事件驱动情况下都有批量更新规则
+ 不同点：
	+ setState有专门监听state的回调函数，可以获得最新的state，useState则需要useEffect来执行state变化引起的副作用
	+ setState在底层上主要是将新state和旧的stste进行合并，但是useState则更加倾向于重新赋值。
	+ 在不是pureComponent的状态下，setState不会进行浅比较，只要调用了setState,就会执行更新，但是useState会根据浅比较的结果再决定是否要更新组件视图。




