<template>
<div class="personage">
        <!-- 背景 -->
    <div class="background">
        <van-nav-bar title="" 
            left-arrow fixed 
            :border="show_border" 
            class="navb" 
            @click-left="onClickLeft" 
            @click-right="onClickRight"
            >

            <template #left>
                <van-icon name="arrow-left" color="#5ABCC8" size="24" />
            </template>

            <template #right>
                <van-icon name="setting-o" color="#5ABCC8" size="24" />
            </template>

        </van-nav-bar> 
        <!-- //头像 -->
        <div class="image">
            <van-image
                round
                width="6rem"
                height="6rem"
                fit="fill"
                :src="require(`../assets/avatar/uname.png`)"
            />
            <!-- 昵称 -->
            <div>
                <span class="pname">{{this.art.nickname}}</span>
            </div>
            
            <!-- 等级 -->
            <div class="grade">
                <span>等级{{this.art.vip}}</span> 
            </div>
        </div>

        <van-tabs v-model="activeName">
            <van-tab title="个人资料" name="a">
                 <div>
                    <van-cell title="搭伙号" is-link :value="this.art.uid" />
                    <van-cell title="昵称"   is-link :value="this.art.nickname" />
                    <van-cell title="联系电话" is-link :value="this.art.phone" />
                    <van-cell title="性别" is-link :value="this.art.sex" />
                    <van-cell title="生日" is-link :value="this.art.birthday" />
                    <van-cell title="所在地" is-link :value="this.art.city" />
                    <van-cell title="会员等级" is-link :value="this.art.vip" to="Vip"/>
                    <van-cell title="个性标签" is-link :value="this.art.autograph" to="Tag"/>
                </div>
            </van-tab>
        <div class="img">
            <van-tab title="照片墙" name="b">
                <lazy-component>
                <van-image
                    width="125px"
                    height="100px"
                    fit="fill"
                    :src="require('../assets/journal-pic/449eb2c2-60a4-4a33-8bc4-902b5a0a5e82.jpg')"
                    />
                <van-image
                    width="125px"
                    height="100px"
                    fit="fill"
                    :src="require('../assets/journal-pic/61bd8bcd-817b-4ae3-91b3-5677c10529ee.jpg')"
                    />
                    <van-image
                    width="125px"
                    height="100px"
                    fit="fill"
                    :src="require('../assets/journal-pic/6d2cb06e-9292-44e4-9f90-67a6f5eaadbe.jpg')"
                    />
                    <van-image
                    width="125px"
                    height="100px"
                    fit="fill"
                    :src="require('../assets/journal-pic/709934c5-0826-4883-8703-19c57b707e78.jpg')"
                    />
                    <van-image
                    width="125px"
                    height="100px"
                    fit="fill"
                    :src="require('../assets/journal-pic/a0228683-91e5-4b76-9c5e-eab52d9a46dd.jpg')"
                    />
                    <van-image
                    width="125px"
                    height="100px"
                    fit="fill"
                    :src="require('../assets/journal-pic/a8210544-460c-49ee-ae7f-c1398437332c.jpg')"
                    />
                </lazy-component>
            </van-tab>
        </div>
            <!-- <van-tab title="个人日志" name="c">
                    

                



            </van-tab> -->
        </van-tabs>

               
        
    </div>
</div>
</template>
<style>
    .personage{
        width: 100%;
    }
    .personage .navb{
        background: transparent;
    }
    .personage .background{
        width: 100%;height: 300px;
        background:
         url('../assets/img/myPersonage_top.jpg')
           repeat ;
          background-size: 100%
    }
    .personage .background .image{
      padding: 40px 100px;
      text-align: center;
    }
    .personage .background .pname{
        width: 200px;
        font-size: 1rem;
        color:rgba(27, 29, 27, 0.904);
        padding: 150px  10px;
    }
    .personage .background .man{
        margin: -30px 310px;
    }
    .personage .background .grade{
        width: 100px;
        margin: 10px 30px;
    }
    .personage .van-tabs__line{
    background-color: #5ABCC8;
  }
</style>
<script>

export default {
  data() {
    return {
      activeName: 'a',
      show_border:false,
       fileList: [],
       // 是否吸顶
      isFixed:true,
      art:{},
      aa:'',
      // 当前用户
      userPhone:this.$store.state.userPhone
    }
  },
   methods:{
       onClickLeft() {
            this.$router.push("/");
        },
        onClickRight() {
            this.$router.push("/login");
        localStorage.clear()
        },
    },
    mounted(){
        let phone = this.userPhone.phone;
    //   console.log(phone);
        //获取服务器传的手机号的值
   this.axios.get('/journal/individual?phone=' + phone).then(res=>{
        this.art=res.data.articleInfo;
    // console.log(res.data.articleInfo);
    // console.log(this.art);
    })
    // this.aa=this.art.phone;
    },
};

</script>
