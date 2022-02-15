### super()

```
子类中的this是通过父类创建好this后传递下来的，所以子类必须要先调用 super()。
```

```js
// 这个可以称谓基类，在调用super之前就可以使用this. this是在他执行的时候创建的。但是通过基类派生出来的派生类则没有自己的this。
// 只有通过super将基类创建好的this接下来
function C() {
  this.foo = c
}
```

```js
Class A {}

Class B entends A {
// 在编码的是偶都默认constructor方法
  constructor(...props){
    super(...props)
  }
} // 派生类
Class C entends A {}

this也就是实例对象最开始是在基类里创建好，然后一层层传递给下层的派生类的
你执行 new C，最终在基类A里构造this对象的代码相当于是 this = Object.create(C.prototype)，然后这个this会传回给B，再传回给C。
```

### new.target

```
new.target属性允许你检测函数或构造方法是否是通过new运算符被调用的。在通过new运算符被初始化的函数或构造方法中，new.target返回一个指向构造方法或函数的引用。在普通的函数调用中，new.target 的值是undefined。
```

```js
1. 在普通函数中，new.target可以判断这个函数是否是作为构造函数通过new调用
2. 在构造函数中，new.target只想被调的构造函数

class C { constructor() { console.log(new.target); } }
class D extends C { constructor() { super(); } }

var c = new C(); // logs class C{constructor(){console.log(new.target);}}
var d = new D(); // logs class D extends C{constructor(){super();}}
new.target 指向的是初始化类的类定义
```
