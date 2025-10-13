import { defineStore } from 'pinia'
import type { Product } from '../types/product.ts'
import { getWishlist } from '@services/getWishlist.ts'

type WishlistStore = {
  products: Array<Product>
}

export const useWishlistListStore = defineStore('wishlistListStore', {
  state: (): WishlistStore => ({
    products: [],
  }),
  getters: {
    getWishlistProducts(state) {
      return state.products
    },
  },
  actions: {
    async fetchWishlistProducts() {
      await getWishlist().then((response) => {
        if (!response.length) return (this.products = [])
        this.products = response
      })
    },
    updateWishlist(product: Product) {
      const hasProductInList = this.products.some((p) => p.code === product.code)

      if (hasProductInList) {
        return (this.products = this.products.filter((p) => p.code !== product.code))
      }

      this.products = [...this.products, product]
    },
  },
})
