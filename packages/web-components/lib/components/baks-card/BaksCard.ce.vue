<template>
  <div
    part="baks-card"
    class="relative p-4 rounded border-default shadow-sm shadow-black"
    :class="resolveVariant(variant)"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { type ThemeVariant, resolveVariant } from '@baks-components/shared';

interface Props {
  variant: ThemeVariant;
}
const props = defineProps<Props>();
</script>

<style>
@import url('./style.css');
</style>
