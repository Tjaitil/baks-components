<template>
  <button
    :type
    part="bk-button"
    class="bk-button hover focus"
    :class="[resolveVariant(variant), { 'w-full': size === 'block', disabled: disabled }]"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { type ThemeVariant, resolveVariant } from 'baks-components-styles';

interface Props {
  type?: 'button' | 'submit' | 'reset';
  variant: ThemeVariant;
  size?: 'normal' | 'block';
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  size: 'normal',
  disabled: false
});
</script>

<style>
@import url('@shared/css/baks-button.css');
</style>
