<template>
  <nav class="header__navbar">
    <div class="header__content">
      <div class="flex-auto">
        <img src="@assets/logo.svg" alt="Logo Netshoes" class="header__logo-img" />
      </div>
      <div class="header__wishlist">
        <router-link class="header__wishlist-btn" to="wishlist">
          <span class="material-symbols-outlined header__wishlist-icon">favorite</span>
          <span v-if="!isMobile">Wishlist</span>
        </router-link>
      </div>
      <div>
        <dropdown-menu>
          <template #trigger>
            <button class="header__account-btn" aria-label="account">
              <span class="material-symbols-outlined header__account-icon"> account_circle </span>
            </button>
          </template>
          <template #menu>
            <div v-for="item in menuItems" :key="item.name" class="header__menu-item">
              {{ item.label }}
            </div>
          </template>
        </dropdown-menu>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import DropdownMenu from '@pages/DropdownMenu.vue'
import { computed } from 'vue'

const menuItems = [
  {
    name: 'login',
    label: 'Entrar',
  },
  {
    name: 'account',
    label: 'Minha Conta',
  },
  {
    name: 'addresses',
    label: 'Endereços',
  },
  {
    name: 'myNetshoes',
    label: 'Minha Netshoes',
  },
]
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
    &-img {
      width: 8em;
    }
  }

  &__wishlist {
    &-btn {
      color: inherit;
      gap: 0.33rem;
      font-size: 15px;
      letter-spacing: 0.028rem;
      text-decoration: none;
    }

    &-icon {
      font-size: 20px;
    }
  }

  &__account {
    &-btn {
      padding-inline: 6px 0;
    }
  }

  &__menu-item {
    font-size: 16px;
    padding: 4px 12px;
    color: $text-color;
  }
}

[class*='btn'] {
  display: flex;
  align-items: center;
}
</style>
