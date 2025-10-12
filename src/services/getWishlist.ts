import { api } from '../boot/axios.ts'
import type { Product } from '../types/product.ts'

export async function getWishlist(): Promise<Array<Product>> {
  return api
    .get('/api/wishlist')
    .then(({ data }) => data)
    .catch((err) => err)
}
