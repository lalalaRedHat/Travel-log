/*
 * @Descripttion : 
 * @version      : 
 * @Author       : Lihy
 * @Date         : 2020-11-16 22:39:07
 * @LastEditors  : Lihy
 * @LastEditTime : 2020-11-17 20:12:39
 */
/*引入express框架*/
const express=require('express');
//引入连接池
const pool=require('../pool.js');
//创建日志路由器
const j=express.Router();


/*添加路由*/

// //获取所有日志分类信息的接口
j.get('/classify',(req,res)=>{
    // 获取日志分类表中的全部数据
    let sql = "SELECT cid,classify FROM dhz_classify ORDER BY cid ASC";
    // 执行SQL语句
    pool.query(sql,(err,result)=>{
        if (err) throw err;
        res.send({ code:1,result:result });
    });
});

// 获取日志路由
j.get('/diary',(req,res)=>{
    // 获取地址栏的cid参数,该参数表示的分类的ID
    let cid = req.query.cid;
    // 获取地址栏中的page参数,该参数表示页码
    let page = parseInt(req.query.page);
    //存储分页显示的记录数量
    let pagesize = 10;
    //声明总页数变量
    let pagecount;
    
    console.log(cid);
    //SQL查询日志全部信息
    let sql = 'SELECT jid,journal_title,content,log_time,browse,msg_number,journal_city,avatar,nickname FROM dhz_journal INNER JOIN dhz_users ON users_id = uid WHERE journal_classify=?';
    // 执行SQL查询
    pool.query(sql,[cid],(err,result)=>{
        if (err) throw err;
        let data1 = result;
        result.forEach((value, index, array) => {
            // 查询日志附带的图片
            let sql = 'SELECT picture_pic FROM dhz_picture WHERE journal_id=?';
            pool.query(sql,[value.jid],(err,pic)=>{
                if (err) throw err;
                // 拼接每个日志需要的图片
                value.pic = pic;
                if(index==array.length-1){
                    res.send({ code:1,result: data1 })
                };
            });
        })
    });

});





//导出路由
module.exports=j;