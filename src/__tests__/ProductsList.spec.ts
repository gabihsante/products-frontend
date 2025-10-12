import { describe, it, expect, vi, beforeEach } from 'vitest'
import ProductsList from '@pages/ProductsList.vue'
import { flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

beforeEach(() => {
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

vi.mock('@services/setWishlist.ts', () => ({
  setWishlist: vi.fn().mockResolvedValue('sucesso'),
}))

vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn().mockResolvedValue(true),
  },
}))

describe('products list', () => {
  it('exibe os produtos na tela', async () => {
    const wrapper = mount(ProductsList)

    await flushPromises()

    expect(wrapper.text()).toContain('Tênis Nike Revolution 7 Feminino - Preto+Branco')
  })
})

describe('favorite products', () => {
  it('salva o produto na wishlist ao clicar no botão de favorito', async () => {
    const wrapper = mount(ProductsList)

    await flushPromises()

    const favoriteButton = wrapper.find('.products-list__favorite-btn')
    expect(favoriteButton.exists()).toBe(true)

    await favoriteButton.trigger('click')

    const { setWishlist } = await import('@services/setWishlist.ts')
    expect(setWishlist).toHaveBeenCalledExactlyOnceWith('123')
  })
})
