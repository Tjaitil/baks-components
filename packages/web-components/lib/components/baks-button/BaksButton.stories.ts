import type { Meta, StoryObj } from '@storybook/web-components';
import { register } from '@/main';

import { html } from 'lit';
import { variants } from '@/utilities';

const meta: Meta = {
  component: 'baks-button',
  argTypes: {
    variant: {
      options: variants,
      control: { type: 'select' }
    },
    disabled: {
      control: { type: 'boolean' }
    },
    size: {
      options: ['normal', 'block'],
      control: { type: 'select' }
    }
  }
};

export default meta;
type Story = StoryObj;

register(['BaksButton']);

export const Normal: Story = {
  args: {
    variant: 'primary',
    disabled: false,
    size: 'normal'
  },
  render: ({ variant, disabled, size }) => {
    return html`<baks-button variant="${variant} size="${size}">Hello</baks-button>`
  }
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    size: 'normal'
  },
  render: ({ variant, disabled, size }) => {
    return html`<baks-button variant="${variant} size="${size}" disabled='true'>Hello</baks-button>`
}
};

