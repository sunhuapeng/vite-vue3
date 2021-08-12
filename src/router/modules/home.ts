const router = {
  path: '/home',
  name: 'Home',
  component: () => import('../../view/home/index'),
}
export default router