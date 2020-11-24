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
          @change="onChange"
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
const citys = {
  浙江: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
  福建: ['福州', '厦门', '莆田', '三明', '泉州'],
};
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
      // city: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      city: [
        {
          values: Object.keys(citys),
          className: 'column1',
        },
        {
          values: citys['浙江'],
          className: 'column2',
          defaultIndex: 2,
        },
      ],
      showcity: false,


      // 文章分类
      classify:"",
      diaryclassify:[],
      showclassify: false,
      // 是否上传
      data:{}
    }
  },
  methods: {
    // 获取图片读取后的参数
    afterRead(file) {
      console.log(file);
      // 创建表单数据对象
      let formData = new FormData();
      // 如果传的参的content属性存在则为对象
      if (file.hasOwnProperty('content')) {

        // 直接保存到data中
        formData.append('journal_pic',file.file);
        // 保存在变量data中
        this.data = formData;

      } else {//否则为数组

        // 循环遍历获取
        for (let i = 0, n = file.length; i < n; i++) {
          //获取到File对象
          let files = file[i].file;
          // console.log(file[i].file);
          formData.append('journal_pic',files);
        }
        // 保存在变量data中
        this.data = formData;

      }
    },

    
    // 城市选择
    oncity(value) {
      this.current_city = value[0] + value[1];
      this.showcity = false;
    },
    // 切换省
    onChange(picker, values) {
      picker.setColumnValues(1, citys[values[0]]);
    },




    // 分类的选择器
    onclassify(value){
      this.classify = value;
      this.showclassify = false;
    },
    // 发布日志
    release(){
      // 获取登录状态
      let isOnlogin = this.$store.state.isOnlogin;
      // 如果登录状态为1则为登录
      if ( isOnlogin == 1) {
        // 获取当前时间
        let current_time = this.moment().format('x');


        // 声明一个变量保存对应的分类id
        let classify_id;
        // 保存获取的分类数组
        let classify_arr = this.$store.state.classify;
        // 循环分类数组
        classify_arr.forEach((value, index, array) => {
          // 如果选中文章分类名等于分类数组里的名
          if ( this.classify ==  value.classify) {
            // 就将当前id赋值给classify_id
            classify_id = value.cid
          }
        })


        // 当什么都没没写时不允许提交
        if ( !this.article_tit || !this.article || !this.current_city || !this.classify ) {
          // 没写东西没有动作
          this.$toast.fail('请填写日志内容');
          return

        } else { // 写了东西

            // 获取保存的formdata
            let formData = this.data;
    
            // 在表单数据对象中添加数据
            // 日志标题
            formData.set("journal_title",this.article_tit);
            // 日志正文
            formData.set("content",this.article);
            // 发布时间
            formData.set("log_time",current_time);
            // 当前城市
            formData.set("journal_city",this.current_city);
            // 当前分类
            formData.set("journal_classify",classify_id);
            // 用户id
            formData.set("users_id",1);

            console.log(formData);
            // 提交表单
            this.axios.post('/journal/diaryadd',formData).then( res => {
              // 获取到code为1跳转到首页
              if (res.data.code == 1) {
                this.$notify({
                  type: 'success',
                  message: '发布成功' 
                });
                this.$router.push('/');
              }

            })
        }


      } else { // 为未登录
        this.$toast.fail('请登录后发布');
      }

    }


  },
  mounted(){
    // 分类选择器获取数据数组
    let classifys = this.$store.state.classify;
    classifys.forEach((value, index, array) => {
      this.diaryclassify.push(value.classify)
    })

  }
}
</script>
