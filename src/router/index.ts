import { createRouter, createWebHistory } from "vue-router"
import Login from "../views/Login.vue"
import Main from "../views/Main.vue"

const routes:any = [
  //登录
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { isPublic: true },
  },

  //首页
  {
    path: "/",
    name: "main",
    component: Main,
    redirect: "/404",
    children: [],
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.beforeEach((to:any, from:any, next:any) => {
  if (!to.meta.isPublic && !sessionStorage.getItem("token")) {
    sessionStorage.clear()
    return next("/login")
  } else {
    next()
  }
})
export default router