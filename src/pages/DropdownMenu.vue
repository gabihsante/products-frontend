<template>
  <div class="dropdown" @keydown.esc="close" ref="dropdownRef">
    <div
      class="dropdown__trigger"
      @click="toggle"
      @keydown.enter.prevent="toggle"
      @keydown.space.prevent="toggle"
      @focusout="close"
    >
      <slot name="trigger" />
    </div>

    <transition name="fade">
      <div v-if="isOpen" class="dropdown__menu">
        <slot name="menu" />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

function toggle() {
  isOpen.value = !isOpen.value
}

function close() {
  isOpen.value = false
}
</script>

<style scoped lang="scss">
.dropdown {
  position: relative;
  display: inline-block;

  &__trigger {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    outline: none;
  }

  &__menu {
    position: absolute;
    right: 0;
    margin-top: 0.5rem;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 6px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
    z-index: 1000;
    min-width: 150px;
    padding: 0.5rem 0;

    &::before {
      content: '';
      position: absolute;
      top: -20px;
      right: -6px;
      transform: translateX(-50%);
      border-width: 10px;
      border-style: solid;
      border-color: transparent transparent white transparent;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
