import type { Meta, StoryObj } from '@storybook/vue3-vite';

import BaksSelect from './BaksSelect.vue';
import { ref, watch } from 'vue';

const sampleOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'A very long option label that might overflow' },
  { value: 'option5', label: 'Option 5' }
];

const manyOptions = Array.from({ length: 20 }, (_, i) => ({
  value: `option${i + 1}`,
  label: `Option ${i + 1}`
}));

const meta = {
  component: BaksSelect,
  title: 'BaksSelect',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'dark', 'light', 'warning', 'success', 'error', 'info'],
      defaultValue: 'primary'
    },
    name: {
      control: { type: 'text' },
      defaultValue: 'example-select'
    },
    id: {
      control: { type: 'text' },
      defaultValue: 'example-select-id'
    },
    'aria-labelledby': {
      control: { type: 'text' },
      defaultValue: 'example-select-label'
    },
    selectLabel: {
      control: { type: 'text' },
      defaultValue: 'Choose an option'
    },
    options: {
      control: { type: 'object' },
      defaultValue: sampleOptions
    }
  },
  args: {
    name: 'example-select',
    variant: 'primary',
    options: sampleOptions,
    selectLabel: 'Choose an option'
  }
} satisfies Meta<typeof BaksSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => ({
    components: { BaksSelect },
    setup() {
      return { args };
    },
    template: `<BaksSelect v-bind="args" />`
  }),
  args: {
    id: 'primary-select',
    'aria-labelledby': 'primary-select-label',
    variant: 'primary'
  }
};

export const CustomLabel: Story = {
  render: (args) => ({
    components: { BaksSelect },
    setup() {
      const model = ref(args.modelValue);
      // Optional: Keeps v-model in sync with storybook args
      watch(
        () => args.modelValue,
        (val) => {
          console.log(model.value);
          model.value = val;
        }
      );
      return { args, model };
    },
    template: `<BaksSelect v-bind="args" v-model="model" />`
  }),
  args: {
    id: 'custom-label-select',
    'aria-labelledby': 'custom-label-select-label',
    modelValue: 'burger',
    variant: 'secondary',
    selectLabel: 'Pick your favorite',
    options: [
      { value: 'pizza', label: '🍕 Pizza' },
      { value: 'burger', label: '🍔 Burger' },
      { value: 'sushi', label: '🍣 Sushi' },
      { value: 'tacos', label: '🌮 Tacos' }
    ]
  }
};

export const ManyOptions: Story = {
  render: (args) => ({
    components: { BaksSelect },
    setup() {
      return { args };
    },
    template: `<BaksSelect v-bind="args" />`
  }),
  args: {
    id: 'many-options-select',
    'aria-labelledby': 'many-options-select-label',
    variant: 'info',
    selectLabel: 'Select from many options',
    options: manyOptions
  }
};

export const Disabled: Story = {
  render: (args) => ({
    components: { BaksSelect },
    setup() {
      return { args };
    },
    template: `<BaksSelect v-bind="args" disabled />`
  }),
  args: {
    id: 'disabled-select',
    'aria-labelledby': 'disabled-select-label',
    variant: 'primary',
    selectLabel: 'Disabled select'
  }
};

export const AllVariants: Story = {
  args: {
    variant: 'primary',
    name: 'all-variants-select',
    selectLabel: 'Select variant',
    id: 'all-variants-select-id',
    'aria-labelledby': 'all-variants-select-label'
  },
  render: () => ({
    components: { BaksSelect },
    setup() {
      return {
        sampleOptions: [
          { value: 'opt1', label: 'Option 1' },
          { value: 'opt2', label: 'Option 2' },
          { value: 'opt3', label: 'Option 3' }
        ]
      };
    },
    template: `
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block mb-2">Primary</label>
          <BaksSelect 
            name="primary" 
            variant="primary" 
            :options="sampleOptions" 
            selectLabel="Primary select" 
          />
        </div>
        
        <div>
          <label class="block mb-2">Secondary</label>
          <BaksSelect 
            name="secondary" 
            variant="secondary" 
            :options="sampleOptions" 
            selectLabel="Secondary select" 
          />
        </div>
        
        <div>
          <label class="block mb-2">Success</label>
          <BaksSelect 
            name="success" 
            variant="success" 
            :options="sampleOptions" 
            selectLabel="Success select" 
          />
        </div>
        
        <div>
          <label class="block mb-2">Warning</label>
          <BaksSelect 
            name="warning" 
            variant="warning" 
            :options="sampleOptions" 
            selectLabel="Warning select" 
          />
        </div>
        
        <div>
          <label class="block mb-2">Error</label>
          <BaksSelect 
            name="error" 
            variant="error" 
            :options="sampleOptions" 
            selectLabel="Error select" 
          />
        </div>
        
        <div>
          <label class="block mb-2">Info</label>
          <BaksSelect 
            name="info" 
            variant="info" 
            :options="sampleOptions" 
            selectLabel="Info select" 
          />
        </div>
      </div>
    `
  })
};
