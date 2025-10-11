import { defineStore } from 'pinia'
import { type RouteLocationNormalized } from 'vue-router'

type LayoutStore = {
  breadcrumb: Array<{
    name: string
    path: string
    label: string
  }>
}

export const useLayoutStore = defineStore('layoutStore', {
  state: (): LayoutStore => ({
    breadcrumb: [],
  }),
  getters: {
    getBreadcrumb(state) {
      return state.breadcrumb
    },
  },
  actions: {
    setBreadcrumbFromRoute(route: RouteLocationNormalized) {
      const breadcrumbRoutes = route.matched.filter((route) => route.meta.breadcrumb)
      this.breadcrumb = breadcrumbRoutes.map((item) => ({
        name: item.name as string,
        path: item.path,
        label: item.meta.breadcrumb!,
      }))
    },
  },
})
