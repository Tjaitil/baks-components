import { defineCustomElement } from 'vue';
import BaksButton from '@baks-components/vue/lib/components/baks-button/BaksButton.vue';
import './app.css';
import { registerComponent } from './utilities/registerComponent';
import BaksCardCe from './components/baks-card/BaksCard.ce.vue';
import BaksAccordion from '@baks-components/vue/lib/components/baks-accordion/BaksAccordion.vue';
import BaksTabCe from '@baks-components/vue/lib/components/baks-tabs/BaksTab.vue';
import BaksTabPanel from '@baks-components/vue/lib/components/baks-tabs/BaksTabPanel.vue';
import BaksTabList from './components/baks-tabs/BaksTabsListW.ce.vue';
export type { ThemeVariant as ThemeVariants } from '@baks-components/shared';

const BaksCard = defineCustomElement(BaksCardCe);
const BaksButtonCE = defineCustomElement(BaksButton);
const BaksAccordionCE = defineCustomElement(BaksAccordion);
const BaksTabCE = defineCustomElement(BaksTabCe);
const BaksTabListW = defineCustomElement(BaksTabList);
const BaksTabPanelCE = defineCustomElement(BaksTabPanel);

export { BaksCardCe, BaksButton, BaksAccordion, BaksTabCe, BaksTabListCe, BaksTabPanelCe };

export type Components =
  | 'BaksButton'
  | 'BaksCard'
  | 'BaksAccordion'
  | 'BaksTab'
  | 'BaksTabListW'
  | 'BaksTabPanel';

export function register(specificComponents: Components[] = []) {
  console.log(specificComponents);
  if (specificComponents.length === 0) {
    registerComponent('baks-button', BaksButtonCE);
    registerComponent('baks-card', BaksCard);
    registerComponent('baks-accordion', BaksAccordionCE);
    registerComponent('baks-tab', BaksTabCE);
    registerComponent('baks-tab-panel', BaksTabPanelCE);
    registerComponent('baks-tab-list-w', BaksTabListW);
  } else {
    specificComponents.forEach((component) => {
      switch (component) {
        case 'BaksButton':
          registerComponent('baks-button', BaksButtonCE);
          break;
        case 'BaksCard':
          registerComponent('baks-card', BaksCard);
          break;
        case 'BaksAccordion':
          registerComponent('baks-accordion', BaksAccordionCE);
          break;
        case 'BaksTab':
          registerComponent('baks-tab', BaksTabCE);
          break;
        case 'BaksTabPanel':
          registerComponent('baks-tab-panel', BaksTabPanelCE);
          break;
        case 'BaksTabListW':
          registerComponent('baks-tab-list', BaksTabListW);
          break;
      }
    });
  }
}

declare module 'vue' {
  export interface GlobalComponents {
    BaksButton: typeof BaksButton;
    BaksCard: typeof BaksCard;
    BaksAccordion: typeof BaksAccordion;
  }
}
