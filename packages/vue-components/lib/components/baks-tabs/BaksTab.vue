<template>
  <button
    type="button"
    class="bk-tab block text-center rounded hover min-w-16 w-28 p-3"
    :class="[resolveVariant(variant), { 'is-selected': isSelected }]"
    part="bk-tab"
    ref="element"
    :aria-controls="controls"
    :aria-selected="isSelected"
    role="tab"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { resolveVariant } from 'baks-components-styles';
import type { ThemeVariant } from 'baks-components-styles';
import { ref, watch } from 'vue';

interface Props {
  variant: ThemeVariant;
  tabGroup: string;
  selected?: boolean;
  controls: string;
}

const props = withDefaults(defineProps<Props>(), {
  selected: false
});

const isSelected = ref<boolean>(props.selected);

watch(
  () => props.selected,
  (newValue) => {
    isSelected.value = newValue;
  }
);

const element = ref<HTMLElement | null>(null);

</script>

<style>
@import url('@shared/css/baks-tab.css');
</style>
