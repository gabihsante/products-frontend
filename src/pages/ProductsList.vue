<template>
  <products-container>
    <template #product>
      <product-card v-for="product in products" :key="product.code" :product="product">
        <template #action>
          <button
            class="products-list__favorite-btn"
            aria-label="Favoritar produto"
            @click="updateWishlistProduct(product)"
            :style="product.isFavorite && 'background-color: red'"
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
import { useWishlistListStore } from '@stores/WishlistStore.ts'
import { storeToRefs } from 'pinia'
import { removeFromWishlist } from '@services/removeFromWishlist.ts'

interface ViewProduct extends Product {
  isFavorite: boolean
}

const wishListStore = useWishlistListStore()
const { getWishlistProducts: wishlist } = storeToRefs(wishListStore)
const products = ref<ViewProduct[]>([])

onMounted(async () => {
  await wishListStore.fetchWishlistProducts()
  fetchProducts()
})

function fetchProducts(): void {
  getProducts().then(async (response) => {
    products.value = response.map((product) => {
      const isFavorite = wishlist.value.some((p) => product.code === p.code)
      return {
        ...product,
        isFavorite,
      }
    })
  })
}

function updateWishlistProduct(product: Product) {
  const isFavorite = wishlist.value.some((p) => product.code === p.code)

  if (!isFavorite) return addToWishlist(product)
  return removeProductFromWishlist(product)
}

async function addToWishlist(product: Product) {
  await setWishlist(product.code)
    .then(() => {
      Swal.fire({
        title: 'Successo!',
        text: 'Produto adicionado aos favoritos',
        icon: 'success',
        timer: 1000,
      }).then(() => {
        checkFavorite(product)
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

async function removeProductFromWishlist(product: Product) {
  await removeFromWishlist(product.code).then(() => {
    Swal.fire({
      title: 'Successo!',
      text: 'Produto removido com sucesso',
      icon: 'success',
      timer: 1000,
    })
      .then(() => {
        checkFavorite(product)
      })
      .catch((err) => {
        return Swal.fire({
          title: 'Erro!',
          text: err,
          icon: 'error',
          timer: 1000,
        })
      })
  })
}

function checkFavorite(product: Product) {
  wishListStore.updateWishlist(product)
  products.value = products.value.map((product) => {
    const isFavorite = wishlist.value.some((p) => product.code === p.code)
    return {
      ...product,
      isFavorite,
    }
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
