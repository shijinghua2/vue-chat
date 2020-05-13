var express = require('express')
var bodyParser = require('body-parser')

//1.创建app
var app = express()

//当以 /public/开头的时候，去 ./public/ 目录中找对应的静态资源
app.use('/public/',express.static('./public/'))

//get请求
app.get('/',function(req,res){
    //获取请求参数：req.query
    console.log(req.query)
    res.send('hello world')
})

//post请求
//配置body-parser中间件（插件，专门用来解析表单post请求体）
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.post('/post',function(req,res){
    //获取请求参数：req.body
    console.log(req.body)
})

//配置使用art-template 模板引擎
//第一个参数，表示 当渲染以.art结尾的文件的时候，使用art-template模板引擎
app.engine('art',require('express-art-template'))
//如果要修改默认的views目录，
// app.set('views',render函数的默认路径)
app.get('/aa',function(req,res){
    //第一个参数不能写路径，默认会去项目中的views目录查找该模板文件
    res.render('index.art',{title:'haha'})
})

app.listen(3001,function(){
    console.log('express app is running ...')
})