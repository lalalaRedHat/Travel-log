<template>
    <!-- 顶部信息 -->
    <div>
        <van-nav-bar
            title="VIP信息"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            fixed
          />
          
    <!-- 等级 -->
    <van-cell-group>
        <van-cell title="VIP等级" value="V1" />
        <van-cell title="当前积分" value="1(获得19分后升级)" />
        <van-cell title="我的特权"  />
            <!-- 聊天图片 -->
          <van-image
            round
            width="10rem"
            height="10rem"
            :src="require('../assets/img/liaotianshi.jpg')"
          />
          
    </van-cell-group>


     
        <van-cell title="如何获取积分"  />
        <van-cell title="01 在线时间(有限制)"  />
        <van-cell title="02 点赞积分(有限制1分 5次) (第一次点赞才会得分)"  />
        <van-cell title="03 分享(无限制5分) (这个需要加限制，不然容易刷分)"  />
        <van-cell title="04 发起搭伙(结束搭伙才活得10分)"  />
        <van-cell title="05 参加搭伙(结束才活得3分)"  />
        <van-cell title="06 上传身份证认证成功(20分)"  />
        <van-cell title="07 上传头像 首次(3分)"  />
        <van-cell title="08 评论(4个字以上 1分) (评论自己发的搭伙或者分享族 有限制)"  />
        <van-cell title="09 点赞和分享 发起搭伙人(1分) (对方第一次点赞才会得分)"  />


    </div>
</template>
<script>
import { Toast } from 'vant';
export default {
  methods: {
    onClickLeft() {
      this.$router.push('/personage');
    },
  }
};
</script>