<template>
<div class="register">
  <div >
    <van-nav-bar
      title="注册"
      left-arrow
      @click-left="onClickLeft"/>  
  </div>

      <!-- 输入任意文本 -->
  <van-form>

    <!-- 输入手机号，调起手机号键盘 -->
    <van-cell-group>
     <van-field placeholder="请输入您的手机号码" 
        type='number'
        maxlength="11"
        @blur="checkPhone"
        v-model="phone"
        left-icon="friends-o"
        :error='iserror'
        :error-message='iserrorMsg'

      />

    </van-cell-group>
  
     <!-- 短信验证和验证码按钮 -->
    <van-field
        maxlength="6"
        placeholder="请输入短信验证码"
        left-icon="comment-o" 
        v-model="value1"
        >
        <template #button>
          <van-button size="small" type="warning">发送验证码</van-button>
        </template>
    </van-field>

        <!-- 昵称 -->
    <van-field  
     
      placeholder="昵称(8—12位)" 
      left-icon="label-o"
      maxlength="12"
      minlength="1"
      
      v-model="nickname"
      />
        <!-- 密码 -->
    <van-field  
      type="password" 
      placeholder="密码(6-16位)" 
      maxlength="16"
      minlength="6"
      left-icon="goods-collect-o"
      @blur="checkPassword"
      v-model="password"
    />
        <!-- 再次输入密码 -->
    <van-field  
      type="password" 
      v-model="conpassword"
      placeholder="再次确认密码" 
      maxlength="16"
      minlength="6"
      left-icon="goods-collect-o" 
      @blur="checkConpassword"
    />
        
        
        <!-- 性别选择 -->
    <van-field name="radio" label="选择性别">
      <template #input>
        <van-radio-group v-model="radio" direction="horizontal" >
          <van-radio name="1" class="a1">男</van-radio>
          <van-radio name="0" class="a2">女</van-radio>
        </van-radio-group>
      </template>
    </van-field>
  </van-form>


       <!-- 提交按钮 -->
   <van-button round block type="info" native-type="submit" class="btn" @click="handle">
      完成提交
   </van-button>
   <!-- 用户协议 -->
   <div id="xieyi">
    <input type="checkbox" class="input"> &nbsp;同意并接受 <span class="xy"> <router-link to="/Agreement">&lt;&lt;搭伙用户协议&gt;&gt;</router-link></span> 
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
      // 昵称的注释
      nickname:"",
      //密码
      password:'',
      conpassword:"",
    }
  },
  methods: {
    //单击完成提交时得校验
    handle(){
      let radio=this.radio;
      console.log(radio);
      if( this.checkPhone()  && this.checkPassword() ){
         this.$router.push("/")
      }
    },
    



    //再次检验验证码
    checkConpassword() {
      //校验两次密码是否一致
      let password = this.password;
      let conpassword = this.conpassword;
      if (password == conpassword) {
        return true;
      } else {
        this.$toast({
          message: "两次密码不一致",
          position: "middle",
          duration: 4000,
        });
        return false;
      }
    },


    //检测密码
    checkPassword() {
      let password = this.password;
      let passwordReg = /^[0-9A-Za-z\.\-_]{6,16}$/;
      if (passwordReg.test(password)) {
        this.perror = false;
        return true;
      } else {
        this.$toast({
          message: "密码错误",
          position: "middle",
          duration: 5000,
        });
        return false;

      }
    },
   

    // 检测用户手机号
    checkPhone() {
      let phone = this.phone;
      let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
      if (phoneReg.test(phone)) {
        // 修改手机号的状态
        this.iserror = false;
        this.iserrorMsg='';
        return true;
      } else {
        //终止函数的执行
        this.iserror = true;
        this.iserrorMsg='输入的手机号错误';
        return false;
      }
    },

    onClickLeft() {
      this.$router.push('/login')
     },
   },
};
</script>


<style>
/* 底部选择框 */
/* .register .input{
  foot-size:
}; */
/* 底部样式 */
.register #xieyi{
margin-top: 20px;
margin-left: 20px;
}
.register .xy a{
  color:  #F3AC3F;
}

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
  /* 性别选择的样式 */
    .register .van-radio__icon--checked .van-icon{
    background-color: #F3AC3F;
    border-color: #F3AC3F;
  }
</style>
 