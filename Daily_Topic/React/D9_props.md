### Props

props 是 React 组件通信的重要方式，

一次 render 的过程，就是调用 React.crateElement 创建出新的 element 的过程，新的 element 上就有 props 属性，

#### 什么是 props?

父组件绑定在子组件标签中的方法和属性，最终都会变成 props 传递给他们，

#### Props 究竟能做什么？

1. 在 React 组件层级 props 充当的角色?
   - 父组件可以通过 props 传递数据给子组件
   - 子组件可以通过 props 传递回调函数给父组件达到数据传输的作用
2. 在 React 组件更新中充当的角色
   在 react 中，无法判断数据改变波及的范围，所以 props 变化及更新，于是就有了 pureComponent,memo 的优化方案

3. 从 React 插槽层面 props 充当的角色 React 可以把组件的闭合标签里的插槽，转化成 chidren 属性

#### 监听 Props 改变

1. 在类组件中
   在类组件中，
   `componentWillReceiveProps` 可以作为监听 props 的生命周期，但是 React 已经不推荐使用 `componentWillReceiveProps`，因为这个生命周期超越了 `React` 的可控制的范围内，可能引起多次执行等情况发生。只要父组件引起了子组件的变化就会重新 render，就会调用`componentWillReceiveProps`<br/>
   于是出现了这个生命周期的替代方案 `getDerivedStateFromProps `
2. 在函数组件中
   在函数组件中通过`useEffect`来监听 props 的变化（useEffect 会默认执行一次）

#### props children 模式

1. Props 插槽组件

```js
<Container>
  <Children />
</Container>
```

可以在 Container 组件中，通过 props.children 属性访问到 Children 组件，为`Symbol(react.element)`对象,

2. render props 模式

```js
<Container>{(ContainerProps) => <Children {...ContainerProps} />}</Container>
```

#### 操作 props 小技巧

#### 抽象 Props

抽象 props 一般用于跨层级传递 props ，一般不需要具体指出 props 中某个属性，而是将 props 直接传入或者是抽离到子组件中

- 混入 Props
  将父组件传递的 props 连同自己的 Prop 一起传递给子组件

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

- 抽离 props
  从父组件的 props 中抽离出某个属性传递给自己的子组件

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

- 注入 props
  - 显式注入

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

- 隐式注入

```js
function Son(props) {
  console.log(props); // {name: "alien", age: "28", mes: "let us learn React !"}
  return <div> hello,world </div>;
}
function Father(prop) {
  return React.cloneElement(prop.children, { mes: "let us learn React !" });
}
function Index() {
  return (
    <Father>
      <Son name="alien" age="28" />
    </Father>
  );
}
```
