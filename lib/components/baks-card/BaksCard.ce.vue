<template>
  <div
    part="baks-card"
    class="relative p-4 rounded border-default shadow shadow-black"
    :class="resolveVariant(variant, 'card')"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { ThemeVariant } from '../../types/ThemeVariants';
import { resolveVariant } from '@/utilities';

interface Props {
  variant: ThemeVariant;
}
const props = defineProps<Props>();
</script>

<style>
@import url('./style.css');
</style>
