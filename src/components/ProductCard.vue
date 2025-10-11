<template>
  <div class="product__card">
    <div class="product__action-wrapper">
      <slot name="action"></slot>
    </div>
    <img :src="product.image" alt="Imagem do produto" loading="lazy" class="product__img" />
    <div class="product__content">
      <p class="product__title">{{ product.name }}</p>
      <div class="product__rating-wrapper">
        <div class="d-flex">
          <span
            v-for="(_, index) in 5"
            :key="index"
            class="material-icons-outlined product__rating-icon"
          >
            {{ getStarType(index) }}
          </span>
        </div>
        <span class="product__rating-value">{{ product.rating }}</span>
      </div>
      <p class="product__price">R$ {{ currencyFormat(product.priceInCents) }}</p>
      <strong class="product__sale-price">R$ {{ currencyFormat(product.salePriceInCents) }}</strong>
    </div>
  </div>
</template>

<script setup lang="ts">
import { currencyFormat } from '@utils/currencyFormat'
import type { Product } from '../types/product'

type ProductCardProps = {
  product: Product
}

const props = defineProps<ProductCardProps>()

function getStarType(index: number): string {
  const fullStars = Math.floor(props.product.rating)
  const halfStars = props.product.rating % 1 >= 0.25 && props.product.rating % 1 < 0.75

  if (index < fullStars) return 'star'
  if (index === fullStars && halfStars) return 'star_half'
  return 'star_outline'
}
</script>

<style scoped lang="scss">
.product {
  &__card {
    width: 100%;
    max-width: 200px;
    display: grid;
    padding: 2px 2px 12px;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    cursor: pointer;

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transition: all 0.2s ease;
    }
  }

  &__action-wrapper {
    margin-left: auto;
  }

  &__img {
    height: 9em;
    justify-self: center;
    margin-block: 6px;
  }

  &__content {
    padding-left: 12px;
    color: $text-color;
  }

  &__title {
    margin-block: 4px;
    font-weight: 600;
  }

  &__rating {
    &-wrapper {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 14px;
    }

    &-icon {
      font-size: inherit;
      color: #e5a102;
    }
  }

  &__price {
    margin-block: 6px 0;
    font-size: 13px;
    color: $grey-300;
    text-decoration: line-through;
    text-decoration-color: $grey-300;
  }

  &__sale-price {
    color: $secondary-color;
    font-size: 18px;
    font-weight: 900;
  }
}
</style>
