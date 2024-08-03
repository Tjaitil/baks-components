import type { Meta, StoryObj } from '@storybook/web-components';
import { expect, userEvent, within } from '@storybook/test';
import { html } from 'lit';
import { variantsOptions } from 'baks-components-styles';

const meta: Meta = {
  component: 'baks-button',
  argTypes: {
    variant: {
      options: variantsOptions,
      control: { type: 'select' }
    },
    disabled: {
      control: { type: 'boolean' }
    },
    size: {
      options: ['normal', 'block'],
      control: { type: 'select' }
    },
    slot: {
      control: { type: 'text' }
    },
    role: {
      control: { type: 'text' }
    }
  },
  args: {
    variant: 'primary',
    size: 'normal',
    slot: 'Click me',
    role: 'button'
  }
};

export default meta;
type Story = StoryObj;

export const Normal: Story = {
  args: {
    disabled: false,
  },
  render({ variant, disabled, size, slot, role }) {
    return html`
      <baks-button 
        ?disabled="${disabled}"
        variant="${variant}"
        size=${size}
        role="button"
        >
        ${slot}
        </baks-button`;
  },
  play: async ({ args, container, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    let isClicked = false;
    button.addEventListener('click', () => (isClicked = true));
    await userEvent.click(button);
    expect(isClicked).toBe(true);
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render({ variant, disabled, size, slot, role }) {
    return html`
      <baks-button 
        ?disabled="${disabled}"
        variant="${variant}"
        size=${size}
        role="button"
        >
        ${slot}
        </baks-button`;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    let isClicked = false;
    button.addEventListener('click', () => (isClicked = true));
    expect(isClicked).not.toBe(true);
    expect(button).toBeDisabled();
  }
};
