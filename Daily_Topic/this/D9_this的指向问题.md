this的指向问题可以分很多种情况,但是在ES5中，this永远指向最后调用它的那个对象，是永远
```js
 // ep1
  var name = 'windowName';
  function fn(){
    var name = 'li';
    console.log(this.name); //windowNmae
    console.log("inner"+ this); // window
  } 
  //调用fn()的对象是window.那么this就会指向window
fn()
console.log("outer:" + this); // outer: window

// ep2
var name = 'windowName';
q = {
  a: 'li',
  fn: function(){
    console.log(this.a)
    console.log(this)
  }
}
//最后调用fn()的对象是q,则this就会指向q
// q.fn()
//要看最后是谁调用的
window.q.fn()
ep3
var name = 'windowName';
var a = {
  name: null,
  fn(){
    console.log(this)  //window
  }
}
//函数的值是通过引用传递的
//这个地方函数fn()并没有执行，只是将指向函数的指针赋给了f,最后调用fn()的对象是window
let f = a.fn;
f() 
```
这是在默认情况下的this的指向，那么我们怎么才能改变this的指向呢？
这有以下方法：
- 箭头函数
箭头函数的 this 始终指向函数定义时的 this，而非执行时。，箭头函数需要记着这句话：“箭头函数中没有 this 绑定，必须通过查找作用域链来决定其值，如果箭头函数被非箭头函数包含，则 this 绑定的是最近一层非箭头函数的 this，否则，this 为 undefined”
```js
//箭头函数
var name = 'windowName';
var a = {
  name: 'li',
  fun1(){
    console.log(this.name)
  },
  fun2(){
    console.log(this)
    //setTimeout()是window的方法。这个地方若是不使用箭头函数的话，this的指向的是wwindow
    //使用箭头函数之后改变了this的指向。让他指向对象a
    setTimeout(() => {
      console.log(this)
      this.fun1()
    }, 100)
  }
}
a.fun2()
```
- 在函数内部使用_this=this
```js
var name = 'windowName';
var a = {
  name: 'li',
  fun1(){
    console.log(this.name)//li
  },
  fun2(){
    //这个时候的this是指向对象a的。
    console.log(this)// a
    //将指向this的指针赋值给_this,那么_this就指向对象a
    _this = this
    console.log(_this) //a 
    setTimeout(() => {
      _this.fun1()
      console.log(_this)//  a
    }, 100)
  }
}
a.fun2()
```
- 使用call() bind() apply()改变指针指向
call()和apply()类似，只是在接受的参数上面有差异
call()接受的是若干个参数列表，而apply()接受的是一个包含多个参数的数组。




-补充： javascript中的函数调用
1. 作为一个函数调用
2. 作为一个对象的方法调用
3. 使用构造函数调用函数
若果函数调用前使用了new关键字，则是调用了构造函数，这个时候JS是重新创建了对象，this指向的是新创建的对象。
4. 作为函数方法调用函数


