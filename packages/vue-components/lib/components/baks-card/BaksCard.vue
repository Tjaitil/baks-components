<template>
  <div
    part="baks-card"
    class="bk-card relative p-4 rounded-sm shadow-xs shadow-black"
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
const props = defineProps<Props>();
</script>
