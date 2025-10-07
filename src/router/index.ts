import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@layouts/MainLayout.vue'),
      children: [
        {
          path: '',
          name: 'products-list',
          component: () => import('@pages/ProductsList.vue')
        }
      ]
    }
  ],
})

export default router
