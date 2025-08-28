<template>
  <div
    part="baks-card"
    class="relative p-4 rounded-sm shadow-xs shadow-black"
    :class="resolveVariant(variant)"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { type ThemeVariant, resolveVariant } from 'baks-components-styles';

type Props = {
  variant: ThemeVariant;
};
defineProps<Props>();
</script>

<style>
@import url('./style.css');
</style>
