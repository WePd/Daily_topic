###  Flex布局

flex意为“弹性布局”， 用来为盒状模型提供最大的灵活性

首先，任何一个容器都可以指定为Flex布局

```css
.box {
    display: flex
}
```

*在设为flex布局之后，子元素的``float`、`clear`和`vertial-align`属性都会失效*

容器的属性：

- flex-direction(主轴的方向)

  ```css
  .box {
    flex-direction: row | row-reverse | column | column-reverse;
  }
  ```

  

- flex-wrap(默认情况下项目都在一条线上。若一条线排不下，felx-wrap定义如何换行)

```css
.box{
  flex-wrap: nowrap(不换行) | wrap(换行) | wrap-reverse(换行，第一行在下方);
}
```

- flex-flow是flex-direction属性和flex-wrap属性的简写， 默认值为row, nowrap.

  ```css
  .box {
    flex-flow: <flex-direction> <flex-wrap>;
  }
  ```

- justify-content属性定义项目在主轴上的对齐方式。

```css
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

- align-items属性定义在交叉轴上如何对齐

对于交叉轴是垂直的还是水平方向，要根据主轴的方向`flex-direction: row/column`确定。如果主轴是水平方向，那么交叉轴就是竖直的。若主轴是竖直的，那么交叉轴就是水平的。

```css
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

```css
取值：
flex-start：交叉轴的起点对齐。
flex-end：交叉轴的终点对齐。
center：交叉轴的中点对齐。
baseline: 项目的第一行文字的基线对齐。
stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。
```

- align-content属性（定义了多轴线的对齐方式。但是如果项目只有一行，该属性是不起作用的。）

```css
.box {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
-----------------------------------------------------
flex-start：与交叉轴的起点对齐。
flex-end：与交叉轴的终点对齐。
center：与交叉轴的中点对齐。
space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
stretch（默认值）：轴线占满整个交叉轴。
```

注意点： `align-items`和``align-content`有相同的功能，不过不同点是它是用来让每一个单行的容器居中而不是让整个容器居中.。`align-content`属性只适用于多行的flex容器，并且当侧轴上有多余空间使flex容器内的flex线对齐

项目的属性：

- order属性定义项目的排列顺序。数值越小，排列会越靠前。默认的为0
- flex-grow属性：定义项目的放大比例，默认为0，也就是即使还有剩余空间，也不会放大。
- flex-shrink:定义项目的缩小比例，默认为1，若是空间不足的情况下，可以将项目缩小。负值是无效的。
- flex-basis:flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小
- flex:flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选
- align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch

















