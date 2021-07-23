import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../view/home/index'),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
