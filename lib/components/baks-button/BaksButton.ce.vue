<template>
  <button
    @click="handle"
    part="button"
    class="bk-button"
    :class="[resolveVariant(variant, 'button'), { 'w-full': size === 'block', disabled: disabled }]"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import type { ThemeVariant } from '@/types/ThemeVariants';
import { resolveVariant } from '@/utilities/variants';

interface Props {
  variant: ThemeVariant;
  size?: 'normal' | 'block';
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'normal',
  disabled: false
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
