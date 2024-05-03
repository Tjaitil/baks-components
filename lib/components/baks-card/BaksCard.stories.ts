import type { Meta, StoryObj } from '@storybook/web-components';
import { register } from '@/main';

import { html } from 'lit';
import { variants } from '@/utilities';

const meta: Meta = {
  component: 'baks-card',
  argTypes: {
    variant: {
      options: variants,
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
