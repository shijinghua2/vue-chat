var express = require('express')
var websocket = require('./index')
websocket.listen(8001)
var operatedb = require('./dba-mysql')

//1.创建app
var app = express()

// app.all("*",function(req,res,next){
//     //设置允许跨域的域名，*代表允许任意域名跨域
//     res.header("Access-Control-Allow-Origin","*");
//     //允许的header类型
//     res.header("Access-Control-Allow-Headers","content-type");
//     //跨域允许的请求方式 
//     res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
//     if (req.method.toLowerCase() == 'options')
//         res.send(200);  //让options尝试请求快速结束
//     else
//         next();
// })

//当以 /public/开头的时候，去 ./public/ 目录中找对应的静态资源
app.use('/static/',express.static('../dist/static/'))

//配置使用art-template 模板引擎
//第一个参数，表示 当渲染以.art结尾的文件的时候，使用art-template模板引擎
app.engine('html',require('express-art-template'))
//如果要修改默认的views目录，
app.set('views','../dist')

//get请求
app.get('/',function(req,res){
    //获取请求参数：req.query
    res.render('index.html')
})

//注册登录并获取好友列表
app.get('/login',function(req,res){
    var params = req.query
    if(!params.hasOwnProperty('username') || !params.hasOwnProperty('password')){
        res.statusCode = 404
        return res.send('参数必须包含username和password')
    }
    console.log(params.register)
    operatedb("select * from users where username=?",[params.username],function(err,result){
        if(err){
            console.log('查询失败')
            res.statusCode = 404
            return res.send('404 NOT FOUND')
        }
        var dataString = JSON.stringify(result)
        var data = JSON.parse(dataString)
        var obj = {
            code:0,
            msg:'',
            result:[]
        }
        console.log(dataString)
        if(data && data.length>0){
            if(params.register=='1'){       //如果用户要注册
                console.log('该用户名已被注册')
                obj.code = 0
                obj.msg = '该用户名已被注册'
                res.json(obj)
            }else{                     //如果用户要登录
                if(data[0].password == params.password){  //密码一致
                    console.log('登录成功')
                    obj.code = 1
                    obj.msg = '登录成功'
                    obj.result = data
                    res.json(obj)
                }else{                                   //密码不一致
                    console.log('密码不正确')
                    obj.code = 0
                    obj.msg = '密码不正确,请重新输入'
                    res.json(obj)
                }
            }
        }else{
            if(params.register=='1'){     //如果用户要注册
                operatedb('insert into users set ?',{
                    username:params.username,
                    password:params.password
                },(err,result)=>{
                    if(err){
                        console.log('注册失败')
                        res.statusCode = 404
                        return res.send('注册失败')
                    }
                    console.log('注册成功')
                    obj.code = 2
                    obj.msg = '注册成功'
                    obj.result = []
                    res.json(obj)
                })
            }else{                   //如果用户要登录
                console.log('该用户不存在')
                obj.code = 0
                obj.msg = '该用户不存在'
                res.json(obj)
            }
        }
    })
})

app.listen(3001,function(){
    console.log('express app is running ...')
})