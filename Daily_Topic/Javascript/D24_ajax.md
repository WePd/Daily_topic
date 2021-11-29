### Ajax

是一种异步请求数据的开发技术， 在不需要属性页面的情况下，ajax通过异步请求加载后台数据，并在页面上呈现出来。
ajax请求的是数据而不是文档，这样就.

### 应用

1. 创建ajax核心对象XMLHttpRequest(),同时要考虑兼容性

```js
	1. var xhr=null;  
	2. if (window.XMLHttpRequest)  
	3.   {// 兼容 IE7+, Firefox, Chrome, Opera, Safari  
	4.   xhr=new XMLHttpRequest();  
	5.   } else{// 兼容 IE6, IE5 
	6.     xhr=new ActiveXObject("Microsoft.XMLHTTP");  
	7.   } 
```
2. 向服务器发送请求

```js
xhr.open(methods, url, async) //anync:  true(异步) false(同步)， 
xhr.sed()//post请求时才使用字符串参数， 否则不用带参数

// 注意post请求一定要设置请求头的格式内容

xhr.open("POST","test.html",true);  
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");  
xhr.send("fname=Henry&lname=Ford");

```
3. 服务器响应处理（分为同步和异步两种情况）
*responseText()获得字符串形式的响应数据*
*responseXML()获得XML形式的响应数据。*

- 同步处理
```js
  xhr.open('GET', 'info.tetx', false)
  xhr.send(),
  document.getELementById('selector').innerHTML = xhr.response
```
- 异步处理
```js
xhr.onreadystatechange = () => {
  if(xhr.readystate === 4){
    if(xhr.status >= 200 && xhr.status < 300){
  document.getELementById('selector').innerHTML = xhr.response
    }
  }
}
```

#### status
HTTP状态码由三个十进制数字组成， 第一个数字定义了状态码的类型， 后两个数字没有分类的作用。
http状态码共有5类：
|分类|描述                                   |
|---|---------------------------------------|
|1**| 信息， 服务器收到请求， 需要请求者继续执行操作|
|2**| 成功， 操作被成功接受并处理                |
|3**| 重定向， 需要进一步的操作以完成请求|
|4**| 客户端错误， 请求包含语法错误或者无法完成请求|
|5**| 服务器错误， 服务器在处理请求的过程中发生了错误|

#### GET和POST请求数据区别
- 使用Get请求时,参数在URL中显示,而使用Post方式,则放在send里面
- 使用Get请求发送数据量小,Post请求发送数据量大
- 使用Get请求安全性低，会被缓存，而Post请求反之 

### 优点
- 不需要刷新页面就可以与服务器交换数据
- 允许根据用户的事件更新部分界面

### 缺点
- 没有浏览历史，不能回退
- 存在跨域问题
- seo不友好