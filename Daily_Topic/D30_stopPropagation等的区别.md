### stopPropagation、 preventDefault和return false的区别

- stopPropagation 阻止事件的冒泡和捕获
- preventDefault 阻止浏览器的默认行为
- return false : 调用的时候会做三件事： 
  1. event.preventDefault() – 它停止浏览器的默认行为。
  2. event.stopPropagation() – 它阻止事件传播（或“冒泡”）DOM。
  3. 停止回调执行并立即返回。
