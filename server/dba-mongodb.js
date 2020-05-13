var mongoose = require('mongoose')

var Schema = mongoose.Schema

//连接数据库
mongoose.connect('mongodb://localhost/chat',{ useNewUrlParser: true })

//设计表结构
var userSchema = new Schema({
    id: {
        type: String,
        required : true
    },
    username: {
        type: String,
        required : true
    },
    password: {
        type: String,
        required : true
    },
    friendsList : [{ id: Number, username: String }]
})

//将文档结构发布为模型
//第一个参数：传入一个 大写名词单数字符串 用来表示你的数据库名称
//           mongoose会自动将大写名词的字符串生成 小写复数
var User = mongoose.model('User',userSchema)

//增加数据
var admin = new User({
    id: 1,
    username: '施施',
    password: '123456',
    friendsList : []
})

admin.save(function(err,ret){
    if(err){
        console.log('添加失败')
    }else{
        console.log('添加成功')
        console.log(ret)
    }
})