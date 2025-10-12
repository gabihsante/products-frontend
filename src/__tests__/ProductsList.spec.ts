import { describe, it, expect, vi } from 'vitest'
import ProductsList from '@pages/ProductsList.vue'
import { flushPromises, mount } from '@vue/test-utils'

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

describe('products list', () => {
  it('exibe os produtos na tela', async () => {
    const wrapper = mount(ProductsList)

    await flushPromises()

    expect(wrapper.text()).toContain('Tênis Nike Revolution 7 Feminino - Preto+Branco')
  })
})
