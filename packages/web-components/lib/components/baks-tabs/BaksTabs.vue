<template>
  <div
    class="bk-tabs-list-w"
    ref="tabsWrapper"
    part="bk-tabs-list-w"
    :class="direction"
    role="tablist"
  >
    <nav ref="tablist" role="tablist" :class="direction" class="bk-tablist">
      <slot></slot>
    </nav>
    <div>
      <slot name="panels"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, ref, watch } from 'vue';

type Props = {
  direction?: 'horizontal' | 'vertical';
};

const { direction = 'horizontal' } = defineProps<Props>();

const tabsWrapper = ref<HTMLElement | null>();

const tabs = ref<HTMLElement[]>([]);

let selectedTab: HTMLElement | null = null;

const tabsPanels = ref<HTMLElement[]>([]);
const visibleTabPanel = ref<string>();
const currentFocusIndex = ref(0);
const setVisibleTabPanel = (id: string) => {
  tabsPanels.value?.forEach((panel) => {
    if (panel.id === id) {
      panel.setAttribute('is-visible', '');
    } else {
      panel.removeAttribute('is-visible');
    }
  });
};

watch(
  () => visibleTabPanel.value,
  (newValue) => {
    if (newValue !== undefined) {
      const element = document.querySelectorAll(`#${newValue}`)[0];
    }
  }
);

const findCorrespondingTabPanel = (tab: HTMLElement) => {
  return tabsPanels.value.find((panel) => {
    return panel.getAttribute('controlled-by') === tab.getAttribute('controls');
  });
};

const handleKeydown = (event: KeyboardEvent) => {
  let newIndex = null;

  const currentIndex =
    currentFocusIndex.value !== -1 ? currentFocusIndex.value : currentFocusIndex.value;

  if (event.key === 'Enter') {
    event.preventDefault();
    event.currentTarget.dispatchEvent(new Event('click'));
    return;
  }

  if (direction === 'vertical') {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.value.length - 1;
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      newIndex = currentIndex < tabs.value.length - 1 ? currentIndex + 1 : 0;
    }
  } else {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.value.length - 1;
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      newIndex = currentIndex < tabs.value.length - 1 ? currentIndex + 1 : 0;
    }
  }

  if (event.key === 'Home') {
    event.preventDefault();
    newIndex = 0;
  }

  if (event.key === 'End') {
    event.preventDefault();
    newIndex = tabs.value.length - 1;
  }

  if (newIndex === null) {
    return;
  }

  currentFocusIndex.value = newIndex;

  /** Cannot set tabindex on <baks-tab> to prevent double focus */
  let element = getTabElement(tabs.value[newIndex]);

  if (element instanceof HTMLElement) {
    element.focus();
  }
};

const getTabElement = (tab: HTMLElement) => {
  return tab.shadowRoot.querySelector('.bk-tab');
};

const setTabIndexOnTab = (tab: HTMLElement, index: number) => {
  // Cannot set tabIndex on <baks-tab> to prevent double focus
  getTabElement(tab).setAttribute('tabindex', String(index));
};

onMounted(async () => {
  const instance = getCurrentInstance();
  const root = instance?.root.vnode.el;
  const host = root?.parentNode.host as HTMLElement;
  tabs.value = <HTMLElement[]>(
    [...host?.children].filter((element) => element.tagName === 'BAKS-TAB')
  );

  tabsPanels.value = <HTMLElement[]>(
    [...host?.children].filter((element) => element.tagName === 'BAKS-TAB-PANEL')
  );

  await customElements.whenDefined('baks-tab');

  tabs.value.forEach((tab, index) => {
    setTabIndexOnTab(tab, -1);

    if (index % 2 == 0) {
      tab.classList.add(direction);
      tab.classList.add('special');
      if (tabs.value.length - 1 === index) {
        tab.classList.add('last');
      } else if (index === 0) {
        tab.classList.add('first');
      }
    }
    const correspondingTabPanel = findCorrespondingTabPanel(tab);
    correspondingTabPanel.setAttribute('aria-labelledby', tab.id);
    tab.setAttribute('aria-controls', correspondingTabPanel.id);

    const tabPanelIdentifier = correspondingTabPanel.getAttribute('id');

    if (tab.hasAttribute('selected')) {
      selectedTab = tab;
      currentFocusIndex.value = index;
      setVisibleTabPanel(tabPanelIdentifier);
    }

    tab.addEventListener('click', (e) => {
      tabs.value.forEach((element) => {
        if (element !== e.target) {
          setTabIndexOnTab(element, -1);
          element.removeAttribute('selected');
        } else {
          setTabIndexOnTab(element, 0);
          element.setAttribute('selected', '');
          selectedTab = element;
        }
      });
      setVisibleTabPanel(tabPanelIdentifier);
    });
    tab.addEventListener('keydown', (e) => handleKeydown(e));
  });

  if (selectedTab == null) {
    tabs.value[0]?.setAttribute('selected', '');
    const correspondingTabPanel = findCorrespondingTabPanel(tabs.value[0]);
    setVisibleTabPanel(correspondingTabPanel?.getAttribute('id'));
  }

  setTabIndexOnTab(selectedTab, 0);
});
</script>

<style>
@import '../../../../shared/src/css/baks-tablist.css';

.baks-tabs.flex-row > .bk-tab:nth-of-type(2n) {
  border-left: none;
}
.baks-tabs.flex-row > .bk-tab:nth-of-type(2n):not(:last-child) {
  border-right: none;
}
.baks-tabs.flex-col > .bk-tab:nth-of-type(2n) {
  border-top: none;
}
.baks-tabs.flex-col > .bk-tab:nth-of-type(2n):not(:last-child) {
  border-bottom: none;
}
</style>
