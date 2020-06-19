## WebSocket

### 客户端简单演示

```js
var ws = new WebSocket("...")

ws.onopen = function(evt) {
    console.log('Connection open ...')
    ws.send("Hello WebSockets!")
}
ws.onmessage = function(evt){
    console.log('received Message' + evt.data)
    ws.close()
}
ws.onclose = funciton(evt) {
    console.log('Connection closed!')
}
```

### 客户端的API

#### 1 WebSocket 构造函数

WebSocket 对象作为一个构造函数，用于新建 WebSocket 实例

```js
var ws = new WebSocket(...)
```

#### WebSocket.readyState

**readyState**属性返回实例对象的当前状态，共有四种。

```js
- Connection: 0 表示正在连接
- OPEN: 1 连接成功
- CLOSING: 2 正在关闭
- CLOSED: 3 表示连接已经失败，或者打开连接失败
```

#### WebSocket.onopen

实例对象的**onopen**属性，用于指定连接成功后的回调函数

```js
ws.onopen = function () {
    ws.send('Hello Server!')
}
```

如果要指定多个回调函数，可以使用**addEventListener**方法

```js
ws.addEventListener('open', function(event) {
    ws.send('Hello Server!')
})
```

#### WebSocket.onclose

实例对象的**onclose**属性，用于指定连接关闭后的回调函数

```js
ws.onclose = function(e) {
    var code = e.code;
    var reason = e.reason;
    var waClean = e.wasClean;
    // handle close e
}

ws.addEventListener('close', function(e) {
    var code = e.code;
    var reason = e.reason;
    var wasClean = e.wasCLearn;
    // handle close e
})

```

#### WebSocket.onmessage

实例对象的**onmessage**属性，用于指定收到服务器数据后的回调函数

```js
ws.onmesage = function(e) {
    var data = e.data
    // 处理数据
}

ws.addEventListener('message', function(e) {
    var data = e.data
    // 处理数据
})
```

服务器数据可能是文本，也可能是二进制数据（blob对象或Arraybuffer）对象。
```js
ws.onmessage = function(e) {
    if(typeof e.data === String) {
        console.log('Received data string')
    }
    if (e.data instanceof ArrayBuffer) {
        var buffer = e.data;
    }
}
```

除了动态判断收到的数据类型，也可以使用**binaryType**属性，显式指定收到的二进制数据类型。

```js
// 收到的是 blob 数据
ws.binaryType = "blob"
ws.onmessage = function(e) {
    console.log(e.data.size)
}
// 收到的是 ArrayBuffer 数据
ws.binaryType = 'ArrayBuffer'
ws.onmessage = function(e) {
    console.log(e.data.byteLength)
}
```

#### WebSocket.send()

实例对象的**send()**方法用于向服务器发送数据。  
发送文本的例子。  

```js
ws.send('your message')
```

发送Blob对象的例子。

```js
var file = document.querySelector('input[type="file"]').files[0]
ws.send(file)
```

发送 ArrayBuffer 对象的例子。

```js
// sneding canvas ImageData as ArratBuffer
var img = canvas_cantext.getImageData(0,0,400,320)
var binary = new Uint8Array(img.data.length)
for(var i = 0; i < img.data.length; i++) {
    binary[i] = img.data[i]
}
ws.send(binary.buffer)
```

#### webSocket.bufferedAmount

实例对象的**bufferedAmount**属性，表示还有多少字节的二进制数据没有发送出去。它可以用来判断发送是否结束。

```js
var data = new ArrayBuffer(10000000)
socket.send(data)

if (socket.bufferedAmount === 0) {
    // 发送完毕
} else {
    // 发送未结束
}
```

#### webSocket.onerror

实例对象的**onerror**属性，用于指定报错时的回调函数。

```js
socket.onerrot = function (e) {
    // handle error e
}
socket.addEventListener('error', function (e) {
    // handle error e
})
```