import type { VueElementConstructor } from 'vue';

export const registerComponent = (
  name: string,
  component: VueElementConstructor<unknown> | CustomElementConstructor
) => {
  const element = customElements.get(name);
  if (element === undefined) {
    customElements.define(name, component);
  }
};
