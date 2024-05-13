import type { Meta, StoryObj } from '@storybook/web-components';
import { register } from '@/main';

import { html } from 'lit';
import { variants } from '@/utilities';

const meta: Meta = {
  component: 'baks-accordion',
  argTypes: {
    variant: {
      options: variants,
      control: { type: 'select' }
    },
    header: {
      control: { type: 'text' }
    },
    content: {
      control: { type: 'text' }
    }
  }
};

export default meta;
type Story = StoryObj;

register(['BaksAccordion']);

export const Primary: Story = {
  args: {
    variant: 'primary',
    content: 'content',
    header: 'header'
  },
  render: ({ variant, header, content }) =>
    html` <baks-accordion variant="${variant}"><span slot="header">${header}</span>
      <div slot="content">${content}</span>
    </baks-accordion>`
};
