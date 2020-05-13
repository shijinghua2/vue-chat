
if(window.WebSocket){
    if(!window.socket){
        window.socket = new WebSocket('ws://localhost:8001');
        socket.onopen = function(e){
            console.log("连接服务器成功");
        }
        socket.onclose = function(e){
            console.log("服务器关闭");
        }
        socket.onerror = function(){
            console.log("连接出错");
        }
        // 接收服务器的消息
        // socket.onmessage = function(e){
        //     let message = JSON.parse(e.data);
        //     console.warn(e.data);
        // }
    }
}