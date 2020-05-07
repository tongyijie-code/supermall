import Vue from 'vue'
import App from './App.vue'
import router from './router'
//导入vant插件的banner组件及样式
import { Swipe, SwipeItem, Toast, Stepper, SwipeCell,Icon, Empty, Skeleton, Loading, Button} from 'vant';
import 'vant/lib/index.css'

//导入store
import store from './store/index'

import * as filters from './filters'

//导入图片懒加载
import VueLazyload from "vue-lazyload";

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
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

Vue.use(VueLazyload)

import dayjs from 'dayjs'

Vue.config.productionTip = false;

Vue.prototype.$bus = new Vue()
Vue.prototype.$dayjs = dayjs
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
