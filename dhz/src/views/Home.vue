<template>
  <div class="home">
    <!-- 导航栏 -->
    <van-nav-bar title="搭伙族" left-arrow fixed :border="show_border" class="navb">
      <template #left>
        <van-icon name="user-circle-o" color="#fff" size="24"  />
      </template>
      <template #right>
        <van-icon name="search" color="#fff" size="24" />
      </template>
    </van-nav-bar>
    <!-- 导航栏结束 -->

    <!-- 首页配文开始 -->
    <div class="top_bg">
      <h1>打开你的心扉</h1>
      <span>发现志同道合的朋友，让你的行程不孤单</span>
    </div>
    <!-- 首页配文结束 -->

    <!-- 标签栏开始 -->
    <van-tabs v-model="active" lazy-render :scroll="imbibition" class="tabbar">
      <van-tab :title="item.classify" v-for="(item,index) of classify" :key="index" :id="item.cid.toString()">{{index+1}}</van-tab>
      <van-tab title="全部">
          <!-- 单一文章信息开始 -->
          <div class="articleItem">
            <!-- 文章标题开始 -->
            <div class="articleItem-header">
              <van-image :round="avatar" width="4rem" :src="require('../assets/avatar/bf6d72c1-db6f-448b-8f1a-0a6c576ea115.jpg')" fit="contain" class="articleImg"/>
              <div class="articleMsg">
                <div>
                  <span>幸福理论</span>
                  <h3 class="articleItem-time">11/16 12:00</h3>
                </div>
                <h1>湖南省长沙市</h1>
              </div>
            </div>
            <!-- 文章标题结束 -->
            <!-- 文章简介开始 -->
            <div class="articleDes">
              第一次回答这么私密的问题，紧张兮兮！跟众多行业前辈比起来，我可能是一个汽车界的萌新了，研究生毕业工作还不满两年。工资水平自然也是处于第一档。自报一下家门，目前在上汽乘用车工作，市场部，虽然目前做的是市场部工作，但是本科研究生读的都是车辆工程专业，而且由于对汽车的喜欢，也一直没有完全丢掉。所以在我们品牌传播这里，涉及到底层机械电气等原理的部分，一般都会来问问我，算是一项差异化优势吧。上汽乘用车地处于
            </div>
            <van-swipe-cell class="articleImg">
              
            </van-swipe-cell>
            <!-- 文章简介结束 -->
          </div>
          <!-- 单一文章信息结束 -->
      </van-tab>
    </van-tabs>
    <!-- 标签栏结束 -->
  </div>
</template>

<style>
  .home{
    background: #eee;
  }
  .home .navb{
    background-color: transparent;
  }
  .home .van-nav-bar__title{
    color: #fff;
  }
  .home .top_bg{
    height: 320px;
    background: url(../assets/common/home_top.jpg) no-repeat center;
    background-size: 100%;
  }
  .top_bg h1,.top_bg span{
    color: #fff;
    font-size: 2rem;
    margin-left: 0.5rem;
  }
  .top_bg span{
    width: 320px;
    font-size: 1.2rem;
    font-weight: lighter;
    display: block;
  }
  .top_bg::before{
    display: table;
    content: "";
  }
  .top_bg h1{
    margin-top: 210px;
  }
  .top_bg span{
    margin-top: 10px;
    line-height: 1.5rem;
  }


  .tabbar{
    margin: 10px 0;
  }

  .tabbar .van-tabs__line{
    background-color: #5ABCC8;
  }
  .tabbar .van-tab--active{
    color: #5ABCC8;
  }


  /* 文章样式 */
  .articleItem{
    background: #fff;
    margin: 10px 0;
  }
  .articleItem-header{
    font-weight: 500;
    font-size: 16px;
    color: #1a1a1a;
    line-height: 16px;
    display: flex;
    flex-wrap: nowrap;
  }
  .articleImg{
    padding:15px;
  }
  .articleMsg{
    width: 100%;
    margin-top: 15px;
  }
  .articleMsg span{
    color: #5ABCC8;
  }
  .articleMsg div{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
  }

  .articleItem-header h1{
    margin-top: 15px;
  }
  .articleItem-time{
    align-self: center;
    width: 100px;
    color: #ccc;
    font-weight: 300;
    font-size: 14px;
  }






  .articleDes{
    height: 65px;
    font-size: 15px;
    overflow: hidden;
    font-weight: 400;
    text-overflow: ellipsis;
    line-height: 21px;
    letter-spacing: normal;
    color: #444;
    padding: 0 15px;
  }
</style>

<script>
export default {
  data() {
    return {
      value:"",
      show_border:false,
      // 默认被选定的顶部选项卡及面板
      active: 1,
      // 默认被选定的顶部选项卡
      selectedTab: "index",
      // 存储服务器返回的日志分类
      classify:[],
      // 用于存储服务器返回结果
      diarys: [],
      // 页码
      page: 1,
      //总页数
      pagecount:0,


      avatar:true,
      // 距离顶部位置
      scrollTop:46,
      // 是否吸顶
      isFixed:false,
    }
  },
  methods:{
    imbibition() {
      if (scrollTop >= 46) {
        this.isFixed = true;
      } else {
        this.isFixed = false;
      }
    },
    loadData(cid, page) {
      //显示加载提示框
      this.$indicator.open({
        text:'加载中...',
        spinnerType:'fading-circle'
      });


    },
  },
  watch:{
    //监听顶部选项卡发生变化时发送请求以获取对应的日志数据
    active(value) {
      //清空之前保存的文章数据
      this.articles = [];
      //设置页码变量值为1(因为刚刚切换到任何一个选项卡时都是显示该类别下的第1页的数据)
      this.page = 1;
      console.log(value+1);
    },
  },
  mounted() {
    // 获取日志的分类
    this.axios.get('/journal/classify').then( res => {
      this.classify = res.data.result;
    })
    // 获取日志
    this.axios.get('/journal/diary?cid=' + this.active).then( res => {
      this.diarys = res.data.result;
      console.log(res.data.result);
    })
  },
}
</script>
