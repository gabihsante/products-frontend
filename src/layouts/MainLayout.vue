<template>
  <header>
    <nav class="header__navbar">
      <div class="header__content">
        <div class="header__logo-wrapper">
          <img src="@assets/logo.svg" alt="Logo Netshoes" class="header__logo-img" />
        </div>
        <div class="header__wishlist">
          <button class="header__wishlist-btn" aria-label="wishlist">
            <span class="material-symbols-outlined header__wishlist-icon">favorite</span>
            <span v-if="!isMobile">Wishlist</span>
          </button>
        </div>
        <div>
          <button class="header__account-btn" aria-label="account">
            <span class="material-symbols-outlined header__account-icon"> account_circle </span>
          </button>
        </div>
      </div>
    </nav>
  </header>
  <router-view />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const isMobile = computed(() => window.innerWidth < 475)
</script>

<style scoped lang="scss">
.header {
  &__navbar {
    width: calc(100% - 64px);
    height: 3.5rem;
    display: flex;
    justify-content: center;
    padding: 0.5rem 2rem;
    background-color: $primary-color;
  }

  &__content {
    width: 100%;
    max-width: 1306px;
    display: flex;
    align-items: center;
    gap: 1.8em;
    color: white;
  }

  &__logo {
    &-wrapper {
      flex: 1 1 0;
    }

    &-img {
      width: 8em;
    }
  }

  &__wishlist {
    &-btn {
      gap: 0.33rem;
      font-size: 1.15rem;
    }

    &-icon {
      font-size: 1.28rem;
    }
  }
}

[class*='btn'] {
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
}
</style>
