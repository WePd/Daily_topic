### js执行上下文和作用域

#### 函数作用域
1. var 和function声明创建在全局对象中，而let const 和class声明的变量创建在全局scope
2. 先到全局scope中找变量，找不到再到全局对象查找

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


#### 块作用域
-------------------------------------------------------------------
理解出问题了，整明白了之后再记录。
