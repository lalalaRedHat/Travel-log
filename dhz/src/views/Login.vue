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
        <router-link to="/Register" class="regist">创建新用户</router-link>
        <!-- 提交按钮 -->
        <van-button round block type="info" native-type="submit" class="btn" @click="handle">
          确定登录
        </van-button>
    </div>


    <!-- 第三方引入 -->
    <div class="shejiao">
      <router-link to="" class="qq">
        <van-image :src="require('../assets/img/qq.png')" /> QQ登录
      </router-link>
      <router-link to="" class="wx">
        微信登录<van-image :src="require('../assets/img/wx.png')" />
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
// 背景图片的样式
</script>
<style scope>
 .login .van-icon-friends-o::before {
   color: #fff;
 }
 .login .van-icon-goods-collect-o::before {
    color: #fff;
}
.login {
  background: url(../assets/img/dl.png);
  width: 100%;
  /* height: 800px;
  margin-top: 200px; */
  position: relative;
  background-size: 100%;
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
.login .regist {
  color: #fff;
font-weight: 500;
  margin-left: 280px;
}
/* 登录的样式 */
.login .btn {
  border-radius: 20px;
  background-color: #ccc;
  background: transparent;
  border: 2px solid #ccc;
  
  margin: 0 auto;
  
  width: 90%;
  margin-top: 15px;
}

/* 整体页面的样式 */
/* .login{
    margin-top: 200px;
    height: 300px;
    position: relative;
  } */
/* 微信QQ样式 */
.login .shejiao {
  justify-content: space-between;
  display: flex;
  margin-top: 150px;
}
.login .qq,
.login .wx {
  color: #ccc;
}
.login .qq {
  margin-left: 10px;
}
.login .wx {
  margin-right: 10px;
}
</style>