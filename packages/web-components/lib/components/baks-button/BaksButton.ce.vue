<template>
  <BaksButton :variant :size :disabled @bk-button:click="$emit('bk-button:click')">
    hello
    <slot></slot>
  </BaksButton>
</template>

<script setup lang="ts">
import type { ThemeVariant } from '@baks-components/shared';
import BaksButton from '@baks-components/vue/lib/components/baks-button/BaksButton.vue';

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
@import url('./style.css');
</style>
