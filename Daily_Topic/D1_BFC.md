### BFC是什么，介绍一下
BFC 即 Block Formatting Contexts (块级格式化上下文)，它属于定位方案的普通流。
具有BFC特性的元素可以看做是隔离过得独立容器，可以理解为一个独立的封闭环境。容器里面的元素不会在布局上影响到外面的元素。
也就是说BFC具有其他容器没有的特性。

### BFC如何触发？
  1. html根元素
  2. 浮动元素：float除了none以外的值
  3. 绝对定位元素：position(absolute,fixed)
  4. display为inline-block,table-cell,flex, inline-flex
  5. overflow除了visible以外的值。
  6. 匿名表格单元格元素（元素的 display 为 table、table-row、 table-row-group

浮动定位和清除浮动时只会应用于同一个BFC内的元素。浮动不会影响其它BFC中元素的布局，而清除浮动只能清除同一BFC中在它前面的元素的浮动。外边距折叠（Margin collapsing）也只会发生在属于同一BFC的块级元素之间。

BFC的特性：
1. 内部的BOX会在垂直方向上一个接一个的放置
2. 垂直方向上的距离由margin决定
3. BFC的区域不会与float的元素区域重叠
4. 计算BFC的高度时，浮动元素也参与计算
5. bFC就是页面上的一个独立容器， 容器里面的子元素不会影响外面的元素

