import type { DefineCustomElement } from './DefineCustomElement';
import type BaksCardCe from './components/baks-card/BaksCard.ce.vue';
import type BaksAccordionCe from 'baks-components-vue/lib/components/baks-accordion/BaksAccordion.vue';
import type BaksTabCe from 'baks-components-vue/lib/components/baks-tabs/BaksTab.vue';
import type BaksTabPanelCe from 'baks-components-vue/lib/components/baks-tabs/BaksTabPanel.vue';
import type BaksTabListCe from './components/baks-tabs/BaksTabs.vue';
import type { BaksButton } from './components/baks-button/BaksButton';

declare module 'vue' {
  export interface GlobalComponents {
    'baks-button': DefineCustomElement<BaksButton, {}, 'variant' | 'size' | 'type'>;
    'baks-card': typeof BaksCardCe;
    'baks-accordion': typeof BaksAccordionCe;
    'baks-tab': typeof BaksTabCe;
    'baks-tab-panel': typeof BaksTabPanelCe;
    'baks-tab-list': typeof BaksTabListCe;
  }
}
