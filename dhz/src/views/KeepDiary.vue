<template>
  <div class="keepDiary">
    <!-- 导航栏 -->
    <van-nav-bar title="发布日志" left-arrow fixed :border="show_border" class="navb">
      <template #left>
        <router-link to="/">
          <van-icon name="arrow-left" size="24"  /> 
        </router-link>
      </template>
      <template #right>
        <van-button round type="info" size="small" color="#5ABCC8" to="/">发送</van-button>
      </template>
    </van-nav-bar>
    <!-- 导航栏结束 -->

    <!-- 正文开始 -->
    <div class="diarytext">
      <van-field
        v-model="article"
        rows="8"
        autosize
        label="留言"
        type="textarea"
        maxlength="3000"
        placeholder="随手分享下你的旅行日志吧！"
        show-word-limit
      />
    </div>
    <!-- 正文结束 -->
  </div>
</template>

<style>
  .keepDiary .home{
    background: #eee;
  }
</style>

<script>
export default {
  data(){
    return {
      // show_border:false
      article:""
    }
  }
}
</script>
