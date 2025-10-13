<template>
  <header>
    <main-nav-bar />
  </header>
  <main id="main-content">
    <breadcrumb-page />
    <hr class="content__separator" />
    <router-view />
  </main>
</template>

<script setup lang="ts">
import BreadcrumbPage from '@components/BreadcrumbPage.vue'
import MainNavBar from '@components/MainNavBar.vue'
</script>

<style scoped lang="scss">
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
