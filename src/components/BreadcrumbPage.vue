<template>
  <div class="breadcrumb__wrapper">
    <router-link
      v-for="(breadcrumb) in breadcrumbs"
      :key="breadcrumb.name"
      :to="breadcrumb.path"
      v-slot="{ isActive }"
      class="breadcrumb__link"
    >
      <span :class="isActive && 'breadcrumb__link--active'">
        {{ breadcrumb.label }}
      </span>
      <span v-if="!isActive"> / </span>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { useLayoutStore } from '@stores/LayoutStore.ts'
import { storeToRefs } from 'pinia'

const layoutStore = useLayoutStore()
const { getBreadcrumb: breadcrumbs } = storeToRefs(layoutStore)

</script>

<style scoped lang="scss">
.breadcrumb {
  &__wrapper {
    margin-block: 12px;
  }

  &__link {
    color: $secondary-color;
    font-size: 16px;
    text-decoration: none;

    &--active {
      font-weight: 700;
    }
  }
}
</style>
