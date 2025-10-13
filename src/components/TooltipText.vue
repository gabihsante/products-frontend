<template>
  <div
    class="tooltip__container"
    @mouseenter="show = true"
    @mouseleave="show = false"
    @focus="show = true"
    @blur="show = false"
  >
    <slot name="default" />
    <transition name="fade">
      <div v-if="show" class="tooltip" role="tooltip">
        {{ text }}
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  text: string
}>()

const show = ref(false)
</script>

<style scoped lang="scss">
.tooltip {
  position: absolute;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: white;
  padding: 6px 10px;
  border-radius: 4px;
  white-space: nowrap;
  font-size: 13px;
  z-index: 100;
  opacity: 0.9;
  pointer-events: none;

  &__container {
    position: relative;
    cursor: pointer;
    outline: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 6px;
    border-style: solid;
    border-color: #333 transparent transparent transparent;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
