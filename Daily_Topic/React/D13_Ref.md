<!--
 * @Author: WePD
 * @Date: 2021-12-23 16:49:36
-->

### Ref

#### ref 对象创建

在 react 中有两种方式创建 ref

1. 类组件中 React.createRef
   Create.createRef 的底层逻辑很简单

```js
export function createRef() {
	const refObject = {
		//返回一个对象，对象中有current属性，用来保存通过ref获的DOM元素，组件实例等。
		current: null,
	}
	return refObject
}
```

可以将 ref 对象绑定在类组件实例上，这个可以方便后续操作 ref

2. 函数组件中 useRef

```js
export default function Index() {
	const currentDom = React.useRef(null)
	React.useEffect(() => {
		console.log(currentDom.current) // div
	}, [])
	return <div ref={currentDom}>ref对象模式获取元素或组件</div>
}
```

useRef 和 createRef 的底层是差不多的，但是有一点不一样。就是 ref 的存储位置是不相同的
在类组件中，有一个实例 instance 可以一直维护 ref 的信息，但是函数组件不同，函数组件每一次更新都是重新开始，所有的变量都需要重新声明。
这也是在函数组件中不能使用 createRef 的原因，会造成 ref 的内容丢失。

所以在函数组件中，hooks 和函数组件对应的 fiber 建立了联系，将 useRef 产生的 ref 对象挂载到函数组件对应的 fiber 上，函数组件的每一次执行，只要函数组件不被销毁，对应的 fiber 一直存在，那么 ref 等信息就会一直保存下来。

#### 类组件获取 Ref 的三种方式

1. Ref 属性是一个字符串
   用一个字符串标记 DOM 元素，在底层`react`会将真实 DOM 绑定在`this.refs`上,也就是组件实例的 refs 属性上.
   若是一个类组件，则会将子组件的实例绑定在`this.refs`上。
   ![](img/ref_str.png)
2. Ref 是一个函数
   用一个函数标记 ref 时，会采用 callback 的方式，等到真实 DOM 创建完毕，以回调函数的方式返回。获取真实 DOM 和组件实例。
   ![](img/ref_fun.png)
3. Ref 是一个对象
   获取到的是一个对象，用 current 属性。
   ![](img/ref_obj.png)

#### Ref 高阶使用

1. forwardRef 转发 Ref
   forwardRef 初衷是解决 ref 不能跨层级捕捉和传递的问题。forwardRef 接受了父级元素标记的 ref 信息，并把它转发下去，使得子组件可以通过 props 来接受到上一层级或者是更上层级的 ref，
   forwardRef 把 ref 变成了可以通过 props 传递和转发
   场景 1： 跨层级获取

```js
function Son(props) {
	const { grandRef } = props
	return (
		<div>
			<div>look here !!!</div>
			<span ref={grandRef}>这个是我的目标</span>
		</div>
	)
}
// 父组件
const Father = (props) => {
	return (
		<div>
			<Son grandRef={props.grandRef} />
		</div>
	)
}
const NewFather = React.forwardRef((props, ref) => <Father grandRef={ref} {...props} />)
// 爷组件
export default class GrandFather extends React.Component {
	// constructor(props) {
	// 	super(props)
	// }
	node = null
	componentDidMount() {
		console.log(this.node) // span #text 这个是想要获取元素
	}
	render() {
		return (
			<div>
				<NewFather ref={(node) => (this.node = node)} />
			</div>
		)
	}
}
```

2.  合并转发 ref

#### 组件通信

1. 类组件 Ref

```js
import React, { Component, useRef, useState } from 'react'

export default function Father() {
	//来自子组件
	const [sonMes, setSonMes] = useState('')
	const sonRef = useRef(null)
	console.log(sonRef.current) //取到的是子组件的实例对象
	const toSon = () => sonRef.current.fatherSay(fatherMes)
	//传给子组件
	const [fatherMes, setFatherMes] = useState('')
	return (
		<div>
			<div>父组件</div>
			<div>子组件多我说： {sonMes}</div>
			<div>
				<span>对子组件说：</span> <input type="text" onChange={(e) => setFatherMes(e.target.value)} />
			</div>
			<button onClick={toSon}>To Son</button>
			<Son ref={sonRef} toFather={setSonMes} />
		</div>
	)
}

class Son extends Component {
	state = {
		sonMsg: '',
		fatherMsg: '',
	}
	//传递给父组件的事件
	fatherSay = (fatherMsg) => this.setState({ fatherMsg })
	render() {
		return (
			<div>
				<div>子组件</div>
				<div>父组件多我说：{this.state.fatherMsg} </div>
				<div>
					<span>对父组件说：</span> <input type="text" onChange={(e) => this.setState({ sonMsg: e.target.value })} />
				</div>
				<button onClick={() => this.props.toFather(this.state.sonMsg)}>To Father</button>
			</div>
		)
	}
}
```

2. 函数组件 forwardRef + useImperativeHandle

- useImperativeHandle 接受三个参数： - 第一个参数 ref : 接受 forWardRef 传递过来的 ref 。 - 第二个参数 createHandle ：处理函数，返回值作为暴露给父组件的 ref 对象。 - 第三个参数 deps :依赖项 deps，依赖项更改形成新的 ref 对象。
  思路：
  父组件用 ref 标记子组件，由于子组件 Son 是函数组件没有实例，所以用 forwardRef 转发 ref。
  子组件 Son 用 useImperativeHandle 接收父组件 ref，将让 input 聚焦的方法 onFocus 和 改变 input 输入框的值的方法 onChangeValue 传递给 ref 。
  父组件可以通过调用 ref 下的 onFocus 和 onChangeValue 控制子组件中 input 赋值和聚焦。

3. 函数组件缓存数据
   函数组件每一次 render，函数上下文就会重新执行，如果视图不依赖要改变的数据，那么若改变视图就是多余的，
   useRef 可以创建出一个 ref 原始对象，只要组件没有销毁，ref 对象就一直存在，那么完全可以把一些不依赖于视图更新的数据储存到 ref 对象中。

这样做的好处有两个：

第一个能够直接修改数据，不会造成函数组件冗余的更新作用。
第二个 useRef 保存数据，如果有 useEffect ，useMemo 引用 ref 对象中的数据，无须将 ref 对象添加成 dep 依赖项，因为 useRef 始终指向一个内存空间，所以这样一点好处是可以随时访问到变化后的值

### Ref 原理

在生命周期中，一次更新有两个阶段。分别是 commimt 阶段和 render 阶段。对于整个 ref 的处理都是在 commit 阶段。commit 阶段可以进行真实 DOM 的操作。所以可以通过 ref 获取真实的 DOM 和组件实例。
对于 ref 处理函数。React 底层有两个方法处理：

- commitDetachRef: 发生在 Dom 更新之前， 会清空之前的 ref 值，重置为 null
- commitAttachRef:

第一阶段：
一次更新中，在 `commit` 的 `mutation` 阶段, 执行`commitDetachRef`，`commitDetachRef` 会清空之前 ref 值，使其重置为 null
第二阶段：： DOM 更新阶段，这个阶段会根据不同的 effect 标签，真实的操作 DOM
第三阶段： `layout` 阶段，在更新真实元素节点之后，此时需要更新 ref。主要判断 ref 获取的是组件还是 DOM 元素标签，如果 DOM 元素，就会获取更新之后最新的 DOM 元素。上面流程中讲了三种获取 ref 的方式。 如果是字符串 `ref="node"` 或是 函数式 `ref={(node)=> this.node = node }` 会执行 ref 函数，重置新的 ref 。
如果是 ref 对象方式，会更新 ref 对象的 `current` 属性。达到更新 ref 对象的目的
