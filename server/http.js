var http = require('http');
var fs = require('fs');
var websocket = require('./index')
websocket.listen(8001)
//创建Server
var server = http.createServer()
//监听request请求事件，设置请求处理函数
server.on('request',function(req,res){
    console.log('收到客户端的请求了')
    console.log(req.url)
    // console.log(req.socket.remoteAddress,req.socket.remotePort)
    // res.write('hello')
    // res.write('world')
    // res.end()
    // res.setHeader('Content-Type','text/plain;charset=utf-8')
    // res.end('hello world 中国')
    var pathName = '/error.html'
    if(req.url==='/' || req.url==='/index.html'){
        pathName = '/index.html'
    }else if(req.url.indexOf('/static/')>-1){
        pathName = req.url
    }
    fs.readFile('../dist' + pathName,function(err,data){
        if(err){
            console.log(err)
            res.setHeader('Content-Type','text/plain;charset=utf-8')
            return res.end('文件读取失败,请稍后重试')
        }
        res.setHeader('Content-Type','text/html;charset=utf-8')
        res.end(data)
    })
})

//绑定端口号，启动服务
server.listen(3000,function(){
    console.log('服务器启动成功了')
})