import type { Meta, StoryObj } from '@storybook/vue3-vite';

import BaksAccordion from './BaksAccordion.vue';

const meta = {
  component: BaksAccordion,
  title: 'BaksAccordion',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'dark', 'light', 'warning', 'success', 'error', 'info'],
      defaultValue: 'primary'
    },
    isExpanded: {
      control: { type: 'select' },
      options: ['true', 'false'],
      defaultValue: 'false'
    },
    header: {
      control: { type: 'text' },
      description: 'Default slot content for the accordion'
    },
    icon: {
      control: { type: 'text' },
      description: 'Icon to display in the accordion header'
    },
    content: {
      control: { type: 'text' },
      description: 'Content to display inside the accordion'
    }
  },
  args: {
    variant: 'primary',
    isExpanded: 'false'
  }
} satisfies Meta<typeof BaksAccordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => ({
    components: { BaksAccordion },
    setup() {
      return { args };
    },
    template: `
      <BaksAccordion v-bind="args">
        <template #header>
          <h3>Accordion Header</h3>
        </template>
        <template #content>
          <p>This is the accordion content. It can contain any HTML content including paragraphs, lists, images, and more.</p>
          <ul>
            <li>List item 1</li>
            <li>List item 2</li>
            <li>List item 3</li>
          </ul>
        </template>
      </BaksAccordion>
    `
  }),
  args: {
    variant: 'primary'
  }
};

export const Expanded: Story = {
  render: (args) => ({
    components: { BaksAccordion },
    setup() {
      return { args };
    },
    template: `
      <BaksAccordion v-bind="args">
        <template #header>
          <h3>Expanded Accordion</h3>
        </template>
        <template #content>
          <p>This accordion starts in an expanded state.</p>
        </template>
      </BaksAccordion>
    `
  }),
  args: {
    variant: 'primary',
    isExpanded: 'true'
  }
};

export const Secondary: Story = {
  render: (args) => ({
    components: { BaksAccordion },
    setup() {
      return { args };
    },
    template: `
      <BaksAccordion v-bind="args">
        <template #header>
          <h3>Secondary Variant</h3>
        </template>
        <template #content>
          <p>This accordion uses the secondary variant styling.</p>
        </template>
      </BaksAccordion>
    `
  }),
  args: {
    variant: 'secondary'
  }
};

export const MultipleAccordions: Story = {
  render: (args) => ({
    components: { BaksAccordion },
    setup() {
      return { args };
    },
    template: `
      <div class="space-y-4">
        <BaksAccordion variant="primary">
          <template #header>
            <h3>First Accordion</h3>
          </template>
          <template #content>
            <p>Content for the first accordion.</p>
          </template>
        </BaksAccordion>
        
        <BaksAccordion variant="secondary">
          <template #header>
            <h3>Second Accordion</h3>
          </template>
          <template #content>
            <p>Content for the second accordion.</p>
          </template>
        </BaksAccordion>
        
        <BaksAccordion variant="success">
          <template #header>
            <h3>Third Accordion</h3>
          </template>
          <template #content>
            <p>Content for the third accordion.</p>
          </template>
        </BaksAccordion>
      </div>
    `
  })
};
