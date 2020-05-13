var ws = require("nodejs-websocket");
var moment = require('moment');

console.log("开始建立连接...");

let users = [];
let conns = {};

var server = ws.createServer(function(conn){
    conn.on("text", function (obj) {
        obj = JSON.parse(obj);
        console.log('websocket接收到的消息：',obj)
        switch(obj.type){
            case 5:   //用户建立连接
                let isuser = users.some(item=>{
                    return item.uid === obj.uid
                })
                if(!isuser){
                    users.push({
                      nickname: obj.nickname,
                      uid: obj.uid,
                      status: 1
                    });
                }else{
                    users.map((item, index)=>{
                        if(item.uid === obj.uid){
                            item.status = 1;
                        }
                        return item;
                    })
                }
                conns[''+obj.uid+''] = conn;
                console.log('用户池：',users)
            case 1:   //私聊
                if(obj.targetUid && conns[obj.targetUid]){
                    conns[obj.targetUid].sendText(JSON.stringify(obj));
                }
                break;
            case 2:  //群聊
                
        }
    })
    conn.on("close", function (code, reason) {
        console.log("关闭连接")
    });
    conn.on("error", function (code, reason) {
        console.log("异常关闭")
    });
})

server.listen(8001);

console.log("WebSocket建立完毕");
