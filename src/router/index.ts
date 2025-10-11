import { createRouter, createWebHistory } from 'vue-router'
import { useLayoutStore } from '@stores/LayoutStore.ts'

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
          component: () => import('@pages/ProductsList.vue'),
          meta: {
            breadcrumb: 'Home',
          },
        },
      ],
    },
  ],
})

router.beforeEach((to) => {
  const layoutStore = useLayoutStore()

  layoutStore.setBreadcrumbFromRoute(to)
})

export default router
