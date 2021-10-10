### js执行上下文和作用域

四种可以创建新的执行上下文的情况：
- 进入全局代码
- 进入function函数体代码
- 进入`eval()`函数参数指定的代码
- 进入module代码

#### 全局执行上下文
1. var 和function声明创建在全局对象中，而let const 和class声明的变量创建在全局scope
2. 先到全局scope中找变量，找不到再到全局对象查找


上下文创建的步骤：
step1:创建执行上下文，并加入栈顶
step2: 分析：
      - 找到所有非函数中的var声明
      - 找到所有的顶级函数声明
      - 找到所有的顶级let const class声明
step3: 观察：
      - var function和 let const class名字不能重复
      - let const class之间名字不能重复
step4: 创建绑定：
      - 登记并初始化var为undefine
      - 登记function名字，并初始化为新创建函数对象
      - 登记let const class,但未初始化
step5: 执行语句，遇到函数调用就会立即创建新的函数执行上下文并加入栈顶，之后的执行上下文就指向它，之后也一样。




```js
  let name = 'li';
  console.log(name); //li
  console.log(window.name);// undefined
```

```js
  var name = 'li';
  console.log(name); //li
  console.log(window.name); //li
```

```js
console.log(Function); //f Function
console.log(window.Function); //f Function


let Function = '定义function';
  console.log(Function); //定义function
  console.log(window.Function); //f Function()
```


1. let const class声明的名字不能重复
2. let const class和 function  var的名字不能重复
3. var和 function名字有重复的，function声明的函数优先


**函数对象创建的时候体内会保存函数创建时的执行上下文的文本环境**
函数调用时的上下文是看身世的，函数在哪里创建，就保存哪里的运行上下文。
函数的作用域是在函数创建的时候决定的而不是调用的时候。

临时死区： 变量是经过提升的，但是没有没有初始化。

函数作用域并非是根据调用嵌套形成作用域链，而是根据函数创建嵌套形成作用域链，也就是函数的书写位置形成作用域链。




#### 块作用域
-------------------------------------------------------------------
理解出问题了，整明白了之后再记录。

现在补上---
1. 简单块级作用域
```js
let inIf = 'out if statement';
	if (true) {
    //这里创建一个新的文本环境
		let inIf = 'in if statement';
		console.log(inIf);
	}
	console.log(inIf)
```
与之前一样，首先也是创建全局的执行上下文，并加入栈顶。
下面的步骤与之前一样，但是当到了代码块的时候，首先会*创建一个新的文本环境，并不创建新的执行上下文*，当代码块执行完毕之后，js引擎会把新创建的文本环境销毁。 并将群居执行上下文重新链接会原来的文本环境。（相当于就是在全局执行上下文与它的文本环境之间插入了一个新的文本环境，这个环境用完之后就删除了，那么他们就重新回复原来的样子了。）
  接着就是变量命名检查：
      - var function和 let const class名字不能重复
      - let const class之间名字不能重复
  创建绑定：与之前不一样，创建绑定的时候是在新创建的文本环境中的而不是在全局执行上下文中的。
      - 登记function名字，并初始化为新创建函数对象
      - 登记let const class,但未初始化
  执行语句

2. 在块级作用域中声明函数
  ```js
  console.log(foo);
  //创建新的文本环境
	if (true) {
    //
		function foo() {
			console.log('in block');
		}
	}
  ```
代码执行的步骤：
step1:创建全局执行上下文，并加入栈顶
step2: 分析：
      - 找到所有非函数中的var声明
      - 找到所有的顶级函数声明
      - 找到所有的顶级let const class声明
      - 找到块中声明的，函数名不与上面重复的，
         - 若是与上面var let const class的名字有重复的，就对块中的函数声明不做任何处理。
         - 若是没有重复的，就会在全局对象当中创建一个以函数名命名的变量，并初始化为undefined.
step3: 观察：
      - var function和 let const class名字不能重复
      - let const class之间名字不能重复
step4: 创建绑定：
      - 登记并初始化var为undefine
      - 登记function名字，并初始化为新创建函数对象
      - 登记let const class,但未初始化
step5: 执行语句，遇到函数调用就会立即在新创建的上下文中创建函数对象，。
等到块级函数执行完毕之后，重新将原来的全局执行上下文与文本环境链接，
*若是全局执行上下文的文本环境中有与新创建文本环境有同名的变量，则会将新创建文本环境中的变量值赋给全局文本环境，若是没有，则不会对新创建的文本中的值做任何处理*