<template>
  <div class="bk-tabs" :class="direction">
    <nav ref="tablist" role="tablist" :class="direction" class="bk-tablist">
      <BaksTab
        v-for="(item, idx) in items"
        :id="tabIds[idx]"
        :key="item.label"
        :controls="tabPanelIds[idx]"
        :variant="variant"
        :tab-group="tabGroupId"
        :item="item"
        :tabindex="item.key === modelValue ? 0 : -1"
        :selected="item.key === modelValue"
        @click="modelValue = item.key"
        @keydown="handleKeydown"
      >
        <slot :item name="tabs">
          {{ item.label }}
        </slot>
      </BaksTab>
    </nav>
    <div>
      <template v-for="(tab, idx) in items" :key="tab.key">
        <div v-if="tab.key === modelValue">
          <BaksTabPanel :controlled-by="tabIds[idx]" :is-visible="tab.key === modelValue">
            <slot :name="tab.key">
              <template></template>
            </slot>
          </BaksTabPanel>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends BaksTabItem">
import BaksTab from './BaksTab.vue';
import BaksTabPanel from './BaksTabPanel.vue';
import { ref, useId, useTemplateRef, type ShallowRef, type VNode } from 'vue';
import type { ThemeVariant } from 'baks-components-styles';
import type { BaksTabItem } from '@/types/BaksTabItem';

type Props = {
  direction?: 'horizontal' | 'vertical';
  variant: ThemeVariant;
  items: T[];
};

const { items, direction = 'horizontal' } = defineProps<Props>();

const modelValue = defineModel<T['key']>();

const tabListElement = useTemplateRef('tablist');

const tabGroupId = `'tab-group-${useId()}`;
const tabIds = items.map((item) => `tab-${item.label}`);
const tabPanelIds = items.map((item) => `tabpanel-${item.label}`);

const currentfocusIndex = ref(
  tabPanelIds.findIndex((id, idx) => items[idx].key === modelValue.value)
);

const handleKeydown = (event: KeyboardEvent) => {
  let newIndex = null;

  // Find the current focused tab index
  const currentFocusedIndex = Array.from(tabListElement.value?.children || []).findIndex(
    (child) => child === document.activeElement
  );

  const currentIndex = currentFocusedIndex !== -1 ? currentFocusedIndex : currentfocusIndex.value;

  if (event.key === 'Enter') {
    event.preventDefault();
    modelValue.value = items[currentIndex].key;
    return;
  }

  if (direction === 'vertical') {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
    }
  } else {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
    }
  }

  if (event.key === 'Home') {
    event.preventDefault();
    newIndex = 0;
  }

  if (event.key === 'End') {
    event.preventDefault();
    newIndex = items.length - 1;
  }

  if (newIndex === null) {
    return;
  }

  currentfocusIndex.value = newIndex;
  focusElement(tabListElement.value, currentfocusIndex.value);
};

const focusElement = (
  element: HTMLElement | Readonly<ShallowRef<HTMLElement | null> | null>,
  newIndex: number
) => {
  let newElement;
  if (element === null) {
    return;
  }

  if (element instanceof HTMLElement) {
    newElement = element;
  } else {
    newElement = element.value;
    if (element.value === null) {
      return;
    }
  }

  const targetElement = newElement?.children[newIndex];
  if (targetElement instanceof HTMLElement) {
    targetElement.focus();
  }
};

defineSlots<
  {
    [key in T['key']]: () => VNode;
  } & { ['tabs']: () => VNode } & { [key: string]: () => BaksTabItem }
>();
</script>
<style>
@import '../../../../shared/src/css/baks-tablist.css';
</style>
