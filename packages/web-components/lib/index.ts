import { defineCustomElement } from 'vue';
import BaksButtonCe from './components/baks-button/BaksButton.ce.vue';
import './app.css';
import { registerComponent } from './utilities/registerComponent';
import BaksCardCe from './components/baks-card/BaksCard.ce.vue';
import BaksAccordionCe from './components/baks-accordion/BaksAccordion.ce.vue';
export type { ThemeVariant as ThemeVariants } from '@baks-components/shared';

const BaksCard = defineCustomElement(BaksCardCe);
const BaksButton = defineCustomElement(BaksButtonCe);
const BaksAccordion = defineCustomElement(BaksAccordionCe);
// const BaksTab = defineCustomElement(BaksTabCe);
// const BaksTabListW = defineCustomElement(BaksTabListCe);
// const BaksTabPanel = defineCustomElement(BaksTabPanelCe);

export { BaksCardCe as BaksCard, BaksButtonCe as BaksButtonV, BaksAccordionCe as BaksAccordion };

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
    registerComponent('baks-button', BaksButton);
    registerComponent('baks-card', BaksCard);
    registerComponent('baks-accordion', BaksAccordion);
    // registerComponent('baks-tab', BaksTab);
    // registerComponent('baks-tab-list-w', BaksTabListW);
    // registerComponent('baks-tab-panel', BaksTabPanel);
  } else {
    specificComponents.forEach((component) => {
      switch (component) {
        case 'BaksButton':
          registerComponent('baks-button', BaksButton);
          break;
        case 'BaksCard':
          registerComponent('baks-card', BaksCard);
          break;
        case 'BaksAccordion':
          registerComponent('baks-accordion', BaksAccordion);
          break;
        case 'BaksTab':
          // registerComponent('baks-tab', BaksTab);
          break;
        case 'BaksTabListW':
          // registerComponent('baks-tab-list', BaksTabListW);
          break;
        case 'BaksTabPanel':
          // registerComponent('baks-tab-panel', BaksTabPanel);
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
