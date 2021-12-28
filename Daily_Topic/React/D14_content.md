### Content  上下文模式
具体模式如下：
首先用`Provier`提供者注入要共享的变量，然后在需要变量的地方，通过`Consumer`消费者取出变量，供给组件渲染即可。
简单来说就是`Context` 提供了一个无需为每层组件手动添加 `props`，就能在组件树间进行数据传递的方法。

#### createContext
```js
const myContent = React.createContext(null);
const myProvieder = myContext.Provider // 提供者
const myConsumer = myContext.Consumer	 //订阅消费者
```
createContext 接受一个参数，作为初始化 context 的内容，返回一个context 对象，Context 对象上的 Provider 作为提供者，Context 对象上的 Consumer 作为消费者

#### 提供者Provider
```js
class Grandfather extends React.Component {
        state = { name: 'lqy' };
        render() {
          return (
            <div>
              <h3>当前的state为： {this.state.name}</h3>
              <MyContent.Provider value={this.state}>
							// value传递context,供consumer使用
							//value属性改变，provider可以使消费constext的组件重新渲染
                <Father />
              </MyContent.Provider>
            </div>
          );
        }
      }
```
provider作为提供者传递context,provider的value改变会使所有消费这个context的组件重新更新。
*provider可以逐层传递context,下一层的Provider会覆盖上一层的provider*



#### 消费者
消费者有三种方式：
1. 类组件contextType方式
```js
   class Son extends React.Component {
        //静态属性获取myContext提供的value
        static contextType = MyContent;
        render() {
          return (
            <div>
              <h3>从根组件接受的数据为：{this.context.name}</h3>
            </div>
          );
        }
      }
```
可以方便获取到最近一层 Provider 提供的 contextValue 值，但是这个方法只适用于类组件

2. 函数组件useContext的方式
```js
	const ThemeContext = React.createContext(null)
	// 函数组件 - useContext方式
	function ConsumerDemo(){
			const  contextValue = React.useContext(ThemeContext) /*  */
			const { color,background } = contextValue
			return <div style={{ color,background } } >消费者</div> 
	}
	const Son = ()=> <ConsumerDemo />
```
useContext 接受一个参数，就是想要获取的 context ，返回一个 value 值，就是最近的 provider 提供 contextValue 值

3. 订阅者Consumer
```js
function Son() {
        return (
          <div>
            <MyContent.Consumer>
              {(value) => <h3>从根组件接受的数据为：{value.name}</h3>}
            </MyContent.Consumer>
          </div>
        );
      }
```
接受最近一层的Provider的value属性。
*总结*
在 Provider 里 value 的改变，会使引用contextType,useContext 消费该 context 的组件重新 render ，同样会使 Consumer 的 children 函数重新执行，与前两种方式不同的是 Consumer 方式，当 context 内容改变的时候，不会让引用 Consumer 的父组件重新更新。

### 注意点
provider的value改变，会使消费了value的组件重新渲染
如何阻止 Provider value 改变造成的 children （ demo 中的 Son ）不必要的渲染？
第一种方法： 利用memo，purComponent对子组件props进行浅比较处理
第二种方法：  React 本身对 React element 对象的缓存。React 每次执行 render 都会调用 createElement 形成新的 React element 对象，如果把 React element 缓存下来，下一次调和更新时候，就会跳过该 React element 对应 fiber 的更新。
```js
<ThemeProvider value={ contextValue } >
    { React.useMemo(()=>  <Son /> ,[]) }
</ThemeProvider>
```
### Context的高阶用法
1. 嵌套Provider
2. 逐层传递Provider
	- 全局只有一个自己创建的context
	- 组件获取context的时候只会获取离当前组件最近的一层的context
	- 下一层的provider会覆盖上一层的provider
