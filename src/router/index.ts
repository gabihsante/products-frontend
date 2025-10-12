import { createRouter, createWebHistory } from 'vue-router'
import { useLayoutStore } from '@stores/LayoutStore.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@layouts/MainLayout.vue'),
      meta: {
        breadcrumb: 'Home',
      },
      children: [
        {
          path: '',
          name: 'products-list',
          component: () => import('@pages/ProductsList.vue'),
        },
        {
          path: '/wishlist',
          name: 'wishlist',
          component: () => import('@pages/WishlistPage.vue'),
          meta: {
            breadcrumb: 'Wishlist',
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
