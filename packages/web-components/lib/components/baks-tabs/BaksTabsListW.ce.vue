<template>
  <div
    class="bk-tabs-list-w"
    ref="tabsWrapper"
    part="bk-tabs-list-w"
    :class="direction"
  >
    <div class="bk-tabs border-none" :class="direction" part="bk-tabs">
      <slot></slot>
    </div>
    <div id="panels-container">
      <slot name="panel"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, ref, watch } from 'vue';

interface HTMLElementVue extends HTMLElement {
  _props: {
    [key: string]: string;
  };
}
interface Props {
  direction?: 'horizontal' | 'vertical';
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'horizontal'
});

const tabsWrapper = ref<HTMLElementVue | null>();

const tabs = ref<HTMLElementVue[]>([]);

const tabsPanels = ref<HTMLElementVue[]>([]);
const visibleTabPanel = ref<string>();
const setVisibleTabPanel = (id: string) => {
  visibleTabPanel.value = id;
  tabsPanels.value?.forEach((panel) => {
    if (panel.id === id) {
      panel.setAttribute('is-visible', '');
    } else {
      panel.removeAttribute('is-visible');
    }
  });
};

const togglePanel = (id: string, shouldHide: boolean) => {
  const element = document.querySelectorAll(`#${id}`)[0];
  if (shouldHide) {
    element.removeAttribute('is-visible');
  } else {
    element.setAttribute('is-visible', '');
  }
};

watch(
  () => visibleTabPanel.value,
  (newValue) => {
    if (newValue !== undefined) {
      const element = document.querySelectorAll(`#${newValue}`)[0];
    }
  }
);

onMounted(() => {
  const instance = getCurrentInstance();
  const root = instance?.root.vnode.el;
  const host = root?.parentNode.host as HTMLElement;

  tabs.value = <HTMLElementVue[]>(
    [...host?.children].filter((element) => element.tagName === 'BAKS-TAB')
  );

  tabs.value.forEach((tab, index) => {
    if (index % 2 == 0) {
      tab.classList.add(props.direction);
      tab.classList.add('special');
      if (tabs.value.length === index - 1) {
        tab.classList.add('last');
      }
    }

    const element = <HTMLElementVue>document.querySelectorAll(`#${tab._props.controls}`)[0];
    if (element !== undefined) {
      tabsPanels.value.push(element);
    }

    if (tab.hasAttribute('selected')) {
      setVisibleTabPanel(tab._props.controls);
    }

    tab.addEventListener('bk:click', (e) => {
      tabs.value.forEach((tab) => {
        if (tab !== e.target) {
          tab.removeAttribute('selected');
          togglePanel(tab._props.controls, true);
        } else {
          tab.setAttribute('selected', '');
          setVisibleTabPanel(tab._props.controls);
        }
      });
    });
  });
});
</script>

<style>
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

.bk-tabs {
  display: flex;
  flex-direction: column;
}
.bk-tabs.horizontal {
  flex-direction: row;
}

.bk-tabs-list-w {
  display: flex;
  flex-direction: row;
}
.bk-tabs-list-w.horizontal {
  flex-direction: column;
}
#panels-container {
  flex-grow: 1;
}
</style>
