import { defineCustomElement } from 'vue';

import './app.css';
import { registerComponent } from './utilities/registerComponent';
import BaksCardCe from './components/baks-card/BaksCard.ce.vue';
import BaksAccordionCe from 'baks-components-vue/lib/components/baks-accordion/BaksAccordion.vue';
import BaksTabCe from 'baks-components-vue/lib/components/baks-tabs/BaksTab.vue';
import BaksTabPanelCe from 'baks-components-vue/lib/components/baks-tabs/BaksTabPanel.vue';
import BaksTabsCe from './components/baks-tabs/BaksTabs.vue';
import css from './app.css?inline';
import { BaksButton } from './components/baks-button/BaksButton';
export type { ThemeVariant as ThemeVariants } from 'baks-components-styles';

const BaksCard = defineCustomElement(BaksCardCe, {
  styles: [css, ...(BaksCardCe?.styles ?? [])]
});
const BaksAccordion = defineCustomElement(BaksAccordionCe, {
  styles: [css, ...(BaksAccordionCe?.styles ?? [])]
});
const BaksTab = defineCustomElement(BaksTabCe, {
  styles: [css, ...(BaksTabCe?.styles ?? [])]
});
const BaksTabs = defineCustomElement(BaksTabsCe, {});
const BaksTabPanel = defineCustomElement(BaksTabPanelCe, {
  styles: [css, ...(BaksTabPanelCe?.styles ?? [])]
});

export { BaksCard, BaksAccordion, BaksTab, BaksTabs, BaksTabPanel };

export type Components =
  | 'BaksButton'
  | 'BaksCard'
  | 'BaksAccordion'
  | 'BaksTab'
  | 'BaksTabs'
  | 'BaksTabPanel';

export function register(specificComponents: Components[] = []) {
  if (specificComponents.length === 0) {
    registerComponent('baks-card', BaksCard);
    registerComponent('baks-accordion', BaksAccordion);
    registerComponent('baks-tab', BaksTab);
    registerComponent('baks-tab-panel', BaksTabPanel);
    registerComponent('baks-tabs', BaksTabs);
    registerComponent('baks-button', BaksButton);
  } else {
    specificComponents.forEach((component) => {
      switch (component) {
        case 'BaksCard':
          registerComponent('baks-card', BaksCard);
          break;
        case 'BaksAccordion':
          registerComponent('baks-accordion', BaksAccordion);
          break;
        case 'BaksTab':
          registerComponent('baks-tab', BaksTab);
          break;
        case 'BaksTabPanel':
          registerComponent('baks-tab-panel', BaksTabPanel);
          break;
        case 'BaksTabs':
          registerComponent('baks-tabs', BaksTabs);
          break;
        case 'BaksButton':
          registerComponent('baks-button', BaksButton);
          break;
      }
    });
  }
}
