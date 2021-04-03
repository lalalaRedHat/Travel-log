<template>
  <div class="mylv">
    <!-- 头 -->
        <div >
        <van-nav-bar  class="head" :title="art.journal_title" fixed
        left-text="" >
        <template #left>
          <router-link to="/">
            <van-icon class="jian" name="arrow-left" size="24"/>
          </router-link>
        </template>
        
        </van-nav-bar>
        </div>

         <!-- 文章开始 -->
        <!-- 开头中间分隔内容 -->
        <div class="topf">
          <div class="topf2">
          <van-grid direction="horizontal" :column-num="1">
          <van-grid-item text="_____.Q&A._____" />
          </van-grid>
          </div>
          <van-grid direction="horizontal" :column-num="1">
          <van-grid-item :text="`【`+ art.journal_title +`】`" />
          </van-grid>
        </div> 
        <!-- 问题 -->
        <!-- 第一篇 -->
        <div class="story">
        <van-grid :border="false" :column-num="1">
         <!-- <van-loading type="spinner" /> -->
            <!-- <van-image :src="'http://127.0.0.1:8888/avatar/' + art.avatar" lazy-load/> -->
             
              <!-- <van-image src="http://127.0.0.1:8888/avatar/bf6d72c1-db6f-448b-8f1a-0a6c576ea115.jpg" /> -->
            
            <!-- <van-loading type="spinner" /> -->
            <van-grid-item :text="art.content" />
            <div class="imgBg">
              <div v-for="(pic,index) of art.pics" :key="index">
                <van-image :src="'http://127.0.0.1:8888/journal-pic/' + pic.picture_pic"
                lazy-load
                width="99%"
                height="10rem"
                fit="cover"
                />
              </div>
            </div>
        </van-grid>
        </div>
        <!-- 评价 -->
            
        
        <!-- 评论区 -->
        <div class="topf">
          <van-grid direction="horizontal" :column-num="1">
          <van-grid-item text="----- 评论 -----" />
          </van-grid>
        </div>

        <!-- 用户评论 -->
        <div class="comment_area">
          <form action="">
          <van-field
          v-model="leme"
          colon
          rows="3"
          autosize
          label="留言"
          label-width="2.5em"
          type="textarea"
          maxlength="300"
          placeholder="请输入您留言吧！"
          show-word-limit
          >
          <template #button >
            <van-button round square class="btn" type="warning" color="#5ABCC8" @click="put">发送</van-button>
          </template>
          </van-field>
          </form>
        </div>

        <!-- 评论区 -->
        <!-- 组件懒加载 -->
        <lazy-component v-if="listLoading">
        <div class="story" v-for="(item,index) of comments" :key="index">
          <van-grid :border="false" :column-num="1">
          <!-- 日志标题开始 -->
          <div class="comment-header">
            <van-image :round="avatar" width="3rem" :src="'http://127.0.0.1:8888/avatar/'+ item.avatar" fit="cover" class="comment-Img"/>
            <div class="commentMsg">
              <div>
                <span>{{item.nickname}}</span>
                <!-- <h3 class="articleItem-time">{{this.moment.unix(diary.log_time).format('Y年MM月DD日')}}</h3> -->
                <h3 class="comment-time">{{item.time/1000 | datefmt('YYYY-MM-DD')}}</h3>
              </div>
            </div>
          </div>
          <p class="comment-content">{{item.comment}}</p>
            <!-- <van-grid-item :text="item.comment" /> -->
          <!-- 日志标题结束 -->
          </van-grid>
        </div>
        </lazy-component>

        <!-- 分割线 -->
        <van-divider dashed
          :style="{ color: '#fff', borderColor: '#fff', padding: '0px 16px 16px' }"
        >
          已经到底了
        </van-divider>
        <!-- <div class="putf">
          <van-button round type="info" size="small" color="#5ABCC8" @click="put">发送</van-button>
        </div> -->
  </div>
  
</template>

<script>
export default {
   data() {
    return {
      art:{},
      value: 5,
      leme:"",
      // 空formdata
      formdata: {},
      // 当前日志id
      jid:0,
      // 当前用户
      userPhone:this.$store.state.userPhone,
      // 评论
      comments:[],
      // 头像显示
      avatar:true,
      listLoading:true
    }
  },
  methods: {
    // 头  
    // onClickLeft() {
    //   Toast('返回');
    // },
    // onClickRight() {
    //   Toast('按钮');
    // },

    put(){
      // let fromData = new FormData(); 
      //获取登录状态
      let isOnlogin = this.$store.state.isOnlogin;

      //验证登录
      // 等于1登录
      if(isOnlogin == 1){


        //如果当前内容是空提交
        if(!this.leme){
          // this.$toast.fail('请输入评论再提交~~');
          return

        }else{ // 提交

          // console.log(this.leme);
          // 获取时间
          let new_time = this.moment().format('x');
          this.formdata.time = new_time;
          
          //如果填写就保存在formdata中
          this.formdata.comment = this.leme;

          // 获取当前日志id
          this.formdata.journal_id = this.jid;

          // 用户
          this.formdata.phone = this.userPhone.phone;
          this.listLoading = true;
          //提交评论
          this.axios.post('/journal/comment',this.formdata).then(res=>{
            console.log(res.data);
            if(res.data.code == 1){
              this.$toast.success('评论成功');
              this.leme = "";
              this.getList( this.jid );
              // this.reload();
            }
            this.listLoading = false;
          })
        }

      } else { // 未登录

        this.$toast.fail('请登录后发送');
        // this.$router.push("/login");
      }
     //

    },
    getList( id ){
      this.listLoading = false;
      this.axios.get('/journal/All_comments?id=' + id ).then(res=>{
        this.comments = res.data.comments;
        console.log(res.data.comments);
        this.listLoading = true
      })
    }
  },
  mounted(){
    
    let id = this.$route.params.aid;
    // 赋值给jid
    this.jid = id;
     //获取服务器穿的id值
    this.axios.get('/journal/details?id='+id).then(res=>{
      this.art=res.data.art;
      console.log(res.data.art);
    })

    //评论
//     this.axios.get('/journal/All_comments?id=' + id ).then(res=>{
//       this.comments = res.data.comments;
//       console.log(res.data.comments);
//     })
    this.getList( id );
  }
}
</script>
<style>
.mylv .topf{
  margin-top: 16px;
}
.mylv .dian {
    display: flex;
    flex-direction: row;
}

#zan,
#cai {
    width: 55px;
    height: 22px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #F3F3F3;
    margin: 0 10px;
    border-radius: 6px;
    user-select: none;
    cursor: pointer;
}

#zan img,
#cai img {
    width: 14px;
    height: 14px;
    margin: 5px 5px 0 5px;
}

#zan #num1,
#cai #num2 {
    line-height: 22px;
    margin-right: 3px;
}
  .mylv .head{
    background-color: #5ABCC8; 
  }
 .mylv .van-nav-bar__title {
   padding-top:0.50rem;
    color:aliceblue;
    
}
.mylv .story .van-grid-item__text{
  font-size: 16px;
  text-indent: 2em;
  line-height: 26px;
}
 .mylv .van-nav-bar .zan{
   padding-top:0.50rem;
   color: aliceblue
 }
 .mylv .van-nav-bar .jian{
   padding-top:0.75rem;
   color: aliceblue
 }
  .mylv{
    background-color:lightsteelblue;
  }
  .mylv .story{
    padding: 3% 3% 1%;
    font-size:0.5em;
  }
  .mylv .story + .story{
    padding: 1% 3% 1%;
  }
  .mylv .story van-image {
    border-radius: 5%
  }
 .mylv .topf .van-grid-item__text{
    font-size: 20px; 
  }
  .mylv .topf .topf2 .van-grid-item__content{
    padding: 0% 
  }
  .mylv .van-grid-item__content{
    background-color:lavender;
  }
  .mylv .story .comment-header{
    font-weight: 500;
    font-size: 16px;
    color: #1a1a1a;
    line-height: 16px;
    display: flex;
    flex-wrap: nowrap;
    background: #fff;
    width: 100%;
  }
  .mylv .story .van-grid-item__content{
    background: #fff;
  }
  .mylv .story .commentMsg{
    width: 100%;
    margin-top: 15px;
  }
  .mylv .story .comment-time{
    padding-right: 15px;
  }
  .mylv .story .comment-Img{
    padding: 15px;
  }
  .mylv .story .comment-Img img{
    border: 1px solid #5ABCC8;
  }
  .mylv .story .commentMsg span{
    color: #5ABCC8;
    font-weight: bold;
  }
  .mylv .story .comment-time{
    font-size: 14px;
    color: #999;
  }
  .mylv .story .commentMsg div{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
  }
  .mylv .story .comment-content{
    display: block;
    width: 100%;
    background: #fff;
    margin: 0;
    padding: 10px 15px;
    font-size: 16px;
    line-height: 24px;
    font-size: 14px;
  }
  .mylv .story .imgBg{
    background: #fff;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  .mylv .story .imgBg div{
    width: 50%;
  }
</style>
