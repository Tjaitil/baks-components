<template>
  <div
    v-if="isVisible"
    class="bk-tab-panel p-4 rounded rounded-t-none shadow-sm shadow-black"
    part="bk-tab-panel"
    :class="resolveVariant(variant)"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { resolveVariant } from '@baks-components/shared';
import type { ThemeVariant } from '@baks-components/shared';

interface Props {
  variant: ThemeVariant;
  isVisible?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isVisible: false
});
</script>

<style>
@import url('../../app.css');
</style>
