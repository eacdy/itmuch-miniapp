import Vue from 'vue'
import App from './App'
import {request} from "@/utils/request";
import {FORWARD_URL} from "@/utils/api";

Vue.config.productionTip = false;
App.mpType = 'app';

Vue.mixin({
  onUnload() {
    if (this.$options.data) {
      Object.assign(this.$data, this.$options.data()) // 重置组件数据状态
    }
  }
})

// 所有页面都转发
// ref：https://blog.csdn.net/lhy349/article/details/81188332
Vue.mixin({
  onShareAppMessage() {
    request(
      FORWARD_URL,
      'GET',
      {}
    );
    return {
      title: 'IT牧场',
      path: 'pages/share/list/main',
      imageUrl: '/static/img/xuanchuan.png'
    }
  }
});

const app = new Vue(App)
app.$mount()



