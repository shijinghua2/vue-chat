const mysql = require('mysql')

//创建连接池
var pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'root',
    database:'chatdb',
    port:3306
})

//连接并且操作数据库
var operatedb = function(query,params,callback){
    if(typeof query !== 'string' || typeof callback !== 'function'){
        return
    }
    pool.getConnection(function(err,connection){
        if(err){
            console.log('数据库连接失败')
            return
        }
        connection.query(query,params,(err,result)=>{
            callback & callback(err,result)
        })
        connection.release();
    })
}

//创建连接
// var connection = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'root',
//     database:'chatdb',
//     port:3306
// })

//连接数据库
// connection.connect()

//添加数据
// connection.query('insert into users set ?',{
//     id:5,
//     username:'嘻嘻',
//     password:'1234',
// },(err,result)=>{
//     if(err){
//         console.log('添加出错',err)
//         return
//     }
//     console.log(result)
// })

//查询数据
// connection.query("select * from users where id=1",(err,result)=>{
//     if(err){
//         console.log('查询失败',err)
//         return
//     }
//     console.log(result)
// })


//修改数据
// var friendslist = [{id:4,username:'哈哈',remarkname:'哈哈'}]
// friendslist = JSON.stringify(friendslist)
// connection.query("update users set friendslist=? where id=?",[friendslist,5],(err,result)=>{
//     if(err){
//         console.log('修改失败',err)
//         return
//     }
//     console.log(result)
// })

//删除数据
// connection.query("delete from users where id=?" , [3] , (err,result)=>{
//     if(err){
//         console.log('删除失败',err)
//         return
//     }
//     console.log(result)
// })

//关闭连接
// connection.end()

module.exports = operatedb;