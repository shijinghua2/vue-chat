<template>
<div ref="box">
    <div class="top"><button @click="goback">返回</button>和{{this.$route.query.username}}聊天</div>
    <div class="content">
        <ul>
            <li v-for="(item,index) in messageList" :key="index" v-bind:class="{'self':item.isSelf}">
                <p class=""><span class="name">{{item.username}}</span>{{item.date}}</p>
                <p class="">{{item.content}}</p>
            </li>
        </ul>
    </div>
    <div class="footer">
        <input type="text" v-model="msg" placeholder="请输入内容" @keyup.enter="send">
        <button @click="send">发送</button>
    </div>
</div>
</template>
<script>
var moment = require('moment');
import '../api/websocket';
export default{
    name:'item',
    data(){
        return{
            messageList:[],
            msg:'',
            targetUid:this.$route.query.uid
        }
    },
    created(){
        console.log(this.$route.query);
        console.log(window.socket)
        console.log(window.uid)
    },
    mounted(){
        let vm = this;
        window.socket.onmessage = function(e){
            let message = JSON.parse(e.data);
            console.warn('私聊页接收的信息：',e.data);
            if(message.uid == vm.targetUid){  //发送这条信息给我的人 得是 我正在聊天的人
                vm.messageList.push({
                    username:message.username,
                    content:message.content,
                    date:message.date,
                    isSelf:0
                })
            }else{

            }
        }
    },
    updated(){
        //聊天超过一屏后滚动条定位到底部
        let box = this.$refs.box;
        document.documentElement.scrollTop = box.scrollHeight;
    },
    methods:{
        //发送消息
        send(){
            if(!this.msg){
                alert("请输入内容")
                return
            }
            this.messageList.push({
                username:window.username,
                content:this.msg,
                date:moment().format('MM-DD HH:mm:ss'),
                isSelf:1
            })
            window.socket.send(JSON.stringify({
                type:1,  //type 1:私聊 2:群聊
                uid:window.uid,    //发送方
                targetUid:this.targetUid,   //目标方
                username:window.username,
                content:this.msg,
                date:moment().format('MM-DD HH:mm:ss'),
            }))
            this.msg = ''
        },
        //返回上一个页面
        goback(){
            window.history.back(-1);
        }
    }
}
</script>
<style lang="less" scoped>
    .top{
        position: fixed;
        top:0;
        width:100%;
        height:2.5rem;
        background:#fff;
        line-height:2.5rem;
        padding-left:1rem;
        border-bottom:1px solid #f7f4f4;
    }
    .content{
        margin-top:3rem;
        margin-bottom: 5.5rem;
        li{
            margin:1rem;
            line-height: 1.5rem;
            text-align: left;
            padding-right:30%;
            padding-left:0;
            .name{
                color:#98b5e8;
                margin-right:0.5rem;
            }
        }
        .self{
            text-align: right;
            padding-left:30%;
            padding-right:0;
            .name{
                color:#ec91bf;
            }
        }
    }
    .footer{
        position: fixed;
        bottom: 0;
        width:100%;
        height:4.5rem;
        background:#fff;
        border-top: 1px solid #f7f4f4;
        display: flex;
        align-items: center;
        input{
            height:2rem;
            width:70%;
            margin:1rem;
        }
        button{
            height:2rem;
            flex:1;
            margin-right:1rem;
        }
    }
</style>
