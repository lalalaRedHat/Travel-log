/*引入express框架*/
const express=require('express');
//引入连接池
const pool=require('../pool.js');
//创建日志路由器
const j=express.Router();


/*添加路由*/

// 日志分类路由
j.get('/classify',(req,res)=>{
    // 查询分类
    let sql = "SELECT cid,classify FROM dhz_classify ORDER BY cid ASC";
    pool.query(sql,(err,result)=>{
        if (err) throw err;
        res.send({ code:1,result:result });
    });
});

// 获取日志路由
j.get('/diary',(req,res)=>{
    res.send('日志');
});





//导出路由
module.exports=j;