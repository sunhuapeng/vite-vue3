const router = {
  path: '/articles',
  name: 'Articles',
  component: () => import('../../view/articles/index'),
}
export default router