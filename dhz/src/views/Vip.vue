<template>
    <!-- 顶部信息 -->
    <div>
        <van-nav-bar
  title="VIP信息"
  left-text="返回"
  left-arrow
  @click-left="onClickLeft"
/>
    <!-- 等级 -->
    <van-cell-group>
        <van-cell title="VIP等级" value="" />
    </van-cell-group>

    </div>
</template>
<script>
import { Toast } from 'vant';
export default {
  methods: {
    onClickLeft() {
      Toast('返回');
    },
  }
};
</script>