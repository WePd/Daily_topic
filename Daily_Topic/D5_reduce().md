### Array.reduce()

简单来说，就是对一个数组执行reduce()方法，，就是把reduce()中的第一个函数参数分别让数组中的元素执行一遍同时每一次执行都会有一个返回值，但是是把上一次输出的值作为下一次执行函数时的输入值。最后会有一个单个值。

```js
array.reduce(function(accumulator, currentValue, currentIndex, arr){}, initialValue);
/*
  accumulator:  必需。累计器
  currentValue: 必需。当前元素
  
  currentIndex: 可选。当前元素的索引；                    
  arr:          可选。要处理的数组
  initialValue: 可选。传递给函数的初始值，相当于accumulator的初始值
*/
```

```js
let arr = [1, 2, 3, 5];
arr.reduce((sum, acc ) => sum + acc, 0)
```

```js
//求数值最大
arr = [1, 4, 21, 13, 22]
let result = arr.reduce((a, b) => {
  return a > b ? a:b
})
console.log(result)
```

```js
//数组去重
arr = [1, 1, 2, 34 ,43, 2]
let result = arr.reduce((pre, cur) => {
  if(!pre.includes(cur)){
    return pre.concat(cur)
  }else{
    return pre
  }
},[])
console.log(result);
```























