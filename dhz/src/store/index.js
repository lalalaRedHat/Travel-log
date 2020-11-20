import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import router from '../router';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 获取到的分类
    classify:[JSON.parse(localStorage.getItem('classify')) || {}],
  },
  mutations: {
    // 添加日志分类
    addclassify(state,payload){
      state.classify = payload;
      // console.log(this.$store.state.classifys);
    }
  },
  actions: {
    // 获取日志的分类
    obtain_classify(context){
      axios.get('/journal/classify').then( res => {
        // 通知addclassify()
        context.commit('addclassify',res.data.result);
        localStorage.setItem('classify',JSON.stringify(res.data.result));
      })
    }
  },
  modules: {
  }
})
