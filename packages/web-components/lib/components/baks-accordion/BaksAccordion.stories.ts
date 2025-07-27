import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { BaksAccordion, register } from '../../';

import { html } from 'lit';
import { variantsOptions } from 'baks-components-styles';

const meta = {
  component: 'baks-accordion',
  argTypes: {
    variant: {
      options: variantsOptions,
      control: { type: 'select' }
    },
    header: {
      control: { type: 'text' }
    },
    content: {
      control: { type: 'text' }
    }
  }
} satisfies Meta<typeof BaksAccordion>;

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
