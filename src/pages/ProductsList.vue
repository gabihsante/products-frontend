<template>
  <products-container>
    <template #product>
      <product-card v-for="product in products" :key="product.code" :product="product">
        <template #action>
          <button
            class="products-list__favorite-btn"
            aria-label="Favoritar produto"
            @click="addToWishlist(product.code)"
          >
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
import { setWishlist } from '@services/setWishlist.ts'
import Swal from 'sweetalert2'

const products = ref<Product[]>([])

onMounted(() => {
  getProducts().then((response) => (products.value = response))
})

async function addToWishlist(code: string) {
  await setWishlist(code)
    .then(() => {
      Swal.fire({
        title: 'Successo!',
        text: 'Produto adicionado aos favoritos',
        icon: 'success',
        timer: 1000,
      })
    })
    .catch((err) => {
      return Swal.fire({
        title: 'Erro!',
        text: err,
        icon: 'error',
        timer: 1000,
      })
    })
}
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
