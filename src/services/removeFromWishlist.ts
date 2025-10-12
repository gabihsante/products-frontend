import { api } from '../boot/axios.ts'

export async function removeFromWishlist(code: string): Promise<string> {
  return api
    .delete('/api/wishlist', { params: { code } })
    .then(({ data }) => data)
    .catch((err) => err)
}
