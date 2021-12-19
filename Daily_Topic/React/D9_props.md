### Props
props是React组件通信的重要方式，

一次render的过程，就是调用React.crateElement创建出新的element的过程，新的element上就有props属性，


#### 什么是props?

父组件绑定在子组件标签中的方法和属性，最终都会变成props传递给他们，


#### Props究竟能做什么？
1. 在React组件层级props充当的角色?
	+ 父组件可以通过props传递数据给子组件
	+ 子组件可以通过props传递回调函数给父组件达到数据传输的作用
2. 在React组件更新中充当的角色
	在react中，无法判断数据改变波及的范围，所以props变化及更新，于是就有了pureComponent,memo的优化方案
	
3. 从React插槽层面props充当的角色 React 可以把组件的闭合标签里的插槽，转化成 chidren 属性

#### 监听Props改变
1. 在类组件中
	在类组件中，
	`componentWillReceiveProps` 可以作为监听props的生命周期，但是 React 已经不推荐使用 `componentWillReceiveProps`，因为这个生命周期超越了 `React` 的可控制的范围内，可能引起多次执行等情况发生。只要父组件引起了子组件的变化就会重新render，就会调用`componentWillReceiveProps`<br/>
	于是出现了这个生命周期的替代方案 `getDerivedStateFromProps `
2. 在函数组件中
	在函数组件中通过`useEffect`来监听props的变化（useEffect会默认执行一次）
	
#### props children模式
1. Props插槽组件
```js
<Container>
	<Children/>
</Container>
```
可以在Container组件中，通过props.children属性访问到Children组件，为`Symbol(react.element)`对象,

2. render props模式
```js
<Container>
   { (ContainerProps)=> <Children {...ContainerProps}  /> }
</Container>
```
#### 操作props小技巧
#### 抽象Props
抽象 props 一般用于跨层级传递 props ，一般不需要具体指出 props 中某个属性，而是将 props 直接传入或者是抽离到子组件中

+ 混入Props
将父组件传递的props连同自己的Prop一起传递给子组件
```js
function Son(props) {
  console.log(props); //{name: 'alien', age: '28', mes: 'let us learn React !'}
  return <div> hello,world </div>;
}
function Father(props) {
  const fatherProps = {
    mes: "let us learn React !",
  };
  return <Son {...props} {...fatherProps} />;
}
export default function Index() {
  const indexProps = {
    name: "alien",
    age: "28",
  };
  return <Father {...indexProps} />;
}
```

+ 抽离props
从父组件的props中抽离出某个属性传递给自己的子组件
```js
function Son(props) {
  console.log(props); //{name: 'alien', mes: 'let us learn React !'}
  return <div> hello,world </div>;
}

function Father(props) {
  const { age, ...fatherProps } = props;
  return <Son {...fatherProps} />;
}
export default function Index() {
  const indexProps = {
    name: "alien",
    age: "28",
    mes: "let us learn React !",
  };
  return <Father {...indexProps} />;
}
```
+ 注入props
	+ 显式注入
```js
function Son(props) {
  console.log(props); // {name: "alien", age: "28"}
  return <div> hello,world </div>;
}
function Father(props) {
  console.log(props.children);
  return props.children;
}
export default function Index() {
  return (
	<Father>
	  <Son name="alien" age="28" />
	</Father>	
  );
}
```
	+ 隐式注入
```js
function Son(props){
	 console.log(props) // {name: "alien", age: "28", mes: "let us learn React !"}
	 return <div> hello,world </div>
}
function Father(prop){
	return React.cloneElement(prop.children,{  mes:'let us learn React !' })
}
function Index(){
	return <Father>
		<Son  name="alien"  age="28"  />
	</Father>
}
```