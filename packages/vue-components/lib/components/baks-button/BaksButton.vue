<template>
  <button
    part="bk-button"
    class="bk-button hover shadow-sm shadow-black px-6 py-1.5 cursor-pointer rounded min-w-24"
    :class="[resolveVariant(variant), { 'w-full': size === 'block', disabled: disabled }]"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { type ThemeVariant, resolveVariant } from 'baks-components-styles';

interface Props {
  variant: ThemeVariant;
  size?: 'normal' | 'block';
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'normal',
  disabled: false
});
</script>

<style>
@import url('@shared/css/baks-button.css');
</style>
