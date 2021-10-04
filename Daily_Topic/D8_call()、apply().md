### 函数的方法call()和apply()


#### call()
call()方法使用一个指定的`this`值和单个或者多个参数来调用一个函数。

这和apply()很相似，但是call()是接受的是一个参数列表，可以是多个参数，但是apply()方法接受的是一个包含多个参数的数组。

```js
function.call(thisArg, arg1, arg2, ....)
thisArg: 函数运行时的this值，这个地方的this并不仅仅是指this,还可以是一个对选哪个，或者一个函数。在非严格模式下，这个值被设为null或者undefined时会自动替换为全局对象。
arg1， arg2, ... 都是指定的参数列表
```

但是如果没有传递第一个参数，this会指向全局对象。

**这个地方有一个理解误区，第一个参数不一定要用this，它可以是别的**

这种情况若是在严格模式下，this的值是undefined.

call()的一些应用场景：

```js
//1. 调用父构造方法
function first(firstName, secondName){
  this.firstName = firstName;
  this.secondName  = secondName;
}
function p1(firstName, secondName){
  first.call(this, firstName, secondName)
}

var lover = new p1('li', 'qingying')
console.log(lover.firstName)
console.log(lover.secondName)

//2. 使用call()调用函数并不指定第一个参数
var data = 'li';
function play(){
  console.log(this); //window
  console.log(this.data); //li
  //这个时候this是指向全局对象window的，那么值就会是li.
  //但是若最初的变量声明是用let声明就会有不同的结果
}
//没有传递第一个参数
play.call()


//3. 使用call调用函数并指定第一个参数
var data = 'li';
let o = {
  data: 'wen'
}
function play(){
  console.log(this); // {data: wen}
  console.log(this.data); // wen
}
play.call(o)

-----------------------------------------------
//4. 指定第一个参数并传递之后的参数
var name = 'qq';
let p3 = {
  name: 'li'
}
function friend(p1, p2){
  console.log(this)
  console.log(this.name, p1, p2)
}
friend.call(p3, 'qing')
```



#### apply()

```js
function.apply(thisArg, [argsArray])
thisArg参数是必选的，函数运行时的this值，在非严格模式下，这个值被设为null或者undefined时会自动替换为全局对象
argsArray是可选的数组或者类数组
```



#### bind()

bind()方法创建一个新的函数，在bind()被调用的时候，这个新函数的this被指定为bind()的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

```js
function.bind(thisArg,arg1, arg2, arg3)
thisArg:调用绑定函数时作为this参数传递给目标函数的值。若是使用new构造绑定函数，则这个值被忽略。当使用 bind 在 setTimeout 中创建一个函数（作为回调提供）时，作为 thisArg 传递的任何原始值都将转换为 object。如果 bind 函数的参数列表为空，或者thisArg是null或undefined，执行作用域的 this 将被视为新函数的 thisArg
```

```js
```























