<!--
 * @Descripttion : 
 * @version      : 
 * @Author       : Lihy
 * @Date         : 2020-11-13 00:31:22
 * @LastEditors  : Lihy
 * @LastEditTime : 2020-11-16 01:15:00
-->
<template>
<div class="register">
  <div >
    <van-nav-bar
      title="注册"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"/>  
  </div>
  <!-- 输入任意文本 -->
  
  <van-field placeholder="手机号码"  left-icon="friends-o"/>
  <!-- 输入手机号，调起手机号键盘 -->

  <van-field
    center
    clearable
    placeholder="请输入短信验证码"
    left-icon="comment-o" 
  >
    <template #button>
      <van-button size="small" type="warning">发送验证码</van-button>
    </template>
  </van-field>
  <!-- 允许输入正整数，调起纯数字键盘 -->
  <van-field  type="digit" placeholder="昵称(最多不超过10个字)" left-icon="label-o"/>
  <!-- 允许输入数字，调起带符号的纯数字键盘 -->
  <van-field  type="number" placeholder="密码(6-16位)" left-icon="goods-collect-o"/>
  <!-- 输入密码 -->
  <van-field  type="password" placeholder="再次输入密码" left-icon="goods-collect-o" />

  <!-- 性别选择 -->
  <van-field name="radio" label="选择性别">
    <template #input>
      <van-radio-group v-model="radio" direction="horizontal">
        <van-radio name="1">男</van-radio>
        <van-radio name="2">女</van-radio>
      </van-radio-group>
    </template>
  </van-field>
  <!-- 提交按钮 -->
   <van-button round block type="info" native-type="submit" class="btn">
      完成提交
    </van-button>
</div>





</template>
<script>
export default {
  data(){
    return{
      text:"",
       radio: '1'
    }
  },
  methods: {
    // gotoMenu(){
    //   this.$rootreplace('Login.vue')
    // },
    onClickLeft() {
      this.$router.push('/login')
    },
    onClickRight() {
    this.$router.push('')
    },
   },
};
</script>
<style>
/* 按钮样式 */
 .register #button{
    border-radius: 15px;
   }
   .register .btn{
     border-radius: 5px;
     width: 90%;
     background-color: #5ABCC8;
    margin: 0 auto;
    border: 0;
  }
</style>
 