<template>
  <BaksButton :variant :size :disabled @click="handle">
    hello
    <slot></slot>
  </BaksButton>
</template>

<script setup lang="ts">
import type { ThemeVariant } from '@/types/ThemeVariants';
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
