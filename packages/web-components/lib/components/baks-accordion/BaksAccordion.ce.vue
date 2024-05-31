<template>
  <div class="bk-accordion" :class="[resolveVariant(variant)]" part="bk-accordion">
    <div class="bk-accordion-header" part="bk-accordion-header">
      <button
        @click="toggleIsOpen"
        @keydown="handleKeyDown"
        @keyup.enter="toggleIsOpen"
        @keyup.space="toggleIsOpen"
        :id="accordionId"
        type="button"
        :aria-expanded="isExpanded"
        class="accordion-trigger block w-full p-4 focus"
        :aria-controls="accordionContentId"
      >
        <div class="flex flex-row items-center gap-2">
          <slot name="header"></slot>
          <slot name="icon">
            <div class="relative">
              <ChevronDown class="chevron-down" :class="{ 'rotate-180': isExpanded }" />
            </div>
          </slot>
        </div>
      </button>
    </div>
    <div
      :id="accordionContentId"
      class="bk-accordion-content"
      role="region"
      :aria-labelledby="accordionId"
      :style="{ height: `${height}px` }"
      ref="contentWrapper"
      part="bk-accordion-content"
    >
      <div class="p-4" part="bk-accordion-content-inner">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ThemeVariant } from '@/types/ThemeVariants';
import { resolveVariant } from '@/utilities/variants';
import ChevronDown from '../Icons/ChevronDown.vue';
import { v4 as uuidv4 } from 'uuid';
import { ref } from 'vue';
interface Props {
  variant: ThemeVariant;
  isExpanded?: string;
}

const props = defineProps<Props>();

const accordionId = uuidv4();
const accordionContentId = uuidv4();

const contentWrapper = ref<HTMLElement | null>(null);
const height = ref(0);

const isExpanded = ref<boolean>(props.isExpanded === 'true' || false);
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    toggleIsOpen();
  }
};
const toggleIsOpen = () => {
  isExpanded.value = !isExpanded.value;
  if (isExpanded.value) {
    height.value = contentWrapper.value?.scrollHeight || 0;
  } else {
    height.value = 0;
  }
};
</script>

<style>
@import url('./style.css');
</style>
