<template>
    <div v-if="!islogin">
        <input class="nickname" v-model="username" type="text" placeholder="请输入用户名"><span class="tip" v-if="!username&&clickTimes>0">用户名不能为空</span>
        <input class="nickname" v-model="password" type="text" placeholder="请输入密码"><span class="tip" v-if="!password&&clickTimes>0">密码不能为空</span>
        <div>
            <button class="loginBtn" @click="login(0)">登录</button>
            <button class="loginBtn" @click="login(1)">注册</button>
        </div>
    </div>
    <div v-else>
        <section class="topbar">
            <span>聊天室</span><span @click="addFriend">添加朋友</span>
        </section>
        <section class="content">
            <ul>
                <li v-for="(item,index) in userList" :key="index">
                    <router-link :to="{name:'item',query:{username:item.remarkname,uid:item.id}}">
                        <span>{{item.remarkname}}</span>
                        <span class="unread" v-if="item.unread">{{item.unread}}</span>
                    </router-link>
                </li>
            </ul>
        </section>
        <section class="bottombar"></section>
    </div>
</template>

<script>
var moment = require('moment');
import '../api/websocket'
export default{
    name:'home',
    data(){
        return{
            islogin:window.uid ? true : false,
            username:'',
            password:'',
            uid:'',
            clickTimes:0,
            userList:[],     //好友列表
            unreadList:{}    //未读消息列表
        }
    },
    created(){   
        if(window.uid==2){
            this.userList = [{id:3,username:"华华",remarkname:"华华",unread:0},{id:4,username:"嘻嘻",remarkname:"嘻嘻",unread:0}]
        }else if(window.uid==3){
            this.userList = [{id:2,username:"小红",remarkname:"小红",unread:0}]
        }else if(window.uid==4){
            this.userList = [{id:2,username:"小红",remarkname:"小红",unread:0}]
        }
    },
    mounted(){
    },
    methods:{
        //注册登录
       login(isregister){
            // this.clickTimes++
            // if(!this.username || !this.password){
            //    return
            // }
            // this.$api.get('/login',{
            //     username:this.username,
            //     password:this.password,
            //     register:isregister
            // },response => {
            //     if(response && response.status>=200 && response.status<300){
            //         let data = response.data
            //         if(data.code){  //登录成功或者注册成功
            //             this.islogin = true
            //             if(data.result && data.result.length){   //有好友列表
            //                 let friendsList = data.result[0].friendslist
            //                 friendsList = JSON.parse(friendsList) || []
            //                 this.userList = friendsList
            //             }
            //             this.conWebSocket();    //连接websocket
            //         }else{
            //             alert(data.msg)
            //         }
            //     }
            //     console.log(response)
            // })
            if(this.username=="小红"){
                this.uid = 2;
                this.userList = [{id:3,username:"华华",remarkname:"华华",unread:0},{id:4,username:"嘻嘻",remarkname:"嘻嘻",unread:0}]
            }else if(this.username=="华华"){
                this.uid = 3;
                this.userList = [{id:2,username:"小红",remarkname:"小红",unread:0}]
            }else if(this.username=="嘻嘻"){
                this.uid = 4;
                this.userList = [{id:2,username:"小红",remarkname:"小红",unread:0}]
            }
            this.islogin = true;
            window.uid = this.uid;
            window.username = this.username;
            window.socket.send(JSON.stringify({
                uid: this.uid,
                type: 5,
                nickname: this.username,
            }));
            let vm = this;
            window.socket.onmessage = function(e){
                let message = JSON.parse(e.data);
                console.warn('首页接收到的信息：',message);
                if(message.type==1){   //私聊信息
                    let uid = message.uid   //发送者的uid
                    vm.userList.forEach((item,index)=>{
                        if(item.id == uid){
                            item.unread++;    //未读消息数加一
                        }
                    })
                }
            }
       },
       //添加好友
       addFriend(){
           
       },
    }
}
</script>

<style lang="less" scoped>
    .nickname{
        height:2rem;
        margin:0.5rem;
    }
    .loginBtn{
        margin:1rem;
        height:2.5rem;
        width: 4rem;
        background:#dde2dd;
        color:#0a84bb;
        font-weight: bold;
    }
    .tip{
        color:red;
        font-size: 0.8rem;
    }
    .topbar{
        position: fixed;
        top:0;
        width:100%;
        height:2.5rem;
        background: #dedbdb;
        line-height: 2.5rem;
        span{
            margin-left:3rem; 
        }
    }
    .content{
        margin-top:2.5rem;
        li{
            list-style: none;
            height: 3.5rem;
            border-bottom: 1px solid #d4d0d0;
            padding: 0 1rem;
            display: flex;
            align-items: center;
            a{
                text-decoration: none;
                color:black;
                display: flex;
                flex:1;
                justify-content: space-between;
                align-items: center;
            }
            .unread{
                display: inline-block;
                width:1.5rem;
                height:1.5rem;
                background-color: #f57272;
                text-align: center;
                border-radius: 1.5rem;
                color:#26198e;
            }
        }
    }
</style>