import Vue from 'vue'
import App from './App.vue'
import router from './router'
//导入vant插件的banner组件及样式
import { Swipe, SwipeItem, Toast, Stepper, SwipeCell,Icon, Empty } from 'vant';
import 'vant/lib/index.css'

//导入store
import store from './store/index'

import * as filters from './filters'

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

import { Button } from 'vant';
import dayjs from 'dayjs'

Vue.use(Button);

Vue.config.productionTip = false;

Vue.prototype.$bus = new Vue()
Vue.prototype.$dayjs = dayjs
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
