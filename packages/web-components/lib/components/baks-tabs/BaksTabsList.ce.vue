<template>
  <div
    class="bk-tabs-list-w"
    ref="tabsWrapper"
    part="bk-tabs-list-w" :class="direction"
    role="tablist"
    >
    <div class="bk-tabs border-none" :class="direction" part="bk-tabs" role="none presentation">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, ref, watch } from 'vue';

interface Props {
  direction?: 'horizontal' | 'vertical';
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'horizontal'
});

const tabsWrapper = ref<HTMLElement | null>();

const tabs = ref<HTMLElement[]>([]);

const tabsPanels = ref<HTMLElement[]>([]);
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
  tabs.value = <HTMLElement[]>(
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

    const tabPanelIdentifier = tab.attributes.getNamedItem("controls").value;
    const element = <HTMLElement>document.querySelectorAll(`#${tabPanelIdentifier}`)[0];

    if (element !== undefined) {
      tabsPanels.value.push(element);
    }

    if (tab.hasAttribute('selected')) {
      setVisibleTabPanel(tabPanelIdentifier);
    }

    tab.addEventListener('click', (e) => {
      tabs.value.forEach(element => {
        if(element !== e.target) {
          element.removeAttribute('selected');
        } else {
          element.setAttribute('selected', '');
        } 
      });
      setVisibleTabPanel(tabPanelIdentifier);
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
