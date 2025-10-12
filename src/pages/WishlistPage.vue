<template>
  <products-container>
    <template #product>
      <product-card v-for="product in wishlistProducts" :product="product" :key="product.code">
        <template #action>
          <button
            class="products-list__close-btn"
            aria-label="Remover produto"
            @click="removeOfWishlist(product.code)"
          >
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
import { onMounted } from 'vue'
import Swal from 'sweetalert2'
import { removeFromWishlist } from '@services/removeFromWishlist.ts'

const wishlistStore = useWishlistListStore()
const { getWishlistProducts: wishlistProducts } = storeToRefs(wishlistStore)

onMounted(() => {
  wishlistStore.fetchWishlistProducts()
})

async function removeOfWishlist(code: string) {
  await removeFromWishlist(code)
    .then(() => {
      Swal.fire({
        title: 'Successo!',
        text: 'Produto removido dos favoritos',
        icon: 'success',
        timer: 1000,
      })
      wishlistStore.fetchWishlistProducts()
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

<style scoped lang="scss"></style>
