SET NAMES UTF8;
DROP DATABASE IF EXISTS dhz;
CREATE DATABASE dhz CHARSET=UTF8;
USE dhz;


/***** 用户表 *****/
CREATE TABLE dhz_users(
    uid INT PRIMARY KEY AUTO_INCREMENT,             #用户ID
    nickname VARCHAR(32) ,                          #用户昵称
    username VARCHAR(32) UNIQUE NOT NULL,           #用户名
    password VARCHAR(32) NOT NULL,                  #密码(MD5加密)
    phone CHAR(11),                                 #手机号
    sex BOOL DEFAULT true,                          #性别  0-女false  1-男true
    birthday DATE,                                  #生日
    city VARCHAR(32),                               #所在地
    autograph VARCHAR(32),                          #个性签名
    vip CHAR(12) DEFAULT 'VIP0',                    #会员等级
    avatar VARCHAR(64) DEFAULT 'uname.jpg'          #用户头像
);


/***** 分类表 *****/
CREATE TABLE dhz_classify(
    cid SMALLINT PRIMARY KEY AUTO_INCREMENT,        #分类ID
    classify VARCHAR(16) UNIQUE NOT NULL            #分类名称
);


/***** 日志表 *****/
CREATE TABLE dhz_journal(
    jid INT PRIMARY KEY AUTO_INCREMENT,             #日志ID
    journal_title VARCHAR(64) NOT NULL,             #日志标题
    content TEXT NOT NULL,                          #日志正文
    log_time VARCHAR(32) NOT NULL,                  #发布时间
    browse INT DEFAULT 0,                           #日志观看数
    msg_number INT DEFAULT 0,                       #日志留言数
    fabulous INT DEFAULT 0,                         #日志点赞数

    picture_id INT NOT NULL,                        #日志图片ID
    users_id INT NOT NULL,                          #发布人名字
    users_avatar VARCHAR(64) NOT NULL,              #发布人头像
    users_city VARCHAR(32),                         #当前城市
    journal_classify SMALLINT                       #日志所属分类id
);


/***** 评论表 *****/
CREATE TABLE dhz_discuss(
    did INT PRIMARY KEY AUTO_INCREMENT,             #评论ID
    comment VARCHAR(300) ,                          #评论内容
    time DATETIME NOT NULL,                         #发表时间
    quantity INT NOT NULL,                          #点击数量

    discuss_id INT NOT NULL,                        #评论人名称
    discuss_avatar VARCHAR(64) NOT NULL,            #评论人头像
    journal_id INT NOT NULL                         #所属对应的日志id
);


/***** 附件表 *****/
CREATE TABLE dhz_picture(
    pid INT PRIMARY KEY AUTO_INCREMENT,             #附件ID
    journal_pic VARCHAR(64) NOT NULL,               #日志图片名
    journal_id INT                                  #所属哪一条日志id
);