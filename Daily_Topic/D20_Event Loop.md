### Event Loop是什么
`Eveent loop`就是事件循环，浏览器或Node的一种解决javaScript单线程运行时不会阻塞的一种机制，也就是我们经常使用异步的原理

### Event Loop分类

在javascript中，任务被分为两类，一种叫宏任务(MacroTask)，另一种叫微任务(MicroTask)

- 宏任务(MacroTask)

  宏任务包括：script全部代码、setTimeout、setInterval、setImmediate`（浏览器暂时不支持，只有IE10支持)、I/O、`UI Rendering

- 微任务(MicroTask)

  Process.nextTick(Node独有)、Promise、MutationObserve

### 浏览器中的Event Loop

Javascript有一个main thread主线程和 call-stack调用栈(执行栈)，所有的任务都会被放到调用栈等待主线程执行。

-------------------------------------------------------------
之后再补 -_-;















