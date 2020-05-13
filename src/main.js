import Vue from 'vue'
import App from './App.vue'
import router from './router'
//导入vant插件的banner组件及样式
import { Swipe, SwipeItem, Toast, Stepper, SwipeCell,Icon, Empty, Skeleton, Loading, Button} from 'vant';
import 'vant/lib/index.css'

//导入store
import store from './store/index'
//导入所有过滤函数，
import * as filters from './filters'

//导入图片懒加载
import VUELazyload from "vue-lazyload";

//filters过滤函数名字组成的对象,Object.keys(filters)返回对象属性组成的对象
Object.keys(filters).forEach(keyName => {
  Vue.filter(keyName, filters[keyName])  //注册过滤函数
})

Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Toast);
Vue.use(Stepper)
Vue.use(SwipeCell)
Vue.use(Icon)
Vue.use(Empty)
Vue.use(Skeleton);
Vue.use(Loading);
Vue.use(Button);

Vue.use(VUELazyload, {
  loading: require('@/assets/img/common/placeholder.png')
})

import dayjs from 'dayjs'

Vue.config.productionTip = false;

Vue.prototype.$bus = new Vue()
Vue.prototype.$dayjs = dayjs
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
