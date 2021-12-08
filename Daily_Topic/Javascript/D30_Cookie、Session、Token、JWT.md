### Cookie、Session、Token、JWT

### 1. Authentication 授权
- `用户授予第三方应用访问该用户某些资源的权限`
- 实现授权的方式： cookie session token OAuth

### 2. Credentials  凭证



### 3. Cookie

+ http是无状态的协议，对于事物处理没有记忆能力，每次客户端和服务端交互之后，服务端不会保存任何信息；
  也就是说，每个请求都是完全独立的，服务器是无法确认当前的请求和上一次的请求是不是同一个人。服务器与浏览器为了进行会话追踪。就必须主动去维护一个状态。 
  为了知道当前的请求和上一次的请求是不是来自同一个请求端。这个状态就需要session或者cookie来维护

+ cookie是存储在客户端的。在下一次请求同一服务器的时候会被携带着一起上传到服务器。

+ cookie是不可跨域的， 每个 cookie 都会绑定单一的域名，无法在别的域名下获取使用，一级域名和二级域名之间是允许共享使用的（靠的是 domain）.


cookie只要用于以下三个方面： 
  1. 会话状态管理
  2. 个性化设置
  3. 浏览器行为跟踪

#### 3.1 创建Cookie

当服务器收到http请求时，会在响应头里面添加一个`Set-Cookie`选项，浏览器收到响应之后就会保存cookie.在这之后对这个服务器每次请求都会将Cookie发送给服务器。

```js
//键值对
Set-Cookie: <键> = <值>
```

#### 3.2 定义Cookie的生命周期
定义Cookie的两种方式：
  + 会话期Cookie: 这是最简单的的Cookie，在会话结束之后浏览器就会自动删除。会话期`Cookie`不需要指定过期时间`（Expires）`或者有效期`（Max-Age）`
  + 持久性Cookie的生命周期取决于过期时间`(Expires)`或者 `(Max-Age)`
  + 过期时间设置后只与客户端有关，而不是服务端

#### 3.3 限制访问Cookie

两种限制访问Cookie的方法：
  + Secure: 标记为 Secure 的 Cookie 只应通过被 HTTPS 协议加密过的请求发送给服务端，因此可以预防 man-in-the-middle 攻击者的攻击
  + HttpOnly: 此类 Cookie 仅作用于服务器


#### 3.4 Cookie的作用域

- `Domain`属性
Domain 指定了哪些主机可以接受 Cookie。如果不指定，默认为 origin，不包含子域名。如果指定了Domain，则一般包含子域名。因此，指定 Domain 比省略它的限制要少。但是，当子域需要共享有关用户的信息时，这可能会有所帮助

- `Path`属性
Path 标识指定了主机下的哪些路径可以接受 Cookie（该 URL 路径必须存在于请求 URL 中）。以字符 %x2F ("/") 作为路径分隔符，子路径也会被匹配


- Cookie重要属性<br>
  - `-name=value`: 键值对，设置 Cookie 的名称及相对应的值，都必须是字符串类型- 如果值为 Unicode 字符，需要为字符编码。- 如果值为二进制数据，则需要使用 BASE64 编码。<br>
  - `domain`: 指定 cookie 所属域名，默认是当前域名<br>
  - `path`: 指定 cookie 在哪个路径（路由）下生效，默认是 '/'。如果设置为 /abc，则只有 /abc 下的路由可以访问到该 cookie，如：/abc/read。<br>
  - `maxAge`: cookie失效的时间，单位秒。如果为整数，则该 cookie 在 maxAge 秒后失效。如果为负数，该 cookie 为临时 cookie ，关闭浏览器即失效，浏览器也不会以任何形式保存该 cookie 。如果为 0，表示删除该 cookie 。默认为 -1。- 比 expires 好用。<br>
  - `expires`: 过期时间，在设置的某个时间点后该 cookie 就会失效。一般浏览器的 cookie 都是默认储存的，当关闭浏览器结束这个会话的时候，这个 cookie 也就会被删除<br>
  - `secure`: 该 cookie 是否仅被使用安全协议传输。安全协议有 HTTPS，SSL等，在网络上传输数据之前先将数据加密。默认为false。当 secure 值为 true 时，cookie 在 HTTP 中是无效，在 HTTPS 中才有效。<br>
  - `httpOnly`:  如果给某个 cookie 设置了 httpOnly 属性，则无法通过 JS 脚本 读取到该 cookie 的信息，但还是能通过 Application 中手动修改 cookie，所以只是在一定程度上可以防止 XSS 攻击，不是绝对的安全<br>

