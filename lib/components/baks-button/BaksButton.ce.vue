<template>
  <button
    @click="handle"
    part="button"
    class="bk-button"
    :class="[resolveVariant(variant, 'button'),{ 'w-full': size === 'block', 'disabled': disabled !== undefined}]"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import type { ThemeVariant } from '@/types/ThemeVariants';
import { resolveVariant } from '@/utilities/variants';

interface Props {
  variant: ThemeVariant;
  size: 'normal' | 'block';
  // This is string because web components doesn't support boolean props
  disabled?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'normal',
});

const emit = defineEmits<{
  'bk-button:click': [];
}>();

const handle = () => {
  emit('bk-button:click');
};
</script>

<style>
@import url('./style.css');
</style>
