<template>
  <div
    class="bk-accordion shadow-xs shadow-black border-2 rounded-sm relative"
    :class="[resolveVariant(variant), { expanded: isExpanded }]"
    part="bk-accordion"
  >
    <div class="bk-accordion-header" part="bk-accordion-header">
      <button
        @click="toggleIsOpen"
        @keydown="handleKeyDown"
        @keyup.enter="toggleIsOpen"
        @keyup.space="toggleIsOpen"
        :id="accordionId"
        type="button"
        :aria-expanded="isExpanded"
        class="accordion-trigger block w-full p-4 focus cursor-pointer"
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
    <transition
      :css="false"
      @before-enter="beforeExpand"
      @enter="onExpand"
      @leave="beforeShrink"
    >
      <div
        v-if="isExpanded"
        :id="accordionContentId"
        class="bk-accordion-content"
        role="region"
        :aria-labelledby="accordionId"
        ref="contentWrapper"
        part="bk-accordion-content"
      >
        <div class="p-4" part="bk-accordion-content-inner">
          <slot name="content"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { type ThemeVariant, resolveVariant } from 'baks-components-styles';
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

const isExpanded = ref<boolean>(props.isExpanded === 'true' || false);
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    toggleIsOpen();
  }
};
const beforeExpand = (el: Element) => {
  let element = <HTMLElement>el;
  element.style.height = '0px';
  element.style.opacity = '0';
}
const onExpand = (el: Element, done: () => void) => {
  let element = <HTMLElement>el;
  element.style.height = `${element.scrollHeight}px`;
  element.style.opacity = '1';
}
const beforeShrink = (el: Element, done: () => void) => {
  let element = <HTMLElement>el;
  element.style.height = '0px';
  element.style.opacity = '0';
}
const toggleIsOpen = () => {
  isExpanded.value = !isExpanded.value;
};
</script>

<style>
.bk-accordion.expanded {
  &.bk-primary .bk-accordion-header {
    border-color: var(--primary-color-border);
  }
  &.bk-secondary .bk-accordion-header {
    border-color: var(--secondary-color-border);
  }

  & .bk-light .bk-accordion-header {
    border-color: var(--light-color-border);
  }

  &.bk-dark .bk-accordion-header {
    border-color: var(--dark-color-border);
  }

  &.bk-success .bk-accordion-header {
    border-color: var(--success-color-border);
  }

  &.bk-error .bk-accordion-header {
    border-color: var(--error-color-border);
  }

  &.bk-warning .bk-accordion-header {
    border-color: var(--warning-color-border);
  }

  &.bk-info .bk-accordion-header {
    border-color: var(--info-color-border);
  }

  &.bk-dark .bk-accordion-header {
    border-color: var(--dark-color-border);
  }
}

.bk-accordion-content {
  transition: all .3s ease;
}
.chevron-down {
  transition: all .3s ease-out;
}
</style>
