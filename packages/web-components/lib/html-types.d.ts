import type { BaksButton } from './components/baks-button/BaksButton';

import type { BaksAccordion, BaksCard, BaksTab, BaksTabList, BaksTabPanel } from '.';

declare global {
  export interface HTMLElementTagNameMap {
    'baks-button': BaksButton;
    'baks-card': InstanceType<typeof BaksCard>;
    'baks-accordion': InstanceType<typeof BaksAccordion>;
    'baks-tab': InstanceType<typeof BaksTab>;
    'baks-tab-panel': InstanceType<typeof BaksTabPanel>;
    'baks-tab-list': InstanceType<typeof BaksTabList>;
  }
}
