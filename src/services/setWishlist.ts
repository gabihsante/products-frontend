import { api } from '../boot/axios'

export async function setWishlist(code: string):Promise<string> {
  return api
    .post('/api/wishlist', { code })
    .then(({ data }) => data)
    .catch((err) => err)
}
