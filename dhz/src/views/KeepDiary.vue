<template>
  <div class="keepDiary">
    <!-- 导航栏 -->
    <van-nav-bar title="发布日志" left-arrow fixed border class="navb">
      <template #left>
        <router-link to="/">
          <van-icon name="arrow-left" color="#000" size="24"  /> 
        </router-link>
      </template>
      <template #right>
        <van-button round type="info" size="small" color="#5ABCC8" @click="release">发布</van-button>
      </template>
    </van-nav-bar>
    <!-- 导航栏结束 -->

    <!-- 正文开始 -->
    <div class="diarytext">
      <van-field
        v-model="article"
        rows="8"
        type="textarea"
        maxlength="3000"
        placeholder="随手分享下你的旅行日志吧！"
        show-word-limit
      />
    </div>
    <!-- 正文结束 -->
    <!-- 图片上传开始 -->
    <div class="picUpload">
      <van-uploader v-model="fileList" multiple :max-count="8" :after-read="afterRead" accept="image/png,image/jpeg,image/jpg"/>
    </div>
    <!-- 图片上传结束 -->
    <!-- 标题开始 -->
    <van-cell-group>
      <van-field v-model="article_tit" label="文章标题" placeholder="请填写文章标题" label-width="4.2em"/>
    </van-cell-group>
    <!-- 标题结束 -->
    <!-- 城市位置开始 -->
    <van-cell-group>
      <van-field
        readonly
        clickable
        name="current_city"
        :value="current_city"
        label="当前城市"
        label-width="4.2em"
        placeholder="点击选择城市"
        @click="showcity = true"
      />
      <van-popup v-model="showcity" position="bottom">
        <van-picker
          show-toolbar
          :columns="city"
          @confirm="oncity"
          @cancel="showcity = false"
        />
      </van-popup>
    </van-cell-group>
    <!-- 城市位置结束 -->
    <!-- 文章分类开始 -->
    <van-cell-group>
      <van-field
        readonly
        clickable
        name="classify"
        :value="classify"
        label="文章分类"
        label-width="4.2em"
        placeholder="点击选择分类"
        @click="showclassify = true"
      />
      <van-popup v-model="showclassify" position="bottom">
        <van-picker
          show-toolbar
          :columns="diaryclassify"
          @confirm="onclassify"
          @cancel="showclassify = false"
        />
      </van-popup>
    </van-cell-group>
    <!-- 文章分类结束 -->
  </div>
</template>

<style>
/* 导航按钮 */
.keepDiary .van-button--round{
  border-radius: 50px;
  height: 24px;
}
.keepDiary .van-nav-bar__left, .van-nav-bar__right{
  font-size: 24px;
}
/* 正文 */
.keepDiary .diarytext{
  margin-top: 46px;
}
.keepDiary .diarytext .van-cell{
  padding: 0;
}
.keepDiary .diarytext .van-cell__value--alone{
  background: rgb(250, 250, 250);
  padding: 15px;
}
.keepDiary .diarytext .van-field__control{
  text-indent:2em;
}
/* 图片上传 */
.keepDiary .picUpload{
  margin-left: 8px;
  margin-top: 8px;
}
/* 当前城市 */
.keepDiary .current_city{
  border-top: 1px solid rgb(250, 250, 250);
  border-bottom: 1px solid rgb(250, 250, 250);
}
</style>

<script>
export default {
  data(){
    return {
      // 文章正文
      article:"",
      // 文章标题
      article_tit:"",
      // 上传的图片
      fileList: [],
      // 当前城市
      current_city:"",
      city: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      showcity: false,
      // 文章分类
      classify:"",
      diaryclassify: ['全部', '当前城市', '旅游', '运动', '餐饮美食','其他'],
      showclassify: false,
      // 是否上传
      isupload:false
    }
  },
  methods: {
    // 获取图片读取后的参数
    afterRead(file) {
      console.log(file);
      // 创建表单数据对象
      let formData = new FormData();
      // 循环遍历获取
      for (let i = 0, n = file.length; i < n; i++) {
        //获取到File对象
        let files = file[i].file;
        // console.log(file[i].file);
        formData.append('journal_pic',files);
      }
      return formData;
    },

    
    // 城市选择器
    oncity(value) {
      this.current_city = value;
      this.showcity = false;
    },
    // 分类的选择器
    onclassify(value){
      this.classify = value;
      this.showclassify = false;
    },
    // 发布日志
    release(){
      // 获取当前时间
      let current_time = this.moment().format('X');
      let object = {
        // 日志标题
        "journal_title":this.article_tit,
        // 日志正文
        "content":this.article,
        // 发布时间
        "log_time":current_time,
        // 当前城市
        "journal_city":this.current_city,
        // 当前分类
        "journal_classify":this.classify
      };
      console.log(object);

      // 获取不到上面返回的值
      // let formData = this.$options.methods.afterRead();
      // console.log(formData);


      this.axios.post('/journal/diaryadd',this.qs.stringify(object)).then( res => {
        console.log("发送了");
      })
    }
  }
}
</script>
