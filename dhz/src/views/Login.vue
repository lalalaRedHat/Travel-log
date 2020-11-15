<!--
 * @Descripttion : 
 * @version      : 
 * @Author       : Lihy
 * @Date         : 2020-11-13 00:31:22
 * @LastEditors  : Lihy
 * @LastEditTime : 2020-11-16 01:13:23
-->
<template>
  <div class="login">
    <van-field  type="digit" placeholder="请输入您的手机号" left-icon="friends-o"/>
    <van-field
      left-icon="goods-collect-o"
        placeholder="请输入您的密码"
      >
        <template #button>
        <van-button size="small" type="primary" id="btn">忘记密码</van-button>
      </template>
    </van-field>
    <p>注册新用户</p>
    <!-- 提交按钮 -->
   <van-button round block type="info" native-type="submit" class="btn">
      完成提交
    </van-button>
  </div>
  
</template>
<script>
export default {
  data(){

  },
  methods: {
    onClickLeft() {
      this.$router('/')
    },
    onClickLeft() {
    this.$rooter.push('/register')
    },
  },
}
// 背景图片的样式

</script>
<style>
.login{
  background: url(../assets/img/dl.png);
  width: 100%;
 }
   .login #btn{
   border-radius: 20px;
   background-color:#ccc;
   margin: 0 auto;
   border: 0;
   width: 80px;
  }

</style>