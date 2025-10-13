import { describe, it, expect, vi, beforeEach } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

beforeEach(() => {
  vi.resetModules()
  setActivePinia(createPinia())
})

vi.mock('@services/getProducts.ts', () => ({
  getProducts: vi.fn().mockResolvedValue([
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

vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn().mockResolvedValue(true),
  },
}))

describe('favorite products', () => {
  it('adiciona o produto à wishlist se ele não estiver presente', async () => {
    vi.doMock('@services/getWishlist.ts', () => ({
      getWishlist: vi.fn().mockResolvedValue([]), // <- wishlist vazia
    }))

    const setWishlist = vi.fn().mockResolvedValue('sucesso')
    vi.doMock('@services/setWishlist.ts', () => ({
      setWishlist,
    }))

    const { default: ProductsList } = await import('@pages/ProductsList.vue')

    const wrapper = mount(ProductsList)
    await flushPromises()

    const favoriteButton = wrapper.find('.products-list__favorite-btn')
    expect(favoriteButton.exists()).toBe(true)

    await favoriteButton.trigger('click')

    expect(setWishlist).toHaveBeenCalledExactlyOnceWith('123')
  })

  it('remove o produto da wishlist se ele já estiver presente', async () => {
    vi.resetModules()
    setActivePinia(createPinia())

    vi.doMock('@services/getWishlist.ts', () => ({
      getWishlist: vi.fn().mockResolvedValue([
        { code: '123', name: 'Tênis Nike Revolution 7 Feminino - Preto+Branco' },
      ]),
    }))

    const removeFromWishlist = vi.fn().mockResolvedValue('removido com sucesso')
    vi.doMock('@services/removeFromWishlist.ts', () => ({
      removeFromWishlist,
    }))

    const { default: ProductsList } = await import('@pages/ProductsList.vue')

    const wrapper = mount(ProductsList)
    await flushPromises()

    const favoriteButton = wrapper.find('.products-list__favorite-btn')
    expect(favoriteButton.exists()).toBe(true)

    await favoriteButton.trigger('click')

    expect(removeFromWishlist).toHaveBeenCalledExactlyOnceWith('123')
  })
})
