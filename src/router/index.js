import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        {
          path: '/welcome',
          component: Welcome
        },
        {
          path: '/users',
          component: Users
        },
        {
          path: '/rights',
          component: Rights
        },
        {
          path: '/roles',
          component: Roles
        }
      ]
    },
  ],
  mode: 'history'   //注意这个必写，不然页面加载不出来
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  //to 将要访问的路径
  //from 代表从哪个路径跳转而来
  //next 是一个函数，表示放行 
  //      next()放行    next('/login')代表强制跳转
  if (to.path === '/login') {  //如果访问的是登录页，直接放行
    return next()
  }
  //如果访问的不是登录页，获取token，看它是不是有token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) { //如果token为空值，说明没有进行登录，妄想直接访问其他页面，此时要给他强制跳转到登录页面让他登录
    next('/login')
  }
  next() //有token的话就直接放行

})
export default router