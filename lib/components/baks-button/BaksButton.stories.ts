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
    }
  }
};

export default meta;
type Story = StoryObj;

register(['BaksButton']);

export const Primary: Story = {
  args: {
    variant: 'primary'
  },
  render: ({ variant }) => html` <baks-button variant="${variant}">Hello</baks-button>`
};
