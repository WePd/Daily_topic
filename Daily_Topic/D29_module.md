*import和export命令只能在模块的顶层，不能在代码块之中*


### 导出

导出方式有两种：
- 分别导出
```js
export let n = 1
export let m = 3
export function add(n, m) {
  return n + m
}
```
- 全部导出
```js
let n = 1
let m = 3
function add(n, m) {
  return n + m
}

export {n, m, add}
```
- export dafault默认导出

```js
export default function add (n, m){
  return n + m
}

import sum from './index.js'
```
可以默认导出。其他模块加载这个模块的时候， import 命令可以给要导入的模块起别名， 但是不再使用{}
export default命令用于指定模块的默认输出。显然，一个模块只能有一个默认输出，因此export default命令只能使用一次。所以，import命令后面才不用加大括号，因为只可能唯一对应export default命令。
因为export default命令其实只是输出一个叫做default的变量，所以它后面不能跟变量声明语句
export default命令的本质是将后面的值，赋给default变量，所以可以直接将一个值写在export default之后

### 导入
```js
import {n,m, add} from "./index.js"
import命令接受一对大括号，里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块（index.js）对外接口的名称相同
```

如果想为输入的变量重新取一个名字，import命令要使用as关键字，将输入的变量重命名
```js
import {add as sum} from './index.js'
```
import命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面改写接口.如果a是一个对象，改写a的属性是允许的  

注意，import命令具有提升效果，会提升到整个模块的头部，首先执行.
```js
add()
import {add } from './index.js
```
```js
整体导入
import * from './index.js'
```
由于import是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构


```js
//test1.js
export let n = 1
export let m = 3
export default function (n, m) {
  return n + m
}
//test2.js
import foo, { n, m } from './test1.js'
console.log(foo(n, m))
console.log(n);
console.log(m);

//index.html
 <script src="./main/test2.js" type="module">
  </script>
```