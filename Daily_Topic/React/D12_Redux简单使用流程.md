<!--
 * @Author       : WePD
 * @Date         : 2021-12-21 15:46:21
-->

### Redux 简单使用流程

1. 首先创建出 store

   ```js
   import redux from "redux";
   const store = React.createStore(reducer);
   export default store;
   ```

2. 定义 reducer()

   ```js
   //设置store中的默认值
   const initState = {
       count: 2
   }
   //定义reducer
   //简单来说reducer就是根据第二个参数的事件类型做相应的操作
   function reducer(state=initState, action){
       //可以使用switch判断事件的类型
       switch(action.type){
               case '事件类型'：
               	return {...state, count: '具体的操作'}
       }
   }
   export default reducer
   ```

   接着将 reducer 导出传给 store

3. 生成 action 对象

   ```js
   const add = (num) => ({ type: "INCREMENT", payLoad: num });
   ```

4. 完成组件对 store 状态的订阅

   ```js
   store.subscribe(() => {
     //获取store的状态
     consloe.log(store.getState());
   });
   ```

5. 派发

   ```js
   store.dispatch(add(4));
   ```
