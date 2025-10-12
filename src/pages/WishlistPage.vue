<template>
  <products-container v-if="wishlistProducts.length">
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
  <div v-else class="empty-list">
    <span class="empty-list__text"
      >Sua lista ainda está vazia, mas você pode escolher seus produtos favoritos para salvar na sua
      lista.
    </span>
    <img src="@assets/no-data.svg" alt="Imagem lista vazia" class="empty-list__img" />
    <router-link to="/" class="empty-list__go-home-btn">
      <span class="material-symbols-outlined empty-list__close-icon"> shopping_bag </span>
      <span>Ver produtos</span>
    </router-link>
  </div>
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

<style scoped lang="scss">
.empty-list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;

  &__text {
    font-size: 17px;
    letter-spacing: 0.03rem;
  }

  &__img {
    width: 60%;
    max-width: 500px;
  }

  &__go-home-btn {
    display: flex;
    align-items: center;
    text-decoration: none;
    gap: 8px;
    color: white;
    background-color: $primary-color;
    padding: 10px 16px;
    border-radius: 4px;
    box-shadow:
      0 3px 5px -1px #0003,
      0 5px 8px #00000024,
      0 1px 14px #0000001f;

    &:hover {
      background-color: #8200ffad;
      transition: all 0.2s ease;
    }
  }
}
</style>
