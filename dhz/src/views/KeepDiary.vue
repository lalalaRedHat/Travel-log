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
    北京市: [''],
    天津市: [''],
    河北省: ['石家庄市','唐山市','秦皇岛市','邯郸市','邢台市','保定市','张家口市','承德市','沧州市','廊坊市','衡水市','雄安新区'],
    山西省: ['太原市','大同市','阳泉市','长治市','晋城市','朔州市','晋中市','运城市','忻州市','临汾市','吕梁市'],
    内蒙古自治区: ['呼和浩特市','包头市','乌海市','赤峰市','通辽市','鄂尔多斯市','呼伦贝尔市','巴彦淖尔市','乌兰察布市','兴安盟','锡林郭勒盟','阿拉善盟'],
    辽宁省: ['沈阳市','大连市','鞍山市','抚顺市','本溪市','丹东市','锦州市','营口市','阜新市','辽阳市','盘锦市','铁岭市','朝阳市','葫芦岛市'],
    吉林省: ['长春市','吉林市','四平市','辽源市','通化市','白山市','松原市','白城市','长白山管委会','延边朝鲜族自治州'],
    黑龙江省: ['哈尔滨市','齐齐哈尔市','鸡西市','鹤岗市','双鸭山市','大庆市','伊春市','佳木斯市','七台河市','牡丹江市','黑河市','绥化市','大兴安岭地区'],
    上海市: [''],
    江苏省: ['南京市','无锡市','徐州市','常州市','苏州市','南通市','连云港市','淮安市','盐城市','扬州市','镇江市','泰州市','宿迁市'],
    浙江省: ['杭州市','宁波市','温州市','嘉兴市','湖州市','绍兴市','金华市','衢州市','舟山市','台州市','丽水市'],
    安徽省: ['合肥市','芜湖市','蚌埠市','淮南市','马鞍山市','淮北市','铜陵市','安庆市','黄山市','滁州市','阜阳市','宿州市','六安市','亳州市','池州市','宣城市'],
    福建省: ['福州市','厦门市','莆田市','三明市','泉州市','漳州市','南平市','龙岩市','宁德市'],
    江西省: ['南昌市','景德镇市','萍乡市','九江市','新余市','鹰潭市','赣州市','吉安市','宜春市','抚州市','上饶市'],
    山东省: ['济南市','青岛市','淄博市','枣庄市','东营市','烟台市','潍坊市','济宁市','泰安市','威海市','日照市','临沂市','德州市','聊城市','滨州市','菏泽市'],
    河南省: ['郑州市','开封市','洛阳市','平顶山市','安阳市','鹤壁市','新乡市','焦作市','濮阳市','许昌市','漯河市','三门峡市','南阳市','商丘市','信阳市','周口市','驻马店市','省直辖县'],
    湖北省: ['武汉市','黄石市','十堰市','宜昌市','襄阳市','鄂州市','荆门市','孝感市','荆州市','黄冈市','咸宁市','随州市','恩施土家族苗族自治州','省直辖县'],
    湖南省: ['长沙市','株洲市','湘潭市','衡阳市','邵阳市','岳阳市','常德市','张家界市','益阳市','郴州市','永州市','怀化市','娄底市','湘西土家族苗族自治州'],
    广东省: ['广州市','韶关市','深圳市','珠海市','汕头市','佛山市','江门市','湛江市','茂名市','肇庆市','惠州市','梅州市','汕尾市','河源市','阳江市','清远市','东莞市','中山市','潮州市','揭阳市','云浮市'],
    广西壮族自治区: ['南宁市','柳州市','桂林市','梧州市','北海市','防城港市','钦州市','贵港市','玉林市','百色市','贺州市','河池市','来宾市','崇左市'],
    海南省: ['海口市','三亚市','三沙市','儋州市','省直辖县'],
    重庆市: [''],
    四川省: ['成都市','自贡市','攀枝花市','泸州市','德阳市','绵阳市','广元市','遂宁市','内江市','乐山市','南充市','眉山市','宜宾市','广安市','达州市','雅安市','巴中市','资阳市','阿坝藏族羌族自治州','甘孜藏族自治州','凉山彝族自治州'],
    贵州省: ['贵阳市','六盘水市','遵义市','安顺市','毕节市','铜仁市','黔西南布依族苗族自治州','黔东南苗族侗族自治州','黔南布依族苗族自治州'],
    云南省: ['昆明市','曲靖市','玉溪市','保山市','昭通市','丽江市','普洱市','临沧市','楚雄彝族自治州','红河哈尼族彝族自治州','文山壮族苗族自治州','西双版纳傣族自治州','大理白族自治州','德宏傣族景颇族自治州','怒江傈僳族自治州','迪庆藏族自治州'],
    西藏自治区: ['拉萨市','日喀则市','昌都市','林芝市','山南市','那曲市','阿里地区'],
    陕西省: ['西安市','铜川市','宝鸡市','咸阳市','渭南市','延安市','汉中市','榆林市','安康市','商洛市'],
    甘肃省: ['兰州市','嘉峪关市','金昌市','白银市','天水市','武威市','张掖市','平凉市','酒泉市','庆阳市','定西市','陇南市','临夏回族自治州','甘南藏族自治州'],
    青海省: ['西宁市','海东市','海北藏族自治州','黄南藏族自治州','海南藏族自治州','果洛藏族自治州','玉树藏族自治州','海西蒙古族藏族自治州'],
    宁夏回族自治区: ['银川市','石嘴山市','吴忠市','固原市','中卫市'],
    新疆维吾尔自治区: ['乌鲁木齐市','克拉玛依市','吐鲁番市','哈密市','昌吉回族自治州','博尔塔拉蒙古自治州','巴音郭楞蒙古自治州','阿克苏地区','克孜勒苏柯尔克孜自治州','喀什地区','和田地区','伊犁哈萨克自治州','塔城地区','阿勒泰地区','自治区直辖县级行政区划'],
    台湾省: ['台北市','高雄市','台南市','台中市','金门县','南投县','基隆市','新竹市','嘉义市','新北市','宜兰县','新竹县','桃园县','苗栗县','彰化县','嘉义县','云林县','屏东县','台东县','花莲县','澎湖县','连江县'],
    香港特别行政区: ['香港岛','九龙','新界'],
    澳门特别行政区: ['澳门半岛','离岛'],
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
          values: citys['北京市'],
          className: 'column2',
          defaultIndex: 2,
        },
      ],
      showcity: false,
      // 分类数组store
      classifys:[],

      // 文章分类
      classify:"",
      diaryclassify:[],
      showclassify: false,
      // 是否上传
      data:{
        journal_pic:[]
      },
      formdata: new FormData(),

      // 当前用户
      userPhone:this.$store.state.userPhone
    }
  },
  methods: {
    // 获取图片读取后的参数
    afterRead(file) {
      console.log(file);
      // 创建表单数据对象
      //let formData = new FormData();
      // 如果传的参的content属性存在则为对象
      if (file.hasOwnProperty('content')) {

        // 直接保存到data中
        //this.data.journal_pic.push(file.file);
        this.formdata.append("journal_pic",file.file)
        // 保存在变量data中
        //this.data = formData;

      } else {//否则为数组

        // 循环遍历获取
        for (let i = 0, n = file.length; i < n; i++) {
          //获取到File对象
          let files = file[i].file;
          // console.log(file[i].file);
         // this.data.journal_pic.push(files);
          this.formdata.append("journal_pic",files)
        }
        // 保存在变量data中
        //this.data = formData;
      }
    },
    
    // 城市选择
    oncity(value) {
      console.log(value);
      if (value[1] == undefined || value[1] == "") {
        value[1] = "";
        this.current_city = value[0] + value[1];
        this.showcity = false;
      }else{
        this.current_city = value[0] + value[1];
        this.showcity = false;
      }
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
      console.log( this.userPhone );
      // 获取用户
      let phone = this.userPhone.phone
      // 获取登录状态
      let isOnlogin = this.$store.state.isOnlogin;
      // 如果登录状态为1则为登录
      if ( isOnlogin == 1) {
        // 获取当前时间
        let current_time = this.moment().format('x');


        // 声明一个变量保存对应的分类id
        let classify_id;
        // 循环分类数组
        this.classifys.forEach((value, index, array) => {
          // 如果选中文章分类名等于分类数组里的名
          if ( this.classify ==  value.classify) {
            // 就将当前id赋值给classify_id
            classify_id = value.cid
          }
        })


        // 当什么都没没写时不允许提交
        if ( !this.article_tit || !this.article || !this.current_city || !this.classify ) {
          // 没写东西没有动作
          this.$toast.fail('请完善日志信息');
          // return

        } else { // 写了东西

            // 日志标题
            this.formdata.set("journal_title",this.article_tit);
            // 日志正文
            this.formdata.set("content",this.article);
            // 发布时间
            this.formdata.set("log_time",current_time);
            // 当前城市
            this.formdata.set("journal_city",this.current_city);
            // 当前分类
            this.formdata.set("journal_classify",classify_id);
            // 用户
            this.formdata.set("phone",phone);
            this.addformdata(  this.formdata );

            //formdata.set("data",this.data)         
            //   // 在表单数据对象中添加数据
            //   // 日志标题
            //   formData.set("journal_title",this.article_tit);
            //   // 日志正文
            //   formData.set("content",this.article);
            //   // 发布时间
            //   formData.set("log_time",current_time);
            //   // 当前城市
            //   formData.set("journal_city",this.current_city);
            //   // 当前分类
            //   formData.set("journal_classify",classify_id);
            //   // 用户id
            //   formData.set("phone",phone);
  
            //   // 提交表单
            //   this.addformdata( formData );
            // };
        }

      } else { // 为未登录
        this.$toast.fail('请登录后发布');
      }

    },

    // 提交表单
    addformdata( value ){
      // 提交表单
      this.axios.post('/journal/diaryadd',value).then( res => {
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

  },
  mounted(){
    // 分类选择器获取数据数组
    this.classifys = this.$store.state.classify;
    this.classifys.forEach((value, index, array) => {
      this.diaryclassify.push(value.classify)
    })

    //调用store里的获取分类
    this.$store.dispatch("obtain_classify");

  }
}
</script>
