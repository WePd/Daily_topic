Javascript 中的数据类型 8 种：

- 基本数据类型(原始)：Boolean null undefined String number Symbol(独一无二的值) Bigint
- 引用数据类型： Object 包括 （function Object Array）

typeof 可能的返回值： | 类型 | 结果 | |-----------------|-------------------------------| | Undefined | undefined | | Null | object | | Boolean | boolean | | Number | number | | BigInt | bigint | | String | string | | Symbol | symbol | | 宿主对象 | 取决于具体实现 | | Function 对象| function | | 其他任何对象 | object |

typeof 操作符的唯一目的就是检查数据类型，如果我们希望检查任何从 `Object` 派生出来的结构类型，使用 `typeof` 是不起作用的，因为总是会得到 `"object"。` 检查 `Object` 种类的合适方式是使用 `instanceof` 关键字。但即使这样也存在误差。 `instanceof` 运算符用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上
