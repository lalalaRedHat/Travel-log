<template>

  <div class="update">
    <!-- 标题 -->
    <van-nav-bar
      title="修改密码"
      left-arrow
      @click-left="onClickLeft"
    
    /> 
       <!--客户输入要修改的手机号  -->
      <van-cell-group>
     <van-field placeholder="请输入您的手机号码" 
        type='number'
        maxlength="11"
        @blur="checkPhone"
        v-model="phone"
        left-icon="friends-o"
        

      />
    </van-cell-group>
          <!-- 修改密码 -->
    <van-field  
      type="password" 
      placeholder="修改密码(6-16位)" 
      maxlength="16"
      minlength="6"
      left-icon="setting-o"
      @blur="checkPassword"
      v-model="password"
    />
        <!-- 修改之后的提交 -->
        <van-button 
          native-type="submit" 
          round block type="info"
          class="btn"
          @click="handle"

          >
            修改成功
        </van-button>
    <!-- <van-icon name="setting-o" /> -->
  </div>
</template>

<script>
export default {
  data(){
    return{
       iserror:false,
       iserrorMsg:'',
       text:"",
       phone:'',
      //  密码
      password:'',
    }
  },
  methods:{
      handle(){

      },


    // 客户修改密码
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
        
    // 用户输入手机号进行检测
    checkPhone() {
            let phone = this.phone;
            let phoneReg =/^[1][3,4,5,7,8][0-9]{9}$/g; 
            
            if (phoneReg.test(phone)) {
              // 修改手机号的状态
              // this.iserror = false;
              // this.iserrorMsg='';
              return true;
            } else {
              //终止函数的执行
              // this.iserror = true;
              // this.iserrorMsg='输入的手机号错误';
              return false;
            }
          },

    // 返回主页
    onClickLeft() {
            this.$router.push('/login')
          },
  }
}
</script>
<style >
  /* 按钮样式 */
    .update #button{
        border-radius: 15px;
      }
      .update .btn{
        border-radius: 5px;
        width: 90%;
        background-color: #5ABCC8;
        margin: 0 auto;
        border: 0;
      }
</style>