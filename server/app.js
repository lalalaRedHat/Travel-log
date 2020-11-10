/*引入express框架*/
const express=require('express');
//引入body-parser中间件
const bodyParser=require('body-parser');



/*********** 引入路由器 ***********/
const userRouter=require('./router/user.js'); //用户路由器

// 按照user样式添加路由器 
/*********** 引入路由器 ***********/





/*创建服务器*/
const app=express();
app.listen(8080);


/*托管静态资源*/
app.use(express.static('./public'));


/*使用body-parser中间件*/
app.use(bodyParser.urlencoded({
    extended:false
}));


/*********** 使用路由器并增加前缀 ***********/

app.use('/user',userRouter);//前缀/user



/*********** 使用路由器并增加前缀 ***********/