import type { Meta, StoryObj } from '@storybook/vue3-vite';

import BaksCard from './BaksCard.vue';
import BaksButton from '../baks-button/BaksButton.vue';

const meta = {
  component: BaksCard,
  title: 'BaksCard',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'dark', 'light', 'warning', 'success', 'error', 'info'],
      defaultValue: 'primary'
    },
    default: {
      control: { type: 'text' },
      description: 'Default slot content for the card'
    }
  }
} satisfies Meta<typeof BaksCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => ({
    components: { BaksCard },
    setup() {
      return { args };
    },
    template: `
      <BaksCard v-bind="args">
        <h2>Card Title</h2>
        <p>This is a simple card component with some content inside.</p>
      </BaksCard>
    `
  }),
  args: {
    variant: 'primary'
  }
};

export const Secondary: Story = {
  render: (args) => ({
    components: { BaksCard },
    setup() {
      return { args };
    },
    template: `
      <BaksCard v-bind="args">
        <h2>Secondary Card</h2>
        <p>This card uses the secondary variant styling.</p>
      </BaksCard>
    `
  }),
  args: {
    variant: 'secondary'
  }
};

export const WithComplexContent: Story = {
  render: (args) => ({
    components: { BaksCard, BaksButton },
    setup() {
      return { args };
    },
    template: `
      <BaksCard v-bind="args">
        <div class="space-y-4">
          <h2 class="text-xl font-bold">Complex Card Content</h2>
          <p>This card demonstrates more complex content with multiple elements.</p>
          <ul class="list-disc list-inside">
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
          </ul>
          <div class="flex gap-2">
            <BaksButton variant="primary">Primary Action</BaksButton>
            <BaksButton variant="secondary">Secondary Action</BaksButton>
          </div>
        </div>
      </BaksCard>
    `
  }),
  args: {
    variant: 'light'
  }
};

export const AllVariants: Story = {
  args: {
    variant: 'primary'
  },
  render: () => ({
    components: { BaksCard },
    template: `
      <div class="grid grid-cols-2 gap-4">
        <BaksCard variant="primary">
          <h3>Primary</h3>
          <p>Primary variant card</p>
        </BaksCard>
        
        <BaksCard variant="secondary">
          <h3>Secondary</h3>
          <p>Secondary variant card</p>
        </BaksCard>
        
        <BaksCard variant="success">
          <h3>Success</h3>
          <p>Success variant card</p>
        </BaksCard>
        
        <BaksCard variant="warning">
          <h3>Warning</h3>
          <p>Warning variant card</p>
        </BaksCard>
        
        <BaksCard variant="error">
          <h3>Error</h3>
          <p>Error variant card</p>
        </BaksCard>
        
        <BaksCard variant="info">
          <h3>Info</h3>
          <p>Info variant card</p>
        </BaksCard>
        
        <BaksCard variant="light">
          <h3>Light</h3>
          <p>Light variant card</p>
        </BaksCard>
        
        <BaksCard variant="dark">
          <h3>Dark</h3>
          <p>Dark variant card</p>
        </BaksCard>
      </div>
    `
  })
};
