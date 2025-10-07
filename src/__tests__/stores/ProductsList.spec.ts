import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import ProductsList from '@pages/ProductsList.vue'

describe('products store', () => {
  it('exibe os produtos na tela', async () => {
    render(ProductsList)

    expect(
      await screen.findByText('Tênis Nike Revolution 7 Feminino - Preto+Branco'),
    ).toBeInTheDocument()
  })
})
