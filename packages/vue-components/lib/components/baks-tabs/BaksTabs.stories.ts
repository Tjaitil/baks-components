import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';

import BaksTabs from './BaksTabs.vue';
import type { BaksTabItem } from '../../types/BaksTabItem';

const meta = {
  //@ts-ignore
  component: BaksTabs,
  title: 'BaksTabs',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'dark', 'light', 'warning', 'success', 'error', 'info'],
      defaultValue: 'primary'
    },
    direction: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      defaultValue: 'horizontal'
    },
    items: {
      control: { type: 'object' },
      description: 'Array of tab items with label and key properties'
    }
  },
  args: {
    variant: 'primary',
    direction: 'horizontal'
  }
} satisfies Meta<typeof BaksTabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TabsWithPanels: Story = {
  // @ts-ignore
  render: (args) => ({
    components: { BaksTabs },
    setup() {
      const items: BaksTabItem[] = [
        { label: 'First Tab', key: 'tab1' },
        { label: 'Second Tab', key: 'tab2' },
        { label: 'Third Tab', key: 'tab3' }
      ];

      const selectedTab = ref<string>('tab2');

      return {
        args,
        items,
        selectedTab
      };
    },
    template: `
      <BaksTabs v-bind="args" :items="items" v-model="selectedTab">
        <template #tab1>
          <h3>Content for First Tab</h3>
          <p>This is the content that shows when the first tab is selected.</p>
        </template>
        
        <template #tab2>
          <h3>Content for Second Tab</h3>
          <p>This is the content that shows when the second tab is selected.</p>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </template>
        
        <template #tab3>
          <h3>Content for Third Tab</h3>
          <p>This is the content that shows when the third tab is selected.</p>
          <div class="bg-gray-100 p-4 rounded">
            <p>Some highlighted content in the third panel.</p>
          </div>
        </template>
      </BaksTabs>
    `
  }),
  args: {
    variant: 'primary',
    direction: 'horizontal',
    items: [
      { label: 'First Tab', key: 'tab1' },
      { label: 'Second Tab', key: 'tab2' },
      { label: 'Third Tab', key: 'tab3' }
    ]
  }
};

export const TabWithIcon: Story = {
  // @ts-ignore
  render: (args) => ({
    components: { BaksTabs },
    setup() {
      const items: BaksTabItem[] = [
        { label: 'Home', key: 'home' },
        { label: 'Settings', key: 'settings' },
        { label: 'Profile', key: 'profile' }
      ];

      const selectedTab = ref<string>('home');

      return {
        args,
        items,
        selectedTab
      };
    },
    template: `
      <BaksTabs v-bind="args" :items="items" v-model="selectedTab">
        <template #tabs="{ item }">
          <span>🏠</span> {{ item.label }}
        </template>
        
        <template #home>
          <h3>Home Content</h3>
          <p>Welcome to the home page!</p>
        </template>
        
        <template #settings>
          <h3>Settings Content</h3>
          <p>Configure your preferences here.</p>
        </template>
        
        <template #profile>
          <h3>Profile Content</h3>
          <p>Manage your profile information.</p>
        </template>
      </BaksTabs>
    `
  }),
  args: {
    variant: 'primary',
    direction: 'horizontal',
    items: [
      { label: 'Home', key: 'home' },
      { label: 'Settings', key: 'settings' },
      { label: 'Profile', key: 'profile' }
    ]
  }
};

export const DifferentVariants: Story = {
  // @ts-ignore
  render: () => ({
    components: { BaksTabs },
    setup() {
      const primaryItems: BaksTabItem[] = [
        { label: 'Primary Tab 1', key: 'primary1' },
        { label: 'Primary Tab 2', key: 'primary2' }
      ];

      const secondaryItems: BaksTabItem[] = [
        { label: 'Secondary Tab 1', key: 'secondary1' },
        { label: 'Secondary Tab 2', key: 'secondary2' }
      ];

      const successItems: BaksTabItem[] = [
        { label: 'Success Tab 1', key: 'success1' },
        { label: 'Success Tab 2', key: 'success2' }
      ];

      const primarySelected = ref<string>('primary1');
      const secondarySelected = ref<string>('secondary1');
      const successSelected = ref<string>('success1');

      return {
        primaryItems,
        secondaryItems,
        successItems,
        primarySelected,
        secondarySelected,
        successSelected
      };
    },
    template: `
      <div class="space-y-8">
        <div>
          <h3 class="mb-4">Primary Variant</h3>
          <BaksTabs variant="primary" :items="primaryItems" v-model="primarySelected">
            <template #primary1>
              <p>This tab uses the primary variant styling.</p>
            </template>
            <template #primary2>
              <p>Another primary tab content.</p>
            </template>
          </BaksTabs>
        </div>
        
        <div>
          <h3 class="mb-4">Secondary Variant</h3>
          <BaksTabs variant="secondary" :items="secondaryItems" v-model="secondarySelected">
            <template #secondary1>
              <p>This tab uses the secondary variant styling.</p>
            </template>
            <template #secondary2>
              <p>Another secondary tab content.</p>
            </template>
          </BaksTabs>
        </div>
        
        <div>
          <h3 class="mb-4">Success Variant</h3>
          <BaksTabs variant="success" :items="successItems" v-model="successSelected">
            <template #success1>
              <p>This tab uses the success variant styling.</p>
            </template>
            <template #success2>
              <p>Another success tab content.</p>
            </template>
          </BaksTabs>
        </div>
      </div>
    `
  }),
  // @ts-ignore
  args: {
    variant: 'primary',
    direction: 'horizontal'
  }
};

export const ManyTabs: Story = {
  // @ts-ignore
  render: (args) => ({
    components: { BaksTabs },
    setup() {
      const items: BaksTabItem[] = Array.from({ length: 6 }, (_, i) => ({
        label: `Tab ${i + 1}`,
        key: `tab${i + 1}`
      }));

      const selectedTab = ref<string>('tab1');

      return {
        args,
        items,
        selectedTab
      };
    },
    template: `
      <div class="overflow-x-auto">
        <BaksTabs v-bind="args" :items="items" v-model="selectedTab">
          <template #tab1>
            <h3>Tab 1 Content</h3>
            <p>This is the content for tab 1.</p>
          </template>
          
          <template #tab2>
            <h3>Tab 2 Content</h3>
            <p>This is the content for tab 2.</p>
          </template>
          
          <template #tab3>
            <h3>Tab 3 Content</h3>
            <p>This is the content for tab 3.</p>
          </template>
          
          <template #tab4>
            <h3>Tab 4 Content</h3>
            <p>This is the content for tab 4.</p>
          </template>
          
          <template #tab5>
            <h3>Tab 5 Content</h3>
            <p>This is the content for tab 5.</p>
          </template>
          
          <template #tab6>
            <h3>Tab 6 Content</h3>
            <p>This is the content for tab 6.</p>
          </template>
        </BaksTabs>
      </div>
    `
  }),
  args: {
    variant: 'info',
    direction: 'horizontal',
    items: Array.from({ length: 6 }, (_, i) => ({
      label: `Tab ${i + 1}`,
      key: `tab${i + 1}`
    }))
  }
};
