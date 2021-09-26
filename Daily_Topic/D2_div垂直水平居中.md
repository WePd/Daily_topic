### 关于垂直水平居中分为两种情况：

```css
<div class="parent">
  <div class="child"></div>
</div>
```

<!-- flex布局 -->
```css
div.parent {
    display: flex;
    justify-content: center;
    align-items: center;
}
```
1. 定宽高
  1. 使用定位+margin
    ```css
    element.style {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -250px;
      margin-left: -250px;
      width:500px;
      height: 500px;
      background: #ccc;
      z-index: 1;
    }
      <!-- 或者 -->
     div.child {
        width: 50px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }
    ```
  2. 使用定位+transfrom
    ```css
    element.style {
      position: absolute;
      top: 50%;
      left: 50%;
      width:500px;
      height: 500px;
      background: #ccc;
      z-index: 1;
      transform: translate3d(-50%, -50%, 0)
    }
    ```
  3. table-cell
    ```css
    .parent {
        display: table-cell;
        height: 200px;
        width: 200px;
        background-color: orange;
        text-align: center;
        vertical-align: middle;
      }
      .child {
        display: inline-block;
        width: 100px;
        height: 100px;
        background-color: blue;
}
   
    ```

```css
   
```
1. 不定宽高 不定宽高的方法基本都适用于定宽高的情况，把div中的内容宽高按照内容展开，使用定位+transfrom同样是适用的
  1. 定位 + transfrom 
   ```css
    element.style {
      position: absolute;
      top: 50%;
      left: 50%;
      width:500px;
      height: 500px;
      background: #ccc;
      z-index: 1;
      transform: translate3d(-50%, -50%, 0)
    }
    ```
    2. <<css世界>>中的方法
      ```css
      div.parent {
      font-size: 0;
      text-align: center;
      &::before {
          content: "";
          display: inline-block;
          width: 0;
          height: 100%;
          vertical-align: middle;
      }
      }
      div.child{
        display: inline-block;
        vertical-align: middle;
      }
      ```