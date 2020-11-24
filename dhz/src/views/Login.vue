<template>
  <div class="login">
   <van-image :src="require('../assets/logo.png')"  class="qc"/>



    <!-- 用户验证 -->
    <div>
        <van-field
         type='number'
          placeholder="请输入您的手机号"
          left-icon="friends-o"
          class="d1"
          maxlength='11'
          @blur="checkPhone"
          v-model="phone"
         

        />
        <van-field 
          left-icon="goods-collect-o" 
          placeholder="请输入您的密码" 
          maxlength='16'
          minlength='8'
          class="d2"
          type="password" 
          @blur="checkPassword"
          v-model="password"
          >
          <template #button>
            <van-button size="small" type="primary" id="btn1">忘记密码</van-button>
          </template>
        </van-field>
    </div>
    <div class="regist">
      <router-link to="/Register" >创建新用户</router-link>
    </div>

    <!-- 提交按钮 -->
    <van-button round block type="info" native-type="submit" class="btn" @click="handle">
      确定登录
    </van-button>


    <!-- 第三方引入 -->
    <div class="shejiao">
      <router-link to="" class="qq">
        <van-image :src="require('../assets/img/qq.png')" width="25" /> QQ登录
      </router-link>
      <router-link to="" class="wx">
        微信登录<van-image :src="require('../assets/img/wx.png')" width="25" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
   data(){
    return{
      //手机号
      iserror:false,
      iserrorMsg:'',
      text:"",
      radio: '1',
      phone:'',
      value1:'',
     //密码
      password:'',
     
    }
  },
  methods: {
     //单击登录时校验按钮表单
     handle(){
       if(this.checkPhone() && this.checkPassword){
         this.$router.push("/")
       }
     },
     
     //密码验证
      checkPassword() {
          let password = this.password;
          let passwordReg = /^[0-9A-Za-z\.\-_]{8,16}$/;
          if (passwordReg.test(password)) {
            this.perror = false;
          } else {
            this.$toast({
              message: "密码错误",
              position: "middle",
              duration: 5000,
            });
            return false;

          }
        },

    //检测手机号
    checkPhone() {
      let phone = this.phone;
      let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
      if (phoneReg.test(phone)) {
        // 修改手机号的状态
      
        return true;
      } else {
        //终止函数的执行
        this.$toast({
              message: "手机号格式错误",
              position: "middle",
              duration: 5000,
            });
        return false;
      }
    },
    onClickLeft() {
      this.$router("/");
    },
    onClickLeft() {
      this.$rooter.push("/register");
    },
  },
};
</script>

<!--背景图片的样式-->
<style>
 .login .van-icon-friends-o::before {
   color: #fff;
   font-size: 24px;
 }
 .login .van-icon-goods-collect-o::before {
   color: #fff;
   font-size: 24px;
   margin-top: 4px;
}
.login {
  background: url(../assets/img/dl.png) no-repeat 100%;
  background-size: 120%;
  height: 100%;
}
.login .qc{
  width: 100%;
}
.login .qc img{
  width: 60%;
  margin: 20% auto;
}
/* 用户透明 */
.login .d1,.login .d2{
  background: transparent;
}
.login .van-cell::after{
  border: 0;
}
.login .d1,.login .d2{
    border-bottom: 1px solid #fff;
    padding: 10px 0;
    width: 85%;
    margin: 0 auto;
}
.login input{
  color: #fff;
}
.login input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
  color: #fff;
  font-size: 14px;
}
/* 忘记密码样式 */
.login #btn1 {
  background-color: #ccc;
  margin: 0 auto;
  border-radius: 20px;
  border: 0;
  width: 80px;
  /* background: transparent; */
}
/* 注册的样式 */
.login .regist a{
  color: #fff;
  font-size: 14px;
  font-weight: lighter;
  margin: 5% 7.5% 0;
  float: right;
}
.login .regist{
  height: 5%;
  clear: both;
}
/* 登录的样式 */
.login .btn {
  background: transparent;
  border: 2px solid #fff;
  width: 85%;
  margin: 5% auto 0;
}
/* 微信QQ样式 */
.login .shejiao {
  justify-content: space-between;
  display: flex;
  position: absolute;
  width: 100%;
  bottom: 20px;
}
.login .qq,
.login .wx {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #fff;
}
.login .qq {
  margin-left: 7.5%;
}
.login .wx {
  margin-right: 7.5%;
}

</style>