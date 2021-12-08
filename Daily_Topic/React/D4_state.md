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