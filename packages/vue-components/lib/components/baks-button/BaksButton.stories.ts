import type { Meta, StoryObj } from '@storybook/vue3-vite';

import BaksButton from './BaksButton.vue';

const meta = {
  component: BaksButton,
  title: 'BaksButton',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'dark', 'light', 'warning', 'success', 'error', 'info'],
      defaultValue: 'primary'
    },
    size: {
      control: { type: 'select' },
      options: ['normal', 'block'],
      defaultValue: 'normal'
    },
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false
    },
    default: {
      control: { type: 'text' },
      defaultValue: 'Click me'
    }
  },
  args: {
    default: 'Click me'
  }
} satisfies Meta<typeof BaksButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => ({
    components: { BaksButton },
    setup() {
      return { args };
    },
    template: `<BaksButton v-bind="args">${args.default}</BaksButton>`
  }),
  args: {
    variant: 'primary'
  }
};

export const Disabled: Story = {
  render: (args) => ({
    components: { BaksButton },
    setup() {
      return { args };
    },
    template: `<BaksButton v-bind="args">${args.default}</BaksButton>`
  }),
  args: {
    variant: 'primary',
    disabled: true,
    default: 'Disabled Button'
  }
};
