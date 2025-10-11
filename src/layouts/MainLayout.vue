<template>
  <header>
    <nav class="header__navbar">
      <div class="header__content">
        <div class="flex-auto">
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
  <main id="main-content">
    <breadcrumb-page />
    <hr class="content__separator" />
    <router-view />
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BreadcrumbPage from '@components/BreadcrumbPage.vue'

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
      gap: 0.33rem;
      font-size: 15px;
      letter-spacing: 0.028rem;
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
}

[class*='btn'] {
  display: flex;
  align-items: center;
}

.content__separator {
  width: 100%;
  margin-block: 24px;
  margin-inline: 0;
}

#main-content {
  height: 100%;
  width: calc(100% - 64px);
  max-width: 1306px;
  margin: 0 auto;
  padding: 0.3rem 2rem;
  @media screen and (max-width: 576px) {
    width: calc(100% - 12px);
    padding: 6px;
  }
}
</style>
