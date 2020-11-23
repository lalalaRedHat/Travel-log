/*引入express框架*/
const express=require('express');
//引入连接池
const pool=require('../pool.js');
//创建用户路由器
const u=express.Router();


// 用户注册的接口
u.post('/register', (req, res) => {
  //console.log(md5('12345678')) ;
  //获取用户名和密码
  let phone = req.body.phone;
  let password = req.body.password;
  let nickname = req.body.nickname;
   console.log(phone,password);
  //查找用户是否存在
  let sql = 'SELECT COUNT(uid) AS count FROM dhz_users WHERE phone=?';
  pool.query(sql, [phone],(error, results) => {
    if (error) throw error;
    //如果用户不存在,则插入记录
    if (results[0].count == 0) {
      //console.log(results);
      sql = 'INSERT INTO dhz_users(phone,password,nickname) VALUES(?,MD5(?),?)';
      
      pool.query(sql, [phone, password,nickname], (error, result) => {
        if (error) throw error;
        console.log(result);   
        res.send({code: 1});
      })
    } else { //否则产生合理的错误提示
      res.send({code: 0 });
    }
  })
});

//导出路由
module.exports=u;