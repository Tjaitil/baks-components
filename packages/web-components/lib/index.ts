import { defineCustomElement } from 'vue';
import { BaksButton } from './components/baks-button/BaksButton'
import './app.css';
import { registerComponent } from './utilities/registerComponent';
import BaksCardCe from './components/baks-card/BaksCard.ce.vue';
import BaksAccordion from 'baks-components-vue/lib/components/baks-accordion/BaksAccordion.vue';
import BaksTab from 'baks-components-vue/lib/components/baks-tabs/BaksTab.vue';
import BaksTabPanel from 'baks-components-vue/lib/components/baks-tabs/BaksTabPanel.vue';
import BaksTabList from './components/baks-tabs/BaksTabsList.ce.vue';
import css from './app.css?inline';
export type { ThemeVariant as ThemeVariants } from 'baks-components-styles';

const BaksCard = defineCustomElement(BaksCardCe, {
  'styles': [css]
});
const BaksAccordionCE = defineCustomElement(BaksAccordion, {
  'styles': [css
  ] 
});
const BaksTabCE = defineCustomElement(BaksTab, {
  'styles': [css]
});
const BaksTabListW = defineCustomElement(BaksTabList);
const BaksTabPanelCe = defineCustomElement(BaksTabPanel, {
  'styles': [css]});

export {
  BaksCard,
  BaksButton,
  BaksAccordion,
  BaksTabCE as BaksTab,
  BaksTabListW as BaksTabList,
  BaksTabPanelCe as BaksTabPanel
};

export type Components =
  | 'BaksButton'
  | 'BaksCard'
  | 'BaksAccordion'
  | 'BaksTab'
  | 'BaksTabList'
  | 'BaksTabPanel';

export function register(specificComponents: Components[] = []) {
  if (specificComponents.length === 0) {
    registerComponent('baks-card', BaksCard);
    registerComponent('baks-accordion', BaksAccordionCE);
    registerComponent('baks-tab', BaksTabCE);
    registerComponent('baks-tab-panel', BaksTabPanelCe);
    registerComponent('baks-tab-list', BaksTabListW);
  } else {
    specificComponents.forEach((component) => {
      switch (component) {
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
          registerComponent('baks-tab-panel', BaksTabPanelCe);
          break;
        case 'BaksTabList':
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
    BaksTab: typeof BaksTab;
    BaksTabPanel: typeof BaksTabPanel;
    BaksTabList: typeof BaksTabListW;
  }
}
