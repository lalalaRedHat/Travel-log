<template>
  <div>
     <!-- 头部标签 -->
    <div>
       <van-nav-bar
            title="个性标签"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            />
    </div>
    <!-- 标签 -->
    <div>
        <van-tag v-if="show" closeable size="large" type="primary" @close="close">可爱</van-tag>
        <van-tag v-if="show" closeable size="large" type="primary" @close="close">绅士</van-tag>
        <van-tag v-if="show" closeable size="large" type="primary" @close="close">友爱</van-tag>
        <van-tag v-if="show" closeable size="large" type="primary" @close="close">互助</van-tag>
        <van-tag v-if="show" closeable size="large" type="primary" @close="close">温柔</van-tag>
        <van-tag v-if="show" closeable size="large" type="primary" @close="close">土豪</van-tag>
        <van-tag v-if="show" closeable size="large" type="primary" @close="close">大方</van-tag>
        <van-tag v-if="show" closeable size="large" type="primary" @close="close">美女</van-tag>
        <van-tag v-if="show" closeable size="large" type="primary" @close="close">聪明</van-tag>
        <van-tag v-if="show" closeable size="large" type="primary" @close="close">成熟</van-tag>
        <van-tag v-if="show" closeable size="large" type="primary" @close="close">帅气</van-tag>
    </div>
  </div> 
</template>
<script>
    import { Toast } from 'vant';

export default {
  data() {
    return {
      show: true,
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push('/personage');
    },
     close() {
      this.show = false;
    },
  },
};
</script>