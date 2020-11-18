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
      <van-uploader v-model="fileList" multiple :max-count="8"/>
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
        name="picker"
        :value="current_city"
        label="当前城市"
        label-width="4.2em"
        placeholder="点击选择城市"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
    </van-cell-group>
    <!-- 城市位置结束 -->
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
      fileList: [
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        // { url: 'https://cloud-image', isImage: true },
      ],
      // 当前城市
      current_city:"",
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      showPicker: false,
    }
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
    
    // 发布日志
    release(){
      this.axios.post('/journal/diaryadd').then( res => {
        console.log("发送了");
      })
    }
  }
}
</script>
