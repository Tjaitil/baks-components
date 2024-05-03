<template>
  <button
    @click="handle"
    part="button"
    class="bk-button"
    :class="resolveVariant(variant, 'button')"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import type { ThemeVariant } from '@/types/ThemeVariants';
import { resolveVariant } from '@/utilities/variants';
interface Props {
  variant: ThemeVariant;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'click:bk-button': [];
}>();

const handle = () => {
  emit('click:bk-button');
};
</script>

<style>
@import url('./style.css');

.bk-button {
  font-size: 16px;
  cursor: pointer;
  @apply text-white;
  @apply px-6;
  @apply py-1.5;
  transition: filter 0.2s ease-out;
  min-width: 100px;
  @apply shadow;
  @apply shadow-black;
}
.bk-button:hover {
  @apply brightness-105;
}
</style>
