<template>
  <div
    class="select-container bk-select shadow-sm shadow-black"
    :class="resolveVariant(variant)"
    ref="select-container"
  >
    <div
      class="select-element cursor-pointer flex items-center justify-between focus apply-variant gap-x-2"
      @click="toggleOpen"
      tabindex="0"
      :name="name"
      role="combobox"
      aria-label="Select"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      :aria-controls="listboxId"
      :aria-disabled="isDisabled"
      :class="{ disabled: isDisabled }"
      @keydown.prevent="handleKeyPress"
      ref="select-element"
    >
      <span class="select-none text-ellipsis overflow-hidden max-h-16">{{ getSelectedLabel }}</span>
      <span class="select-none">
        <slot name="baks-select-icon">
          <ChevronDown class="stroke" />
        </slot>
      </span>
    </div>
    <Transition name="slide-fade">
      <div
        v-if="isOpen"
        class="absolute listbox-container"
        :id="listboxId"
        role="listbox"
        ref="listbox"
      >
        <div
          v-for="(option, index) in options"
          :key="option.value"
          :value="option.value"
          class="flex listbox-item gap-x-2"
          :class="{ 'is-highlighted': currentIndex === index }"
          :aria-activedescendant="index.toString()"
          :aria-selected="currentIndex === index"
          @click="setSelectedOption(option.value)"
          @mouseenter="currentIndex = index"
          role="option"
        >
          <span class="checkmark-icon-wrapper">
            <slot name="checkmark icon">
              <Checkmark v-if="selected === option.value" class="stroke" />
            </slot>
          </span>
          <span class="text-left text-ellipsis">
            {{ option.label }}
          </span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { type ThemeVariant, resolveVariant } from 'baks-components-styles';
import { computed, ref, useTemplateRef, useId, useAttrs, nextTick, watch } from 'vue';
import { onClickOutside } from '@vueuse/core';
import ChevronDown from '../Icons/ChevronDown.vue';
import Checkmark from '../Icons/Checkmark.vue';
import { isClippingOutside } from '@/lib/isClippingOutside';

interface Option {
  value: string | number;
  label: string | number;
  [key: string]: any;
}

interface Props {
  name: string;
  variant: ThemeVariant;
  options: Option[];
  includeEmptyOption?: boolean;
  selectLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  includeEmptyOption: false
});
const attrs = useAttrs();
const isDisabled = computed(() => attrs.disabled != null);

const isOpen = ref(false);
const selected = defineModel<Option['value'] | null>();
const resolveInitialSelected = () => {
  if (props.includeEmptyOption) {
    return null;
  }
  return props.options[0].value;
};
const selecedOption = computed(() =>
  props.options.find((option) => option.value === selected.value)
);
selected.value = resolveInitialSelected();

const listboxId = useId();
const listbox = useTemplateRef<HTMLElement>('listbox');
const selectElement = useTemplateRef<HTMLElement>('select-element');
const selectElementContainer = useTemplateRef<HTMLElement>('select-container');
onClickOutside(selectElementContainer, () => {
  isOpen.value = false;
});

const setSelectedOption = (key: Option['value']) => {
  selected.value = key;
  isOpen.value = false;
};
const setSelectedOptionFromIndex = () => {
  setSelectedOption(props.options[currentIndex.value].label);
};

const getSelectedLabel = computed(() => {
  if (selecedOption.value != null) {
    return selecedOption.value.label;
  } else if (props.selectLabel) {
    return props.selectLabel;
  }
  return 'Select';
});
const toggleOpen = () => {
  if (isDisabled.value) return;
  isOpen.value = !isOpen.value;
};

const getCurrentIndex = (option: Option) =>
  props.options.findIndex((opt) => opt.value === option.value);
const currentIndex = ref(getCurrentIndex(props.options[0]));

const keyBuffer = ref('');
const bufferTimeout = ref<number | null>(null);
const handleBufferSearch = (event: KeyboardEvent) => {
  if (/^[a-zA-Z]$/.test(event.key)) {
    keyBuffer.value += event.key;

    if (bufferTimeout.value) {
      clearTimeout(bufferTimeout.value);
    }
    bufferTimeout.value = window.setTimeout(() => {
      keyBuffer.value = '';
    }, 500);

    const search = keyBuffer.value.toLowerCase();
    const index = props.options.findIndex((option) =>
      option.value.toString().toLowerCase().startsWith(search)
    );
    if (index !== -1) {
      currentIndex.value = index;
    }
  }
};

const handleKeyPress = (event: KeyboardEvent) => {
  if (/^[a-zA-Z]$/.test(event.key)) {
    handleBufferSearch(event);
  } else if (event.key === 'ArrowDown') {
    if (isOpen.value) {
      currentIndex.value = Math.min(currentIndex.value + 1, props.options.length - 1);
    } else {
      isOpen.value = true;
    }
  } else if (event.key === 'ArrowUp') {
    if (isOpen.value) {
      currentIndex.value = Math.max(currentIndex.value - 1, 0);
    } else {
      isOpen.value = true;
    }
  } else if (event.key === 'Enter') {
    if (isOpen.value) {
      setSelectedOptionFromIndex();
    } else {
      isOpen.value = true;
    }
  } else if (event.key == 'Escape') {
    isOpen.value = false;
  } else if (event.key == 'Tab') {
    isOpen.value = false;
    setSelectedOptionFromIndex();
  }
  handleScroll();
};

const handleScroll = () => {
  const element = <HTMLElement>listbox.value?.children[currentIndex.value];
  if (element) {
    const { isOutside, isClippingTop, isClippingBottom, sides } = isClippingOutside(
      element,
      listbox.value
    );
    if (isOutside && (isClippingTop || isClippingBottom)) {
      element.scrollIntoView({ block: 'nearest' });
    } else {
    }
  }
};

watch(
  () => isOpen.value,
  (newVal) => {
    if (newVal) {
      nextTick(() => {
        if (listbox.value == undefined) return;
        const { isOutside, isClippingRight, isClippingBottom, sides } = isClippingOutside(
          listbox.value
        );
        if (isOutside) {
          if (isClippingRight) {
            listbox.value.style.left = `-${sides.right}px`;
          }
          if (isClippingBottom) {
            listbox.value.style.top = `-${sides.bottom}px`;
          }
        }
      });
    }
  }
);
</script>

<style>
@import url('@shared/css/baks-select.css');
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
