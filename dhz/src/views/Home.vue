<template>
  <div class="home">
    <!-- 导航栏 -->
    <van-nav-bar title="搭伙族" left-arrow fixed :border="show_border" class="navb">
      <template #left>
        <router-link to="/personage">
          <van-icon name="user-circle-o" color="#fff" size="24"  /> 
        </router-link>
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
      <van-tab :title="item.classify" v-for="(item,index) of classify" :key="index" :name="index+1" >
        <!-- 单一日志信息开始 -->
        <div v-for="(diary,index) of diarys" :key="index">
          <router-link :to="`/mylv/${diary.jid}`">
            <div class="articleItem">
              <!-- 日志标题开始 -->
              <div class="articleItem-header">
                <van-image :round="avatar" width="4rem" :src="require(`../assets/avatar/${diary.avatar}`)" fit="cover" class="articleImg"/>
                <div class="articleMsg">
                  <div>
                    <span>{{diary.nickname}}</span>
                    <!-- <h3 class="articleItem-time">{{this.moment.unix(diary.log_time).format('Y年MM月DD日')}}</h3> -->
                    <h3 class="articleItem-time">{{diary.log_time/1000 | datefmt('YYYY-MM-DD')}}</h3>
                  </div>
                  <h1>{{diary.journal_city}}</h1>
                </div>
              </div>
              <!-- 日志标题结束 -->
              <!-- 日志正文开始 -->
              <div class="articleDes">{{diary.content}}</div>
              <!-- 日志正文结束 -->
              <!-- 日志图片开始 -->
              <van-swipe-cell class="journalImg">
                                                                              <!-- 传入图片数组 -->
                <div v-for="(item,index) of diary.pic" :key="index" @click="preview(diary.pic,index)">
                  <van-image
                    width="7.8rem"
                    height="7.8rem"
                    fit="cover"
                    :src="require(`../assets/journal-pic/${item.picture_pic}`)"
                  >
                    <template v-slot:loading>
                      <van-loading type="spinner" size="20" />
                    </template>
                  </van-image>
                </div>
              </van-swipe-cell>
              <!-- 日志图片结束 -->
              <!-- 日志观看留言开始 -->
              <div class="journalInfor">
                <span>观看：{{diary.browse || 0}}</span>
                <span>留言：{{diary.msg_number || 0}}</span>
              </div>
              <!-- 日志观看留言结束 -->
              
            </div>
          </router-link>
        <!-- 单一日志信息结束 -->
        </div>
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
  .home .top_bg h1,.top_bg span{
    color: #fff;
    font-size: 2rem;
    margin-left: 0.5rem;
  }
  .home .top_bg span{
    width: 320px;
    font-size: 1.2rem;
    font-weight: lighter;
    display: block;
  }
  .home .top_bg::before{
    display: table;
    content: "";
  }
  .home .top_bg h1{
    margin-top: 210px;
  }
  .home .top_bg span{
    margin-top: 10px;
    line-height: 1.5rem;
  }


  .home .tabbar{
    margin: 10px 0;
  }

  .home .tabbar .van-tabs__line{
    background-color: #5ABCC8;
  }
  .home .tabbar .van-tab--active{
    color: #5ABCC8;
  }


  /* 文章样式 */
  .home .articleItem{
    background: #fff;
    margin: 10px 0;
  }
  .home .articleItem-header{
    font-weight: 500;
    font-size: 16px;
    color: #1a1a1a;
    line-height: 16px;
    display: flex;
    flex-wrap: nowrap;
  }
  .home .articleImg{
    padding: 15px;
  }
  .home .articleImg img{
    border: 1px solid #5ABCC8;
  }
  .home .articleMsg{
    width: 100%;
    margin-top: 15px;
  }
  .home .articleMsg span{
    color: #5ABCC8;
  }
  .home .articleMsg div{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
  }

  .home .articleItem-header h1{
    margin-top: 18px;
    color: #3a3a3a;
  }
  .home .articleItem-time{
    align-self: center;
    width: 100px;
    color: #ccc;
    font-weight: 300;
    font-size: 14px;
    text-align: right;
    padding-right: 15px;
  }
  .home .journalImg>div>div+div{
    margin-left: 3px;
  }
  .home .journalImg>div{
    display: flex;
    flex-wrap: nowrap;
    justify-content: start;
    box-sizing: border-box;
    margin: 15px auto 16px;
  }
  .home .articleDes{
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
  .home .journalInfor{
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
    color: #ccc;
    font-size: 14px;
    padding-bottom: 15px;
  }
  .home .journalInfor>span{
    margin-right: 15px;
  }
</style>

<script>
import { ImagePreview } from "vant"; // 引入Vant图片预览组件

export default {
  data() {
    return {
      value:"",
      show_border:false,
      // 默认被选定的顶部选项卡及面板
      active: 0,
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

    // 图片预览
    preview(images,index){
      // 创建需要预览的图片 URL 空数组
      let pic = [];
      images.forEach((value, index, array) => {
        //              获取路径前面的url  拼接  图片名
        pic.push( `http://127.0.0.1:8888/journal-pic/${value.picture_pic}`);
      }); 
      // ImagePreview 图片预览组件
      ImagePreview({
        images:pic, //需要预览的图片 URL 数组
        showIndex:true, //是否显示页码
        loop:false, //是否开启循环播放
        startPosition:index //图片预览起始位置索引
      });
    }
  },
  watch:{
    //监听顶部选项卡发生变化时发送请求以获取对应的日志数据
    active(value) {
      //清空之前保存的文章数据
      this.articles = [];
      //设置页码变量值为1(因为刚刚切换到任何一个选项卡时都是显示该类别下的第1页的数据)
      this.page = 1;
      // 监听到变化的值发送 active  获取当前的日志
      this.axios.get('/journal/diary?cid=' + value).then( res => {
        this.diarys = res.data.result;
      })
      
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
    })
  },
}
</script>
