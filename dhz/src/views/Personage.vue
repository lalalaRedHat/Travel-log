<template>
<div class="personage">
        <!-- 背景 -->
    <div class="background">
        <van-nav-bar title="" left-arrow fixed :border="show_border" class="navb">

            <template #left>
                <van-icon name="arrow-left" color="#fff" size="24"  />
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
                    <van-cell title="昵称" is-link value="haochen" />
                    <van-cell title="联系电话" is-link value="189****8780" />
                    <van-cell title="性别" is-link value="男" />
                    <van-cell title="生日" is-link value="1997" />
                    <van-cell title="所在地" is-link value="山东" />
                    <van-cell title="会员等级" is-link value="LV1" />
                    <van-cell title="实名认证" is-link value="未完成" />
                    <van-cell title="个性标签" is-link value="这个人很懒" />
                </div>
            </van-tab>
            <van-tab title="照片墙" name="b">
                <van-uploader v-model="fileList" multiple :max-count="9" />
            </van-tab>
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
    .image{
      padding: 40px 150px;
      
    }
    .pname{
        font-size: 2rem;
        color:rgba(27, 29, 27, 0.904);
    }
    .man{
        margin: -30px 310px;
    }
    .grade{
        width: 100px;
        margin: 10px 30px;
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
    
    }
};

</script>
