import { describe, it, expect } from 'vitest'
import ProductsList from '@pages/ProductsList.vue'
import { mount } from '@vue/test-utils'

describe('products list', () => {
  it('exibe os produtos na tela', async () => {
    const wrapper = mount(ProductsList)

    expect(wrapper.text()).toBe('Tênis Nike Revolution 7 Feminino - Preto+Branco')
  })
})
