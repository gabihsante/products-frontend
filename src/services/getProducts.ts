import { api } from '../boot/axios.ts'
import type { Product } from '../types/product.ts'

export async function getProducts(): Promise<Array<Product>> {
  return api
    .get(`/api/products`)
    .then(({ data }) => data)
    .catch((error) => error)
}
