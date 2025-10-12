<template>
  <products-container>
    <template #product>
      <product-card v-for="product in wishlistProducts" :product="product" :key="product.code">
        <template #action>
          <button class="products-list__favorite-btn" aria-label="Remover produto">
            <span class="material-symbols-outlined products-list__close-icon"> close </span>
          </button>
        </template>
      </product-card>
    </template>
  </products-container>
</template>

<script setup lang="ts">
import ProductsContainer from '@components/ProductsContainer.vue'
import ProductCard from '@components/ProductCard.vue'
import { useWishlistListStore } from '@stores/WishlistStore.ts'
import { storeToRefs } from 'pinia'

const wishlistStore = useWishlistListStore()
const { getWishlistProducts: wishlistProducts } = storeToRefs(wishlistStore)
</script>

<style scoped lang="scss"></style>
