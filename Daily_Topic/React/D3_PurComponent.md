### PurComponent

PurComponent是对Component的性能提升。两者之前也是有区别的“
- `PurComponent`通过props和state的浅比较来实现shouleComponentUpDate()，当props或者state的值或者引用发生变化时，组件就会发生更新
- 而Component是只要State发生改变，不论是否与之前之相等与否都会触发更新。


### 浅比较
就是对比当前状态（current）和 下一个状态（next）下的 prop 和 state时，比较基本数据类型是否相同（如： 'a' === 'a'）, 而引用数据类型则是比较其引用地址是否相同，与值内容无关


- PureComponent 不仅会影响本身，而且会影响子组件。
- 如果 prop 和 state 每次都会变，那么使用 Component 的效率会更好，因为浅比较也是需要时间的。
- 若有shouldComponentUpdate，则执行shouldComponentUpdate，若没有shouldComponentUpdate方法会判断是不是PureComponent，若是，进行浅比较
