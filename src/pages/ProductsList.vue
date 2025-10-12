<template>
  <div class="products-list">
    <div class="products-list__products-wrapper">
      <product-card v-for="product in products" :key="product.code" :product="product">
        <template #action>
          <button class="products-list__favorite-btn" aria-label="favorite">
            <span class="material-symbols-outlined products-list__favorite-icon"> favorite </span>
          </button>
        </template>
      </product-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductCard from '@components/ProductCard.vue'
import { onMounted, ref } from 'vue'
import type { Product } from '../types/product.ts'
import { getProducts } from '@services/getProducts.ts'

const products = ref<Product[]>([])

onMounted(() => {
  getProducts().then((response) => (products.value = response))
})
</script>

<style scoped lang="scss">
.products-list {
  display: flex;
  justify-content: center;
  padding-bottom: 12px;

  &__products-wrapper {
    max-width: 87%;
    display: flex;
    flex-wrap: wrap;
    row-gap: 24px;
    column-gap: 24px;

    @media screen and (max-width: 800px) {
      row-gap: 6px;
      column-gap: 6px;
    }

    @media screen and (max-width: 576px) {
      max-width: 100%;
    }
  }

  &__favorite {
    &-btn {
      display: flex;
      color: #fff;
      padding: 6px;
      border-radius: 50%;
      background-color: $grey-200;
    }

    &-icon {
      font-size: 18px;
    }
  }
}
</style>
