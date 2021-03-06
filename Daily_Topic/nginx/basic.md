### Nginx

#### 1. nginx 是什么？

1. nginx 是一个轻量高性能的 http 和`反向代理`的服务器， 特点是占用内存小，并发能力强，在显示中要比同类型的网页服务器表现要好
2. nginx 的特点是高并发

#### 2. 正向代理和反向代理

1. 正向代理，客户端不想让服务器知道客户端的 ip，所以让代理服务器去访问，再返回给客户端。
2. 反向代理，服务器不想客户端知道是哪个服务器响应的，所以让代理服务器去分配，让空闲的服务器去响应。

#### 3. 负载均衡

通常是将工作负载分配到多个服务器来提高网站、应用、数据库和其他服务的性能和可靠性

若是没有负载均衡，通常情况下是客户端请求服务器，服务器在数据库中查询数据，然后将数据返回给客户端，但是随着请求的增加，访问量增加，这种情况就服务满足了

可以利用的方法就是增加服务器的数量

对于客户端来说， 它不会管服务器端的时间，是要最后给他返回数据就可以了。

所以，可以在客户端与服务器之间增加一个中间服务器（反向代理服务器），客户端发送的请求会先经过它，由它分配在各个服务器要处理的数据。

可以做到高效的数据处理，这就是

#### 4. 动静分离

将动态资源和静态资源分离出来，利用不同的服务器去解析，这样加快了不同资源的解析，从而降低单个服务器的压力。

#### 5. 配置

配置文件分为三个模块：

1. 全局块：从配置文件开始到 events 块之间，主要是设置一些影响 nginx 服务器整体运行的配置指令。（按道理说：并发处理服务的配置时，值越大，可支持的并发处理量越多，但此时会受到硬件、软件等设备等的制约）
2. events 块：影响 nginx 服务器与用户的网络连接，常用的设置包括是否开启对多 workprocess 下的网络连接进行序列化，是否允许同时接收多个网络连接等等
3. http 块：如反向代理和负载均衡都在此配置。

#### 6. location 的匹配规则

共有四种方式：

```js
location[ = | ~ | ~* | ^~ ] url {
....
}
= ：精确匹配，用于不含正则表达式的url前，要求字符串与url严格匹配，完全相等时，才能停止向下搜索并处理请求
^~：用于不含正则表达式的url前，要求ngin服务器找到表示url和字符串匹配度最高的location后，立即使用此location处理请求，而不再匹配
~ ：最佳匹配，用于表示url包含正则表达式，并且区分大小写。
~*：与~一样，只是不区分大小写

注意：

如果 url 包含正则表达式，则不需要 ~ 作为开头表示
nginx的匹配具有优先顺序，一旦匹配上就会立马退出，不再进行向下匹配
```
