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
                <van-icon name="arrow-left" color="#fff" size="24" />
            </template>

            <template #right>
                <van-icon name="friends-o" color="#fff" size="24" />
            </template>

        </van-nav-bar> 
        <!-- //头像 -->
        <div class="image">
            <van-image
                round
                width="6rem"
                height="6rem"
                fit="fill"
                :src="require('../assets/common/timg.jpg')"
            />
            <!-- 昵称 -->
            <span class="pname">haochen</span>
            <!-- 等级 -->
            <div class="grade">
                <span>等级3</span> 
            </div>
        </div>

        <van-tabs v-model="activeName">
            <van-tab title="个人资料" name="a">
                 <div>
                    <van-cell title="搭伙号" is-link value="011" />
                    <van-cell title="昵称"   is-link value="haochen" />
                    <van-cell title="联系电话" is-link value="189****8780" />
                    <van-cell title="性别" is-link value="男" />
                    <van-cell title="生日" is-link value="1997" />
                    <van-cell title="所在地" is-link value="山东" />


                    <van-cell title="会员等级" is-link value="LV1" to="Vip"/>

                    
                    <van-cell title="实名认证" is-link value="未完成" />
                    <van-cell title="个性标签" is-link value="这个人很懒" to="Tag"/>
                </div>
            </van-tab>
        <div class="img">
            <van-tab title="照片墙" name="b">
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
            </van-tab>
        </div>
        </van-tabs>

               
        
    </div>
</div>
</template>
<style scope>
    .personage{
        width: 100%;
    }
    .personage .navb{
        background: transparent;
    }
    .background{
        width: 100%;height: 300px;
        background:
         url('../assets/common/myPersonage_top.jpg')
           repeat ;
          background-size: 100%
    }
    .background .image{
      padding: 40px 100px;
      text-align: center;
    }
    .background .pname{
        font-size: 2rem;
        color:rgba(27, 29, 27, 0.904);
    }
    .background .man{
        margin: -30px 310px;
    }
    .background .grade{
        width: 100px;
        margin: 10px 30px;
    }
    .background .personage  .van-tabs__line{
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
      isFixed:true
    }
  },
   methods:{
    onClickLeft() {
      this.$router.push("/");
    },
     onClickRight() {
      this.$router.push("/login");
    },
    }
};

</script>
