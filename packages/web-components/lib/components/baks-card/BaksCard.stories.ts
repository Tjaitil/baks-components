import type { Meta, StoryObj } from '@storybook/web-components';
import { register } from '../../';

import { html } from 'lit';
import { variantsOptions } from '@baks-components/shared';

const meta: Meta = {
  component: 'baks-card',
  argTypes: {
    variant: {
      options: variantsOptions,
      control: { type: 'select' }
    }
  }
};

export default meta;
type Story = StoryObj;

register(['BaksCard']);

export const Primary: Story = {
  args: {
    variant: 'primary'
  },
  render: ({ variant }) => html` <baks-card variant="${variant}">Hello</baks-card>`
};
