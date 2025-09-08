<template>
  <button
    :id
    ref="element"
    type="button"
    class="bk-tab block text-center rounded-sm hover min-w-16 w-28 p-3"
    :class="[resolveVariant(variant), { 'is-selected': isSelected }]"
    part="bk-tab"
    :aria-controls="controls"
    :aria-selected="isSelected"
    role="tab"
    @click="emit('click')"
  >
    <slot name="icon"></slot>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
import { resolveVariant } from 'baks-components-styles';
import type { ThemeVariant } from 'baks-components-styles';
import { ref, watch } from 'vue';

type Props = {
  id?: string;
  variant: ThemeVariant;
  selected?: boolean;
  controls: string;
};

const props = withDefaults(defineProps<Props>(), {
  id: `tab-${uuidv4()}`,
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
const emit = defineEmits<{
  click: [];
}>();
</script>

<style>
@import '../../../../shared/src/css/baks-tab.css';
</style>
