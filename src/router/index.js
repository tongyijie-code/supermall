import Vue from 'vue';
import VueRouter from "vue-router";

//懒加载
const Home = () => import('views/home/home.vue');
const Category = () => import('views/category/category.vue');
const  Cart = () => import('views/carts/cart.vue');
const Profile = () => import('views/profile/profile.vue');
const Detail = () => import ('views/detail/Detail')

//安装插件
Vue.use(VueRouter);

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },{
  path: '/detail/:iid',
    component: Detail
  }
]
//创建router
const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;


