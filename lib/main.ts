import { defineCustomElement } from 'vue';
import BaksButtonCe from './components/baks-button/BaksButton.ce.vue';
import './app.css';
import { registerComponent } from './utilities/registerComponent';
import BaksCardCe from './components/baks-card/BaksCard.ce.vue';
import BaksAccordionCe from './components/baks-accordion/BaksAccordion.ce.vue';

export type { ThemeVariant as ThemeVariants } from './types/ThemeVariants';

export const BaksCard = defineCustomElement(BaksCardCe);
export const BaksButton = defineCustomElement(BaksButtonCe);
export const BaksAccordion = defineCustomElement(BaksAccordionCe);

export type Components = 'BaksButton' | 'BaksCard' | 'BaksAccordion';

export function register(specificComponents: Components[] = []) {
  if (specificComponents.length === 0) {
    registerComponent('baks-button', BaksButton);
    registerComponent('baks-card', BaksCard);
    registerComponent('baks-accordion', BaksAccordion);
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
