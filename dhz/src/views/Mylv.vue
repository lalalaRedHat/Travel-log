<template>
  <div class="mylv">
    <!-- 头 -->
        <div >
        <van-nav-bar  class="head"
        title="干货 | 北海道亲子游常识" 
        left-text="" >
        <template #left>
          <router-link to="/">
            <van-icon class="jian" name="arrow-left" />
          </router-link>
        </template>
        <template #right>
            <van-icon class="xin" name="like-o" />
        </template>
        </van-nav-bar>
        </div>

         <!-- 文章开始 -->
        <!-- 开头中间分隔内容 -->
        <div class="topf">
          <div class="topf2">
          <van-grid direction="horizontal" :column-num="1">
          <van-grid-item text="_____.Q&A.____" />
          </van-grid>
          </div>
          <van-grid direction="horizontal" :column-num="1">
          <van-grid-item text="【出行前须知】" />
          </van-grid>
        </div> 
        <!-- 问题 -->
        <!-- 第一篇 -->
        <div class="story">
        <van-grid :border="false" :column-num="1">
         <van-loading type="spinner" />
            <van-image 
            src="../assets/img/m3.png" />
            <van-loading type="spinner" />
            <van-grid-item text="正文" />
        </van-grid>
        </div>
        <div class="topf">
        <van-grid direction="horizontal" :column-num="1">
        <van-grid-item text="----- 出行前须知 -----" />
        </van-grid>
        </div>
        <div class="story">
        <van-grid :border="false" :column-num="1">
          <van-loading type="spinner" />
            <van-image 
            src="../assets/img/m1.png" />
          <van-loading />
        <van-grid-item text="1:群里提出的问题以及完整会打给打架整理在下面啦！北海道群持续开放更新，有计划的你，曼度普攻略干货的你，欢迎一起来玩儿哦~???" />
        <van-grid-item text="AAA群里提出的问题以及完整会打给打架整理在下面啦！北海道群持续开放更新，有计划的你，曼度普攻略干货的你，欢迎一起来玩儿哦~" />
        </van-grid>
        </div>
        <!-- 评论区 -->
        
  </div>
  
</template>

<script>
export default {
   data() {
    return {
      art:{}
    }
  },
  methods: {
    // 头  
    onClickLeft() {
      Toast('返回');
    },
    onClickRight() {
      Toast('按钮');
    },
    
  },
    mounted() {
    
   let id = this.$route.params.aid;
     //获取服务器穿的id值
   this.axios.get('/journal/details?id='+id).then(res=>{
     this.art=res.data.art;

    })
  }
}
</script>
<style>
  .mylv .head{
    background-color: rgb(7, 193, 206); 
  }
 .mylv .van-nav-bar__title {
    color:aliceblue;
    
}
 .mylv .van-nav-bar .xin{
   color: aliceblue
 }
 .mylv .van-nav-bar .jian{
   color: aliceblue
 }
  .mylv{
    background-color:lightsteelblue;
  }
  .story{
    padding: 3%;
    font-size:0.5em;
  }
  .story van-image {
    border-radius: 5%
  }
 .mylv .topf .van-grid-item__text{
    font-size: 20px; 
  }
  .mylv .topf .topf2 .van-grid-item__content{
    padding: 0% 
  }
  .mylv .van-grid-item__content{
    background-color:lavender
  }
</style>
