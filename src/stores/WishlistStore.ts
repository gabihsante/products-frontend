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
      await getWishlist().then((response) => (this.products = response))
    },
  },
})
