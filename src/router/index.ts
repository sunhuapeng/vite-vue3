import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import getRouter from './get-router'
const  routers = await getRouter()
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  ...routers
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
