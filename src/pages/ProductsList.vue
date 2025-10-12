<template>
  <products-container>
    <template #product>
      <product-card v-for="product in products" :key="product.code" :product="product">
        <template #action>
          <button class="products-list__favorite-btn" aria-label="Favoritar produto">
            <span class="material-symbols-outlined products-list__favorite-icon"> favorite </span>
          </button>
        </template>
      </product-card>
    </template>
  </products-container>
</template>

<script setup lang="ts">
import ProductsContainer from '@components/ProductsContainer.vue'
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
