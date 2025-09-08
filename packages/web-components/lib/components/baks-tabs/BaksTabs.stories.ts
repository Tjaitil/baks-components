import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { register } from '../..';

import { html } from 'lit';
import { variantsOptions } from 'baks-components-styles';

const meta: Meta = {
  component: 'baks-tabs',
  argTypes: {
    direction: {
      options: ['horizontal', 'vertical'],
      control: { type: 'select' }
    },
    variant: {
      options: variantsOptions,
      control: { type: 'select' }
    }
  }
};

export default meta;
type Story = StoryObj;

register(['BaksTabs', 'BaksTab', 'BaksTabPanel']);

export const Normal: Story = {
  args: {
    direction: 'horizontal',
    variant: 'primary'
  },
  render: ({ direction, variant }) => {
    return html`
      <div class="flex flex-col">
        <baks-tabs direction="${direction}">
          <baks-tab variant="${variant}" controls="test-1"> Test 1 </baks-tab>
          <baks-tab variant="${variant}" controls="test-2" selected> Test 2 </baks-tab>
          <baks-tab-panel slot="panels" controlled-by="test-1"
            >Hello <button>hello</button></baks-tab-panel
          >
          <baks-tab-panel slot="panels" controlled-by="test-2">2</baks-tab-panel>
        </baks-tabs>
      </div>
    `;
  }
};
