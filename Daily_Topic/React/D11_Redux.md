### 何为redux

Redux 是一?使用叫做“action”的事件?管理和更新?用??的模式和工具? 它以集中式 Store 的方式?整??用中使用的???行集中管理，其??确保??只能以可??的方式更新

### 为什么使用 redux

Redux 提供的模式和工具使您更容易理解?用程序中的??何?、何地、?什么以及如何更新，以及??些更改?生?您的?用程序???如何表?. Redux 指?您??可??和可??的代?，?有助于?您确信您的?用程序?按?期工作

### 数据流

- 用 state ?描述?用程序在特定???的??
- 基于 state ?渲染出 View
- ??生某些事情?（例如用???按?），state ?根据?生的事情?行更新，生成新的 state
- 基于新的 state 重新渲染 View

### Action

action 式一?具体 type 字段的 Javascript ?象, 可以? Acrion 看作 App ?生了什么

```js
const addTodoAction = {
  type: "things type",
  payload: "things data",
};
```

### Reducer

是一?函?，接受
?前的 state 和一? action ?象。必要??定如何更新??，并返回??。
可以理解?一? hi ??听器，根据收到的 Action ?型?理事件。

#### ??

- ?使用 state 和 action ???算新的??值。
- 禁止直接修改 state
- 函??部遵循的??：先?查 reducer 是否?系?? action，如果?系，那就复制?? state，使用新值更新 state 副本，然后返回新 state
- 否?，返回原?的 state 不?

```js
const initState = { count: 0 };
function reducer(state = initState, action) {
  //若reducer?系??state
  if (action.type === "count/increment") {
    return {
      ...state,
      //使用新值更新state副本
      value: state.count + 1,
    };
  }
  //否?返回原?的state不?
  return state;
}
```

### store

- store
  ?前?用的??存在于 store 中，
  它有一?方法，getState()可以返回?前的??值
- disptch <br>
  _更新 state 的唯一方法就是通??用 store.dispatch()并?入一? action_

### Redux ?据流

- 初始?段
  - ?建 Redux store
  - store?用一次 root reducer, 并?返回值保存?他的初始值。
  - ?UI 要重新渲染?，??redux store 的 state，并使用???据??定要?示的?容，同??要?听 state,以便能?知道 state 已?更新。
- 更新??
  - ?有事件?生
  - dispatch 一?action 到 store,
  - store 用之前的 state 和?前的 action 再次?行 reducer 函?，并?返回值保存?新的 state
  - store 通知相?ui?取新?据
  - ui?查各自的?据有?有更新。
  - ???据被更新的每??件都?制使用新?据重新渲染，?接?更新网?
### Redux中间件
`Redux middleware provides a third-party extension point between dispatching an action, and the moment it reaches the reducer`.

#### Redux使用中间件
1. 在`store`中引入applyMiddleWare
`import {applyMiddleWare} from redux`
2. 导入中间件
`import {middleWare1, middleWare2, middleWare3} from '../middelWares'`
3. 注册中间件
`const middleWareEbhancr = applyMiddleWare(middleWare1,middleWare2,middleWare3)`
4. 然后将`middleWareEnahnce`加入到createStroe的第二个参数中
`const store = createStore(reducer,middleWareEnahnce )`

#### 中间件工作原理
`Middleware form a pipeline around the store's dispatch method`-------> 中间件围`store`的分派方法形成一个管道
当我们调用`dispatch(action)`时，实际上是调用管道中的第一个中间件，之后中间件可以做任何事, 通常它会检测action的类型是否是它所关心的类型。
若是它想要的类型，那么它就会做相应的操作。但是若不是它想要的类型，那么它会跳过继续让下一个在管道中的中间件做检测。

与reducer不同的是，reducer是一个纯函数，但是`middleWara`是可以有副作用操作的。比如一些异步的操作。

*简单来说，redux中间件就是三个嵌套函数*
```js
standard middleware definition, with 3 nested functions:
// 1) Accepts `{dispatch, getState}`
// 2) Accepts `next`
// 3) Accepts `action`

const thunkMiddleware =
  ({ dispatch, getState }) =>
  next =>
  action => {
    // If the "action" is actually a function instead...
    if (typeof action === 'function') {
      // then call the function and pass `dispatch` and `getState` as arguments
      return action(dispatch, getState)
    }

    // Otherwise, it's a normal action - send it onwards
    return next(action)
  }
```
- 简单来说就是若在disPatch中传入一个函数，那么thunk中间件就会查看是否是用一个函数替代了一个action对象，若是函数，那么就拦截它，就调用这个函数并将{dispatch，getState}作为他的参数。
- 若传入的不是一个函数，就会进入next()到管道中的下一个中间件。


### Thunk使用
`"thunks" are a pattern of writing functions with logic inside that can interact with a Redux store's dispatch and getState methods.`

使用thunk需要将`redux-thunk`中间件添加到redux store中作为配置的一部分

#### Thunk Function
```js
const thunkFunction = (dispatch, getState){
	//可以dispatch action或者 获取state
}
store.dispatch(thunkFunction)
```

### Redux异步
1. 项目安装redux-thunk
2. 在store中，引入`redux-thunk`。createStore()是可以传入两个参数的，第一个参数是reducer,第二个参数是applyMiddleWare的返回值storeEnhance

```js
//在store中
//在头部要导入applyMiddleWare
import {createStore, applyMilldeWare} from 'redux'

//引入thunk中间件
import thunk from 'redux-thunk'

//应用中间件，这个函数会有一个返回值
const storeEnhance = applyMiddleWare(thunk， 中间件2)


const store = createStore(reducer, storeEnhance)
```

3. 在组件中，可以将需要异步操作的步骤都集成ction中，定义一个函数传入一个dispatch参数
```js
export const getMessageMultiData = (dispatch) => {
  axios({
    method: "GET",
    url: "http://123.207.32.32:8000/home/multidata",
  }).then((res) => {
    // console.log(res.data.data);
    console.log("轮播图", res.data.data.banner.list);
    console.log("推荐", res.data.data.recommend.list);
    dispatch(changeBanners(res.data.data.banner.list))
    dispatch(changeRecommends(res.data.data.recommend.list))
  });
  console.log(dispatch)
}
```