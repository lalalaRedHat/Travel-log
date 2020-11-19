/* 引入express框架*/
const express=require('express');
// 引入body-parser中间件
const bodyParser=require('body-parser');
// 引入CORS模块
const cors = require('cors');
// 引入Multer模块
const multer = require('multer');
// 引入UUID模块
const uuid = require('uuid');



/*********** 引入路由器 ***********/
   /* 按照user样式添加路由器 */
const userRouter=require('./router/user.js'); //用户路由器
const journalRouter=require('./router/journal.js'); //日志路由器






/*********** 引入路由器 ***********/





/*创建服务器*/
const app=express();
/*  端口8888  */
app.listen(8888 , ()=>{
    console.log('app is running...');
});






/*托管静态资源*/
app.use(express.static('./public'));

/*使用body-parser中间件*/
app.use(bodyParser.urlencoded({
    extended:false
}));

/* 使用CORS跨域 */
app.use(cors({
    origin:['http://localhost:8080','http://127.0.0.1:8888']
}));
























/*********** 挂载路由器并增加前缀 ***********/

app.use('/user',userRouter);//前缀/user
app.use('/journal',journalRouter);//前缀/journal



/*********** 使用路由器并增加前缀 ***********/