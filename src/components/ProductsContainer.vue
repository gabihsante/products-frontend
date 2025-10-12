<template>
  <div class="products-container">
    <div class="products-container__products-wrapper">
      <slot name="product"></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.products-container {
  display: flex;
  justify-content: center;
  padding-bottom: 12px;

  &__products-wrapper {
    max-width: 87%;
    display: flex;
    flex-wrap: wrap;
    row-gap: 24px;
    column-gap: 24px;

    @media screen and (max-width: 800px) {
      row-gap: 6px;
      column-gap: 6px;
    }

    @media screen and (max-width: 576px) {
      max-width: 100%;
    }
  }
}
</style>
