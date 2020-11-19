/*引入express框架*/
const express=require('express');
//引入连接池
const pool=require('../pool.js');
// 引入Multer模块
const multer = require('multer');
// 引入UUID模块
const uuid = require('uuid');


/*********** 文件上传配置 ***********/
// 定义存储规则
let storage = multer.diskStorage({
    //上传时目录的规则
    //req,代表的是当前的HTTP请求对象
    //file,代表是当前上传的文件对象
    //cb(callback),回调函数,让Multer按照指定的规则进行相关的操作
    destination:function(req,file,cb){
      //cb(null,destination)
      //null代表错误对象
      //destination代表文件上传的目录
      cb(null,'./public/journal-pic');
    },
    //上传时文件名称的规则
    filename:function(req,file,cb){
      // 为上传的文件重新生成一个带有扩展名的文件名称               
      let mainname = uuid.v1();
      // file代表的当前上传的文件对象,它包含有以下属性
      // originalname,文件对象的原始名称,如23456435745.jpg
      //2. 获取文件原来的扩展名 
      let extension = file.originalname.substr(file.originalname.lastIndexOf('.') + 1).toLowerCase();
      //3. 将1和2拼接在一起形成新的文件名称 
      let filename = mainname + '.' + extension;
      // 4.通过回调函数告诉Multer,让其按指定的规则进行命名
      cb(null,filename);
    }
  });
  // 使用存储规则创建Multer对象
  const upload = multer({
    storage:storage
  })

/*********** 文件上传配置 ***********/




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
    
    // console.log(cid);
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


// 发布日志插入数据
j.post('/diaryadd',(req,res)=>{
    let obj = req.body;
    console.log(obj);
});


//导出路由
module.exports=j;