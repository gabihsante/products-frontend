import { beforeEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import WishlistPage from '@pages/WishlistPage.vue'
import { createPinia, setActivePinia } from 'pinia'

beforeEach(() => {
  setActivePinia(createPinia())
})

vi.mock('@services/getWishlist.ts', () => ({
  getWishlist: vi.fn().mockResolvedValue([
    {
      code: '123',
      name: 'Tênis Nike Revolution 7 Feminino - Preto+Branco',
      available: true,
      visible: true,
      details: {
        name: 'Tênis Nike Revolution 7 Feminino - Preto+Branco',
        description: 'Teste',
      },
      priceInCents: 59999,
      salePriceInCents: 39999,
      rating: 4.5,
      image: 'test',
      stockAvailable: true,
    },
  ]),
}))

vi.mock('@services/removeFromWishlist.ts', () => ({
  removeFromWishlist: vi.fn().mockResolvedValue('Removido com sucesso'),
}))

vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn().mockResolvedValue(true),
  },
}))

describe('remover produto', () => {
  it('remove produto da wishlist ao clicar no botão', async () => {
    const wrapper = mount(WishlistPage)

    await flushPromises()

    const removeButton = wrapper.find('.products-list__close-btn')
    expect(removeButton.exists()).toBe(true)

    await removeButton.trigger('click')

    const { removeFromWishlist } = await import('@services/removeFromWishlist.ts')
    expect(removeFromWishlist).toHaveBeenCalledExactlyOnceWith('123')
  })
})
