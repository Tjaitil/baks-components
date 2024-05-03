import type { VueElementConstructor } from 'vue';

export const registerComponent = (name: string, component: VueElementConstructor<unknown>) => {
  const element = customElements.get(name);
  if (element === undefined) {
    customElements.define(name, component);
  }
};
