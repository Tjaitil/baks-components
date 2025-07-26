<template>
  <div
    ref="select-container"
    class="select-container bk-select shadow-xs shadow-black"
    :class="resolveVariant(variant)"
  >
    <button
      :id
      ref="select-element"
      class="select-element cursor-pointer flex items-center justify-between focus apply-variant gap-x-2 w-full"
      tabindex="0"
      :name="name"
      role="combobox"
      :aria-label="selectLabel"
      :aria-labelledby="props['aria-labelledby']"
      :aria-activedescendant="isOpen ? `${id}-option-${currentIndex}` : undefined"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      :aria-controls="listboxId"
      :aria-disabled="isDisabled"
      :class="{ disabled: isDisabled }"
      @click="toggleOpen"
      @keydown.prevent="handleKeyPress"
    >
      <span class="select-none text-ellipsis overflow-hidden max-h-16">{{
        selectedOption != undefined ? selectedOption.label : props.selectLabel
      }}</span>
      <span class="select-none">
        <slot name="baks-select-icon">
          <ChevronDown class="stroke" />
        </slot>
      </span>
    </button>
    <Transition name="slide-fade">
      <div
        v-if="isOpen"
        :id="listboxId"
        ref="listbox"
        class="absolute listbox-container"
        role="listbox"
      >
        <div
          v-for="(option, index) in options"
          :id="`${id}-option-${index}`"
          :key="option.value"
          class="flex listbox-item gap-x-2"
          :class="{ 'is-highlighted': currentIndex === index }"
          :aria-labelledby="props['aria-labelledby']"
          :aria-selected="selected === option.value"
          role="option"
          @click="setSelectedOption(option.value)"
          @mouseenter="currentIndex = index"
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
}

interface Props {
  id: string;
  // eslint-disable-next-line vue/prop-name-casing
  'aria-labelledby': string;
  name: string;
  variant: ThemeVariant;
  options: Option[];
  selectLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  selectLabel: 'Select'
});

const attrs = useAttrs();
const isDisabled = computed(() => attrs.disabled != null);

const isOpen = ref(false);
const selected = defineModel<Option['value'] | null>();
const selectedOption = computed(() =>
  props.options.find((option) => option.value === selected.value)
);

const listboxId = useId();
const listboxElement = useTemplateRef<HTMLElement>('listbox');
const selectElementContainer = useTemplateRef<HTMLElement>('select-container');
onClickOutside(selectElementContainer, () => {
  isOpen.value = false;
});

const setSelectedOption = (key: Option['value']) => {
  selected.value = key;
  isOpen.value = false;
};
const setSelectedOptionFromIndex = () => {
  setSelectedOption(props.options[currentIndex.value].value);
};

const toggleOpen = (e: MouseEvent) => {
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
  const element = listboxElement.value?.children[currentIndex.value];
  if (element instanceof HTMLElement) {
    const { isOutside, isClippingTop, isClippingBottom } = isClippingOutside(
      element,
      listboxElement.value
    );
    if (isOutside && (isClippingTop || isClippingBottom)) {
      element.scrollIntoView({ block: 'nearest' });
    }
  }
};

watch(
  () => isOpen.value,
  (newVal) => {
    if (newVal) {
      void nextTick(() => {
        if (listboxElement.value == undefined) return;
        const { isOutside, isClippingRight, isClippingBottom, sides } = isClippingOutside(
          listboxElement.value
        );
        if (isOutside) {
          if (isClippingRight) {
            listboxElement.value.style.left = `-${sides.right.toString()}px`;
          }
          if (isClippingBottom) {
            listboxElement.value.style.top = `-${sides.bottom.toString()}px`;
          }
        }
      });
    }
  }
);
</script>

<style>
@import '../../../../shared/src/css/baks-select.css';

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
