<template>
  <button
    @click="handle"
    part="bk-button"
    class="bk-button hover"
    :class="[resolveVariant(variant), { 'w-full': size === 'block', disabled: disabled }]"
  >
  hello
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { type ThemeVariant, resolveVariant } from '@baks-components/shared';

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
