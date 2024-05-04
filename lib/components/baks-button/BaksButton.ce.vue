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
  'bk-button:button': [];
}>();

const handle = () => {
  emit('bk-button:button');
};
</script>

<style>
@import url('./style.css');
</style>
