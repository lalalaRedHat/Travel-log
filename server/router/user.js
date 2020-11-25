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


//用户登录接口
u.post('/login', (req, res) => {
  console.log(req.body);
  //获取用户名和密码
  let phone = req.body.phone;
  let password = req.body.password;
  //以用户名和密码为条件进行查找
  // let sql = 'SELECT uid,username,password,email,phone,avatar,user_name FROM xz_user WHERE username=? AND password=?';
  let sql = 'SELECT phone FROM dhz_users WHERE phone=? AND password= MD5(?)';
  pool.query(sql, [phone, password], (error, results) => {
    if (error) throw error;
    if (results.length == 0) {
      res.send({ message: '登录失败', code: 0 });
    } else {
      res.send({ message: '登录成功', code: 1,results:results[0]});
    }
  });
});


//导出路由
module.exports=u;